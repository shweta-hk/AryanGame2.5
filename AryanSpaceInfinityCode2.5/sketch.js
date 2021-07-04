var gameState = "START"
var title, titleImage, background, backgroundImage
var play, playImage
var background2, background2Image
var levelsImage, levels, level1Image, level1
var level2Image, level2,level3Image, level3
var astronaut, astronautImage, astronaut_running, astronaut_jumping
var currentLevel = "START"
var robot, robotImage
var invisibleGround
var alienSpaceshipImg, alienSpaceshipGrp;

function preload()
{
  titleImage = loadImage("img/title.png")
  backgroundImage = loadImage("img/background3.jpg")
  playImage = loadImage("img/play.png")
  background2Image = loadImage("img/background51.png")
  levelsImage = loadImage("img/levelsLogo.png")
  level1Image = loadImage("img/level1.png")
  level2Image = loadImage("img/level2.png")
  level3Image = loadImage("img/level3.png")
  astronautImage = loadAnimation("img/standing.gif")
  astronaut_running = loadAnimation("img/running.gif")
  astronaut_jumping = loadAnimation("img/jumping.gif")
  robotImage = loadAnimation("img/robot1.png","img/robot2.png","img/robot3.png","img/robot4.png","img/robot5.png","img/robot6.png","img/robot7.png","img/robot8.png")
  alienSpaceshipImg = loadImage("img/alienShip.png");
}


function setup()
{
  createCanvas(windowWidth,windowHeight)

  title = createSprite(windowWidth/2,windowHeight/4)
  title.visible = false

  play = createSprite(windowWidth/2,windowHeight/2+150)
  play.visible= false

  background2 = createSprite(0,windowHeight/2,windowWidth,windowHeight)
  background2.addImage("background2",background2Image)
  background2.x = windowWidth/2;
  background2.velocityX = -6
  background2.scale = 2.5;
  background2.visible = false

  levels = createSprite(windowWidth/2,windowHeight/4-90)
  levels.addImage("levels",levelsImage)
  levels.visible = false

  level1 = createSprite(windowWidth/2,windowHeight/3+100)
  level1.addImage("level1", level1Image)
  level1.visible = false

  level2 = createSprite(windowWidth/2,windowHeight/3+200)
  level2.addImage("level2", level2Image)
  level2.visible = false

  level3 = createSprite(windowWidth/2,windowHeight/3+300)
  level3.addImage("level3", level3Image)
  level3.visible = false 
  
  astronaut = createSprite(windowWidth/11,windowHeight-120)
  astronaut.addAnimation("astronaut", astronautImage)
  astronaut.addAnimation("running", astronaut_running)
 
  astronaut.visible = false
  
  robot = createSprite(windowWidth/2+350,windowHeight-120)
  robot.addAnimation("robot",robotImage)
  robot.visible = false

  invisibleGround = createSprite(windowWidth/2,windowHeight-50, windowWidth,2)
  invisibleGround.visible = false;

  alienSpaceshipGrp =new Group();


}

function draw()
{

   if(gameState === "START")
   {
        background(backgroundImage)
        title.addImage("title",titleImage)
        title.scale = 0.6
        title.visible = true
        play.addImage("playbutton",playImage)
        play.scale = 0.45
        play.visible = true

        if(mousePressedOver(play))
        {
          gameState = "LEVELSELECTOR"
          title.visible = false
          play.visible = false
          currentLevel = "LEVELSELECTOR"

        }
      }

        if(gameState==="LEVELSELECTOR")
        {
          levels.visible = true
          levels.scale = 0.75
          level1.visible = true
          level1.scale = 0.6
          level2.visible = true
          level2.scale = 0.6
          level3.visible = true
          level3.scale = 0.6
          
          if(mousePressedOver(level1) && currentLevel==="LEVELSELECTOR")
          {
             levels.visible = false
             level1.visible = false
             level2.visible = false
             level3.visible = false
             gameState = "LEVEL1"
             currentLevel = "LEVEL1"
          }
        }

        if (gameState === "LEVEL1")
        {
           background(0)  
           background2.visible = true
           astronaut.visible = true
           astronaut.scale = 0.3
           robot.visible = true
           robot.scale = 0.7

           if (background2.x < 50){
            background2.x = windowWidth/2;
            background2.velocityX = -6;
          }

          if(keyDown("RIGHT_ARROW")) {
            astronaut.changeAnimation("running", astronaut_running)
            astronaut.x = astronaut.x+20
          }

          spawnAlienSpaceships();
           
        }

   drawSprites()
}



function spawnAlienSpaceships()
{

  if(frameCount % 60 === 0) {
    var alienSpaceship = createSprite(600,30,10,40);
    alienSpaceship.addImage("alienSpaceship", alienSpaceshipImg);
 
    alienSpaceship.velocityY = 6
    alienSpaceship.x=  Math.round(random(200,windowWidth-100));
     
    //assign scale and lifetime        
    alienSpaceship.scale = 0.2;
    alienSpaceship.lifetime = 500;
    //add each alienship to the group
    alienSpaceshipGrp.add(alienSpaceship);
  }
}