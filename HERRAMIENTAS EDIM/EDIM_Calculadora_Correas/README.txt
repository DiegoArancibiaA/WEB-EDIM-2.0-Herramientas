================================================================================
 EDIM SOLUCIONES - CALCULADORA DE TRANSMISIONES POR CORREA v2.0
================================================================================
Ingenieria Mecanica de Precision
Desarrollado por: EDIM SOLUCIONES
Fecha: 2026
================================================================================

1. DESCRIPCION
--------------------------------------------------------------------------------
Calculadora web profesional para el diseno de transmisiones por correa.
Soporta cuatro tipos de correas:
  - Correas en V (clasicas, estrechas, angulares)
  - Correas planas
  - Correas sincronicas (dentadas)
  - Correas Poly-V

2. ARCHIVOS INCLUIDOS
--------------------------------------------------------------------------------
  calculadora-correas.html    Aplicacion web monolitica (HTML+CSS+JS)
  README.txt                  Este archivo

3. INSTRUCCIONES DE USO
--------------------------------------------------------------------------------
  1. Abra calculadora-correas.html en cualquier navegador web moderno.
  2. Seleccione el tipo de correa mediante las pestanas superiores.
  3. Ingrese los parametros de entrada en el panel izquierdo.
  4. Presione "Calcular Transmision" para obtener los resultados.
  5. Use "Exportar Reporte" para descargar un archivo de texto con los resultados.
  6. Use "Limpiar" para resetear todos los campos.

4. TABLAS DE COEFICIENTES
--------------------------------------------------------------------------------

4.1 FACTOR DE SERVICIO (fs) - CORREAS EN V
--------------------------------------------------------------------------------
| Condicion de Trabajo                              | fs   |
|---------------------------------------------------|------|
| Uniforme - Uniforme                               | 1.0  |
| Ligero choque - Uniforme                          | 1.1  |
| Uniforme - Ligero choque                          | 1.2  |
| Ligero choque - Ligero choque                     | 1.3  |
| Pesado choque - Ligero choque                     | 1.4  |
| Pesado choque - Pesado choque                     | 1.5  |

4.2 FACTOR DE CORRECCION POR ANGULO DE CONTACTO (K_theta)
--------------------------------------------------------------------------------
| Angulo (grados) | Coeficiente |
|-----------------|-------------|
| 180             | 1.00        |
| 175             | 0.99        |
| 170             | 0.97        |
| 165             | 0.96        |
| 160             | 0.94        |
| 155             | 0.93        |
| 150             | 0.91        |
| 145             | 0.89        |
| 140             | 0.87        |
| 135             | 0.85        |
| 130             | 0.83        |
| 125             | 0.80        |
| 120             | 0.78        |
| 115             | 0.75        |
| 110             | 0.72        |
| 105             | 0.69        |
| 100             | 0.66        |
|  95             | 0.62        |
|  90             | 0.58        |

4.3 FACTOR DE CORRECCION POR LONGITUD (K_L) - CORREAS EN V
--------------------------------------------------------------------------------
| Longitud (mm) | Coeficiente |
|---------------|-------------|
| 630           | 0.82        |
| 700           | 0.84        |
| 790           | 0.86        |
| 890           | 0.88        |
| 990           | 0.90        |
| 1100          | 0.92        |
| 1250          | 0.94        |
| 1400          | 0.96        |
| 1600          | 0.98        |
| 1800          | 1.00        |
| 2000          | 1.01        |
| 2240          | 1.02        |
| 2500          | 1.03        |
| 2800          | 1.04        |
| 3150          | 1.05        |
| 3550          | 1.06        |
| 4000          | 1.07        |
| 4500          | 1.08        |

4.4 PERFILES CORREAS EN V - DATOS TECNICOS
--------------------------------------------------------------------------------
| Perfil | Ancho (mm) | Alto (mm) | Masa (kg/m) | d_min (mm) |
|--------|------------|-----------|-------------|------------|
| A      | 13         | 8         | 0.10        | 75         |
| B      | 17         | 11        | 0.18        | 125        |
| C      | 22         | 14        | 0.30        | 200        |
| SPZ    | 10         | 8         | 0.07        | 63         |
| SPA    | 13         | 10        | 0.12        | 90         |
| SPB    | 16         | 13        | 0.20        | 140        |
| SPC    | 22         | 18        | 0.37        | 224        |
| 3V     | 9          | 8         | 0.06        | 56         |
| 5V     | 15         | 13        | 0.17        | 112        |
| 8V     | 25         | 23        | 0.45        | 315        |

4.5 PERFILES CORREAS SINCRONICAS - PASO
--------------------------------------------------------------------------------
| Perfil  | Paso (mm) |
|---------|-----------|
| XL      | 5.08      |
| L       | 9.525     |
| H       | 12.7      |
| XH      | 22.225    |
| T5      | 5.0       |
| T10     | 10.0      |
| AT5     | 5.0       |
| AT10    | 10.0      |
| HTD3M   | 3.0       |
| HTD5M   | 5.0       |
| HTD8M   | 8.0       |

4.6 PERFILES CORREAS POLY-V
--------------------------------------------------------------------------------
| Perfil | Paso (mm) | Alto (mm) |
|--------|-----------|-----------|
| PH     | 1.6       | 2.3       |
| PJ     | 2.34      | 3.5       |
| PK     | 3.56      | 5.0       |
| PL     | 4.7       | 6.5       |
| PM     | 9.4       | 12.5      |

4.7 COEFICIENTE DE FRICCION TIPICO (mu)
--------------------------------------------------------------------------------
| Material correa / Material polea | mu  |
|----------------------------------|-----|
| Cuero / Hierro fundido           | 0.30|
| Caucho / Hierro fundido          | 0.35|
| Caucho / Acero                   | 0.32|
| Sintetico / Aluminio             | 0.25|
| Correa en V / Hierro fundido     | 0.51|
| Correa Poly-V / Acero            | 0.52|

5. FORMULAS UTILIZADAS
--------------------------------------------------------------------------------
5.1 Longitud de correa (centros fijos):
    L = 2*C + pi*(D+d)/2 + (D-d)^2/(4*C)

5.2 Angulo de contacto en polea menor:
    alpha = 180 - 57*(D-d)/C  [grados]

5.3 Velocidad lineal:
    v = pi * d * n1 / 60000  [m/s]

5.4 Relacion de transmision:
    i = n1/n2 = D/d

5.5 Potencia de diseno:
    Pd = P * fs

5.6 Ecuacion de Capstan (relacion de tensiones):
    T1/T2 = e^(mu * alpha_rad)

5.7 Fuerza centrifuga:
    Fc = m * v^2  [N]

5.8 Frecuencia de flexion:
    f = v / L  [Hz]

5.9 Potencia nominal por correa en V (formula RMA):
    N1 = d*r*[K1 - K2/d - K3*(d*r)^2 - K4*log10(d*r)] + K2*r*(1-1/Ki)
    donde r = n1/1000, Ki = factor por relacion de transmision

5.10 Numero de correas en V:
    z = Pd / (N1 * Ca * Cl)

6. REFERENCIAS BIBLIOGRAFICAS
--------------------------------------------------------------------------------
[1] RMA (Rubber Manufacturers Association). "Manual de diseno de correas
    trapeciales". Rubber Manufacturers Association, USA.

[2] DIN 7753. "Endless wedge belts and groove pulleys for mechanical
    engineering". Deutsches Institut fur Normung, 1988.

[3] ISO 4183. "Belt drives -- Classical and narrow V-belts -- Grooved
    pulleys (system based on datum width)". International Organization
    for Standardization, 1995.

[4] Shigley, J.E. & Mischke, C.R. "Diseño en Ingenieria Mecanica".
    McGraw-Hill, 6ta Edicion, 2002. Capitulo 17: Elementos de maquinas.

[5] Mott, R.L. "Diseño de Elementos de Maquinas". Pearson Educacion,
    4ta Edicion, 2006.

[6] FIPILL S.r.l. "Guia de calculo de una transmision". Catalogo tecnico
    de transmisiones por correa.

[7] Optibelt. "Catalogo de correas de transmision". Optibelt GmbH, 2021.

[8] TEXROPE. "Catalogo de correas HFX y VP2". Transmisiones de potencia.

7. NOTAS IMPORTANTES
--------------------------------------------------------------------------------
- Los valores calculados son estimaciones tecnicas basadas en normas
  industriales. Se recomienda verificar con catalogos del fabricante.
- La vida util estimada depende de condiciones ambientales, alineacion
  y mantenimiento. Los valores son referenciales.
- Para aplicaciones criticas, consulte con un ingeniero especializado.
- EDIM SOLUCIONES no se responsabiliza por el uso indebido de esta
  herramienta en aplicaciones sin validacion profesional.

================================================================================
 EDIM SOLUCIONES - Ingenieria Mecanica de Precision
 www.edimsoluciones.com | contacto@edimsoluciones.com
================================================================================
