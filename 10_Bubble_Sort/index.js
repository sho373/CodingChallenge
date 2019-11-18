let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let btn_shuffle = document.getElementById("btn_shuffle");
let btn_start = document.getElementById("btn_start");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 450;

let elements = [];

elements = new Array(GAME_WIDTH);

function getRandomDouble(min,max){
    return min + Math.random()*(max - min);
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

btn_shuffle.addEventListener('click',function(){

  shuffle();

});

btn_start.addEventListener('click',function(){

  document.getElementById("btn_shuffle").disabled = true;
  document.getElementById("btn_start").disabled = true;

  startTime = performance.now();
  
  requestAnimationFrame(gameLoop);
  
});

let i = 0;

let lapseTime_sec = 0;
let isSorted = false;

let startTime = 0;
let endTime = 0;

elementValue.innerHTML = GAME_WIDTH;　　//エレメント数を表示


function shuffle(){

  timeValue.innerHTML = "";
  isSorted = false;

  i = 0;
  
  lapseTime_sec = 0;

  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

  for(var n = 0; n < elements.length; n++){
    elements[n] = getRandomDouble(0,GAME_HEIGHT);
  }

  for (let i = 0; i < elements.length; i++) {
    ctx.beginPath();
    ctx.moveTo(i, GAME_HEIGHT);
    ctx.lineTo(i, GAME_HEIGHT - elements[i]);
    ctx.stroke();
  }

}


shuffle();

function gameLoop(){
  
  
        ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

        if (i < elements.length) {

            for (let j = 0; j < elements.length - i - 1; j++) {
              
              let a = elements[j];
              let b = elements[j + 1];

              if (a > b) {
                swap(elements, j, j + 1);
              }
            }

          } else {

            endTime = performance.now();

            lapseTime_sec = ((endTime - startTime)/1000);

            timeValue.innerHTML = Math.floor(lapseTime_sec * 1000) / 1000;
            
            document.getElementById("btn_shuffle").disabled = false;
            document.getElementById("btn_start").disabled = false;
            
            isSorted = true;

          }

          i++;
        
          for (let i = 0; i < elements.length; i++) {
            ctx.beginPath();
            ctx.moveTo(i, GAME_HEIGHT);
            ctx.lineTo(i, GAME_HEIGHT - elements[i]);
            ctx.stroke();
          }

        if(isSorted){
          return;
        }
    
  
  requestAnimationFrame(gameLoop);
}


  




