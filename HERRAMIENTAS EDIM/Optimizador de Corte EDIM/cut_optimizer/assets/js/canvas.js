/**
 * Cutting Optimizer Pro - Canvas Renderer
 * Cotas internas: largo cerca del borde horizontal, ancho cerca del borde vertical
 * TODOS LOS TEXTOS Y COTAS EN COLOR NEGRO
 */
const Canvas = (function() {
    'use strict';
    const canvas = document.getElementById('cutCanvas');
    const ctx = canvas.getContext('2d');
    const minimapCanvas = document.getElementById('minimapCanvas');
    const minimapCtx = minimapCanvas ? minimapCanvas.getContext('2d') : null;

    let state = {
        optimization: null,
        zoom: 1,
        offsetX: 0, offsetY: 0,
        isDragging: false,
        lastX: 0, lastY: 0,
        showGrid: true,
        showLabels: true,
        showRulers: false,
        currentPlate: 0,
        viewMode: 'single',
        selectedPiece: null
    };

    function resize() {
        const wrapper = document.querySelector('.canvas-wrapper');
        if (!wrapper || !canvas) return;
        canvas.width = wrapper.clientWidth - 30;
        canvas.height = wrapper.clientHeight - 30;
        if (minimapCanvas) { minimapCanvas.width = 160; minimapCanvas.height = 120; }
        render();
    }

    function setOptimization(opt) {
        state.optimization = opt;
        state.currentPlate = 0;
        autoFitAndCenter();
    }

    function autoFitAndCenter() {
        if (!state.optimization || !state.optimization.plates.length) return;
        if (!canvas || canvas.width === 0 || canvas.height === 0) {
            setTimeout(autoFitAndCenter, 100);
            return;
        }
        const plate = state.optimization.plates[0];
        if (!plate) return;
        const padding = 60;
        const scaleX = (canvas.width - padding) / plate.length;
        const scaleY = (canvas.height - padding) / plate.width;
        const newScale = Math.min(scaleX, scaleY) * 0.95;
        state.zoom = Math.max(0.1, newScale);
        state.offsetX = 0;
        state.offsetY = 0;
        state.currentPlate = 0;
        updateZoomLabel();
        render();
    }

    function clear() {
        state.optimization = null;
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (minimapCtx) minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
    }

    function getScale(plate) {
        const padding = 40;
        if (state.viewMode === 'all') {
            const cols = Math.ceil(Math.sqrt(state.optimization.plates.length));
            const rows = Math.ceil(state.optimization.plates.length / cols);
            const maxW = (canvas.width - padding) / cols;
            const maxH = (canvas.height - padding) / rows;
            return Math.min(maxW / plate.length, maxH / plate.width) * state.zoom;
        }
        return Math.min((canvas.width - padding) / plate.length, (canvas.height - padding) / plate.width) * state.zoom;
    }

    function render() {
        if (!ctx) return;
        if (!state.optimization || !state.optimization.plates || !state.optimization.plates.length) {
            const bg = getComputedStyle(document.body).getPropertyValue('--bg-secondary').trim() || '#f0f3f8';
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-muted').trim() || '#a0aec0';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Ejecute la optimizacion para visualizar el plano de corte', canvas.width/2, canvas.height/2);
            return;
        }
        const bg = getComputedStyle(document.body).getPropertyValue('--bg-secondary').trim() || '#f0f3f8';
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (state.viewMode === 'single') {
            if (state.currentPlate < state.optimization.plates.length) {
                renderPlate(state.optimization.plates[state.currentPlate], 0, 0, true);
            }
        } else {
            const cols = Math.ceil(Math.sqrt(state.optimization.plates.length));
            const padding = 20;
            const cellW = (canvas.width - padding) / cols;
            const cellH = (canvas.height - padding) / Math.ceil(state.optimization.plates.length / cols);
            state.optimization.plates.forEach((plate, i) => {
                const cx = padding/2 + (i % cols) * cellW;
                const cy = padding/2 + Math.floor(i / cols) * cellH;
                renderPlate(plate, cx, cy, false, cellW, cellH);
            });
        }
        renderMinimap();
    }

    function renderPlate(plate, cx, cy, isMain, maxW, maxH) {
        if (!plate) return;
        const scale = isMain ? getScale(plate) : Math.min((maxW-20)/plate.length, (maxH-30)/plate.width);
        const w = plate.length * scale;
        const h = plate.width * scale;
        const x = isMain ? (canvas.width - w)/2 + state.offsetX : cx + (maxW-w)/2;
        const y = isMain ? (canvas.height - h)/2 + state.offsetY : cy + 20;

        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--border').trim() || '#cbd5e0';
        ctx.lineWidth = 2;
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);

        if (state.showGrid && isMain) {
            ctx.strokeStyle = 'rgba(0,0,0,0.05)';
            ctx.lineWidth = 0.5;
            const gridSize = 50 * scale;
            for (let gx = x; gx < x + w; gx += gridSize) { ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y+h); ctx.stroke(); }
            for (let gy = y; gy < y + h; gy += gridSize) { ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x+w, gy); ctx.stroke(); }
        }

        if (!plate.placedPieces) return;

        plate.placedPieces.forEach(pp => {
            if (!pp) return;
            const px = x + pp.x * scale;
            const py = y + pp.y * scale;
            const pw = pp.width * scale;
            const ph = pp.height * scale;

            ctx.fillStyle = pp.color || '#e53935';
            ctx.globalAlpha = 0.85;
            ctx.fillRect(px, py, pw, ph);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(px, py, pw, ph);

            // ============================================================
            // ETIQUETAS ESTILO PLANO: cotas internas cerca de bordes
            // TODOS LOS TEXTOS Y COTAS EN COLOR NEGRO
            // ============================================================
            if (pw > 50 && ph > 40) {
                let unitLabel = 'mm';
                try {
                    const unit = App.state.project.unit;
                    unitLabel = unit === 'm' ? 'm' : unit === 'cm' ? 'cm' : 'mm';
                } catch(e) { unitLabel = 'mm'; }

                // ==========================================================
                // CORRECCION: usar origLargo y origAncho (valores originales
                // ingresados por el usuario, sin kerf, sin intercambio)
                // ==========================================================
                let largo = pp.origLargo;
                let ancho = pp.origAncho;

                // Fallback para compatibilidad con datos antiguos
                if (largo === undefined || ancho === undefined) {
                    if (pp.originalHeight !== undefined && pp.originalWidth !== undefined) {
                        // version anterior: originalHeight = p.length (largo), originalWidth = p.width (ancho)
                        largo = pp.originalHeight;
                        ancho = pp.originalWidth;
                    } else {
                        largo = pp.rotated ? pp.height : pp.width;
                        ancho = pp.rotated ? pp.width : pp.height;
                    }
                }

                if (!largo || largo <= 0) largo = pp.width || 1;
                if (!ancho || ancho <= 0) ancho = pp.height || 1;

                // Tamaños de fuente mejorados (levemente superiores)
                const fontSize = Math.max(11, Math.min(15, Math.floor(Math.min(pw, ph) / 5.5)));
                const fontSizeCota = Math.max(11, Math.min(15, Math.floor(Math.min(pw, ph) / 5.5)));
                const margin = 6;

                // --- 1. NOMBRE: centrado en la pieza (NEGRO) ---
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#000000';
                ctx.font = `bold ${fontSize}px "Segoe UI", sans-serif`;
                const nameText = (pp.name || 'Pieza').substring(0, 14);
                ctx.fillText(nameText, px + pw/2, py + ph/2);

                // --- 2. LARGO (dimension original del usuario): ARRIBA (NEGRO) ---
                const cotaY = py + margin + fontSizeCota + 2;

                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillStyle = '#000000';
                ctx.font = `bold ${fontSizeCota}px "Consolas", monospace`;
                const largoText = `${largo.toFixed(0)}${unitLabel}`;
                ctx.fillText(largoText, px + pw/2, cotaY);

                // Linea de cota horizontal punteada (NEGRO)
                ctx.strokeStyle = 'rgba(0,0,0,0.4)';
                ctx.lineWidth = 0.8;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(px + 10, py + margin + 2);
                ctx.lineTo(px + pw - 10, py + margin + 2);
                ctx.stroke();
                ctx.setLineDash([]);

                // Marcas de extension (ticts) en los extremos (NEGRO)
                ctx.fillStyle = '#000000';
                ctx.fillRect(px + 8, py + margin, 4, 2);
                ctx.fillRect(px + pw - 12, py + margin, 4, 2);

                // --- 3. ANCHO (dimension original del usuario): DERECHA (NEGRO) ---
                const cotaX = px + pw - margin - 2;

                ctx.save();
                ctx.translate(cotaX, py + ph/2);
                ctx.rotate(-Math.PI / 2);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillStyle = '#000000';
                ctx.font = `bold ${fontSizeCota}px "Consolas", monospace`;
                const anchoText = `${ancho.toFixed(0)}${unitLabel}`;
                ctx.fillText(anchoText, 0, 0);
                ctx.restore();

                // Linea de cota vertical punteada (NEGRO)
                ctx.strokeStyle = 'rgba(0,0,0,0.4)';
                ctx.lineWidth = 0.8;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(px + pw - margin - 2, py + 10);
                ctx.lineTo(px + pw - margin - 2, py + ph - 10);
                ctx.stroke();
                ctx.setLineDash([]);

                // Marcas de extension (ticts) en los extremos (NEGRO)
                ctx.fillStyle = '#000000';
                ctx.fillRect(px + pw - margin - 4, py + 8, 2, 4);
                ctx.fillRect(px + pw - margin - 4, py + ph - 12, 2, 4);

                // --- 4. CODIGO: esquina inferior izquierda (NEGRO, opcional) ---
                if (pp.code && pw > 70 && ph > 55) {
                    ctx.fillStyle = 'rgba(0,0,0,0.4)';
                    ctx.font = `${Math.max(7, fontSizeCota - 1)}px "Segoe UI", sans-serif`;
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(pp.code.substring(0, 12), px + margin + 2, py + ph - margin - 2);
                }
            }
        });

        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() || '#718096';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${plate.length} x ${plate.width}`, x + w/2, y + h + 14);
    }

    function renderMinimap() {
        if (!minimapCtx || !state.optimization) return;
        const bg = getComputedStyle(document.body).getPropertyValue('--bg-primary').trim() || '#e0e5ec';
        minimapCtx.fillStyle = bg;
        minimapCtx.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height);
        if (!state.optimization.plates || state.currentPlate >= state.optimization.plates.length) return;
        const plate = state.optimization.plates[state.currentPlate];
        if (!plate) return;
        const s = Math.min(minimapCanvas.width / plate.length, minimapCanvas.height / plate.width) * 0.9;
        const ox = (minimapCanvas.width - plate.length * s) / 2;
        const oy = (minimapCanvas.height - plate.width * s) / 2;
        minimapCtx.fillStyle = '#fff';
        minimapCtx.fillRect(ox, oy, plate.length*s, plate.width*s);
        if (plate.placedPieces) {
            plate.placedPieces.forEach(pp => {
                if (!pp) return;
                minimapCtx.fillStyle = pp.color || '#e53935';
                minimapCtx.fillRect(ox + pp.x*s, oy + pp.y*s, pp.width*s, pp.height*s);
            });
        }
    }

    function zoomIn() { state.zoom *= 1.2; render(); updateZoomLabel(); }
    function zoomOut() { state.zoom /= 1.2; render(); updateZoomLabel(); }
    function zoomFit() { autoFitAndCenter(); }
    function updateZoomLabel() { const el = document.getElementById('zoomLevel'); if (el) el.textContent = Math.round(state.zoom * 100) + '%'; }
    function toggleGrid() { state.showGrid = !state.showGrid; document.getElementById('btnToggleGrid')?.classList.toggle('active', state.showGrid); render(); }
    function toggleLabels() { state.showLabels = !state.showLabels; document.getElementById('btnToggleLabels')?.classList.toggle('active', state.showLabels); render(); }
    function toggleRulers() { state.showRulers = !state.showRulers; document.getElementById('btnToggleRulers')?.classList.toggle('active', state.showRulers); render(); }
    function prevPlate() { if (state.optimization && state.currentPlate > 0) { state.currentPlate--; render(); if (typeof App !== 'undefined' && App.updateResults) App.updateResults(); } }
    function nextPlate() { if (state.optimization && state.currentPlate < state.optimization.plates.length - 1) { state.currentPlate++; render(); if (typeof App !== 'undefined' && App.updateResults) App.updateResults(); } }
    function viewAll() { state.viewMode = state.viewMode === 'all' ? 'single' : 'all'; render(); }
    function exportImage() { const link = document.createElement('a'); link.download = 'plano_corte.png'; link.href = canvas.toDataURL(); link.click(); }
    function exportPNG() { exportImage(); }
    function exportSVG() {
        if (!state.optimization) return;
        const plate = state.optimization.plates[state.currentPlate];
        if (!plate) return;
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${plate.length}" height="${plate.width}" viewBox="0 0 ${plate.length} ${plate.width}">`;
        svg += `<rect width="100%" height="100%" fill="#f5f5f5" stroke="#333" stroke-width="2"/>`;
        if (plate.placedPieces) {
            plate.placedPieces.forEach(pp => {
                if (!pp) return;
                svg += `<rect x="${pp.x}" y="${pp.y}" width="${pp.width}" height="${pp.height}" fill="${pp.color || '#e53935'}" stroke="#333" stroke-width="1"/>`;
                svg += `<text x="${pp.x + pp.width/2}" y="${pp.y + pp.height/2}" text-anchor="middle" font-size="12" fill="#000">${pp.name || ''}</text>`;
            });
        }
        svg += '</svg>';
        const blob = new Blob([svg], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a'); link.download = 'plano_corte.svg'; link.href = url; link.click();
    }

    if (canvas) {
        canvas.addEventListener('mousedown', e => { state.isDragging = true; state.lastX = e.clientX; state.lastY = e.clientY; });
        window.addEventListener('mousemove', e => {
            if (!state.isDragging) return;
            state.offsetX += e.clientX - state.lastX;
            state.offsetY += e.clientY - state.lastY;
            state.lastX = e.clientX; state.lastY = e.clientY;
            render();
        });
        window.addEventListener('mouseup', () => state.isDragging = false);
        canvas.addEventListener('wheel', e => { e.preventDefault(); if (e.deltaY < 0) zoomIn(); else zoomOut(); });
    }
    window.addEventListener('resize', resize);

    return { resize, setOptimization, clear, render, zoomIn, zoomOut, zoomFit, toggleGrid, toggleLabels, toggleRulers, prevPlate, nextPlate, viewAll, exportImage, exportPNG, exportSVG, autoFitAndCenter };
})();
