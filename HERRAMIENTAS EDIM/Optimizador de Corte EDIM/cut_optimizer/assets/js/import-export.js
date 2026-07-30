/**
 * Cutting Optimizer Pro - Import / Export
 */
const ImportExport = (function() {
    'use strict';

    function exportCSV() {
        if (!App.state.optimization) return;
        let csv = 'Orden,Codigo,Nombre,Largo,Ancho,Placa,X,Y,Rotacion\n';
        let order = 1;
        App.state.optimization.plates.forEach((plate, pIdx) => {
            plate.placedPieces.forEach(pp => {
                const piece = App.state.pieces.find(p => p.id === pp.pieceId);
                csv += `${order++},${piece?.code||''},${piece?.name||''},${pp.width},${pp.height},${pIdx+1},${pp.x},${pp.y},${pp.rotated?'Si':'No'}\n`;
            });
        });
        downloadBlob(csv, 'lista_cortes.csv', 'text/csv');
    }

    function exportExcel() {
        if (!App.state.optimization) return;
        const data = [];
        let order = 1;
        App.state.optimization.plates.forEach((plate, pIdx) => {
            plate.placedPieces.forEach(pp => {
                const piece = App.state.pieces.find(p => p.id === pp.pieceId);
                data.push({ Orden: order++, Codigo: piece?.code||'', Nombre: piece?.name||'', Largo: pp.width, Ancho: pp.height, Placa: pIdx+1, X: pp.x, Y: pp.y, Rotacion: pp.rotated?'Si':'No' });
            });
        });
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Cortes');
        XLSX.writeFile(wb, 'lista_cortes.xlsx');
    }

    function exportJSON() {
        const data = { project: App.state.project, plates: App.state.plates, pieces: App.state.pieces, optimization: App.state.optimization };
        downloadBlob(JSON.stringify(data, null, 2), 'proyecto.json', 'application/json');
    }

    function exportCutList() { exportCSV(); }

    function showImportDialog() {
        const content = `
            <div class="neu-dropzone" id="dropZone" style="padding:32px;text-align:center;cursor:pointer;border:2px dashed var(--border);border-radius:12px;">
                <div style="font-size:36px;margin-bottom:12px;">&#128193;</div>
                <div style="font-size:13px;color:var(--text-secondary);">Arrastre archivos aqui o haga clic para seleccionar</div>
                <div style="font-size:11px;color:var(--text-muted);">Soporta CSV, Excel (.xlsx) y JSON</div>
                <input type="file" id="importFile" accept=".csv,.xlsx,.json" style="display:none">
            </div>
        `;
        App.showModal('Importar Piezas', content, [{text:'Cerrar', action:'App.closeModal()', class:''}]);
        setTimeout(() => {
            const dz = document.getElementById('dropZone');
            const input = document.getElementById('importFile');
            dz.addEventListener('click', () => input.click());
            input.addEventListener('change', e => handleFile(e.target.files[0]));
            dz.addEventListener('dragover', e => { e.preventDefault(); dz.style.borderColor='var(--accent)'; });
            dz.addEventListener('dragleave', () => dz.style.borderColor='var(--border)');
            dz.addEventListener('drop', e => { e.preventDefault(); dz.style.borderColor='var(--border)'; handleFile(e.dataTransfer.files[0]); });
        }, 100);
    }

    function handleFile(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            try {
                if (file.name.endsWith('.json')) {
                    const data = JSON.parse(e.target.result);
                    if (data.pieces) { data.pieces.forEach(p => App.addPiece(p)); }
                    if (data.plates) { data.plates.forEach(p => App.addPlate(p)); }
                    App.notify('Importado', 'Proyecto JSON importado correctamente.', 'success');
                } else if (file.name.endsWith('.csv')) {
                    parseCSV(e.target.result);
                } else if (file.name.endsWith('.xlsx')) {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, {type: 'array'});
                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    const json = XLSX.utils.sheet_to_json(firstSheet);
                    importFromArray(json);
                }
            } catch(err) { App.notify('Error', 'No se pudo importar: ' + err.message, 'error'); }
            App.closeModal();
        };
        if (file.name.endsWith('.xlsx')) reader.readAsArrayBuffer(file);
        else reader.readAsText(file);
    }

    function parseCSV(text) {
        const lines = text.split('\n').filter(l => l.trim());
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const rows = lines.slice(1).map(l => l.split(','));
        const data = rows.map(r => {
            const obj = {};
            headers.forEach((h, i) => obj[h] = (r[i]||'').trim());
            return obj;
        });
        importFromArray(data);
    }

    function importFromArray(data) {
        let count = 0;
        data.forEach(row => {
            const name = row.nombre || row.name || row.Nombre || 'Pieza';
            const code = row.codigo || row.code || row.Codigo || '';
            const length = parseFloat(row.largo || row.length || row.Largo || 0);
            const width = parseFloat(row.ancho || row.width || row.Ancho || 0);
            const qty = parseInt(row.cantidad || row.quantity || row.Cantidad || 1);
            if (length > 0 && width > 0) {
                App.addPiece({ id: Date.now()+Math.random(), name, code, length, width, quantity: qty, allowRotation: true, color: App.pieceColors[count % App.pieceColors.length] });
                count++;
            }
        });
        App.notify('Importado', `${count} piezas importadas correctamente.`, 'success');
    }

    function downloadBlob(content, filename, type) {
        const blob = new Blob([content], {type});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
        URL.revokeObjectURL(url);
    }

    return { exportCSV, exportExcel, exportJSON, exportCutList, showImportDialog };
})();
