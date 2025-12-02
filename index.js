/**
 * PORTFOLIO TOP 2025 - SCRIPT PRINCIPAL
 * Author: Andréas 
 * Version: 1.0
 * Date: 2025
 *
 * Fonctionnalités:
 * - Navigation responsive
 * - Animations 3D
 * - Effets de défilement
 * - Statistiques animées
 * - Typing effect
 */

// ============================================
// 1. INITIALISATION - Attente chargement DOM
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Portfolio 2025 initialisé");

  // Initialisation de toutes les fonctionnalités
  initNavigation();
  initTypingEffect();
  initStatsCounter();
  initScrollAnimations();
  init3DEffects();
  initProjetSlider();

  // Démarrer les animations
  startAnimations();
});

// ============================================
// 2. NAVIGATION RESPONSIVE
// ============================================
function initNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle menu mobile
  menuToggle?.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Fermer menu au clic sur un lien
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }

      // Mettre à jour le lien actif
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Changement de lien actif au scroll
  window.addEventListener("scroll", function () {
    if (window.innerWidth > 768) {
      updateActiveNavLink();
    }
  });
}

// ============================================
// 3. EFFET TYPING ANIMÉ
// ============================================
function initTypingEffect() {
  const typedText = document.querySelector(".typed-text");
  const cursor = document.querySelector(".cursor");

  if (!typedText) return;

  const roles = [
    "Développeur Full-Stack",
    "Expert Électronique Embarquée",
    "Administrateur Réseaux & Système",
    "Musicien Multi-Instrumentiste",
    "Étudiant en MISEI - Physique & Applications",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      // Effacer le texte
      typedText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // Écrire le texte
      typedText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    // Gestion des transitions
    if (!isDeleting && charIndex === currentRole.length) {
      // Pause à la fin
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      // Passer au rôle suivant
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    // Animation du curseur
    cursor.style.opacity = "1";
    setTimeout(() => {
      cursor.style.opacity = "0.5";
    }, typingSpeed / 2);

    setTimeout(type, typingSpeed);
  }

  // Démarrer l'animation après un délai
  setTimeout(type, 1000);
}

// ============================================
// 4. COMPTEURS STATISTIQUES ANIMÉS
// ============================================
function initStatsCounter() {
  const stats = document.querySelectorAll(".stat-number");

  if (stats.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stat = entry.target;
          const target = parseInt(stat.getAttribute("data-count"));
          const duration = 2000; // 2 secondes
          const increment = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target;
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(current);
            }
          }, 16);

          observer.unobserve(stat);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => observer.observe(stat));
}

// ============================================
// 5. ANIMATIONS AU SCROLL
// ============================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".specialite-card, .projet-slide, .section-title"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// ============================================
// 6. EFFETS 3D AVANCÉS
// ============================================
function init3DEffects() {
  const cards = document.querySelectorAll(".card-3d");

  cards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      if (window.innerWidth > 768) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      }
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // Effet parallaxe sur le cube
  const cube = document.querySelector(".cube-3d");
  if (cube) {
    window.addEventListener("mousemove", function (e) {
      if (window.innerWidth > 1024) {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        cube.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
      }
    });
  }
}

// ============================================
// 7. SLIDER PROJETS
// ============================================
function initProjetSlider() {
  const slider = document.querySelector(".projets-slider");
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  // Support tactile
  slider.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchend", () => {
    isDown = false;
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
}

// ============================================
// 8. MISE À JOUR NAVIGATION ACTIVE
// ============================================
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = sectionId;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// ============================================
// 9. DÉMARRAGE DES ANIMATIONS
// ============================================
function startAnimations() {
  // Animation d'entrée globale
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);

  // Sons d'interaction (optionnel)
  const buttons = document.querySelectorAll(
    "button, .specialite-card, .nav-link"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Ajouter un effet sonore si désiré
      console.log("Interaction:", this.textContent || this.className);
    });
  });
}

// ============================================
// 10. OBSERVATEUR DE PERFORMANCE
// ============================================
// Surveiller les performances d'animation
let frameCount = 0;
let lastTime = performance.now();

function monitorPerformance() {
  const currentTime = performance.now();
  frameCount++;

  if (currentTime - lastTime >= 1000) {
    const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
    if (fps < 30) {
      console.warn(`⚠️ Performance: ${fps} FPS - Réduire les animations`);
    }
    frameCount = 0;
    lastTime = currentTime;
  }

  requestAnimationFrame(monitorPerformance);
}

// Démarrer le monitoring en développement
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  requestAnimationFrame(monitorPerformance);
}

// ============================================
// 11. GESTION DES ERREURS
// ============================================
window.addEventListener("error", function (e) {
  console.error("❌ Erreur détectée:", e.error);
  // Ici, vous pourriez envoyer l'erreur à un service de tracking
});

// ============================================
// 12. API SUPPORT (Exemple pour futur extension)
// ============================================
const PortfolioAPI = {
  // Récupérer les données de portfolio (pour futur API)
  async getPortfolioData() {
    try {
      // Exemple d'appel API
      // const response = await fetch('/api/portfolio');
      // return await response.json();
      return {
        success: true,
        message: "API Portfolio prête pour extension",
      };
    } catch (error) {
      console.error("API Error:", error);
      return { success: false, error: error.message };
    }
  },

  // Envoyer un formulaire de contact
  async sendContact(formData) {
    // Implémentation future
    console.log("Contact form:", formData);
  },
};

// Exposer l'API globalement si nécessaire
window.PortfolioAPI = PortfolioAPI;

console.log("✅ Portfolio 2025 - Toutes les fonctionnalités sont chargées");

