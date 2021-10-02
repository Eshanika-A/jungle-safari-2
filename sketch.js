var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var survivalTime=0;
var back, bgImage;


function preload(){
  
  bgImage = loadImage("jungle.jpg");
  monkey_running =     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(600,400);
 
  back = createSprite(200, 200, 1700,10)
 
  back.addImage( bgImage);
 

  monkey = createSprite(80,300,10,10);
  monkey.scale = 0.15;
  monkey.addAnimation("monkey", monkey_running);

  ground = createSprite(300,350,1700,10);
  
  ground.x= ground.width/2;
 
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  

}


function draw() {
background("cyan");
  
  
  
  drawSprites(); 
  
  if (gameState === PLAY){
     bananas();
     obstacles();
   
    ground.velocityX = -(4+score*1.5/100);
    
   score = score + Math.round(getFrameRate()/60);
  
  
    if(keyDown("space")&&monkey.y >= 225) {
      monkey.velocityY = -13; 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    if (monkey.isTouching(bananaGroup)){
      score= score=5;  
      bananaGroup.destroyEach();
    
    }
    
    switch (score) {
        case 10:
          monkey.scale = 0.12;
          break;
        case 20:
          monkey.scale = 0.14;
          break;
        case 30:
          monkey.scale = 0.16;
          break;
        case 40:
          monkey.scale = 0.15;
          break;
        default:
          break;
      }
      
    
    
    if (monkey.isTouching(obstacleGroup)){
       obstacleGroup.destroyEach();
    
       bananaGroup.destroyEach();
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    survivalTime=200;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    
    monkey.scale=0.1;
    
    fill("red")
    stroke("black")
    textSize(30);
    text("GAME OVER", 200, 150);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 220, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      score = 0;
      gameState = PLAY;
      survivalTime=0;
      
    }
  }
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("pink");
  text("Score:" + score, 500,50);
  
   stroke("black");
   textSize(20);
   fill("pink");
  survivalTime = survivalTime + Math.round(getFrameRate() / 50);
 text("Survial Time:" + survivalTime, 100, 50);

}


function bananas(){
  if (frameCount%50 === 0){
    
    banana = createSprite(500,150,50, 50 )
    banana.addImage(bananaImage);
    banana.scale = 0.1;
   
    banana.velocityX =-(6+score*0.2/100);           
    banana.lifetime = 200;
    bananaGroup.add(banana);
    
  }
}


function obstacles(){
  if (frameCount%80 === 0){
    
    obstacle = createSprite(700,320,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(6+score*  2/100);
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
      
  }
}




