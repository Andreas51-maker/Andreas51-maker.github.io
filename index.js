document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Portfolio initialisé");

  // ... (tout le code existant reste inchangé jusqu'à la partie stats) ...

  // 3. ANIMATION STATS (DÉJÀ EXISTANT)
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

  // NOUVELLE SECTION: ANIMATION DES BARRES DE COMPÉTENCES RÉSEAU
  const skillBars = document.querySelectorAll(".skill-bar");
  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.transition = "width 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)";
          entry.target.style.width = width;
          
          // Ajouter un effet de remplissage progressif
          setTimeout(() => {
            entry.target.classList.add("animated");
          }, 300);
          
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3, rootMargin: "0px 0px -50px 0px" });
    
    skillBars.forEach(bar => {
      bar.style.width = "0%"; // Initialiser à 0 pour l'animation
      skillObserver.observe(bar);
    });
  }

  // ANIMATION DES CARTES D'OUTILS
  const toolCards = document.querySelectorAll(".tool-card");
  if (toolCards.length > 0) {
    const toolObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
            entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          }, index * 100);
        }
      });
    }, { threshold: 0.1 });
    
    toolCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px) scale(0.95)";
      card.style.transitionDelay = `${index * 0.1}s`;
      toolObserver.observe(card);
    });
  }

  // ANIMATION DES NIVEAUX DE COMPÉTENCES
  const levelCategories = document.querySelectorAll(".level-category");
  if (levelCategories.length > 0) {
    const levelObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
            entry.target.classList.add("visible");
          }, index * 200);
        }
      });
    }, { threshold: 0.2 });
    
    levelCategories.forEach((category, index) => {
      category.style.opacity = "0";
      category.style.transform = index % 2 === 0 ? "translateX(-30px)" : "translateX(30px)";
      category.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      levelObserver.observe(category);
    });
  }

  // ANIMATION DES PROJETS MINI
  const miniProjects = document.querySelectorAll(".mini-project");
  if (miniProjects.length > 0) {
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          }, index * 150);
        }
      });
    }, { threshold: 0.1 });
    
    miniProjects.forEach((project, index) => {
      project.style.opacity = "0";
      project.style.transform = "translateY(20px)";
      project.style.transitionDelay = `${index * 0.1}s`;
      projectObserver.observe(project);
    });
  }

  // EFFET 3D SUR LES CARTES D'EXPÉRIENCE (EXISTANT)
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

  // ... (le reste du code existant reste inchangé) ...

  console.log("✅ Toutes les fonctionnalités chargées");
});
