	
$(document).ready( function()
{
			
	$('#subscribeCityEmail').focus(function() {
		if($(this).val()=='Votre email')
		{
			$(this).val('');
		}
	});

	$('#subscribeCityEmail').blur(function() {
		if($(this).val()=='')
		{
			$(this).val('Votre email');
		}
	});

	function checkEmail(email)
	{
		var pattern = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return pattern.test(email);
	}
	
	$('#subscribeCity').submit(function() {
		if($('#subscribeCityEmail').val()=='' || $('#subscribeCityEmail').val()=='Votre email')
		{
			$('#search').removeClass('noerrorH');
			$('#search').addClass('errorH');
			alert('Veuillez indiquer votre email.');
			return false;
		}

		if(!checkEmail($('#subscribeCityEmail').val()))
		{
			$('#search').removeClass('noerrorH');
			$('#search').addClass('errorH');
			alert('Veuillez indiquer une adresse email valide.');
			return false;
		}
	});
	$('#cityHome').submit(function() 
    {
        if($('#email').val().length)
        {
            if(!checkEmail($('#email').val()))
            {
                alert('Veuillez indiquer une adresse email valide.');
                return false;
            }
       }
	});
	$('#subscribeParners').submit(function() {
		if ($('#email').val().length) {
			if (!checkEmail($('#email').val())) {
				alert('Veuillez indiquer une adresse email valide.');
				return false;
			}
		} else {
			alert('Veuillez indiquer votre email.');
			return false;
		}
	});
	
	$('#emailBanner2').focus(function() {
		if($(this).val()=='Votre e-mail')
		{
			$(this).val('');
		}
	});

	$('#emailBanner2').blur(function() {
		if($(this).val()=='')
		{
			$(this).val('Votre e-mail');
		}
	});
	
	$('#subscribeBanner2').submit(function() {
		if ($('#emailBanner2').val().length) {
			if (!checkEmail($('#emailBanner2').val())) {
				alert('Veuillez indiquer une adresse email valide.');
				return false;
			}
		} else {
			alert('Veuillez indiquer votre email.');
			return false;
		}
	});
	
	$('#subscribeBanner').submit(function() {
		if ($('#emailBanner').val().length) {
			if (!checkEmail($('#emailBanner').val())) {
				alert('Veuillez indiquer une adresse email valide.');
				return false;
			}
		} else {
			alert('Veuillez indiquer votre email.');
			return false;
		}
	});
});