const randomNumber = Math.floor(Math.random() * 6 + 1)

const randomNumber2 = Math.floor(Math.random() * 6 + 1)

 let image1 = document.querySelector('.img1')

 let image2 = document.querySelector('.img2')

 function result (){
  if (randomNumber === 1){
    image1.src = 'images/dice1.png'
    }else if (randomNumber === 2){
     image1.src = 'images/dice2.png'
 
    }else if (randomNumber === 3){
     image1.src = 'images/dice3.png'
 
    }else if (randomNumber === 4){
     image1.src = 'images/dice4.png'
 
    }else if (randomNumber === 5){
     image1.src = 'images/dice5.png'
 
    }else if (randomNumber === 6){
     image1.src = 'images/dice6.png'
 }
 }

 function result1 (){

  if (randomNumber2 === 1){
    image2.src = 'images/dice1.png'
    }else if (randomNumber2 === 2){
     image2.src = 'images/dice2.png'
 
    }else if (randomNumber2 === 3){
     image2.src = 'images/dice3.png'
 
    }else if (randomNumber2 === 4){
     image2.src = 'images/dice4.png'
 
    }else if (randomNumber2 === 5){
     image2.src = 'images/dice5.png'
 
    }else if (randomNumber2 === 6){
     image2.src = 'images/dice6.png'
 }
 }

 result();
 result1();

 

