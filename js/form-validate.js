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
    var custom = '';
    tags.forEach(function (elem, index) {
      if (elem === '') {
        tags.splice(index, 1);
        return;
      }
      elem.toLowerCase();
      var tagLength = elem.length;
      if (tagLength > 20) {
        custom = 'Максимальная длина тега - 20 символов, включая \"#\"!';
      }
      if (tagLength < 2) {
        custom = 'Тэг не может состоять только из \"#\"!';
      }
      if (elem.indexOf('#') !== 0) {
        custom = 'Тэги должны начинаться с символа \"#\"!';
      }
      for (var i = 0; i < index; i++) {
        if (elem === tags[i]) {
          custom = 'Теги не должны повторяться!';
        }
      }
    });
    var amountOfTags = tags.length;
    if (amountOfTags > 5) {
      custom = 'Тегов не может быть больше 5-ти!';
    }
    hashtags.setCustomValidity(custom);
  }
})();
