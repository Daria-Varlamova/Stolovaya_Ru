"use strict" 
let body = document.querySelector("body");
let burger = body.querySelector(".burger-menu");
let navList = body.querySelector(".menu-nav__list");

function toggleMenu () {
   body.classList.toggle("open-menu");
}

burger.addEventListener("click", toggleMenu);