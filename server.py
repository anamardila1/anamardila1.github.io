# import os module
import os

# import flask
from flask import Flask, url_for

# import jinja template engine
from flask import render_template
from flask import request, jsonify
from flask import json

# create an app instance
app = Flask(__name__)

# import data
filename = os.path.join(app.static_folder, 'data.json')

with open(filename) as chord_data:
    chords = json.load(chord_data)["results"]

current_id = 10
review_chords = []

# create a home route
@app.route('/')

# create home method
def home():
    return render_template('home.html')

# make learn route
@app.route('/learn')

# make learn method
def learn():
    return render_template('learn.html')

@app.route('/learn/<chord_name>')
def chord_page(chord_name):
    chord_item = None
    for chord in chords:
        if chord['chord_name'] == chord_name:
            print(chord)
            chord_item = chord
    return render_template('specific_chord.html', chord=chord_item)

@app.route('/get_prev_chord', methods=['GET', 'POST'])
def get_prev_chord():
    global chords

    request_chord = request.get_json()
    chord_idx = int(request_chord['chord_id']) - 1
    prev_chord_idx = -1

    if chord_idx == 0:
        prev_chord_idx = len(chords) - 1
    else:
        prev_chord_idx = chord_idx - 1

    prev_chord_name = chords[prev_chord_idx]['chord_name']

    return jsonify(prev_chord=prev_chord_name)

@app.route('/get_next_chord', methods=['GET', 'POST'])
def get_next_chord():
    global chords

    request_chord = request.get_json()
    chord_idx = int(request_chord['chord_id']) - 1

    next_chord_idx = -1

    if chord_idx == len(chords) - 1:
        next_chord_idx = 0
    else:
        next_chord_idx = chord_idx + 1

    next_chord_name = chords[next_chord_idx]['chord_name']

    return jsonify(next_chord=next_chord_name)

# make compare route
@app.route('/compare')

# make compare method
def compare():
    return render_template('compare.html', chords=chords)

# make quiz instructions route
@app.route('/quiz_instructions')

# make quiz instructions method
def quiz_instructions():
    return render_template('quiz_instructions.html')


# make quiz instructions route
@app.route('/quiz')

# make quiz instructions method
def quiz():
    return render_template('quiz.html', chords=chords)


@app.route('/save_quiz_results', methods=['GET', 'POST'])
def save_quiz_results():
    global review_chords

    saved_chords = request.get_json()
    review_chords = saved_chords['results']

    return jsonify(rev_chords=review_chords)

# make quiz instructions route
@app.route('/quiz_results')

# make quiz instructions method
def quiz_results():
    return render_template('quiz_results.html', review_chords=review_chords)
