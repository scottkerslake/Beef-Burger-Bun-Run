window.onload = function () {
    document.addEventListener("deviceready", init, false);
    init();
};

function init() {
    window.addEventListener("deviceorientation", handleOrientation);
    
    
}

var posY = window.innerWidth/2;
var posX = window.innerHeight/2;
var animX = 0;
var animY = 0;





var ball;
// this is for the draw function
var stretchy;
//this holds the burgers
var collectibles;
// this variable is the score of the collected burgers
var burgerScore = 0;

var hand, hand2;

var king;


var bg;
// obstacles are the background 
var obstacles;


var totalx, totaly;



function setup(){
	var canvas = createCanvas(displayWidth,displayHeight);
	canvas.parent("myCanvas");
  bg = new Group();
  collectibles = new Group();
  background(0);
  totalx = window.innerWidth;
  totaly = window.innerHeight;

  // initializing the images for the assets
  ball = loadImage("assets/ballboy_face.png");
  hand = createSprite(posX + 100, posY - 50,5,5);
  hand.addAnimation("handy","assets/handyother0001.png", "assets/handyother0001.png");
  hand2 = createSprite(posX -100, posY + 50,5,5);
  hand2.addAnimation("handy2", "assets/handy0001.png", "assets/handy0001.png");
  king = createSprite(posX + 500, posY + 500, 100,100);
  king.addAnimation("normal", "assets/burgerking0001.png", "assets/burgerking0001.png");

  stretchy = createSprite(posX,posY,10,10);
  hand.maxSpeed = 18;
  hand2.maxSpeed = 18;
  king.maxSpeed = 10;

  stretchy.draw = function(){

      fill(118,202,114);

      push();
      rotate(radians(this.getDirection()));
      ellipse(0,0,100+this.getSpeed(),100-this.getSpeed());
      pop();
      image(ball, this.deltaX*2, this.deltaY*2);


  }
  stretchy.maxSpeed = 15;
 
  $("#redo").on("click", function(){
    console.log("yes");
    $("#endscreen").remove();
    console.log("yes");
    setup();


  });

  


  // making a star field
  for(var i = 0; i < 600; i++){

    var randomsize1 = random(1,3);
    
    var randomPosition1 = random(-totalx,totalx);
    var randomPosition2 = random(-totaly,totaly);

    obstacles = createSprite(randomPosition1,randomPosition2,randomsize1,randomsize1);
    bg.add(obstacles);

    obstacles.shapeColor = color(255);



  }

  for(var i = 0; i < 50; i++){

    var burg = createSprite(random(-totalx,totalx),random(-totaly,totaly));

    burg.addAnimation("normal", "assets/burgerboy0001.png", "assets/burgerboy0001.png");
    collectibles.add(burg);
    


  }
 

//   ship.addAnimation("down", "assets/spaceShip_thrustdown.png");
//   ship.addAnimation("left", "assets/spaceShip_thrustleft.png");
//   ship.addAnimation("right", "assets/spaceShip_thrustright.png");
//   ship.addAnimation("up", "assets/spaceShip_thrustup.png");


}


function draw(){
  background(0);
  // ellipse(posX+100,posY+100,20,20);
  

  stretchy.velocity.x = (posX-stretchy.position.x)/10;
  stretchy.velocity.y = (posY-stretchy.position.y)/10;
  hand.attractionPoint(0.7,stretchy.position.x,stretchy.position.y);
  hand.rotateToDirection = true;
  
  hand2.attractionPoint(0.7,stretchy.position.x,stretchy.position.y);
  hand2.rotateToDirection = true;
  king.attractionPoint(0.2, stretchy.position.x, stretchy.position.y);



  stretchy.overlap(collectibles,collect);
  stretchy.overlap(king, gameOver);
  king.bounce(hand);
  king.bounce(hand2);
  // hand.overlap(collectibles,collect);
  // hand2.overlap(collectibles,collect);


  // stretchy.velocity.x = (mouseX-stretchy.position.x)/10;
  // stretchy.velocity.y = (mouseY-stretchy.position.y)/10;
  
  if(burgerScore == 50){
    gameOver();

  }
  
 
  
  camera.zoom = 0.7;
  camera.position.x = stretchy.position.x;
  camera.position.y = stretchy.position.y;

  drawSprites();


 



}

function handleOrientation(event){

  var x = event.beta;
  var y = event.gamma;
  var z = event.alpha;
  // var x = parseInt(e.accelerationIncludingGravity.x);
  // var y = parseInt(e.accelerationIncludingGravity.y);

  posX += y * 3;
  posY += x * 3;

  animX = y;
  animY = x;
  // console.log("PosX " + y);
  // console.log("posY " + x);


}

function collect(collector, collected){

  burgerScore += 1;
  $("#burgvari").text(burgerScore);
  collected.remove();

}

// function mousePressed

function gameOver(){
  
  if(burgerScore == 50){
    $("#gameover").text("Success");
  // var $h2 = $("<h2>");
  // $h2.text("Game Over" + burgerScore);
  // var $div = $("<div>");

  $("#topman").append("<div  id='endscreen' class='endgame'><h2>Success!</h2><h2>Score: "+burgerScore+"</h2><p>4 touch to restart</p></div>")


  noloop();



  }
  else{
    $("#gameover").text("Game Over");
  // var $h2 = $("<h2>");
  // $h2.text("Game Over" + burgerScore);
  // var $div = $("<div>");

  $("#topman").append("<div  id='endscreen' class='endgame'><h2>Game Over</h2><h2>Score: "+burgerScore+"</h2><p>4 touch to restart</p></div>")


  noloop();



  }

  



  
}


