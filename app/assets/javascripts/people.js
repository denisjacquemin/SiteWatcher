
function refreshAllPeople(links, index) {
    if (index == links.length) return;

    $(links[index]).hide();
    $(links[index]).prev('img').show(); // img tag is a spinner

    $.ajax({ url: $(links[index]).attr('href'),
             success: function(data, status, xhr) {
                $(links[index]).parent().prev('.title').html(data.title);
                if (data.has_profiles_linkedin == true) {
                    $(links[index]).parent().parent().find('.linkedin-icon').show();
                }
                if (data.has_profiles_paperjam == true) {
                    $(links[index]).parent().parent().find('.paperjam-icon').show();
                }
                $(links[index]).show();
                $(links[index]).prev('img').hide();
                refreshAllPeople(links, ++index);
             },
             error: function(data, status, xhr) {
                 alert(error);
             }
             
    });
}

(function status() {
    $.ajax({
        url: '/people/status',
        success: function(data) {
            $('#status').html(data);
        },
        complete: function() {
            setTimeout(status, 5000);
        }
    })
})();

