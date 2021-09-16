const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas,baseimage,playerimage;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board1, board2;

var numberOfArrows = 10;

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 100, 50, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 30, 150, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    330,
    playerBase.position.y - 112,
    100,
    100
  );

  board1 = new Board(width - 200, 200, 50, 175);
  board2 = new Board(width - 400, height - 300, 50, 175);
}

function draw() {
  background(backgroundImg );
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  Engine.update(engine);
  playerArcher.display();

  board1.display();
  board2.display();

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();

      
      
      var posX = playerArrows[i].body.position.x;
       var posY = playerArrows[i].body.position.y;

       if (posX > width || posY > height) {
         if (!playerArrows[i].isRemoved) {
           playerArrows[i].remove(i);
         } else {
           playerArrows[i].trajectory = [];
         }
       }
    }
  }

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 50);
  textSize(20);
  text("Remaining Arrows: "+ numberOfArrows, 200, 100);
}

function keyPressed() {
  if (keyCode === 32) {
    if(numberOfArrows > 0) {
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX, posY, 100, 20, angle);

      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -=1;
    }
  }
  }

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}


