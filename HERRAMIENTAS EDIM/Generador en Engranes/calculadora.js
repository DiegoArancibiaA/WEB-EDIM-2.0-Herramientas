/* ============================================================
   CALCULADORA TECNICA - EDIM Soluciones
   Logica de calculos para engranajes - Separado por tipo
   ============================================================ */

(function() {

    // ---------------------------------------------------------------
    // HELPERS GENERALES DE LECTURA DEL PANEL IZQUIERDO
    // ---------------------------------------------------------------
    function isSelected(id) {
        var el = document.getElementById(id);
        return !!(el && el.classList.contains('selected'));
    }

    function getVal(id) {
        var el = document.getElementById(id);
        if (!el) return '';
        return (el.value || '').toString().trim();
    }

    function getNum(id) {
        var v = getVal(id);
        if (v === '') return null;
        var n = parseFloat(v.replace(',', '.'));
        return isNaN(n) ? null : n;
    }

    function detectarTipo() {
        if (isSelected('typegear')) return 'recto';
        if (isSelected('typeinternal')) return 'interno';
        if (isSelected('typechain')) return 'cadena';
        if (isSelected('typeplanetary')) return 'planetario';
        return 'recto';
    }

    function detectarUnidad() {
        return isSelected('unitmm') ? 'mm' : 'in';
    }

    function tipoLabel(t) {
        var map = {
            recto: 'Engranaje Recto',
            interno: 'Engranaje Interno',
            cadena: 'Rueda de Cadena',
            planetario: 'Conjunto Planetario'
        };
        return map[t] || t;
    }

    // ---------------------------------------------------------------
    // MANEJO DE CAMPOS FALTANTES
    // ---------------------------------------------------------------
    var CALC_MARKED = [];

    function clearMissingMarks() {
        CALC_MARKED.forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.classList.remove('calc-fieldmissing');
        });
        CALC_MARKED = [];
        var box = document.getElementById('calcWarnings');
        box.classList.add('hidden');
        box.innerHTML = '';
    }

    function showMissing(list) {
        if (!list || !list.length) return;
        var box = document.getElementById('calcWarnings');
        var html = 'Falta completar los siguientes datos para poder calcular:<ul>';
        list.forEach(function(item) {
            html += '<li>' + item.label + '</li>';
            var el = document.getElementById(item.id);
            if (el) { el.classList.add('calc-fieldmissing');
                CALC_MARKED.push(item.id); }
        });
        html += '</ul>';
        box.innerHTML = html;
        box.classList.remove('hidden');
    }

    function renderResults(containerId, rows) {
        var box = document.getElementById(containerId);
        if (!rows || !rows.length) {
            box.classList.add('hidden');
            box.innerHTML = '';
            return;
        }
        var html = '<table>';
        rows.forEach(function(r) {
            html += '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>';
        });
        html += '</table>';
        box.innerHTML = html;
        box.classList.remove('hidden');
    }

    // ---------------------------------------------------------------
    // FOOTBAR
    // ---------------------------------------------------------------
    function mostrarEnFootbar(texto) {
        var footbar = document.getElementById('resultFootbar');
        var textEl = document.getElementById('resultFootbarText');
        if (footbar && textEl) {
            textEl.textContent = texto;
            footbar.classList.remove('hidden');
            clearTimeout(window._footbarTimeout);
            window._footbarTimeout = setTimeout(function() {
                footbar.classList.add('hidden');
            }, 8000);
        }
    }

    // ---------------------------------------------------------------
    // DIAMETRO PRIMITIVO EN METROS
    // ---------------------------------------------------------------
    function obtenerDiametroPrimitivoMetros(tipo) {
        var unidad = detectarUnidad();
        var factor = unidad === 'mm' ? 0.001 : 0.0254;
        var Dp = null;
        if (tipo === 'recto' || tipo === 'interno') {
            var N = getNum('N');
            if (unidad === 'mm') {
                var M = getNum('M');
                if (M !== null && N !== null) Dp = M * N;
            } else {
                var P = getNum('P');
                if (P !== null && N !== null) Dp = N / P;
            }
        } else if (tipo === 'cadena') {
            var CP = getNum('CP'),
                CPN = getNum('CPN');
            if (CP !== null && CPN !== null) Dp = CP / Math.sin(Math.PI / CPN);
        } else if (tipo === 'planetario') {
            var SN = getNum('SN');
            if (unidad === 'mm') {
                var M2 = getNum('M');
                if (M2 !== null && SN !== null) Dp = M2 * SN;
            } else {
                var P2 = getNum('P');
                if (P2 !== null && SN !== null) Dp = SN / P2;
            }
        }
        return (Dp === null) ? 0 : Dp * factor;
    }

    // ---------------------------------------------------------------
    // CONSTRUCCION DINAMICA DE CAMPOS SEGUN TIPO
    // ---------------------------------------------------------------
    function buildDynamicInputs() {
        var tipo = detectarTipo();
        var unidad = detectarUnidad();
        document.getElementById('calcTipoDetectado').textContent = 'Tipo: ' + tipoLabel(tipo);
        document.getElementById('calcUnidadDetectada').textContent = 'Unidad: ' + (unidad === 'mm' ? 'Metrico (mm)' : 'Imperial (in)');

        var container = document.getElementById('calcContentContainer');
        container.innerHTML = '';

        // Cargar el template correspondiente segun el tipo
        if (tipo === 'recto') {
            container.innerHTML = getTemplateRecto();
            initRecto();
        } else if (tipo === 'interno') {
            container.innerHTML = getTemplateInterno();
            initInterno();
        } else if (tipo === 'cadena') {
            container.innerHTML = getTemplateCadena();
            initCadena();
        } else if (tipo === 'planetario') {
            container.innerHTML = getTemplatePlanetario();
            initPlanetario();
        }
    }

    // ================================================================
    // TEMPLATES HTML PARA CADA TIPO
    // ================================================================

    function getTemplateRecto() {
        return `
            <div class="calc-section">
                <h3>Torque, Fuerza y Potencia</h3>
                <label for="calcMetodoRecto">Dato de partida:</label>
                <select id="calcMetodoRecto">
                    <option value="potencia">Potencia (kW) + RPM</option>
                    <option value="torque">Torque conocido (N·m)</option>
                    <option value="fuerza">Fuerza tangencial conocida (N)</option>
                </select>
                <div id="calcMetodoPotenciaRecto" class="calc-metodo-block">
                    <label for="calcPotenciaKWRecto">Potencia (kW):</label>
                    <input type="text" id="calcPotenciaKWRecto" placeholder="Ej: 1.5">
                </div>
                <div id="calcMetodoTorqueRecto" class="calc-metodo-block" style="display:none;">
                    <label for="calcTorqueNmRecto">Torque (N·m):</label>
                    <input type="text" id="calcTorqueNmRecto" placeholder="Ej: 25">
                </div>
                <div id="calcMetodoFuerzaRecto" class="calc-metodo-block" style="display:none;">
                    <label for="calcFuerzaNRecto">Fuerza tangencial (N):</label>
                    <input type="text" id="calcFuerzaNRecto" placeholder="Ej: 500">
                </div>
                <label for="calcRPMRecto">RPM (velocidad de giro):</label>
                <input type="text" id="calcRPMRecto" placeholder="Se autocompleta del panel">
                <button class="calc-btn" id="calcPTRecto">Calcular Torque/Fuerza/Potencia</button>
                <div class="calc-results hidden" id="calcPTRectoResults"></div>
            </div>
            <div class="calc-section">
                <h3>Geometria del Engranaje Recto</h3>
                <label for="calcAnchoCaraRecto">Ancho de cara (opcional):</label>
                <input type="text" id="calcAnchoCaraRecto" placeholder="Vacio = ver rango recomendado">
                <button class="calc-btn" id="calcGeomRecto">Calcular Geometria</button>
                <div class="calc-results hidden" id="calcGeomRectoResults"></div>
            </div>
            <div class="calc-section">
                <h3>Relacion de Transmision</h3>
                <label for="calcN2Recto">Dientes del engranaje conjugado (N2):</label>
                <input type="text" id="calcN2Recto" placeholder="N de dientes del otro engranaje">
                <p class="calc-note">N1 se toma del campo "Numero de dientes (N)" del panel izquierdo.</p>
                <button class="calc-btn" id="calcRatioRecto">Calcular Relacion</button>
                <div class="calc-results hidden" id="calcRatioRectoResults"></div>
            </div>
        `;
    }

    function getTemplateInterno() {
        return `
            <div class="calc-section">
                <h3>Torque, Fuerza y Potencia</h3>
                <label for="calcMetodoInterno">Dato de partida:</label>
                <select id="calcMetodoInterno">
                    <option value="potencia">Potencia (kW) + RPM</option>
                    <option value="torque">Torque conocido (N·m)</option>
                    <option value="fuerza">Fuerza tangencial conocida (N)</option>
                </select>
                <div id="calcMetodoPotenciaInterno" class="calc-metodo-block">
                    <label for="calcPotenciaKWInterno">Potencia (kW):</label>
                    <input type="text" id="calcPotenciaKWInterno" placeholder="Ej: 1.5">
                </div>
                <div id="calcMetodoTorqueInterno" class="calc-metodo-block" style="display:none;">
                    <label for="calcTorqueNmInterno">Torque (N·m):</label>
                    <input type="text" id="calcTorqueNmInterno" placeholder="Ej: 25">
                </div>
                <div id="calcMetodoFuerzaInterno" class="calc-metodo-block" style="display:none;">
                    <label for="calcFuerzaNInterno">Fuerza tangencial (N):</label>
                    <input type="text" id="calcFuerzaNInterno" placeholder="Ej: 500">
                </div>
                <label for="calcRPMInterno">RPM (velocidad de giro):</label>
                <input type="text" id="calcRPMInterno" placeholder="Se autocompleta del panel">
                <button class="calc-btn" id="calcPTInterno">Calcular Torque/Fuerza/Potencia</button>
                <div class="calc-results hidden" id="calcPTInternoResults"></div>
            </div>
            <div class="calc-section">
                <h3>Geometria del Engranaje Interno</h3>
                <label for="calcAnchoCaraInterno">Ancho de cara (opcional):</label>
                <input type="text" id="calcAnchoCaraInterno" placeholder="Vacio = ver rango recomendado">
                <button class="calc-btn" id="calcGeomInterno">Calcular Geometria</button>
                <div class="calc-results hidden" id="calcGeomInternoResults"></div>
            </div>
            <div class="calc-section">
                <h3>Relacion de Transmision</h3>
                <label for="calcN2Interno">Dientes del engranaje conjugado (N2):</label>
                <input type="text" id="calcN2Interno" placeholder="N de dientes del otro engranaje">
                <p class="calc-note">N1 se toma del campo "Numero de dientes (N)" del panel izquierdo.</p>
                <button class="calc-btn" id="calcRatioInterno">Calcular Relacion</button>
                <div class="calc-results hidden" id="calcRatioInternoResults"></div>
            </div>
        `;
    }

    function getTemplateCadena() {
        return `
            <div class="calc-section">
                <h3>Torque, Fuerza y Potencia</h3>
                <label for="calcMetodoCadena">Dato de partida:</label>
                <select id="calcMetodoCadena">
                    <option value="potencia">Potencia (kW) + RPM</option>
                    <option value="torque">Torque conocido (N·m)</option>
                    <option value="fuerza">Fuerza tangencial conocida (N)</option>
                </select>
                <div id="calcMetodoPotenciaCadena" class="calc-metodo-block">
                    <label for="calcPotenciaKWCadena">Potencia (kW):</label>
                    <input type="text" id="calcPotenciaKWCadena" placeholder="Ej: 1.5">
                </div>
                <div id="calcMetodoTorqueCadena" class="calc-metodo-block" style="display:none;">
                    <label for="calcTorqueNmCadena">Torque (N·m):</label>
                    <input type="text" id="calcTorqueNmCadena" placeholder="Ej: 25">
                </div>
                <div id="calcMetodoFuerzaCadena" class="calc-metodo-block" style="display:none;">
                    <label for="calcFuerzaNCadena">Fuerza tangencial (N):</label>
                    <input type="text" id="calcFuerzaNCadena" placeholder="Ej: 500">
                </div>
                <label for="calcRPMCadena">RPM (velocidad de giro):</label>
                <input type="text" id="calcRPMCadena" placeholder="Se autocompleta del panel">
                <button class="calc-btn" id="calcPTCadena">Calcular Torque/Fuerza/Potencia</button>
                <div class="calc-results hidden" id="calcPTCadenaResults"></div>
            </div>
            <div class="calc-section">
                <h3>Geometria de Rueda de Cadena</h3>
                <p class="calc-note">Se calcula con Paso de cadena (P), Dientes primario/secundario y Distancia entre ruedas (D), todos leidos del panel izquierdo.</p>
                <button class="calc-btn" id="calcGeomCadena">Calcular Geometria</button>
                <div class="calc-results hidden" id="calcGeomCadenaResults"></div>
            </div>
            <div class="calc-section">
                <h3>Relacion de Transmision</h3>
                <p class="calc-note">Se calcula directamente con Dientes primario (PN) y secundario (SN) del panel izquierdo.</p>
                <button class="calc-btn" id="calcRatioCadena">Calcular Relacion</button>
                <div class="calc-results hidden" id="calcRatioCadenaResults"></div>
            </div>
        `;
    }

    function getTemplatePlanetario() {
        return `
            <div class="calc-section">
                <h3>Geometria del Conjunto Planetario</h3>
                <p class="calc-note">Se calcula con Modulo/Paso, SN, PN, RN y NP del panel izquierdo.</p>
                <button class="calc-btn" id="calcGeomPlanetario">Calcular Geometria</button>
                <div class="calc-results hidden" id="calcGeomPlanetarioResults"></div>
            </div>
            <div class="calc-section">
                <h3>Cinematica</h3>
                <label for="calcRPMPlanetario">RPM de entrada (motor):</label>
                <input type="text" id="calcRPMPlanetario" placeholder="Se autocompleta del panel">
                <button class="calc-btn" id="calcCinePlanetario">Calcular Cinematica</button>
                <div class="calc-results hidden" id="calcCinePlanetarioResults"></div>
            </div>
            <div class="calc-section">
                <h3>Torques del Reductor</h3>
                <label for="calcTorqueMotorPlanetario">Torque del motor (N·m):</label>
                <input type="text" id="calcTorqueMotorPlanetario" placeholder="Ej: 10">
                <label for="calcEficienciaPlanetario">Eficiencia (0-1):</label>
                <input type="text" id="calcEficienciaPlanetario" placeholder="Ej: 0.95">
                <button class="calc-btn" id="calcTorquePlanetario">Calcular Torques</button>
                <div class="calc-results hidden" id="calcTorquePlanetarioResults"></div>
            </div>
            <div class="calc-section">
                <h3>Torque requerido por el brazo</h3>
                <label for="calcMasaCargaPlanetario">Masa de la carga (kg):</label>
                <input type="text" id="calcMasaCargaPlanetario" placeholder="Ej: 100">
                <label for="calcMasaBrazoPlanetario">Masa del brazo (kg):</label>
                <input type="text" id="calcMasaBrazoPlanetario" placeholder="Ej: 20">
                <label for="calcLongitudBrazoPlanetario">Longitud del brazo (m):</label>
                <input type="text" id="calcLongitudBrazoPlanetario" placeholder="Ej: 0.5">
                <label for="calcAnguloBrazoPlanetario">Angulo de trabajo (grados):</label>
                <input type="text" id="calcAnguloBrazoPlanetario" placeholder="Ej: 30">
                <button class="calc-btn" id="calcBrazoPlanetario">Calcular Torque del Brazo</button>
                <div class="calc-results hidden" id="calcBrazoPlanetarioResults"></div>
            </div>
            <div class="calc-section">
                <h3>Inercia y Aceleracion</h3>
                <label for="calcInerciaRotorPlanetario">Inercia del rotor (kg·m²):</label>
                <input type="text" id="calcInerciaRotorPlanetario" placeholder="Ej: 0.001">
                <label for="calcInerciaPortaPlanetario">Inercia del porta-planetas (kg·m²):</label>
                <input type="text" id="calcInerciaPortaPlanetario" placeholder="Ej: 0.0005">
                <label for="calcAceleracionAngularPlanetario">Aceleracion angular de entrada (rad/s²):</label>
                <input type="text" id="calcAceleracionAngularPlanetario" placeholder="Ej: 10">
                <button class="calc-btn" id="calcInerciaPlanetario">Calcular Inercia y Aceleracion</button>
                <div class="calc-results hidden" id="calcInerciaPlanetarioResults"></div>
            </div>
            <div class="calc-section">
                <h3>Fuerzas sobre los Planetas</h3>
                <button class="calc-btn" id="calcFuerzasPlanetario">Calcular Fuerzas</button>
                <div class="calc-results hidden" id="calcFuerzasPlanetarioResults"></div>
            </div>
            <div class="calc-section">
                <h3>Potencia</h3>
                <button class="calc-btn" id="calcPotenciaPlanetario">Calcular Potencia</button>
                <div class="calc-results hidden" id="calcPotenciaPlanetarioResults"></div>
            </div>
            <div class="calc-section">
                <h3>Verificaciones</h3>
                <button class="calc-btn" id="calcVerifPlanetario">Verificar Condiciones</button>
                <div class="calc-results hidden" id="calcVerifPlanetarioResults"></div>
            </div>
        `;
    }

    // ================================================================
    // INICIALIZACIONES PARA CADA TIPO
    // ================================================================

    // ----- ENGRANAJE RECTO -----
    function initRecto() {
        var rpmPanel = getNum('RPM');
        if (rpmPanel !== null) {
            document.getElementById('calcRPMRecto').value = rpmPanel;
        }

        var metodoSel = document.getElementById('calcMetodoRecto');
        if (metodoSel) {
            metodoSel.addEventListener('change', function() {
                var m = this.value;
                document.getElementById('calcMetodoPotenciaRecto').style.display = m === 'potencia' ? 'block' : 'none';
                document.getElementById('calcMetodoTorqueRecto').style.display = m === 'torque' ? 'block' : 'none';
                document.getElementById('calcMetodoFuerzaRecto').style.display = m === 'fuerza' ? 'block' : 'none';
            });
        }

        document.getElementById('calcPTRecto').addEventListener('click', function() {
            clearMissingMarks();
            computePTFRecto();
        });

        document.getElementById('calcGeomRecto').addEventListener('click', function() {
            clearMissingMarks();
            computeGeomRecto();
        });

        document.getElementById('calcRatioRecto').addEventListener('click', function() {
            clearMissingMarks();
            computeRatioRecto();
        });
    }

    // ----- ENGRANAJE INTERNO -----
    function initInterno() {
        var rpmPanel = getNum('RPM');
        if (rpmPanel !== null) {
            document.getElementById('calcRPMInterno').value = rpmPanel;
        }

        var metodoSel = document.getElementById('calcMetodoInterno');
        if (metodoSel) {
            metodoSel.addEventListener('change', function() {
                var m = this.value;
                document.getElementById('calcMetodoPotenciaInterno').style.display = m === 'potencia' ? 'block' : 'none';
                document.getElementById('calcMetodoTorqueInterno').style.display = m === 'torque' ? 'block' : 'none';
                document.getElementById('calcMetodoFuerzaInterno').style.display = m === 'fuerza' ? 'block' : 'none';
            });
        }

        document.getElementById('calcPTInterno').addEventListener('click', function() {
            clearMissingMarks();
            computePTFInterno();
        });

        document.getElementById('calcGeomInterno').addEventListener('click', function() {
            clearMissingMarks();
            computeGeomInterno();
        });

        document.getElementById('calcRatioInterno').addEventListener('click', function() {
            clearMissingMarks();
            computeRatioInterno();
        });
    }

    // ----- RUEDA DE CADENA -----
    function initCadena() {
        var rpmPanel = getNum('RPM');
        if (rpmPanel !== null) {
            document.getElementById('calcRPMCadena').value = rpmPanel;
        }

        var metodoSel = document.getElementById('calcMetodoCadena');
        if (metodoSel) {
            metodoSel.addEventListener('change', function() {
                var m = this.value;
                document.getElementById('calcMetodoPotenciaCadena').style.display = m === 'potencia' ? 'block' : 'none';
                document.getElementById('calcMetodoTorqueCadena').style.display = m === 'torque' ? 'block' : 'none';
                document.getElementById('calcMetodoFuerzaCadena').style.display = m === 'fuerza' ? 'block' : 'none';
            });
        }

        document.getElementById('calcPTCadena').addEventListener('click', function() {
            clearMissingMarks();
            computePTFCadena();
        });

        document.getElementById('calcGeomCadena').addEventListener('click', function() {
            clearMissingMarks();
            computeGeomCadena();
        });

        document.getElementById('calcRatioCadena').addEventListener('click', function() {
            clearMissingMarks();
            computeRatioCadena();
        });
    }

    // ----- CONJUNTO PLANETARIO -----
    function initPlanetario() {
        var rpmPanel = getNum('RPM');
        if (rpmPanel !== null) {
            document.getElementById('calcRPMPlanetario').value = rpmPanel;
        }

        document.getElementById('calcGeomPlanetario').addEventListener('click', function() {
            clearMissingMarks();
            computeGeomPlanetario();
        });

        document.getElementById('calcCinePlanetario').addEventListener('click', function() {
            clearMissingMarks();
            computeCinePlanetario();
        });

        document.getElementById('calcTorquePlanetario').addEventListener('click', function() {
            clearMissingMarks();
            computeTorquePlanetario();
        });

        document.getElementById('calcBrazoPlanetario').addEventListener('click', function() {
            clearMissingMarks();
            computeBrazoPlanetario();
        });

        document.getElementById('calcInerciaPlanetario').addEventListener('click', function() {
            clearMissingMarks();
            computeInerciaPlanetario();
        });

        document.getElementById('calcFuerzasPlanetario').addEventListener('click', function() {
            clearMissingMarks();
            computeFuerzasPlanetario();
        });

        document.getElementById('calcPotenciaPlanetario').addEventListener('click', function() {
            clearMissingMarks();
            computePotenciaPlanetario();
        });

        document.getElementById('calcVerifPlanetario').addEventListener('click', function() {
            clearMissingMarks();
            computeVerifPlanetario();
        });
    }

    // ================================================================
    // FUNCIONES DE CALCULO - ENGRANAJE RECTO
    // ================================================================

    function computePTFRecto() {
        var metodo = document.getElementById('calcMetodoRecto').value;
        var missing = [];
        var RPM = getNum('calcRPMRecto');
        if (RPM === null) missing.push({ id: 'calcRPMRecto', label: 'RPM' });

        var val = null;
        if (metodo === 'potencia') {
            val = getNum('calcPotenciaKWRecto');
            if (val === null) missing.push({ id: 'calcPotenciaKWRecto', label: 'Potencia (kW)' });
        } else if (metodo === 'torque') {
            val = getNum('calcTorqueNmRecto');
            if (val === null) missing.push({ id: 'calcTorqueNmRecto', label: 'Torque (N·m)' });
        } else {
            val = getNum('calcFuerzaNRecto');
            if (val === null) missing.push({ id: 'calcFuerzaNRecto', label: 'Fuerza tangencial (N)' });
        }

        if (missing.length) { showMissing(missing); return; }

        var tipo = 'recto';
        var Dp = obtenerDiametroPrimitivoMetros(tipo);
        var r = Dp / 2;
        var omega = RPM * 2 * Math.PI / 60;
        var potenciaW, torqueNm, fuerzaN;

        if (metodo === 'potencia') {
            potenciaW = val * 1000;
            torqueNm = omega > 0 ? potenciaW / omega : null;
            fuerzaN = (r > 0 && torqueNm !== null) ? torqueNm / r : null;
        } else if (metodo === 'torque') {
            torqueNm = val;
            potenciaW = torqueNm * omega;
            fuerzaN = (r > 0) ? torqueNm / r : null;
        } else {
            fuerzaN = val;
            torqueNm = (r > 0) ? fuerzaN * r : null;
            potenciaW = (torqueNm !== null) ? torqueNm * omega : null;
        }

        var results = [];
        results.push(['RPM utilizada', RPM.toFixed(2) + ' RPM']);
        if (potenciaW !== null && !isNaN(potenciaW)) {
            results.push(['Potencia', (potenciaW / 1000).toFixed(3) + ' kW  (' + (potenciaW / 745.7).toFixed(3) + ' HP)']);
        }
        if (torqueNm !== null && !isNaN(torqueNm)) {
            results.push(['Torque', torqueNm.toFixed(3) + ' N·m']);
        }
        if (fuerzaN !== null && !isNaN(fuerzaN)) {
            results.push(['Fuerza tangencial', fuerzaN.toFixed(2) + ' N']);
        }
        if (r > 0) {
            results.push(['Diametro primitivo utilizado', (Dp * 1000).toFixed(2) + ' mm']);
        } else {
            results.push(['Nota', 'No se pudo obtener el diametro primitivo']);
        }

        renderResults('calcPTRectoResults', results);
        mostrarEnFootbar('Potencia/Torque/Fuerza calculado');
    }

    function computeGeomRecto() {
        var unidad = detectarUnidad();
        var missing = [];
        var results = [];
        var unitLabel = unidad === 'mm' ? 'mm' : 'in';

        var M = null,
            Pd = null;
        if (unidad === 'mm') {
            M = getNum('M');
            if (M === null) missing.push({ id: 'M', label: 'Modulo (M)' });
        } else {
            Pd = getNum('P');
            if (Pd === null) missing.push({ id: 'P', label: 'Paso diametral (P)' });
        }
        var N = getNum('N');
        if (N === null) missing.push({ id: 'N', label: 'Numero de dientes (N)' });
        var PA = getNum('PA');
        if (PA === null) missing.push({ id: 'PA', label: 'Angulo de presion (PA)' });

        if (missing.length) { showMissing(missing); return; }

        var PAr = PA * Math.PI / 180;
        var Dp, addendum, dedendum, wholeDepth, circularPitch, faceMin, faceMax;
        if (unidad === 'mm') {
            Dp = M * N;
            addendum = M;
            dedendum = 1.25 * M;
            wholeDepth = 2.25 * M;
            circularPitch = Math.PI * M;
            faceMin = 8 * M;
            faceMax = 12 * M;
        } else {
            Dp = N / Pd;
            addendum = 1 / Pd;
            dedendum = 1.25 / Pd;
            wholeDepth = 2.25 / Pd;
            circularPitch = Math.PI / Pd;
            faceMin = 8 / Pd;
            faceMax = 12 / Pd;
        }
        var Db = Dp * Math.cos(PAr);
        var Do = Dp + 2 * addendum;
        var Dr = Dp - 2 * dedendum;

        results.push(['Diametro primitivo (Dp)', Dp.toFixed(3) + ' ' + unitLabel]);
        results.push(['Diametro de base (Db)', Db.toFixed(3) + ' ' + unitLabel]);
        results.push(['Diametro exterior (Do)', Do.toFixed(3) + ' ' + unitLabel]);
        results.push(['Diametro de raiz (Dr)', Dr.toFixed(3) + ' ' + unitLabel]);
        results.push(['Addendum (a)', addendum.toFixed(3) + ' ' + unitLabel]);
        results.push(['Dedendum (b)', dedendum.toFixed(3) + ' ' + unitLabel]);
        results.push(['Altura total de diente (h)', wholeDepth.toFixed(3) + ' ' + unitLabel]);
        results.push(['Paso circular (pc)', circularPitch.toFixed(3) + ' ' + unitLabel]);

        var bManual = getNum('calcAnchoCaraRecto');
        if (bManual !== null) {
            results.push(['Ancho de cara (ingresado)', bManual.toFixed(3) + ' ' + unitLabel]);
        } else {
            results.push(['Ancho de cara (recomendado)', faceMin.toFixed(2) + ' a ' + faceMax.toFixed(2) + ' ' + unitLabel]);
        }

        renderResults('calcGeomRectoResults', results);
        mostrarEnFootbar('Geometria calculada');
    }

    function computeRatioRecto() {
        var missing = [];
        var N1 = getNum('N');
        if (N1 === null) missing.push({ id: 'N', label: 'Numero de dientes (N)' });
        var N2 = getNum('calcN2Recto');
        if (N2 === null) missing.push({ id: 'calcN2Recto', label: 'Dientes del engranaje conjugado (N2)' });

        if (missing.length) { showMissing(missing); return; }

        var i = N2 / N1;
        var results = [];
        results.push(['Relacion de transmision (i = N2/N1)', i.toFixed(4)]);
        results.push(['Sentido de giro', 'Invertido (engrane externo)']);

        renderResults('calcRatioRectoResults', results);
        mostrarEnFootbar('Relacion de transmision calculada');
    }

    // ================================================================
    // FUNCIONES DE CALCULO - ENGRANAJE INTERNO
    // ================================================================

    function computePTFInterno() {
        var metodo = document.getElementById('calcMetodoInterno').value;
        var missing = [];
        var RPM = getNum('calcRPMInterno');
        if (RPM === null) missing.push({ id: 'calcRPMInterno', label: 'RPM' });

        var val = null;
        if (metodo === 'potencia') {
            val = getNum('calcPotenciaKWInterno');
            if (val === null) missing.push({ id: 'calcPotenciaKWInterno', label: 'Potencia (kW)' });
        } else if (metodo === 'torque') {
            val = getNum('calcTorqueNmInterno');
            if (val === null) missing.push({ id: 'calcTorqueNmInterno', label: 'Torque (N·m)' });
        } else {
            val = getNum('calcFuerzaNInterno');
            if (val === null) missing.push({ id: 'calcFuerzaNInterno', label: 'Fuerza tangencial (N)' });
        }

        if (missing.length) { showMissing(missing); return; }

        var tipo = 'interno';
        var Dp = obtenerDiametroPrimitivoMetros(tipo);
        var r = Dp / 2;
        var omega = RPM * 2 * Math.PI / 60;
        var potenciaW, torqueNm, fuerzaN;

        if (metodo === 'potencia') {
            potenciaW = val * 1000;
            torqueNm = omega > 0 ? potenciaW / omega : null;
            fuerzaN = (r > 0 && torqueNm !== null) ? torqueNm / r : null;
        } else if (metodo === 'torque') {
            torqueNm = val;
            potenciaW = torqueNm * omega;
            fuerzaN = (r > 0) ? torqueNm / r : null;
        } else {
            fuerzaN = val;
            torqueNm = (r > 0) ? fuerzaN * r : null;
            potenciaW = (torqueNm !== null) ? torqueNm * omega : null;
        }

        var results = [];
        results.push(['RPM utilizada', RPM.toFixed(2) + ' RPM']);
        if (potenciaW !== null && !isNaN(potenciaW)) {
            results.push(['Potencia', (potenciaW / 1000).toFixed(3) + ' kW  (' + (potenciaW / 745.7).toFixed(3) + ' HP)']);
        }
        if (torqueNm !== null && !isNaN(torqueNm)) {
            results.push(['Torque', torqueNm.toFixed(3) + ' N·m']);
        }
        if (fuerzaN !== null && !isNaN(fuerzaN)) {
            results.push(['Fuerza tangencial', fuerzaN.toFixed(2) + ' N']);
        }
        if (r > 0) {
            results.push(['Diametro primitivo utilizado', (Dp * 1000).toFixed(2) + ' mm']);
        } else {
            results.push(['Nota', 'No se pudo obtener el diametro primitivo']);
        }

        renderResults('calcPTInternoResults', results);
        mostrarEnFootbar('Potencia/Torque/Fuerza calculado');
    }

    function computeGeomInterno() {
        var unidad = detectarUnidad();
        var missing = [];
        var results = [];
        var unitLabel = unidad === 'mm' ? 'mm' : 'in';

        var M = null,
            Pd = null;
        if (unidad === 'mm') {
            M = getNum('M');
            if (M === null) missing.push({ id: 'M', label: 'Modulo (M)' });
        } else {
            Pd = getNum('P');
            if (Pd === null) missing.push({ id: 'P', label: 'Paso diametral (P)' });
        }
        var N = getNum('N');
        if (N === null) missing.push({ id: 'N', label: 'Numero de dientes (N)' });
        var PA = getNum('PA');
        if (PA === null) missing.push({ id: 'PA', label: 'Angulo de presion (PA)' });

        if (missing.length) { showMissing(missing); return; }

        var PAr = PA * Math.PI / 180;
        var Dp, addendum, dedendum, wholeDepth, circularPitch, faceMin, faceMax;
        if (unidad === 'mm') {
            Dp = M * N;
            addendum = M;
            dedendum = 1.25 * M;
            wholeDepth = 2.25 * M;
            circularPitch = Math.PI * M;
            faceMin = 8 * M;
            faceMax = 12 * M;
        } else {
            Dp = N / Pd;
            addendum = 1 / Pd;
            dedendum = 1.25 / Pd;
            wholeDepth = 2.25 / Pd;
            circularPitch = Math.PI / Pd;
            faceMin = 8 / Pd;
            faceMax = 12 / Pd;
        }
        var Db = Dp * Math.cos(PAr);
        var Do = Dp - 2 * addendum;
        var Dr = Dp + 2 * dedendum;

        results.push(['Diametro primitivo (Dp)', Dp.toFixed(3) + ' ' + unitLabel]);
        results.push(['Diametro de base (Db)', Db.toFixed(3) + ' ' + unitLabel]);
        results.push(['Diametro interior de punta (Di)', Do.toFixed(3) + ' ' + unitLabel]);
        results.push(['Diametro de raiz interno (Dr)', Dr.toFixed(3) + ' ' + unitLabel]);
        results.push(['Addendum (a)', addendum.toFixed(3) + ' ' + unitLabel]);
        results.push(['Dedendum (b)', dedendum.toFixed(3) + ' ' + unitLabel]);
        results.push(['Altura total de diente (h)', wholeDepth.toFixed(3) + ' ' + unitLabel]);
        results.push(['Paso circular (pc)', circularPitch.toFixed(3) + ' ' + unitLabel]);

        var bManual = getNum('calcAnchoCaraInterno');
        if (bManual !== null) {
            results.push(['Ancho de cara (ingresado)', bManual.toFixed(3) + ' ' + unitLabel]);
        } else {
            results.push(['Ancho de cara (recomendado)', faceMin.toFixed(2) + ' a ' + faceMax.toFixed(2) + ' ' + unitLabel]);
        }

        var rimMin = Dr + 4 * addendum;
        results.push(['Diametro exterior minimo del anillo (recomendado)', rimMin.toFixed(2) + ' ' + unitLabel]);

        renderResults('calcGeomInternoResults', results);
        mostrarEnFootbar('Geometria calculada');
    }

    function computeRatioInterno() {
        var missing = [];
        var N1 = getNum('N');
        if (N1 === null) missing.push({ id: 'N', label: 'Numero de dientes (N)' });
        var N2 = getNum('calcN2Interno');
        if (N2 === null) missing.push({ id: 'calcN2Interno', label: 'Dientes del engranaje conjugado (N2)' });

        if (missing.length) { showMissing(missing); return; }

        var i = N2 / N1;
        var results = [];
        results.push(['Relacion de transmision (i = N2/N1)', i.toFixed(4)]);
        results.push(['Sentido de giro', 'Igual (engrane interno)']);

        renderResults('calcRatioInternoResults', results);
        mostrarEnFootbar('Relacion de transmision calculada');
    }

    // ================================================================
    // FUNCIONES DE CALCULO - RUEDA DE CADENA
    // ================================================================

    function computePTFCadena() {
        var metodo = document.getElementById('calcMetodoCadena').value;
        var missing = [];
        var RPM = getNum('calcRPMCadena');
        if (RPM === null) missing.push({ id: 'calcRPMCadena', label: 'RPM' });

        var val = null;
        if (metodo === 'potencia') {
            val = getNum('calcPotenciaKWCadena');
            if (val === null) missing.push({ id: 'calcPotenciaKWCadena', label: 'Potencia (kW)' });
        } else if (metodo === 'torque') {
            val = getNum('calcTorqueNmCadena');
            if (val === null) missing.push({ id: 'calcTorqueNmCadena', label: 'Torque (N·m)' });
        } else {
            val = getNum('calcFuerzaNCadena');
            if (val === null) missing.push({ id: 'calcFuerzaNCadena', label: 'Fuerza tangencial (N)' });
        }

        if (missing.length) { showMissing(missing); return; }

        var tipo = 'cadena';
        var Dp = obtenerDiametroPrimitivoMetros(tipo);
        var r = Dp / 2;
        var omega = RPM * 2 * Math.PI / 60;
        var potenciaW, torqueNm, fuerzaN;

        if (metodo === 'potencia') {
            potenciaW = val * 1000;
            torqueNm = omega > 0 ? potenciaW / omega : null;
            fuerzaN = (r > 0 && torqueNm !== null) ? torqueNm / r : null;
        } else if (metodo === 'torque') {
            torqueNm = val;
            potenciaW = torqueNm * omega;
            fuerzaN = (r > 0) ? torqueNm / r : null;
        } else {
            fuerzaN = val;
            torqueNm = (r > 0) ? fuerzaN * r : null;
            potenciaW = (torqueNm !== null) ? torqueNm * omega : null;
        }

        var results = [];
        results.push(['RPM utilizada', RPM.toFixed(2) + ' RPM']);
        if (potenciaW !== null && !isNaN(potenciaW)) {
            results.push(['Potencia', (potenciaW / 1000).toFixed(3) + ' kW  (' + (potenciaW / 745.7).toFixed(3) + ' HP)']);
        }
        if (torqueNm !== null && !isNaN(torqueNm)) {
            results.push(['Torque', torqueNm.toFixed(3) + ' N·m']);
        }
        if (fuerzaN !== null && !isNaN(fuerzaN)) {
            results.push(['Fuerza tangencial', fuerzaN.toFixed(2) + ' N']);
        }
        if (r > 0) {
            results.push(['Diametro primitivo utilizado', (Dp * 1000).toFixed(2) + ' mm']);
        } else {
            results.push(['Nota', 'No se pudo obtener el diametro primitivo']);
        }

        renderResults('calcPTCadenaResults', results);
        mostrarEnFootbar('Potencia/Torque/Fuerza calculado');
    }

    function computeGeomCadena() {
        var missing = [];
        var results = [];
        var unidad = detectarUnidad();
        var unitLabel = unidad === 'mm' ? 'mm' : 'in';

        var CP = getNum('CP');
        if (CP === null) missing.push({ id: 'CP', label: 'Paso de cadena (P)' });
        var CPN = getNum('CPN');
        if (CPN === null) missing.push({ id: 'CPN', label: 'Dientes primario (PN)' });
        var CSN = getNum('CSN');
        if (CSN === null) missing.push({ id: 'CSN', label: 'Dientes secundario (SN)' });

        if (missing.length) { showMissing(missing); return; }

        var Dp1 = CP / Math.sin(Math.PI / CPN);
        var Dp2 = CP / Math.sin(Math.PI / CSN);
        var Do1 = CP * (0.6 + 1 / Math.tan(Math.PI / CPN));
        var Do2 = CP * (0.6 + 1 / Math.tan(Math.PI / CSN));

        results.push(['Diametro primitivo rueda primaria', Dp1.toFixed(3) + ' ' + unitLabel]);
        results.push(['Diametro primitivo rueda secundaria', Dp2.toFixed(3) + ' ' + unitLabel]);
        results.push(['Diametro exterior aprox. rueda primaria', Do1.toFixed(3) + ' ' + unitLabel]);
        results.push(['Diametro exterior aprox. rueda secundaria', Do2.toFixed(3) + ' ' + unitLabel]);

        var CD = getNum('CD');
        if (CD !== null && CD > 0) {
            var Lp = 2 * (CD / CP) + (CPN + CSN) / 2 + (CP * Math.pow(CSN - CPN, 2)) / (4 * Math.PI * Math.PI * CD);
            var LpRound = Math.ceil(Lp);
            if (LpRound % 2 !== 0) LpRound++;
            results.push(['Longitud de cadena (pasos, calculado)', Lp.toFixed(2)]);
            results.push(['Longitud de cadena recomendada (pasos, numero par)', String(LpRound)]);
        } else {
            results.push(['Longitud de cadena', 'Ingresa "Distancia entre ruedas (D)" en el panel izquierdo para calcularla']);
        }

        renderResults('calcGeomCadenaResults', results);
        mostrarEnFootbar('Geometria calculada');
    }

    function computeRatioCadena() {
        var missing = [];
        var CPN = getNum('CPN');
        if (CPN === null) missing.push({ id: 'CPN', label: 'Dientes primario (PN)' });
        var CSN = getNum('CSN');
        if (CSN === null) missing.push({ id: 'CSN', label: 'Dientes secundario (SN)' });

        if (missing.length) { showMissing(missing); return; }

        var iC = CSN / CPN;
        var results = [];
        results.push(['Relacion de transmision (i = SN/PN)', iC.toFixed(4)]);
        results.push(['Sentido de giro', 'Igual (transmision por cadena)']);

        renderResults('calcRatioCadenaResults', results);
        mostrarEnFootbar('Relacion de transmision calculada');
    }

    // ================================================================
    // FUNCIONES DE CALCULO - CONJUNTO PLANETARIO
    // ================================================================

    var planetarioData = {};

    function getDatosPlanetario() {
        var unidad = detectarUnidad();
        var modEq;
        if (unidad === 'mm') {
            var M = getNum('M');
            modEq = M !== null ? M : null;
        } else {
            var P = getNum('P');
            modEq = P !== null ? 1 / P : null;
        }
        var SN = getNum('SN');
        var PN = getNum('PN');
        var RN = getNum('RN');
        var NP = getNum('NP');
        var RPM = getNum('RPM');

        return {
            modEq: modEq,
            SN: SN,
            PN: PN,
            RN: RN,
            NP: NP,
            RPM: RPM,
            unidad: unidad
        };
    }

    function computeGeomPlanetario() {
        var d = getDatosPlanetario();
        var missing = [];
        if (d.modEq === null) missing.push({ id: 'M', label: 'Modulo (M) o Paso (P)' });
        if (d.SN === null) missing.push({ id: 'SN', label: 'Dientes solar (SN)' });
        if (d.PN === null) missing.push({ id: 'PN', label: 'Dientes planetarios (PN)' });
        if (d.RN === null) missing.push({ id: 'RN', label: 'Dientes anular (RN)' });
        if (d.NP === null) missing.push({ id: 'NP', label: 'Numero de planetas (NP)' });

        if (missing.length) { showMissing(missing); return; }

        var unitLabel = d.unidad === 'mm' ? 'mm' : 'in';
        var m = d.modEq;
        var Rs = (m * d.SN) / 2;
        var Rp = (m * d.PN) / 2;
        var Rc = (m * d.RN) / 2;
        var distCentro = Rs + Rp;
        var vTangencial = 2 * Math.PI * distCentro * (d.RPM || 0) / 60;

        var results = [];
        results.push(['Modulo (m)', m.toFixed(3) + ' ' + unitLabel]);
        results.push(['Radio solar (Rs)', Rs.toFixed(3) + ' ' + unitLabel]);
        results.push(['Radio planeta (Rp)', Rp.toFixed(3) + ' ' + unitLabel]);
        results.push(['Radio corona (Rc)', Rc.toFixed(3) + ' ' + unitLabel]);
        results.push(['Distancia centro Sol-Planeta (d)', distCentro.toFixed(3) + ' ' + unitLabel]);
        results.push(['Velocidad tangencial orbital (v)', vTangencial.toFixed(3) + ' m/s']);

        // Guardar para otros calculos
        planetarioData.Rs = Rs;
        planetarioData.Rp = Rp;
        planetarioData.Rc = Rc;
        planetarioData.distCentro = distCentro;
        planetarioData.m = m;

        renderResults('calcGeomPlanetarioResults', results);
        mostrarEnFootbar('Geometria planetaria calculada');
    }

    function computeCinePlanetario() {
        var d = getDatosPlanetario();
        var missing = [];
        if (d.SN === null) missing.push({ id: 'SN', label: 'Dientes solar (SN)' });
        if (d.RN === null) missing.push({ id: 'RN', label: 'Dientes anular (RN)' });
        var RPM = getNum('calcRPMPlanetario');
        if (RPM === null) missing.push({ id: 'calcRPMPlanetario', label: 'RPM de entrada' });

        if (missing.length) { showMissing(missing); return; }

        var i = 1 + d.RN / d.SN;
        var omegaSalidaRPM = RPM / i;
        var omegaSalidaRad = omegaSalidaRPM * Math.PI / 30;
        var omegaPlaneta = -(d.RN / d.PN) * omegaSalidaRad;

        var results = [];
        results.push(['Relacion de transmision (corona fija)', 'i = 1 + Zc/Zs = ' + i.toFixed(4)]);
        results.push(['Velocidad de salida (RPM)', omegaSalidaRPM.toFixed(2) + ' RPM']);
        results.push(['Velocidad de salida (rad/s)', omegaSalidaRad.toFixed(4) + ' rad/s']);
        results.push(['Velocidad propia de cada planeta (rad/s)', omegaPlaneta.toFixed(4) + ' rad/s']);

        // Guardar para otros calculos
        planetarioData.i = i;
        planetarioData.omegaSalidaRad = omegaSalidaRad;
        planetarioData.omegaSalidaRPM = omegaSalidaRPM;

        renderResults('calcCinePlanetarioResults', results);
        mostrarEnFootbar('Cinematica calculada');
    }

    function computeTorquePlanetario() {
        var d = getDatosPlanetario();
        var missing = [];
        if (d.SN === null) missing.push({ id: 'SN', label: 'Dientes solar (SN)' });
        if (d.RN === null) missing.push({ id: 'RN', label: 'Dientes anular (RN)' });

        var Tmotor = getNum('calcTorqueMotorPlanetario');
        if (Tmotor === null) missing.push({ id: 'calcTorqueMotorPlanetario', label: 'Torque del motor' });
        var eta = getNum('calcEficienciaPlanetario');
        if (eta === null || eta > 1) { eta = 0.95; }

        if (missing.length) { showMissing(missing); return; }

        var i = 1 + d.RN / d.SN;
        var Tideal = Tmotor * i;
        var Treal = Tmotor * i * eta;

        var results = [];
        results.push(['Torque ideal', Tideal.toFixed(3) + ' N·m']);
        results.push(['Torque real (con eficiencia ' + (eta * 100).toFixed(1) + '%)', Treal.toFixed(3) + ' N·m']);

        // Guardar
        planetarioData.Tmotor = Tmotor;
        planetarioData.eta = eta;
        planetarioData.Tideal = Tideal;
        planetarioData.Treal = Treal;

        renderResults('calcTorquePlanetarioResults', results);
        mostrarEnFootbar('Torques calculados');
    }

    function computeBrazoPlanetario() {
        var missing = [];
        var Mcarga = getNum('calcMasaCargaPlanetario');
        if (Mcarga === null) missing.push({ id: 'calcMasaCargaPlanetario', label: 'Masa de la carga' });
        var Mbrazo = getNum('calcMasaBrazoPlanetario');
        if (Mbrazo === null) missing.push({ id: 'calcMasaBrazoPlanetario', label: 'Masa del brazo' });
        var L = getNum('calcLongitudBrazoPlanetario');
        if (L === null) missing.push({ id: 'calcLongitudBrazoPlanetario', label: 'Longitud del brazo' });
        var angulo = getNum('calcAnguloBrazoPlanetario');
        if (angulo === null) missing.push({ id: 'calcAnguloBrazoPlanetario', label: 'Angulo de trabajo' });

        if (missing.length) { showMissing(missing); return; }

        var g = 9.81;
        var theta = angulo * Math.PI / 180;
        var Tbrazo = (Mcarga + Mbrazo / 2) * g * L * Math.cos(theta);

        var results = [];
        results.push(['Masa de la carga', Mcarga.toFixed(2) + ' kg']);
        results.push(['Masa del brazo', Mbrazo.toFixed(2) + ' kg']);
        results.push(['Longitud del brazo', L.toFixed(3) + ' m']);
        results.push(['Angulo de trabajo', angulo.toFixed(1) + '°']);
        results.push(['Torque requerido por el brazo', Tbrazo.toFixed(3) + ' N·m']);

        planetarioData.Tbrazo = Tbrazo;

        renderResults('calcBrazoPlanetarioResults', results);
        mostrarEnFootbar('Torque del brazo calculado');
    }

    function computeInerciaPlanetario() {
        var d = getDatosPlanetario();
        var missing = [];
        if (d.SN === null) missing.push({ id: 'SN', label: 'Dientes solar (SN)' });
        if (d.RN === null) missing.push({ id: 'RN', label: 'Dientes anular (RN)' });
        if (d.NP === null) missing.push({ id: 'NP', label: 'Numero de planetas (NP)' });

        var Jrotor = getNum('calcInerciaRotorPlanetario');
        if (Jrotor === null || Jrotor === 0) Jrotor = 0.001;
        var Jporta = getNum('calcInerciaPortaPlanetario');
        if (Jporta === null || Jporta === 0) Jporta = 0.0005;
        var alpha = getNum('calcAceleracionAngularPlanetario');
        if (alpha === null) missing.push({ id: 'calcAceleracionAngularPlanetario', label: 'Aceleracion angular' });

        if (missing.length) { showMissing(missing); return; }

        var i = 1 + d.RN / d.SN;
        var Jplaneta = 0.00001;
        var Jeq = Jrotor + Jporta * Math.pow(1 / i, 2) + d.NP * Jplaneta * Math.pow(d.SN / (d.SN + d.RN), 2);

        var Tacel = Jeq * alpha;

        var results = [];
        results.push(['Inercia estimada de cada planeta', Jplaneta.toFixed(6) + ' kg·m²']);
        results.push(['Inercia equivalente (Jeq)', Jeq.toFixed(6) + ' kg·m²']);
        results.push(['Torque de aceleracion (Tacel)', Tacel.toFixed(6) + ' N·m']);

        planetarioData.Jeq = Jeq;
        planetarioData.Tacel = Tacel;

        renderResults('calcInerciaPlanetarioResults', results);
        mostrarEnFootbar('Inercia y aceleracion calculadas');
    }

    function computeFuerzasPlanetario() {
        var d = getDatosPlanetario();
        var missing = [];
        if (d.SN === null) missing.push({ id: 'SN', label: 'Dientes solar (SN)' });
        if (d.NP === null) missing.push({ id: 'NP', label: 'Numero de planetas (NP)' });

        var Tmotor = getNum('calcTorqueMotorPlanetario');
        if (Tmotor === null) {
            // Intentar usar el guardado
            if (planetarioData.Tmotor) Tmotor = planetarioData.Tmotor;
            else missing.push({ id: 'calcTorqueMotorPlanetario', label: 'Torque del motor (calcular primero en Torques)' });
        }

        if (missing.length) { showMissing(missing); return; }

        // Obtener Rs de geometria o calcular
        var Rs = planetarioData.Rs;
        if (!Rs || Rs === 0) {
            var m = d.modEq;
            if (m && d.SN) Rs = (m * d.SN) / 2;
        }

        var Rp = planetarioData.Rp;
        if (!Rp || Rp === 0) {
            var m2 = d.modEq;
            if (m2 && d.PN) Rp = (m2 * d.PN) / 2;
        }

        if (!Rs || Rs === 0) {
            showMissing([{ id: 'SN', label: 'Calcular primero Geometria para obtener Rs' }]);
            return;
        }

        var F = Tmotor / (Rs * d.NP);
        var Tplaneta = F * Rp;

        var results = [];
        results.push(['Fuerza transmitida a cada planeta', F.toFixed(2) + ' N']);
        results.push(['Torque soportado por cada planeta', Tplaneta.toFixed(3) + ' N·m']);

        renderResults('calcFuerzasPlanetarioResults', results);
        mostrarEnFootbar('Fuerzas calculadas');
    }

    function computePotenciaPlanetario() {
        var missing = [];
        var Tmotor = getNum('calcTorqueMotorPlanetario');
        if (Tmotor === null && planetarioData.Tmotor) Tmotor = planetarioData.Tmotor;
        if (Tmotor === null) missing.push({ id: 'calcTorqueMotorPlanetario', label: 'Torque del motor (calcular primero en Torques)' });

        var RPM = getNum('calcRPMPlanetario');
        if (RPM === null) { RPM = getNum('RPM'); }
        if (RPM === null) missing.push({ id: 'calcRPMPlanetario', label: 'RPM de entrada' });

        var omegaSalida = planetarioData.omegaSalidaRad;
        if (!omegaSalidaSalida) {
            // Intentar calcular
            var d = getDatosPlanetario();
            if (d.SN && d.RN) {
                var i = 1 + d.RN / d.SN;
                omegaSalida = (RPM || 0) / i * Math.PI / 30;
            }
        }

        if (missing.length) { showMissing(missing); return; }

        var omegaEntrada = (RPM || 0) * Math.PI / 30;
        var Pin = Tmotor * omegaEntrada;
        var Tsal = Tmotor * (1 + (planetarioData.RN || 0) / (planetarioData.SN || 0)) * (planetarioData.eta || 0.95);
        var Pout = Tsal * (omegaSalida || 0);
        var etaGlobal = Pout / Pin;

        var results = [];
        results.push(['Potencia de entrada', (Pin / 1000).toFixed(3) + ' kW']);
        results.push(['Potencia de salida', (Pout / 1000).toFixed(3) + ' kW']);
        results.push(['Eficiencia global', (etaGlobal * 100).toFixed(1) + '%']);

        renderResults('calcPotenciaPlanetarioResults', results);
        mostrarEnFootbar('Potencia calculada');
    }

    function computeVerifPlanetario() {
        var d = getDatosPlanetario();
        var missing = [];
        if (d.SN === null) missing.push({ id: 'SN', label: 'Dientes solar (SN)' });
        if (d.PN === null) missing.push({ id: 'PN', label: 'Dientes planetarios (PN)' });
        if (d.RN === null) missing.push({ id: 'RN', label: 'Dientes anular (RN)' });
        if (d.NP === null) missing.push({ id: 'NP', label: 'Numero de planetas (NP)' });

        if (missing.length) { showMissing(missing); return; }

        var results = [];
        var ok = '<span class="calc-check-ok">OK</span>';
        var error = '<span class="calc-check-error">ERROR</span>';
        var warning = '<span class="calc-check-warning">ADVERTENCIA</span>';

        // 1. Condicion de montaje: Zc = Zs + 2*Zp
        var condMontaje = d.RN === d.SN + 2 * d.PN;
        results.push(['1. Condicion de montaje (Zc = Zs + 2Zp)', condMontaje ? ok : error + ' (Zc=' + d.RN + ', Zs+2Zp=' + (d.SN + 2 * d.PN) + ')']);

        // 2. Equidistancia de los planetas: (Zs + Zc) / Np debe ser entero
        var sum = d.SN + d.RN;
        var resto = sum % d.NP;
        var equidistante = resto === 0;
        results.push(['2. Equidistancia de planetas ((Zs+Zc)/Np entero)', equidistante ? ok : error + ' (resto=' + resto + ')']);

        // 3. Verificacion del motor (si hay datos de torque)
        var Tmotor = getNum('calcTorqueMotorPlanetario');
        if (Tmotor === null && planetarioData.Tmotor) Tmotor = planetarioData.Tmotor;
        if (Tmotor !== null) {
            var Tnominal = Tmotor * 1.5;
            results.push(['3. Torque nominal recomendado (FS=1.5)', Tnominal.toFixed(2) + ' N·m']);
            results.push(['3. Torque motor ingresado', Tmotor.toFixed(2) + ' N·m']);
            var motorSuficiente = Tmotor >= Tnominal * 0.8;
            results.push(['3. Motor suficiente', motorSuficiente ? ok : warning + ' (considerar mayor torque)']);
        } else {
            results.push(['3. Verificacion del motor', 'Ingresa torque del motor para verificar']);
        }

        // 4. Factor de seguridad (estimado)
        var FS = 1.5;
        results.push(['4. Factor de seguridad recomendado', FS.toFixed(1)]);
        results.push(['4. Estado', 'Adecuado para aplicaciones generales']);

        renderResults('calcVerifPlanetarioResults', results);
        mostrarEnFootbar('Verificaciones completadas');
    }

    // ================================================================
    // EVENTO PRINCIPAL: REFRESH
    // ================================================================

    document.addEventListener('DOMContentLoaded', function() {
        var refreshBtn = document.getElementById('calcRefresh');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                clearMissingMarks();
                buildDynamicInputs();
                mostrarEnFootbar('Datos actualizados desde el panel');
            });
        }

        // Construir campos iniciales
        buildDynamicInputs();

        // Detectar cambios en los botones de tipo de engranaje
        var typeButtons = document.querySelectorAll('.geartype');
        typeButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                setTimeout(function() {
                    buildDynamicInputs();
                }, 100);
            });
        });

        // Detectar cambios en unidades
        var unitButtons = document.querySelectorAll('#unitpanel .radio');
        unitButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                setTimeout(function() {
                    buildDynamicInputs();
                }, 100);
            });
        });

        // Cerrar footbar
        var footbarClose = document.getElementById('resultFootbarClose');
        if (footbarClose) {
            footbarClose.addEventListener('click', function() {
                var footbar = document.getElementById('resultFootbar');
                if (footbar) footbar.classList.add('hidden');
                clearTimeout(window._footbarTimeout);
            });
        }
    });

})();
