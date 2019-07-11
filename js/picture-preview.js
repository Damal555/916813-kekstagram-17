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


  function fillPicture(data, index) {
    var serverData = data[index];
    img.src = serverData.url;
    likes.textContent = serverData.likes;
    comments.textContent = serverData.comments.length;
    description.textContent = serverData.description;
    addComments(serverData.comments);
    picture.querySelector('.social__comment-count').classList.add('visually-hidden');
    picture.querySelector('.comments-loader').classList.add('visually-hidden');
  }

  function addComments(comments) {
    var fragment = document.createDocumentFragment();
    var template = picture.querySelector('.social__comment');
    var target = picture.querySelector('.social__comments');
    comments.forEach(function (elem) {
      var example = template.cloneNode(true);
      example.querySelector('.social__picture').src = elem.avatar;
      example.querySelector('.social__text').textContent = elem.message;
      fragment.appendChild(example);
    });
    target.innerHTML = '';
    target.appendChild(fragment);
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
