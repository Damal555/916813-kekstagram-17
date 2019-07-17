'use strict';
(function () {


  var SLIDER_WIDTH = 455;
  var SLIDER_PIN_WIDTH = 18;
  var effects = Array.from(window.form.pictureEdit.querySelectorAll('.effects__radio'));
  var slider = window.form.pictureEdit.querySelector('.img-upload__effect-level');
  var sliderDepth = window.form.pictureEdit.querySelector('.effect-level__depth');
  var sliderPin = window.form.pictureEdit.querySelector('.effect-level__pin');
  var sliderInput = window.form.pictureEdit.querySelector('.effect-level__value');
  sliderInput.value = 100;
  slider.classList.add('hidden');

  function setEffect() {
    slider.classList.remove('hidden');
    if (event.target.value === 'none') {
      slider.classList.add('hidden');
    }
    window.form.img.classList = '';
    window.form.img.classList.add('effects__preview--' + event.target.value);
    setPinValue(SLIDER_WIDTH);
    changeStyle();
  }

  for (var i = 0; i < effects.length; i++) {
    effects[i].addEventListener('change', setEffect);
  }

  function onMouseUpPin(evt) {
    evt.preventDefault();
    slider.removeEventListener('mousemove', onMouseMovePin);
    slider.removeEventListener('mouseup', onMouseUpPin);
    slider.removeEventListener('mouseleave', onMouseUpPin);
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
    slider.addEventListener('mouseleave', onMouseUpPin);

  }

  function movePin(evt) {
    // pin position, PX
    var pinPosition = evt.pageX - slider.getBoundingClientRect().left + pageXOffset;

    // не даем пину уехать за слайдер
    if (pinPosition <= SLIDER_PIN_WIDTH) {
      pinPosition = SLIDER_PIN_WIDTH;
    }
    pinPosition -= SLIDER_PIN_WIDTH;
    // теперь мышью мы двигаем центр пина а не его край

    if (pinPosition > SLIDER_WIDTH) {
      pinPosition = SLIDER_WIDTH;
    }
    setPinValue(pinPosition);
  }

  function setPinValue(valInPX) {
    // визуально двигаем слайдер на pinposition пикселей
    sliderPin.style.left = valInPX + 'px';
    sliderDepth.style.width = valInPX + 'px';
    // добавляем значение в процентах в инпут для формы и вычисления глубины эффекта
    // таким образом мы получаем значение слайдера в процентах по формуле процент = значение/максимум*100
    var percentFromSlider = valInPX / SLIDER_WIDTH * 100;
    sliderInput.value = percentFromSlider;
  }

  slider.addEventListener('mousedown', onMouseDownPin);

  sliderPin.style.cursor = 'pointer';

  function changeStyle() {
    var type = document.querySelector('input.effects__radio:checked').value;
    var perc = sliderInput.value;
    var change = window.form.pictureEdit.querySelector('.effects__preview--' + type);
    if (type === 'none') {
      change.style.filter = '';
    }
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
      change.style.filter = 'brightness(' + (1 + 2 * perc / 100) + ')';
    }
  }


})();
