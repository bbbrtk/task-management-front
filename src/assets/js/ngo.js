var _formGallery = $('form[name="fachowo_bundle_corebundle_ngo"]');

var imagesLoad = function(form) {

    if (typeof form === 'undefined') {
        return;
    }

    if (!$('#admin_images_box').length) {
        $('<span id="admin_images_box"></span>').insertAfter($('#uploadifive-fachowo_bundle_corebundle_ngo_gallery_image-queue'));
    }
    var imagexBox = $('#admin_images_box');

    var id = form.data('id');
    var url = form.data('images-list');

    $.ajax({
        url: url,
        type: "POST",
        data: {id: id}
    }).success(function(data){
        imagexBox.html(data.html);
    }).fail(function () {
        alert("Wystąpił błąd aktualizacji pozycji");
    });
};

$('#fachowo_bundle_corebundle_ngo_gallery_image').uploadifive({
    'formData' : {
        'id': _formGallery.data('id')
    },
    'uploadScript': _formGallery.data('script'),
    'auto': true,
    'removeCompleted': true,
    'buttonText': 'Wgraj zdjęcia',
    'fileSizeLimit': '5MB',
    'fileTypeExts': '*.gif; *.jpg; *.png',
    'onInit': function () {
        imagesLoad(_formGallery);
    },
    'onQueueComplete': function () {
        imagesLoad(_formGallery);
    },
    'onUploadError': function (file, errorCode, errorMsg, errorString) {
        console.log('The file ' + file.name + ' could not be uploaded: ' + errorString + ' Code: ' + errorCode + ' Msg: ' + errorMsg);
    }
});

$(_formGallery).on('click', 'i.remove', function(ev) {

    var li = $(this).parent('li');
    var id = li.data('id');
    var url = _formGallery.data('image-delete');

    var r = confirm('Czy na pewno chcesz usunąć ten element?');
    if (r !== false) {
        li.html('<i class="btn-link fa fa-spinner fa-spin fa-2x"></i>');
        $.ajax({
            url: url,
            type: "POST",
            data: {id: id}
        }).success(function (data) {
            li.remove();
        }).fail(function () {
            alert("Wystąpił błąd w usuwaniu pozycji");
        });
    }
});