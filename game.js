var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var start = false;

function nextSequence()
{
    start = true;
    userClickedPattern = [];
    ++ level;

    var num = Math.floor((Math.random()) * 4);
    var randomChosenColour = buttonColours[num];
    gamePattern.push(randomChosenColour);

    $("#level-title").text("Level "+level);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}

function startOver()
{
    level = 0;
    gamePattern = [];
    start = false;
}

function mistake()
{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(()=>{
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
}

function checkAnswer()
{
    var len = userClickedPattern.length;
    if(userClickedPattern[len-1] === gamePattern[len-1])
    {
        if(userClickedPattern.length === gamePattern.length)
        { 
            nextSequence();
        }
    }
    else
    {
        mistake();
    }
}

function animatePress(currColor)
{
    $("#"+currColor).addClass("pressed");

    setTimeout(()=>{
        $("#"+currColor).removeClass("pressed");
    },100);
}

function playSound(name)
{
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();

}

function handler(val)
{
    var userChosenColour = val;
    userClickedPattern.push(userChosenColour);
    playSound(val);
    animatePress(val);
    checkAnswer();
}

$(".btn").on("click",function() {
    var id = $(this).attr("id");
    handler(id);
    
});

if(!start)
{
    $(document).on("keypress",function () {
        nextSequence();
    });
}