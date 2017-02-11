$(document).ready(function() {
	for (var i = 0; i < 15; i++) {
		var row = $("<div class='row'></div>");
		for (var j = 0; j < 15; j++) {
			var square = $("<span class='square' attr-coor='" + [i,j] + "' ></span>");
			square.appendTo(row);
			row.appendTo('#container');
		}
	}

	$(".square").on("click", function() {
		var color = window.Game.currentPlayer();
		var coor = $(this).attr('attr-coor').split(',').map(function(str) { return Number(str) });
		$(this).addClass(color);
		window.Game.takeTurn(coor);
	})
})
