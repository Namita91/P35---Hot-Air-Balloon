var balloon, balloonImage1, balloonImage2;
var database, height;

//function to load images and animations for background and balloon sprite
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  //creating a balloon sprite
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  //setting listener on the position node of database from where x and y value would be fetched later
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);

  textSize(20); 
}

// function to read x and y from database and adjusting balloon's position accordingly
function readPosition(data) {
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

//function to write the updated position of balloon in to database
function updatePosition(X, Y) {
  database.ref('balloon/height').set({
    'x' : height.x + X,
    'y' : height.y + Y
  });
}

//function to display error message in case data is not fetched from database
function showError() {
  console.log("There is some error");
}

// function to display UI
function draw() {
  background(bg);

  //conditions to ove the balloon left and right
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(10,0);
  }

  //conditions to move the balloon up and down and changing its size as per the position to give it a far and close effect
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(0,-10);
    balloon.scale = balloon.scale - 0.006;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(0,10);
    balloon.scale = balloon.scale + 0.006;
  }

  drawSprites();
  
  // display instructions to move the balloon on screen
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
