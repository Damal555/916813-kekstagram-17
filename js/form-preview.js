'use strict';
(function () {
  window.formPreview = {
    addCustomPicture: addCustomPicture
  };

  function addCustomPicture() {
    var file = window.form.uploadFile.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      window.form.img.src = reader.result;
    };
  }
})();
