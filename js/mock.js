'use strict';
(function () {
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var AVATAR = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];
  var NAME = ['Добрята', 'Шеломоха', 'Пофистал', 'Перкосрак ', 'Рахель', 'Дафна', 'Захава', 'Ядрен', 'Батон', 'Ястер', 'Мордухай', 'Джозефина'];

  window.mock = {
    picturesList: document.querySelector('.pictures')
  };

  var amount = 25;
  var photos = [];

  var userPictureTemplate = document.querySelector('#picture').content;

  function createRandomNumber(parameter) {
    var randomNumber = Math.floor(Math.random() * parameter);
    return randomNumber;
  }

  function createRandomData() {
    for (var i = 0; i < amount; i++) {
      var commentsArr = [];
      var amountOfComments = createRandomNumber(COMMENTS.length);

      for (var j = 0; j < amountOfComments; j++) {
        commentsArr[j] = {
          avatar: AVATAR[createRandomNumber(AVATAR.length)],
          message: COMMENTS[createRandomNumber(COMMENTS.length)],
          name: NAME[createRandomNumber(NAME.length)]
        };
      }
      photos[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: createRandomNumber(185) + 15,
        comments: commentsArr
      };
    }
    return photos;
  }
  photos = createRandomData();

  function createDOMElements(i) {
    var pictureElement = userPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photos[i].url;
    pictureElement.querySelector('.picture__likes').textContent = photos[i].likes;
    pictureElement.querySelector('.picture__comments').textContent = photos[i].comments.length;
    return pictureElement;
  }

  function insertFragment() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < amount; i++) {
      fragment.appendChild(createDOMElements(i));
    }
    window.mock.picturesList.appendChild(fragment);
  }
  insertFragment();

})();
