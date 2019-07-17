'use strict';
(function () {
  var mockData = {
    COMMENTS: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
    AVATAR: ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'],
    NAME: ['Добрята', 'Шеломоха', 'Пофистал', 'Перкосрак ', 'Рахель', 'Дафна', 'Захава', 'Ядрен', 'Батон', 'Ястер', 'Мордухай', 'Джозефина']
  };
  var AMOUNT_OF_MOCK_PHOTOS = 25;
  window.mock = {
    picturesList: document.querySelector('.pictures'),
    createDOMElements: function (arr, index) {
      var pictureElement = userPictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = arr[index].url;
      pictureElement.querySelector('.picture__likes').textContent = arr[index].likes;
      pictureElement.querySelector('.picture__comments').textContent = arr[index].comments.length;
      return pictureElement;
    },
    insertFragment: function (amount, child, photos) {
      var fragment = document.createDocumentFragment();
      photos = createRandomData();
      for (var i = 0; i < amount; i++) {
        if (!child) {
          fragment.appendChild(window.mock.createDOMElements(photos, i));
        } else {
          fragment.appendChild(child[i]);
        }
      }
      window.mock.picturesList.appendChild(fragment);
    }
  };


  var photos = [];

  var userPictureTemplate = document.querySelector('#picture').content;

  function createRandomNumber(parameter) {
    var randomNumber = Math.floor(Math.random() * parameter);
    return randomNumber;
  }

  function createRandomData() {
    for (var i = 0; i < AMOUNT_OF_MOCK_PHOTOS; i++) {
      var commentsArr = [];
      var amountOfComments = createRandomNumber(mockData.COMMENTS.length);

      for (var j = 0; j < amountOfComments; j++) {
        commentsArr[j] = {
          avatar: mockData.AVATAR[createRandomNumber(mockData.AVATAR.length)],
          message: mockData.COMMENTS[createRandomNumber(mockData.COMMENTS.length)],
          name: mockData.NAME[createRandomNumber(mockData.NAME.length)]
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
  window.mock.insertFragment(AMOUNT_OF_MOCK_PHOTOS);

})();
