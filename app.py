from flask import Flask, request, render_template

from boggle import Boggle

boggle_game = Boggle()

app = Flask('app')


@app.route('/')
def home():
  new_board=boggle_game.make_board()
  return render_template("home.html", new_board=new_board) 

@app.route('/test' )
def test():
  # word = request.form['word']
  word=request.args['word']
#   print("****", request.form)
  return render_template("test.html", word=word) 
 
  