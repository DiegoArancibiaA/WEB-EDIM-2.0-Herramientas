/**
 * Cutting Optimizer Pro - UI Helpers
 * Diálogos específicos y utilidades de interfaz
 */

const UI = (function() {
    'use strict';

    function showPlateDialog(plate = null) {
        const isEdit = plate !== null;
        const content = `
            <div class="form-group"><label>Cantidad</label><input type="number" id="dlgPlateQty" class="neu-input" value="${isEdit ? plate.quantity : 1}" min="1"></div>
            <div class="form-row">
                <div class="form-group"><label>Largo (${App.state.project.unit})</label><input type="number" id="dlgPlateLen" class="neu-input" value="${isEdit ? plate.length : 2440}" min="1"></div>
                <div class="form-group"><label>Ancho (${App.state.project.unit})</label><input type="number" id="dlgPlateWid" class="neu-input" value="${isEdit ? plate.width : 1220}" min="1"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>Espesor (mm)</label><input type="number" id="dlgPlateThick" class="neu-input" value="${isEdit ? plate.thickness : App.state.project.thickness || 18}" min="0.1" step="0.1"></div>
                <div class="form-group"><label>Costo unitario ($)</label><input type="number" id="dlgPlateCost" class="neu-input" value="${isEdit ? plate.cost : 0}" min="0" step="0.01"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>Código</label><input type="text" id="dlgPlateCode" class="neu-input" value="${isEdit ? plate.code : ''}" placeholder="Código identificador"></div>
                <div class="form-group"><label>Proveedor</label><input type="text" id="dlgPlateSupplier" class="neu-input" value="${isEdit ? plate.supplier : ''}" placeholder="Proveedor"></div>
            </div>
            <div class="form-group"><label>Color</label><input type="text" id="dlgPlateColor" class="neu-input" value="${isEdit ? plate.color : ''}" placeholder="Color de la placa"></div>
            <div class="form-group"><label>Observaciones</label><textarea id="dlgPlateNotes" class="neu-input" rows="2">${isEdit ? plate.notes : ''}</textarea></div>
        `;
        App.showModal(isEdit ? 'Editar Placa' : 'Nueva Placa', content, [
            { text: 'Cancelar', action: 'App.closeModal()', class: '' },
            { text: isEdit ? 'Guardar' : 'Agregar', action: 'UI.savePlateDialog(' + (isEdit ? plate.id : 'null') + ')', class: 'primary' }
        ]);
    }

    function savePlateDialog(id) {
        const data = {
            quantity: parseInt(document.getElementById('dlgPlateQty').value) || 1,
            length: parseFloat(document.getElementById('dlgPlateLen').value) || 2440,
            width: parseFloat(document.getElementById('dlgPlateWid').value) || 1220,
            thickness: parseFloat(document.getElementById('dlgPlateThick').value) || 18,
            cost: parseFloat(document.getElementById('dlgPlateCost').value) || 0,
            code: document.getElementById('dlgPlateCode').value,
            supplier: document.getElementById('dlgPlateSupplier').value,
            color: document.getElementById('dlgPlateColor').value,
            notes: document.getElementById('dlgPlateNotes').value
        };
        if (id) {
            const plate = App.state.plates.find(p => p.id === id);
            if (plate) Object.assign(plate, data);
        } else {
            App.addPlate({ ...data, id: Date.now() + Math.random() });
        }
        App.populateTables();
        App.pushHistory();
        App.closeModal();
    }

    function showPieceDialog(piece = null) {
        const isEdit = piece !== null;
        const content = `
            <div class="form-group"><label>Cantidad</label><input type="number" id="dlgPieceQty" class="neu-input" value="${isEdit ? piece.quantity : 1}" min="1"></div>
            <div class="form-row">
                <div class="form-group"><label>Nombre</label><input type="text" id="dlgPieceName" class="neu-input" value="${isEdit ? piece.name : ''}" placeholder="Nombre de la pieza"></div>
                <div class="form-group"><label>Código</label><input type="text" id="dlgPieceCode" class="neu-input" value="${isEdit ? piece.code : ''}" placeholder="Código"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>Largo (${App.state.project.unit})</label><input type="number" id="dlgPieceLen" class="neu-input" value="${isEdit ? piece.length : 300}" min="1"></div>
                <div class="form-group"><label>Ancho (${App.state.project.unit})</label><input type="number" id="dlgPieceWid" class="neu-input" value="${isEdit ? piece.width : 200}" min="1"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>Espesor (mm)</label><input type="number" id="dlgPieceThick" class="neu-input" value="${isEdit ? piece.thickness : App.state.project.thickness || 18}" min="0.1" step="0.1"></div>
                <div class="form-group"><label>Prioridad</label><input type="number" id="dlgPiecePriority" class="neu-input" value="${isEdit ? piece.priority : 1}" min="1" max="10"></div>
            </div>
            <div class="form-group"><label>Material</label><input type="text" id="dlgPieceMaterial" class="neu-input" value="${isEdit ? piece.material : App.state.project.material || ''}" placeholder="Material"></div>
            <div class="form-check"><input type="checkbox" id="dlgPieceRotate" ${isEdit && piece.allowRotation ? 'checked' : !isEdit ? 'checked' : ''}><label for="dlgPieceRotate">Permitir rotación</label></div>
            <div class="form-group"><label>Observaciones</label><textarea id="dlgPieceNotes" class="neu-input" rows="2">${isEdit ? piece.notes : ''}</textarea></div>
        `;
        App.showModal(isEdit ? 'Editar Pieza' : 'Nueva Pieza', content, [
            { text: 'Cancelar', action: 'App.closeModal()', class: '' },
            { text: isEdit ? 'Guardar' : 'Agregar', action: 'UI.savePieceDialog(' + (isEdit ? piece.id : 'null') + ')', class: 'primary' }
        ]);
    }

    function savePieceDialog(id) {
        const data = {
            quantity: parseInt(document.getElementById('dlgPieceQty').value) || 1,
            name: document.getElementById('dlgPieceName').value,
            code: document.getElementById('dlgPieceCode').value,
            length: parseFloat(document.getElementById('dlgPieceLen').value) || 300,
            width: parseFloat(document.getElementById('dlgPieceWid').value) || 200,
            thickness: parseFloat(document.getElementById('dlgPieceThick').value) || 18,
            priority: parseInt(document.getElementById('dlgPiecePriority').value) || 1,
            material: document.getElementById('dlgPieceMaterial').value,
            allowRotation: document.getElementById('dlgPieceRotate').checked,
            notes: document.getElementById('dlgPieceNotes').value,
            color: App.pieceColors[App.state.pieces.length % App.pieceColors.length]
        };
        if (id) {
            const piece = App.state.pieces.find(p => p.id === id);
            if (piece) Object.assign(piece, data);
        } else {
            App.addPiece({ ...data, id: Date.now() + Math.random() });
        }
        App.populateTables();
        App.pushHistory();
        App.closeModal();
    }

    function showSettingsDialog() {
        const content = `
            <div class="form-group"><label>Empresa (para PDF)</label><input type="text" id="dlgSettingCompany" class="neu-input" value="${localStorage.getItem('co_company') || ''}" placeholder="Nombre de la empresa"></div>
            <div class="form-group"><label>Dirección</label><input type="text" id="dlgSettingAddress" class="neu-input" value="${localStorage.getItem('co_address') || ''}" placeholder="Dirección"></div>
            <div class="form-group"><label>Teléfono</label><input type="text" id="dlgSettingPhone" class="neu-input" value="${localStorage.getItem('co_phone') || ''}" placeholder="Teléfono"></div>
            <div class="form-group"><label>Email</label><input type="email" id="dlgSettingEmail" class="neu-input" value="${localStorage.getItem('co_email') || ''}" placeholder="Email"></div>
            <div class="form-group"><label>Logo URL (base64 o URL)</label><input type="text" id="dlgSettingLogo" class="neu-input" value="${localStorage.getItem('co_logo') || ''}" placeholder="URL del logo"></div>
            <div class="form-check"><input type="checkbox" id="dlgSettingAutoSave" ${localStorage.getItem('co_autosave') !== 'false' ? 'checked' : ''}><label for="dlgSettingAutoSave">Autoguardado automático</label></div>
        `;
        App.showModal('Configuración del Sistema', content, [
            { text: 'Cancelar', action: 'App.closeModal()', class: '' },
            { text: 'Guardar', action: 'UI.saveSettings()', class: 'primary' }
        ]);
    }

    function saveSettings() {
        localStorage.setItem('co_company', document.getElementById('dlgSettingCompany').value);
        localStorage.setItem('co_address', document.getElementById('dlgSettingAddress').value);
        localStorage.setItem('co_phone', document.getElementById('dlgSettingPhone').value);
        localStorage.setItem('co_email', document.getElementById('dlgSettingEmail').value);
        localStorage.setItem('co_logo', document.getElementById('dlgSettingLogo').value);
        localStorage.setItem('co_autosave', document.getElementById('dlgSettingAutoSave').checked);
        App.closeModal();
        App.notify('Configuración guardada', 'Los ajustes se han guardado correctamente.', 'success');
    }

    return {
        showPlateDialog, savePlateDialog,
        showPieceDialog, savePieceDialog,
        showSettingsDialog, saveSettings
    };
})();

// Override botón settings
document.addEventListener('DOMContentLoaded', () => {
    const btnSettings = document.getElementById('btnSettings');
    if (btnSettings) {
        btnSettings.addEventListener('click', UI.showSettingsDialog);
    }
});
