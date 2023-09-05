// ==UserScript==
// @name         E-Nigma-Bot 3.1
// @namespace    http://tampermonkey.net/
// @version      3.1
// @description  try to take over the world!
// @author       Sergey P
// @match        https://nigma.net.ru/*
// @match        https://napli.ru/*
// @match        https://kiteuniverse.ru/*
// @match        https://motoreforma.com/*
// @match        https://drom.ru/*
// @match        https://auto.drom.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
console.log("Страница скрипта запущена");
let searchAddress = "nigma.net.ru";
let coinPageSarch = 4;



let sites = {
  "napli.ru":["10 популярных шрифтов Google", "Отключение редакций и ревизий", "Вывод произвольных типов записей и полей wp",
              "Конвертация Notion в Obsidian", "FFmpeg", "VSCode плагины"],
  "kiteuniverse.ru":["Kite Universe Россия", "Красота. Грация. Интеллект", "Фестиваль воздушных змеев"],
  "motoreforma.com":["прошивки для CAN-AM", "тюнинг Maverik X3", "тюнинг для квадроциклов CAN-AM"],
}
// // записываю переменную посредством обращения к глобальному методу? объекта, передавая ему объект с ключами ,сайт-запрос в котором посредством функции предоставления рандомного значения будет выбран определенный ключ - адрес сайта/
// let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];

// // Присваиваю переменной значение целевого сайта. Далее эта переменная используется в скрипте-функциях.
let pointAddressFirst;
let keywords;
let keyword;

if(location.hostname == searchAddress && document.getElementById("query").value[0] != undefined) {
  pointAddressFirst = getCookie("site");
} 

let links = document.links;
let nigmaInput = document.getElementById("query");
let flagSearchClick = true;
let btnSearch = null;

// function ckeckedCookie() {
//   if (btnSearch != undefined) {
//     document.cookie = `site=${site}`;
//   } else if (location.hostname == "www.google.com") {
//     site = getCookie("site");
//   } else {
//     site = location.hostname;
//   }
// }



function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}



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
      // Нужно убрать атрибут от ссылки


      console.log("Нашел строку " + link);
      // Не работает!!!
      link.click();
      // window.location.replace(link);
      break;
    } else {
      // ! Функция которая найдет клавишу по открытию следующей страницы раздачи 
      openNewPageSearchArea()
    }
  }
}
// * Функция проверки наличия искомой ссылки на странице выдачи КОНЕЦ






// * Функция проверяющая на какой странице мы находимся и запускающая скрипт в зависимости от страницы.НАЧАЛО

function checkPage() {
  ckeckedCookie();
  // * Если установит что это страница поисковика то выполнит действия для поисковика:
  if (location.hostname == searchAddress) {
    // Проверяю ссылки на странице, перезаписываю их.
    links = document.links;
    // Функция нахождения кнопки запуска поиска. Старт. Функция независимая.
    getbtnSearch();
    // ckeckedCookie();
  //* Отложенный запуск проверки на наличие пустого поля поиска на странице.НАЧАЛО
  setTimeout(checkFieldsSearch(), 1000);
  //* Отложенный запуск проверки на наличие пустого поля поиска на странице.КОНЕЦ


// * Если установит что эта страница является "Ключевой" т.е. искомой нами страницей для выполнения на ней действий с этой страницей тогда:
  } else if (location.hostname == pointAddressFirst) {
    // ckeckedCookie();
// !2. Пошел на поинт сайт. Зашел запустил скрипт.сгенерил новый сайт в переменную сайтПЛОХО надо исправить. Проверяю кнопка поиска есть? нет, я на странице поисковика, нет! Тогда беру и записываю в переменную сайт, вместо сгенерированного значения адрес текущей страницы что бы иметь возможность взаимодействовать с ее адресами. 


    // Проверяю ссылки на странице, перезаписываю их.
    links = document.links;
    console.log("Мы на целевом сайте");
    // Интервальная самозапускаемая функция производящая запуск содержимого в установленных временных рамках.СТАРТ ---
    setInterval(() => {
      // 
      // Переменная хранящая произвольное число от 0 до количества ссылок на странице
      let index = getRandom(0, links.length);
      // Произвольное условие которое при выполнении направит скрипт на главную страницу поисковика.
      if (getRandom(0, 70) >= 20) {
        // Изменяет адрес страницы на страницу с поисковиком.
    location.href = `https://${searchAddress}`;
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
    pointAddressFirst = location.hostname;
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


    if (item.innerText == coinPageSarch) {
      flagNeedSearchPage = false;
      location.href = `https://${searchAddress}`
    }
  }
}


// * Фунция которая даст куки - вернет.НАЧАЛО
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
// * Фунция которая даст куки - вернет.КОНЕЦ


function getRandomRequest() {
  // записываю переменную посредством обращения к глобальному методу? объекта, передавая ему объект с ключами ,сайт-запрос в котором посредством функции предоставления рандомного значения будет выбран определенный ключ - адрес сайта/
  let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
  // Присваиваю переменной значение целевого сайта. Далее эта переменная используется в скрипте-функциях.
  pointAddressFirst = site;
// Переменная записывающая в себя перечено запросов для сайта. Получает их т.к. выбиранный ранее ключ-сайт передается в объект который вернет обратно значения-перечень-массив строк с запросом
  keywords = sites[site];
  keyword = keywords[getRandom(0, keywords.length)];
  console.log(getCookie("site"));
  document.cookie = `site=${pointAddressFirst}`;
  console.log(pointAddressFirst);
  console.log(getCookie("site"));
}


function ckeckedCookie() {
  console.log(pointAddressFirst);
  console.log(location.hostname);
  console.log(searchAddress);
  if(location.hostname == searchAddress && document.getElementById("query").value[0] == undefined) {
    console.log("Новая поисковая страница");
    getRandomRequest();
  } else if (location.hostname == searchAddress) {
    console.log("Страница поисковой выдачи");
    pointAddressFirst = getCookie("site");
    console.log(pointAddressFirst);
  } else {
    console.log("Страница необходимого сайта");
    pointAddressFirst = location.hostname;
    console.log(pointAddressFirst);
  }
}


// * Функция проверки поля на наличие в нем содержимого, и присвоение в него содержимого при отсутствии. НАЧАЛО
function checkFieldsSearch() {
  console.log("Проверка поля запущена");
  if (document.getElementById("query")) {
    nigmaInput = document.getElementById("query");

    if (nigmaInput.value[0] == undefined) {
      iterationSword();
    } else if (nigmaInput.value == keyword) {
      keyword = nigmaInput.value;
      pointAddressFirst = getCookie("site");
      deferredCheckingPointLink();
    } else {
      keyword = nigmaInput.value;
      pointAddressFirst = getCookie("site");
      deferredCheckingPointLink();
    }
  }
}

function startPage() {
  ckeckedCookie();
  checkPage()
}

startPage();
console.log(pointAddressFirst);
