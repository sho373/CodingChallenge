let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let btn_shuffle = document.getElementById("btn_shuffle");
let btn_start = document.getElementById("btn_start");

let numBar_btn = document.getElementById("btnN");

let slider = document.getElementById("myRangeSpeed");
let output = document.getElementById("demoSpeed"); //値を画面に表示するため

let speed = slider.value;

output.innerHTML = slider.value ; // 速さを画面に表示

slider.oninput = function() {
  speed = slider.value;
  output.innerHTML =  this.value 
}


const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;

let values = [];

let states = [];　//この値によって棒の色を変える

let numBar = 100;

let width = GAME_WIDTH / numBar;

values = new Array(numBar);

ctx.fillStyle="white";

function getRandomDouble(min,max){
    return min + Math.floor(Math.random()*(max - min));
}

function shuffle(){

    for(var i = 0; i < values.length; i++){
        values[i] = getRandomDouble(0,GAME_HEIGHT);
        states[i] = -1;
    }

}


function draw(){

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    
    for(var i = 0; i < values.length; i++){

        ctx.beginPath();
        ctx.rect(i * width,GAME_HEIGHT - values[i],
            width,values[i]);
        ctx.fill();
        ctx.stroke();
    }
}



function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function swap(arr, a, b) {

    await sleep(speed);

    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

async function quicksort(arr,start,end){

    if(start >= end){
        
        return;
    }

    let index = await partition(arr,start,end);
    
    states[index] = -1;

    await Promise.all([quicksort(arr,start,index - 1),
        quicksort(arr, index + 1, end)]);
    
}

async function partition(arr,start,end){

    for(var i = start; i <= end;i++){
        states[i] = 1;
    }

    let pivotIndex = start;
    let pivotValue = arr[end];

    states[pivotIndex] = 0;

    for(var i = start ; i <= end;i++){

        if(arr[i] < pivotValue){
            await swap(arr,i,pivotIndex);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }
    }   

    await swap(arr,pivotIndex,end);

    for(var i = start; i <= end;i++){

        if(i != pivotIndex){
            states[i] = -1;
        }

    }

    return pivotIndex;
}



shuffle();
draw();


function gameLoop(){

    
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
   
        for(var i = 0; i < values.length; i++){

            if(states[i] == 0){
                ctx.fillStyle = "red";
            }else if(states[i] ==  1 ){
                ctx.fillStyle = "blue";
            }else{
                ctx.fillStyle = "white";
            }

            ctx.beginPath();
            ctx.rect(i * width,GAME_HEIGHT - values[i],
                width,values[i]);
            ctx.fill();
            ctx.stroke();
  
        }
        
    requestAnimationFrame(gameLoop);
}




numBar_btn.addEventListener('click',function(){
    
    numBar =  Number(document.getElementById("N").value);

    width = GAME_WIDTH / numBar;
    values = new Array(numBar);
    
    
    if(numBar < 10 || numBar > 500 ){
      alert("10~500の数を入力して下さい");
      numBar = 100;
      width = GAME_WIDTH / numBar;
      values = new Array(numBar);
    }
    
    shuffle();
    draw();
  
})

btn_shuffle.addEventListener('click',function(){

    shuffle();
    draw();
  
});
  
btn_start.addEventListener('click',function(){

    quicksort(values,0,values.length - 1);
   
    requestAnimationFrame(gameLoop);
    
});
    
