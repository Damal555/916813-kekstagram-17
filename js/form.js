'use strict';
(function () {

  window.form = {
    uploadFile: window.mock.picturesList.querySelector('#upload-file'),
    pictureEdit: window.mock.picturesList.querySelector('.img-upload__overlay'),
    img: window.mock.picturesList.querySelector('.img-upload__preview img')
  };

  var close = window.mock.picturesList.querySelector('#upload-cancel');

  var hashtag = window.form.pictureEdit.querySelector('.text__hashtags');
  var textarea = window.form.pictureEdit.querySelector('.text__description');

  var flag = false;
  textarea.addEventListener('focus', function () {
    flag = true;
  });
  hashtag.addEventListener('focus', function () {
    flag = true;
  });
  textarea.addEventListener('blur', function () {
    flag = true;
  });
  hashtag.addEventListener('blur', function () {
    flag = false;
  });


  function closeEditor() {
    window.form.pictureEdit.classList.add('hidden');
    document.removeEventListener('keydown', escClose);
    window.form.uploadFile.value = '';
  }

  function escClose(evt) {
    if (evt.keyCode === 27 && !flag) {
      closeEditor();
    }
  }

  close.addEventListener('click', closeEditor);

  window.form.uploadFile.addEventListener('change', function () {
    window.form.pictureEdit.classList.remove('hidden');
    document.addEventListener('keydown', escClose);
    window.formPreview.addCustomPicture();
  });
})();
