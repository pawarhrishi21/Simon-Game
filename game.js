var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;

var level = 0;

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    level = 0;
}

function checkAnswer(currentLevelUptoWhichVerification){
    var correct = true;

    if(gamePattern[currentLevelUptoWhichVerification] !== userClickedPattern[currentLevelUptoWhichVerification]){
        correct = false;
    }

    if(correct){
        playSound(userChosenColor);
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(nextSequence(), 1000);
       }
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playSound(colorName){
    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

function animatePress(colorName){
    $("#" + colorName).addClass("pressed");

    setTimeout(function(){$("#" + colorName).removeClass("pressed");},100);
}

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level.toString());
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //Animation
    $("." + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);    
}

$(".btn").on("click",function(event){
    userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    });


$(document).keydown(function(){
    console.log("key press");
     if(gameStarted === false)
     {
         gameStarted = true;
         nextSequence();
     }
});
