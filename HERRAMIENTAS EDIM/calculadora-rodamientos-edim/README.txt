================================================================================
  EDIM SOLUCIONES - CALCULADORA DE RODAMIENTOS ISO 281
  Archivo: calculadora-rodamientos.html
================================================================================

DESCRIPCION
-----------
Calculadora web profesional para la seleccion y calculo de vida util de 
rodamientos segun la norma ISO 281:2007. Desarrollada como herramienta de 
ingenieria para confiabilidad y mantenimiento predictivo.

FUNCIONALIDADES
---------------
1. Calculo de vida util nominal L10 (millones de revoluciones)
2. Calculo de vida util en horas L10h
3. Carga dinamica equivalente P para combinaciones radial/axial
4. Factor de vida ajustada Lna (confiabilidad, lubricacion, contaminacion)
5. Calculo de carga estatica equivalente P0
6. Verificacion de seguridad estatica (factor S0)
7. Tabla de seleccion de rodamientos comunes (series 6000, 6200, 6300, 6400)
8. Calculo de velocidad limite: grasa vs aceite

FORMULAS TECNICAS IMPLEMENTADAS
--------------------------------
- L10 = (C / P)^p
  donde p = 3 (rodamientos de bolas) o p = 10/3 (rodamientos de rodillos)

- L10h = (10^6 * L10) / (60 * n)

- P = X * Fr + Y * Fa
  X, Y: factores de rodamiento segun ISO 281
  Fr: carga radial
  Fa: carga axial

- Lna = a1 * aISO * L10
  a1: factor de confiabilidad
  aISO: factor de vida ajustada (lubricacion, contaminacion)

- P0 = X0 * Fr + Y0 * Fa
  X0 = 0.6, Y0 = 0.5 (rodamientos rigidos de bolas)

- S0 = C0 / P0 (factor de seguridad estatica)

NORMAS DE REFERENCIA
--------------------
- ISO 281:2007 - Rolling bearings - Dynamic load ratings and rating life
- ISO 76:2006  - Rolling bearings - Static load ratings
- ISO 15312:2003 - Rolling bearings - Thermal speed rating
- ISO 281:2007/Amd 2:2019 - Life modification factor for reliability

TABLA DE FACTORES a1 (CONFIABILIDAD)
--------------------------------------
Confiabilidad | Designacion | a1
--------------|-------------|-----
90%           | L10         | 1.00
95%           | L5          | 0.62
96%           | L4          | 0.53
97%           | L3          | 0.44
98%           | L2          | 0.33
99%           | L1          | 0.21

FACTOR aISO (METODO SIMPLIFICADO)
---------------------------------
El factor aISO se calcula considerando:
- Relacion de viscosidad kappa = v / v1
- Nivel de contaminacion ec
- Carga especifica P/C

Valores aproximados de kappa:
kappa >= 4  -> aISO base = 2.5
kappa >= 3  -> aISO base = 2.0
kappa >= 2  -> aISO base = 1.5
kappa >= 1  -> aISO base = 1.0
kappa >= 0.5-> aISO base = 0.6
kappa < 0.5 -> aISO base = 0.3

CRITERIOS DE SEGURIDAD ESTATICA
--------------------------------
S0 >= 2.0 -> Operacion segura (bajas vibraciones)
S0 >= 1.0 -> Aceptable para aplicaciones normales
S0 <  1.0 -> No seguro - verificar rodamiento

DATOS DE RODAMIENTOS
--------------------
Los valores de C, C0 y limites de velocidad corresponden a rodamientos 
rigidos de bolas de una hilera (deep groove ball bearings) con juego 
normal (CN), segun catalogos de fabricantes SKF, FAG, NSK.

USO
---
1. Abrir el archivo calculadora-rodamientos.html en cualquier navegador web
   moderno (Chrome, Firefox, Edge, Safari).
2. No requiere conexion a internet despues de cargar (fuentes se cargan desde
   Google Fonts en la primera apertura).
3. Seleccionar tipo de rodamiento (bolas, rodillos o agujas).
4. Ingresar parametros de carga y operacion.
5. Opcional: seleccionar un rodamiento de la tabla para autocompletar datos.
6. Presionar "CALCULAR TODO" o Enter para obtener resultados.

DISENO
------
- Estilo Neumorphism (Soft UI)
- Paleta: #FFFFFF #121212 #F2F2F2 #D9D9D9 #3A3A3A #E30613
- Fuentes: Orbitron, Rajdhani, Space Grotesk (Google Fonts)
- Iconos SVG estilo Lucide/Phosphor
- Responsive para movil y desktop

DESARROLLADO POR
----------------
EDIM SOLUCIONES
Ingenieria Mecanica - Confiabilidad Industrial

================================================================================
