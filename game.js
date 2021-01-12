var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = true;

function nextSequence() {
  // a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  // using the random number, a random item from the buttonColours array gets selected and pushed in a different array called gamePattern.
  var randomChosenColour = buttonColours[randomNumber];
  level = level + 1;
  gamePattern.push(randomChosenColour);
  // the random color selected from buttoncolours array gets associated with a button with the same colour to flash.
  $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
  $("h1").text("level " + level);
}

$(".btn").click(function() {
  if (level >= 1) {
    var self = $(this);
    var userChosenColour = self.attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(self);
    if (gamePattern.toString() === userClickedPattern.toString()) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }

    if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]) {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 300);
      $("h1").text("Game Over, Refresh page to Restart");
    }
  }

});

// the random colour gets associated with a corresponding audio to play.
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  currentColour.addClass("pressed");
  setTimeout(function() {
    currentColour.removeClass("pressed");
  }, 100);
}

$(document).keydown(function() {
  if (started) {
    nextSequence();
    started = false;
  }
});
