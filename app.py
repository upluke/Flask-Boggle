from crypt import methods
from flask import Flask, jsonify, request, render_template, session

from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "dumbonudumb"

boggle_game = Boggle()



@app.route('/')
def home():
  board=boggle_game.make_board()
  highscore=session.get("highscore", 0)
  nplays=session.get("nplay", 0)
  session['board']=board
  return render_template("index.html", board=board, highscore=highscore, nplays=nplays) 

@app.route("/check-word")
def check_word():
    """Check if word is in dictionary."""

    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})
    

@app.route("/post-score", methods=["POST"])
def post_score():
    """Receive score, update nplays, update high score if appropriate."""

    score = request.json["score"]
    highscore = session.get("highscore", 0)
    nplays = session.get("nplays", 0)

    session['nplays'] = nplays + 1
    session['highscore'] = max(score, highscore)

    return jsonify(brokeRecord=score > highscore)