$(document).ready(function(){
	console.log('quiz');

	shuffle(arr);
	display_question(current_q_num);
	$("a.nav-link").attr("href", "#");
	$("a.nav-link").attr("data-toggle", "modal");
	$("a.nav-link").attr("data-target", "#exampleModal");
	$("h2").css("font-weight", "400");

	$(document).on("click", ".wrong", function(){
		review_chords.push(chords[arr[current_q_num]])
		show_result("wrong")
	});

	$(document).on("click", ".correct", function(){
		show_result("correct")
	});

	$(document).on("click", "#nextButton", function(){
		updateQuestion()
	});

	$(document).on("click", ".nav-link", function(){
		target = $(this).html()
	});

	$(document).on("click", "#leaveButton", function(){
		exit(target)
	});
});

var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var current_q_num = 0;
var target = "";
var review_chords = [];

// got this from online
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function display_question(current_q_num){

	$("#question_num").html("")
	$(".progress").html("")
	$('#curr_audio').html("")
	$('#options').html("")
	$("#result").html("")

	question_num = current_q_num + 1
	audio_url = chords[arr[current_q_num]]['chord_audio']

	$("#question_num").html("Q." + question_num);

	var percentage = current_q_num * 10;

	$(".progress").html("<div class=\"progress-bar\" role=\"progressbar\" style=\"width: "+ percentage + "%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>");
	$(".progress").append("<div class=\"progress-bar progress-bar-striped\" style=\"width:10%;\"></div>");

	$("#curr_audio").html("<audio controls><source src=\"" + audio_url +"\" type=\"audio/mpeg\">Your browser does not support the audio element.</audio>");

	var idx1 = Math.floor(Math.random() * 10);

	while(idx1 == arr[current_q_num]){
		idx1 = Math.floor(Math.random() * 10);
	}

	var idx2 = idx1;
	var idx3 = idx2;

	while (idx2 == idx1 || idx2 == arr[current_q_num]){
		idx2 = Math.floor(Math.random() * 10);
	}

	while (idx3 == idx1 || idx3 == idx2 || idx3 == arr[current_q_num]){
		idx3 = Math.floor(Math.random() * 10);
	}

	var wrong_chord1 = chords[idx1]['chord_name'];
	var wrong_chord2 = chords[idx2]['chord_name'];
	var wrong_chord3 = chords[idx3]['chord_name'];

	var correct_chord = chords[arr[current_q_num]]['chord_name']

	var button1 = "<button type=\"button\" class=\"btn btn-lg btn-primary btn-big-font mc wrong\" id=\""+ wrong_chord1 +"\">" + wrong_chord1 + "</button>";
	var button2 = "<button type=\"button\" class=\"btn btn-lg btn-primary btn-big-font mc wrong\" id=\""+ wrong_chord2 +"\">" + wrong_chord2 + "</button>";
	var button3 = "<button type=\"button\" class=\"btn btn-lg btn-primary btn-big-font mc wrong\" id=\""+ wrong_chord3 +"\">" + wrong_chord3 + "</button>";
	var button4 = "<button type=\"button\" class=\"btn btn-lg btn-primary btn-big-font mc correct\" id=\""+ correct_chord +"\">" + correct_chord + "</button>";
	var buttons = shuffle([button1, button2, button3, button4]);

	$('#options').html("<div class=\"row\">" + "<div class=\"col-1\"></div>" + "<div class=\"col-5 d-grid\">" + buttons[0] + "</div>" + "<div class=\"col-5 d-grid\">" + buttons[1] + "</div><div class=\"col-1\"></div></div>" + "<br></br>" +
		"<div class=\"row\">" + "<div class=\"col-1\"></div>" + "<div class=\"col-sm d-grid\">" + buttons[2] + "</div>" + "<div class=\"col-sm d-grid\">" + buttons[3] + "</div><div class=\"col-1\"></div></div>");
}

function show_result(result){

	$("button.mc").attr("aria-disabled", true);
	$("button.mc").addClass('disabled');

	if(result == "wrong"){
		$("#result").html("<h2 class=\"wrong_result\">Incorrect<h2>");
	}
	else{
		$("#result").html("<h2 class=\"correct_result\">Correct<h2>");
	}

	var nextButtonHTML = "<button type=\"button\" class=\"btn btn-primary\" id=\"nextButton\">Next Question</button>";

	if (current_q_num == 9){
		nextButtonHTML = "<button type=\"button\" class=\"btn btn-primary\" id=\"nextButton\">Get Results</button>";
	}

	$("#result").append(nextButtonHTML)

}

function updateQuestion(){
	current_q_num = current_q_num + 1;

	if (current_q_num == 10){
		save_results()
	}
	else{
		display_question(current_q_num)
	}
}

function save_results(){
	resultsObject = {"results": review_chords}
	$.ajax({
		type: 'POST',
		url: '/save_quiz_results',
		data: JSON.stringify(resultsObject),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		success: function(result){
		  console.log(result)
		  goToResults()
		},
		error: function(request, status, error){
		  console.log('Error');
		  console.log(request);
		  console.log(status);
		  console.log(error);
		}
  });
}

function goToResults(){
	window.location.href = 'http://127.0.0.1:5000/quiz_results'
}

function exit(target){

	var location = "";
	if (target == "Learn"){
		location = "learn"
	}
	if (target == "Compare"){
		location = "compare"
	}
	if (target == "Quiz"){
		location = "quiz_instructions"
	}

	window.location.href = 'http://127.0.0.1:5000/' + location

}

