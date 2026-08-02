export function initNavigation() {
  const header = document.querySelector('.header');
  const toggleBtn = document.querySelector('.js-mobile-toggle');
  const navMenu = document.querySelector('.js-nav-menu');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile Menu Drawer Toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking navigation links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}
