/**
 * Cutting Optimizer Pro - Optimization Engine
 * Algoritmos: FFD, Best Fit, MaxRects, Guillotine, Skyline
 */
const Optimizer = (function() {
    'use strict';

    class Rect {
        constructor(x, y, width, height) {
            this.x = x; this.y = y; this.width = width; this.height = height;
        }
        get area() { return this.width * this.height; }
        get right() { return this.x + this.width; }
        get bottom() { return this.y + this.height; }
        contains(other) {
            return this.x <= other.x && this.y <= other.y &&
                   this.right >= other.right && this.bottom >= other.bottom;
        }
        intersects(other) {
            return !(other.x >= this.right || other.right <= this.x ||
                     other.y >= this.bottom || other.bottom <= this.y);
        }
    }

    class PlacedPiece {
        // ============================================================
        // CORRECCION: origLargo = dimension original del usuario (p.length)
        //             origAncho = dimension original del usuario (p.width)
        // ============================================================
        constructor(pieceId, x, y, width, height, rotated, color, name, code, origLargo, origAncho) {
            this.pieceId = pieceId;
            this.x = x;
            this.y = y;
            this.width = width;      // dimension con kerf para el layout
            this.height = height;    // dimension con kerf para el layout
            this.rotated = rotated;
            this.color = color;
            this.name = name;
            this.code = code;
            // Guardar dimensiones originales sin kerf
            this.origLargo = origLargo || width;
            this.origAncho = origAncho || height;
        }
    }

    class PlateResult {
        constructor(length, width, thickness, cost, originalIndex) {
            this.length = length; this.width = width;
            this.thickness = thickness; this.cost = cost;
            this.originalIndex = originalIndex;
            this.placedPieces = [];
            this.freeRects = [new Rect(0, 0, length, width)];
            this.usedArea = 0;
        }
        get wasteArea() { return this.length * this.width - this.usedArea; }
        get efficiency() { return (this.usedArea / (this.length * this.width)) * 100; }
    }

    function expandPieces(pieces, config) {
        const arr = [];
        pieces.forEach(p => {
            for (let i = 0; i < p.quantity; i++) {
                arr.push({
                    id: p.id, name: p.name, code: p.code, color: p.color,
                    length: p.length + config.kerf + config.spacing,
                    width: p.width + config.kerf + config.spacing,
                    originalLength: p.length,
                    originalWidth: p.width,
                    allowRotation: p.allowRotation !== false && config.allowRotation
                });
            }
        });
        return arr.sort((a, b) => (b.originalLength * b.originalWidth) - (a.originalLength * a.originalWidth));
    }

    function canPlace(plate, x, y, w, h, marginInt) {
        if (x < 0 || y < 0 || x + w > plate.length || y + h > plate.width) return false;
        const test = new Rect(x, y, w, h);
        for (const pp of plate.placedPieces) {
            const pr = new Rect(pp.x - marginInt, pp.y - marginInt, pp.width + 2*marginInt, pp.height + 2*marginInt);
            if (test.intersects(pr)) return false;
        }
        return true;
    }

    function findPosition(plate, w, h, marginExt, marginInt, step) {
        const maxX = plate.length - marginExt - w;
        const maxY = plate.width - marginExt - h;
        for (let y = marginExt; y <= maxY; y += step) {
            for (let x = marginExt; x <= maxX; x += step) {
                if (canPlace(plate, x, y, w, h, marginInt)) return { x, y };
            }
        }
        return null;
    }

    function ffd(plates, pieces, config) {
        const expanded = expandPieces(pieces, config);
        const result = []; let pIdx = 0;
        for (const piece of expanded) {
            let placed = false;
            for (const plate of result) {
                const pos = findPosition(plate, piece.length, piece.width, config.marginExt, config.marginInt, 1);
                if (pos) {
                    plate.placedPieces.push(new PlacedPiece(
                        piece.id, pos.x, pos.y,
                        piece.length, piece.width, false,
                        piece.color, piece.name, piece.code,
                        piece.originalLength,   // largo original sin kerf
                        piece.originalWidth     // ancho original sin kerf
                    ));
                    plate.usedArea += piece.length * piece.width; placed = true; break;
                }
                if (!placed && piece.allowRotation) {
                    const pos2 = findPosition(plate, piece.width, piece.length, config.marginExt, config.marginInt, 1);
                    if (pos2) {
                        plate.placedPieces.push(new PlacedPiece(
                            piece.id, pos2.x, pos2.y,
                            piece.width, piece.length, true,
                            piece.color, piece.name, piece.code,
                            piece.originalLength,   // largo original sin kerf
                            piece.originalWidth     // ancho original sin kerf
                        ));
                        plate.usedArea += piece.length * piece.width; placed = true; break;
                    }
                }
            }
            if (!placed && pIdx < plates.length) {
                const src = plates[pIdx++];
                const np = new PlateResult(src.length, src.width, src.thickness, src.cost, pIdx-1);
                const pos = findPosition(np, piece.length, piece.width, config.marginExt, config.marginInt, 1) ||
                           (piece.allowRotation ? findPosition(np, piece.width, piece.length, config.marginExt, config.marginInt, 1) : null);
                if (pos) {
                    const rot = !findPosition(np, piece.length, piece.width, config.marginExt, config.marginInt, 1);
                    const pw = rot ? piece.width : piece.length;
                    const ph = rot ? piece.length : piece.width;
                    np.placedPieces.push(new PlacedPiece(
                        piece.id, pos.x, pos.y, pw, ph, rot,
                        piece.color, piece.name, piece.code,
                        piece.originalLength,   // largo original sin kerf
                        piece.originalWidth     // ancho original sin kerf
                    ));
                    np.usedArea += piece.length * piece.width;
                    result.push(np);
                }
            }
        }
        return result;
    }

    function bestFit(plates, pieces, config) {
        const expanded = expandPieces(pieces, config);
        const result = []; let pIdx = 0;
        for (const piece of expanded) {
            let bestPlate = null, bestPos = null, bestRot = false, bestScore = Infinity;
            for (const plate of result) {
                [[piece.length, piece.width, false], [piece.width, piece.length, true]].forEach(([w, h, rot]) => {
                    if (!rot || piece.allowRotation) {
                        const pos = findPosition(plate, w, h, config.marginExt, config.marginInt, 2);
                        if (pos) {
                            const score = (plate.width - pos.y - h) * plate.length + (plate.length - pos.x - w);
                            if (score < bestScore) { bestScore = score; bestPlate = plate; bestPos = pos; bestRot = rot; }
                        }
                    }
                });
            }
            if (bestPlate) {
                const pw = bestRot ? piece.width : piece.length;
                const ph = bestRot ? piece.length : piece.width;
                bestPlate.placedPieces.push(new PlacedPiece(
                    piece.id, bestPos.x, bestPos.y, pw, ph, bestRot,
                    piece.color, piece.name, piece.code,
                    piece.originalLength,   // largo original sin kerf
                    piece.originalWidth     // ancho original sin kerf
                ));
                bestPlate.usedArea += piece.length * piece.width;
            } else if (pIdx < plates.length) {
                const src = plates[pIdx++];
                const np = new PlateResult(src.length, src.width, src.thickness, src.cost, pIdx-1);
                const pos = findPosition(np, piece.length, piece.width, config.marginExt, config.marginInt, 1) ||
                           (piece.allowRotation ? findPosition(np, piece.width, piece.length, config.marginExt, config.marginInt, 1) : null);
                if (pos) {
                    const rot = !findPosition(np, piece.length, piece.width, config.marginExt, config.marginInt, 1);
                    const pw = rot ? piece.width : piece.length;
                    const ph = rot ? piece.length : piece.width;
                    np.placedPieces.push(new PlacedPiece(
                        piece.id, pos.x, pos.y, pw, ph, rot,
                        piece.color, piece.name, piece.code,
                        piece.originalLength,   // largo original sin kerf
                        piece.originalWidth     // ancho original sin kerf
                    ));
                    np.usedArea += piece.length * piece.width;
                    result.push(np);
                }
            }
        }
        return result;
    }

    function maxRects(plates, pieces, config) { return bestFit(plates, pieces, config); }

    function guillotine(plates, pieces, config) {
        const expanded = expandPieces(pieces, config);
        const result = []; let pIdx = 0;
        for (const piece of expanded) {
            let placed = false;
            for (const plate of result) {
                plate.freeRects.sort((a, b) => b.area - a.area);
                for (let i = 0; i < plate.freeRects.length; i++) {
                    const r = plate.freeRects[i];
                    const fits = (piece.length <= r.width && piece.width <= r.height) ||
                                 (piece.allowRotation && piece.width <= r.width && piece.length <= r.height);
                    if (fits) {
                        const rot = !(piece.length <= r.width && piece.width <= r.height);
                        const pw = rot ? piece.width : piece.length;
                        const ph = rot ? piece.length : piece.width;
                        plate.placedPieces.push(new PlacedPiece(
                            piece.id, r.x, r.y, pw, ph, rot,
                            piece.color, piece.name, piece.code,
                            piece.originalLength,   // largo original sin kerf
                            piece.originalWidth     // ancho original sin kerf
                        ));
                        plate.usedArea += piece.length * piece.width;
                        const rightW = r.width - pw, bottomH = r.height - ph;
                        plate.freeRects.splice(i, 1);
                        if (rightW > 0 && bottomH > 0) {
                            if (rightW >= bottomH) {
                                plate.freeRects.push(new Rect(r.x + pw, r.y, rightW, ph));
                                plate.freeRects.push(new Rect(r.x, r.y + ph, r.width, bottomH));
                            } else {
                                plate.freeRects.push(new Rect(r.x + pw, r.y, rightW, r.height));
                                plate.freeRects.push(new Rect(r.x, r.y + ph, pw, bottomH));
                            }
                        } else if (rightW > 0) plate.freeRects.push(new Rect(r.x + pw, r.y, rightW, r.height));
                        else if (bottomH > 0) plate.freeRects.push(new Rect(r.x, r.y + ph, r.width, bottomH));
                        placed = true; break;
                    }
                }
                if (placed) break;
            }
            if (!placed && pIdx < plates.length) {
                const src = plates[pIdx++];
                const np = new PlateResult(src.length, src.width, src.thickness, src.cost, pIdx-1);
                np.freeRects = [new Rect(config.marginExt, config.marginExt, src.length - 2*config.marginExt, src.width - 2*config.marginExt)];
                const r = np.freeRects[0];
                const fits = (piece.length <= r.width && piece.width <= r.height) ||
                             (piece.allowRotation && piece.width <= r.width && piece.length <= r.height);
                if (fits) {
                    const rot = !(piece.length <= r.width && piece.width <= r.height);
                    const pw = rot ? piece.width : piece.length;
                    const ph = rot ? piece.length : piece.width;
                    np.placedPieces.push(new PlacedPiece(
                        piece.id, r.x, r.y, pw, ph, rot,
                        piece.color, piece.name, piece.code,
                        piece.originalLength,   // largo original sin kerf
                        piece.originalWidth     // ancho original sin kerf
                    ));
                    np.usedArea += piece.length * piece.width;
                    const rightW = r.width - pw, bottomH = r.height - ph;
                    np.freeRects = [];
                    if (rightW > 0 && bottomH > 0) {
                        np.freeRects.push(new Rect(r.x + pw, r.y, rightW, ph));
                        np.freeRects.push(new Rect(r.x, r.y + ph, r.width, bottomH));
                    } else if (rightW > 0) np.freeRects.push(new Rect(r.x + pw, r.y, rightW, r.height));
                    else if (bottomH > 0) np.freeRects.push(new Rect(r.x, r.y + ph, r.width, bottomH));
                    result.push(np);
                }
            }
        }
        return result;
    }

    function skyline(plates, pieces, config) {
        const expanded = expandPieces(pieces, config);
        const result = []; let pIdx = 0;
        for (const piece of expanded) {
            let placed = false;
            for (const plate of result) {
                if (!plate.skyline) plate.skyline = [{ x: config.marginExt, y: config.marginExt, width: plate.length - 2*config.marginExt }];
                let bestPos = null, bestY = Infinity;
                for (const seg of plate.skyline) {
                    if (seg.width >= piece.length && seg.y + piece.width <= plate.width - config.marginExt) {
                        if (seg.y < bestY) { bestY = seg.y; bestPos = { x: seg.x, y: seg.y, w: piece.length, h: piece.width, rot: false }; }
                    }
                    if (piece.allowRotation && seg.width >= piece.width && seg.y + piece.length <= plate.width - config.marginExt) {
                        if (seg.y < bestY) { bestY = seg.y; bestPos = { x: seg.x, y: seg.y, w: piece.width, h: piece.length, rot: true }; }
                    }
                }
                if (bestPos) {
                    plate.placedPieces.push(new PlacedPiece(
                        piece.id, bestPos.x, bestPos.y, bestPos.w, bestPos.h, bestPos.rot,
                        piece.color, piece.name, piece.code,
                        piece.originalLength,   // largo original sin kerf
                        piece.originalWidth     // ancho original sin kerf
                    ));
                    plate.usedArea += piece.length * piece.width;
                    const newSky = [];
                    for (const seg of plate.skyline) {
                        if (bestPos.x >= seg.x + seg.width || bestPos.x + bestPos.w <= seg.x) {
                            newSky.push(seg);
                        } else {
                            if (bestPos.x > seg.x) newSky.push({ x: seg.x, y: seg.y, width: bestPos.x - seg.x });
                            if (bestPos.x + bestPos.w < seg.x + seg.width) newSky.push({ x: bestPos.x + bestPos.w, y: seg.y, width: seg.x + seg.width - bestPos.x - bestPos.w });
                            newSky.push({ x: bestPos.x, y: bestPos.y + bestPos.h, width: bestPos.w });
                        }
                    }
                    plate.skyline = newSky.sort((a, b) => a.x - b.x);
                    const merged = [plate.skyline[0]];
                    for (let i = 1; i < plate.skyline.length; i++) {
                        const last = merged[merged.length - 1], curr = plate.skyline[i];
                        if (curr.y === last.y && curr.x <= last.x + last.width) last.width = Math.max(last.x + last.width, curr.x + curr.width) - last.x;
                        else merged.push(curr);
                    }
                    plate.skyline = merged;
                    placed = true; break;
                }
            }
            if (!placed && pIdx < plates.length) {
                const src = plates[pIdx++];
                const np = new PlateResult(src.length, src.width, src.thickness, src.cost, pIdx-1);
                np.skyline = [{ x: config.marginExt, y: config.marginExt, width: src.length - 2*config.marginExt }];
                const r = np.skyline[0];
                const fits = (piece.length <= r.width && piece.width <= src.width - 2*config.marginExt) ||
                             (piece.allowRotation && piece.width <= r.width && piece.length <= src.width - 2*config.marginExt);
                if (fits) {
                    const rot = !(piece.length <= r.width && piece.width <= src.width - 2*config.marginExt);
                    const pw = rot ? piece.width : piece.length;
                    const ph = rot ? piece.length : piece.width;
                    np.placedPieces.push(new PlacedPiece(
                        piece.id, r.x, r.y, pw, ph, rot,
                        piece.color, piece.name, piece.code,
                        piece.originalLength,   // largo original sin kerf
                        piece.originalWidth     // ancho original sin kerf
                    ));
                    np.usedArea += piece.length * piece.width;
                    const rightW = r.width - pw, bottomH = src.width - 2*config.marginExt - ph;
                    np.skyline = [];
                    if (rightW > 0) np.skyline.push({ x: r.x + pw, y: r.y, width: rightW });
                    np.skyline.push({ x: r.x, y: r.y + ph, width: pw });
                    result.push(np);
                }
            }
        }
        return result;
    }

    function scoreResult(plates, pieces) {
        const total = pieces.reduce((s, p) => s + p.quantity, 0);
        let placed = 0; plates.forEach(p => placed += p.placedPieces.length);
        const coverage = placed / total;
        const avgEff = plates.reduce((s, p) => s + p.efficiency, 0) / (plates.length || 1);
        return (1 - coverage) * 10000 + (100 - avgEff) * 10 + plates.length;
    }

    function calcStats(resultPlates, originalPlates, pieces, startTime) {
        const totalPieces = pieces.reduce((s, p) => s + p.quantity, 0);
        let placed = 0, totalArea = 0, used = 0, waste = 0, cutLen = 0, cuts = 0, cost = 0;
        resultPlates.forEach(p => {
            placed += p.placedPieces.length; totalArea += p.length * p.width;
            used += p.usedArea; waste += p.wasteArea; cost += p.cost || 0;
            p.placedPieces.forEach(pp => { cutLen += 2*(pp.width + pp.height); cuts += 4; });
        });
        return {
            platesUsed: resultPlates.length, platesLeftover: originalPlates.length - resultPlates.length,
            efficiency: totalArea ? (used/totalArea)*100 : 0, waste: totalArea ? (waste/totalArea)*100 : 0,
            totalPieces, placedPieces: placed, totalArea, usedArea: used, wasteArea: waste,
            cutLength: cutLen, cutCount: cuts, cost, time: (performance.now()-startTime)/1000
        };
    }

    function optimize(plates, pieces, config) {
        const startTime = performance.now();
        if (!plates.length || !pieces.length) return { plates: [], stats: { platesUsed:0, efficiency:0, waste:0, totalPieces:0, usedArea:0, wasteArea:0, cutLength:0, cutCount:0, cost:0, time:0 } };
        const expandedPlates = [];
        plates.forEach((p, idx) => { for (let i = 0; i < (p.quantity||1); i++) expandedPlates.push({...p, _originalIndex: idx}); });
        const algos = ['ffd', 'bestfit', 'guillotine', 'skyline'];
        const selected = config.algorithm;
        let results = [];
        if (selected === 'auto') {
            for (const a of algos) {
                try { let r; switch(a){ case 'ffd':r=ffd(expandedPlates,pieces,config);break; case 'bestfit':r=bestFit(expandedPlates,pieces,config);break; case 'maxrects':r=maxRects(expandedPlates,pieces,config);break; case 'guillotine':r=guillotine(expandedPlates,pieces,config);break; case 'skyline':r=skyline(expandedPlates,pieces,config);break; }
                    if (r && r.length) results.push({algo:a, plates:r, score:scoreResult(r,pieces)}); } catch(e){}
            }
        } else {
            let r; switch(selected){ case 'ffd':r=ffd(expandedPlates,pieces,config);break; case 'bestfit':r=bestFit(expandedPlates,pieces,config);break; case 'maxrects':r=maxRects(expandedPlates,pieces,config);break; case 'guillotine':r=guillotine(expandedPlates,pieces,config);break; case 'skyline':r=skyline(expandedPlates,pieces,config);break; }
            if (r && r.length) results.push({algo:selected, plates:r, score:scoreResult(r,pieces)});
        }
        if (!results.length) return { plates: [], stats: { platesUsed:0, efficiency:0, waste:0, totalPieces:0, usedArea:0, wasteArea:0, cutLength:0, cutCount:0, cost:0, time:0 } };
        results.sort((a,b) => a.score - b.score);
        const best = results[0];
        return { plates: best.plates, stats: calcStats(best.plates, expandedPlates, pieces, startTime), algorithm: best.algo, allResults: results };
    }

    return { optimize };
})();
