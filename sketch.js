var towerImg, tower;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var invisibleblock, invisibleblockGroup;
var PLAY = 1;
var END = 0;
var GameState = PLAY;



function preload()   {
towerImg = loadImage("tower.png");
doorImg = loadImage("door.png");
climberImg = loadImage("climber.png");
ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup()    {
createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleblockGroup = new Group();
  ghost = createSprite(200, 200);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  spookySound.loop();
  
  
}

function draw()   {
  background(0);
  if(GameState === PLAY)  {
    
  
  if(tower.y>400)   {
    tower.y = 300;
  }
  if(keyDown("space"))   {
    ghost.velocityY = -5;
 }
  ghost.velocityY = ghost.velocityY + 1;
  if(keyDown("left_arrow"))  {
ghost.x = ghost.x-3;
 }
  if(keyDown("right_arrow"))  {
ghost.x = ghost.x+3;
}
  if(climberGroup.isTouching(ghost))  {
    ghost.velocityY = 0;
  }
  
  Spawndoors();
    if(invisibleblockGroup.isTouching(ghost)||ghost.y>600)  {
      GameState = END;
      ghost.destroy();
      
    }
drawSprites()  
}
  if ( GameState === END) {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GameOver! ",230, 250);
    
  }
}
function Spawndoors()   {
  if(frameCount%240===0)  {
    door = createSprite(200, 0)
    door.addImage(doorImg);
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    door.lifetime = 800;
    doorGroup.add(door);
    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifeime = 800;
    climberGroup.add(climber);
ghost.depth = door.depth-1;
   invisibleblock = createSprite(200, 50);
    invisibleblock.width = climber.width;
    invisibleblock.height = 2;
    invisibleblock.x = door.x;
    invisibleblock.velocityY = 1;
    invisibleblock.lifetime = 800;
    invisibleblockGroup.add(invisibleblock);
    
}
}
