document.addEventListener('DOMContentLoaded', () => {
  // 1. Menú mobile
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 2. Filtros de galería
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('[data-gallery-item]');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.filter;

      filterBtns.forEach((b) => {
        b.classList.remove('border-status-sky', 'font-medium');
        b.classList.add('border-transparent', 'text-status-ink/70');
      });
      btn.classList.add('border-status-sky', 'font-medium');
      btn.classList.remove('border-transparent', 'text-status-ink/70');

      galleryItems.forEach((item) => {
        const match = selected === 'all' || item.dataset.category === selected;
        item.classList.toggle('hidden', !match);
      });
    });
  });

  // 3. Lightbox para fotografías y proyectos
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox) {
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = item.dataset.title || '';
        lightboxTitle.textContent = item.dataset.title || '';
        lightboxDesc.textContent = item.dataset.desc || '';
        lightbox.classList.remove('hidden');
      });
    });

    const closeLightbox = () => lightbox.classList.add('hidden');
    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // 4. Envío de formulario (simulación local lista para conectar a Formspree / backend)
  const forms = document.querySelectorAll('[data-contact-form]');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('[data-form-feedback]');
      const data = new FormData(form);
      const nombre = data.get('nombre');
      const division = data.get('division');

      if (feedback) {
        feedback.textContent = `Gracias, ${nombre}. Recibimos tu consulta para ${division}.`;
      }
      form.reset();
    });
  });
});