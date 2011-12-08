
function refreshAllPeople(links, index) {
    if (index == links.length) return;

    $(links[index]).hide();
    $(links[index]).prev('img').show(); // img tag is a spinner

    $.ajax({ url: $(links[index]).attr('href'),
             success: function(data, status, xhr) {
                $(links[index]).parent().prev('.title').html(data.title);
                $(links[index]).show();
                $(links[index]).prev('img').hide();
                refreshAllPeople(links, ++index);
             },
             error: function(data, status, xhr) {
                 alert(error);
             }
             
    });
}