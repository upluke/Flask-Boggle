from crypt import methods
from flask import Flask, request, render_template, session

from boggle import Boggle

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = "dumbonudumb"

@app.route('/')
def home():
  new_board=boggle_game.make_board()
  
  session['board']=new_board
  return render_template("index.html", new_board=new_board) 

@app.route('/test', methods=["POST"] )
def test():
  if request.method == "POST":
    word = request.form.get('word')
    print(word)
#   word=request.args['word']
#   print("****", request.form)
    return render_template("test.html", word=word) 
 
  