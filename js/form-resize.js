'use strict';
(function () {

  var smaller = window.form.pictureEdit.querySelector('.scale__control--smaller');
  var bigger = window.form.pictureEdit.querySelector('.scale__control--bigger');
  var scaleContainer = window.form.pictureEdit.querySelector('.scale__control--value');
  var scale = window.form.pictureEdit.querySelector('.scale__control--value').value;

  smaller.addEventListener('click', function () {
    if (isNaN(scale)) {
      scale = Number(scale.substring(0, scale.length - 1));
    }
    if (scale > 25) {
      scale -= 25;
    }
    window.form.img.style.transform = 'scale(' + scale / 100 + ')';
    scaleContainer.value = scale + '%';
  });

  bigger.addEventListener('click', function () {
    if (isNaN(scale)) {
      scale = Number(scale.substring(0, scale.length - 1));
    }
    if (scale < 100) {
      scale += 25;
    }
    window.form.img.style.transform = 'scale(' + scale / 100 + ')';
    scaleContainer.value = scale + '%';
  });

})();
