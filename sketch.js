var canvas, backgroundImage;

var gameState = 0,finishedPlayers;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var obstacles;
var s;
var f2;

var form, player, game;

var balls, ball1, ball2, ball3, ball4;
var i, track, ball1_img, ball2_img, ball3_img, ball4_img;
var fireball,fireball_img

function preload(){
  stone = loadImage("images/s1.png");
 Fire = loadImage("images/fire.png")
  ball1_img = loadImage("images/Basketball.png");
  ball2_img = loadImage("images/Soccerball.png");
  ball3_img = loadImage("images/Volleyball.png");
  ball4_img = loadImage("images/woodenball.png");
  track = loadImage("images/road.jpg");
  fireball_img = loadImage("images/fireball.png")
  
  
}

function setup(){
  canvas = createCanvas(displayWidth , displayHeight);
  database = firebase.database();
  gameState = 0;
  distance = 0;
 
  yVel = 0;
  xVel = 0;
  obstacles=createGroup();

  xSet = false;
  game = new Game();
  game.getState();
  game.start();
  for(i=0;i<5;i++)
  {
    w=random(200,950);
    h=random(-height*4,height-300);
  f1 = createSprite(w,h);
  f1.addImage("s1",stone);
  obstacles.add(f1);
 }

 for(i=0;i<5;i++)
 {
   w=random(200,950);
   h=random(-height*4,height-300);
   f2 = createSprite(w,h);
   f2.setCollider("circle",0,0,600);
   f2.debug="true";
   f2.addImage("fire",Fire);
   f2.scale = 0.2
   
 }
}


function draw(){
   //start the game
   background(200, 200, 255);

   //start the game
   if (playerCount === 4 ) {
     game.update(1);
   }
 
   //start the game for real
   if (gameState === 1) {
     game.play();
   }
   if (gameState === 2) {
     console.log("End");
   }
   
  
  }
 
  
