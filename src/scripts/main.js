// SLIDER
const swiper = new Swiper('.swiper-container', {
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// BURGER

const body = document.querySelector('body')
const burgerMenu = body.querySelector('.adaptive__burger-menu');
let links = body.querySelectorAll('.group-menu-link');
let footerLink = body.querySelectorAll('.footer-top__block');

burgerMenu.addEventListener('click', function () {
  body.classList.toggle('menu-open');
})

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function () {
    body.classList.remove('menu-open');
  })
}

// FOOTER

function close(e) {
  $(e).removeClass('active');
  $(e).find('ul').slideUp();
}

for (let i = 0; i < footerLink.length; i++) {
  footerLink[i].addEventListener('click', function (e) {
    if (e.currentTarget.classList.contains('active')) {
      close(e.currentTarget);
    } else {
      for (let j = 0; j < footerLink.length; j++) {
        close(footerLink[j]);
      }
      $(e.currentTarget).addClass('active');
      $(e.currentTarget).find('ul').slideDown();
    }
  })
}

// LEFT SIDEBAR

$('.sidebar__adaptive--container').on('click', () => {
  $('.sidebar-left__list').slideToggle();
});
