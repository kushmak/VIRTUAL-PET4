//Create variables here
var dog; 
var happyDog;
var database;
var foodS;
var foodStock;
var lastFed;
var fedTime;
var feed;
var addFood;
var foodObj;

function preload()
{
	//load images here
  dog = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg");
}

function setup() {
  createCanvas(500,500);

  foodObj = new Food();

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(40);
  
  dog = createsprite(250,350,10,60);
  dog.addImage(dog);
  dog.scale = 0.2;

  feed = createButton("FEED");
  feed.position(600, 30);
  feed.mousePressed(feedDog);

  AddFood = createButton("ADD FOOD");
  AddFood.position(700, 30);
  AddFood.mousePressed(addFood);

}


function draw() {  

    //add styles here

    background("yellow");
foodObj.display();
writeStock(foodS);
if(foodS==0){

dog.addImage(happyDog);
milkBottle2.visible=false;
}else{
  dog.addImage(sadDog);
  milkBottle2.visible=true;
}
if(gamestate===1){
dog.addImage(happyDog);
dog.scale=0.175;
dog.y=250
}
if(gamestate===2){
  dog.addImage(sadDog);
  dog.scale=0.175;
  milkBottle2.visible=false;
  dog.y=250
  }
varBath=createButton("I Want To Take A Bath");
Bath.position=(580,125);
if(Bath.mousePressed(function(){
gameState=3;
database.ref('/').update({'gameState':gameState})
}));
if(gameState===3){
dog.addImage(washroom);
dog.scale=1;
milkBottle2.visible=false;
}
varSleep=createButton("I Am Very Sleepy");
Sleep.position(710,125);
if(Sleep.mousePressed(function(){
gameState=4;
database.ref('/').update({'gameState':gameState});
}));
if(gameState===4){
dog.addImage(bedroom);
dog.scale=1;
milkBottle2.visible=false
}
varPlay=createButton("Lets Play!");
Play.position(500,160);
if(play.mousePressed(function(){
gameState=5;
database.ref('/').update({'gameState':gameState})
}))
if(gameState===5){
dog.addImage(livingroom);
dog.scale=1;
milkBottle2.visible=false
}
varPlayInGarden=createButton("Lets Play In Park");
(PlayInGarden.mousePressed(function(){
gameState=6;
database.ref('/').update({'gameState':gameState});
}));
if(gameState===6){
dog.y=175;
dog.addImage(garden);
dog.scale=1;
  milkBottle2.visible=false
}















    fedTime = db.ref('fedTime');
    fedTime.on('value', function(data){
    lastFed = data.val();
    })

    if (foodS!== undefined){
      textSize(50);
      fill(255);
      text("Use UP ARROW for feeding your pet",50,50);
      text("Food Left => "+foodS, 150, 150);

    if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(happyDog);
  }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dog);
    }

    if(foodS === 0){
      foodS = 20;
    }

    if(lastFed >=12){
      text("LAST FEED :" + lastFed % 12 + 'pm', 350, 30);
    } else if(lastFed === 0){
      text("LAST FEED : 12 am", 350, 30);
    }else {
      text("LAST FEED :"+ lastFed+'am', 350, 30);
    }

    drawSprites();
  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    food: x
  })
}

function readStock(data){
  foodS = data.val();
  foodObj.updatefoodStocks(foodS);
}

function feedDog(){
  dog.addImage(dogImg2)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  db.ref('/').update({
    Food:foodObj.getFoodStock(), fedTime:hour()
  })
}

function addFood(){
  foodS++
  db.ref('/').update({
    Food:foodS
  })
}