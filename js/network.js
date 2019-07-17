'use strict';
(function () {
  function load(url, onLoadFunc) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onLoadFunc(xhr.response);
      window.filter.activateFilters();
      window.picturePreview.init(xhr.response);
    });
    xhr.open('GET', url);
    xhr.send();
  }
  window.network = {
    removeMock: function () {
      var mockPicts = Array.from(window.mock.picturesList.querySelectorAll('a.picture'));
      for (var i = 0; i < mockPicts.length; i++) {
        window.mock.picturesList.removeChild(mockPicts[i]);
      }
    }
  };

  window.onload = load('https://js.dump.academy/kekstagram/data', addNetImgs);

  function addNetImgs(serverResponse) {
    window.network.removeMock();
    var photos = serverResponse;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(window.mock.createDOMElements(photos, i));
    }
    window.mock.picturesList.appendChild(fragment);
  }

  window.form.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var xhr = new XMLHttpRequest();
    try {
      xhr.open('POST', 'https://js.dump.academy/kekstagram');
      xhr.send(new FormData(document.forms[1]));
      showSuccess();
    } catch (error) {
      showError();
    }
    window.form.close();
  });

  initStateMessages();
  function initStateMessages() {
    var successMessage = document.querySelector('#success').content.cloneNode(true);
    var errorMessage = document.querySelector('#error').content.cloneNode(true);
    successMessage.querySelector('.success').classList.add('visually-hidden');
    errorMessage.querySelector('.error').classList.add('visually-hidden');
    document.querySelector('main').appendChild(successMessage);
    document.querySelector('main').appendChild(errorMessage);

  }

  function showSuccess() {
    var successMessage = document.querySelector('main').querySelector('.success');
    successMessage.classList.remove('visually-hidden');
    successMessage.querySelector('.success__button').addEventListener('click', hideSuccess);
    successMessage.addEventListener('click', hideSuccess);
    document.addEventListener('keydown', hideSuccessEsc);
  }

  function hideSuccessEsc(evt) {
    if (evt.keyCode === 27) {
      hideSuccess();
    }
  }

  function hideSuccess() {
    var successMessage = document.querySelector('main').querySelector('.success');
    successMessage.classList.add('visually-hidden');
    successMessage.querySelector('.success__button').removeEventListener('click', hideSuccess);
    successMessage.removeEventListener('click', hideSuccess);
    document.removeEventListener('keydown', hideSuccessEsc);
  }

  function showError() {
    var errorMessage = document.querySelector('main').querySelector('.error');
    errorMessage.classList.remove('visually-hidden');
    errorMessage.querySelector('.error__button').addEventListener('click', hideError);
    errorMessage.addEventListener('click', hideError);
    document.addEventListener('keydown', hideErrorEsc);
  }

  function hideErrorEsc(evt) {
    if (evt.keyCode === 27) {
      hideError();
    }
  }

  function hideError() {
    var errorMessage = document.querySelector('main').querySelector('.error');
    errorMessage.classList.add('visually-hidden');
    errorMessage.querySelector('.error__button').removeEventListener('click', hideError);
    errorMessage.removeEventListener('click', hideError);
    document.removeEventListener('keydown', hideErrorEsc);
  }
})();
