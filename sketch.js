var bg, bgimg
var bird, birdanimation
var birdsGroup
var plane, planeImg
var score = 0
var gameState = "play"
var GameOvertxt, GameOvertxtimg
var restart, restartimg

function preload(){
bgimg = loadImage("Backdrop.jpg")
birdanimation = loadAnimation("Bird_a.png", "Bird_b.png")
planeImg = loadImage("plane.png")
GameOvertxtimg = loadImage("GameOver.png")
restartimg = loadImage("Restart.png")
}

function setup() {
  createCanvas(1000,600);
  bg = createSprite(500, 300, width, height);
  bg.addImage(bgimg);
  bg.scale= 2
  bg.x = bg.width/2
 
  plane = createSprite(200, 300, 90, 30);
  plane.addImage("plane", planeImg)
  plane.scale = 0.5
  plane.setCollider("rectangle", 40, 50, 400, 50)

  GameOvertxt = createSprite(500, 300, 70, 20)
  GameOvertxt.addImage("GameOver", GameOvertxtimg)

  restart = createSprite(500, 350, 30, 30)
  restart.addImage("restart", restartimg)
  restart.scale = 0.1
  
  birdsGroup = new Group();

  textSize(20)
}

function draw() {
  
  if (gameState === "play"){
  bg.velocityX  = -5
  if(bg.x<0){
    bg.x = bg.width/2
  }

 score = score + Math.round(getFrameRate()/60);

 GameOvertxt.visible = false
 restart.visible = false
  
if(keyIsDown (UP_ARROW)){
plane.y = plane.y-5
}

if(keyIsDown(DOWN_ARROW)){
  plane.y= plane.y + 5
}

spawnBirds();
if(birdsGroup.isTouching(plane)){
  gameState= "end"
}
  }
  else if(gameState === "end") {
    plane.velocityY= 5
    bg.velocityX = 0
    birdsGroup.setLifetimeEach(-1)
    birdsGroup.setVelocityXEach(0)
    birdsGroup.setVisibleEach(false)
    GameOvertxt.visible = true
    restart.visible = true
    birdsGroup.destroyEach();
    //birdsGroup.changeAnimationEach("stop", birdStop)
  }

if (mousePressedOver(restart) && gameState === "end"){
  reset();
}

  drawSprites();
  text("Score:" + score, 890, 30);
}

function spawnBirds() {
  //write code here to spawn the clouds
  //console.log(frameCount)
  if (frameCount % 90 === 0) {
     bird = createSprite(1000,120,40,10);
    bird.y = Math.round(random(80,520));
    //bird.shapeColor = "red"
    bird.addAnimation("flying", birdanimation);
    //bird.scale = 0.5;
    bird.velocityX = -5;
    
     //assign lifetime to the variable
    bird.lifetime = 200;
    
    //adjust the depth
    bird.depth = bg.depth;
    bird.depth = bird.depth + 1;
    
    //add each bird to the group
    birdsGroup.add(bird);
  }
}

function reset(){
  gameState = "play"
  GameOvertxt.visible = false
  restart.visible = false
  birdsGroup.setVisibleEach(false)
  score = 0
  plane.y = 300
  plane.velocityY = 0
}