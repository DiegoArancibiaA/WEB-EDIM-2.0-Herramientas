================================================================================
  CALCULADORA CADENAS DE TRANSMISION - EDIM SOLUCIONES
  Norma ANSI B29.1 / ISO 606
================================================================================

ARCHIVOS INCLUIDOS:
  - calculadora-cadenas.html    : Aplicacion web completa (HTML+CSS+JS)
  - README.txt                  : Este documento

DESARROLLADO POR:
  EDIM SOLUCIONES - Ingenieria Mecanica & Transmisiones

================================================================================
1. TABLA DE CADENAS ANSI / ISO 606 - DIMENSIONES PRINCIPALES
================================================================================

ISO    | ANSI | Paso (mm) | Rodillo (mm) | Ancho int. (mm) | Carga rotura (kN)
-------|------|-----------|--------------|-----------------|------------------
06B    | 35   | 9.525     | 6.35         | 5.72            | 8.9
08B    | 40   | 12.700    | 8.51         | 7.75            | 17.8
10B    | 50   | 15.875    | 10.16        | 9.65            | 22.2
12B    | 60   | 19.050    | 12.07        | 11.68           | 28.9
16B    | 80   | 25.400    | 15.88        | 17.02           | 60.0
20B    | 100  | 31.750    | 19.05        | 19.56           | 95.0
24B    | 120  | 38.100    | 25.40        | 25.40           | 160.0
28B    | 140  | 44.450    | 27.94        | 30.99           | 200.0
32B    | 160  | 50.800    | 29.21        | 30.99           | 250.0
40B    | 200  | 63.500    | 39.37        | 38.10           | 355.0
48B    | 240  | 76.200    | 47.63        | 47.63           | 560.0

NOTA: Los valores de carga de rotura corresponden a cadenas simplex (1 hilera).

================================================================================
2. FACTORES DE SERVICIO (Ks) - ANSI B29.1
================================================================================

Tipo de Carga              | Condicion de Operacion           | Ks
---------------------------|----------------------------------|-------
Uniforme / Suave           | Bombas centrifugas, ventiladores,| 1.0
                           | transportadores ligeros          |
Ligera / Poco irregular    | Maquinas herramienta ligeras,    | 1.2
                           | agitadores, mezcladores          |
Moderada / Irregular       | Compresores, transportadores     | 1.4
                           | pesados, maquinas de impresion   |
Pesada / Impacto moderado  | Trituradoras, prensas,           | 1.6
                           | laminadoras, gruas               |
Muy pesada / Impacto severo| Martillos, cizallas, maquinaria  | 1.8
                           | minera, excavadoras              |
Extrema / Impacto maximo   | Maquinaria de fundicion,         | 2.0
                           | prensas de forja, molinos        |

================================================================================
3. FACTORES DE HILERA (Multiplex)
================================================================================

Hileras     | Factor | Descripcion
------------|--------|----------------------------------------
1 (Simplex) | 1.0    | Cadena de una sola hilera
2 (Duplex)  | 1.7    | Cadena de dos hileras paralelas
3 (Triplex) | 2.5    | Cadena de tres hileras paralelas

================================================================================
4. FORMULAS DE CALCULO
================================================================================

A) Longitud de cadena en pasos (Lp):
   Lp = 2*Cp + (N1 + N2)/2 + [(N2 - N1)/(2*pi)]^2 / Cp

   Donde:
   Cp = Distancia entre centros en pasos = a / p
   N1 = Numero de dientes del pinon
   N2 = Numero de dientes de la corona
   p  = Paso de la cadena (mm)

B) Velocidad de la cadena (v):
   v = p * N1 * n1 / (60 * 1000)   [m/s]

   Donde:
   n1 = Velocidad de rotacion del pinon (RPM)

C) Potencia de diseno corregida (Pd):
   Pd = P * Ks   [kW]

   Donde:
   P  = Potencia nominal a transmitir (kW)
   Ks = Factor de servicio

D) Fuerza de traccion en la cadena (F):
   F = 1020 * P / v   [N]

   Donde:
   P = Potencia nominal (kW)
   v = Velocidad de cadena (m/s)

E) Diametro primitivo del pinon (D1):
   D1 = p / sen(pi / N1)   [mm]

F) Diametro primitivo de la corona (D2):
   D2 = p / sen(pi / N2)   [mm]

================================================================================
5. CRITERIOS DE DISENO - NORMA ANSI B29.1 / ISO 606
================================================================================

- Numero minimo de dientes pinon: 11 (recomendado >= 17 para altas velocidades)
- Relacion maxima de transmision: i <= 7:1
- Distancia entre centros optima: 30p a 50p (p = paso de cadena)
- Distancia entre centros maxima: 80p
- Angulo de contacto minimo pinon: >= 120 grados
- Longitud de cadena: debe ser numero entero de pasos
- Factor de seguridad minimo: >= 6 (carga de rotura / fuerza de traccion)

================================================================================
6. TIPOS DE LUBRICACION SEGUN VELOCIDAD
================================================================================

Tipo | Metodo                  | Rango de Velocidad (m/s)
-----|-------------------------|---------------------------
I    | Manual / Periodica      | v <= 4
II   | Goteo                   | 4 < v <= 7
III  | Bano de aceite          | 7 < v <= 12
IV   | Pulverizacion           | 12 < v <= 20
V    | Forzada con bomba       | v > 20

================================================================================
7. INSTRUCCIONES DE USO
================================================================================

1. Abrir el archivo calculadora-cadenas.html en cualquier navegador web moderno.
2. Seleccionar el paso de cadena ISO/ANSI deseado.
3. Seleccionar el tipo de cadena (Simplex, Duplex o Triplex).
4. Ingresar los datos de engranajes: dientes pinon, dientes corona, RPM.
5. Ingresar la distancia entre centros deseada (mm).
6. Ingresar la potencia nominal (kW) y el factor de servicio Ks.
   (Tambien puede seleccionar Ks desde la tabla interactiva)
7. Presionar "Calcular Transmision" para obtener todos los resultados.
8. Verificar las alertas de diseno y la recomendacion de lubricacion.

La aplicacion no requiere conexion a internet (excepto para cargar las fuentes
Google Fonts en la primera apertura).

================================================================================
8. REFERENCIAS
================================================================================

- ANSI/ASME B29.1: Precision Power Transmission Roller Chains, Attachments and
  Sprockets
- ISO 606: Short-pitch transmission precision roller chains and chain wheels
- ISO 10823: Guidance on the selection of roller chain drives

================================================================================
  EDIM SOLUCIONES - Ingenieria Mecanica & Transmisiones
  Calculadora desarrollada para uso industrial profesional
================================================================================
