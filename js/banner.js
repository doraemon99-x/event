$(document).ready(function() {
	
	/*
	// Po nacteni dokumentu pridame tridu co startuje animaci
	$('body').addClass('simple-animation-start');
	
	window.setInterval(function(){ 
		$('body').toggleClass('simple-animation-start simple-animation-end');
	}, 2000);		
	*/

	// Po nacteni dokumentu pridame tridu co nuluje stav objektu pro animaci
	$('body').addClass('css-animation-init');
	
	// Po nacteni dokumentu pridame tridu co startuje animaci
	setTimeout(function() {
			$('body').toggleClass('css-animation-init css-animation-start');
	}, 2000);
	
});
