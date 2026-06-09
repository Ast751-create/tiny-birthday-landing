(() => {
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');

  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navToggle?.addEventListener('click', () => {
    header.classList.toggle('menu-open');
  });
  document.querySelectorAll('.nav a').forEach((a) => {
    a.addEventListener('click', () => header.classList.remove('menu-open'));
  });

  document.querySelectorAll('.price-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.price-card');
      const open = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  const cakeModal = document.getElementById('cakeModal');
  if (cakeModal) {
    const openModal = () => {
      cakeModal.hidden = false;
      document.body.style.overflow = 'hidden';
      cakeModal.querySelector('.modal-cta')?.focus();
    };
    const closeModal = () => {
      cakeModal.hidden = true;
      document.body.style.overflow = '';
    };
    document.querySelectorAll('[data-cake-tasting]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
    cakeModal.querySelectorAll('[data-cake-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !cakeModal.hidden) closeModal();
    });
  }

  const track = document.getElementById('galleryTrack');
  if (track) {
    const step = () => Math.max(track.clientWidth * 0.8, 260);
    document.querySelector('.slider-prev')?.addEventListener('click', () => {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    document.querySelector('.slider-next')?.addEventListener('click', () => {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    });
  }

  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }
})();
