# EDIM SOLUCIONES

<p align="center">
  <img src="assets/img/logo-edim-png.png" alt="EDIM SOLUCIONES Logo" width="180">
</p>

<p align="center">
  <strong>Soluciones de ingenieria, automatizacion industrial, desarrollo de software e innovacion tecnologica.</strong>
</p>

<p align="center">
  <a href="https://edimsoluciones.com" target="_blank">
    <img src="https://img.shields.io/badge/WEBSITE-LIVE-E30613?style=for-the-badge&logo=firefox&logoColor=white" alt="Website">
  </a>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
</p>

---

## Descripcion

**EDIM SOLUCIONES** es una pagina web corporativa profesional orientada a empresas de ingenieria, automatizacion industrial, desarrollo de software, inteligencia artificial, IoT y consultoria tecnologica. El sitio combina un diseno visual moderno basado en **Neumorphism (Soft UI)** con una arquitectura limpia, modular y escalable, preparada para convertir visitantes en clientes mediante herramientas gratuitas de ingenieria.

El proyecto esta construido con tecnologias web nativas (**HTML5, CSS3, JavaScript Vanilla y PHP**) sin dependencias de frameworks pesados, garantizando un rendimiento optimo, tiempos de carga rapidos y una experiencia de usuario premium comparable a sitios de empresas tecnologicas de clase mundial.

---

## Caracteristicas Principales

### Diseno y UX
- **Neumorphism (Soft UI)** en toda la interfaz: sombras suaves, relieves elegantes, esquinas redondeadas y transiciones fluidas.
- **Paleta corporativa estricta**: Blanco `#FFFFFF`, Negro `#121212`, Grises `#F2F2F2` `#D9D9D9` `#3A3A3A`, Rojo corporativo `#E30613`.
- **Fuentes futuristas y tecnologicas**: Orbitron (display), Rajdhani (tecnico), Space Grotesk (cuerpo).
- **Gradientes elegantes** en botones principales, titulos destacados, orbes decorativos y transiciones de seccion.
- **Glassmorphism dinamico** en el header sticky con blur y transparencia adaptativa al scroll.
- **Iconografia SVG profesional** de estilo uniforme (Lucide/Phosphor). **Sin emojis** en ningun componente.

### Animaciones y Navegacion
- **Smooth scrolling** con easing personalizado para navegacion fluida entre secciones.
- **Scroll Reveal**: elementos que aparecen con Fade In, Slide Up, Scale, Blur Reveal y Parallax sutil.
- **Microinteracciones** en tarjetas, botones e iconos con elevacion, iluminacion y sombras dinamicas.
- **Contadores animados** en estadisticas con aceleracion por hardware (GPU).
- **Slider de testimonios** automatico con navegacion por dots.

### Secciones del Sitio
| Seccion | Descripcion |
|---------|-------------|
| **Hero** | Titulo impactante, composicion isometrica animada, botones CTA duales. |
| **Quienes Somos** | Mision, vision, valores y estadisticas flotantes con parallax. |
| **Servicios** | 11 tarjetas de servicios profesionales con iconografia tecnica. |
| **Software Gratuito** | 12 herramientas de ingenieria para atraer trafico organico. |
| **Calculadoras y Recursos** | Sistema de pestanas con 12 calculadoras tecnicas modulares. |
| **Proyectos** | Portafolio de trabajos realizados con overlay de tecnologias. |
| **Blog Tecnico** | Articulos con categoria, fecha y extracto para SEO. |
| **Testimonios** | Opiniones de clientes con rating de 5 estrellas y slider. |
| **Estadisticas** | Contadores animados: proyectos, clientes, herramientas, experiencia. |
| **Contacto** | Formulario con validacion JavaScript + PHP y datos de contacto. |

### SEO y Rendimiento
- Etiquetas semanticas HTML5, jerarquia H1-H6, metadatos completos.
- Open Graph, Twitter Cards, Schema.org en JSON-LD.
- Codigo optimizado para puntuaciones superiores a 95 en Google Lighthouse.
- Animaciones GPU-accelerated usando unicamente `transform` y `opacity`.
- Estructura de carpetas profesional y codigo comentado.

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estructura semantica, accesibilidad, SEO |
| **CSS3** | Neumorphism, gradientes, animaciones, responsive design |
| **JavaScript (Vanilla)** | Smooth scroll, validacion de formularios, sliders, contadores, reveal animations |
| **PHP** | Procesamiento del formulario de contacto (contact.php) |
| **Google Fonts** | Orbitron, Rajdhani, Space Grotesk |
| **SVG** | Iconografia vectorial profesional inline |

---

## Estructura del Proyecto

```
edim-soluciones/
|-- index.php              # Pagina principal (HTML + PHP)
|-- contact.php            # Procesamiento del formulario de contacto
|-- css/
|   |-- style.css          # Hoja de estilos completa (Neumorphism + Gradientes)
|-- js/
|   |-- main.js            # Logica de interaccion (Vanilla JS)
|-- assets/
|   |-- img/
|   |   |-- logo-edim-png.png    # Logo oficial de la empresa
|-- includes/              # Carpeta para futuros includes PHP
|-- README.md              # Este archivo
```

---

## Instalacion y Despliegue

### Requisitos
- Servidor web con soporte **PHP 7.4+** (Apache, Nginx, LiteSpeed)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Pasos

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/edim-soluciones.git
   cd edim-soluciones
   ```

2. **Coloca el logo de la empresa:**
   ```
   assets/img/logo-edim-png.png
   ```

3. **Configura el correo de destino en `contact.php`:**
   ```php
   $to = 'contacto@edimsoluciones.com';
   ```

4. **Sube los archivos a tu servidor web** (public_html, htdocs, www, etc.)

5. **Accede al sitio:**
   ```
   https://tu-dominio.com
   ```

---

## Herramientas Gratuitas Incluidas

El sitio incluye tarjetas de acceso a las siguientes herramientas de ingenieria (desarrolladas como modulos independientes):

| Herramienta | Categoria |
|-------------|-----------|
| Disenador de Engranajes | Mecanica |
| Reductores Planetarios | Mecanica |
| Optimizador de Cortes | Mecanica |
| Calculadora de Ejes | Mecanica |
| Calculadora de Rodamientos | Mecanica |
| Calculadora de Correas | Mecanica |
| Calculadora de Cadenas | Mecanica |
| Calculadora de Poleas | Mecanica |
| Calculadora de Motores Electricos | Electricidad |
| Calculadora de Caida de Tension | Electricidad |
| Calculadora de Factor de Potencia | Electricidad |
| Conversor Universal de Unidades | General |
| Calculadoras de Electronica | Electronica |
| Herramientas para PLC | Automatizacion |
| Herramientas de Neumatica | Automatizacion |

> **Nota:** Cada herramienta se desarrolla como un archivo HTML monolitico independiente que mantiene la coherencia visual con el sitio principal. Los enlaces en `index.php` apuntan a la carpeta `herramientas/`.

---

## Roadmap

- [x] Pagina principal corporativa
- [x] Diseno Neumorphism responsive
- [x] Formulario de contacto con validacion
- [x] SEO tecnico completo
- [ ] Integracion de herramientas de calculo (en desarrollo)
- [ ] Sistema de blog dinamico con PHP/MySQL
- [ ] Panel de administracion para gestion de contenido
- [ ] Multilenguaje (ES/EN)
- [ ] PWA (Progressive Web App)

---

## Licencia

Este proyecto es propiedad de **EDIM SOLUCIONES**.

Todos los derechos reservados. El codigo fuente esta disponible para fines de referencia y desarrollo interno. No se permite la redistribucion ni el uso comercial sin autorizacion expresa.

---

## Contacto

- **Web:** [https://edimsoluciones.com](https://edimsoluciones.com)
- **Email:** contacto@edimsoluciones.com
- **Telefono:** +1 (555) 123-4567
- **Direccion:** Av. Industrial 1234, Ciudad Tecnologica

---

<p align="center">
  <sub>Desarrollado con precision por EDIM SOLUCIONES &copy; 2026</sub>
</p>
