import '../styles/main.css';
import { initNavigation } from './navigation.js';
import { initSliders } from './slider.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSliders();

  // Hero Slider Control Interactivity
  const dots = document.querySelectorAll('.slider-pill .dot');
  const prevBtn = document.querySelector('.js-prev-slide');
  const nextBtn = document.querySelector('.js-next-slide');
  let currentIndex = 0;

  function updateSliderDots(index) {
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSliderDots(currentIndex);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + dots.length) % dots.length;
      updateSliderDots(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % dots.length;
      updateSliderDots(currentIndex);
    });
  }

  // Animated Counter for Stats
  const counters = document.querySelectorAll('.js-counter');
  let animated = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1500;
      const step = Math.ceil(target / (duration / 16));

      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, 16);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-wrapper');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Testimonials Interactive Switching
  const testimonials = [
    {
      quote: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."',
      author: 'James Andrews',
      role: 'CEO and Founder of the Company',
      avatar: '/assets/images/testimonial-main.png'
    },
    {
      quote: '"Orange PR transformed our regional brand presence. Their strategic thinking and media connections delivered incredible ROI and market visibility across major publications."',
      author: 'Sophia Martinez',
      role: 'Head of Marketing at Global Ventures',
      avatar: '/assets/images/avatar-1.png'
    },
    {
      quote: '"The team is fast, creative, and insanely reliable. Our product launch event was executed flawlessly, driving massive engagement across influencer networks."',
      author: 'David Chen',
      role: 'Co-Founder of TechHorizon',
      avatar: '/assets/images/avatar-2.png'
    }
  ];

  let currentTestimonialIndex = 0;
  const quoteEl = document.querySelector('.js-testimonial-quote');
  const authorEl = document.querySelector('.js-testimonial-author');
  const roleEl = document.querySelector('.js-testimonial-role');
  const avatarEl = document.querySelector('.js-testimonial-avatar');
  const counterEl = document.querySelector('.js-testimonial-num');
  const prevTestimonialBtn = document.querySelector('.js-prev-testimonial');
  const nextTestimonialBtn = document.querySelector('.js-next-testimonial');

  function renderTestimonial(index) {
    if (!quoteEl || !authorEl || !roleEl || !avatarEl || !counterEl) return;

    quoteEl.style.opacity = '0';
    setTimeout(() => {
      const data = testimonials[index];
      quoteEl.textContent = data.quote;
      authorEl.textContent = data.author;
      roleEl.textContent = data.role;
      avatarEl.src = data.avatar;
      counterEl.textContent = index + 1 < 10 ? `0${index + 1}` : index + 1;
      quoteEl.style.opacity = '1';
    }, 150);
  }

  if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(currentTestimonialIndex);
    });
  }

  if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      renderTestimonial(currentTestimonialIndex);
    });
  }

  // Contact Form Submission
  const contactForm = document.querySelector('.js-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('📩 Thank you for getting in touch! Your message has been sent successfully to Orange PR.');
      contactForm.reset();
    });
  }

  // Newsletter Form Submission
  const newsletterForm = document.querySelector('.js-newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('📧 Thank you for subscribing to Orange PR Newsletter!');
      newsletterForm.reset();
    });
  }

  // Play Button Interaction
  const playBtn = document.querySelector('.video-card__play');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      alert('🎥 Playing Orange PR Showcase Video!');
    });
  }
});
