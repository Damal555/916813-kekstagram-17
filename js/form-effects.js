'use strict';
(function () {


  var effects = Array.from(window.form.pictureEdit.querySelectorAll('.effects__radio'));
  var slider = window.form.pictureEdit.querySelector('.img-upload__effect-level');
  var sliderDepth = window.form.pictureEdit.querySelector('.effect-level__depth');
  var sliderPin = window.form.pictureEdit.querySelector('.effect-level__pin');
  var sliderInput = window.form.pictureEdit.querySelector('.effect-level__value');
  slider.classList.add('hidden');

  function setEffect() {
    slider.classList.remove('hidden');
    if (event.target.value === 'none') {
      slider.classList.add('hidden');
    }
    window.form.img.classList = '';
    window.form.img.classList.add('effects__preview--' + event.target.value);
    changeStyle();
  }

  for (var i = 0; i < effects.length; i++) {
    effects[i].addEventListener('change', setEffect);
  }

  function onMouseUpPin(evt) {
    evt.preventDefault();
    slider.removeEventListener('mousemove', onMouseMovePin);
    slider.removeEventListener('mouseup', onMouseUpPin);
    movePin(evt);
    changeStyle();
  }

  function onMouseMovePin(evt) {
    evt.preventDefault();
    movePin(evt);
    changeStyle();
  }

  function onMouseDownPin(evt) {
    evt.preventDefault();
    slider.addEventListener('mousemove', onMouseMovePin);
    slider.addEventListener('mouseup', onMouseUpPin);

  }

  function movePin(evt) {
    var pos = evt.pageX - slider.getBoundingClientRect().left + pageXOffset;
    if (pos <= 0) {
      pos = 1;
    }
    pos /= 4.62;
    if (pos > 100) {
      pos = 100;
    }
    sliderPin.style.left = pos + '%';
    sliderDepth.style.width = pos + '%';
    sliderInput.value = pos;
  }

  slider.addEventListener('mousedown', onMouseDownPin);

  sliderPin.style.cursor = 'pointer';

  function changeStyle() {
    var type = document.querySelector('input.effects__radio:checked').value;
    var perc = sliderInput.value;
    var change = window.form.pictureEdit.querySelector('.effects__preview--' + type);
    if (type === 'chrome') {
      change.style.filter = 'grayscale(' + Math.round(perc) + '%)';
    }
    if (type === 'sepia') {
      change.style.filter = 'sepia(' + perc + '%)';
    }
    if (type === 'marvin') {
      change.style.filter = 'invert(' + perc + '%)';
    }
    if (type === 'phobos') {
      change.style.filter = 'blur(' + 3 * perc / 100 + 'px)';
    }
    if (type === 'heat') {
      change.style.filter = 'brightness(' + 1 + 2 * perc / 100 + ')';
    }
  }


})();