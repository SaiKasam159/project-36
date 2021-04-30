//Create variables here
var foodStock
var happyDog, dog, foodS, database, dogSad
var happyDogSprite, sadDogSprite, dogSprite, feedTime, lastFed, addFoodButton, eatFoodButton, foodObj
foodS = 20

function preload()
{

  happyDog = loadImage('images/dogImg1.png')
  dogSad = loadImage('images/doggo.jpg')
  dog = loadImage('images/dogImg.png')
 
}

function setup() {
  createCanvas(800, 500);
  database = firebase.database()
  dogSprite = createSprite(750, 250, 1, 1)
  dogSprite.scale = 0.5
  dogSprite.addImage(dog)
  foodStock = database.ref('food')
  foodStock.on('value', readStock, showError)
  foodObj = new Food()

  addFoodButton = createButton('Give Dog more to eat')
  addFoodButton.position(250, 250)

  addFoodButton.mousePressed(function (){
    foodObj.addFood(foodS)
    foodObj.display() 
    database.ref('/').set({
      food:foodObj.getFoodStock(),
      feedTime: hour()
    })     
})

  eatFoodButton = createButton('Give Dog Food')
  eatFoodButton.position(250, 200)

  eatFoodButton.mousePressed(function (){
      foodObj.deductFood(foodS)
      foodObj.display() 
      database.ref('/').set({
        food:foodObj.getFoodStock(),
        feedTime: hour()
      })

  })
}


function draw() {  

  background(46, 139, 87)

  if(foodS === 0){

    dogSprite.addImage(dogSad)

  }

  foodObj.display()
  drawSprites();

  feedTime = database.ref('feedTime')
  feedTime.on('value', function(data){
    lastFed = data.val()
  })
  //add styles here

}

function writeStockNegative(x){

  if(x<=0){
    //nothing
  }
  else{
    x -= 1
  }
    database.ref('/').set({

      food: x
    })
  
}

function writeStockPositive(x){

  x += 1
  
  database.ref('/').set({

    food: x
  })
  
}

function readStock(data){

  foodS = data.val()

}

//if we get errors but i won't get none cuz i am master programmer 
function showError(){

  console.log('error in writing the value in database')
}