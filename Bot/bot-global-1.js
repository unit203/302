// ==UserScript==
// @name         E-Nigma-Bot 2.1
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  try to take over the world!
// @author       Sergey P
// @match        https://auto.ru/*
// @match        https://nigma.net.ru/*
// @match        https://www.drom.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
let searchAddress = "nigma.net.ru";
// let pointAddressFirst = "auto.ru";
// let pointAddressFirst = "www.drom.ru";
let pointAddressFirst = "youla.ru";
let pointAddressSecond = "www.drom.ru";
let coinPageSarch = 2;

console.log("Страница скрипта запущена");
let links = document.links;
let nigmaInput = document.getElementById("query");
let flagSearchClick = true;
// console.log(nigmaInput);
// let btnSearch = document.querySelector(".search");
let btnSearch = null;
// let keyword = keywords[getRandom(0, keywords.length)];

let keywords = [
  "купить авто",
  "площадка по покупке автомобилей",
  "автомобиль купить",
  "авто осаго ру",
];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

let keyword = keywords[getRandom(0, keywords.length)];

function iterationSword() {
  let str = keyword;
  let iterCounter = 0;
  // function getLetterString() {

  // }
  let timerId = setInterval(function() {
    nigmaInput.value += str[iterCounter];
    iterCounter++
    if (iterCounter == str.length) {
      clearInterval(timerId);
      deferredSearchClick();
    }
  }, 100);
}


// Получаем на главной странице поисковика Кнопку поисковика(Она бывает разной)
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

// ? Функция присваивающая полю значение
function sendingRequestToSearch() {
  nigmaInput.value = keyword;
  console.log("Поле уже не пустое");
  console.log("Передан запрос: " + nigmaInput.value);
}
// ? Функция присваивающая полю значение


// * Функция отложенного клика по кнопке поиска.
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
// * Функция отложенного клика по кнопке поиска. КОНЕЦ


// * Функция проверки поля на наличие в нем содержимого, и присвоение в него содержимого при отсутствии. НАЧАЛО
function checkFieldsSearch() {
  nigmaInput = document.getElementById("query");
  console.log("Проверка поля запущена");


  if (nigmaInput.value[0] == undefined) {
    iterationSword();

  } else if (nigmaInput.value == keyword) {
    // console.log("else");
    // console.log(nigmaInput.value);
    // console.log(keyword);
    keyword = nigmaInput.value;
    console.log("ЗАполнено нужным поле");
    deferredCheckingPointLink();
  } else {
    console.log("Поле уже не пустое, функция не нужна");
    keyword = nigmaInput.value;
    deferredCheckingPointLink();
  }
}
// * Функция проверки поля на наличие в нем содержимого, и присвоение в него содержимого при отсутствии. КОНЕЦ


// checkFieldsSearch();


// * Функция запуска отложенного старта проверки наличия искомой ссылки на странице выдачи НАЧАЛО
function deferredCheckingPointLink() {
  console.log("Запущу поиск ссылки через 4 сек.");
  setTimeout(checkingPointLink, 4000);
}
// * Функция запуска отложенного старта проверки наличия искомой ссылки на странице выдачи КОНЕЦ



// * Функция проверки наличия искомой ссылки на странице выдачи НАЧАЛО
function checkingPointLink() {
  links = document.links;
  let flagNeedSearchPage = true;
  console.log("Поиск ссылки в ссылках на странице ");
  for (let i = 0; i < links.length; i++) {
    let link;
    if (links[i].href.indexOf(`${pointAddressFirst}`) != -1) {
      console.log("С таргетом" + link);
      flagNeedSearchPage = false;
      link = links[i];
      console.log(link);
      link.target == '_blank' && link.removeAttribute('target');
      console.log(link);
      console.log("Нашел строку " + link);
      link.click();
      // window.location.replace(link);
      break;
    } else {
      // ! Функция которая найдет клавишу по открытию следующей страницы раздачи
      openNewPageSearchArea()
    }
    // link.click();
  }
}
// * Функция проверки наличия искомой ссылки на странице выдачи КОНЕЦ





// ! Функция проверяющая на какой странице мы находимся и запускающая скрипт в зависимости от страницы.НАЧАЛО

function checkPage() {
// * Если установит что это страница поисковика то выполнит действия для поисковика:
  if (location.hostname == searchAddress) {
    // Проверяю ссылки на странице, перезаписываю их.
    links = document.links;
  // Функция нахождения кнопки запуска поиска. Старт. Функция независимая.
  getbtnSearch();
  //* Отложенный запуск проверки на наличие пустого поля поиска на странице.НАЧАЛО
  setTimeout(checkFieldsSearch(), 1000);
  //* Отложенный запуск проверки на наличие пустого поля поиска на странице.КОНЕЦ



// * Если установит что эта страница является "Ключевой" т.е. искомой нами страницей для выполнения на ней действий с этой страницей тогда:
  } else if (location.hostname == pointAddressFirst) {
    // Проверяю ссылки на странице, перезаписываю их.
    links = document.links;
    console.log("Мы на целевом сайте");
    // Интервальная самозапускаемая функция производящая запуск содержимого в установленных временных рамках.СТАРТ ---
    setInterval(() => {
      //
      // Переменная хранящая произвольное число от 0 до количества ссылок на странице
      let index = getRandom(0, links.length);
      // Произвольное условие которое при выполнении направит скрипт на главную страницу поисковика.
      if (getRandom(0, 101) >= 50) {
        // Изменяет адрес страницы на страницу с поисковиком.
        location.href = `"https://${searchAddress}"`;
      }
      // Если ссылок нет, направляет на ту же страницу, т.е. искомую.
      if (links.length == 0) {
        location.href = `"https://${pointAddressFirst}"`;
      }
      // Ищет в ссылке на искомой странице ссылку которая будет так же содержать адрес этой страницы и при ее нахождении совершит по ней клик чем перенаправит туда.
      if(links[index].href.includes(`${pointAddressFirst}`)) {
        links[index].click();
      }
    }, getRandom(3000, 5000));
    // Интервальная самозапускаемая функция производящая запуск содержимого в установленных временных рамках.КОНЕЦ ---
  } else {

  }
}


function openNewPageSearchArea() {
  console.log("Запущена функция поиска и нажатия следующей страницы в раздаче поисковика");
  let linkNextPage = document.getElementById("pages");
  if (linkNextPage != null) {
    if (flagNeedSearchPage = true) {
      setTimeout(() => {
        linkNextPage.click();
      }, getRandom(3500, 5500))
    }
    getNumberThisPage();
}
}

function getNumberThisPage() {
console.log("Запущен поиск номера на странице");
  let linkPagesListAll = document.querySelector(".pages");
  let linkPagesList =linkPagesListAll.querySelectorAll('b');
  for (item of linkPagesList) {
    // console.log(item.innerText);
    // console.log(item.outerHTML);

    if (item.innerText == coinPageSarch) {
      console.log("Номер на странице найден" + coinPageSarch);
      flagNeedSearchPage = false;
      location.href = `https://${searchAddress}`
    }
  }
}

checkPage();

