

function namePlayers(){
  // players = {};
  // bootbox.prompt('Player B please write your name you will be red',
  // function(result){
  //
  //   });
  // bootbox.prompt('Player A please write your name you will be blue',
  // function(result){
  //
  //   });
  var playerA_name = prompt('Player A please write your name you will be blue');
  var playerB_name = prompt('Player B please write your name you will be red');
  chips.css('background-color', 'rgb(128, 128, 128)');
   var playerA_color = 'rgb(0, 102, 255)';
   var playerB_color = 'rgb(255, 51, 51)';
   return {'playerA': {'name': playerA_name,
                      'color': playerA_color},
          'playerB': {'name': playerB_name,
                      'color': playerB_color},
          }
};

function switchingColor(chipToColor, playerWhoPlay_color){
    if($(chipToColor).css('background-color') == highlitedChipsColor) {
        $(chipToColor).css('background-color', playerWhoPlay_color);
    }
};

function checkingColumn(clickedChips){
  var column = [];
  var classes = ["one", "two", "three", "four", "five", "six", "seven"]
  for(var j = 0; j < classes.length; j++){
    if($(clickedChips).hasClass(classes[j])){
      column.push($('.'+classes[j]))
      for(var i = column[0].length; i >= 0; i--){
        var color = $(column[0][i]).css('background-color')
            if(color == 'rgb(128, 128, 128)' || color == highlitedChipsColor){
              return {"coloredChip": column[0][i], "selectedColumn": column[0]};
            }
      }
    }
  }
}

function checkingVertically(selectedColumn, playerWhoPlay_color){
  var countingColors = 0;
  for(var i = 0; i < selectedColumn.length; i++){
    if($(selectedColumn[i]).css('background-color') == playerWhoPlay_color){
        countingColors +=1;
        if(countingColors === 4){
          return true;
        }
    } else {
      countingColors = 0;
    }
  }
  return false;
}

function checkingHorizonatally(lastChip, playerWhoPlay_color){
  var countingColors = 0;
  var rowCells = $(lastChip).parent().find('td');

  for(var i = 0; i < rowCells.length; i++){
    if($(rowCells[i]).css('background-color') == playerWhoPlay_color){
        countingColors +=1;
        if(countingColors === 4){
          return true;
        }
    } else {
      countingColors = 0;
    }
  }
  return false;
}  //poziomo


$('document').ready(function(){

  var startGame = $('#start_game')
  countingMoves = 1;
  chips = $('.circle');
  chips.css('background-color', 'rgb(128, 128, 128)');
  highlitedChipsColor = 'rgba(255, 255, 0, 0.7)'
  players =  namePlayers();

  startGame.click(function(){
    players = namePlayers();
    countingMoves = 1;
  });

  chips.mouseover(function(){
    var lastChip = checkingColumn(this);

    for(var i = 0; i < chips.length; i++){
      if(chips.eq(i).css('background-color') == highlitedChipsColor){
        chips.eq(i).css('background-color', 'rgb(128, 128, 128)');
      }
    }
    for(var i = 0; i < lastChip['selectedColumn'].length; i++){
      if(lastChip['selectedColumn'].eq(i).css('background-color') == 'rgb(128, 128, 128)'){
        lastChip['selectedColumn'].eq(i).css('background-color', highlitedChipsColor);
      }
    }
  });

  chips.click(function() {

      if(countingMoves%2){
          playerWhoPlay = players['playerA'];
        }else{
          playerWhoPlay = players['playerB'];
        };

      var lastChip = checkingColumn(this);
      console.log(lastChip);
      switchingColor(lastChip["coloredChip"], playerWhoPlay['color']);
      var vertically = checkingVertically(lastChip['selectedColumn'], playerWhoPlay['color']);
      var horizonally = checkingHorizonatally(lastChip['coloredChip'], playerWhoPlay['color']);
      if (vertically || horizonally){
        alert(`Player ${playerWhoPlay['name']} won`);
      };
      // console.log(lastChip['coloredChip']);
      countingMoves+= 1;

  });

});
