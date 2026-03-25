// ===== HAMBURGER MOBILE MENU =====
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('headerNav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('open');
    });

    // Close menu when clicking a nav link
    nav.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
      });
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        var offset = document.querySelector('.site-header').offsetHeight + 10;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ===== SCROLL ANIMATION: Reveal cards on scroll =====
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.career-card, .info-card, .benefit-card, .contact-item, .xettuyen-box, .level-info-item, .timeline-column').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add CSS class for visible state
  var style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ===== HIDE/SHOW FAB on scroll near top =====
  var fab = document.getElementById('fabRegister');
  if (fab) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        fab.style.transform = 'translateY(0)';
        fab.style.opacity = '1';
      } else {
        fab.style.transform = 'translateY(100px)';
        fab.style.opacity = '0';
      }
    });
    // Initially hidden
    fab.style.transform = 'translateY(100px)';
    fab.style.opacity = '0';
    fab.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
  }
});
