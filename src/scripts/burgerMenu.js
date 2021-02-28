"use strict" 
let body = document.querySelector("body");
let burger = body.querySelector(".burger-menu");
let navList = body.querySelector(".menu-nav__list");
let menuNavItem = body.querySelectorAll('.menu-nav__item');

console.log(menuNavItem)

function toggleMenu () {
   body.classList.toggle("open-menu");
}

burger.addEventListener("click", toggleMenu);

for (let i = 0; i < menuNavItem.length; i ++) {
   menuNavItem[i].addEventListener('click' , function  (){
      body.classList.remove("open-menu");
   })
}