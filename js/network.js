'use strict';
(function () {
  function load(url, onLoadFunc) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', function () {
      onLoadFunc(xhr.response);
      window.picturePreview.init(xhr.response);
    });
  }

  window.onload = load('https://js.dump.academy/kekstagram/data', addNetImgs);


  function removeMock() {
    var mockPicts = Array.from(window.mock.picturesList.querySelectorAll('a.picture'));
    for (var i = 0; i < mockPicts.length; i++) {
      window.mock.picturesList.removeChild(mockPicts[i]);
    }
  }

  function addNetImgs(serverResponse) {
    removeMock();

    var photos = serverResponse;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(window.mock.createDOMElements(i, photos));
    }
    window.mock.picturesList.appendChild(fragment);
  }
})();
