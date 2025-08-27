
// 1. Globalne varijable

let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;


// 2. Helper funkcije

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


// 3. Game logic

function nextSequence() {
    userClickedPattern = []; // resetujemo korisnikov niz za novi nivo

    level++;
    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // Ako je zadnji klik tačan
        if (userClickedPattern.length === gamePattern.length) {
            // Ako je korisnik završio niz, idemo dalje
            setTimeout(nextSequence, 1000);
        }
    } else {
        // Ako nije tačno - game over
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


// 4. Event handleri

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});
