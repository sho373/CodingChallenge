let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 400; 
const GAME_HEIGHT = 400;
const r = GAME_HEIGHT / 2;

let total = 0; //全ての点の数
let circle = 0; //円内の点の数
let pi = 0;　


function setup(){
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.stroke();
}
function getRandomDouble(min,max){
    return Math.random()*(max - min) + min;
}
//点を描画する関数
function draw(ctx,x,y){
    ctx.beginPath();
    ctx.arc(x,y,1,0,2*Math.PI);
    ctx.fill();
}
//距離を求める関数
function getDistance(x1,y1,x2,y2){
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

setup();

function gameLoop(timestamp){

    for(var i = 0; i < 10; i++){
        let x = getRandomDouble(0,GAME_WIDTH);
        let y = getRandomDouble(0,GAME_HEIGHT);
        total++;
    
        let d = getDistance(r,r,x,y);
        
        //もし円の内側だったら色を赤に、それ以外の場合は点の色を緑にする
        if(d < r){
            circle++;
            ctx.fillStyle = "red";
           
        }else{
            ctx.fillStyle = "green";
            
        }
        
        draw(ctx,x,y);
        
        pi = 4 * (circle / total);　//πを求める
    
       
    }
    piValue.innerHTML = pi;
    circleValue.innerHTML = circle;
    totalValue.innerHTML = total;

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
