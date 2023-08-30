// ==UserScript==
// @name         E-Nigma-Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Sergey P
// @match        https://nigma.net.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
console.log("Страница скрипта запущена");
let links = document.links;
let nigmaInput = document.getElementById("query");
let flagSearchClick = true;
let btnSearch = null;
let keywords = [
  "купить авто",
  "площадка по покупке автомобилей",
  "автомобиль купить",
];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

let keyword = keywords[getRandom(0, keywords.length)];

function getbtnSearch() {
  if (document.querySelector(".search")) {
    console.log("Кнопка поиска search");
    btnSearch = document.querySelector(".search")
    console.log(btnSearch);
  } else if (document.getElementById("find")) {
    console.log("Кнопка поиска find");
    btnSearch = document.getElementById("find");
    console.log(btnSearch);
  } else {
    console.log(btnSearch);
    console.log("Нет Кнопки!");
  }
}
getbtnSearch();



function sendingRequestToSearch() {

  nigmaInput.value = keyword;
  console.log("Передан запрос: " + nigmaInput.value);
}

function deferredSearchClick() {
    console.log("Нажму на кнопку поиска через 1 сек.");

  function click() {
    btnSearch.click();
    console.log("Клик по кнопке поиска выполнен!");
    console.log("Ниже запущу отложенную функцию поиска и нажатия по ссылке на необходимый сайт!");

    deferredCheckingPointLink();
  }
    setTimeout(click, 3000);
}


function checkFieldsSearch() {
  nigmaInput = document.getElementById("query");
  console.log("Проверка поля запущена");

  if (nigmaInput.value[0] == undefined) {
    console.log(nigmaInput.value[0]);
    console.log("Поле undefined, запускаю функцию передачи запроса в поле");
    console.log(keyword);
    nigmaInput.value = keyword;

    deferredSearchClick();

  } else if (nigmaInput.value == keyword) {
    console.log("else");
    console.log(nigmaInput.value);
    console.log(keyword);
    keyword = nigmaInput.value;
    console.log("ЗАполнено нужным поле");
    deferredCheckingPointLink();
  } else {
    console.log("Поле уже не пустое, функция не нужна");
    keyword = nigmaInput.value;
    deferredCheckingPointLink();
  }
}

function deferredCheckingPointLink() {
  console.log("Запущу поиск ссылки через 4 сек.");
  setTimeout(checkingPointLink, 4000);
}

function checkingPointLink() {
  links = document.links;
  console.log("Поиск ссылки в ссылках на странице ");
  for (let i = 0; i < links.length; i++) {
    let link;
    if (links[i].href.indexOf("auto.ru") != -1) {
      link = links[i].href;
      console.log(link);
      console.log("Нашел строку " + links[i]);
      links[i].click();
      window.location.replace(link);
      console.log(link);
      // Не работает!
      // links[i].click();
      break;
    }
  }
}

setTimeout(checkFieldsSearch(), 1000);
