var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Creating Global variables
var track, trackImg;

var car, carImg;

var coin, coinImg;

var obstacle, obstacleImg;

var score;

var coinSound, obstacleSound;

function preload(){
  
  //Loading Images
  
  trackImg = loadImage("raceTrack copy.jpg");
  
  carImg = loadImage("539-5391414_car-top-view-png-car-plan-view-png.png");
  
  coinImg = loadImage("coin.png");
  
  obstacleImg = loadImage("stone.png");
  
  coinSound = loadSound("checkPoint.mp3");
  
  obstacleSound = loadSound("die.mp3");
  
}

function setup(){
  
  //Creating Canvas
  createCanvas(500,1000)
  
  //Creating the Road
  track = createSprite(250,50);
  track.addImage(trackImg);
  track.velocityY = -20;
  track.scale = 3;
  
  //Creating the Player(McQueen)
  car = createSprite(257,600,250,250);
  car.addImage(carImg);
  car.scale = 0.30;
  
  coinGroup = new Group();
  obstacleGroup = new Group();
  
  car.setCollider("rectangle",0,0,400,800);
  car.debug = true;
 
  score = 0;
}

function draw(){
  
  background("Yellow")
  
  if(gameState === PLAY){
   //Making the Road go On and On 
  if(track.y < 0){
      track.y = track.width/2;
  }
  
  //Move Player with Right Arrow Key
  if(keyDown("right_arrow")){
    car.x = car.x + 7;  
  }  
  
  //Move Player with Left Arrow Key
  if(keyDown("left_arrow")){
    car.x = car.x + -7;  
  }
  
  if(car.isTouching(coinGroup)){
    coinGroup.destroyEach();
    coinSound.play();
    score = score + 1;
  }  
   
  spawnCoins();
  spawnObstacles();
    
  }
  
    if(car.isTouching(obstacleGroup)){
    coinGroup.destroyEach();
    obstacleGroup.destroyEach();
    track.velocityX = 0;
    gameState = END  
    obstacleSound.play();
  }    
  else if(gameState === END){
    
    score = 0;

    stroke("White");
    fill("Black");
    textSize(50);
    text("GAME OVER",110,345);
    
    
  } 
  drawSprites();
  
  stroke("black");
  fill("white");
  textSize(15);
  text("Score: "+ score, 100,50);
} 

function spawnCoins(){
  
  if (frameCount % 150 === 0){
      var coin = createSprite(300,1,10,10);

      coin.x = Math.round(random(250,500));
      coin.y = Math.round(random(250,500));  
      coin.addImage(coinImg);
      coin.scale = 0.1;
      coin.velocityY = 5;

      coin.lifetime = 250;

      coinGroup.add(coin);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(450,600,10,40);
    
    obstacle.x = Math.round(random(300,400));
    obstacle.y = Math.round(random(300,500));  
    obstacle.velocityY = 5;
    obstacle.addImage(obstacleImg);
            
    obstacle.scale = 0.2;
    obstacle.lifetime = 250;
    
    obstacleGroup.add(obstacle);
  }
}