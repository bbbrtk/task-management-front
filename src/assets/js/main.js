var $addFileLink = $('<a href="#" class="btn btn-default">Dodaj kolejny element</a>');
var $newLinkLi = $('<li></li>').append($addFileLink);

function addFileForm($collectionHolder, $newLinkLi) {
    var prototype = $collectionHolder.data('prototype');
    var index = $collectionHolder.data('index');
    var newForm = prototype.replace(/__name__/g, index);
    $collectionHolder.data('index', index + 1);
    var $newFormLi = $('<li></li>').append(newForm);
    addFilesFormDeleteLink($newFormLi);
    $newFormLi.find(".datepicker-input").each(function () {
        $(this).datepicker();
    });
    $newLinkLi.before($newFormLi);
}


function addFilesFormDeleteLink($tagFormLi) {
    var $removeFormA = $('<a href="#" class="remove-file"><i class="fa fa-trash-o"></i> Usuń</a>');
    $tagFormLi.append($removeFormA);

    $removeFormA.on('click', function (e) {
        // prevent the link from creating a "#" on the URL
        e.preventDefault();
        var r = confirm('Czy na pewno chcesz usunąć ten element?');
        if (r !== false) {
            var url = $tagFormLi.data('delete');
            $.post(url);
            // remove the li for the tag form
            $tagFormLi.remove();
        }

    });
}
jQuery(document).ready(function () {
    var $collectionHolder = $('ul.files');
    $collectionHolder.find('li').each(function () {
        addFilesFormDeleteLink($(this));
    });
    $collectionHolder.append($newLinkLi);
    $collectionHolder.data('index', $collectionHolder.find(':input').length);

    $addFileLink.on('click', function (e) {
        e.preventDefault();
        addFileForm($collectionHolder, $newLinkLi);
    });

    $(".delete-submit").on("click", function (e) {
        var r = confirm('Czy na pewno chcesz usunąć ten element?');
        if (r === false) {
            e.preventDefault();
        }
    });

    $('[data-ride="datatablesAjax"]').each(function () {
        var json = $(this).attr('data-json');
        $(this).dataTable({
            "processing": true,
            "dom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "pagingType": "full_numbers",
            "ajax": json,
            "deferRender": true,
            "aaSorting": [],
            "columnDefs": [{"sortable": false, "targets": [-1]}],
            "language": {
                "processing": "Proszę czekać...",
                "lengthMenu": "Pokaż _MENU_ pozycji",
                "zeroRecords": "Nie znaleziono żadnych pasujących indeksów",
                "info": "Pozycje od _START_ do _END_ z _TOTAL_ łącznie",
                "infoEmpty": "Pozycji 0 z 0 dostępnych",
                "infoFiltered": "(filtrowanie spośród _MAX_ dostępnych pozycji)",
                "infoPostFix": "",
                "search": "Szukaj:",
                "url": "",
                "paginate": {
                    "first": "Pierwsza",
                    "previous": "Poprzednia",
                    "next": "Następna",
                    "last": "Ostatnia"
                }
            }
        });
    });


    $('[data-ride="datatables"]').each(function () {
        $(this).dataTable({
            "processing": true,
            "dom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "pagingType": "full_numbers",
            "orderClasses": false,
            "columnDefs": [{"sortable": false, "targets": [-1]}],
            "language": {
                "processing": "Proszę czekać...",
                "lengthMenu": "Pokaż _MENU_ pozycji",
                "zeroRecords": "Nie znaleziono żadnych pasujących indeksów",
                "info": "Pozycje od _START_ do _END_ z _TOTAL_ łącznie",
                "infoEmpty": "Pozycji 0 z 0 dostępnych",
                "infoFiltered": "(filtrowanie spośród _MAX_ dostępnych pozycji)",
                "infoPostFix": "",
                "search": "Szukaj:",
                "url": "",
                "paginate": {
                    "first": "Pierwsza",
                    "previous": "Poprzednia",
                    "next": "Następna",
                    "last": "Ostatnia"
                }
            }
        });
    });
    var $uploadify = $('#uploadifive');
    $uploadify.uploadifive({
        'uploadScript': $uploadify.closest('form').data('script'),
        'auto': true,
        'removeCompleted': true,
        'buttonText': 'Wgraj zdjęcia',
        'fileSizeLimit': '5MB',
        'fileTypeExts': '*.gif; *.jpg; *.png',
        'onInit': function () {
            var images = $('#uploadifive').closest('form').data('image-list');
            $.post(images, function (data) {
                $('#uploadifiveImages').html(data.html);
            });

        },
        'onQueueComplete': function () {
            var images = $('#uploadifive').closest('form').data('image-list');
            $.post(images, function (data) {
                $('#uploadifiveImages').html(data.html);
            });
        },
        'onUploadError': function (file, errorCode, errorMsg, errorString) {
            console.log('The file ' + file.name + ' could not be uploaded: ' + errorString + ' Code: ' + errorCode + ' Msg: ' + errorMsg);
        }
    });


    $('.sortableList').sortable().bind('sortupdate', function () {
        var position = [];
        $(this).find('.list-group-item').each(function () {
            position.push($(this).data('id'));
        });
        var positionJson = JSON.stringify(position);
        var script = $(this).data('script');
        $.post(script, {position: positionJson});
    });
});
