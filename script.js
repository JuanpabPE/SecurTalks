// Navegación móvil
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Cambiar navbar al hacer scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Activar enlace de navegación según sección visible
const sections = document.querySelectorAll("section");

const observerOptions = {
  threshold: 0.3,
  rootMargin: "-100px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

// Animación de aparición de elementos
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".content-card, .valor-card, .servicio-card, .info-card"
  );

  const elementObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(30px)";

          setTimeout(() => {
            entry.target.style.transition = "all 0.6s ease";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, 100);

          elementObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    elementObserver.observe(element);
  });
};

// Ejecutar animaciones cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
});

// Agregar estilos de animación para el menú hamburguesa
const style = document.createElement("style");
style.textContent = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(7px, 7px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(style);

// Smooth scroll mejorado
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Parallax effect para hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-content");

  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / window.innerHeight;
  }
});

// Contador de animación para las tarjetas de servicios
const animateCards = () => {
  const cards = document.querySelectorAll(".servicio-card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
};

window.addEventListener("load", animateCards);

// Efecto de hover 3D en las tarjetas
document.querySelectorAll(".servicio-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// Lazy loading para imágenes (si se agregan en el futuro)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

console.log("SecurTalks - Website cargado correctamente ✅");
