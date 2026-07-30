/**
 * Cutting Optimizer Pro - Application Core
 * Estado global, gestión de datos y eventos principales
 */

const App = (function() {
    'use strict';

    // Estado global de la aplicación
    const state = {
        project: {
            id: null,
            name: '',
            client: '',
            company: '',
            operator: '',
            date: new Date().toISOString().split('T')[0],
            material: 'aluminio',
            thickness: 18,
            unit: 'mm',
            notes: ''
        },
        plates: [],
        pieces: [],
        config: {
            kerf: 3.5,
            spacing: 2,
            marginExt: 5,
            marginInt: 0,
            mode: 'balanced',
            algorithm: 'auto',
            allowRotation: true
        },
        optimization: null,
        history: [],
        historyIndex: -1,
        currentPlateIndex: 0,
        viewMode: 'single', // 'single' | 'all'
        darkMode: false
    };

    // Colores para piezas (paleta profesional)
    const pieceColors = [
        '#e53935', '#2196f3', '#4caf50', '#ff9800', '#9c27b0',
        '#00bcd4', '#ff5722', '#795548', '#607d8b', '#8bc34a',
        '#ffc107', '#3f51b5', '#009688', '#e91e63', '#673ab7',
        '#cddc39', '#ffeb3b', '#03a9f4', '#f44336', '#9e9e9e'
    ];

    // Inicialización
    function init() {
        loadFromLocalStorage();
        setupEventListeners();
        setupKeyboardShortcuts();
        populateTables();
        updateProjectDisplay();
        document.getElementById('projectDate').value = state.project.date;

        // Ocultar loading
        setTimeout(() => {
            document.getElementById('loadingOverlay').classList.add('hidden');
        }, 800);

        // Autosave cada 30 segundos
        setInterval(() => {
            if (state.project.name || state.plates.length > 0 || state.pieces.length > 0) {
                saveToLocalStorage();
            }
        }, 30000);
    }

    // Guardar estado en historial (undo/redo)
    function pushHistory() {
        const snapshot = JSON.stringify({
            project: { ...state.project },
            plates: [...state.plates],
            pieces: [...state.pieces],
            config: { ...state.config }
        });

        // Eliminar estados futuros si estamos en medio del historial
        if (state.historyIndex < state.history.length - 1) {
            state.history = state.history.slice(0, state.historyIndex + 1);
        }

        state.history.push(snapshot);
        if (state.history.length > 50) state.history.shift();
        else state.historyIndex++;

        updateUndoRedoButtons();
    }

    function undo() {
        if (state.historyIndex > 0) {
            state.historyIndex--;
            restoreFromHistory();
        }
    }

    function redo() {
        if (state.historyIndex < state.history.length - 1) {
            state.historyIndex++;
            restoreFromHistory();
        }
    }

    function restoreFromHistory() {
        const data = JSON.parse(state.history[state.historyIndex]);
        state.project = data.project;
        state.plates = data.plates;
        state.pieces = data.pieces;
        state.config = data.config;
        populateTables();
        updateProjectDisplay();
        updateUndoRedoButtons();
    }

    function updateUndoRedoButtons() {
        const btnUndo = document.getElementById('btnUndo');
        const btnRedo = document.getElementById('btnRedo');
        if (btnUndo) btnUndo.disabled = state.historyIndex <= 0;
        if (btnRedo) btnRedo.disabled = state.historyIndex >= state.history.length - 1;
    }

    // Gestión de placas
    function addPlate(plate = null) {
        const newPlate = plate || {
            id: Date.now() + Math.random(),
            quantity: 1,
            length: 2440,
            width: 1220,
            thickness: state.project.thickness || 18,
            cost: 0,
            supplier: '',
            code: '',
            color: '',
            notes: ''
        };
        state.plates.push(newPlate);
        populatePlatesTable();
        pushHistory();
        notify('Placa agregada', 'Se agregó una nueva placa al proyecto.', 'success');
    }

    function removePlate(id) {
        state.plates = state.plates.filter(p => p.id !== id);
        populatePlatesTable();
        pushHistory();
    }

    function updatePlate(id, field, value) {
        const plate = state.plates.find(p => p.id === id);
        if (plate) {
            const numFields = ['quantity', 'length', 'width', 'thickness', 'cost'];
            plate[field] = numFields.includes(field) ? parseFloat(value) || 0 : value;
        }
    }

    // Gestión de piezas
    function addPiece(piece = null) {
        const newPiece = piece || {
            id: Date.now() + Math.random(),
            quantity: 1,
            name: '',
            code: '',
            length: 300,
            width: 200,
            thickness: state.project.thickness || 18,
            priority: 1,
            material: state.project.material || 'aluminio',
            notes: '',
            color: pieceColors[state.pieces.length % pieceColors.length],
            allowRotation: true
        };
        state.pieces.push(newPiece);
        populatePiecesTable();
        pushHistory();
        notify('Pieza agregada', 'Se agregó una nueva pieza.', 'success');
    }

    function removePiece(id) {
        state.pieces = state.pieces.filter(p => p.id !== id);
        populatePiecesTable();
        pushHistory();
    }

    function updatePiece(id, field, value) {
        const piece = state.pieces.find(p => p.id === id);
        if (piece) {
            const numFields = ['quantity', 'length', 'width', 'thickness', 'priority'];
            if (field === 'allowRotation') {
                piece[field] = value;
            } else {
                piece[field] = numFields.includes(field) ? parseFloat(value) || 0 : value;
            }
        }
    }

    // Poblar tablas
    function populateTables() {
        populatePlatesTable();
        populatePiecesTable();
    }

    function populatePlatesTable() {
        const tbody = document.getElementById('platesTableBody');
        if (!tbody) return;
        tbody.innerHTML = state.plates.map(p => `
            <tr data-id="${p.id}">
                <td><input type="number" class="neu-input sm" value="${p.quantity}" min="1" onchange="App.updatePlate(${p.id}, 'quantity', this.value)" style="width:50px;padding:4px 6px;font-size:11px"></td>
                <td><input type="number" class="neu-input sm" value="${p.length}" min="1" onchange="App.updatePlate(${p.id}, 'length', this.value)" style="width:60px;padding:4px 6px;font-size:11px"></td>
                <td><input type="number" class="neu-input sm" value="${p.width}" min="1" onchange="App.updatePlate(${p.id}, 'width', this.value)" style="width:60px;padding:4px 6px;font-size:11px"></td>
                <td><input type="number" class="neu-input sm" value="${p.cost}" min="0" step="0.01" onchange="App.updatePlate(${p.id}, 'cost', this.value)" style="width:60px;padding:4px 6px;font-size:11px"></td>
                <td class="actions"><button onclick="App.removePlate(${p.id})" title="Eliminar">🗑</button></td>
            </tr>
        `).join('');
    }

    function populatePiecesTable() {
        const tbody = document.getElementById('piecesTableBody');
        if (!tbody) return;
        tbody.innerHTML = state.pieces.map(p => `
            <tr data-id="${p.id}">
                <td><input type="number" class="neu-input sm" value="${p.quantity}" min="1" onchange="App.updatePiece(${p.id}, 'quantity', this.value)" style="width:45px;padding:4px 6px;font-size:11px"></td>
                <td><input type="text" class="neu-input sm" value="${p.name}" onchange="App.updatePiece(${p.id}, 'name', this.value)" style="width:80px;padding:4px 6px;font-size:11px"></td>
                <td><input type="number" class="neu-input sm" value="${p.length}" min="1" onchange="App.updatePiece(${p.id}, 'length', this.value)" style="width:55px;padding:4px 6px;font-size:11px"></td>
                <td><input type="number" class="neu-input sm" value="${p.width}" min="1" onchange="App.updatePiece(${p.id}, 'width', this.value)" style="width:55px;padding:4px 6px;font-size:11px"></td>
                <td style="text-align:center"><input type="checkbox" ${p.allowRotation ? 'checked' : ''} onchange="App.updatePiece(${p.id}, 'allowRotation', this.checked)" style="width:16px;height:16px"></td>
                <td class="actions"><button onclick="App.removePiece(${p.id})" title="Eliminar">🗑</button></td>
            </tr>
        `).join('');
    }

    // Actualizar display del proyecto
    function updateProjectDisplay() {
        const nameDisplay = document.getElementById('projectNameDisplay');
        const clientDisplay = document.getElementById('projectClientDisplay');
        if (nameDisplay) nameDisplay.textContent = state.project.name || 'Sin proyecto activo';
        if (clientDisplay) clientDisplay.textContent = state.project.client || '';

        document.getElementById('projectName').value = state.project.name;
        document.getElementById('projectClient').value = state.project.client;
        document.getElementById('projectCompany').value = state.project.company;
        document.getElementById('projectOperator').value = state.project.operator;
        document.getElementById('projectDate').value = state.project.date;
        document.getElementById('projectMaterial').value = state.project.material;
        document.getElementById('projectThickness').value = state.project.thickness;
        document.getElementById('projectUnit').value = state.project.unit;
        document.getElementById('projectNotes').value = state.project.notes;
    }

    // Guardar/cargar configuración del proyecto
    function syncProjectFromForm() {
        state.project.name = document.getElementById('projectName').value;
        state.project.client = document.getElementById('projectClient').value;
        state.project.company = document.getElementById('projectCompany').value;
        state.project.operator = document.getElementById('projectOperator').value;
        state.project.date = document.getElementById('projectDate').value;
        state.project.material = document.getElementById('projectMaterial').value;
        state.project.thickness = parseFloat(document.getElementById('projectThickness').value) || 18;
        state.project.unit = document.getElementById('projectUnit').value;
        state.project.notes = document.getElementById('projectNotes').value;
        updateProjectDisplay();
    }

    function syncConfigFromForm() {
        state.config.kerf = parseFloat(document.getElementById('optKerf').value) || 3.5;
        state.config.spacing = parseFloat(document.getElementById('optSpacing').value) || 2;
        state.config.marginExt = parseFloat(document.getElementById('optMarginExt').value) || 5;
        state.config.marginInt = parseFloat(document.getElementById('optMarginInt').value) || 0;
        state.config.mode = document.getElementById('optMode').value;
        state.config.algorithm = document.getElementById('optAlgorithm').value;
        state.config.allowRotation = document.getElementById('optAllowRotation').checked;
    }

    // LocalStorage
    function saveToLocalStorage() {
        localStorage.setItem('cutOptimizer_state', JSON.stringify({
            project: state.project,
            plates: state.plates,
            pieces: state.pieces,
            config: state.config,
            darkMode: state.darkMode
        }));
    }

    function loadFromLocalStorage() {
        const saved = localStorage.getItem('cutOptimizer_state');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.project) state.project = { ...state.project, ...data.project };
                if (data.plates) state.plates = data.plates;
                if (data.pieces) state.pieces = data.pieces;
                if (data.config) state.config = { ...state.config, ...data.config };
                if (data.darkMode) {
                    state.darkMode = data.darkMode;
                    document.body.classList.toggle('dark-mode', state.darkMode);
                }
            } catch (e) { console.warn('Error cargando localStorage:', e); }
        }
    }

    // Notificaciones
    function notify(title, message, type = 'info', duration = 4000) {
        const container = document.getElementById('notificationContainer');
        const icons = { success: '✓', warning: '⚠', error: '✕', info: 'ℹ' };
        const el = document.createElement('div');
        el.className = `notification ${type}`;
        el.innerHTML = `
            <span class="notification-icon">${icons[type]}</span>
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;
        container.appendChild(el);
        setTimeout(() => {
            el.classList.add('fade-out');
            setTimeout(() => el.remove(), 300);
        }, duration);
    }

    // Modales
    function showModal(title, content, buttons = []) {
        const container = document.getElementById('modalContainer');
        container.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="App.closeModal()">×</button>
                </div>
                <div class="modal-body">${content}</div>
                ${buttons.length ? `<div class="modal-footer">${buttons.map(b => 
                    `<button class="neu-btn ${b.class || ''}" onclick="${b.action}">${b.text}</button>`
                ).join('')}</div>` : ''}
            </div>
        `;
        container.classList.add('active');
    }

    function closeModal() {
        document.getElementById('modalContainer').classList.remove('active');
    }

    // Confirmación
    function confirmAction(title, message, onConfirm) {
        showModal(title, `<p>${message}</p>`, [
            { text: 'Cancelar', action: 'App.closeModal()', class: '' },
            { text: 'Confirmar', action: 'App.closeModal(); window._confirmCallback()', class: 'primary' }
        ]);
        window._confirmCallback = onConfirm;
    }

    // Event Listeners
    function setupEventListeners() {
        // Project form
        ['projectName','projectClient','projectCompany','projectOperator','projectDate',
         'projectMaterial','projectThickness','projectUnit','projectNotes'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', syncProjectFromForm);
        });

        // Config form
        ['optKerf','optSpacing','optMarginExt','optMarginInt','optMode','optAlgorithm','optAllowRotation'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', syncConfigFromForm);
        });

        // Buttons
        document.getElementById('btnAddPlate')?.addEventListener('click', () => addPlate());
        document.getElementById('btnAddPiece')?.addEventListener('click', () => addPiece());
        document.getElementById('btnUndo')?.addEventListener('click', undo);
        document.getElementById('btnRedo')?.addEventListener('click', redo);
        document.getElementById('btnDarkMode')?.addEventListener('click', toggleDarkMode);
        document.getElementById('btnNewProject')?.addEventListener('click', newProject);
        document.getElementById('btnOptimize')?.addEventListener('click', runOptimization);
        document.getElementById('btnSaveProject')?.addEventListener('click', () => {
            if (typeof Database !== 'undefined') Database.saveProject();
            else { saveToLocalStorage(); notify('Guardado', 'Proyecto guardado localmente.', 'success'); }
        });
        document.getElementById('btnLoadProject')?.addEventListener('click', () => {
            if (typeof Database !== 'undefined') Database.loadProjectList();
            else notify('Info', 'Base de datos no disponible. Usando almacenamiento local.', 'info');
        });

        // Canvas controls
        document.getElementById('btnZoomIn')?.addEventListener('click', () => Canvas.zoomIn());
        document.getElementById('btnZoomOut')?.addEventListener('click', () => Canvas.zoomOut());
        document.getElementById('btnZoomFit')?.addEventListener('click', () => Canvas.zoomFit());
        document.getElementById('btnToggleGrid')?.addEventListener('click', () => Canvas.toggleGrid());
        document.getElementById('btnToggleLabels')?.addEventListener('click', () => Canvas.toggleLabels());
        document.getElementById('btnToggleRulers')?.addEventListener('click', () => Canvas.toggleRulers());
        document.getElementById('btnPrevPlate')?.addEventListener('click', () => Canvas.prevPlate());
        document.getElementById('btnNextPlate')?.addEventListener('click', () => Canvas.nextPlate());
        document.getElementById('btnViewAll')?.addEventListener('click', () => Canvas.viewAll());
        document.getElementById('btnExportImage')?.addEventListener('click', () => Canvas.exportImage());
        document.getElementById('btnPrint')?.addEventListener('click', () => window.print());
        document.getElementById('btnGeneratePDF')?.addEventListener('click', () => {
            if (typeof PDFGenerator !== 'undefined') PDFGenerator.generate();
            else notify('Error', 'Generador PDF no disponible.', 'error');
        });

        // Export buttons
        document.getElementById('btnExportExcel')?.addEventListener('click', () => {
            if (typeof ImportExport !== 'undefined') ImportExport.exportExcel();
        });
        document.getElementById('btnExportCSV')?.addEventListener('click', () => {
            if (typeof ImportExport !== 'undefined') ImportExport.exportCSV();
        });
        document.getElementById('btnExportJSON')?.addEventListener('click', () => {
            if (typeof ImportExport !== 'undefined') ImportExport.exportJSON();
        });
        document.getElementById('btnExportPNG')?.addEventListener('click', () => Canvas.exportPNG());
        document.getElementById('btnExportSVG')?.addEventListener('click', () => Canvas.exportSVG());
        document.getElementById('btnExportCutList')?.addEventListener('click', () => {
            if (typeof ImportExport !== 'undefined') ImportExport.exportCutList();
        });
        document.getElementById('btnImportPieces')?.addEventListener('click', () => {
            if (typeof ImportExport !== 'undefined') ImportExport.showImportDialog();
        });

        // Window resize
        window.addEventListener('resize', () => {
            if (typeof Canvas !== 'undefined') Canvas.resize();
        });
    }

    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (e.ctrlKey || e.metaKey) {
                switch(e.key.toLowerCase()) {
                    case 'z': e.preventDefault(); undo(); break;
                    case 'y': e.preventDefault(); redo(); break;
                    case 's': e.preventDefault(); saveToLocalStorage(); notify('Guardado', 'Proyecto guardado.', 'success'); break;
                    case 'o': e.preventDefault(); document.getElementById('btnLoadProject')?.click(); break;
                    case 'p': e.preventDefault(); window.print(); break;
                    case '+': case '=': e.preventDefault(); Canvas?.zoomIn(); break;
                    case '-': e.preventDefault(); Canvas?.zoomOut(); break;
                    case '0': e.preventDefault(); Canvas?.zoomFit(); break;
                }
            }
            switch(e.key) {
                case 'Delete': case 'Backspace':
                    // TODO: eliminar selección
                    break;
                case 'ArrowLeft': Canvas?.prevPlate(); break;
                case 'ArrowRight': Canvas?.nextPlate(); break;
                case 'g': Canvas?.toggleGrid(); break;
                case 'l': Canvas?.toggleLabels(); break;
                case 'r': Canvas?.toggleRulers(); break;
                case 'a': Canvas?.viewAll(); break;
            }
        });
    }

    function toggleDarkMode() {
        state.darkMode = !state.darkMode;
        document.body.classList.toggle('dark-mode', state.darkMode);
        saveToLocalStorage();
        if (typeof Canvas !== 'undefined') Canvas.render();
    }

    function newProject() {
        confirmAction('Nuevo Proyecto', '¿Desea crear un nuevo proyecto? Se perderán los cambios no guardados.', () => {
            state.project = {
                id: null, name: '', client: '', company: '', operator: '',
                date: new Date().toISOString().split('T')[0],
                material: 'aluminio', thickness: 18, unit: 'mm', notes: ''
            };
            state.plates = [];
            state.pieces = [];
            state.optimization = null;
            state.history = [];
            state.historyIndex = -1;
            populateTables();
            updateProjectDisplay();
            if (typeof Canvas !== 'undefined') Canvas.clear();
            if (typeof Charts !== 'undefined') Charts.clear();
            updateResults();
            saveToLocalStorage();
            notify('Nuevo proyecto', 'Se ha creado un nuevo proyecto.', 'success');
        });
    }

    // Ejecutar optimización
    function runOptimization() {
        syncProjectFromForm();
        syncConfigFromForm();

        if (state.plates.length === 0) {
            notify('Error', 'Debe agregar al menos una placa.', 'error');
            return;
        }
        if (state.pieces.length === 0) {
            notify('Error', 'Debe agregar al menos una pieza.', 'error');
            return;
        }

        const loading = document.getElementById('loadingOverlay');
        const loadingText = document.getElementById('loadingText');
        loadingText.textContent = 'Optimizando corte...';
        loading.classList.remove('hidden');

        setTimeout(() => {
            try {
                if (typeof Optimizer !== 'undefined') {
                    state.optimization = Optimizer.optimize(state.plates, state.pieces, state.config);
                    state.currentPlateIndex = 0;
                    state.viewMode = 'single';

                    if (typeof Canvas !== 'undefined') {
                        Canvas.setOptimization(state.optimization);
                        Canvas.render();
                    }
                    updateResults();
                    if (typeof Charts !== 'undefined') Charts.update(state.optimization);

                    notify('Optimización completada', 
                        `Aprovechamiento: ${state.optimization.stats.efficiency.toFixed(1)}% | ` +
                        `Placas: ${state.optimization.stats.platesUsed} | ` +
                        `Piezas: ${state.optimization.stats.totalPieces}`, 
                        'success', 6000);
                }
            } catch (err) {
                console.error(err);
                notify('Error', 'Ocurrió un error durante la optimización: ' + err.message, 'error');
            } finally {
                loading.classList.add('hidden');
                loadingText.textContent = 'Inicializando...';
            }
        }, 100);
    }

    // Actualizar panel de resultados
    function updateResults() {
        const opt = state.optimization;
        const stats = opt ? opt.stats : {
            platesUsed: 0, platesLeftover: 0, efficiency: 0, waste: 0,
            totalPieces: 0, totalArea: 0, usedArea: 0, wasteArea: 0,
            cutLength: 0, cutCount: 0, cost: 0, time: 0
        };

        document.getElementById('statPlatesUsed').textContent = stats.platesUsed;
        document.getElementById('statEfficiency').textContent = stats.efficiency.toFixed(1) + '%';
        document.getElementById('statWaste').textContent = stats.waste.toFixed(1) + '%';
        document.getElementById('statPieces').textContent = stats.totalPieces;

        const unit = state.project.unit;
        const factor = unit === 'm' ? 1000000 : unit === 'cm' ? 100 : 1;
        const unitLabel = unit === 'm' ? 'm²' : unit === 'cm' ? 'cm²' : 'mm²';
        const lenLabel = unit === 'm' ? 'm' : unit === 'cm' ? 'cm' : 'mm';

        document.getElementById('detailTotalArea').textContent = (stats.totalArea / factor).toFixed(2) + ' ' + unitLabel;
        document.getElementById('detailUsedArea').textContent = (stats.usedArea / factor).toFixed(2) + ' ' + unitLabel;
        document.getElementById('detailWasteArea').textContent = (stats.wasteArea / factor).toFixed(2) + ' ' + unitLabel;
        document.getElementById('detailCutLength').textContent = (stats.cutLength / (unit === 'm' ? 1000 : unit === 'cm' ? 10 : 1)).toFixed(1) + ' ' + lenLabel;
        document.getElementById('detailCutCount').textContent = stats.cutCount;
        document.getElementById('detailLeftoverPlates').textContent = stats.platesLeftover;
        document.getElementById('detailCost').textContent = '$' + stats.cost.toFixed(2);
        document.getElementById('detailTime').textContent = stats.time.toFixed(2) + 's';

        // Lista de cortes
        const tbody = document.getElementById('cutListTableBody');
        if (tbody && opt) {
            let order = 1;
            let html = '';
            opt.plates.forEach((plate, pIdx) => {
                plate.placedPieces.forEach(pp => {
                    const piece = state.pieces.find(p => p.id === pp.pieceId);
                    if (!piece) return;
                    html += `<tr>
                        <td>${order++}</td>
                        <td>${piece.code || '-'}</td>
                        <td>${piece.name || 'Pieza ' + order}</td>
                        <td>${pp.rotated ? pp.height + '×' + pp.width : pp.width + '×' + pp.height}</td>
                        <td>${pIdx + 1}</td>
                    </tr>`;
                });
            });
            tbody.innerHTML = html;
        }

        document.getElementById('plateIndicator').textContent = 
            opt ? `Placa ${state.currentPlateIndex + 1} / ${opt.plates.length}` : 'Placa 1 / 1';
    }

    // API pública
    return {
        init,
        state,
        pieceColors,
        addPlate, removePlate, updatePlate,
        addPiece, removePiece, updatePiece,
        populateTables,
        pushHistory,
        notify,
        showModal, closeModal, confirmAction,
        saveToLocalStorage, loadFromLocalStorage,
        updateResults,
        getUnitFactor: () => {
            const u = state.project.unit;
            return u === 'm' ? 1000 : u === 'cm' ? 10 : 1;
        }
    };
})();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', App.init);
