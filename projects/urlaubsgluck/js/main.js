// browserify needed!
var imagesLoaded = require('imagesloaded');
var Masonry = require('masonry-layout');

var container = (document.getElementsByClassName('ideas-cards'))[0];
// console.log("container = ", container);

var logInBtn = document.getElementById('login-button');
var loginForm = document.getElementById('login-form');
var logInCloseBtn = document.getElementById('login-close');
var serchPartnersBtn = document.getElementById('btn-search-partners');
var otherPartnersBtn = document.getElementById('see-other-partners');

var pixabay= {
  URL: 'https://pixabay.com/',
  API_KEY: 'api/?key=5457095-f7990a8bedb2fed3c2cabe398'
}
var reqres = {
  URL: 'https://reqres.in/api/users?page=',
  pageCount: 1
}

var masonry = masonryInit(container); 
// console.log("masonry ===>", masonry);

//=======================================================================================

function masonryInit(container) {
  var msnry = new Masonry(container, {
    itemSelector: '.ideas-card',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 20,
    stagger: 30
  });

  return msnry;
}
//=======================================================================================
// SELECT VALID TYPE OF XmlHttpRequest OBJECT
function getXmlHttp() {
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}
//=======================================================================================

function createActivityCard(container, url, tag) {
  var cardHtml = '<div class="ideas-card"><img src="' +
    url + '" alt="' + tag + '"><h4>' +
    tag + '</h4></div>';
  
    container.insertAdjacentHTML('beforeend', cardHtml);
  // return cardHtml;
}
//=======================================================================================
function createPartnerCard(partnerPhoto, partnerFullName, partnerAbout){
  var card = '';
  card += '<div class="partner-card">';
  card += '<div class="partner-card__img">';
  card += '<img src="' + partnerPhoto + '" alt="partner-photo">';
  card += '<div class="partner-card__stiker"><img src="/img/partners/stiker-tv.png" alt="tv"></div>'
  card += '</div><h4 class="partner-card__name">';
  card += partnerFullName + '</h4>';
  card += '<p class="partner-card__about">' + partnerAbout + '</p></div>';
  // console.log(card);
  return card;
}
//=======================================================================================
function add2xWidth(container) {
  var width = container.offsetWidth;
  if (width >= 719) {

// https://developer.mozilla.org/ru/docs/Web/API/Window/resize_event
    // «document.body.clientWidth» — ширина сайта, родительского элемента body.
    // «innerWidth» — внутренняя рабочая часть браузера с отображаемым сайтом.
    // «outerWidth» — размер с учётом полос прокрутки и рамок браузера.
    // «screen.width» — разрешение экрана по горизонтали.
    // «screen.availWidth» — доступная область эркана для окон.Не учитвает служебные 
    // панели операционной системы, например, панель задач в windows.

    var elemArr = document.getElementsByClassName("ideas-card");
    elemArr[4].classList += " ideas-card-width-2x";
    elemArr[5].classList += " ideas-card-width-2x";
    for (var j = 11; j < elemArr.length; j += 6) {
      elemArr[j].classList += " ideas-card-width-2x";
      if (elemArr[j + 1]) { elemArr[j + 1].classList += " ideas-card-width-2x"; }
      j += 1;
    }
    // return elemArr;
  }
}
//=======================================================================================

function reRender(container, masonry) {
      // console.log('rerender');
  add2xWidth(container);
  masonryInit(container);
}
//=======================================================================================

// function containerClear(masonry){
//   var elArr = Array.prototype.slice.call(container.getElementsByTagName('ideas-card'));
//   // container.getElementsByClassName('ideas-cards').style = '';
//   masonry.remove(elArr);
// }
//=======================================================================================

function firstCharUp(str){
  var newStr = str[0].toUpperCase() + str.slice(1);
  return newStr;
}
//=======================================================================================

function addActivityCard(resp){
  // containerClear(masonry);
  for (var i = 0; i < resp.hits.length; i++) {
    createActivityCard(container, resp.hits[i].webformatURL, firstCharUp(resp.hits[i].tags));
  }
  
  imagesLoaded(container, reRender(container, masonry)); 
}
//=======================================================================================

//**
// * @param {string} method - ('GET' of 'POST')
// * @param {string} URL 
// * @param {boolean} type 
// * @param {function} callbackFunc 
// */
function sendRequest(method, URL, type, callbackFunc){
  var xhr = getXmlHttp();
  xhr.open(method, URL, type);
  xhr.send();

  if (xhr.status != 200) {
    console.log(xhr.status + ': ' + xhr.statusText);
  } else {
    callbackFunc(JSON.parse(xhr.responseText));
  }
}

//=======================================================================================
function addPartnersCards(resp){
  var container = document.getElementById('partner-cards');
  var partners = resp.data;
  var partnersArr = [];
 
  for (var i = 0; i < partners.length; i++) {
    var partnerPhoto = partners[i].avatar;
    var partnerFullName = partners[i].first_name + ' ' + partners[i].last_name;
    var partnerAbout = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    
    partnersArr.push(createPartnerCard(partnerPhoto, partnerFullName, partnerAbout));
  }
  
  for (var i = 0; i < partnersArr.length; i++) {
      container.insertAdjacentHTML('beforeend', partnersArr[i]);
  }
  
  reqres.pageCount += 1;
  
  if (reqres.pageCount === 3) {
    otherPartnersBtn.style.display = 'none';// otherPartnersBtn.removeEventListener("click", sendPartnersRequest);
  }
}
//=======================================================================================

//=======================================================================================
function sendPartnersRequest(){
  var reqresURL = reqres.URL + reqres.pageCount;
  
  sendRequest('GET', reqresURL, false, addPartnersCards);
}
//=======================================================================================

logInBtn.addEventListener('click', function(){
  loginForm.classList = '';
});
//=======================================================================================
logInCloseBtn.addEventListener('click', function () {
  loginForm.classList += 'unvisible';
});
//=======================================================================================

serchPartnersBtn.addEventListener('click', function () {
  event.preventDefault();
  var searchInput = document.getElementById('input-search-partners');
  var serchInputText = searchInput.value;

  if (serchInputText !== '') {
    serchInputText = encodeURIComponent(serchInputText);
    var pixabayURL = pixabay.URL + pixabay.API_KEY + "&q=" + serchInputText + "&image_type=photo";
    searchInput.value = ''; //clear input field

    sendRequest('GET', pixabayURL, false, addActivityCard);
  }

}); //end serchBtn.addEventListener
//=======================================================================================

otherPartnersBtn.addEventListener('click', sendPartnersRequest);
//=======================================================================================
