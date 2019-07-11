'use strict';
(function () {
  function load(url, onLoadFunc) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', function () {
      onLoadFunc(xhr.response);
      window.filter.activateFilters();
    });
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
})();
