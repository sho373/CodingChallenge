let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");


const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;

const offset = 40;　//余白分

const canvas_width = GAME_WIDTH - offset; //点を打つ範囲の幅
const canvas_height = GAME_HEIGHT - offset;　//点を打つ範囲の高さ

const interval = 40; //グリッドの幅
const needleLength = interval / 2;　//針の長さ。係数を綺麗にするために針の長さは幅の二分の一
const r = needleLength / 2;　//針の中心

let total = 0;　//全ての針の数
let cross = 0;　//針が線に当たった数

//ランダムな数を生成
function getRandomDouble(min,max){
    return Math.random()*(max- min) + min;
}

//グリッド（線）を描画
function draw(y){
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(offset,offset+y);
    ctx.lineTo(canvas_width, offset+y);
    ctx.stroke();
}

//針の描画
function drawNeedle(x1,y1,x2,y2,x,y){
    
    ctx.beginPath();
    ctx.arc(x,y,2,0,2*Math.PI);　//針の中心に丸を描画
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

//グリッドを描画するため
function setup(){
   
    let y_ = 0;

    for(var i = 0; i <= (GAME_HEIGHT - (2*offset)) / interval; i++){
       
        draw(y_); //interval の間隔ごとに線を描画
        
        y_ += interval;
    }
}


setup();

//針の両端の座標
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;

let d = 0; //針の中心から線までの距離

function gameLoop(){

    for(var i = 0; i < 1; i++){

        //グリッド内の範囲でランダムな数を生成
        let x = getRandomDouble(offset,canvas_width);
        let y = getRandomDouble(offset,canvas_height);

        total++;
       
        let phi = getRandomDouble(0,Math.PI);　//角度　0<=phi<=π
        
        //針の両端の座標
        x1 = x - r * Math.cos(phi);
        y1 = y - r * Math.sin(phi);
        x2 = x + r * Math.cos(phi);
        y2 = y + r * Math.sin(phi);

        //針の中心から一番近い線を探す
        if(((y-offset) % interval) > interval/2){

            //針の中心から線までの距離
             d = ( interval - ((y - offset) % interval)) ; //　0 <= d <= interval/2
            
        } else {
            //針の中心から線までの距離
             d = (y-offset) % interval; //　0 <= d <= interval/2
        }
        

        //針が線に当たったかどうかの判定
        if((needleLength/2)*Math.sin(phi) >= d ){

            //当ったら色を赤に
            ctx.strokeStyle = "red";

            cross++;
            
        }else{
            ctx.strokeStyle = "green";
        }
        
        drawNeedle(x1,y1,x2,y2,x,y);　//線の描画
    }
   
    let pie = (total / cross);

    piValue.innerHTML = pie;
    circleValue.innerHTML = cross;
    totalValue.innerHTML = total;
    
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
