$(document).ready(function(){
	
	console.log('compare');
	
	listChords();
	nameToAudioGenerator();

	$(document).on("click", ".submit", function(){
		updateChordDisplay(this.id)
	});

	$(document).on("click", "#playBoth", function(){
		
		$("#submit1").click()
		$("#submit2").click()
		document.getElementById('clip1').play();

		setTimeout(() => { document.getElementById('clip2').play(); }, 3500);
	});

});

var nameToAudio = {};

function listChords() {
	for (var i=0; i < chords.length; i++){
		$(".chord-select").append("<option>"+chords[i]["chord_name"]+"</option>");
	}
}

function updateChordDisplay(id){
	
	if (id == "submit1"){
		var chord_chosen = $("#chords1").val();
		$("#chord1_name").html("");
		$("#audio1").html("");
		
		$("#chord1_name").html("Chord 1: " + chord_chosen);
		$("#audio1").html("<br><audio id=\"clip1\" controls><source src=\""+ nameToAudio[chord_chosen] +"\" type=\"audio/mpeg\">Your browser does not support the audio element.</audio>");
	}else{
		var chord_chosen = $("#chords2").val();
		$("#chord2_name").html("");
		$("#audio2").html("");

		$("#chord2_name").html("Chord 2: " + chord_chosen);
		$("#audio2").html("<br><audio id=\"clip2\" controls><source src=\""+ nameToAudio[chord_chosen] +"\" type=\"audio/mpeg\">Your browser does not support the audio element.</audio>");
	}

}

function nameToAudioGenerator(){
	for (var i=0; i < chords.length; i++){
		nameToAudio[chords[i]["chord_name"]] = chords[i]["chord_audio"];
	}

}