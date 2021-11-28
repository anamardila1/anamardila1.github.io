$(document).ready(function(){

	console.log('quiz results');

	console.log(review_chords);
	display_chords_missed(review_chords)

});

//---------- VIEW

const takeAgainButton = document.querySelector('#takeAgainButton');

//---------- CONTROLLER

takeAgainButton.addEventListener('click', goToQuiz);


function goToQuiz(){
	window.location.href = 'http://127.0.0.1:5000/quiz_instructions'
}

function display_chords_missed(review_chords){

	var num_correct = 10 - review_chords.length;

	$("#score").html(num_correct + "/10")

	for (var i = 0; i < review_chords.length; i++){
		$("#missed_chords").append("<span class=\"missed-chord\">- " + review_chords[i]['chord_name'] + "</p>")
	}
}

