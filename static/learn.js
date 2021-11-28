$(document).ready(function(){

	$(document).on("click", ".chord", function(){
		var chord_name = this.id;
		goToChord(chord_name)
	});

	if($('.title').html() == "Quiz Instructions"){
		$("h1").css('padding-bottom', '0rem');
	}

	if($('.title').html() == "Learn"){
		$("header").css('padding-bottom', '0rem');
	}

});

const startButton = document.querySelector('#startButton');
if (startButton !== null){
  startButton.addEventListener('click', goToQuiz);
}

//---------- CONTROLLER

function goToChord(chord_name){
	window.location.href = 'http://127.0.0.1:5000/learn/' + chord_name
}

function goToQuiz(){
	window.location.href = 'http://127.0.0.1:5000/quiz'
}
