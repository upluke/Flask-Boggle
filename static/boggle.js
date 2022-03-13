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
 
}
