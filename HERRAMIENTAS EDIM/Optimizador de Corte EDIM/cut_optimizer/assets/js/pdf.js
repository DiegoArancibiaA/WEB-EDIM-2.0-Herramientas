/**
 * Cutting Optimizer Pro - PDF Generator
 * Orientación: Vertical (Portrait)
 * Incluye: Logo EDIM, info completa, dibujo de placas a página completa con medidas,
 *          lista de cortes detallada, todo en español.
 */
const PDFGenerator = (function() {
    'use strict';
    const { jsPDF } = window.jspdf;

    /**
     * Intenta obtener el logo de EDIM del DOM como DataURL (base64).
     * Si no puede, retorna null y se usa un fallback de texto.
     */
    async function getLogoDataUrl() {
        return new Promise((resolve) => {
            const img = document.querySelector('header img[src*="logo-edim"]');
            if (!img || !img.complete) {
                resolve(null);
                return;
            }
            try {
                const c = document.createElement('canvas');
                c.width = img.naturalWidth || 120;
                c.height = img.naturalHeight || 40;
                const cx = c.getContext('2d');
                cx.drawImage(img, 0, 0);
                resolve(c.toDataURL('image/png'));
            } catch (e) {
                resolve(null);
            }
        });
    }

    /**
     * Convierte un color hex (#rrggbb) a objeto {r,g,b} para jsPDF
     */
    function hexToRgb(hex) {
        const clean = hex.replace('#', '');
        return {
            r: parseInt(clean.substring(0, 2), 16),
            g: parseInt(clean.substring(2, 4), 16),
            b: parseInt(clean.substring(4, 6), 16)
        };
    }

    async function generate() {
        try {
            const opt = App.state.optimization;
            if (!opt) {
                App.notify('Error', 'No hay optimización para exportar. Ejecute la optimización primero.', 'error');
                return;
            }

            const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const proj = App.state.project;
            const company = localStorage.getItem('co_company') || proj.company || 'EDIM Soluciones';
            const unit = proj.unit || 'mm';

            // ============================================================
            // PÁGINA 1: PORTADA CON INFORMACIÓN COMPLETA
            // ============================================================

            // --- Logo EDIM Soluciones ---
            const logoData = await getLogoDataUrl();
            if (logoData) {
                doc.addImage(logoData, 'PNG', 10, 6, 50, 14);
            } else {
                // Fallback: recuadro con nombre
                doc.setFillColor(229, 57, 53);
                doc.rect(10, 6, 50, 14, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.text('EDIM SOLUCIONES', 35, 14, { align: 'center' });
            }

            // --- Título principal ---
            doc.setTextColor(50, 50, 50);
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.text('PLANILLA DE CORTE', 105, 16, { align: 'center' });
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(100);
            doc.text('Optimizador de Corte Pro  |  EDIM Soluciones', 105, 21, { align: 'center' });

            // Línea separadora roja
            doc.setDrawColor(229, 57, 53);
            doc.setLineWidth(0.6);
            doc.line(10, 24, 200, 24);

            // --- Datos del Proyecto (dos columnas) ---
            doc.setTextColor(50);
            doc.setFontSize(10);
            let y = 32;
            const col1 = 10;
            const col2 = 110;

            const infoLeft = [
                ['Proyecto:', proj.name || '-'],
                ['Cliente:', proj.client || '-'],
                ['Empresa:', proj.company || '-'],
                ['Operador:', proj.operator || '-']
            ];
            const infoRight = [
                ['Fecha:', proj.date || '-'],
                ['Material:', proj.material || '-'],
                ['Espesor:', (proj.thickness || '-') + ' mm'],
                ['Unidad:', unit]
            ];

            infoLeft.forEach(([label, val], i) => {
                doc.setFont(undefined, 'bold');
                doc.text(label, col1, y + i * 6);
                doc.setFont(undefined, 'normal');
                doc.text(val, col1 + 28, y + i * 6);
            });

            infoRight.forEach(([label, val], i) => {
                doc.setFont(undefined, 'bold');
                doc.text(label, col2, y + i * 6);
                doc.setFont(undefined, 'normal');
                doc.text(val, col2 + 24, y + i * 6);
            });

            y += 28;

            // --- Observaciones ---
            if (proj.notes) {
                doc.setFont(undefined, 'bold');
                doc.text('Observaciones:', col1, y);
                doc.setFont(undefined, 'normal');
                const splitNotes = doc.splitTextToSize(proj.notes, 185);
                doc.text(splitNotes, col1, y + 5);
                y += 5 + (splitNotes.length * 4.5);
            }

            y += 4;

            // --- Resumen de Optimización (caja destacada) ---
            doc.setFillColor(229, 57, 53);
            doc.rect(col1, y, 190, 7, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.text('RESUMEN DE OPTIMIZACIÓN', 105, y + 5, { align: 'center' });

            y += 10;
            doc.setTextColor(50);
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');

            const s = opt.stats;
            const areaFactor = unit === 'm' ? 1000000 : unit === 'cm' ? 100 : 1;
            const areaLabel = unit === 'm' ? 'm²' : unit === 'cm' ? 'cm²' : 'mm²';
            const lenFactor = unit === 'm' ? 1000 : unit === 'cm' ? 10 : 1;
            const lenLabel = unit === 'm' ? 'm' : unit === 'cm' ? 'cm' : 'mm';

            const statsRows = [
                ['Placas usadas:', s.platesUsed, 'Eficiencia global:', s.efficiency.toFixed(1) + '%'],
                ['Placas sobrantes:', s.platesLeftover, 'Desperdicio:', s.waste.toFixed(1) + '%'],
                ['Piezas colocadas:', s.placedPieces + '/' + s.totalPieces, 'Área usada:', (s.usedArea / areaFactor).toFixed(2) + ' ' + areaLabel],
                ['Longitud de corte:', (s.cutLength / lenFactor).toFixed(1) + ' ' + lenLabel, 'Área desperdiciada:', (s.wasteArea / areaFactor).toFixed(2) + ' ' + areaLabel],
                ['Cantidad de cortes:', s.cutCount, 'Costo estimado:', '$ ' + s.cost.toFixed(2)],
                ['Tiempo de cálculo:', s.time.toFixed(2) + ' s', 'Algoritmo usado:', (opt.algorithm || 'Auto').toUpperCase()]
            ];

            statsRows.forEach((row, i) => {
                const rowY = y + (i * 5.5);
                doc.setFont(undefined, 'bold'); doc.text(row[0], col1, rowY);
                doc.setFont(undefined, 'normal'); doc.text(String(row[1]), col1 + 40, rowY);
                doc.setFont(undefined, 'bold'); doc.text(row[2], col2, rowY);
                doc.setFont(undefined, 'normal'); doc.text(String(row[3]), col2 + 40, rowY);
            });

            y += statsRows.length * 5.5 + 6;

            // --- Tabla de Placas Disponibles ---
            if (App.state.plates.length > 0 && y < 255) {
                doc.setFillColor(240, 240, 240);
                doc.rect(col1, y, 190, 6, 'F');
                doc.setTextColor(50);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('PLACAS DISPONIBLES', col1 + 2, y + 4);
                y += 8;

                doc.setFillColor(220, 220, 220);
                doc.rect(col1, y, 190, 5, 'F');
                doc.setFontSize(8);
                const headers = ['Cant.', 'Largo ('+unit+')', 'Ancho ('+unit+')', 'Espesor (mm)', 'Costo ($)', 'Código'];
                const hX = [col1 + 2, col1 + 30, col1 + 60, col1 + 90, col1 + 120, col1 + 150];
                headers.forEach((h, i) => doc.text(h, hX[i], y + 3.5));
                y += 5;

                doc.setFont(undefined, 'normal');
                App.state.plates.forEach(p => {
                    doc.text(String(p.quantity), hX[0], y + 3.5);
                    doc.text(String(p.length), hX[1], y + 3.5);
                    doc.text(String(p.width), hX[2], y + 3.5);
                    doc.text(String(p.thickness || 18), hX[3], y + 3.5);
                    doc.text(String(p.cost || 0), hX[4], y + 3.5);
                    doc.text(p.code || '-', hX[5], y + 3.5);
                    y += 4.5;
                });
                y += 3;
            }

            // --- Tabla de Piezas Solicitadas ---
            if (App.state.pieces.length > 0 && y < 270) {
                doc.setFillColor(240, 240, 240);
                doc.rect(col1, y, 190, 6, 'F');
                doc.setTextColor(50);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('PIEZAS A CORTAR', col1 + 2, y + 4);
                y += 8;

                doc.setFillColor(220, 220, 220);
                doc.rect(col1, y, 190, 5, 'F');
                doc.setFontSize(8);
                const pHeaders = ['Cant.', 'Nombre', 'Código', 'Largo', 'Ancho', 'Rot.'];
                const pX = [col1 + 2, col1 + 22, col1 + 75, col1 + 105, col1 + 130, col1 + 155];
                pHeaders.forEach((h, i) => doc.text(h, pX[i], y + 3.5));
                y += 5;

                doc.setFont(undefined, 'normal');
                App.state.pieces.forEach(p => {
                    if (y > 280) { doc.addPage(); y = 15; }
                    doc.text(String(p.quantity), pX[0], y + 3.5);
                    doc.text((p.name || '-').substring(0, 22), pX[1], y + 3.5);
                    doc.text(p.code || '-', pX[2], y + 3.5);
                    doc.text(String(p.length), pX[3], y + 3.5);
                    doc.text(String(p.width), pX[4], y + 3.5);
                    doc.text(p.allowRotation ? 'Sí' : 'No', pX[5], y + 3.5);
                    y += 4.5;
                });
            }

            // ============================================================
            // PÁGINAS DE PLACAS: UNA PLACA POR PÁGINA, A PÁGINA COMPLETA
            // ============================================================
            opt.plates.forEach((plate, idx) => {
                doc.addPage();

                // Header rojo de placa
                doc.setFillColor(229, 57, 53);
                doc.rect(0, 0, 210, 12, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.text(
                    `PLACA N° ${idx + 1}  |  ${plate.length} x ${plate.width} ${unit}  |  Eficiencia: ${plate.efficiency.toFixed(1)}%  |  Piezas: ${plate.placedPieces.length}`,
                    105, 8, { align: 'center' }
                );

                // Área de dibujo (ocupa casi toda la página)
                const margin = 10;
                const drawY = 16;
                const maxDrawW = 190;  // ancho útil A4 portrait
                const maxDrawH = 258;  // alto útil (297 - márgenes - header)
                const scale = Math.min(maxDrawW / plate.length, maxDrawH / plate.width);
                const drawW = plate.length * scale;
                const drawH = plate.width * scale;
                const drawX = margin + (maxDrawW - drawW) / 2;

                // Fondo de la placa
                doc.setFillColor(250, 250, 250);
                doc.setDrawColor(30, 30, 30);
                doc.setLineWidth(0.8);
                doc.rect(drawX, drawY, drawW, drawH, 'FD');

                // Dibujar cada pieza
                if (plate.placedPieces) {
                    plate.placedPieces.forEach(pp => {
                        const px = drawX + pp.x * scale;
                        const py = drawY + pp.y * scale;
                        const pw = pp.width * scale;
                        const ph = pp.height * scale;

                        // Color de relleno
                        const rgb = hexToRgb(pp.color || '#e53935');
                        doc.setFillColor(rgb.r, rgb.g, rgb.b);
                        doc.setDrawColor(20, 20, 20);
                        doc.setLineWidth(0.3);
                        doc.rect(px, py, pw, ph, 'FD');

                        // Medidas originales (sin kerf)
                        const origL = pp.origLargo || pp.originalLength || (pp.rotated ? pp.height : pp.width);
                        const origA = pp.origAncho || pp.originalWidth || (pp.rotated ? pp.width : pp.height);

                        doc.setTextColor(0, 0, 0);

                        // Nombre centrado (siempre que haya espacio mínimo)
                        if (pw > 10 && ph > 8) {
                            const fontSize = Math.max(5, Math.min(10, Math.floor(Math.min(pw, ph) / 2.8)));
                            doc.setFontSize(fontSize);
                            doc.setFont(undefined, 'bold');
                            const name = (pp.name || 'Pieza').substring(0, 14);
                            // Centrado aproximado: y + h/2 + offset de fuente
                            doc.text(name, px + pw / 2, py + ph / 2 + fontSize / 3, { align: 'center' });
                        }

                        // Dimensiones: Largo arriba, Ancho abajo
                        if (pw > 15 && ph > 12) {
                            const dimFont = Math.max(5, Math.min(8, Math.floor(Math.min(pw, ph) / 3.2)));
                            doc.setFontSize(dimFont);
                            doc.setFont(undefined, 'normal');

                            // Largo (cota superior, centrada)
                            doc.text(`L: ${origL.toFixed(0)} ${unit}`, px + pw / 2, py + dimFont + 1, { align: 'center' });

                            // Ancho (cota inferior, centrada)
                            doc.text(`A: ${origA.toFixed(0)} ${unit}`, px + pw / 2, py + ph - 1, { align: 'center' });
                        }

                        // Código (esquina inferior izquierda, si hay espacio)
                        if (pp.code && pw > 20 && ph > 16) {
                            doc.setFontSize(5);
                            doc.setFont(undefined, 'normal');
                            doc.text(pp.code.substring(0, 12), px + 1.5, py + ph - 1.5);
                        }
                    });
                }

                // Leyenda de dimensiones de la placa
                doc.setFontSize(9);
                doc.setTextColor(80);
                doc.setFont(undefined, 'normal');
                doc.text(
                    `Dimensiones de la placa: ${plate.length} ${unit} (largo) × ${plate.width} ${unit} (ancho)`,
                    105, drawY + drawH + 5, { align: 'center' }
                );
            });

            // ============================================================
            // PÁGINA FINAL: LISTA DETALLADA DE CORTES
            // ============================================================
            doc.addPage();
            doc.setFillColor(229, 57, 53);
            doc.rect(0, 0, 210, 12, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('LISTA DETALLADA DE CORTES', 105, 8, { align: 'center' });

            let row = 16;
            doc.setFillColor(220, 220, 220);
            doc.rect(10, row, 190, 6, 'F');
            doc.setTextColor(50);
            doc.setFontSize(8);
            doc.setFont(undefined, 'bold');

            const tCols = [12, 24, 58, 92, 118, 142, 165, 188];
            const tHeaders = ['#', 'Código', 'Nombre', 'Dimensiones', 'Placa', 'Posición', 'Rot.', 'Área'];
            tHeaders.forEach((h, i) => doc.text(h, tCols[i], row + 4));
            row += 6;

            doc.setFont(undefined, 'normal');
            let order = 1;
            opt.plates.forEach((plate, pIdx) => {
                plate.placedPieces.forEach(pp => {
                    if (row > 282) { doc.addPage(); row = 15; }

                    const piece = App.state.pieces.find(p => p.id === pp.pieceId);
                    const origL = pp.origLargo || pp.originalLength || (pp.rotated ? pp.height : pp.width);
                    const origA = pp.origAncho || pp.originalWidth || (pp.rotated ? pp.width : pp.height);

                    doc.text(String(order++), tCols[0], row + 3.5);
                    doc.text(piece?.code || '-', tCols[1], row + 3.5);
                    doc.text((piece?.name || 'Pieza').substring(0, 20), tCols[2], row + 3.5);
                    doc.text(`${origL.toFixed(0)} × ${origA.toFixed(0)} ${unit}`, tCols[3], row + 3.5);
                    doc.text(String(pIdx + 1), tCols[4], row + 3.5);
                    doc.text(`${pp.x.toFixed(0)}, ${pp.y.toFixed(0)}`, tCols[5], row + 3.5);
                    doc.text(pp.rotated ? 'Sí' : 'No', tCols[6], row + 3.5);
                    doc.text(`${(origL * origA).toFixed(0)} ${areaLabel}`, tCols[7], row + 3.5);
                    row += 4.5;
                });
            });

            // ============================================================
            // FOOTER EN TODAS LAS PÁGINAS
            // ============================================================
            const pageCount = doc.internal.getNumberOfPages();
            const now = new Date().toLocaleString('es-ES', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });

            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setDrawColor(200);
                doc.setLineWidth(0.3);
                doc.line(10, 287, 200, 287);

                doc.setFontSize(8);
                doc.setTextColor(100);
                doc.setFont(undefined, 'normal');
                doc.text(`Optimizador de Corte Pro  |  EDIM Soluciones  |  ${now}`, 105, 292, { align: 'center' });
                doc.text(`Página ${i} de ${pageCount}`, 195, 292, { align: 'right' });
            }

            doc.save(`Corte_${proj.name || 'Proyecto'}_${new Date().toISOString().slice(0, 10)}.pdf`);
            App.notify('PDF Generado', 'El documento PDF se ha descargado correctamente.', 'success');

        } catch (err) {
            console.error(err);
            App.notify('Error al generar PDF', err.message, 'error');
        }
    }

    return { generate };
})();
