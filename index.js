

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Portfolio initialisé");

  // 1. NAVIGATION MOBILE FIX
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      console.log("Menu toggle cliqué");
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
      
      // Bloquer scroll si menu ouvert
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });
  }

  // Fermer menu quand on clique sur un lien
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "auto";
      }
      
      // Activer le lien cliqué
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // 2. TYPING EFFECT
  const typedText = document.querySelector(".typed-text");
  if (typedText) {
    const roles = [
      "Développeur Full-Stack",
      "Expert Électronique Embarquée",
      "Administrateur Réseaux & Système",
      "Musicien Multi-Instrumentiste",
      "Étudiant en MISEI - Physique & Applications"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typedText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }
      
      setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
  }

  // 3. ANIMATION STATS
  const stats = document.querySelectorAll(".stat-number");
  if (stats.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stat = entry.target;
          const target = parseInt(stat.getAttribute("data-count"));
          const duration = 2000;
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
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
  }

  // 4. ANIMATION AU SCROLL
  const animatedElements = document.querySelectorAll(".specialite-card, .projet-slide");
  if (animatedElements.length > 0) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      scrollObserver.observe(el);
    });
  }

  // 5. EFFET 3D SUR LES CARTES
  const cards = document.querySelectorAll(".card-3d");
  cards.forEach(card => {
    card.addEventListener("mousemove", function(e) {
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
    
    card.addEventListener("mouseleave", function() {
      this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // 6. SLIDER PROJETS
  const slider = document.querySelector(".projets-slider");
  if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener("mouseleave", () => {
      isDown = false;
    });
    
    slider.addEventListener("mouseup", () => {
      isDown = false;
    });
    
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
    
    // Touch support
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

  // 7. NAVIGATION ACTIVE AU SCROLL
  window.addEventListener("scroll", function() {
    if (window.innerWidth > 768) {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    }
  });

  // 8. FERMER MENU QUAND ON CLIQUE DEHORS
  document.addEventListener("click", function(e) {
    if (window.innerWidth <= 768 && 
        navMenu && 
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // 9. FERMER MENU QUAND ON REDIMENSIONNE
  window.addEventListener("resize", function() {
    if (window.innerWidth > 768 && navMenu) {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  console.log("✅ Toutes les fonctionnalités chargées");
});
