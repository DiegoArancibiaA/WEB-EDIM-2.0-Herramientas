/**
 * Cutting Optimizer Pro - Database Connector (PHP API)
 */
const Database = (function() {
    'use strict';
    const API_URL = 'api/';

    async function saveProject() {
        const data = {
            project: App.state.project,
            plates: App.state.plates,
            pieces: App.state.pieces,
            config: App.state.config,
            optimization: App.state.optimization
        };
        try {
            const res = await fetch(API_URL + 'project.php?action=save', {
                method: 'POST', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (json.success) {
                App.state.project.id = json.data.id;
                App.notify('Guardado', 'Proyecto guardado en base de datos.', 'success');
            } else throw new Error(json.message);
        } catch(e) { App.notify('Error', e.message, 'error'); }
    }

    async function loadProjectList() {
        try {
            const res = await fetch(API_URL + 'project.php?action=list');
            const json = await res.json();
            if (!json.success) throw new Error(json.message);
            let html = '<div style="max-height:300px;overflow-y:auto;">';
            html += '<table class="neu-table" style="width:100%"><thead><tr><th>Nombre</th><th>Cliente</th><th>Fecha</th><th></th></tr></thead><tbody>';
            (json.data || []).forEach(p => {
                html += `<tr><td>${p.name}</td><td>${p.client||''}</td><td>${p.date||''}</td><td><button class="neu-btn sm" onclick="Database.loadProject(${p.id})">Abrir</button></td></tr>`;
            });
            html += '</tbody></table></div>';
            App.showModal('Abrir Proyecto', html);
        } catch(e) { App.notify('Error', e.message, 'error'); }
    }

    async function loadProject(id) {
        try {
            const res = await fetch(API_URL + 'project.php?action=get&id=' + id);
            const json = await res.json();
            if (!json.success) throw new Error(json.message);
            const data = json.data;
            App.state.project = data.project;
            App.state.plates = data.plates || [];
            App.state.pieces = data.pieces || [];
            App.state.config = data.config || App.state.config;
            App.state.optimization = data.optimization || null;
            App.populateTables();
            App.updateProjectDisplay();
            if (App.state.optimization) { Canvas.setOptimization(App.state.optimization); Canvas.render(); App.updateResults(); }
            App.closeModal();
            App.notify('Proyecto cargado', data.project.name, 'success');
        } catch(e) { App.notify('Error', e.message, 'error'); }
    }

    return { saveProject, loadProjectList, loadProject };
})();
