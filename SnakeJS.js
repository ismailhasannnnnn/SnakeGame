let ctx;
let mySnake;
let myFood, score;
let foodPos;
let snakePos;
let snakeSize = 10;
let canvasSize = 600;
let tailGrowthRate = 1;
let tailColor;
let ateFood = false;
let scoreNumber = 0;
let scores = [];
let highScore;
let snakeX = [];
let snakeY = [];
let snakeBoxes = [];
let left, right, up, down = false;
let intervalTime = 75;
let easy = true;
let hard = false;
let xhttp = new XMLHttpRequest();
let newFoodX;
let newFoodY;
let snakeColor1;
let snakeColor2;
let intervalUpdate = false;
let myName;
let startSound = new Audio('sound.wav');
let endSound = new Audio('buzzer.wav');
startSound.volume = 0.05;
endSound.volume = 0.05;



function startGame() {
    mySnakeGame.start();
    startSound.play();
    if(myName == "Karin" || myName == "karin"){
        snakeColor1 = "#0000b2";
        snakeColor2 = "#000000"
    }else if(myName == "David" || myName == "david"){
        snakeColor1 = "#A31F34";
        snakeColor2 = "black";
    }else if(myName == "Marcus" || myName == "marcus"){
        snakeColor1 = "green";
        snakeColor2 = "purple";
    }else if(myName == "Nora" || myName == "nora"){
        snakeColor1 = "#EE3D96";
        snakeColor2 = "purple";
    }else if(myName == "Michael" || myName == "michael"){
        snakeColor1 = "black";
        snakeColor2 = "purple";
    }else if(myName == "Sam" || myName == "sam"){
        snakeColor1 = "#40E0D0";
        snakeColor2 = "#000080";
    }
    else{
        snakeColor1 = "#EE3D96";
        snakeColor2 = "lime";
    }
    mySnake = new Component(snakeSize, snakeSize, snakeColor1, startPos(), startPos());
    newFoodX = randFoodNumber(1, mySnakeGame.canvas.width);
    newFoodY = randFoodNumber(1, mySnakeGame.canvas.height);
    myFood = new Component(snakeSize, snakeSize, "blue", foodFlooringX(), foodFlooringY());
    console.log(myFood.x + "  " + myFood.y);
    // score = new Component("50px", "Consolas", "black", 50, 50, "text");
    // highScore = new Component("50px", "Consolas", "black", 200, 850, "text");
}

function Component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    ctx = mySnakeGame.context;
    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.updatePiece = function() {
        ctx = mySnakeGame.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    };
    this.newPos = function() {
        this.x += this.speedX*10;
        this.y += this.speedY*10;
    };
    this.eat = function(object){
        let myLeft = this.x;
        let myRight = this.x + (this.width/2);
        let myTop = this.y;
        let myBottom = this.y + (this.height/2);
        let otherLeft = object.x;
        let otherRight = object.x + (object.width/2);
        let otherTop = object.y;
        let otherBottom = object.y + (object.height/2);
        let crash = true;
        if ((myBottom < otherTop) ||
            (myTop > otherBottom) ||
            (myRight < otherLeft) ||
            (myLeft > otherRight)) {
            crash = false;
        }
        return crash;
    };
    this.snakeGrow = function() {
        ateFood = true;
        newFoodX = randFoodNumber(1, mySnakeGame.canvas.width);
        newFoodY = randFoodNumber(1, mySnakeGame.canvas.height);
        myFood = new Component(snakeSize, snakeSize, "blue", foodFlooringX(), foodFlooringY());
        scoreNumber+=tailGrowthRate;
        for(let i = 0; i < scoreNumber - 1; i++){
            snakeX[scoreNumber] = mySnake.x;
            snakeY[scoreNumber] = mySnake.y;
        }
        for(let i = 0; i < scoreNumber; i++){
            snakeBoxes.push(new Component(snakeSize, snakeSize, randomTailColor(), snakeX[scoreNumber], snakeY[scoreNumber]));
            snakeBoxes[i].updatePiece();
        }

    }
}

function updateGameArea() {

    for(let i = 0; i < scoreNumber; i++){
        if(mySnake.eat(snakeBoxes[i]) && ateFood && snakeBoxes[i].x == myFood.x && snakeBoxes[i].y == myFood.y){
            scores.push(scoreNumber/tailGrowthRate);
            scoreNumber = 0;
            mySnakeGame.stop();
            mySnakeGame.start();
        } else if(mySnake.eat(snakeBoxes[i]) && !ateFood){
            scores.push(scoreNumber/tailGrowthRate);
            scoreNumber = 0;
            mySnakeGame.stop();
            mySnakeGame.start();
        }
    }

    if (mySnake.eat(myFood)) {
        mySnake.snakeGrow();

    }else{
        ateFood = false;
    }

    if(easy){
        if(mySnake.x < 0){
            mySnake.x += mySnakeGame.canvas.width;
            // mySnake.x = mySnakeGame.canvas.width;
            mySnake.updatePiece();
        }
        if(mySnake.x > mySnakeGame.canvas.width){
            mySnake.x -= (mySnakeGame.canvas.width);
            // mySnake.x = 0;
            mySnake.updatePiece();
        }
        if(mySnake.y < 0){
            mySnake.y += mySnakeGame.canvas.height;
            // mySnake.y = mySnake.canvas.height;
            mySnake.updatePiece();
        }
        if(mySnake.y > mySnakeGame.canvas.height){
            mySnake.y -= mySnakeGame.canvas.height;
            // mySnake.y = 0;
            mySnake.updatePiece();
        }
    }

    if(hard){
        if(mySnake.x < 0){
            scores.push(scoreNumber/tailGrowthRate);

        }
        if(mySnake.x >= mySnakeGame.canvas.width){
            scores.push(scoreNumber/tailGrowthRate);

        }
        if(mySnake.y < 0){
            scores.push(scoreNumber/tailGrowthRate);

        }
        if(mySnake.y >= mySnakeGame.canvas.height){
            scores.push(scoreNumber/tailGrowthRate);

        }
    }

    if(myFood.x >= mySnakeGame.canvas.width){
        myFood.x -= mySnakeGame.canvas.width + 10;
        myFood.updatePiece();
    }
    if(myFood.y >= mySnakeGame.canvas.height){
        myFood.y -= mySnakeGame.canvas.height + 10;
        myFood.updatePiece();
    }
    if(myFood.x < 0){
        myFood.x += mySnakeGame.canvas.width + 10;
        myFood.updatePiece();
    }
    if(myFood.y < 0){
        myFood.y += mySnakeGame.canvas.height + 10;
        myFood.updatePiece();
    }


    mySnakeGame.clearField();
    mySnake.speedX = 0;
    mySnake.speedY = 0;
    if(mySnakeGame.key && mySnakeGame.key == 37){ // left
        // mySnake.speedX = -1;
        if(right){
            left = false;
            right = true;
            up = false;
            down = false;
        }else{
            left = true;
            right = false;
            up = false;
            down = false;
        }
    }
    if(mySnakeGame.key && mySnakeGame.key == 39){ // right
        // mySnake.speedX = 1;
        if(left){
            left = true;
            right = false;
            up = false;
            down = false;
        }else{
            left = false;
            right = true;
            up = false;
            down = false;
        }
    }
    if(mySnakeGame.key && mySnakeGame.key == 38){ // up
        // mySnake.speedY = -1;
        if(down){
            left = false;
            right = false;
            up = false;
            down = true;
        }else{
            left = false;
            right = false;
            up = true;
            down = false;
        }
    }
    if(mySnakeGame.key && mySnakeGame.key == 40){ // down
        // mySnake.speedY = 1;
        if(up){
            left = false;
            right = false;
            up = true;
            down = false;
        }else{
            left = false;
            right = false;
            up = false;
            down = true;
        }
    }
    // if(scores.length >= 1){
    //     highScore.text = "HIGH SCORE: " + Math.max.apply(Math, scores);
    //     highScore.updatePiece();
    // }

    if(left){
        mySnake.speedX = -1;
    }
    if(right){
        mySnake.speedX = 1;
    }
    if(up){
        mySnake.speedY = -1;
    }
    if(down){
        mySnake.speedY = 1;
    }

    snakeX.unshift(mySnake.x);
    snakeY.unshift(mySnake.y);
    mySnake.newPos();
    myFood.newPos();
    // score.text = "SCORE: " + scoreNumber/tailGrowthRate;
    // score.updatePiece();
    if(scoreNumber > 0){
        for(let i = 0; i < scoreNumber; i++){
            snakeBoxes[i].x = snakeX[i];
            snakeBoxes[i].y = snakeY[i];
            snakeBoxes[i].newPos();
            snakeBoxes[i].updatePiece();
            if(myFood.x == snakeBoxes[i].x && myFood.y == snakeBoxes[i].y){
                newFoodX = randFoodNumber(1, mySnakeGame.canvas.width);
                newFoodY = randFoodNumber(1, mySnakeGame.canvas.height);
                myFood = new Component(snakeSize, snakeSize, "blue", foodFlooringX(), foodFlooringY());
            }
        }
    }

    mySnake.updatePiece();
    myFood.updatePiece();
    document.getElementById("scoreDisplay").innerHTML = "Score Number: " + scoreNumber/tailGrowthRate;
    highScore = Math.max.apply(Math, scores);
    if(scores.length > 0){
        document.getElementById("pbDisplay").innerHTML = "High Score: " + highScore;
    }
    console.log(mySnake.x);
}

function randFoodNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randSnakeNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function foodFlooringX() {
    for(let i = 0; i < newFoodX; i+=10){
        foodPos = i;
    }
    return foodPos;
}

function foodFlooringY() {
    for(let i = 0; i < newFoodY; i+=10){
        foodPos = i;
    }
    return foodPos;
}

function randomTailColor() {
    tailColor = randFoodNumber(0, 2);
    console.log(tailColor);
    if(tailColor == 0){
        return snakeColor2;
    }

    if(tailColor == 1){
        return snakeColor1;
    }
}

function startPos() {
    for(let i = 0; i < randSnakeNumber(1, mySnakeGame.canvas.height)*4; i+=10){
        snakePos = i;
    }
    return snakePos;
}

function restartGame() {
    /**
     * HELP ME I DON'T KNOW WHAT IM DOING HERE
     */
    mySnake.speedX = 0;
    mySnake.speedY = 0;
    snakeBoxes = [];
    scoreNumber = 0;
    mySnakeGame.stop();
    mySnakeGame.start();
}


let mySnakeGame = {
    canvas: document.getElementById("canvas"),
    scoreNumber : 0,
    randomNumber: Math.floor(Math.random() * (this.canvas.width - 1)) + 1,
    fifteenCanvas : function() {
        mySnakeGame.clearField();
        canvasSize = 150;
        this.canvas.width = canvasSize;
        this.canvas.height = canvasSize;
    },
    threeCanvas : function() {
        mySnakeGame.clearField();
        canvasSize = 300;
        this.canvas.width = canvasSize;
        this.canvas.height = canvasSize;
    },
    sixCanvas : function() {
        mySnakeGame.clearField();
        canvasSize = 600;
        this.canvas.width = canvasSize;
        this.canvas.height = canvasSize;
    },
    nineCanvas : function() {
        mySnakeGame.clearField();
        canvasSize = 900;
        this.canvas.width = canvasSize;
        this.canvas.height = canvasSize;
    },
    start: function () {
        this.canvas.width = canvasSize;
        this.canvas.height = canvasSize;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, intervalTime);
        window.addEventListener('keydown', function (e) {
            mySnakeGame.key = e.keyCode;
            e.preventDefault();
            console.log(nameHolder.myName);
        });
        window.addEventListener('mousedown', function (e) {
            mySnakeGame.mouse = e.keyCode;
            e.preventDefault();
        });
    },
    clearField : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        mySnake.speedX = 0;
        mySnake.speedY = 0;
        mySnakeGame.clearField();
        scoreNumber = 0;
        clearInterval(this.interval);
    }
};

let nameHolder = function() {
    myName = prompt("Please enter your name.", "");
    if(myName.length > 0){
        document.getElementById("currentName").value = myName;
    }

};

function easyClick() {
    easy = true;
    hard = false;
    alert("Easy Mode Set!");
}

function hardClick() {
    easy = false;
    hard = true;
    alert("Hard Mode Set!");
}

function changeName() {
    nameHolder.myName = document.getElementById('changeName').value;
    document.getElementById("currentName").value = nameHolder.myName;
    alert("Name changed to " + nameHolder.myName + ".");
}

function endGame() {
    endSound.play();
    mySnake.speedX = 0;
    mySnake.speedY = 0;
    snakeBoxes = [];
    scoreNumber = 0;
    mySnakeGame.stop();
}





