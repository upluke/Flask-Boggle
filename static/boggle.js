class BoggleGame {
  /* make a new game at this DOM id */

  constructor(boardId, secs = 60) {
    this.secs = secs; // game length
    // this.showTimer();

    this.score = 0;
    this.words = new Set();
    this.board = $("#" + boardId);

    // every 1000 msec, "tick"
    // this.timer = setInterval(this.tick.bind(this), 1000);

    // $(".add-word", this.board).on("submit", this.handleSubmit.bind(this));
  }
  /* show word in list of words */
  // $(expr, context) = $(context).find(expr)

  showWord(word) {
    $(".words", this.board).append($("<li>", { text: word }));
  }
   /* show score in html */

   showScore() {
    $(".score", this.board).text(this.score);
  }

   /* show a status message */

   showMessage(msg, cls) {
    $(".msg", this.board)
      .text(msg)
      .removeClass()
      .addClass(`msg ${cls}`);
  }

  async handleSubmit(evt){
    evt.preventDefault();
    const $word= $(".word", this.board)
    let word= $word.val();
    if (!word) return;

    if (this.words.has(word)){
      this.showMessage(`Already found ${word}`, "err")
      return;
    }

    // check server for validity
 
    const resp = await axios.get("/check-word", { params: { word: word }});
    if (resp.data.result === "not-word") {
      this.showMessage(`${word} is not a valid English word`, "err");
    } else if (resp.data.result === "not-on-board") {
      this.showMessage(`${word} is not a valid word on this board`, "err");
    } else {
      this.showWord(word);
      this.score += word.length;
      this.showScore();
      this.words.add(word);
      this.showMessage(`Added: ${word}`, "ok");
    }

    $word.val("").focus();
  }

}
