// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions

// get a handle to the canvas context
var canvas = document.getElementById("game");

// get 2D context for this canvas
var context = canvas.getContext("2d");

function GameObject(name, img, health) {
    this.name = name;
    this.img = img;
    this.health = health;
    this.x = 0;
    this.y = 0;
}

function drawProgressBar(val) {
    var width = 100;
    var height = 20;
    var max = 100;

    // Draw the background
    context.fillStyle = "#000000";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, width, height);
  
    // Draw the fill
    context.fillStyle = "#00FFFF";
    var fillVal = Math.min(Math.max(val / max, 0), 1);
    context.fillRect(0, 0, fillVal * width, height);
  }


// Sprite
var sprite = new Image();
sprite.src = "./img/running.png"; // Frames 1 to 6
var npcSprite = new Image();
npcSprite.src ="./img/goal.png"
// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input;
}

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

// Default Player
var player = new GameObject("Player",sprite, 100);

// Gameobjects is a collection of the Actors within the game
var gameobjects = [player, new GameObject("NPC", npcSprite, 100)];

gameobjects[0].x = 100;
gameobjects[0].y = 100;

gameobjects[1].x = 400;
gameobjects[1].y = 400;
// Process keyboard input event
function input(event) {
    // Take Input from the Player
       console.log("Event type: " + event.type);
    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37:
                gamerInput = new GamerInput("Left");
                break; //Left key
            case 38:
                gamerInput = new GamerInput("Up");
                break; //Up key
            case 39:
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40:
                gamerInput = new GamerInput("Down");
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None"); //No Input
    }
    console.log("Gamer Input :" + gamerInput.action);
}

function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    
        if (gamerInput.action === "Up") {
            gameobjects[0].y -= 5;
            console.log("Up");
        }

        if (gamerInput.action === "Down") {
            gameobjects[0].y += 5;
            console.log("Down");
        }

        if(gamerInput.action === "Left"){
           gameobjects[0].x -= 5;
           console.log("Left");
        }

        if(gamerInput.action === "Right"){
            gameobjects[0].x += 5;
            console.log("Right");
        }

        if((gameobjects[0].x === gameobjects[1].x + 25) || (gameobjects[0].x === gameobjects[1].x - 25))
        {
            ((gameobjects[0].y === gameobjects[1].y + 25) || (gameobjects[0].y === gameobjects[1].y - 25))
            {
                console.log("GOALLL!!");
            }
            
        }
        
        if(counter === 1000)
        {
            console.log("Time is up");
            console.log("Stop scoring !!");
        }
        else if (counter <= 1000)
        {
            counter++;
        }       
    
}
function buttonOnClickUp()
{
    gameobjects[0].y -= 5;
    console.log("Up");
}
function buttonOnClickDown()
{
    gameobjects[0].y += 5;
    console.log("Down");
}
function buttonOnClickLeft()
{
    gameobjects[0].x -= 5;
    console.log("Left");
}
function buttonOnClickRight()
{
    gameobjects[0].x += 5;
    console.log("Right");
}

// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() {
    // Clear Canvas
    // Draw each GameObject
    context.clearRect(0,0,canvas.width,canvas.height);
    drawProgressBar(counter/10);
    
    context.drawImage(npcSprite , gameobjects[1].x , gameobjects[1].y);
    animate();
}
var counter = 0;

var x = 0,
    y = 1300;

// Total Frames
var frames = 6;

// Current Frame
var currentFrame = 0;


// X axis to Draw from
var sprite_x = 0;

// Initial time set
var initial = new Date().getTime();
var current; // current time

function animate() {
    current = new Date().getTime(); // update current
    if (current - initial >= 500) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    } 
    // Draw sprite frame
    context.drawImage(sprite, (sprite.width / 6) * currentFrame, 0, 100, 100, gameobjects[0].x, gameobjects[0].y, 100, 100);

    context.font = '36pt Orbitron';
}
function onPageLoad()
{
    splitFunction();
}
function splitFunction()
{
    var url = window.location.search;
    console.log(url);
    var result = url.split("-");
    document.getElementById("myGamerTag").innerHTML = result[1];
}
window.requestAnimationFrame(gameloop);

function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation

// Handle Keypressed
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);
window.addEventListener('keyleft', input);
window.addEventListener('keyright', input);
