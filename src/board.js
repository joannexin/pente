(function () {
  if (typeof Pente === "undefined") {
    window.Pente = {};
  }

  var Board = window.Pente.Board = function () {
    this.grid = this.createGrid();
  }

  Board.prototype.createGrid = function() {
    var grid = [];
    for (var i = 0; i <= 15; i++) {
      grid[i] = [];
      for (var j = 0; j <= 15; j++) {
        grid[i][j] = { stone: undefined };
      }
    }
    return grid;
  };

  Board.prototype.addStone = function(color, coor) {
    return this.grid[coor[0]][coor[1]].stone = new window.Pente.Stone(color);
  };

  Board.prototype.hasColor = function(color, coor) {
    if (!this.grid[coor[0]] || !this.grid[coor[0]][coor[1]] || !this.grid[coor[0]][coor[1]].stone) {
      return false;
    }
    return this.grid[coor[0]][coor[1]].stone.color === color ? true : false;
  };

  // functions to check wether there are five in a row
  Board.prototype.checkFiveInRow = function(color, coor) {
    var i = coor[0], j = coor[1], that = this;
    var horizontal = [[i, j + 4], [i, j + 3], [i, j + 2], [i, j + 1], [i, j], [i, j - 1], [i, j - 2], [i, j - 3], [i, j - 4]];
    var vertical = [[i + 4, j], [i + 3, j], [i + 2, j], [i + 1, j], [i, j], [i - 1, j], [i - 2, j], [i - 3, j], [i - 4, j]];
    var diag1 = [[i + 4, j - 4], [i + 3, j - 3], [i + 2, j - 2], [i + 1, j - 1], [i, j], [i - 1, j + 1], [i - 2, j + 2], [i - 3, j + 3], [i - 4, j + 4]];
    var diag2 = [[i - 4, j - 4], [i - 3, j - 3], [i - 2, j - 2], [i - 1, j - 1], [i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3], [i + 4, j + 4]];

    var list = [horizontal, vertical, diag1, diag2];
    for (var i = 0; i < list.length; i++) {
      if (that.hasFive(color, list[i])) {
        return true;
      }
    }
    return false;
  };

  Board.prototype.hasFive = function(color, coors) {
    var count = 0;
    for (var i = 0; i < coors.length; i++) {
      if (count >= 5) { return true; }
      if (this.hasColor(color, coors[i])) {
        count ++;
      } else {
        count = 0;
      }
    }
    return count >= 5 ? true : false;
  };

  // functions to capture enemy stones
  Board.prototype.checkCaptureStones = function(color, otherColor, coor) {
    var i = coor[0], j = coor[1], that = this;
    var list = [
      [[i, j + 1], [i, j + 2], [i, j + 3]],
      [[i, j - 1], [i, j - 2], [i, j - 3]],
      [[i + 1, j], [i + 2, j], [i + 3, j]],
      [[i - 1, j], [i - 2, j], [i - 3, j]],
      [[i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]],
      [[i - 1, j + 1], [i - 2, j + 2], [i - 3, j + 3]],
      [[i - 1, j - 1], [i - 2, j - 2], [i - 3, j - 3]],
      [[i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]]
    ]

    for (var i = 0; i < list.length; i++) {
      that.captureStones(color, otherColor, list[i]);
    }
  };

  Board.prototype.captureStones = function(color, otherColor, coors) {
    if (this.hasColor(otherColor, coors[0]) && this.hasColor(otherColor, coors[1]) && this.hasColor(color, coors[2])) {
      this.deleteStones(coors[0], coors[1], otherColor);
      window.Game.incrementCaptureTimes(color);
      return true;
    }
    return false;
  };

  Board.prototype.deleteStones = function(coor1, coor2, otherColor) {
    var that = this;
    [coor1, coor2].forEach(function(coor) {
      that.grid[coor[0]][coor[1]].stone = undefined;
      var strCoor = coor.join(',');
      $('.square[attr-coor="' + strCoor + '"]').removeClass(otherColor);
    })
  };

})();
