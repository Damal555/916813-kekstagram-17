'use strict';
(function () {

  window.filter = {
    filters: document.querySelector('.img-filters'),
    activateFilters: function () {
      window.filter.filters.classList.remove('img-filters--inactive');
      addListenersToFilters();
    }
  };

  var currentFilter = '';
  var amountOfHiddenPicts = 15;

  function debounce(callback) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, 500);
    };
  }

  function addListenersToFilters() {
    var filterButtons = window.filter.filters.querySelectorAll('.img-filters__button');
    filterButtons.forEach(function (elem) {
      elem.addEventListener('click', function () {
        window.filter.filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
        event.target.classList.add('img-filters__button--active');
        currentFilter = event.target.id;
        debounce(changeShownImages(currentFilter));
      });
    });
    addIndexToImage();
  }

  function addIndexToImage() {
    var img = window.mock.picturesList.getElementsByClassName('picture');
    for (var i = 0; i < img.length; i++) {
      img[i].order = i + 1;
    }
  }

  function generateRandomNumbers(amount, max) {
    var temp = [];
    for (var i = 0; i < amount; i++) {
      var randNum = Math.ceil(Math.random() * max);
      while (temp.includes(randNum)) {
        randNum = Math.ceil(Math.random() * max);
      }
      temp[i] = randNum;
    }
    return temp;
  }

  function sort(source, type, randomNumbers) {
    return Array
      .from(source)
      .sort(function (elem, next) {
        switch (type) {
          case 1:
            var temp = elem.order - next.order;
            break;
          case 2:
            var order = next.order;
            temp = randomNumbers.includes(order);
            if (temp) {
              next.classList.add('hidden');
            }
            if (randomNumbers.includes(25) && order === 24) {
              elem.classList.add('hidden');
            }
            break;
          case 3:
            temp = next.querySelector('.picture__comments').textContent - elem.querySelector('.picture__comments').textContent;
            break;
        }
        return temp;
      });
  }
  function showAllImages(source) {
    for (var i = 0; i < 25; i++) {
      source[i].classList.remove('hidden');
    }
  }

  function changeShownImages(filter) {
    var images = window.mock.picturesList.getElementsByClassName('picture');
    showAllImages(images);

    if (filter === 'filter-popular') {
      images = sort(images, 1);
    }

    if (filter === 'filter-new') {
      images = sort(images, 2, generateRandomNumbers(amountOfHiddenPicts, 24));
    }

    if (filter === 'filter-discussed') {
      images = sort(images, 3);
    }
    window.network.removeMock();
    window.mock.insertFragment(images.length, images);

  }

})();
