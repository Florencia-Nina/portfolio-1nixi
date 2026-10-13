/* =========================================
   PORTFOLIO 1.NIXI
   Menú de navegación y carrusel de cosplay
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. MENÚ DE NAVEGACIÓN RESPONSIVE
    ========================================= */
  
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
  
    if (menuToggle && navLinks) {
  
      menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
  
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
      });
  
      // Cerrar el menú al seleccionar una sección
      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active");
          menuToggle.classList.remove("active");
          menuToggle.setAttribute("aria-expanded", "false");
        });
      });
  
      // Cerrar el menú al presionar Escape
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          navLinks.classList.remove("active");
          menuToggle.classList.remove("active");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  
  
    /* =========================================
       2. CARRUSEL DE FOTOGRAFÍAS DE COSPLAY
    ========================================= */
  
    const carousel = document.querySelector("#cosplay-carousel");
    const previousButton = document.querySelector("#cosplay-prev");
    const nextButton = document.querySelector("#cosplay-next");
  
    if (carousel && previousButton && nextButton) {
  
      const slides = Array.from(
        carousel.querySelectorAll(".cosplay-slide")
      );
  
      if (slides.length > 0) {
  
        let currentIndex = 0;
        let autoplayTimer = null;
  
        // Mostrar una fotografía específica
        function showSlide(index) {
  
          currentIndex = (index + slides.length) % slides.length;
  
          slides.forEach((slide, i) => {
  
            const isActive = i === currentIndex;
  
            slide.classList.toggle("active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
  
            const image = slide.querySelector("img");
  
            if (image) {
              image.loading = isActive ? "eager" : "lazy";
            }
  
          });
        }
  
        // Detener el cambio automático
        function stopAutoplay() {
          if (autoplayTimer !== null) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
          }
        }
  
        // Iniciar el cambio automático cada 5 segundos
        function startAutoplay() {
  
          stopAutoplay();
  
          autoplayTimer = setInterval(() => {
            showSlide(currentIndex + 1);
          }, 5000);
  
        }
  
        // Fotografía anterior
        previousButton.addEventListener("click", () => {
          showSlide(currentIndex - 1);
          startAutoplay();
        });
  
        // Fotografía siguiente
        nextButton.addEventListener("click", () => {
          showSlide(currentIndex + 1);
          startAutoplay();
        });
  
        // Pausar mientras el cursor está sobre el carrusel
        carousel.addEventListener("mouseenter", stopAutoplay);
        carousel.addEventListener("mouseleave", startAutoplay);
  
        // Pausar mientras se interactúa con el carrusel mediante teclado
        carousel.addEventListener("focusin", stopAutoplay);
        carousel.addEventListener("focusout", startAutoplay);
  
        // Mostrar la primera fotografía al cargar la página
        showSlide(0);
  
        // Iniciar el carrusel automático
        startAutoplay();
  
      }
    }
  
  });