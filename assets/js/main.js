/**
* Template Name: Restaurantly
* Updated: Sep 20 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }


  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
  

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

 /**
 * Mobile nav dropdowns activate
 */
on('click', '.navbar .dropdown > a', function (e) {
  if (select('#navbar').classList.contains('navbar-mobile')) {
    e.preventDefault();
    this.nextElementSibling.classList.toggle('dropdown-active');
  }
}, true);

/**
 * Scrool with offset on links with a class name .scrollto
 */
on('click', '.scrollto', function (e) {
  if (select(this.hash)) {
    e.preventDefault();

    let navbar = select('#navbar');
    let navbarToggle = select('.mobile-nav-toggle');

    if (navbar.classList.contains('navbar-mobile')) {
      // Fecha o menu ao clicar em um link
      navbar.classList.remove('navbar-mobile');
      navbarToggle.classList.toggle('bi-list');
      navbarToggle.classList.toggle('bi-x');

      // Reativa a rolagem ao fechar o menu
      enableScroll();
    }

    scrollto(this.hash);
  }
}, true);

/**
 * Scroll with offset on page load with hash links in the url
 */
window.addEventListener('load', () => {
  if (window.location.hash) {
    if (select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  }
});

// Adiciona um evento ao clicar no botão de abrir/fechar o menu para alternar a rolagem
on('click', '.mobile-nav-toggle', function () {
  let navbar = select('#navbar');
  let navbarToggle = select('.mobile-nav-toggle');

  if (navbar.classList.contains('navbar-mobile')) {
    // Fecha o menu
    navbar.classList.remove('navbar-mobile');
    navbarToggle.classList.toggle('bi-list');
    navbarToggle.classList.toggle('bi-x');

    // Reativa a rolagem ao fechar o menu
    enableScroll();
  } else {
    // Abre o menu
    navbar.classList.add('navbar-mobile');
    navbarToggle.classList.toggle('bi-list');
    navbarToggle.classList.toggle('bi-x');

    // Desabilita a rolagem ao abrir o menu
    disableScroll();
  }
});

// Adiciona um evento ao clicar em um link do menu para reativar a rolagem
on('click', '#navbar .nav-menu a', function () {
  // Reativa a rolagem ao fechar o menu
  enableScroll();
});

// Função para desabilitar a rolagem
function disableScroll() {
  document.body.style.overflow = 'hidden';
}

// Função para reativar a rolagem
function enableScroll() {
  document.body.style.overflow = '';
}


  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        menuIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Events slider
   */
  new Swiper('.events-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * galeria retratos
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });
  
/**
 * galeria artigos
 */
const artigosLightbox = GLightbox({
  selector: '.gallery-lightbox-artigos'
});


  /**
   * animacao de rolagem
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()
