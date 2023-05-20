let level = 0
let userInput = 0
let gamePattern = []
let userClickedPattern = []
let colors = ["red", "blue", "green", "yellow"];

function startGame(){
    $(document).keypress(function (e) { 
        if(e.key == 'a'){
            nextSequence();
            buttonClick();
        }
    });
}
startGame();
const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

function nextSequence(){
    $("#level-title").text("Level "+level)
    let randomNumber = Math.floor(Math.random()*4);
    
    let randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeOut("fast").fadeIn("fast");

    
}


function buttonClick(){
    $(".btn").click(function (e) { 
        let userClicked = this.id;
        userClickedPattern.push(userClicked);
        playSound(userClicked);
        $("#"+userClicked).fadeOut("fast").fadeIn("fast");
        checkAnswer();
        

    });
    
}


function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function checkAnswer(){
    if(userInput == level){
        if(compareArrays(userClickedPattern, gamePattern)){
            userInput = 0;
            userClickedPattern = []
            level= level+1
            setTimeout(function () {
                nextSequence();
              }, 1000);
            
        }
        else{
            gameOver()
        }
    }
    else{
        if(userClickedPattern[userInput] == gamePattern[userInput]){
            userInput++;
        }
        else{
            
            gameOver()
        }
        
    }
}

function gameOver(){
    userInput = 0
    userClickedPattern = []
    level = 0
    gamePattern = []
    $("#level-title").text("Press A to Start")
    $(".btn").off();

    let gameOverSound = new Audio("sounds/wrong.mp3")
    gameOverSound.play()

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 100)
    
}