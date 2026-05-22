    // Estado actual
    let currentDropdown = null;
    let mobileMenuOpen = false;

    // Toggle Dropdown
    function toggleDropdown(dropdown) {
      const panel = document.getElementById('panel-' + dropdown);
      const trigger = document.querySelector('#dropdown-' + dropdown + ' .edu-dropdown__trigger');
      
      // Si es el mismo dropdown, cerrarlo
      if (currentDropdown === dropdown) {
        closeAllDropdowns();
        return;
      }

      // Cerrar cualquier dropdown abierto
      closeAllDropdowns();

      // Abrir el nuevo dropdown
      panel.classList.add('open');
      trigger.classList.add('active');
      currentDropdown = dropdown;
    }

    // Cerrar todos los dropdowns
    function closeAllDropdowns() {
      const panels = document.querySelectorAll('.edu-dropdown__panel');
      const triggers = document.querySelectorAll('.edu-dropdown__trigger');
      
      panels.forEach(panel => panel.classList.remove('open'));
      triggers.forEach(trigger => trigger.classList.remove('active'));
      currentDropdown = null;
    }

    // Toggle Menu Movil
    function toggleMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      const menuIcon = document.getElementById('menu-icon');
      const closeIcon = document.getElementById('close-icon');
      
      mobileMenuOpen = !mobileMenuOpen;
      
      if (mobileMenuOpen) {
        menu.classList.add('open');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
      } else {
        menu.classList.remove('open');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    }

    // Cerrar Menu Movil
    function closeMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      const menuIcon = document.getElementById('menu-icon');
      const closeIcon = document.getElementById('close-icon');
      
      mobileMenuOpen = false;
      menu.classList.remove('open');
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }

    // Cerrar al hacer clic fuera
    // Cerrar al hacer clic fuera
      document.addEventListener('click', function(event) {
        const header = document.getElementById('header');
        
        // Agregamos una excepción: Si el clic es en un botón de "Ver más" o "Ver Unidades", NO cierres nada.
        if (event.target.closest('.btn-stellar-action') || event.target.closest('.btn-primary')) {
          return; // Detiene la ejecución para que el botón pueda funcionar
        }

        if (header && !header.contains(event.target)) {
          closeAllDropdowns();
          closeMobileMenu();
        }
      });

    document.addEventListener('DOMContentLoaded', () => {
    console.log("¡El script se ha cargado correctamente!");

    const btnVerMas = document.getElementById('btnVerMas');
    const serviciosGrid = document.getElementById('serviciosGrid');

    if (btnVerMas && serviciosGrid) {
        console.log("Botón y Grid encontrados con éxito.");
        
        btnVerMas.onclick = function() {
            console.log("Hiciste clic en el botón");
            serviciosGrid.classList.toggle('mostrar-todas');

            if (serviciosGrid.classList.contains('mostrar-todas')) {
                this.textContent = 'Ver menos';
            } else {
                this.textContent = 'Ver más servicios';
            }
        };
    } else {
        console.error("Error: No se encontró el botón o el grid. Revisa los IDs en el HTML.");
    }
});
// ==========================================
// ORGANIGRAMAS - Toggle y Modal
// ==========================================
(function() {
  // Datos de los organigramas
  const organigramas = [
    {
      nombre: 'Organigrama CSC',
      descripcion: 'El organigrama muestra una estructura jerárquica de tipo funcional, liderada por el Director del Centro de Servicios Compartidos. Desde este nivel se articulan las diferentes gerencias de áreas estratégicas y de apoyo, las cuales reportan directamente, permitiendo una gestión centralizada, coordinación eficiente y alineación de los procesos organizacionales.',
      imagen: '/img/Organigrama CSC.jpg'
    },
    {
      nombre: 'Organigrama EYP',
      descripcion: 'Este organigrama muestra la estructura del área de Estrategia y Productividad, con sus coordinaciones y roles organizados por capacidades clave como proyectos, eficiencia, analítica y procesos. En esta estructura es donde nos encontramos adscritos, contribuyendo a la gestión y mejora continua de los procesos.',
      imagen: '/img/Organigrama EYP.jpg'
    }
  ];

  let currentIndex = 0;

  // Elementos del DOM
  const tipoEl = document.getElementById('org-tipo');
  const nombreEl = document.getElementById('org-nombre');
  const descripcionEl = document.getElementById('org-descripcion');
  const contentInner = document.querySelector('.org-content-inner');
  const indicators = document.querySelectorAll('.org-indicator');
  const prevBtn = document.querySelector('.org-arrow-prev');
  const nextBtn = document.querySelector('.org-arrow-next');
  const verBtn = document.getElementById('org-ver-btn');

  // Modal
  const modal = document.getElementById('org-modal');
  const modalOverlay = document.querySelector('.org-modal-overlay');
  const modalClose = document.querySelector('.org-modal-close');
  const modalTitle = document.getElementById('org-modal-title');
  const modalImage = document.getElementById('org-modal-image');

  // Actualizar contenido con animación fade
  function updateContent(index) {
    contentInner.classList.add('fade-out');

    setTimeout(() => {
      currentIndex = index;
      const org = organigramas[currentIndex];

      tipoEl.textContent = `Tipo ${currentIndex + 1} de ${organigramas.length}`;
      nombreEl.textContent = org.nombre;
      descripcionEl.textContent = org.descripcion;

      // Actualizar indicadores
      indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentIndex);
      });

      contentInner.classList.remove('fade-out');
    }, 300);
  }

  // Navegación
  prevBtn.addEventListener('click', () => {
    const newIndex = currentIndex === 0 ? organigramas.length - 1 : currentIndex - 1;
    updateContent(newIndex);
  });

  nextBtn.addEventListener('click', () => {
    const newIndex = currentIndex === organigramas.length - 1 ? 0 : currentIndex + 1;
    updateContent(newIndex);
  });

  // Click en indicadores
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const index = parseInt(indicator.dataset.index);
      if (index !== currentIndex) {
        updateContent(index);
      }
    });
  });

  // Abrir modal
  verBtn.addEventListener('click', () => {
    const org = organigramas[currentIndex];
    modalTitle.textContent = org.nombre;
    modalImage.src = org.imagen;
    modalImage.alt = `Organigrama: ${org.nombre}`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  // Cerrar modal
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Navegación con teclado en la sección
  document.querySelector('.organigramas-section').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });
})();

// ==========================================
// CARRUSEL - Lógica Principal
// ==========================================
(function() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  
  let currentIndex = 0;
  let autoPlayInterval;
  let isTransitioning = false;
  const totalSlides = slides.length;
  const autoPlayDelay = 5000;

  // Actualizar posición del carrusel
  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    // Normalizar índice
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    // Actualizar clases activas
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    currentIndex = index;
    
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');

    // Mover el track
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  // Navegación
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Auto-play
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }

  // Event Listeners - Botones
  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoPlay();
  });

  // Event Listeners - Dots
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      goToSlide(index);
      startAutoPlay();
    });
  });

  // Soporte táctil
  let touchStartX = 0;
  let touchEndX = 0;
  const carousel = document.querySelector('.carousel');

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoPlay();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Pausar en hover
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoPlay();
    }
  });

  // Iniciar auto-play
  startAutoPlay();
})();

// ==========================================
// ANIMACIONES DE SCROLL
// ==========================================
(function() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animar tarjetas con delay escalonado
        if (entry.target.classList.contains('feature-card')) {
          const cards = document.querySelectorAll('.feature-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, index * 150);
          });
        }
      }
    });
  }, observerOptions);

  // Observar elementos
  const textContent = document.querySelector('.text-content');
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const featuresHeader = document.querySelector('.features-header');
  const featureCards = document.querySelectorAll('.feature-card');
  const organigramasTitle = document.querySelector('.organigramas-title');
  const organigramasViewer = document.querySelector('.organigramas-viewer');

  if (textContent) observer.observe(textContent);
  if (carouselWrapper) observer.observe(carouselWrapper);
  if (featuresHeader) observer.observe(featuresHeader);
  featureCards.forEach(card => observer.observe(card));
  if (organigramasTitle) observer.observe(organigramasTitle);
  if (organigramasViewer) observer.observe(organigramasViewer);
})();


// Animación de entrada con IntersectionObserver
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.valor-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    let delay = 0;

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const card = entry.target;
                const cardDelay = card.dataset.delay || 0;
                
                setTimeout(function() {
                    card.classList.add('visible');
                }, cardDelay);
                
                observer.unobserve(card);
            }
        });
    }, observerOptions);

    // Asignar delay escalonado a cada tarjeta
    cards.forEach(function(card, index) {
        card.dataset.delay = index * 120;
        observer.observe(card);
    });
});


// JavaScript for smooth hover transitions on desktop
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('okr-kpi-section');
    const panelOkr = document.querySelector('.panel-okr');
    const panelKpi = document.querySelector('.panel-kpi');
    
    if(!panelOkr || !panelKpi) return;

    // Check if we're on desktop
    function isDesktop() {
        return window.innerWidth > 768;
    }

    // Handle OKR hover
    panelOkr.addEventListener('mouseenter', function() {
        if (isDesktop()) {
            panelOkr.style.flex = '1.5';
            panelKpi.style.flex = '1';
        }
    });

    // Handle KPI hover
    panelKpi.addEventListener('mouseenter', function() {
        if (isDesktop()) {
            panelKpi.style.flex = '1.5';
            panelOkr.style.flex = '1';
        }
    });

    // Reset on mouse leave from container
    container.addEventListener('mouseleave', function() {
        if (isDesktop()) {
            panelOkr.style.flex = '1';
            panelKpi.style.flex = '1';
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (!isDesktop()) {
            panelOkr.style.flex = '';
            panelKpi.style.flex = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const accordionCards = document.querySelectorAll('.accordion-card');

    accordionCards.forEach(function(card) {
        const header = card.querySelector('.accordion-header');

        if(header) {
          header.addEventListener('click', function() {
              const isActive = card.classList.contains('active');

              // Cerrar todas las tarjetas
              accordionCards.forEach(function(otherCard) {
                  otherCard.classList.remove('active');
              });

              // Si la tarjeta clickeada no estaba activa, abrirla
              if (!isActive) {
                  card.classList.add('active');
              }
          });
        }
    });
});

document.querySelectorAll('.btn-toggle').forEach(boton => {
  boton.addEventListener('click', () => {
    const card = boton.parentElement;
    const corto = card.querySelector('.corto');
    const completo = card.querySelector('.completo');

    if(corto && completo) {
      corto.classList.toggle('oculto');
      completo.classList.toggle('oculto');

      boton.textContent = 
        boton.textContent === "Ver más" ? "Ver menos" : "Ver más";
    }
  });
});

// 1. Animación de aparición (Tu código original)
const cardsOriginal = document.querySelectorAll('.cards');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('appear'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
cardsOriginal.forEach(c => obs.observe(c));

// 2. Lógica del Modal
const modalEl = document.getElementById('modalOverlay');
const modalTitleEl = document.getElementById('modal-title');
const modalTextEl = document.getElementById('modal-text');
const closeBtnEl = document.getElementById('closeModal');

if(modalEl && closeBtnEl) {
  document.querySelectorAll('.cb').forEach(button => {
    button.addEventListener('click', () => {
      // Extraemos el título y el texto de los atributos 'data-'
      const title = button.getAttribute('data-title');
      const info = button.getAttribute('data-info');

      // Los ponemos en el modal
      modalTitleEl.innerText = title;
      modalTextEl.innerText = info;

      // Mostramos el modal
      modalEl.style.display = 'flex';
    });
  });

  // Cerrar modal
  closeBtnEl.addEventListener('click', () => { modalEl.style.display = 'none'; });
  window.addEventListener('click', (e) => { if(e.target == modalEl) modalEl.style.display = 'none'; });
}


// Datos de Unidades y Procesos
const unidadesData = {
  "Bienestar y Desarrollo Social": {
    icon: "🏠",
    procesos: [
      "Alimentos", "Convenios", "Fondos de Ley", "Recreación y Deporte",
      "Vivienda", "Eventos", "Admon Bienestar", "Educación",
      "Empleo y Fomento Empresarial", "Alojamiento"
    ]
  },
  "Centro de Servicios Compartidos": {
    icon: "🔄",
    procesos: [
      "Otros Compensar", "Proyectos Corporativos", "Gestionar la Estrategia y Productividad del CSC",
      "Gestionar Información Empresarial", "Finanzas", "Gestionar la Plataforma Social de Bienestar Integral",
      "Compras y Abastecimiento", "Innovación", "Infraestructura y Servicios Administrativos",
      "Seguridad Integral", "Operación SAP", "Administración Unidad CSC", "Servicios Jurídicos"
    ]
  },
  "Corporativo": {
    icon: "🏢",
    procesos: [
      "Proyectos de Tecnología", "Tecnología de Información", "Planeación y Control Corporativo",
      "Asuntos Corporativos", "Canales de Atención", "Talento Humano", "Transversales Talento Humano",
      "Proyectos de Infraestructura", "Acompañamiento con el Cliente", "Conocimiento del Cliente",
      "Centro de Experiencia", "Saldo para Obras", "Administración Cliente", "Aportes y Apropiaciones",
      "Afiliación Corporativa", "Gestionar el Riesgo Corporativo", "Gestionar Auditorías Corporativas"
    ]
  },
  "Financiamiento y Alianzas": {
    icon: "💰",
    procesos: [
      "Crédito Social", "Estrategia Empresarial", "Admon Financiamiento",
      "Medios de Pago", "Operador", "Convenios y Alianzas"
    ]
  },
  "Otros Programas Sociales": {
    icon: "🤝",
    procesos: [
      "Educación Empresarial", "Contrato Prestación Servicios", "Plataforma de Bienestar"
    ]
  },
  "Salud": {
    icon: "🏥",
    procesos: [
      "Prestación Salud", "Aseguramiento Salud", "Planes Voluntarios de Salud",
      "Estrategia Empresarial", "Admon Unidad Salud", "Convenios Salud"
    ]
  }
};

// Referencias DOM
const unitsList = document.getElementById('unitsList');
const processesGrid = document.getElementById('processesGrid');
const processesTitle = document.getElementById('processesTitle');
const processesSubtitle = document.getElementById('processesSubtitle');

// Renderizar menú de unidades
function renderUnitsMenu() {
  if(!unitsList) return;
  const unidades = Object.keys(unidadesData);
  
  unitsList.innerHTML = unidades.map((unidad, index) => `
    <div class="unit-item" data-unit="${unidad}" tabindex="0">
      <div class="unit-icon">${unidadesData[unidad].icon}</div>
      <span class="unit-name">${unidad}</span>
      <span class="unit-count">${unidadesData[unidad].procesos.length}</span>
    </div>
  `).join('');

  // Agregar event listeners
  document.querySelectorAll('.unit-item').forEach(item => {
    item.addEventListener('click', () => selectUnit(item.dataset.unit));
    item.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') selectUnit(item.dataset.unit);
    });
  });
}

// Seleccionar unidad y mostrar procesos
function selectUnit(unidadName) {
  // Actualizar estado activo en el menú
  document.querySelectorAll('.unit-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.unit === unidadName) {
      item.classList.add('active');
    }
  });

  if(processesTitle && processesSubtitle) {
    // Actualizar título
    processesTitle.textContent = unidadName;
    processesSubtitle.textContent = `${unidadesData[unidadName].procesos.length} procesos disponibles`;
  }

  // Renderizar procesos con animación staggered
  renderProcesses(unidadesData[unidadName].procesos);
}

// Renderizar procesos con animación staggered
function renderProcesses(procesos) {
  if(!processesGrid) return;
  processesGrid.innerHTML = '';
  
  procesos.forEach((proceso, index) => {
    const chip = document.createElement('div');
    chip.className = 'process-chip';
    chip.textContent = proceso;
    chip.style.animationDelay = `${index * 50}ms`;
    processesGrid.appendChild(chip);
  });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  renderUnitsMenu();
  if(Object.keys(unidadesData).length > 0 && unitsList){
    // Seleccionar primera unidad por defecto
    const primeraUnidad = Object.keys(unidadesData)[0];
    selectUnit(primeraUnidad);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("btnVerMasOKR");
  const contenido = document.getElementById("contenidoExtraOKR");

  if (!boton || !contenido) return; // evita errores

  boton.addEventListener("click", function () {
    if (contenido.style.display === "none" || contenido.style.display === "") {
      contenido.style.display = "block";
      boton.textContent = "Ver menos";
    } else {
      contenido.style.display = "none";
      boton.textContent = "Conoce los OKR";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("btnVerMasKPI");
  const contenido = document.getElementById("contenidoExtraKPI");

  if (!boton || !contenido) return; // evita errores

  boton.addEventListener("click", function () {
    if (contenido.style.display === "none" || contenido.style.display === "") {
      contenido.style.display = "block";
      boton.textContent = "Ver menos";
    } else {
      contenido.style.display = "none";
      boton.textContent = "Conoce los KPI";
    }
  });
});


(function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const kpiCards = document.querySelectorAll('.kpi-card');

  if(filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.dataset.filter;

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter cards
        kpiCards.forEach(card => {
          const category = card.dataset.category;

          if (filter === 'todos' || category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }
})();


(function() {
  // Configuration
  const CONFIG = {
    isMobile: window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window,
    revealDelay: 150, // ms between each line reveal
  };

  // Elements
  const glowOrb = document.getElementById('glowOrb');
  const razonSection = document.getElementById('razonSection');
  const sectionTitle = document.getElementById('sectionTitle');
  const mainTextContainer = document.getElementById('mainText');
  const signature = document.getElementById('signature');
  
  if(!glowOrb || !razonSection || !mainTextContainer) return;

  // The main text content with accent markers
  const textContent = `Desde hace <span class="accent">47 años</span> trabajamos por y para el <span class="accent">bienestar integral</span> de los colombianos.Mediante un modelo de plataforma de soluciones de bienestar integral, que nos permite integrar nuestros servicios en pro de la calidad de vida de los trabajadores, las familias y la comunidad. Aportamos a la construcción de <span class="accent">tejido social</span> de nuestro país, siempre conscientes de las nuevas necesidades de nuestros usuarios y estando a la <span class="accent">vanguardia</span> de las tendencias en materia de bienestar y calidad de vida.`;

  // Split text into sentences for line-by-line reveal
  function splitIntoLines(text) {
    // Split by periods while keeping the period
    const sentences = text.split(/(?<=\.)\s+/);
    return sentences.filter(s => s.trim().length > 0);
  }

  // Create text lines in DOM
  function createTextLines() {
    const lines = splitIntoLines(textContent);
    lines.forEach((line, index) => {
      const span = document.createElement('span');
      span.className = 'text-line';
      span.innerHTML = line + ' ';
      span.style.transitionDelay = `${index * CONFIG.revealDelay}ms`;
      mainTextContainer.appendChild(span);
    });
  }

  // Initialize text
  createTextLines();

  // Magnetic Glow - Mouse Following (Desktop only)
  if (!CONFIG.isMobile) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let orbX = mouseX;
    let orbY = mouseY;

    // Set initial position
    glowOrb.style.left = `${orbX}px`;
    glowOrb.style.top = `${orbY}px`;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth animation loop
    function animateOrb() {
      // Ease towards mouse position
      orbX += (mouseX - orbX) * 0.08;
      orbY += (mouseY - orbY) * 0.08;

      glowOrb.style.left = `${orbX}px`;
      glowOrb.style.top = `${orbY}px`;

      requestAnimationFrame(animateOrb);
    }

    animateOrb();
  } else {
    // Mobile: Static centered orb
    glowOrb.classList.add('static');
  }

  // Intersection Observer for Reveal Animation
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  let hasRevealed = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRevealed) {
        hasRevealed = true;
        
        // Reveal title first
        if(sectionTitle) sectionTitle.classList.add('revealed');

        // Then reveal text lines with cascade effect
        const textLines = mainTextContainer.querySelectorAll('.text-line');
        textLines.forEach((line, index) => {
          setTimeout(() => {
            line.classList.add('revealed');
          }, 300 + (index * CONFIG.revealDelay));
        });

        // Finally reveal signature
        if(signature) {
          setTimeout(() => {
            signature.classList.add('revealed');
          }, 300 + (textLines.length * CONFIG.revealDelay) + 200);
        }
      }
    });
  }, observerOptions);

  observer.observe(razonSection);

  // Handle window resize for mobile detection
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const wasMobile = CONFIG.isMobile;
      CONFIG.isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
      
      if (CONFIG.isMobile && !wasMobile) {
        glowOrb.classList.add('static');
      } else if (!CONFIG.isMobile && wasMobile) {
        glowOrb.classList.remove('static');
      }
    }, 250);
  });
})();

// IntersectionObserver para animaciones de entrada con efecto cascada
const mainObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Si es el header o el CTA, animar inmediatamente
            if (element.classList.contains('section-header') ||
                element.classList.contains('cta-container')) {
                element.classList.add('visible');
            }
            
            // Si es un item del acordeón, aplicar delay según índice
            if (element.classList.contains('accordion-item')) {
                const index = parseInt(element.dataset.index) || 0;
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 150); // 150ms de delay entre cada item
            }
            
            observer.unobserve(element);
        }
    });
};

const mainObserver = new IntersectionObserver(animateOnScroll, mainObserverOptions);

// Observar elementos
document.querySelector('.section-header') && mainObserver.observe(document.querySelector('.section-header'));
document.querySelectorAll('.accordion-item').forEach(item => mainObserver.observe(item));
document.querySelector('.cta-container') && mainObserver.observe(document.querySelector('.cta-container'));

// Funcionalidad del acordeón
const mainAccordionItems = document.querySelectorAll('.accordion-item');
mainAccordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if(header){
      header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Cerrar todos los items
          mainAccordionItems.forEach(otherItem => {
              otherItem.classList.remove('active');
          });
          
          // Si no estaba activo, abrir el clickeado
          if (!isActive) {
              item.classList.add('active');
          }
      });
    }
});

// Prevenir que el hover del botón interfiera con el click
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        // Descomenta si necesitas prevenir comportamiento
        // e.preventDefault();
        console.log('Ver Portafolio clicked');
    });
}

/* ==========================================
   SCRIPTS: FOCOS DE ESTRATEGIA
   ========================================== */
(() => {
  const focoData = [
    {
      id: 1,
      number: "FOCO 01",
      title: "Simplificación de procesos para multiplicar Bienestar.",
      icon: "⚙️",
      items: [
        "Consolidar al CSC como el aliado estratégico de las Unidades de Negocio, garantizando la excelencia operativa y la sinergia entre procesos internos.",
        "Asegurar el cumplimiento de resultados clave y la mejora continua de la productividad en cada área del CSC",
        "Optimizar el desempeño financiero del CSC logrando eficiencias sostenibles que impacten los ingresos y el remanente de la organización."
      ]
    },
    {
      id: 2,
      number: "FOCO 02",
      title: "Tecnología con propósito, resultados con impacto humano.",
      icon: "💻",
      items: [
        "Impulsar la transformación digital del CSC y el cumplimiento de los retos estratégicos de cada proceso, generando eficiencia, calidad e innovación",
        "Avanzar en la madurez digital de las cadenas de valor que impactan las unidades de negocio",
        "Generar modelos Analíticos de valor consolidando la información clave de los procesos del CSC"
      ]
    },
    {
      id: 3,
      number: "FOCO 03",
      title: "Eficiencia que transforma vidas",
      icon: "🚀",
      items: [
        "Rediseño de capacidades para responder con agilidad a las necesidades del negocio.",
        "Trabajo colaborativo entre CSC y áreas corporativas.",
        "Equipos flexibles orientados a resultados, productividad e innovación."
      ]
    }
  ];

  function focoRenderCards() {
    const container = document.getElementById('focoCardsContainer');
    if (!container) return;
    
    focoData.forEach((foco, index) => {
      const card = document.createElement('div');
      card.className = `foco-card foco-card-${foco.id}`;
      card.dataset.foco = foco.id;
      card.style.transitionDelay = `${0.8 + index * 0.2}s`;
      
      card.innerHTML = `
        <div class="foco-card-header">
          <div class="foco-icon">${foco.icon}</div>
          <div class="foco-title-wrapper">
            <div class="foco-number">${foco.number}</div>
            <h3 class="foco-title">${foco.title}</h3>
          </div>
        </div>
        <ul class="foco-list">
          ${foco.items.map(item => `
            <li>
              <span class="foco-bullet"></span>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>
      `;
      container.appendChild(card);
    });
  }

  function focoInitAnimations() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          focoAnimateSection();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const target = document.querySelector('.foco-main-content');
    if (target) observer.observe(target);
  }

  function focoAnimateSection() {
    const topHeader = document.querySelector('.foco-header');
    if (topHeader) topHeader.classList.add('visible');
    
    setTimeout(() => {
      const titleBanner = document.querySelector('.foco-title-banner');
      if (titleBanner) titleBanner.classList.add('visible');
    }, 200);

    setTimeout(() => {
      const centralCircle = document.querySelector('.foco-central-circle');
      if (centralCircle) centralCircle.classList.add('visible');
    }, 400);

    const segments = document.querySelectorAll('.foco-segment');
    segments.forEach((segment, index) => {
      setTimeout(() => {
        segment.classList.add('visible');
      }, 600 + index * 200);
    });

    setTimeout(() => {
      document.querySelectorAll('.foco-flow-arrow').forEach(arrow => {
        arrow.classList.add('visible');
      });
    }, 1200);

    const cards = document.querySelectorAll('.foco-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, 800 + index * 200);
    });
  }

  function focoInitInteractions() {
    const segments = document.querySelectorAll('.foco-segment');
    const cards = document.querySelectorAll('.foco-card');

    segments.forEach(segment => {
      segment.addEventListener('mouseenter', () => {
        const focoId = segment.dataset.foco;
        
        cards.forEach(card => {
          if (card.dataset.foco === focoId) {
            card.classList.add('highlight');
          } else {
            card.style.opacity = '0.5';
          }
        });
        segment.classList.add('active');
      });

      segment.addEventListener('mouseleave', () => {
        cards.forEach(card => {
          card.classList.remove('highlight');
          card.style.opacity = '1';
        });
        segment.classList.remove('active');
      });

      segment.addEventListener('click', () => {
        const focoId = segment.dataset.foco;
        const card = document.querySelector(`.foco-card[data-foco="${focoId}"]`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('highlight');
          setTimeout(() => card.classList.remove('highlight'), 2000);
        }
      });
    });

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const focoId = card.dataset.foco;
        const segment = document.querySelector(`.foco-segment[data-foco="${focoId}"]`);
        if (segment) {
          segment.classList.add('active');
        }
      });

      card.addEventListener('mouseleave', () => {
        const focoId = card.dataset.foco;
        const segment = document.querySelector(`.foco-segment[data-foco="${focoId}"]`);
        if (segment) {
          segment.classList.remove('active');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    focoRenderCards();
    focoInitAnimations();
    focoInitInteractions();

    setTimeout(() => {
      focoAnimateSection();
    }, 100);
  });
})();

/* ==========================================
   SCRIPTS: PROYECTOS Y DOCS (AISLADA) - VERSIÓN CORREGIDA
   ========================================== */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.proj-card');
    const exploreBtn = document.getElementById('projExploreBtn');

    if (!cards.length) return;

    // Animación al scroll
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('proj-revealed');
          }, index * 200);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cards.forEach(function(card) {
      observer.observe(card);
    });

    // Lógica del botón de descarga corregida
    if (exploreBtn) {
      exploreBtn.addEventListener('click', function(e) {
        // Pausar el click normal para ver la animación
        e.preventDefault();

        // Efecto visual al hacer clic
        this.style.transform = 'scale(0.95)';

        // Leemos la ruta y el nombre del HTML directamente
        const urlDescarga = this.getAttribute('href');
        const nombreArchivo = this.getAttribute('download');

        setTimeout(() => {
          this.style.transform = ''; // Regresa al tamaño

          // Genera el clic invisible para forzar la descarga sin salir de la página
          const linkTemporal = document.createElement('a');
          linkTemporal.href = urlDescarga;
          
          if (nombreArchivo !== null) {
            linkTemporal.download = nombreArchivo;
          }
          
          document.body.appendChild(linkTemporal);
          linkTemporal.click();
          document.body.removeChild(linkTemporal);

        }, 150);
      });
    }
  });
})();

/* ==========================================
   SCRIPTS: METODOLOGÍA (AISLADA)
   ========================================== */
(function() {
  'use strict';

  const metoProgress = document.getElementById('metoTimelineProgress');
  const metoCards = document.querySelectorAll('.meto-timeline-card');
  const metoContainer = document.querySelector('.meto-timeline-container');
  if (!metoContainer || !metoProgress) return;

  let hasAnimated = false;
  const staggerDelays = [0, 200, 400, 600, 800];

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        metoProgress.classList.add('animate');
        metoCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, staggerDelays[index] + 200);
        });
      }
    });
  }, observerOptions);

  timelineObserver.observe(metoContainer);

  if (window.matchMedia('(min-width: 901px)').matches) {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / 50;
      const moveY = (clientY - centerY) / 50;
      metoCards.forEach((card, index) => {
        const factor = (index + 1) * 0.15;
        card.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    });
  }

  metoCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.querySelector('.meto-card-body').click();
      }
    });

    card.addEventListener('focus', () => {
      card.querySelector('.meto-card-body').style.outline = '3px solid #5d60a6';
      card.querySelector('.meto-card-body').style.outlineOffset = '3px';
    });

    card.addEventListener('blur', () => {
      card.querySelector('.meto-card-body').style.outline = 'none';
    });
  });
})();

/* ==========================================

   LÓGICA: SECCIÓN DESCRIPCIÓN EYP

   ========================================== */

(function() {

  'use strict';
 
  // 1. Efecto Máquina de Escribir

  const fullText = "Somos el equipo responsable de dinamizar la eficiencia del Centro de Servicios Compartidos mediante la gestión estratégica del portafolio, la transformación de procesos, el aseguramiento de la sostenibilidad operativa y mucho más. Nuestra gestión asegura que la operación se mantenga a la vanguardia tecnológica y operativa, rediseñando capacidades para responder con agilidad a los retos del negocio y garantizando la sostenibilidad financiera de cada solución. ¡Somos el motor de mejora continua que convierte la estrategia en resultados medibles de productividad y eficiencia!";
 
  const typingElement = document.getElementById('desc-eyp-text-id');

  const cursorElement = document.getElementById('desc-eyp-cursor-id');
 
  let charIndex = 0;

  const typingSpeed = 18; // Milisegundos por caracter

  const startDelay = 800; // Retraso antes de empezar
 
  function typeText() {

    if (!typingElement || !cursorElement) return; // Validación de seguridad
 
    if (charIndex < fullText.length) {

      typingElement.textContent += fullText.charAt(charIndex);

      charIndex++;

      setTimeout(typeText, typingSpeed);

    } else {

      // Ocultar cursor al terminar

      setTimeout(function() {

        cursorElement.style.display = 'none';

      }, 1500);

    }

  }
 
  // Iniciar efecto después del retraso

  setTimeout(typeText, startDelay);
 
  // 2. Evento del Botón CTA

  const ctaButton = document.getElementById('desc-eyp-cta-id');

  if (ctaButton) {

    ctaButton.addEventListener('click', function() {

      // Reemplaza esta URL por la que necesites

      window.open('https://ejemplo.com/resultados-estrategicos', '_blank', 'noopener,noreferrer');

    });

  }
 
  // 3. Intersection Observer (Animaciones al hacer scroll)

  const card = document.querySelector('.desc-eyp-card');

  if (card && 'IntersectionObserver' in window) {

    const observerOptions = {

      threshold: 0.2,

      rootMargin: '0px'

    };
 
    const observer = new IntersectionObserver(function(entries) {

      entries.forEach(function(entry) {

        if (entry.isIntersecting) {

          entry.target.style.opacity = '1';

          // Opcional: podrías desencadenar la máquina de escribir aquí en vez del setTimeout

        }

      });

    }, observerOptions);
 
    observer.observe(card);

  }

})();
 
const services = [
  {
    id: 1,
    icon: "🎨",
    title: "Diseño Web",
    description: "Creamos sitios web modernos, atractivos y completamente responsivos que reflejan la identidad de tu marca. Nuestro equipo de diseñadores trabaja contigo para crear experiencias visuales únicas que cautivan a tus visitantes desde el primer momento.",
    requirements: "Logotipo en alta resolución, paleta de colores corporativos, contenido textual y fotografías del negocio.",
    benefits: [
      "Diseño 100% personalizado y único",
      "Optimizado para todos los dispositivos",
      "Integración con redes sociales",
      "Panel de administración intuitivo",
      "Soporte técnico por 6 meses"
    ],
    link: "https://ejemplo.com/diseno-web"
  },
  {
    id: 2,
    icon: "📈",
    title: "Marketing Digital",
    description: "Impulsa tu presencia online con estrategias de marketing digital efectivas. Desde SEO y SEM hasta gestión de redes sociales y email marketing, te ayudamos a alcanzar a tu audiencia ideal y convertir visitantes en clientes fieles.",
    requirements: "Acceso a cuentas de redes sociales, definición de público objetivo, presupuesto mensual para campañas publicitarias.",
    benefits: [
      "Estrategia personalizada para tu negocio",
      "Gestión completa de redes sociales",
      "Campañas de publicidad optimizadas",
      "Reportes mensuales detallados",
      "Incremento medible en conversiones"
    ],
    link: "https://ejemplo.com/marketing-digital"
  },
  {
    id: 3,
    icon: "📱",
    title: "Desarrollo de Apps",
    description: "Transformamos tus ideas en aplicaciones móviles funcionales y atractivas para iOS y Android. Utilizamos las últimas tecnologías para crear apps rápidas, seguras y fáciles de usar que conectan con tus usuarios.",
    requirements: "Documento de especificaciones funcionales, wireframes o bocetos básicos, APIs disponibles para integración.",
    benefits: [
      "Apps nativas para iOS y Android",
      "Interfaz de usuario intuitiva",
      "Integración con servicios externos",
      "Publicación en App Store y Play Store",
      "Mantenimiento y actualizaciones"
    ],
    link: "https://ejemplo.com/desarrollo-apps"
  },
  {
    id: 4,
    icon: "💼",
    title: "Consultoría IT",
    description: "Asesoramiento experto para optimizar tu infraestructura tecnológica y procesos digitales. Analizamos tu situación actual, identificamos oportunidades de mejora y te guiamos en la implementación de soluciones tecnológicas efectivas.",
    requirements: "Información sobre sistemas actuales, objetivos de negocio a corto y largo plazo, disponibilidad para reuniones de diagnóstico.",
    benefits: [
      "Diagnóstico completo de tu infraestructura",
      "Plan de transformación digital",
      "Reducción de costos operativos",
      "Mayor eficiencia en procesos",
      "Acompañamiento en la implementación"
    ],
    link: "https://ejemplo.com/consultoria-it"
  }
];

// Elementos del DOM
const cardsGrid = document.getElementById('cardsGrid');
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalBenefits = document.getElementById('modalBenefits');
const modalButton = document.getElementById('modalButton');

// Generar tarjetas
function renderCards() {
  cardsGrid.innerHTML = services.map(service => `
    <article class="card" data-service-id="${service.id}">
      <div class="card-icon">${service.icon}</div>
      <h2 class="card-title">${service.title}</h2>
      <p class="card-description">${service.description}</p>
      <div class="card-requirements">
        <p class="card-requirements-title">Requerimientos</p>
        <p class="card-requirements-text">${service.requirements}</p>
      </div>
    </article>
  `).join('');

  // Agregar event listeners a las tarjetas
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const serviceId = parseInt(card.dataset.serviceId);
      const service = services.find(s => s.id === serviceId);
      if (service) {
        openModal(service);
      }
    });
  });
}

// Abrir modal
function openModal(service) {
  modalIcon.textContent = service.icon;
  modalTitle.textContent = service.title;
  modalDescription.textContent = service.description;
  modalButton.href = service.link;

  // Generar lista de beneficios con iconos de check
  modalBenefits.innerHTML = service.benefits.map(benefit => `
    <li>
      <span class="benefit-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
      <span>${benefit}</span>
    </li>
  `).join('');

  // Mostrar modal
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Event listeners para cerrar modal
modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});


// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INTERSECTION OBSERVER PARA ANIMACIONES FADE-IN =====
    const cards = document.querySelectorAll('.servicioseyp-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Añadir un pequeño delay escalonado para cada tarjeta
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                // Dejar de observar una vez que la tarjeta es visible
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // ===== FUNCIONALIDAD DEL MODAL =====
    const btnBenefits = document.querySelectorAll('.servicioseyp-btn-benefits');
    const modalOverlays = document.querySelectorAll('.servicioseyp-modal-overlay');
    const modalCloseButtons = document.querySelectorAll('.servicioseyp-modal-close');
    
    // Abrir modal al hacer clic en "Ver Beneficios"
    btnBenefits.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Evitar scroll del body
            }
        });
    });
    
    // Cerrar modal con el botón X
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.servicioseyp-modal-overlay');
            closeModal(modal);
        });
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.servicioseyp-modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
    
    // Función para cerrar el modal
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll del body
    }
});


// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INTERSECTION OBSERVER PARA ANIMACIONES FADE-IN =====
    const cards = document.querySelectorAll('.seyp-service-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Añadir un pequeño delay escalonado para cada tarjeta
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                // Dejar de observar una vez que la tarjeta es visible
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // ===== FUNCIONALIDAD DEL MODAL =====
    const btnBenefits = document.querySelectorAll('.seyp-btn-benefits');
    const modalOverlays = document.querySelectorAll('.seyp-modal-overlay');
    const modalCloseButtons = document.querySelectorAll('.seyp-modal-close');
    
    // Abrir modal al hacer clic en "Ver Beneficios"
    btnBenefits.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Evitar scroll del body
            }
        });
    });
    
    // Cerrar modal con el botón X
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.seyp-modal-overlay');
            closeModal(modal);
        });
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.seyp-modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
    
    // Función para cerrar el modal
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll del body
    }
});

document.querySelectorAll('.seyp-service-card').forEach(card => {
    card.style.opacity = '1';
});




document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("btncscver");
  const contenido = document.getElementById("contenidocsc");

  if (!boton || !contenido) return; // evita errores

  boton.addEventListener("click", function () {
    if (contenido.style.display === "none" || contenido.style.display === "") {
      contenido.style.display = "block";
      boton.textContent = "Ver menos";
    } else {
      contenido.style.display = "none";
      boton.textContent = "Ver más";
    }
  });
});


// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('[v0] Script cargado correctamente');
    
    // Seleccionar todos los botones "Ver más"
    const buttons = document.querySelectorAll('.btn-ver-mas');
    console.log('[v0] Botones encontrados:', buttons.length);

    // Agregar evento click a cada botón
    buttons.forEach(function(button, index) {
        console.log('[v0] Agregando listener al botón', index);
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('[v0] Click en botón', index);
            
            // Obtener la card padre
            const card = this.closest('.card');
            console.log('[v0] Card encontrada:', card);
            
            // Obtener el contenido desplegable de esta card
            const content = card.querySelector('.card-content');
            console.log('[v0] Content encontrado:', content);
            
            // Toggle de la clase 'show' para mostrar/ocultar
            content.classList.toggle('show');
            
            // Toggle de la clase 'active' en el botón
            this.classList.toggle('active');
            
            // Cambiar el texto del botón
            if (content.classList.contains('show')) {
                this.textContent = 'Ver menos';
                console.log('[v0] Mostrando contenido');
            } else {
                this.textContent = 'Ver más';
                console.log('[v0] Ocultando contenido');
            }
        });
    });

    // Agregar efecto de entrada animada a las cards al cargar
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(function(card, index) {
        // Establecer estado inicial
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Animar entrada con delay escalonado
        setTimeout(function() {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 150 * index);
    });
});


// Seleccionamos los elementos usando las clases únicas
const nebulaSwitch = document.getElementById('toggle-modal-horizon');
const voidOverlay = document.querySelector('.overlay-void-layer');

// 1. Cerrar el modal al presionar la tecla "Escape"
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nebulaSwitch.checked) {
        nebulaSwitch.checked = false;
    }
});

// 2. Cerrar si el usuario hace clic en el área oscura (fuera de la imagen)
voidOverlay.addEventListener('click', (event) => {
    // Si el clic es en el fondo y no en la imagen/contenido
    if (event.target === voidOverlay) {
        nebulaSwitch.checked = false;
    }
});


function controlarModalLista(abrir) {
    const modal = document.getElementById('capaListaCSC');
    if (abrir) {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}


/* =====================================================
   CSC CORE SYSTEM - INDUSTRIAL OVERHAUL
   ===================================================== */

const CSC_CONFIG = {
    services: {
        rrhh: {
            title: 'HUMAN CAPITAL',
            subtitle: 'Talent & Culture Management',
            icon: 'fa-users',
            color: '#ffffff',
            desc: 'Gestión integral del capital humano mediante protocolos de optimización organizacional y desarrollo de carrera.',
            items: ['Nómina/Compensación', 'Reclutamiento IT', 'Capacitación', 'Evaluación', 'Beneficios', 'Clima'],
            meta: { time: '24-48H', mail: 'rrhh@csc.com', tel: '+1 234 567 001' }
        },
        finanzas: {
            title: 'FINANCIAL CORE',
            subtitle: 'Strategic Asset Control',
            icon: 'fa-chart-line',
            color: '#ffffff',
            desc: 'Sistemas de contabilidad analítica y control presupuestario diseñados para la máxima eficiencia del recurso económico.',
            items: ['Contabilidad Gral', 'Análisis Fiscal', 'Presupuestos', 'Cuentas x Pagar', 'Cuentas x Cobrar', 'Auditoría'],
            meta: { time: '12-24H', mail: 'finanzas@csc.com', tel: '+1 234 567 002' }
        },
        tecnologia: {
            title: 'TECH INFRA',
            subtitle: 'Digital Architecture & Ops',
            icon: 'fa-laptop-code',
            color: '#ffffff',
            desc: 'Despliegue de infraestructura crítica y soluciones de software escalables con monitoreo activo 24/7.',
            items: ['Soporte Nivel 3', 'DevOps Ops', 'Cyber-Security', 'Cloud Systems', 'Automation', 'Architecture'],
            meta: { time: '01-04H', mail: 'tech@csc.com', tel: '+1 234 567 003' }
        },
        logistica: {
            title: 'SUPPLY CHAIN',
            subtitle: 'Operational Flow Control',
            icon: 'fa-truck-fast',
            color: '#ffffff',
            desc: 'Optimización de flujos de suministro y gestión de inventarios mediante protocolos de trazabilidad avanzada.',
            items: ['Inventarios', 'Distribución', 'Adquisiciones', 'Almacén', 'Flota/Transporte', 'Tracking'],
            meta: { time: '24-72H', mail: 'logistics@csc.com', tel: '+1 234 567 004' }
        }
    }
};

const CSC_MODULE = (() => {
    // Cache de elementos (Clases originales preservadas)
    const ui = {
        overlay: document.getElementById('cscModalOverlay'),
        title: document.getElementById('cscModalTitle'),
        subtitle: document.getElementById('cscModalSubtitle'),
        icon: document.getElementById('cscModalIcon'),
        desc: document.getElementById('cscModalDescription'),
        list: document.getElementById('cscModalServices'),
        time: document.getElementById('cscModalTime'),
        email: document.getElementById('cscModalEmail'),
        phone: document.getElementById('cscModalPhone'),
        submit: document.getElementById('cscModalSubmit')
    };

    let activeKey = null;

    const updateUI = (key) => {
        const data = CSC_CONFIG.services[key];
        if (!data) return;

        activeKey = key;
        ui.title.innerText = `[ ${data.title} ]`;
        ui.subtitle.innerText = `// ${data.subtitle}`;
        ui.desc.innerText = data.desc;
        ui.icon.innerHTML = `<i class="fas ${data.icon}"></i>`;
        
        // Estilo industrial al icono
        ui.icon.style.background = '#000';
        ui.icon.style.border = '2px double #fff';
        ui.icon.style.color = '#fff';

        // Lista de servicios
        ui.list.innerHTML = data.items.map(item => `
            <div class="csc-service-item" style="border-left: 3px solid #fff; margin-bottom: 5px; padding-left: 10px;">
                <i class="fas fa-terminal" style="font-size: 0.7rem;"></i>
                <span style="font-family: monospace;">${item.toUpperCase()}</span>
            </div>
        `).join('');

        ui.time.innerText = data.meta.time;
        ui.email.innerText = data.meta.email;
        ui.phone.innerText = data.meta.tel;

        ui.overlay.classList.add('csc-modal-active');
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        ui.overlay.classList.remove('csc-modal-active');
        document.body.style.overflow = '';
    };

    const init = () => {
        // Listeners en tarjetas y botones (Preservando lógica data-card/data-modal)
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.csc-card, .csc-card-button');
            if (trigger) {
                const key = trigger.dataset.card || trigger.dataset.modal;
                if (key) updateUI(key);
            }

            if (e.target.closest('#cscModalClose, #cscModalCancel') || e.target === ui.overlay) {
                close();
            }
        });

        // Simulación de envío con feedback industrial
        ui.submit.addEventListener('click', async function() {
            const originalText = this.innerHTML;
            this.disabled = true;
            this.innerHTML = `<i class="fas fa-sync fa-spin"></i> SYNCING...`;

            await new Promise(r => setTimeout(r, 1500));

            this.innerHTML = `<i class="fas fa-check"></i> SUCCESS`;
            this.style.background = '#fff';
            this.style.color = '#000';

            setTimeout(() => {
                close();
                this.disabled = false;
                this.innerHTML = originalText;
                this.style.background = '';
                this.style.color = '';
            }, 800);
        });

        // Escape Key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        });

        console.log("industrial_module_v3_loaded");
    };

    return { init };
})();

document.addEventListener('DOMContentLoaded', CSC_MODULE.init);

// Dentro de tu función cscOpenModal:
const cscModalServices = document.getElementById('cscModalServices');

// Usamos la CLASE EXACTA que ya definiste en tu CSS
cscModalServices.innerHTML = service.services.map(item => `
    <div class="csc-service-item">
        <i class="fas fa-check-circle"></i> 
        <span>${item}</span>
    </div>
`).join('');


document.addEventListener('DOMContentLoaded', () => {
    const btnVerMas = document.getElementById('btnVerMas');
    const serviciosGrid = document.getElementById('serviciosGrid');

    if (btnVerMas && serviciosGrid) {
        btnVerMas.addEventListener('click', () => {
            // Alterna la clase que creaste en el CSS
            serviciosGrid.classList.toggle('mostrar-todas');

            // Cambia el texto del botón según el estado
            if (serviciosGrid.classList.contains('mostrar-todas')) {
                btnVerMas.textContent = 'Ver menos';
            } else {
                btnVerMas.textContent = 'Ver más servicios';
                
                // Opcional: Desplazar la vista hacia arriba al cerrar para no perderse
                serviciosGrid.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

const btn = document.getElementById('btnVerMas');
const grid = document.getElementById('serviciosGrid');

btn.addEventListener('click', () => {
    console.log("Botón presionado"); // Si esto sale en la consola (F12), el JS funciona.
    grid.classList.toggle('mostrar-todas');
});



document.addEventListener('DOMContentLoaded', () => {
    const tarjetas = document.querySelectorAll('.tarjeta');

    tarjetas.forEach((tarjeta, index) => {
        // Delay escalonado para la animación de entrada
        tarjeta.style.animationDelay = `${index * 0.1}s`;

        tarjeta.addEventListener('mousemove', (e) => {
            const rect = tarjeta.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            tarjeta.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        tarjeta.addEventListener('mouseleave', () => {
            tarjeta.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    
    // CONFIGURACIÓN: Reemplaza esta URL con el enlace real de tu encuesta
    const URL_ENCUESTA_SATISFACCION = "https://script.google.com/macros/s/AKfycbzNwGKDm2ViLROxYHcRiB8Bj4lIhqW0clUBUZ2qdjgTzUzXRULKQsl-PiVSRvTBIUF1_g/exec";

    // Selección del botón mediante su ID único
    const botonEncuesta = document.getElementById('cscSatBtnRedirect');

    if (botonEncuesta) {
        botonEncuesta.addEventListener('click', () => {
            // Abre la url configurada de manera segura en una nueva pestaña
            window.open(URL_ENCUESTA_SATISFACCION, '_blank', 'noopener,noreferrer');
        });
    }

});