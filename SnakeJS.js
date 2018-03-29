let ctx;
let mySnake;
let myFood, score;
let foodPos;
let snakeSize = 10;
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



function startGame() {
    mySnakeGame.start();
    mySnake = new Component(snakeSize, snakeSize, "#EE3D96", foodFlooring()*2, foodFlooring()*2);
    myFood = new Component(snakeSize, snakeSize, "blue", foodFlooring()*2, foodFlooring()*2);
    score = new Component("50px", "Consolas", "black", 50, 50, "text");
    highScore = new Component("50px", "Consolas", "black", 200, 850, "text");
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
        myFood = new Component(snakeSize, snakeSize, "blue", foodFlooring(), foodFlooring());
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
            mySnakeGame.exit;
        } else if(mySnake.eat(snakeBoxes[i]) && !ateFood){
            scores.push(scoreNumber/tailGrowthRate);
            scoreNumber = 0;
            mySnakeGame.exit;
        }
    }

    if (mySnake.eat(myFood)) {
        console.log("hi");
        mySnake.snakeGrow();
    }else{
        ateFood = false;
    }

    if(mySnake.x < mySnakeGame.canvas.width){
        mySnake.x += mySnakeGame.canvas.width;
        mySnake.updatePiece();
    }
    if(mySnake.x >= mySnakeGame.canvas.width){
        mySnake.x -= mySnakeGame.canvas.width;
        mySnake.updatePiece();
    }
    if(mySnake.y < mySnakeGame.canvas.height){
        mySnake.y += mySnakeGame.canvas.height;
        mySnake.updatePiece();
    }
    if(mySnake.y >= mySnakeGame.canvas.height){
        mySnake.y -= mySnakeGame.canvas.height;
        mySnake.updatePiece();
    }
    if(myFood.x >= mySnakeGame.canvas.width){
        myFood.x -= mySnakeGame.canvas.width;
        myFood.updatePiece();
    }
    if(myFood.y >= mySnakeGame.canvas.height){
        myFood.y -= mySnakeGame.canvas.height;
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
    if(scores.length >= 1){
        highScore.text = "HIGH SCORE: " + Math.max.apply(Math, scores);
        highScore.updatePiece();
    }

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
    score.text = "SCORE: " + scoreNumber/tailGrowthRate;
    score.updatePiece();
    if(scoreNumber > 0){
        for(let i = 0; i < scoreNumber; i++){
            snakeBoxes[i].x = snakeX[i];
            snakeBoxes[i].y = snakeY[i];
            snakeBoxes[i].newPos();
            snakeBoxes[i].updatePiece();
        }
    }

    mySnake.updatePiece();
    myFood.updatePiece();
}

function randNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function foodFlooring() {
    for(let i = 0; i < randNumber(1, mySnakeGame.canvas.width)*2; i+=10){
        foodPos = i;
    }
    return foodPos;
}

function randomTailColor() {
    tailColor = randNumber(0, 2);
    console.log(tailColor);
    if(tailColor == 0){
        return "lime";
    }

    if(tailColor == 1){
        return "#EE3D96"
    }
}

function restartGame() {
    /**
     * HELP ME I DON'T KNOW WHAT IM DOING HERE
     */
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let mySnakeGame = {
    canvas: document.getElementById("canvas"),
    scoreNumber : 0,
    randomNumber: Math.floor(Math.random() * (this.canvas.width - 1)) + 1,
    start: function () {
        this.canvas.width = 900;
        this.canvas.height = 900;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 75);
        window.addEventListener('keydown', function (e) {
            mySnakeGame.key = e.keyCode;
            e.preventDefault();
        });
        window.addEventListener('mousedown', function (e) {
            mySnakeGame.mouse = e.keyCode;
            e.preventDefault();
        });
    },
    clearField : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
};





