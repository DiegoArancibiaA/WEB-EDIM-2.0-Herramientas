/**
 * Cutting Optimizer Pro - Charts
 */
const Charts = (function() {
    'use strict';
    let effChart = null, matChart = null;

    function update(opt) {
        clear();
        const ctx1 = document.getElementById('efficiencyChart');
        const ctx2 = document.getElementById('materialChart');
        if (!ctx1 || !ctx2) return;

        effChart = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ['Usado', 'Desperdicio'],
                datasets: [{ data: [opt.stats.usedArea, opt.stats.wasteArea], backgroundColor: ['#4caf50', '#e53935'], borderWidth: 0 }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { font: {size: 10} } } } }
        });

        const plateData = opt.plates.map((p, i) => `P${i+1}`);
        const plateEff = opt.plates.map(p => p.efficiency.toFixed(1));
        matChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: plateData,
                datasets: [{ label: 'Eficiencia %', data: plateEff, backgroundColor: '#2196f3', borderRadius: 4 }]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } }, plugins: { legend: {display: false} } }
        });
    }

    function clear() {
        if (effChart) { effChart.destroy(); effChart = null; }
        if (matChart) { matChart.destroy(); matChart = null; }
    }

    return { update, clear };
})();
