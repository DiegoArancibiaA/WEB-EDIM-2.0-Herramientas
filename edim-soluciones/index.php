<?php
/**
 * EDIM SOLUCIONES - Pagina Web Corporativa
 * Archivo principal PHP
 */
?><!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="EDIM SOLUCIONES - Desarrollo de soluciones de ingenieria, automatizacion industrial, software, inteligencia artificial, IoT y consultoria tecnologica. Herramientas gratuitas para ingenieros.">
    <meta name="keywords" content="ingenieria, automatizacion industrial, software, inteligencia artificial, IoT, diseno mecanico, electronica, fabricacion digital, desarrollo web, consultoria tecnologica">
    <meta name="author" content="EDIM SOLUCIONES">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="EDIM SOLUCIONES | Ingenieria, Automatizacion y Tecnologia">
    <meta property="og:description" content="Soluciones de ingenieria de alto nivel. Automatizacion industrial, software, IA, IoT y herramientas gratuitas para ingenieros.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://edimsoluciones.com">
    <meta property="og:image" content="assets/img/logo-edim-png.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="EDIM SOLUCIONES | Ingenieria y Tecnologia">
    <meta name="twitter:description" content="Soluciones de ingenieria, automatizacion industrial y herramientas gratuitas.">
    <meta name="twitter:image" content="assets/img/logo-edim-png.png">
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"EDIM SOLUCIONES","url":"https://edimsoluciones.com","logo":"assets/img/logo-edim-png.png","description":"Desarrollo de soluciones de ingenieria, automatizacion industrial, software, inteligencia artificial, IoT y consultoria tecnologica."}</script>
    <title>EDIM SOLUCIONES | Ingenieria, Automatizacion Industrial y Tecnologia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- HEADER -->
    <header class="header" id="header">
        <div class="container header-inner">
            <a href="#" class="logo">
                <img src="assets/img/logo-edim-png.png" alt="EDIM SOLUCIONES Logo">
                <span class="logo-text"><span></span></span>
            </a>
            <nav class="nav">
                <a href="#inicio" class="nav-link">Inicio</a>
                <a href="#nosotros" class="nav-link">Nosotros</a>
                <a href="#servicios" class="nav-link">Servicios</a>
                <a href="#software" class="nav-link">Software</a>
                <a href="#calculadoras" class="nav-link">Calculadoras</a>
                <a href="#proyectos" class="nav-link">Proyectos</a>
                <a href="#blog" class="nav-link">Blog</a>
                <a href="#contacto" class="btn btn-primary btn-sm nav-cta">Contactar</a>
            </nav>
            <button class="mobile-toggle" id="mobileToggle" aria-label="Menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </header>
    <div class="menu-overlay" id="menuOverlay"></div>
    <nav class="mobile-menu" id="mobileMenu">
        <a href="#inicio" class="nav-link">Inicio</a>
        <a href="#nosotros" class="nav-link">Nosotros</a>
        <a href="#servicios" class="nav-link">Servicios</a>
        <a href="#software" class="nav-link">Software</a>
        <a href="#calculadoras" class="nav-link">Calculadoras</a>
        <a href="#proyectos" class="nav-link">Proyectos</a>
        <a href="#blog" class="nav-link">Blog</a>
        <a href="#contacto" class="nav-link">Contacto</a>
    </nav>

    <!-- HERO SECTION -->
    <section class="hero" id="inicio">
        <div class="hero-bg">
            <div class="hero-grid"></div>
            <div class="hero-orb hero-orb-1"></div>
            <div class="hero-orb hero-orb-2"></div>
            <div class="hero-orb hero-orb-3"></div>
        </div>
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <div class="hero-badge reveal reveal-delay-1">
                        <span class="dot"></span>
                        <span>Ingenieria de Precision</span>
                    </div>
                    <h1 class="hero-title reveal reveal-delay-2">
                        Transformamos Ideas en<br>
                        <span class="highlight">Soluciones Reales</span>
                    </h1>
                    <p class="hero-subtitle reveal reveal-delay-3">
                        Desarrollamos soluciones de ingenieria avanzada, automatizacion industrial,
                        software de alto rendimiento e inteligencia artificial para impulsar la
                        industria del futuro.
                    </p>
                    <div class="hero-buttons reveal reveal-delay-4">
                        <a href="#servicios" class="btn btn-primary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Servicios Profesionales
                        </a>
                        <a href="#software" class="btn btn-secondary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                            Herramientas Gratuitas
                        </a>
                    </div>
                </div>
                <div class="hero-visual reveal-scale reveal-delay-3">
                    <div class="hero-visual-inner">
                        <div class="hero-isometric">
                            <div class="iso-card">
                                <svg class="iso-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span class="iso-label">Automatizacion</span>
                            </div>
                            <div class="iso-card">
                                <svg class="iso-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
                                <span class="iso-label">IoT</span>
                            </div>
                            <div class="iso-card">
                                <svg class="iso-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                                <span class="iso-label">Fabricacion</span>
                            </div>
                            <div class="iso-card">
                                <svg class="iso-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12L2.5 8.5"/></svg>
                                <span class="iso-label">IA</span>
                            </div>
                            <div class="iso-card">
                                <svg class="iso-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                                <span class="iso-label">Mecanica</span>
                            </div>
                            <div class="hero-center-element">
                                <img src="assets/img/logo-edim-png.png" alt="EDIM SOLUCIONES">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="scroll-indicator">
            <span>Desplazar</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 13l5 5 5-5"/><path d="M7 6l5 5 5-5"/></svg>
        </div>
    </section>

    <!-- ABOUT SECTION -->
    <section class="about section-padding" id="nosotros">
        <div class="container">
            <div class="about-grid">
                <div class="about-visual reveal-left">
                    <div class="about-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" alt="Ingenieria EDIM SOLUCIONES">
                    </div>
                    <div class="about-stats-float reveal reveal-delay-3">
                        <div class="about-stat-item">
                            <div class="about-stat-number">15+</div>
                            <div class="about-stat-label">Anos Exp.</div>
                        </div>
                        <div class="about-stat-item">
                            <div class="about-stat-number">200+</div>
                            <div class="about-stat-label">Proyectos</div>
                        </div>
                        <div class="about-stat-item">
                            <div class="about-stat-number">50+</div>
                            <div class="about-stat-label">Clientes</div>
                        </div>
                    </div>
                </div>
                <div class="about-content reveal-right">
                    <span class="section-label">Quienes Somos</span>
                    <h2 class="section-title" style="text-align:left;margin-bottom:20px;">Ingenieria que Impulsa el Futuro</h2>
                    <p class="about-text">
                        EDIM SOLUCIONES es una empresa especializada en el desarrollo de soluciones tecnologicas
                        de alto nivel. Combinamos conocimiento tecnico profundo con innovacion constante para
                        ofrecer resultados que superan las expectativas de nuestros clientes.
                    </p>
                    <p class="about-text">
                        Nuestro equipo multidisciplinario de ingenieros, desarrolladores y especialistas trabaja
                        con pasion y precision para transformar los desafios mas complejos en soluciones eficientes,
                        sostenibles y escalables.
                    </p>
                    <div class="values-grid">
                        <div class="value-item reveal reveal-delay-1">
                            <svg class="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            <div>
                                <div class="value-title">Calidad Garantizada</div>
                                <div class="value-desc">Estandares internacionales en cada proyecto</div>
                            </div>
                        </div>
                        <div class="value-item reveal reveal-delay-2">
                            <svg class="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                            <div>
                                <div class="value-title">Innovacion Continua</div>
                                <div class="value-desc">Tecnologia de vanguardia aplicada</div>
                            </div>
                        </div>
                        <div class="value-item reveal reveal-delay-3">
                            <svg class="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            <div>
                                <div class="value-title">Entrega Puntual</div>
                                <div class="value-desc">Compromiso con los plazos acordados</div>
                            </div>
                        </div>
                        <div class="value-item reveal reveal-delay-4">
                            <svg class="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            <div>
                                <div class="value-title">Equipo Especializado</div>
                                <div class="value-desc">Profesionales certificados y en formacion</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SERVICES SECTION -->
    <section class="services section-padding" id="servicios">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">Nuestros Servicios</span>
                <h2 class="section-title">Soluciones Integrales de Ingenieria</h2>
                <p class="section-subtitle">Ofrecemos un portafolio completo de servicios profesionales disenados para optimizar procesos, aumentar la eficiencia y acelerar la innovacion.</p>
            </div>
            <div class="services-grid">
                <div class="card service-card reveal reveal-delay-1">
                    <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
                    <h3 class="card-title">Automatizacion Industrial</h3>
                    <p class="card-text">Diseno e implementacion de sistemas automatizados para optimizar procesos productivos y mejorar la eficiencia operativa.</p>
                </div>
                <div class="card service-card reveal reveal-delay-2">
                    <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
                    <h3 class="card-title">Desarrollo de Software</h3>
                    <p class="card-text">Aplicaciones personalizadas, sistemas de gestion y plataformas tecnologicas adaptadas a las necesidades de su negocio.</p>
                </div>
                <div class="card service-card reveal reveal-delay-3">
                    <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12L2.5 8.5"/></svg></div>
                    <h3 class="card-title">Inteligencia Artificial</h3>
                    <p class="card-text">Implementacion de modelos de machine learning, vision por computadora y sistemas inteligentes.</p>
                </div>
                <div class="card service-card reveal reveal-delay-1">
                    <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                    <h3 class="card-title">Diseno Mecanico</h3>
                    <p class="card-text">Modelado 3D, simulacion de elementos finitos y desarrollo de piezas y ensamblajes mecanicos.</p>
                </div>
                <div class="card service-card reveal reveal-delay-2">
                    <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg></div>
                    <h3 class="card-title">Diseno Electronico</h3>
                    <p class="card-text">Desarrollo de circuitos impresos, prototipos electronicos y sistemas embebidos.</p>
                </div>
                <div class="card service-card reveal reveal-delay-3">
                    <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div>
                    <h3 class="card-title">IoT e Industria 4.0</h3>
                    <p class="card-text">Conectividad inteligente, sensores, actuadores y plataformas de monitoreo.</p>
                </div>
                <div class="card service-card reveal reveal-delay-1">
                    <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg></div>
                    <h3 class="card-title">Fabricacion Digital</h3>
                    <p class="card-text">Impresion 3D industrial, corte CNC, mecanizado de precision y manufactura aditiva.</p>
                </div>
                <div class="card service-card reveal reveal-delay-2">
                    <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
                    <h3 class="card-title">Desarrollo Web</h3>
                    <p class="card-text">Sitios web corporativos, aplicaciones web progresivas y plataformas digitales.</p>
                </div>
                <div class="card service-card reveal reveal-delay-3">
                    <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
                    <h3 class="card-title">Consultoria Tecnologica</h3>
                    <p class="card-text">Asesoria especializada en transformacion digital y optimizacion de procesos.</p>
                </div>
                <div class="card service-card reveal reveal-delay-1">
                    <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                    <h3 class="card-title">Mantenimiento Industrial</h3>
                    <p class="card-text">Mantenimiento predictivo, correctivo y preventivo de equipos industriales.</p>
                </div>
                <div class="card service-card reveal reveal-delay-2">
                    <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>
                    <h3 class="card-title">Diseno de Proyectos</h3>
                    <p class="card-text">Gestion integral de proyectos de ingenieria desde la concepcion hasta la puesta en marcha.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FREE SOFTWARE SECTION -->
    <section class="free-software section-padding" id="software">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">Software Gratuito</span>
                <h2 class="section-title">Herramientas para Ingenieros</h2>
                <p class="section-subtitle">Desarrollamos y compartimos herramientas profesionales de forma gratuita para la comunidad de ingenieria.</p>
            </div>
            <div class="tools-grid">
                <div class="tool-card reveal reveal-delay-1">
                    <div class="tool-header">
                        <div class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12L2.5 8.5"/></svg></div>
                        <span class="tool-name">Disenador de Engranajes</span>
                    </div>
                    <p class="tool-desc">Disena y calcula parametros de engranajes rectos, helicoidales y conicos con precision.</p>
                    <button class="tool-btn">Abrir Herramienta <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="tool-card reveal reveal-delay-2">
                    <div class="tool-header">
                        <div class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div>
                        <span class="tool-name">Reductores Planetarios</span>
                    </div>
                    <p class="tool-desc">Calcula relaciones de transmision, dimensiones y selecciona componentes.</p>
                    <button class="tool-btn">Abrir Herramienta <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="tool-card reveal reveal-delay-3">
                    <div class="tool-header">
                        <div class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div>
                        <span class="tool-name">Optimizador de Cortes</span>
                    </div>
                    <p class="tool-desc">Optimiza el aprovechamiento de material con algoritmos de nesting.</p>
                    <button class="tool-btn">Abrir Herramienta <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="tool-card reveal reveal-delay-1">
                    <div class="tool-header">
                        <div class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                        <span class="tool-name">Calculadora de Ejes</span>
                    </div>
                    <p class="tool-desc">Analisis de resistencia a la torsion, flexion y fatiga para ejes.</p>
                    <button class="tool-btn">Abrir Herramienta <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="tool-card reveal reveal-delay-2">
                    <div class="tool-header">
                        <div class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
                        <span class="tool-name">Calculadora de Rodamientos</span>
                    </div>
                    <p class="tool-desc">Seleccion y calculo de vida util de rodamientos segun normas ISO.</p>
                    <button class="tool-btn">Abrir Herramienta <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="tool-card reveal reveal-delay-3">
                    <div class="tool-header">
                        <div class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                        <span class="tool-name">Calculadora de Correas</span>
                    </div>
                    <p class="tool-desc">Diseno de transmisiones por correas: V, planas, sincronicas y poly-V.</p>
                    <button class="tool-btn">Abrir Herramienta <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="tool-card reveal reveal-delay-1">
                    <div class="tool-header">
                        <div class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
                        <span class="tool-name">Calculadora de Cadenas</span>
                    </div>
                    <p class="tool-desc">Seleccion de cadenas de rodillos, calculo de paso y verificacion.</p>
                    <button class="tool-btn">Abrir Herramienta <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="tool-card reveal reveal-delay-2">
                    <div class="tool-header">
                        <div class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
                        <span class="tool-name">Calculadora de Poleas</span>
                    </div>
                    <p class="tool-desc">Dimensionamiento de poleas, calculo de diametros y velocidades.</p>
                    <button class="tool-btn">Abrir Herramienta <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="tool-card reveal reveal-delay-3">
                    <div class="tool-header">
                        <div class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
                        <span class="tool-name">Motores Electricos</span>
                    </div>
                    <p class="tool-desc">Seleccion de motores, calculo de potencia, par y rendimiento.</p>
                    <button class="tool-btn">Abrir Herramienta <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="tool-card reveal reveal-delay-1">
                    <div class="tool-header">
                        <div class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg></div>
                        <span class="tool-name">Caida de Tension</span>
                    </div>
                    <p class="tool-desc">Calcula la caida de tension en conductores segun normativa vigente.</p>
                    <button class="tool-btn">Abrir Herramienta <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="tool-card reveal reveal-delay-2">
                    <div class="tool-header">
                        <div class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"/></svg></div>
                        <span class="tool-name">Factor de Potencia</span>
                    </div>
                    <p class="tool-desc">Analisis y correccion del factor de potencia con bancos de capacitores.</p>
                    <button class="tool-btn">Abrir Herramienta <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="tool-card reveal reveal-delay-3">
                    <div class="tool-header">
                        <div class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h3v3h-3zM8 3h3v3H8zM5 8h14v12H5zM12 8v12"/></svg></div>
                        <span class="tool-name">Conversores de Unidades</span>
                    </div>
                    <p class="tool-desc">Conversion completa entre sistemas metrico, imperial y otras unidades.</p>
                    <button class="tool-btn">Abrir Herramienta <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
            </div>
        </div>
    </section>

    <!-- CALCULATORS SECTION -->
    <section class="calculators section-padding" id="calculadoras">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">Recursos Tecnicos</span>
                <h2 class="section-title">Calculadoras y Recursos</h2>
                <p class="section-subtitle">Biblioteca completa de calculadoras tecnicas, herramientas de electronica, automatizacion y recursos para profesionales.</p>
            </div>
            <div class="calc-tabs reveal">
                <button class="calc-tab active" data-tab="mecanica">Mecanica</button>
                <button class="calc-tab" data-tab="electricidad">Electricidad</button>
                <button class="calc-tab" data-tab="electronica">Electronica</button>
                <button class="calc-tab" data-tab="automatizacion">Automatizacion</button>
                <button class="calc-tab" data-tab="general">General</button>
            </div>
            <div class="calc-grid" id="calcGrid">
                <div class="calc-card reveal reveal-delay-1" data-category="mecanica">
                    <div class="calc-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12L2.5 8.5"/></svg></div>
                    <h3 class="calc-card-title">Engranajes</h3>
                    <p class="calc-card-desc">Modulo, paso diametral, relacion de transmision y geometria completa.</p>
                    <button class="tool-btn">Abrir <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="calc-card reveal reveal-delay-2" data-category="mecanica">
                    <div class="calc-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                    <h3 class="calc-card-title">Resistencia de Materiales</h3>
                    <p class="calc-card-desc">Esfuerzos, deformaciones, factor de seguridad y vigas.</p>
                    <button class="tool-btn">Abrir <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="calc-card reveal reveal-delay-3" data-category="mecanica">
                    <div class="calc-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
                    <h3 class="calc-card-title">Tornillos y Uniones</h3>
                    <p class="calc-card-desc">Apriete, precarga, torque y seleccion de tornillos segun norma.</p>
                    <button class="tool-btn">Abrir <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="calc-card reveal reveal-delay-1" data-category="electricidad">
                    <div class="calc-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
                    <h3 class="calc-card-title">Potencia Electrica</h3>
                    <p class="calc-card-desc">Potencia activa, reactiva, aparente y calculo de corriente.</p>
                    <button class="tool-btn">Abrir <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="calc-card reveal reveal-delay-2" data-category="electricidad">
                    <div class="calc-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg></div>
                    <h3 class="calc-card-title">Seccion de Conductores</h3>
                    <p class="calc-card-desc">Dimensionamiento de cables segun corriente, distancia y normativa.</p>
                    <button class="tool-btn">Abrir <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="calc-card reveal reveal-delay-3" data-category="electricidad">
                    <div class="calc-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"/></svg></div>
                    <h3 class="calc-card-title">Transformadores</h3>
                    <p class="calc-card-desc">Relacion de transformacion, perdidas y rendimiento.</p>
                    <button class="tool-btn">Abrir <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="calc-card reveal reveal-delay-1" data-category="electronica">
                    <div class="calc-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg></div>
                    <h3 class="calc-card-title">Divisor de Tension</h3>
                    <p class="calc-card-desc">Calcula divisores resistivos para senales y referencias.</p>
                    <button class="tool-btn">Abrir <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="calc-card reveal reveal-delay-2" data-category="electronica">
                    <div class="calc-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                    <h3 class="calc-card-title">Filtros RC y RL</h3>
                    <p class="calc-card-desc">Frecuencia de corte, respuesta en frecuencia y componentes.</p>
                    <button class="tool-btn">Abrir <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="calc-card reveal reveal-delay-3" data-category="automatizacion">
                    <div class="calc-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div>
                    <h3 class="calc-card-title">Herramientas PLC</h3>
                    <p class="calc-card-desc">Simuladores de logica ladder, temporizadores y contadores.</p>
                    <button class="tool-btn">Abrir <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="calc-card reveal reveal-delay-1" data-category="automatizacion">
                    <div class="calc-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12L2.5 8.5"/></svg></div>
                    <h3 class="calc-card-title">Neumatica</h3>
                    <p class="calc-card-desc">Cilindros, valvulas, calculo de consumo de aire comprimido.</p>
                    <button class="tool-btn">Abrir <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="calc-card reveal reveal-delay-2" data-category="general">
                    <div class="calc-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h3v3h-3zM8 3h3v3H8zM5 8h14v12H5zM12 8v12"/></svg></div>
                    <h3 class="calc-card-title">Conversor Universal</h3>
                    <p class="calc-card-desc">Longitud, masa, presion, temperatura, velocidad y mas.</p>
                    <button class="tool-btn">Abrir <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
                <div class="calc-card reveal reveal-delay-3" data-category="general">
                    <div class="calc-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
                    <h3 class="calc-card-title">Fluidos</h3>
                    <p class="calc-card-desc">Caudal, Reynolds, perdidas por friccion, bombas y tuberias.</p>
                    <button class="tool-btn">Abrir <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>
                </div>
            </div>
        </div>
    </section>

    <!-- PROJECTS SECTION -->
    <section class="projects section-padding" id="proyectos">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">Portafolio</span>
                <h2 class="section-title">Proyectos Realizados</h2>
                <p class="section-subtitle">Conozca algunos de los proyectos que hemos desarrollado para clientes de diversos sectores industriales y tecnologicos.</p>
            </div>
            <div class="projects-grid">
                <div class="project-card reveal reveal-delay-1">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" alt="Celda Robotizada">
                        <div class="project-overlay">
                            <div class="project-tags">
                                <span class="project-tag">Automatizacion</span>
                                <span class="project-tag">Robotics</span>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Celda Robotizada de Soldadura</h3>
                        <p class="project-desc">Diseno e implementacion de celda robotizada para soldadura MIG/MAG en linea de produccion automotriz.</p>
                        <a href="#" class="project-link">Ver Proyecto <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></a>
                    </div>
                </div>
                <div class="project-card reveal reveal-delay-2">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80" alt="Sistema IoT">
                        <div class="project-overlay">
                            <div class="project-tags">
                                <span class="project-tag">IoT</span>
                                <span class="project-tag">Industria 4.0</span>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Plataforma de Monitoreo IoT</h3>
                        <p class="project-desc">Sistema completo de monitoreo en tiempo real con sensores inalambricos y alertas predictivas.</p>
                        <a href="#" class="project-link">Ver Proyecto <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></a>
                    </div>
                </div>
                <div class="project-card reveal reveal-delay-3">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" alt="Software de Gestion">
                        <div class="project-overlay">
                            <div class="project-tags">
                                <span class="project-tag">Software</span>
                                <span class="project-tag">Web</span>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">ERP Industrial Customizado</h3>
                        <p class="project-desc">Desarrollo de sistema ERP a medida para gestion de produccion, inventario y calidad.</p>
                        <a href="#" class="project-link">Ver Proyecto <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></a>
                    </div>
                </div>
                <div class="project-card reveal reveal-delay-1">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=600&q=80" alt="Diseno Mecanico">
                        <div class="project-overlay">
                            <div class="project-tags">
                                <span class="project-tag">Mecanica</span>
                                <span class="project-tag">CAD</span>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Linea de Ensamblaje Automatizada</h3>
                        <p class="project-desc">Diseno mecanico completo de linea de ensamblaje con transportadores y estaciones robotizadas.</p>
                        <a href="#" class="project-link">Ver Proyecto <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></a>
                    </div>
                </div>
                <div class="project-card reveal reveal-delay-2">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80" alt="Vision Artificial">
                        <div class="project-overlay">
                            <div class="project-tags">
                                <span class="project-tag">IA</span>
                                <span class="project-tag">Vision</span>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Vision por Computadora</h3>
                        <p class="project-desc">Implementacion de sistema de inspeccion visual automatizado con deep learning.</p>
                        <a href="#" class="project-link">Ver Proyecto <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></a>
                    </div>
                </div>
                <div class="project-card reveal reveal-delay-3">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80" alt="Electronica">
                        <div class="project-overlay">
                            <div class="project-tags">
                                <span class="project-tag">Electronica</span>
                                <span class="project-tag">PCB</span>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Controlador Electronico Industrial</h3>
                        <p class="project-desc">Diseno y fabricacion de controlador electronico con comunicacion industrial IP65.</p>
                        <a href="#" class="project-link">Ver Proyecto <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- BLOG SECTION -->
    <section class="blog section-padding" id="blog">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">Blog Tecnico</span>
                <h2 class="section-title">Conocimiento Compartido</h2>
                <p class="section-subtitle">Articulos tecnicos, tutoriales y recursos de ingenieria para profesionales y estudiantes.</p>
            </div>
            <div class="blog-grid">
                <article class="blog-card reveal reveal-delay-1">
                    <div class="blog-image">
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" alt="Automatizacion Industrial">
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-category">Automatizacion</span>
                            <span class="blog-date">15 Jul 2026</span>
                        </div>
                        <h3 class="blog-title">Tendencias en Automatizacion Industrial 2026</h3>
                        <p class="blog-excerpt">Descubre las tecnologias emergentes que estan transformando la industria manufacturera global.</p>
                    </div>
                </article>
                <article class="blog-card reveal reveal-delay-2">
                    <div class="blog-image">
                        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80" alt="Inteligencia Artificial">
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-category">Inteligencia Artificial</span>
                            <span class="blog-date">10 Jul 2026</span>
                        </div>
                        <h3 class="blog-title">Machine Learning en Mantenimiento Predictivo</h3>
                        <p class="blog-excerpt">Como los algoritmos de IA pueden predecir fallas en equipos industriales.</p>
                    </div>
                </article>
                <article class="blog-card reveal reveal-delay-3">
                    <div class="blog-image">
                        <img src="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=600&q=80" alt="Diseno Mecanico">
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-category">Mecanica</span>
                            <span class="blog-date">05 Jul 2026</span>
                        </div>
                        <h3 class="blog-title">Guia de Seleccion de Rodamientos</h3>
                        <p class="blog-excerpt">Criterios tecnicos para seleccionar el rodamiento adecuado segun aplicacion.</p>
                    </div>
                </article>
            </div>
        </div>
    </section>

    <!-- TESTIMONIALS SECTION -->
    <section class="testimonials section-padding" id="testimonios">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">Testimonios</span>
                <h2 class="section-title">Lo que Dicen Nuestros Clientes</h2>
                <p class="section-subtitle">La satisfaccion de nuestros clientes es el mejor reflejo de nuestro compromiso con la excelencia.</p>
            </div>
            <div class="testimonials-slider">
                <div class="testimonials-track" id="testimonialsTrack">
                    <div class="testimonial-card reveal reveal-delay-1">
                        <p class="testimonial-quote">EDIM SOLUCIONES transformo completamente nuestra linea de produccion. La automatizacion implementada aumento nuestra productividad en un 40%.</p>
                        <div class="testimonial-author">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Carlos Mendez" class="testimonial-avatar">
                            <div class="testimonial-info">
                                <div class="testimonial-name">Carlos Mendez</div>
                                <div class="testimonial-role">Director de Operaciones, Metalurgica del Norte</div>
                                <div class="testimonial-rating">
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card reveal reveal-delay-2">
                        <p class="testimonial-quote">El software de gestion desarrollado por EDIM supero todas nuestras expectativas. La integracion con nuestros equipos fue impecable.</p>
                        <div class="testimonial-author">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="Ana Rodriguez" class="testimonial-avatar">
                            <div class="testimonial-info">
                                <div class="testimonial-name">Ana Rodriguez</div>
                                <div class="testimonial-role">Gerente de TI, Industrias Automotrices SA</div>
                                <div class="testimonial-rating">
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card reveal reveal-delay-3">
                        <p class="testimonial-quote">Las herramientas gratuitas de EDIM son invaluables para nuestro departamento de ingenieria. Ahorran horas de calculo manual.</p>
                        <div class="testimonial-author">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" alt="Luis Torres" class="testimonial-avatar">
                            <div class="testimonial-info">
                                <div class="testimonial-name">Luis Torres</div>
                                <div class="testimonial-role">Jefe de Ingenieria, Constructora Moderna</div>
                                <div class="testimonial-rating">
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="testimonials-dots" id="testimonialsDots"></div>
            </div>
        </div>
    </section>

    <!-- STATS SECTION -->
    <section class="stats" id="estadisticas">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-card reveal reveal-delay-1">
                    <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                    <div class="stat-number"><span class="counter" data-target="200">0</span>+</div>
                    <div class="stat-label">Proyectos Realizados</div>
                </div>
                <div class="stat-card reveal reveal-delay-2">
                    <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                    <div class="stat-number"><span class="counter" data-target="50">0</span>+</div>
                    <div class="stat-label">Clientes Atendidos</div>
                </div>
                <div class="stat-card reveal reveal-delay-3">
                    <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
                    <div class="stat-number"><span class="counter" data-target="35">0</span>+</div>
                    <div class="stat-label">Herramientas</div>
                </div>
                <div class="stat-card reveal reveal-delay-4">
                    <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                    <div class="stat-number"><span class="counter" data-target="15">0</span>+</div>
                    <div class="stat-label">Anos de Exp.</div>
                </div>
                <div class="stat-card reveal reveal-delay-5">
                    <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
                    <div class="stat-number"><span class="counter" data-target="25">0</span>+</div>
                    <div class="stat-label">Tecnologias</div>
                </div>
            </div>
        </div>
    </section>

    <!-- CONTACT SECTION -->
    <section class="contact section-padding" id="contacto">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">Contacto</span>
                <h2 class="section-title">Hablemos de su Proyecto</h2>
                <p class="section-subtitle">Estamos listos para convertir sus ideas en soluciones reales. Contactenos y comencemos a trabajar juntos.</p>
            </div>
            <div class="contact-grid">
                <div class="contact-info reveal-left">
                    <h3 class="contact-info-title">Informacion de Contacto</h3>
                    <p class="contact-info-text">Nuestro equipo de especialistas esta disponible para atender sus consultas y brindar asesoria tecnica.</p>
                    <div class="contact-methods">
                        <div class="contact-method">
                            <div class="contact-method-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                            <div><div class="contact-method-title">Telefono</div><div class="contact-method-value">+1 (555) 123-4567</div></div>
                        </div>
                        <div class="contact-method">
                            <div class="contact-method-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                            <div><div class="contact-method-title">Correo</div><div class="contact-method-value">contacto@edimsoluciones.com</div></div>
                        </div>
                        <div class="contact-method">
                            <div class="contact-method-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                            <div><div class="contact-method-title">Direccion</div><div class="contact-method-value">Av. Industrial 1234, Ciudad Tecnologica</div></div>
                        </div>
                        <div class="contact-method">
                            <div class="contact-method-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                            <div><div class="contact-method-title">Horario</div><div class="contact-method-value">Lun - Vie: 8:00 - 18:00</div></div>
                        </div>
                    </div>
                </div>
                <div class="contact-form-wrapper reveal-right">
                    <form id="contactForm" class="contact-form" action="contact.php" method="POST">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label" for="nombre">Nombre Completo</label>
                                <input type="text" id="nombre" name="nombre" class="form-input" placeholder="Su nombre" required>
                                <span class="form-error" id="error-nombre">Por favor ingrese su nombre</span>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="email">Correo Electronico</label>
                                <input type="email" id="email" name="email" class="form-input" placeholder="correo@ejemplo.com" required>
                                <span class="form-error" id="error-email">Ingrese un correo valido</span>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label" for="telefono">Telefono</label>
                                <input type="tel" id="telefono" name="telefono" class="form-input" placeholder="+1 (555) 000-0000">
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="empresa">Empresa</label>
                                <input type="text" id="empresa" name="empresa" class="form-input" placeholder="Nombre de su empresa">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="asunto">Asunto</label>
                            <input type="text" id="asunto" name="asunto" class="form-input" placeholder="Asunto de su mensaje" required>
                            <span class="form-error" id="error-asunto">Por favor ingrese un asunto</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="mensaje">Mensaje</label>
                            <textarea id="mensaje" name="mensaje" class="form-input" placeholder="Describa su proyecto..." required></textarea>
                            <span class="form-error" id="error-mensaje">Por favor ingrese su mensaje</span>
                        </div>
                        <button type="submit" class="btn btn-primary form-submit">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                            Enviar Mensaje
                        </button>
                    </form>
                    <div class="form-success" id="formSuccess">
                        <div class="form-success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                        <h3 style="font-family:var(--font-display);font-size:1.4rem;font-weight:700;margin-bottom:10px;color:var(--text-primary);">Mensaje Enviado</h3>
                        <p style="color:var(--text-muted);">Gracias por contactarnos. Nuestro equipo se pondra en contacto con usted a la brevedad.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <img src="assets/img/logo-edim-png_-_white.png" alt="EDIM SOLUCIONES Logo">
                        <span class="footer-logo-text"><span></span></span>
                    </div>
                    <p class="footer-desc">Soluciones de ingenieria, automatizacion industrial, desarrollo de software e innovacion tecnologica para impulsar el futuro de la industria.</p>
                    <div class="footer-socials">
                        <a href="#" class="footer-social" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
                        <a href="#" class="footer-social" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
                        <a href="#" class="footer-social" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>
                        <a href="#" class="footer-social" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4 class="footer-title">Servicios</h4>
                    <div class="footer-links">
                        <a href="#servicios" class="footer-link">Automatizacion Industrial</a>
                        <a href="#servicios" class="footer-link">Desarrollo de Software</a>
                        <a href="#servicios" class="footer-link">Inteligencia Artificial</a>
                        <a href="#servicios" class="footer-link">Diseno Mecanico</a>
                        <a href="#servicios" class="footer-link">IoT e Industria 4.0</a>
                        <a href="#servicios" class="footer-link">Consultoria Tecnologica</a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4 class="footer-title">Recursos</h4>
                    <div class="footer-links">
                        <a href="#software" class="footer-link">Software Gratuito</a>
                        <a href="#calculadoras" class="footer-link">Calculadoras Tecnicas</a>
                        <a href="#blog" class="footer-link">Blog Tecnico</a>
                        <a href="#" class="footer-link">Documentacion</a>
                        <a href="#" class="footer-link">Manuales</a>
                        <a href="#" class="footer-link">Normas Tecnicas</a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4 class="footer-title">Contacto</h4>
                    <div class="footer-contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>Av. Industrial 1234, Ciudad Tecnologica</span>
                    </div>
                    <div class="footer-contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        <span>contacto@edimsoluciones.com</span>
                    </div>
                    <div class="footer-contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <span>+1 (555) 123-4567</span>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p class="footer-copyright">&copy; 2026 EDIM SOLUCIONES. Todos los derechos reservados.</p>
                <div class="footer-legal">
                    <a href="#">Politica de Privacidad</a>
                    <a href="#">Terminos de Uso</a>
                    <a href="#">Cookies</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
