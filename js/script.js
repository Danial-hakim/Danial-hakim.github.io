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

// Sprite
var sprite = new Image();
sprite.src = "./img/playerOne.png"; 

var enemyNPCSprite = new Image();
enemyNPCSprite.src = "./img/enemyOne.png";

var backgroundSprite = new Image();
backgroundSprite.src = "./img/background500.png";

var winScreenSprite = new Image();
winScreenSprite.src = "./img/backgroundWon.png";

var loseScreenSprite = new Image();
loseScreenSprite.src ="./img/backgroundLose.png";

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input;
}

function EnemyInput(enemyInput) {
    this.action = enemyInput;
}

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

// enemy input
var enemyInput = new EnemyInput("None");

// Default Player
var player = new GameObject("Player",sprite, 100);

var enemyNPC = new GameObject("enemyNPC",enemyNPCSprite,100);

// Gameobjects is a collection of the Actors within the game
var gameobjects = [player,enemyNPC];

gameobjects[0].x = 20;
gameobjects[0].y = 50;

gameobjects[1].x = 180;
gameobjects[1].y = 50;

// Process keyboard input event
function input(event) {
    // Take Input from the Player
    console.log("Gamer Input :" + gamerInput.action);
}

var isGameWon = false;
var isGameLose = false;
var duringGamePlay = true;
// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() {
    // Clear Canvas
    // Draw each GameObject
    context.clearRect(0, 0 ,canvas.width, canvas.height);

    if(duringGamePlay == true)
    {
        context.drawImage(backgroundSprite,0,0);
        drawHealthBar(playerHealth,enemyHealth);
        animate();
    }

    if(isGameLose == true)
    {
        context.drawImage(loseScreenSprite,0,0);
        enemyHealth = 10000;
    }

    if(isGameWon == true)
    {
        context.drawImage(winScreenSprite,0,0);
        playerHealth = 10000;
    }
}

var x = 0,
    y = 1300;

// Total Frames
var frames = 4;

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
    context.drawImage(sprite, (sprite.width / 4) * currentFrame, 0, 194, 209, gameobjects[0].x, gameobjects[0].y, 100, 100);

    context.drawImage(enemyNPCSprite, (enemyNPCSprite.width / 4) * currentFrame, 0, 230, 176, gameobjects[1].x, gameobjects[1].y, 100, 100);

    console.log(sprite.width);
    context.font = '36pt Orbitron';
}

window.requestAnimationFrame(gameloop);

function gameloop() {
    draw();
    window.requestAnimationFrame(gameloop);
}

function shieldOnClick(){
     var x = document.getElementById("defButtonDiv");
     if (x.style.display === "none") {
        x.style.display = "block";
        } 
     else {
       x.style.display = "none";
     }
      console.log("you choose shield which focus on defend");
}

function bladeOnClick(){
    var x = document.getElementById("atkButtonDiv");
    if (x.style.display === "none") {
       x.style.display = "block";
       } 
    else {
      x.style.display = "none";
    }
     console.log("you choose blade which focus on attack");
}

function boxingOnClick(){
    var x = document.getElementById("counterButtonDiv");
    if (x.style.display === "none") {
       x.style.display = "block";
       } 
    else {
      x.style.display = "none";
    }
    console.log("you choose boxing which is a balance weapon");
}

function atkOnClick(){
    gamerInput = new GamerInput("playerAttack");
    console.log("gamerInput selected");
    enemyResponce();  
}

function defOnClick(){
    gamerInput = new GamerInput("playerDefence");
    enemyResponce();
}

function counterOnClick(){
    gamerInput = new GamerInput("playerCounter");
    enemyResponce();
}

function enemyResponce(){
    chosenDecision = randomNumberGenerator(2);  
    setTimeout(enemyAction,1000);
    setTimeout(damageCalculator,1000);
}

var damageToEnemy = 0;
var damageToPlayer = 0;

function damageCalculator(){
    console.log("damage calculator in 2 seconds");
    var enemyBlockDmg = 3;
    var playerBlockDmg = 3;

    if(gamerInput.action == "playerAttack")
    {
        damageToEnemy = 6;
    }
    if(enemyInput.action == "enemyAttack")
    {
        damageToPlayer = 6;
        if(gamerInput.action =="playerCounter")
        {
            damageToPlayer = 0;
            damageToEnemy = 6;
        }
    }
    if(gamerInput.action == "playerDefence")
    {
        damageToEnemy = 0;
        damageToPlayer - playerBlockDmg;
    }
    if(enemyInput.action == "enemyDefence")
    {
        damageToPlayer = 0;
        damageToEnemy - enemyBlockDmg;
        if(gamerInput.action =="playerCounter")
        {
            damageToPlayer = 9;
            damageToEnemy = 0;
        }
    }
    
    enemyHealth = enemyHealth - damageToEnemy;
    playerHealth = playerHealth - damageToPlayer;
    inCombat = true;

    if(playerHealth <= 0)
    {
        duringGamePlay = false;
        isGameLose = true;
    }

    if(enemyHealth <= 0)
    {
        duringGamePlay = false;
        isGameWon = true;
    }

    updateHealthBar();
}

function randomNumberGenerator(maxVal)
{
    return Math.floor(Math.random() * Math.floor(maxVal));
}

function enemyAction(){
    console.log("enemy action in 2 seconds");

    var enemyAction = chosenDecision;
    if(enemyAction == 0)
    {
        enemyInput = new EnemyInput("enemyDefence");
    }
    else if(enemyAction == 1)
    {
        enemyInput = new EnemyInput("enemyAttack");
    }
    
}

var chosenDecision = 0;

function enemyDecision(){
 
    context.font ="15px Arial";
    context.textAlign = "center";
    context.fillStyle = "#000000";  
    context.fillRect(0, 0, 400, 20);

    if(chosenDecision == 1)
    {    
        context.fillStyle ="red";
        context.fillText("Enemy choose to attack " , 150 , 15);
    }    
    else 
    {
        context.fillStyle ="blue";
        context.fillText("Enemy choose to defend " , 150 , 15);
    }
}

var inCombat = false;

var enemyHealth = 100;
var playerHealth = 100;

var counter = 180;

function drawHealthBar(playerHealth,enemyHealth) {
    var width = 100;
    var height = 10;
    var max = 100;

    // Draw the background
    context.fillStyle = "#000000";  
    context.fillRect(20, 20, width, height);
  
    // Draw the fill
    context.fillStyle = "#7CFC00";
    var fillVal = Math.min(Math.max(playerHealth / max, 0), 1);
    context.fillRect(20, 20, fillVal * width, height);

    context.fillStyle = "#000000";
    context.fillRect(170, 20, width, height);
  
    // Draw the fill
    context.fillStyle = "#7CFC00";
    fillVal = Math.min(Math.max(enemyHealth / max, 0), 1);
    context.fillRect(170, 20, fillVal * width, height);

    if(inCombat == true)
    {
        enemyDecision();
        if(counter <= 0)
        {
            inCombat = false;
            counter = 180;
        }
        else
        {
            counter--;
        }
    }   
}

function updateHealthBar()
{
    localStorage.setItem('playerCurHealth' , playerHealth);
    document.getElementById("playerHealthText").innerHTML = " [ " + localStorage.getItem('playerCurHealth') + " ] ";
    //============================================================================================================
    localStorage.setItem('enemyCurHealth' , enemyHealth);
    document.getElementById("enemyHealthText").innerHTML = " [ " + localStorage.getItem('enemyCurHealth') + " ] ";
}

function getHealthStorage()
{
    var currentPlayerHealth = localStorage.getItem('playerCurHealth');

    if(isNaN(currentPlayerHealth))
    {
        localStorage.setItem('playerCurHealth',playerHealth);
        document.getElementById("playerHealthText").innerHTML = " [ " + localStorage.getItem('playerCurHealth') + " ] ";
    }
    playerHealth = localStorage.getItem('playerCurHealth');
    document.getElementById("playerHealthText").innerHTML = " [ " + localStorage.getItem(parseInt('playerCurHealth')) + " ] ";
    //========================================================================================================================
    var currentEnemyHealth = localStorage.getItem('enemyCurHealth');

    if(isNaN(currentEnemyHealth))
    {
        localStorage.setItem('enemyCurHealth',playerHealth);
        document.getElementById("enemyHealthText").innerHTML = " [ " + localStorage.getItem('enemyCurHealth') + " ] ";
    }
    enemyHealth = localStorage.getItem('enemyCurHealth');
    document.getElementById("enemyHealthText").innerHTML = " [ " + localStorage.getItem(parseInt('enemyCurHealth')) + " ] ";
}

function onPageLoad()
{
    getHealthStorage();
}