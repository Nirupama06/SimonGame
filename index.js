var colors=["red","blue","green","yellow"];
var gamePattern=[];
var userPattern=[];
var level=0;
var started = false;


//to start new game whenever a key is pressed
$( document ).keydown(function(e) {   
    if (!started) {

        $("#level-title").text("Level " + level);
        newSequence();
        started = true;
      }
  });
  $(".start-game" ).click(function(e) {   
    if (!started) {

        $("#level-title").text("Level " + level);
        newSequence();
        started = true;
      }
  });

//taking users input
$(".btn").click(function(e){
    var userColor = e.target.id;
    userPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);

    checkAns(userPattern.length-1);
});

//generating random new sequence
function newSequence()
{
    userPattern=[];
    level++;
    $(".happy").removeClass("levelup");
    setTimeout(function () {
        $(".happy").addClass("levelup");
    }, 2000);
    $("#level-title").text("Level " + level);
    var rnd= Math.floor(Math.random()*4);
    colorChosen = colors[rnd];
    gamePattern.push(colorChosen);
    $("#"+colorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colorChosen);
}

//play sound corresponding to given color
function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

//animation of button when clicked
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    
    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

//checking answer
function checkAns(currentLevel)
{
        if(gamePattern[currentLevel]===userPattern[currentLevel])
        {
            console.log("success");

            if (userPattern.length === gamePattern.length){
                setTimeout(function () {
                newSequence();
                }, 1000);
            }
        }
        else {
            console.log("wrong");

            playSound("wrong");

            $("body").addClass("game-over");
            $(".cry").removeClass("lost");
            setTimeout(function () {
                $("body").removeClass("game-over");
                $(".cry").addClass("lost");
            }, 2000);

            $("#level-title").text("Game Over, Press Any Key to Restart");

            startOver();
        } 
}

//start-over
function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
  }
