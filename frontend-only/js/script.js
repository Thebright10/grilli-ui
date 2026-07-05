/**
 * GRILLI Restaurant - Main JavaScript
 */

// =============================================
//   PROFILE DROPDOWN  (global scope — must be at top)
// =============================================
function toggleProfile(e) {
  if (e) { e.stopPropagation(); e.preventDefault(); }
  var menu = document.getElementById('profileMenu');
  if (menu) menu.classList.toggle('show');
}

document.addEventListener('click', function (e) {
  var dropdown = document.getElementById('profileDropdown');
  var menu = document.getElementById('profileMenu');
  if (dropdown && menu && !dropdown.contains(e.target)) {
    menu.classList.remove('show');
  }
});

// =============================================
//   TOAST NOTIFICATION  (global scope)
// =============================================
function showToast(message, type) {
  var existing = document.querySelector('.grilli-toast');
  if (existing) existing.remove();
  var colors = type === 'error'
    ? { bg: '#2d0a0a', border: 'rgba(255,80,80,0.5)', color: '#ff6b6b' }
    : { bg: '#0a2d1a', border: 'rgba(80,200,120,0.5)', color: '#4caf84' };
  var toast = document.createElement('div');
  toast.innerHTML = '<span>' + message + '</span>';
  toast.style.cssText = 'position:fixed;top:24px;right:24px;z-index:99999;background:' + colors.bg +
    ';border:1px solid ' + colors.border + ';color:' + colors.color +
    ';padding:14px 24px;border-radius:10px;font-family:DM Sans,sans-serif;font-size:14px;font-weight:600;box-shadow:0 10px 40px rgba(0,0,0,0.5);';
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s';
    setTimeout(function () { if (toast.parentNode) toast.remove(); }, 400);
  }, 4500);
}

// =============================================
//   DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', function () {

  // --- PRELOADER ---
  var preloader = document.querySelector('[data-preaload]');
  if (preloader) {
    window.addEventListener('load', function () {
      preloader.classList.add('loaded');
      document.body.classList.add('loaded');
    });
    // Fallback: hide after 3s
    setTimeout(function () { preloader.classList.add('loaded'); document.body.classList.add('loaded'); }, 3000);
  }

  // --- NAVBAR TOGGLE ---
  var navbar = document.querySelector('[data-navbar]');
  var overlay = document.querySelector('[data-overlay]');
  var navTogglers = document.querySelectorAll('[data-nav-toggler]');
  navTogglers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (navbar) navbar.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
      document.body.classList.toggle('nav-active');
    });
  });

  // --- HEADER STICKY ---
  var header = document.querySelector('[data-header]');
  var backTopBtn = document.querySelector('[data-back-top-btn]');
  window.addEventListener('scroll', function () {
    if (window.scrollY >= 50) {
      if (header) header.classList.add('active');
      if (backTopBtn) backTopBtn.classList.add('active');
    } else {
      if (header) header.classList.remove('active');
      if (backTopBtn) backTopBtn.classList.remove('active');
    }
  });

  // --- HERO SLIDER ---
  var heroSlider = document.querySelector('[data-hero-slider]');
  if (heroSlider) {
    var sliderItems = heroSlider.querySelectorAll('[data-hero-slider-item]');
    var prevBtn = document.querySelector('[data-prev-btn]');
    var nextBtn = document.querySelector('[data-next-btn]');
    if (sliderItems.length > 0) {
      var pos = 0;
      sliderItems[0].classList.add('active');
      function goTo(n) {
        sliderItems[pos].classList.remove('active');
        pos = (n + sliderItems.length) % sliderItems.length;
        sliderItems[pos].classList.add('active');
      }
      var timer = setInterval(function () { goTo(pos + 1); }, 7000);
      if (nextBtn) nextBtn.addEventListener('click', function () { clearInterval(timer); goTo(pos + 1); timer = setInterval(function () { goTo(pos + 1); }, 7000); });
      if (prevBtn) prevBtn.addEventListener('click', function () { clearInterval(timer); goTo(pos - 1); timer = setInterval(function () { goTo(pos + 1); }, 7000); });
    }
  }

  // --- SMOOTH SCROLL (anchor links only - NOT form submit) ---
  var anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (navbar && navbar.classList.contains('active')) {
          navbar.classList.remove('active');
          if (overlay) overlay.classList.remove('active');
          document.body.classList.remove('nav-active');
        }
      }
    });
  });

  // --- RESERVATION FORM: Let it submit normally, no JS interference ---
  // HTML5 'required' attributes handle client-side validation.
  // Java ReservationController handles server-side.
  var reservationForm = document.getElementById('reservation-form');
  if (reservationForm) {
    // Only intercept to show loading state
    reservationForm.addEventListener('submit', function () {
      var btn = reservationForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Booking...';
        btn.disabled = true;
        btn.style.opacity = '0.7';
      }
    });
  }

});
