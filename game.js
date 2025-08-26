var gamePattern=[];
var userClickedPattern=[]
function nextSequence(){
    let x=Math.floor(Math.random()*4);
    return x;
}

var buttonColors=["red", "blue", "green", "yellow"];

function randomChosenColour(){

    let xy=buttonColors[nextSequence()];
    
    gamePattern.push(xy);

$(`#${xy}`).fadeOut(150).fadeIn(150)
var audio=new Audio("./sounds/"+xy+".mp3");
audio.play();
}


$(".btn").click(function(){
    let userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
   
})

