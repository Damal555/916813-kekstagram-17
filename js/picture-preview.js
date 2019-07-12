'use strict';
(function () {
  window.picturePreview = {
    init: function (data) {
      addListenersToAllImages(data);
      addCloseListeners();
    }
  };

  var picture = document.querySelector('.big-picture');

  var img = picture.querySelector('.big-picture__img img');
  var likes = picture.querySelector('.likes-count');
  var comments = picture.querySelector('.comments-count');
  var description = picture.querySelector('.social__caption');

  var num = picture.querySelector('.social__comment-count');
  var load = picture.querySelector('.comments-loader');
  load.addEventListener('click', showMoreComments);


  function fillPicture(data, index) {
    var serverData = data[index];
    img.src = serverData.url;
    likes.textContent = serverData.likes;
    comments.textContent = serverData.comments.length;
    description.textContent = serverData.description;
    addComments(serverData.comments);
  }

  function addComments(commentsArr) {
    num.classList.remove('visually-hidden');
    load.classList.remove('visually-hidden');
    var fragment = document.createDocumentFragment();
    var template = picture.querySelector('.social__comment');
    var target = picture.querySelector('.social__comments');
    commentsArr.forEach(function (elem, index) {
      var example = template.cloneNode(true);
      example.querySelector('.social__picture').src = elem.avatar;
      example.querySelector('.social__text').textContent = elem.message;
      if (index >= 5) {
        example.classList.add('visually-hidden');
      }
      fragment.appendChild(example);
    });
    target.innerHTML = '';
    target.appendChild(fragment);

    if (comments.length <= 5) {
      num.classList.add('visually-hidden');
      load.classList.add('visually-hidden');
    }
  }

  function addCloseListeners() {
    var close = picture.querySelector('#picture-cancel');
    close.addEventListener('click', closePicture);
    document.addEventListener('keydown', escClose);
  }

  function closePicture() {
    picture.classList.add('hidden');
  }

  function openPicture() {
    picture.classList.remove('hidden');
  }

  function escClose(evt) {
    if (evt.keyCode === 27) {
      closePicture();
    }
  }

  function showMoreComments() {
    var hidden = picture.querySelector('.social__comments').querySelectorAll('.visually-hidden');

    hidden.forEach(function (elem, index) {
      if (index < 5) {
        elem.classList.remove('visually-hidden');
      }
    });

    if (!Array.from(hidden[hidden.length - 1].classList).includes('visually-hidden')) {
      num.classList.add('visually-hidden');
      load.classList.add('visually-hidden');
      return;
    }
  }

  function addListenersToAllImages(data) {
    var images = window.mock.picturesList.querySelectorAll('.picture');
    images.forEach(function (elem, index) {
      elem.addEventListener('click', function (evt) {
        evt.preventDefault();
        fillPicture(data, index);
        openPicture();
      });
    });
  }

})();
