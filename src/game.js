(function () {
  if (typeof Pente === "undefined") {
    window.Pente = {};
  }

  var Game = window.Pente.Game = function () {
    this.colors = ['white', 'black'];
    this.captureTimes = { 'white': 0, 'black': 0 };
  }

  Game.prototype.switchPlayer = function() {
    return this.colors.reverse();
  };

  Game.prototype.currentPlayer = function() {
    return this.colors[0];
  };

  Game.prototype.takeTurn = function(coor) {
    var color = this.currentPlayer();
    window.Board.addStone(color, coor);

    if (window.Board.checkFiveInRow(color, coor)) {
      alert(color + " won!!!")
    }

    window.Board.checkCaptureStones(color, this.colors[1], coor);

    if (this.captureTimes.white >= 5 || this.captureTimes.black >= 5) {
      alert(color + " won!!!")
    }

    this.switchPlayer();
  };

  Game.prototype.incrementCaptureTimes = function(color) {
    this.captureTimes[color] ++;
    console.log(color + " has captured enemy stones! current times: " + this.captureTimes[color] )
  };

})();
