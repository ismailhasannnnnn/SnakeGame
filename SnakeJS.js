let ctx;
let mySnake;
let myFood, score;
let foodPos;
let newTail;
let snakeSize = 30;
let ateFood = false;
let scoreNumber = 0;
let snakeX = [];
let snakeY = [];
let tailX = [];
let tailY = [];
let snakeBoxes = [];



function startGame() {
    mySnakeGame.start();
    mySnake = new Component(snakeSize, snakeSize, "red", foodFlooring()*2, foodFlooring()*2);
    myFood = new Component(30, 30, "blue", foodFlooring()*2, foodFlooring()*2);
    score = new Component("50px", "Consolas", "black", 50, 50, "text");
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
        this.x += this.speedX*30;
        this.y += this.speedY*30;
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
        // if(mySnakeGame.scoreNumber === this.tail.length){
        //     for(var i = 0; i < this.tail.length-1; i++){
        //         this.tail[i] = this.tail[i+1];
        //         console.log(this.tail.length);
        //     }
        // }
        // tail[mySnakeGame.scoreNumber - 1] = ctx.fillRect(this.x, this.y, 30, 30);
        //
        // for(var i = 0; i < mySnakeGame.scoreNumber; i++){
        //     ctx.rect(this.tail[i].x, this.tail[i].y, this.tail[i].width, this.tail[i].height);
        // }
        // var tail = [];
        // var lastX;
        // var lastY;
        // for(var i = 0; i < mySnakeGame.scoreNumber - 1; i++){
        //     lastX = mySnake.x;
        //     lastY = mySnake.y;
        //     this.tail[i] = this.tail[i+1];
        //     console.log(lastX + " " + lastY + " " + tail.length);
        // }
        // this.tail[mySnakeGame.scoreNumber - 1] = new Component(30, 30, "red", lastX, lastY);
        //
        // for(var i = 0; i < mySnakeGame.scoreNumber; i++){
        //     this.tail[mySnakeGame.scoreNumber] = new Component(30, 30, "red", tail[i].x, tail[i].y);
        // }
        // tailX.push(snakeX);
        // tailY.push(snakeY);

        for(let i = 0; i < scoreNumber - 1; i++){
            snakeX[scoreNumber] = mySnake.x;
            snakeY[scoreNumber] = mySnake.y;
        }

        //
        // for(let i = 0; i < tailY.length - 1; i++){
        //     tailY[i] = tailY[i+1];
        // }
        //
        // for(let i = 0; i < scoreNumber; i++){
        //     tailX[i] = new Component(30, 30, "orange", tailX[i], tailY[i]);
        //     tailY[i] = new Component(30, 30, "orange", tailX[i - 1], tailY[i - 1]);
        // }
    }
}

function updateGameArea() {
    if (mySnake.eat(myFood)) {
        ateFood = true;
        myFood = new Component(30, 30, "blue", foodFlooring(), foodFlooring());
        scoreNumber++;
        // this.ctx = mySnakeGame.context;
        // this.ctx.fillStyle = "orange";
        mySnake.snakeGrow();
        console.log(snakeX[scoreNumber] + " " + snakeY[scoreNumber]);
        for(let i = 0; i < scoreNumber; i++){
            snakeBoxes.push(new Component(30, 30, "orange", snakeX[scoreNumber], snakeY[scoreNumber]));
            snakeBoxes[i].updatePiece();
        }


    }else{
        ateFood = false;
    }

        for(let i = 0; i < scoreNumber; i++){
            if(mySnake.eat(snakeBoxes[i]) && !ateFood){
                scoreNumber = 0;
                mySnakeGame.exit;
            }
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
    if(mySnakeGame.key && mySnakeGame.key == 37){
        mySnake.speedX = -1;
        if(mySnakeGame.scoreNumber > 0){
            for(let i = 0; i < mySnakeGame.scoreNumber; i++){
            }
        }
    }
    if(mySnakeGame.key && mySnakeGame.key == 39){
        mySnake.speedX = 1;
        if(mySnakeGame.scoreNumber > 0){
            for(let i = 0; i < mySnakeGame.scoreNumber; i++){
            }
        }
    }
    if(mySnakeGame.key && mySnakeGame.key == 38){
        mySnake.speedY = -1;
        if(mySnakeGame.scoreNumber > 0){
            for(let i = 0; i < mySnakeGame.scoreNumber; i++){
            }
        }
    }
    if(mySnakeGame.key && mySnakeGame.key == 40){
        mySnake.speedY = 1;
        if(mySnakeGame.scoreNumber > 0){
            for(let i = 0; i < mySnakeGame.scoreNumber; i++){
            }
        }
    }
    snakeX.unshift(mySnake.x);
    snakeY.unshift(mySnake.y);
    mySnake.newPos();
    myFood.newPos();
    score.text = "SCORE: " + scoreNumber;
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
    // console.log(mySnake.x + " " + mySnake.y);
}

function randNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function foodFlooring() {
    for(let i = 0; i < randNumber(1, mySnakeGame.canvas.width)*2; i+=30){
        foodPos = i;
    }
    return foodPos;
}

function restartGame() {
    /**
     * HELP ME I DON'T KNOW WHAT IM DOING HERE
     */
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
        this.interval = setInterval(updateGameArea, 100);
        window.addEventListener('keydown', function (e) {
            mySnakeGame.key = e.keyCode;
            e.preventDefault();
        });
    },
    clearField : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
};





