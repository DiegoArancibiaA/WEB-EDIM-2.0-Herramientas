================================================================================
  EDIM SOLUCIONES - CALCULADORA DE POLEAS DE TRANSMISION
  Version 1.0 - Julio 2026
================================================================================

DESCRIPCION
-----------
Calculadora web profesional para el dimensionamiento y verificacion de 
transmisiones por poleas y correas. Incluye calculo de velocidad periferica,
relacion de transmision, par transmitido, fuerza centrifuga, tensiones en 
ramales, longitud de correa y verificacion de velocidad maxima.

DISEÑO
------
- Estilo Neumorphism coherente con identidad EDIM SOLUCIONES
- Paleta de colores: #FFFFFF #121212 #F2F2F2 #D9D9D9 #3A3A3A #E30613
- Fuentes tipograficas: Orbitron, Rajdhani, Space Grotesk (Google Fonts)
- Iconografia SVG profesional (sin emojis)
- Visualizacion SVG interactiva de la pareja de poleas
- Diseño responsive para dispositivos moviles

FORMULAS IMPLEMENTADAS
----------------------
  v = pi * d * n / 60000          [m/s]  Velocidad periferica
  i = n1 / n2 = d2 / d1                  Relacion de transmision
  T = 9550 * P / n                [N.m]  Par transmitido
  F1 - F2 = 2T / d                [N]    Diferencia de tensiones
  Fc = m * v^2 / r                [N]    Fuerza centrifuga
  L = 2C + pi(D+d)/2 + (D-d)^2/(4C) [mm] Longitud de correa

TABLA DE DIAMETROS MINIMOS POR TIPO DE CORREA
---------------------------------------------
+-----------+-------------+------------------+---------------------+----------------+----------+
| Seccion   | bxh (mm)    | Diam. Min. Normal| Diam. Min. Admisible| Fuerza Tang. T | Vel. Max |
|           |             | (mm)             | (mm)                | (kg)           | (m/s)    |
+-----------+-------------+------------------+---------------------+----------------+----------+
| A         | 13 x 8      | 90               | 80                  | 14             | 25       |
| B         | 17 x 11     | 140              | 125                 | 20             | 25       |
| C         | 22 x 14     | 224              | 200                 | 45             | 25       |
| D         | 32 x 19     | 355              | 315                 | 84             | 25       |
| E         | 38 x 25     | 500              | 450                 | 120            | 25       |
| 3V / SPZ  | 9.7 x 8     | 63               | 56                  | --             | 40       |
| 5V / SPB  | 16.3 x 13   | 140              | 125                 | --             | 40       |
| 8V / SPC  | 25.5 x 22   | 280              | 250                 | --             | 40       |
| PL        | --          | 75               | 65                  | --             | 30       |
| PM        | --          | 180              | 160                 | --             | 30       |
+-----------+-------------+------------------+---------------------+----------------+----------+

NOTAS IMPORTANTES
-----------------
1. La velocidad periferica maxima recomendada para correas V clasicas 
   (secciones A-E) es de 25 m/s segun normas industriales.
   Para correas estrechas (3V, 5V, 8V) el limite puede llegar a 40 m/s.

2. El diametro minimo admisible es el valor absoluto minimo que puede 
   montarse sobre un eje sin comprometer la vida util de la correa.
   Se recomienda usar siempre el diametro minimo normal.

3. La fuerza centrifuga se calcula con la masa lineal aproximada de cada 
   tipo de correa. Los valores de masa lineal son referenciales.

4. Para correas Poly-V (PL, PM), los diametros minimos dependen del 
   fabricante. Los valores indicados son orientativos.

5. La longitud de correa calculada es teorica. Se debe seleccionar la 
   longitud normalizada comercial mas cercana y ajustar la distancia 
   entre ejes en consecuencia.

6. El numero de canales/correas afecta el calculo de fuerza centrifuga 
   total pero no modifica la velocidad periferica ni la relacion de 
   transmision.

USO
---
1. Abrir el archivo calculadora-poleas.html en cualquier navegador web
2. Seleccionar el tipo de correa
3. Ingresar los parametros de entrada (diametros, RPM, potencia, etc.)
4. Presionar el boton "Calcular"
5. Revisar los resultados y la visualizacion SVG
6. Verificar que la velocidad periferica no exceda el limite recomendado

REQUISITOS
----------
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexion a internet para cargar las fuentes de Google Fonts
- No requiere instalacion ni servidor

DESARROLLADO POR
----------------
EDIM SOLUCIONES
Ingenieria Mecanica y Diseno Industrial

================================================================================
