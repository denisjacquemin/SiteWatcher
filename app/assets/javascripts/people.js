function refreshAllPeople() {
    $('.refresh').each(function(){
        $(this).click();
    })
}

$('.refresh').on('click', function(event) {
   $(this).hide();
   $(this).prev('img').show(); 
});

$('.refresh').on('ajaxStop', function(event) {
   $(this).show();
   $(this).prev('img').hide(); 
});