//Create variables here
var dog,dogImg,happyDog,foods,database,foodStock ;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,10,20);
  dog.scale = 0.3 ;
  dog.addImage(dogImg);
 
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(happyDog);
  }
 

  drawSprites();
  //add styles here
  text("FOODS REMAINING :"+ foods ,200 , 400);
  fill('black');
  textSize(1000);


}

function readStock(data){

  foods=data.val();
}

function writeStock(x){

  if(x <= 0){
    x=0 ;
  }
  else{
    x = x-1
  }

  database.ref('/').update({

    Food : x 

  })

}
