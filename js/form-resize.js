'use strict';
(function () {

  window.formResize = {
    init: function () {
      currentPictureSize = 100 + '%';
      window.form.img.style.transform = 'scale(1)';

    }
  };
  var currentPictureSize = window.form.pictureEdit.querySelector('.scale__control--value').value;
  var smaller = window.form.pictureEdit.querySelector('.scale__control--smaller');
  var bigger = window.form.pictureEdit.querySelector('.scale__control--bigger');
  var scaleContainer = window.form.pictureEdit.querySelector('.scale__control--value');

  function getCurrentPictureSize() {
    if (isNaN(currentPictureSize)) {
      //   получим текущее значение инпута с размером картинки и заберем оттуда число без символа процента
      currentPictureSize = Number(currentPictureSize.substring(0, currentPictureSize.length - 1));
    }
    return currentPictureSize;
  }

  function setPictureSize(pictureSize) {
    window.form.img.style.transform = 'scale(' + pictureSize / 100 + ')';
    scaleContainer.value = pictureSize + '%';
  }


  smaller.addEventListener('click', function () {
    currentPictureSize = getCurrentPictureSize();
    // если размер картинки больше 25% то можно еще уменьшить иначе ничего не делаем
    if (currentPictureSize > 25) {
      currentPictureSize -= 25;
    }
    setPictureSize(currentPictureSize);
  });

  bigger.addEventListener('click', function () {
    currentPictureSize = getCurrentPictureSize();
    // если размер картинки меньше 100% то можно еще увеличить иначе ничего не делаем
    if (currentPictureSize < 100) {
      currentPictureSize += 25;
    }
    setPictureSize(currentPictureSize);
  });

})();
