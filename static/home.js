$(document).ready(function(){
	console.log('home');

	$( ".clickable-card" ).hover(
	  function() {
	  	$(this).find(".card").css('background-color', 'lightyellow');
	  }, function() {
	  	$(this).find(".card").css('background-color', 'white');
	  }
	);

});