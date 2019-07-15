'use strict';
(function () {
  var hashtags = window.form.pictureEdit.querySelector('input.text__hashtags');
  hashtags.addEventListener('change', validateHashtags);

  function validateHashtags() {
    var tags = hashtags.value;
    if (!tags) {
      return;
    }
    tags = tags.split(' ');
    var isFailed = false;
    var custom = '';
    tags.forEach(function (elem, index) {
      if (elem === '') {
        tags.splice(index, 1);
        return;
      }
      elem.toLowerCase();
      if (elem.length > 20) {
        isFailed = true;
        custom = 'Максимальная длина тега - 20 символов, включая \"#\"!';
      }
      if (elem.length < 2) {
        isFailed = true;
        custom = 'Тэг не может состоять только из \"#\"!';
      }
      if (elem.indexOf('#') !== 0) {
        isFailed = true;
        custom = 'Тэги должны начинаться с символа \"#\"!';
      }
      for (var i = 0; i < index; i++) {
        if (elem === tags[i]) {
          isFailed = true;
          custom = 'Теги не должны повторяться!';
        }
      }
    });
    if (tags.length > 5) {
      isFailed = true;
      custom = 'Тегов не может быть больше 5-ти!';
    }
    hashtags.setCustomValidity(custom);
  }
})();
