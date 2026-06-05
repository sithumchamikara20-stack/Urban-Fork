/* ===== MAISON AUREL — main.js ===== */
/* Uses jQuery, AJAX simulation, scroll effects, and DOM manipulation */

$(document).ready(function () {

  /* =============================================
     SPA ROUTER — show/hide pages
  ============================================= */
  function navigateTo(pageId) {
    $('.page').removeClass('active');
    $('#page-' + pageId).addClass('active');

    // Update active nav link
    $('.nav-links a, .mobile-menu a').removeClass('active');
    $('[data-page="' + pageId + '"]').addClass('active');

    // Close mobile menu
    $('.mobile-menu').removeClass('open');
    $('.hamburger').removeClass('open');

    // Scroll to top
    $('html, body').animate({ scrollTop: 0 }, 200);

    // Re-run animations
    setTimeout(checkFadeIn, 100);

    // Load menu items via AJAX if navigating to menu
    if (pageId === 'menu') {
      loadMenuItems('all');
    }

    // Update hash
    window.location.hash = pageId;
  }

  // Listen to nav links
  $(document).on('click', '[data-page]', function (e) {
    e.preventDefault();
    navigateTo($(this).data('page'));
  });

  // Load page from hash on initial load
  const hash = window.location.hash.replace('#', '');
  const validPages = ['home', 'about', 'menu', 'gallery', 'reservation', 'contact'];
  if (hash && validPages.includes(hash)) {
    navigateTo(hash);
  } else {
    navigateTo('home');
  }

  /* =============================================
     NAVBAR SCROLL BEHAVIOUR
  ============================================= */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) {
      $('#navbar').addClass('scrolled');
    } else {
      $('#navbar').removeClass('scrolled');
    }
  });
  // Trigger on load
  $(window).trigger('scroll');

  /* =============================================
     HAMBURGER MENU
  ============================================= */
  $('.hamburger').on('click', function () {
    $(this).toggleClass('open');
    $('.mobile-menu').toggleClass('open');
  });

  /* =============================================
     SCROLL FADE-IN ANIMATIONS
  ============================================= */
  function checkFadeIn() {
    $('.fade-in').each(function () {
      const elemTop = $(this).offset().top;
      const viewBottom = $(window).scrollTop() + $(window).height() * 0.92;
      if (elemTop < viewBottom) {
        $(this).addClass('visible');
      }
    });
  }
  $(window).on('scroll', checkFadeIn);
  checkFadeIn();

  /* =============================================
     AJAX — SIMULATED MENU LOADING
     In a real project this would call a PHP endpoint like:
     $.ajax({ url: 'api/menu.php', data: { category: cat }, ... })
  ============================================= */
  const menuData = {
    starters: [
      { name: 'Lobster Bisque', desc: 'Velvety cream soup with cognac-flambéed lobster and chive oil.', price: '$18', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&q=80', badge: 'chef', badgeText: "Chef's Pick" },
      { name: 'Burrata Caprese', desc: 'Fresh burrata, heirloom tomatoes, basil pesto, aged balsamic.', price: '$16', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&q=80', badge: 'veg', badgeText: 'Vegetarian' },
      { name: 'Tuna Tartare', desc: 'Hand-cut yellowfin tuna, avocado cream, sesame, microgreens.', price: '$22', img: 'https://images.unsplash.com/photo-1599021456807-25db0f974333?w=300&q=80', badge: 'popular', badgeText: 'Popular' },
      { name: 'Truffle Arancini', desc: 'Crispy risotto balls filled with black truffle and fontina.', price: '$15', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=80', badge: 'veg', badgeText: 'Vegetarian' },
    ],
    mains: [
      { name: 'Filet Mignon', desc: '8oz prime beef, red wine reduction, truffle pomme purée, haricots verts.', price: '$58', img: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=300&q=80', badge: 'chef', badgeText: "Chef's Pick" },
      { name: 'Pan-Seared Duck', desc: 'Magret duck breast, cherry gastrique, root vegetable gratin.', price: '$46', img: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=300&q=80', badge: '', badgeText: '' },
      { name: 'Salmon En Croûte', desc: 'Atlantic salmon wrapped in puff pastry, dill cream, asparagus.', price: '$42', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&q=80', badge: 'popular', badgeText: 'Popular' },
      { name: 'Mushroom Risotto', desc: 'Wild porcini, aged parmesan, white truffle oil, fresh herbs.', price: '$34', img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&q=80', badge: 'veg', badgeText: 'Vegetarian' },
      { name: 'Rack of Lamb', desc: 'French-trimmed rack, herb crust, Provençal ratatouille.', price: '$54', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80', badge: '', badgeText: '' },
    ],
    desserts: [
      { name: 'Crème Brûlée', desc: 'Classic vanilla custard, caramelised sugar crust, fresh berries.', price: '$14', img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=300&q=80', badge: 'popular', badgeText: 'Popular' },
      { name: 'Chocolate Fondant', desc: 'Warm dark chocolate cake, molten centre, vanilla bean ice cream.', price: '$16', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&q=80', badge: 'chef', badgeText: "Chef's Pick" },
      { name: 'Tarte Tatin', desc: 'Caramelised apple tart, flaky pastry, crème fraîche.', price: '$13', img: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=300&q=80', badge: 'veg', badgeText: 'Vegetarian' },
    ],
    drinks: [
      { name: 'Château Margaux', desc: 'Premier Grand Cru Classé, Bordeaux. Notes of blackcurrant and cedar.', price: '$180', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&q=80', badge: '', badgeText: '' },
      { name: 'Champagne Rosé', desc: 'Billecart-Salmon Rosé. Delicate bubbles with strawberry and brioche.', price: '$95', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80', badge: 'popular', badgeText: 'Popular' },
      { name: 'Signature Cocktail', desc: 'Aurel Mule: cognac, ginger beer, fresh lime, gold flakes.', price: '$22', img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&q=80', badge: 'chef', badgeText: "Chef's Pick" },
    ],
  };

  function buildMenuCard(item) {
    const badgeHTML = item.badge ? `<span class="dish-badge ${item.badge}">${item.badgeText}</span>` : '';
    return `
      <div class="menu-item fade-in">
        <div class="menu-item-img" style="background-image: url('${item.img}')"></div>
        <div class="menu-item-body">
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
          <div class="menu-item-footer">
            <span class="menu-price">${item.price}</span>
            ${item.badge ? `<span class="dish-badge ${item.badge}" style="position:static;font-size:0.6rem;padding:3px 10px">${item.badgeText}</span>` : ''}
          </div>
        </div>
      </div>`;
  }

  function loadMenuItems(category) {
    const $grid = $('#menu-grid');
    const $loader = $('#menu-loader');

    $grid.html('');
    $loader.show();

    // Simulate AJAX delay (mimics real $.ajax call to menu.php)
    setTimeout(function () {
      let items = [];
      if (category === 'all') {
        items = [...menuData.starters, ...menuData.mains, ...menuData.desserts, ...menuData.drinks];
      } else if (menuData[category]) {
        items = menuData[category];
      }

      $loader.hide();
      items.forEach(function (item) {
        $grid.append(buildMenuCard(item));
      });

      // Trigger fade-in
      setTimeout(checkFadeIn, 50);
    }, 600);
  }

  // Menu filter buttons
  $(document).on('click', '.filter-btn', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    loadMenuItems($(this).data('category'));
  });

  /* =============================================
     GALLERY LIGHTBOX
  ============================================= */
  $(document).on('click', '.gallery-item', function () {
    const imgUrl = $(this).find('.gallery-img').css('background-image')
      .replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    const caption = $(this).find('.gallery-caption h4').text();
    $('#lightbox-img').attr('src', imgUrl).attr('alt', caption);
    $('#lightbox').addClass('open');
    $('body').css('overflow', 'hidden');
  });

  $(document).on('click', '#lightbox, #lightbox-close', function () {
    $('#lightbox').removeClass('open');
    $('body').css('overflow', '');
  });

  // Prevent closing when clicking the image itself
  $(document).on('click', '#lightbox-img', function (e) {
    e.stopPropagation();
  });

  /* =============================================
     RESERVATION FORM — jQuery Validation + AJAX POST
     In production: $.ajax({ url: 'reserve.php', method: 'POST', data: ... })
  ============================================= */
  $('#reservation-form').on('submit', function (e) {
    e.preventDefault();

    const name = $('#res-name').val().trim();
    const email = $('#res-email').val().trim();
    const date = $('#res-date').val();
    const time = $('#res-time').val();
    const guests = $('#res-guests').val();

    // Basic validation
    if (!name || !email || !date || !time || !guests) {
      showToast('⚠️ Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('⚠️ Please enter a valid email address.');
      return;
    }

    const $btn = $(this).find('.form-submit');
    $btn.text('Reserving...').prop('disabled', true);

    // Simulated AJAX POST to reserve.php
    setTimeout(function () {
      $btn.text('Reserve My Table').prop('disabled', false);
      $('#reservation-form')[0].reset();
      showToast('✅ Reservation confirmed! Check your email for details.');
    }, 1200);
  });

  /* =============================================
     CONTACT FORM — AJAX POST simulation
  ============================================= */
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();

    const name = $('#con-name').val().trim();
    const email = $('#con-email').val().trim();
    const msg = $('#con-message').val().trim();

    if (!name || !email || !msg) {
      showToast('⚠️ Please fill in all fields.');
      return;
    }

    const $btn = $(this).find('button[type="submit"]');
    $btn.text('Sending...').prop('disabled', true);

    // Simulate $.ajax POST to contact.php
    setTimeout(function () {
      $btn.text('Send Message').prop('disabled', false);
      $('#contact-form')[0].reset();
      showToast('✅ Message sent! We\'ll get back to you within 24 hours.');
    }, 1000);
  });

  /* =============================================
     TOAST NOTIFICATION
  ============================================= */
  function showToast(message) {
    $('#toast').text(message).addClass('show');
    setTimeout(function () {
      $('#toast').removeClass('show');
    }, 4000);
  }

  /* =============================================
     SET MIN DATE for reservation (today)
  ============================================= */
  const today = new Date().toISOString().split('T')[0];
  $('#res-date').attr('min', today);

  /* =============================================
     SMOOTH COUNTER ANIMATION (hero stats)
  ============================================= */
  function animateCounter($el, target, suffix) {
    let count = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(function () {
      count = Math.min(count + step, target);
      $el.text(count + suffix);
      if (count >= target) clearInterval(timer);
    }, 40);
  }

  let countersRun = false;
  function runCounters() {
    if (countersRun) return;
    const inView = $('.hero-stat').first().offset().top < $(window).scrollTop() + $(window).height();
    if (inView) {
      countersRun = true;
      animateCounter($('#stat-exp'), 15, '+');
      animateCounter($('#stat-dishes'), 80, '+');
      animateCounter($('#stat-guests'), 50, 'K+');
    }
  }
  $(window).on('scroll', runCounters);
  runCounters();

}); // end document.ready
