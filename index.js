const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = []
let started = false;
let level = 0;
let highestLevel = 0;

//detect key press
//when start in click
$(".start").click(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
     $(".start").text("In Game");
//change color of start button
    nextSequence();
    started = true;
  }
});

//create color pattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//check user click/press
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over");
      $(".start").text("Restart");
      
    $(".bestLevel").text("Level "+level + " Reached" );  
    
      if(highestLevel > level){
      $(".highestLevel").text("You Didn't Beat Level" + highestLevel );
      }else{
          $(".highestLevel").text( "Beat This Level" );
          
          highestLevel = level;
      }
      
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
} 

//playsound
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//capture click events
$(".btn").click(function() {
  
  if(started) {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  
  checkAnswer(userClickedPattern.length-1);
  }
});

//animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//reset value
//restart game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
