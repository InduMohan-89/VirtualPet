var dog,sadDog,happyDog;

var feed,addFood,foodObj,database,foods;
var foodStock = 0;
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(850,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();


}

function draw() {
  background(46,139,87);
  foodObj.display();
  drawSprites();
}

function readStock(data){
foods = data.val();
foodObj.updateFoodStock(foods);

}

//function to read food Stock


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
 if(foodObj.getFoodStock()<=0){

  foodObj.updateFoodStock(foodObj.getFoodStock()*0);
 }
 else {
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  //foodObj. deductFood();

  database.ref('/').update({
    Food:foodObj.getFoodStock()
  })
 }


}

//function to add food in stock
function addFoods(){
  foods = foods+1;
  database.ref('/').update({
    Food:foods
  })
}