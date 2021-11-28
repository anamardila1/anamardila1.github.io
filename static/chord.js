$(document).ready(function(){
  console.log('chord');

  $("h1").css('font-size', '2.5rem');
  $("h1").css('padding-bottom', '1rem');
  $("p").css('margin-bottom', '1rem');
  $("ul").css('margin-bottom', '0rem');


  display_chord_info(chord);

  $(document).on('keydown',function(e) {
    if(e.which == 37) {
      prevButton.click();
    }
  });

  $(document).on('keydown',function(e) {
    if(e.which == 39) {
      nextButton.click();
    }
  });

  $("header").css('padding-bottom', '0.5rem');

});

const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const learnButton = document.querySelector("#learnButton");

prevButton.addEventListener('click', getPrevChord);
nextButton.addEventListener('click', getNextChord);
learnButton.addEventListener('click', goToLearn);

function display_chord_info(chord){
  name = chord['chord_name']
  img_url = chord['chord_img']
  audio_url = chord['chord_audio']

  $("#chord_name").html("Chord: " + name);
  $('#chord_img').attr('src', img_url);
  $("#curr_audio").html("<audio controls><source src=\"" + audio_url +"\" type=\"audio/mpeg\">Your browser does not support the audio element.</audio>")
}

function getPrevChord(){
  idObject = {'chord_id': chord['id']}
  $.ajax({
    type: 'POST',
    url: '/get_prev_chord',
    data: JSON.stringify(idObject),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function(result){
      console.log(result)
      let prev_chord_name = result['prev_chord'];
      window.location.href = 'http://127.0.0.1:5000/learn/' + prev_chord_name
    },
    error: function(request, status, error){
      console.log('Error');
      console.log(request);
      console.log(status);
      console.log(error);
    }
  });
}

function getNextChord(){
  idObject = {'chord_id': chord['id']}
  $.ajax({
    type: 'POST',
    url: '/get_next_chord',
    data: JSON.stringify(idObject),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function(result){
      console.log(result)
      let next_chord_name = result['next_chord'];
      window.location.href = 'http://127.0.0.1:5000/learn/' + next_chord_name
    },
    error: function(request, status, error){
      console.log('Error');
      console.log(request);
      console.log(status);
      console.log(error);
    }
  });
}

function goToLearn(){
  window.location.href = 'http://127.0.0.1:5000/learn'
}