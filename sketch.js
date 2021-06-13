// name of objects
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score=0;
var gameOver, restart;

// loading images
function preload(){
    trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
    trex_collided = loadAnimation("trex_collided.png");
    
    groundImage = loadImage("ground2.png");
    
    cloudImage = loadImage("cloud.png");
    
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
    
    // jumpSound = loadSound("jump.mp3");
    // dieSound = loadSound("die.mp3");
    checkPointSound = loadSound("checkPoint.mp3"); 
  }

// creating objects
function setup(){
createCanvas(400,400);
// creating the dinosaur
trex=createSprite(200,350,20,50)
trex.addAnimation("runing",trex_running)

// adding scale and position to trex
trex.scale=0.5
trex.x=50

// ground
ground=createSprite(200,380,400,20)
ground.addImage("ground",groundImage)
ground.x=ground.width/2
ground.velocity=-2

// creating invisible ground
invisibleGround=createSprite(200,390,400,10)
invisibleGround.visible=false

// genrate a random number
var rand=Math.round(random(1,100))
console.log(rand)

score=0

obstaclesGroup=createGroup();
cloudsGroup=createGroup();

trex.setCollider("circle",0,0,40)
trex.debug=true

gameOver=createSprite(300,100)
gameOver.addImage(gameOverImg)

restart=createSprite(300,140)
restart.addImage(restartImg)

gameOver.scale=0.5
restart.scale=0.5
}

function draw(){
    // set background
    background(400);

// displaying score
text("Score : "+score,500,50)

if(gameState===PLAY){

    // move the ground
ground.velocityX=-4

//scoring
score=score+Math.round(getFrameRate()/60)

if(score>0%score%100===0){
checkPointSound.play
}

if(ground.x<0){
    ground.x=ground.width/2
}

     // jump when space key is pressed
if (keyDown("space") && trex.y>=362){
    trex.velocityY=-10
    }
    
    // gravity
    trex.velocityY+=0.8


spawnClouds();
spawnObstacles();
        
if(obstaclesGroup.isTouching(trex)){
gameState=END
}
}

else if(gameState===END){
    ground.velocityX=0

    obstaclesGroup.setVelocityXEach(0);   
    cloudsGroup.setVelocityXEach(0);

    // change the trex animation
    trex.changeAnimation("collided",trex_collided)

    // set the lifetime of the game objects so that they never dstroyed 
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
trex,velocityY=0

gameOver.visible=true
restart.visible=true

if(mousePressedOver(restart)){
    reset ();
    }    
}

trex.collide(invisibleGround)


    // to draw the objects
    drawSprites();
}

function spawnClouds(){
    // write code here to spawn clouds
if(frameCount%60===0){
var cloud=createSprite(200,300,40,10)
cloud.velocityX=-3
cloud.addImage(cloudImage)
cloud.scale=0.4
cloud.y=Math.round(random(280,320))
}

//adjust the depth
cloud.depth=trex.depth
trex.depth+=1

// assign lifetime to the variable
cloud.lifetime=134

// add each obstacle to the group
cloudsGroup.add(cloud)
}

function spawnObstacles(){
if(frameCount%60===0){
var obstacle=createSprites(400,365,10,40)
obstacle.velocityX=-6

// genrate random obstacles
var rand=Math.round(random(1,6))
switch(rand){
    case 1:obstacle.addImage(obstacle1)
    break;
    case 2:obstacle.addImage(obstacle2)
    break;
    case 3:obstacle.addImage(obstacle3)
    break;
    case 4:obstacle.addImage(obstacle4)
    break;
    case 5:obstacle.addImage(obstacle5)
    break;
    case 6:obstacle.addImage(obstacle6)
    break;
    dfault:break

    // assign scale and lifetime to the obstacles
    obstacle.scale=0.5
    obstacle.lifetime=300
}

// add each obstacle to the group
obstaslesGroup.add(obstacle)
}
}

function reset(){
    gameState=PLAY
    gameOver.visible=false
    restart.visible=false
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    trex.changeAnimation("running",trex_running)
    score=0
}