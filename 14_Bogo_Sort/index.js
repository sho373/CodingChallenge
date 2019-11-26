const GAME_WIDTH = 700;
const GAME_HEIGHT = 400;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let btn_shuffle = document.getElementById("btn_shuffle");
let btn_start = document.getElementById("btn_start");
let numBar = Number(document.getElementById("N").value);


//棒の数とSpeedを決める
let slider = document.getElementById("myRangeSpeed");
let output = document.getElementById("demoSpeed");

let numBar_btn = document.getElementById("btnN");

let speed = slider.value;　//速さ

output.innerHTML = slider.value ; // 速さを画面に表示

slider.oninput = function() {
  speed = slider.value;
  output.innerHTML =  this.value 
}

//Enter ボタンの処理
numBar_btn.addEventListener('click',function(){
  
  numBar =  Number(document.getElementById("N").value);

  //10以上だとかなりの時間がかかるので
  if(numBar < 3 || numBar > 10 ){
    alert("3~10の数を入力して下さい");
    numBar = 3;
  }

  reset();
  shuffle();
  draw();

})



let elements = [];

elements = new Array(numBar);

let width = GAME_WIDTH / numBar;

let count = 0;

let lapseTime_sec = 0;

let startTime = 0;
let endTime = 0;

let isSortedFlag = false;


function reset(){

  timeValue.innerHTML = "";
  count = 0;
  countValue.innerHTML = count;
  width = GAME_WIDTH / numBar;

  elements = new Array(numBar);

  lapseTime_sec = 0;
  startTime = 0;
  endTime = 0;
  isSortedFlag = false;
}

function getRandomDouble(min,max){
  return min + Math.random()*(max - min);
}

function shuffle(){
  
  for(var n = 0; n < elements.length; n++){
    elements[n] = getRandomDouble(0,GAME_HEIGHT);
  } 

}

function draw(){
  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
  for (let i = 0; i < elements.length; i++) {

    ctx.beginPath();
    ctx.fillRect(i * width, GAME_HEIGHT - elements[i],
      width,elements[i]);
    ctx.fill();  
  }

}

function isSorted(elements){

  for(var i = 0; i < elements.length; i++){
    
    if(elements[i] > elements[i + 1]){
      return false;
    }
  }
  
  return true;
  
}


shuffle();
draw();

let lastTime = 0;
let counter = 0;

function gameLoop(timestamp){
  
  let deltaTime = timestamp -lastTime;
  lastTime = timestamp;
  
  counter += deltaTime;

  if(counter > speed){

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

    if(isSorted(elements)){

      endTime = performance.now();

      lapseTime_sec = ((endTime - startTime)/1000); 

      //.000までの秒数を表示
      timeValue.innerHTML = Math.floor(lapseTime_sec * 1000) / 1000;

      document.getElementById("btn_shuffle").disabled = false;
      document.getElementById("btn_start").disabled = false;     
            
      isSortedFlag = true;
    }

  
    if(!isSortedFlag){
      shuffle();    
      draw();
    }

    //昇順になっていたら終了
    if(isSortedFlag){
      draw();
      return;
    }
    
    count++;
    countValue.innerHTML = count;
    
    counter = 0;
  }
 

  requestAnimationFrame(gameLoop);
}


btn_shuffle.addEventListener('click',function(){

  reset();
  shuffle();
  draw();

});

btn_start.addEventListener('click',function(){

  document.getElementById("btn_shuffle").disabled = true;
  document.getElementById("btn_start").disabled = true;

  startTime = performance.now(); 
  
  requestAnimationFrame(gameLoop);
  
});
  




