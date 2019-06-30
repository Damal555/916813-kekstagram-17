'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var AVATAR = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];

var NAME = ['Добрята', 'Шеломоха', 'Пофистал', 'Перкосрак ', 'Рахель', 'Дафна', 'Захава', 'Ядрен', 'Батон', 'Ястер', 'Мордухай', 'Джозефина'];

var amount = 25;
var photos = [];

var step = 0.25;
var scale = 1;

var userPictureTemplate = document.querySelector('#picture').content;
var picturesList = document.querySelector('.pictures');

var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var fileOverlay = document.querySelector('.img-upload__overlay');
var imgPreview = document.querySelector('.img-upload__preview');
var scaleControl = document.querySelector('.scale__control--value');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var imgPreviewEffects = document.querySelector('.img-upload__preview img');
var effectsList = document.querySelector('.effects__list');
var sliderPoint = document.querySelector('.effect-level__pin');
var levelValue = document.querySelector('.effect-level__value');
var levelSlider = document.querySelector('.img-upload__effect-level');
var levelLine = document.querySelector('.effect-level__line');
var levelDepth = document.querySelector('.effect-level__depth');
var flag = false;
var ESC_KEYCODE = 27;
var textArea = document.querySelector('.img-upload__text textarea');

function createRandomNumber(parameter) {
  var randomNumber = Math.floor(Math.random() * parameter);
  return randomNumber;
}

function createRandomData() {
  for (var i = 0; i < amount; i++) {
    var commentsArr = [];
    var amountOfComments = createRandomNumber(COMMENTS.length);

    for (var j = 0; j < amountOfComments; j++) {
      commentsArr[j] = {
        avatar: AVATAR[createRandomNumber(AVATAR.length)],
        message: COMMENTS[createRandomNumber(COMMENTS.length)],
        name: NAME[createRandomNumber(NAME.length)]
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
photos = createRandomData();

function createDOMElements(i) {
  var pictureElement = userPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photos[i].url;
  pictureElement.querySelector('.picture__likes').textContent = photos[i].likes;
  pictureElement.querySelector('.picture__comments').textContent = photos[i].comments.length;
  return pictureElement;
}

function insertFragment() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < amount; i++) {
    fragment.appendChild(createDOMElements(i));
  }
  picturesList.appendChild(fragment);
}
insertFragment();

//    Личный проект: подробности

function showPictureEdit() {
  fileOverlay.classList.remove('hidden');
  scaleControl.value = '100%';
  imgPreview.style.transform = 'scale(1)';
  document.addEventListener('keydown', closeOnEsc);
}
function initPictureEditShowing() {
  uploadFile.addEventListener('change', showPictureEdit);
}
initPictureEditShowing();
initPictureEditHiding();

function initPictureEditHiding() {
  uploadCancel.addEventListener('click', closePictureEdit);
}

uploadCancel.addEventListener('click', closePictureEdit);

function closePictureEdit() {
  fileOverlay.classList.add('hidden');
  uploadFile.value = '';
}
// Масштабирование

function changeScaleSmaller() {
  if (scale <= 1 && scale > 0.25) {
    scale = scale - step;
    imgPreview.style.transform = 'scale(' + scale + ')';
    scaleControl.value = scale * 100 + '%';
  }
}
function decrease() {
  changeScaleSmaller();
}

function changeScaleBigger() {
  if (scale >= 0.25 && scale < 1) {
    scale = scale + step;
    imgPreview.style.transform = 'scale(' + scale + ')';
    scaleControl.value = scale * 100 + '%';
  }
}
function increase() {
  changeScaleBigger();
}

function changingScale() {
  scaleControlSmaller.addEventListener('mouseup', decrease);
  scaleControlBigger.addEventListener('mouseup', increase);
}
changingScale();

// Наложение эффектов

function initEffectchange() {
  effectsList.addEventListener('click', function () {
    var effectType = document.querySelector('input.effects__radio:checked').value;
    imgPreviewEffects.classList = '';
    imgPreviewEffects.classList.add('effects__preview--' + effectType);
    sliderPoint.style.left = '100%';
    levelDepth.style.width = '100%';
    levelValue.value = 100;
    changeEffectValue(100);
  });
}
initEffectchange();
//   Изменение уроня эффектов

function levelEffects() {
  var sliderX = levelLine.getBoundingClientRect().left;
  var mouseX = event.pageX;
  var levelLineWdt = levelLine.offsetWidth;
  var sliderPointCoordinate = (mouseX - sliderX) / levelLineWdt * 100;
  if (sliderPointCoordinate <= 0) {
    sliderPointCoordinate = 1;
  }
  if (sliderPointCoordinate >= 100) {
    sliderPointCoordinate = 100;
  }
  sliderPoint.style.left = sliderPointCoordinate + '%';
  levelDepth.style.width = sliderPointCoordinate + '%';
  levelValue.value = Math.round(sliderPointCoordinate);
  return sliderPointCoordinate;
}
levelSlider.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = levelLine.getBoundingClientRect().left;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = startCoords - moveEvt.clientX;

    startCoords = moveEvt.clientX;
    var perc = levelEffects();
    changeEffectValue(perc);
    sliderPoint.style.left = (sliderPoint.offsetLeft - shift) + 'px';
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    onMouseMove(upEvt);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

function hideSlider() {
  levelSlider.classList.add('hidden');
}
hideSlider();

function showSlider() {
  levelSlider.classList.remove('hidden');
}

function changeEffectValue(perc) {
  var effectType = document.querySelector('input.effects__radio:checked').value;
  showSlider();
  if (effectType === 'none') {
    hideSlider();
    imgPreviewEffects.classList = '';
    imgPreviewEffects.style.filter = '';
  }
  if (effectType === 'chrome') {
    imgPreviewEffects.style.filter = 'grayscale(' + perc / 100 + ')';
  }
  if (effectType === 'sepia') {
    imgPreviewEffects.style.filter = 'sepia(' + perc / 100 + ')';
  }
  if (effectType === 'marvin') {
    imgPreviewEffects.style.filter = 'invert(' + perc + '%' + ')';
  }
  if (effectType === 'phobos') {
    imgPreviewEffects.style.filter = 'blur(' + perc / 100 * 3 + 'px' + ')';
  }
  if (effectType === 'heat') {
    imgPreviewEffects.style.filter = 'brightness(' + (1 + perc / 100 * 2) + ')';
  }
}
// Комментарии

function addFlagChangerOnFocus() {
  textArea.addEventListener('focus', function () {
    flag = true;
  });
}

function addFlagChangerOnBlur() {
  textArea.addEventListener('blur', function () {
    flag = false;
  });
}

addFlagChangerOnFocus();
addFlagChangerOnBlur();

function closeOnEsc(evt) {
  if (!flag && evt.keyCode === ESC_KEYCODE) {
    closePictureEdit();
    document.removeEventListener('keydown', closeOnEsc);
  }
}
