class Food {
  constructor(){
  this.foodStock=0;
  this.lastFed;
  this.image=loadImage('Images/Milk.png');
  }

 updateFoodStock(foodStock){
  this.foodStock=foodStock;
 }

 getFedTime(lastFed){
   this.lastFed=lastFed;
 }

 deductFood(){
   if(this.foodStock>0){
    this.foodStock=this.foodStock-1;
   }
  }

  getFoodStock(){
    return this.foodStock;
  }

  bedRoom (){
    background(this.bedRoom,550,500);
  }

  garden(){
    background(this.garden,550,500);
  }

  washRoom(){
    background(this.washRoom,550,500);
  }
  display(){
    var x=50,y=30;
    
    //imageMode(CENTER);
   // image(this.image,420,220,70,70);
    
    if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x=80;
          y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
      }
    }
  }
}