

function shuffle(array) {
    // var shuffledArr = [];


     var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function Game() {

	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();


} 

function generateWinningNumber() {


   return Math.floor(Math.random()* 100 + 1);

}  

Game.prototype.difference = function() { return Math.abs(this.playersGuess - this.winningNumber); };
Game.prototype.isLower = function() { return this.playersGuess < this.winningNumber ? true : false;};
Game.prototype.playersGuessSubmission = function(num) { 
           if(typeof num != 'number' || num <1 || num > 100) throw "That is an invalid guess.";
	       else   this.playersGuess = num;
  
	       return this.checkGuess(); };


Game.prototype.checkGuess = function() {
    

    if(this.playersGuess === this.winningNumber) {
         $('#subtitle').text('Click the reset button');
         $('#hint, #submit').prop("disabled",true);
         return 'You Win!';
       }
    if(this.pastGuesses.indexOf(this.playersGuess) >=0) return 'You have already guessed that number.';
    this.pastGuesses.push(this.playersGuess);
    
    var index = this.pastGuesses.length;
    //console.log(index);
    $('#guesses li:nth-child('+index+')').text(this.playersGuess);

    if(this.pastGuesses.length === 5) {
      $('#subtitle').text('Click the reset button');
      $('#hint, #submit').prop("disabled",true);
      return 'You Lose.';
    }

    if(this.isLower()) $('#subtitle').text('Guess higher!');
    else $('#subtitle').text('Guess lower!');

    if(this.difference() < 10) return 'You\'re burning up!';
    if(this.difference() < 25) return 'You\'re lukewarm.';
    if(this.difference() < 50) return 'You\'re a bit chilly.';
    if(this.difference() < 100) return 'You\'re ice cold!';
    			
    };

    var newGame = function() { return new Game();  };

Game.prototype.provideHint = function() {

	var hintArr = [null,null,null];
	hintArr[0] = this.winningNumber;
	hintArr[1] = generateWinningNumber();
	hintArr[2] = generateWinningNumber();


	return shuffle(hintArr);

}

function gotGuess(game) {
 var guess =  +$('#player-input').val();
 $('#player-input').val('');
 var message = game.playersGuessSubmission(guess);
 $('#title').text(message);

 }

$(document).ready(function() {
 
 var game = newGame();

 $('#submit').on('click',function(e) { gotGuess(game);});
 $('#player-input').on('keypress',function(e) {
       if(e.which == 13) gotGuess(game); });
 $('#hint').on('click', function() {
       var hintsStr = game.provideHint().join('  ');
       $('#title').text(hintsStr);
 });
$('#reset').on('click',function() {
       game = newGame();
       $('.guess').text('-');
       $('#title').text('Play Guessing Game!');
       $('#subtitle').text('Guess a number between 1 and 100!');
       $('#hint, #submit').prop("disabled",false);
})

});


















