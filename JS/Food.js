class Food {

    constructor(){

        var foodStock, lastFed
        this.milk = loadImage('images/Milk.png')
    }

    getFoodStock(){

        var foodStockRef = database.ref('food')
        foodStockRef.on('value', function(data){
            foodStock = data.val()
        })
        
    }
    
    updateFoodStock(foodS){

        database.ref('/').update({
            food: foodS

        })
    }

    deductFood(x){

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
    
    addFood(x){

        x += 1
        database.ref('/').set({

            food: x
        })  

    }
    display(){
        var x = 80, y =100
        console.log('yayayayay')
        imageMode(CENTER)
        image(this.milk, 720, 220, 70, 70)

        if(this.foodStock != 0){
            for(var i = 0; i<this.foodStock;i++){
                if(1%10==0){
                    x=80
                    y += 50
                    print('yyy')
                }
                image(this.milk, x, y, 50, 50)
                x += 30
            }


        }
    }



}