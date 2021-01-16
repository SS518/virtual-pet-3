var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var changeGameState,readState;
var bedRoomImg,bathroomImg,gardenImg;
var gameState;

function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
bedRoomImg = loadImage("Images/Bed Room.png");
bathroomImg = loadImage("Images/Wash Room.png");
gardenImg = loadImage("Images/Garden.png");

}

function setup() {
  database=firebase.database();
  createCanvas(600,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(500,250,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //if(gameState === hungry){
  feed=createButton("Feed the dog");
  feed.position(755,375);
  feed.mousePressed(feedDog);
  //}

  addFood=createButton("Add Food");
  addFood.position(855,375);
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

}

function draw() {
  background(190,10,0);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill("yellow");
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 250,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 250,30);
   }

  
   if(gameState != "Hungry"){
     addFood.hide();
     dog.remove();
     feed.hide();
   }
   else{
     feed.show();
     dog.addImage(sadDog);
     addFood.show();
   }

   currentTime = hour();
   if(currentTime == (lastFed+1)){
     update("Playing");
     foodObj.garden();
   }
   else if (currentTime == (lastFed+2)){
     update("Sleeping");
     foodObj.bedRoom();
   }
   else if(currentTime>(lastFed+2)&& currentTime <=(lastFed+4)){
     update("Bathing");
     foodObj.washRoom();
   }
   else{
   //  update("Hungry");
   //  foodObj.display();
   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function hungry (){
  if(lastFed>4){
   gameState = hungry;
  }
}