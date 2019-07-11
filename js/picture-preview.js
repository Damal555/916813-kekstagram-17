'use strict';
(function () {
  window.picturePreview = {
    init: function (data) {
      picture.classList.remove('hidden');
      fillPicture(data);
    }
  };
  var picture = document.querySelector('.big-picture');

  function fillPicture(serverData) {
    var serverData = serverData[0];
    var img = picture.querySelector('.big-picture__img');
    var likes = picture.querySelector('.likes-count');
    var comments = picture.querySelector('.comments-count');
    var description = picture.querySelector('.social__caption');
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

})();
