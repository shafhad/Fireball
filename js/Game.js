class Game {
          constructor(){
        
          }
        
          getState(){
            var gameStateRef  = database.ref('gameState');
            gameStateRef.on("value",function(data){
               gameState = data.val();
            })
        
          }
        
          update(state){
            database.ref('/').update({
              gameState: state
            });
          }
        
          async start(){
            if(gameState === 0){
              player = new Player();
              var playerCountRef = await database.ref('playerCount').once("value");
              if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
              }
              form = new Form()
              form.display();
            }
        
            ball1 = createSprite(100,200);
            ball1.setCollider("circle",0,0,40)
            ball1.debug="true";
            ball1.addImage("ball1",ball1_img);
             ball1.addImage("fireball",fireball_img);

            ball2 = createSprite(300,200);
            ball2.setCollider("circle",0,0,40)
            ball2.debug="true";
            ball2.addImage("ball2",ball2_img);
             ball2.addImage("fireball",fireball_img);

            ball3 = createSprite(500,200);
            
            ball3.setCollider("circle",0,0,40)
            ball3.debug="true";
            ball3.addImage("ball3",ball3_img);
             ball3.addImage("fireball",fireball_img);

            ball4 = createSprite(700,200);
            ball4.setCollider("circle",0,0,40)
            ball4.debug="true";
            ball4.addImage("ball4",ball4_img);
             ball4.addImage("fireball",fireball_img);
            balls = [ball1, ball2, ball3, ball4];
          }
        
          play(){
            form.hide();
        
            Player.getPlayerInfo();
            
            if(allPlayers !== undefined){
              
              image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
              //index of the array
              var index =0;
        
              //x and y position of the balls
              var x =200;
              var y;
        
              for(var plr in allPlayers){
                //add 1 to the index for every loop
                index = index + 1 ;
                x = 200 + (index * 200) + allPlayers[plr].xPos;
                y = displayHeight - allPlayers[plr].distance ;
                
                balls[index-1].x = x;
                balls[index-1].y = y;
                textAlign(CENTER);
                textSize(20);
                text(allPlayers[plr].name, balls[index - 1].x, balls[index - 1].y + 75);
                if (index === player.index){
                  balls[index - 1].shapeColor = "red";
                  camera.position.x = displayWidth/2;
                  camera.position.y = balls[index-1].y;
                 
                  if( balls[index - 1].isTouching(f2)){
                   balls[index-1].changeImage("fireball",fireball_img)
                     yVel -= 0.9;
                     console.log("detected")
                     
                  } 
                }
               
              }
        
            }
        
            
            if(player.distance < 2170){
              if(keyIsDown(38) && player.index !== null){
                  yVel += 0.9;
                  if(keyIsDown(37)){
                      xVel -= 0.2;
                  }
                  if(keyIsDown(39)){
                      xVel += 0.2;
                  }
              }else if(keyIsDown(38) && yVel > 0 && player.index !== null){
                  yVel -= 0.1;
                  xVel *= 0.9;
              }else{
                  yVel *= 0.985;
                  xVel *= 0.985;
              }
            }
        
          //move the ball
          player.distance += yVel;
          yVel *= 0.98;
          player.xPos += xVel;
          xVel *= 0.985;
          player.update();
          //display sprites
          drawSprites();
        }
           
      
        }
