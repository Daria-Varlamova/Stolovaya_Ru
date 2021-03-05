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

for (let i = 0; i < footerLink.length; i++) {
  footerLink[i].addEventListener('click', function () {
    footerLink[i].classList.toggle('active');
  })
}