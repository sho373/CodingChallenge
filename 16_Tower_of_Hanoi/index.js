let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let btn_start = document.getElementById("btn_start");

let n_btn = document.getElementById("btnN");

let slider = document.getElementById("myRangeSpeed");
let output = document.getElementById("demoSpeed"); //値を画面に表示するため


let speed = slider.value;

output.innerHTML = slider.value ; // 速さを画面に表示

slider.oninput = function() {
  speed = slider.value;
  output.innerHTML =  this.value 
}

const GAME_WIDTH = 900;
const GAME_HEIGHT = 500;

const xOffset = 150; //３本の棒を画面内にバランスよく表示させるため
const yOffset = 50;

const canvasWidth = GAME_WIDTH - 2 * xOffset;　
const canvasHeight = GAME_HEIGHT -  yOffset;

let interval = canvasWidth / (3 - 1);　//棒と棒の間隔

let n = 3;　//板の枚数


ctx.font = "bold 50px serif";

let barLength = 300;
let barWidth = 20;

let towerA = [];
let towerB = [];
let towerC = [];

let maxDiskWidth = 100;
let diskHeight = 20;

let diskOffset = maxDiskWidth / n;


function drawBar(){

    ctx.fillStyle = "white";

    for(var i = 0; i < 3 ; i++){
    
        ctx.beginPath();
        ctx.rect( xOffset + (interval- barWidth) * i, 
            canvasHeight - barLength, barWidth,barLength);
        ctx.fill();
    }
}

async function drawDisk(diskWidth,placeTower,level){
    
    ctx.beginPath();
    ctx.rect((xOffset - maxDiskWidth) + placeTower *(interval- barWidth) + ( diskWidth * diskOffset), 
        canvasHeight - diskHeight - (level * barWidth),
        (maxDiskWidth - diskWidth * diskOffset)* 2 + barWidth,diskHeight);
    ctx.fill();
    ctx.stroke(); 
}

async function moveDisk(from,to){

    await sleep(speed); 
    
    var addIndex = from.length - 1;
    var addValue = from[addIndex];
    
    from.pop();
    to.push(addValue);
    
}



async function drawTowerA(value){
   
    for(var i = 0; i < towerA.length;i++){
        drawDisk(value[i],0,i);
    }
}

async function drawTowerB(value){
   
    for(var i = 0; i < towerB.length;i++){
        drawDisk(value[i],1,i);
    }
}

async function drawTowerC(value){

    for(var i = 0; i < towerC.length;i++){
        drawDisk(value[i],2,i);
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}



async function hanoiTower(n,from,to,remain){
  
    if(n == 0){

        return;

    }else{
        
        

        await hanoiTower(n - 1,from,remain,to);

        await moveDisk(from,to);
        
        count++;
       
        await hanoiTower(n - 1,remain,to,from);
          
    }
}

function reset(){

    count = 0;

    towerA.length = 0;
    towerB.length = 0;
    towerC.length = 0;

    n =  Number(document.getElementById("N").value);
    diskOffset = maxDiskWidth / n;

    for(var i = 0; i < n ; i++){
        towerA.push(i);
    }

}

//3本のバーと初期位置（towerA）に板描画
drawBar();

for(var i = 0; i < n ; i++){
    towerA.push(i);
}


let count = 0;

ctx.fillStyle = "blue";
drawTowerA(towerA);



function gameLoop(){
    
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

    drawBar();

    ctx.fillStyle = "blue";

    drawTowerA(towerA);
    drawTowerB(towerB);
    drawTowerC(towerC);
 
    ctx.fillStyle = "white";
    ctx.fillText("回数：" + count,650,60);

    requestAnimationFrame(gameLoop);

}

n_btn.addEventListener('click',function(){
    
    count = 0;
    towerA.length = 0;
    towerB.length = 0;
    towerC.length = 0;

    n =  Number(document.getElementById("N").value);

    if(n < 3 || n> 10){
      
      alert("３~１０の数を入力して下さい");
      
      n = 3;
      
    }

    diskOffset = maxDiskWidth / n;

    for(var i = 0; i < n ; i++){
        towerA.push(i);
    }

    drawTowerA(towerA);
  
})

btn_start.addEventListener('click',function(){

    reset();

    hanoiTower(n,towerA,towerB,towerC);
   
    requestAnimationFrame(gameLoop);
    
});
