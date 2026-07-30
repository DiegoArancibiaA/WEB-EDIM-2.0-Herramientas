================================================================================
  EDIM SOLUCIONES — Calculadora de Ejes y Árboles de Transmisión v1.0
================================================================================

DESCRIPCIÓN
-----------
Herramienta web profesional para el análisis mecánico de ejes y árboles de
transmisión. Permite evaluar esfuerzos combinados, fatiga, rigidez torsional,
y determinar el diámetro mínimo requerido según criterios de diseño estándar.

MODO DE EMPLEO
--------------
1. Abra el archivo "calculadora-ejes.html" en cualquier navegador web moderno
   (Chrome, Firefox, Edge, Safari). No requiere conexión a internet.

2. Ingrese los datos en las tarjetas correspondientes:
   • Material y Geometría: diámetro, longitud, propiedades del material
   • Cargas Aplicadas: momento flector, torque, fuerza axial
   • Concentración de esfuerzos: Kt, Kf, q, Ka

3. Seleccione el criterio de diseño deseado (Von Mises o Tresca) y el método
de fatiga (Soderberg, Goodman o Gerber).

4. Presione "Calcular Análisis Completo" para obtener todos los resultados.

5. El diagrama SVG se actualiza dinámicamente mostrando las cargas aplicadas.

FÓRMULAS UTILIZADAS
-------------------
• Esfuerzo de flexión:          σ = (32 · M) / (π · d³)
• Esfuerzo cortante torsional:  τ = (16 · T) / (π · d³)
• Esfuerzo axial:               σa = Fa / (π · d² / 4)
• Von Mises (distorsión):       σ' = √(σ² + 3τ²)
• Tresca (máx. cortante):       τmax = √((σ/2)² + τ²)
• Ángulo de torsión:            θ = (584 · T · L) / (G · d⁴)  [grados]
• Rigidez torsional:            kθ = T / θrad  [N·m/rad]
• Soderberg (fatiga):           σa/Se + σm/Sy = 1/N
• Goodman (fatiga):             σa/Se + σm/Su = 1/N
• Gerber (fatiga):              σa/Se + (σm/Su)² = 1/N
• Factor fatiga:                Kf = 1 + q · (Kt – 1)
• Vida estimada (Basquin):      N = 0.5 · (σa / σf')^(1/b)
                                  donde σf' ≈ 0.9·Su, b ≈ –0.085

NOTAS TÉCNICAS
--------------
• Unidades consistentes: entrada en N·m, mm, MPa, GPa.
• Si Se no se proporciona, se estima como Se ≈ 0.5·Su·Ka (acero).
• Para cargas rotativas, la flexión se considera completamente alternante.
• La torsión constante y la carga axial se agrupan en el esfuerzo medio.
• Concentración de esfuerzos: Kt para estático, Kf para fatiga.

REFERENCIAS
-----------
• Shigley, J.E. — "Diseño en Ingeniería Mecánica"
• Norton, R.L. — "Diseño de Máquinas"
• Juvinall & Marshek — "Fundamentals of Machine Component Design"

DESARROLLADO POR
----------------
EDIM SOLUCIONES — Ingeniería Mecánica y Diseño Industrial
================================================================================
