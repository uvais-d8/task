export function initSliders() {
  const track = document.querySelector('.js-services-slider');
  const counterElement = document.querySelector('.js-service-counter');

  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.service-card'));
  if (cards.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  let isTransitioning = false;

  function updateSlots(animate = true) {
    const totalCards = cards.length;
    const activeIdx = ((currentIndex % totalCards) + totalCards) % totalCards;

    cards.forEach((card, i) => {
      // Remove all slot and transition modifier classes
      card.classList.remove(
        'slot-0', 'slot-1', 'slot-2', 'slot-exit', 'slot-hidden',
        'card--active', 'card--medium', 'card--small', 'card--exit', 'card--hidden',
        'no-transition'
      );

      if (!animate) {
        card.classList.add('no-transition');
      }

      // Calculate position offset relative to activeIdx
      const offset = (i - activeIdx + totalCards) % totalCards;

      if (offset === 0) {
        card.classList.add('slot-0', 'card--active');
      } else if (offset === 1) {
        card.classList.add('slot-1', 'card--medium');
      } else if (offset === 2) {
        card.classList.add('slot-2', 'card--small');
      } else if (offset === totalCards - 1) {
        card.classList.add('slot-exit', 'card--exit');
      } else {
        card.classList.add('slot-hidden', 'card--hidden');
      }
    });

    // Update Section 3 Counter (01 / 02 / 03)
    if (counterElement) {
      const activeCard = cards[activeIdx];
      if (activeCard) {
        const rawIndex = parseInt(activeCard.getAttribute('data-index') || '0', 10);
        const num = rawIndex + 1;
        counterElement.textContent = num < 10 ? `0${num}` : `${num}`;
      }
    }

    if (!animate) {
      void track.offsetHeight;
      setTimeout(() => {
        cards.forEach(card => card.classList.remove('no-transition'));
      }, 50);
    }
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex++;
    updateSlots(true);

    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  }

  function goToSlide(targetIndex) {
    if (isTransitioning || targetIndex === currentIndex) return;
    isTransitioning = true;
    currentIndex = targetIndex;
    updateSlots(true);
    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  }

  // Click on medium/small cards to activate them
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      const totalCards = cards.length;
      const activeIdx = ((currentIndex % totalCards) + totalCards) % totalCards;
      const offset = (i - activeIdx + totalCards) % totalCards;

      if (offset === 1) {
        nextSlide();
      } else if (offset === 2) {
        goToSlide(currentIndex + 2);
      }
    });
  });

  // Autoplay Timer (Every 3.5s)
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, 3500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);

  // Initial setup
  updateSlots(false);
  startAutoplay();
}
