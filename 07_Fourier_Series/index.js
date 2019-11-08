let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

//おまけパート↓
var slider = document.getElementById("myRangeSpeed");
var output = document.getElementById("demoSpeed");

var slider2 = document.getElementById("myRangeN");
var output2 = document.getElementById("demoN");

let speed = slider.value;　/*速さ*/
let N = slider2.value; /*Nの数*/


output.innerHTML = "<span style='color: white;'>" + slider.value + "</span>" ; // スライダー（速さ）
output2.innerHTML = "<span style='color: white;'>" + slider2.value + "</span>" ;　// スライダー（N）

//スライダの情報をアップデート
slider.oninput = function() {
 speed = slider.value;
  output.innerHTML =  "<span style='color: white;'>" + this.value + "</span>" ;
}

slider2.oninput = function() {
    N = slider2.value;
    output2.innerHTML =  "<span style='color: white;'>" + this.value + "</span>" ;
}
//おまけパート↑


let theta = 0;

let x = 0;
let y = 0;
let original_r = 0;

let prevx = x;
let prevy = y;

//おまけパート↓

let n = 0;
let coef = 0;

let flag = "square_flag";

let triangle_div = document.getElementById("triangle");
let square_div = document.getElementById("square");
let sawtooth_div = document.getElementById("saw");

triangle_div.addEventListener('click',function(){
    flag = 'triangle_flag'; 
})

square_div.addEventListener('click',function(){
    flag = 'square_flag';
})

sawtooth_div.addEventListener('click',function(){
    flag = 'sawtooth_flag';
})

//おまけパート↑


ctx.lineWidth = 2;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;

let original_x = 200;
let original_y = 200;

let wave = [];

let xoff = 200; //波をｘ軸側にずらす

//外枠だけの円の描画
function drawStrokeCircle(x,y,r){
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.stroke();
}

//塗りつぶされた円の描画
function drawFillCircle(x,y,r){
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fill();
}

//線の描画
function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}


function gameLoop(){
    
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    
    x = 0;
    y = 0;

    for(var i = 0; i < N;i++){
        
        prevx = x;
        prevy = y;

        switch (flag){

            //三角波
            case 'triangle_flag':

                    if( i % 2 == 0){
                        n = i * 2 + 1; 
                    }else{
                        n = -( i * 2 + 1 );  
                    }
                    
                    coef = n;

                    original_r = 30 * (8 / (n * n *Math.PI));

                break;
            
            //矩形波
            case 'square_flag':

                    n = i * 2 + 1;
                    coef = n;

                    original_r =60 * (4 / (n * Math.PI));

                break;
                    
            //のごぎり波
            case 'sawtooth_flag':

                    if( i % 2 == 0){
                        n = i + 1;
                    }else{
                        n = -( i + 1);
                    }

                    coef = i+1;

                    original_r =Math.abs( 120 * ( 2 / (n * Math.PI)));
                break;
            
        }

        x += original_r * Math.cos(coef * theta);
        y += original_r * Math.sin(coef * theta);
        
        drawStrokeCircle(original_x + prevx,original_y + prevy, original_r);

        drawFillCircle((x + original_x), (y + original_y), 2);
    
        drawLine(original_x + prevx, original_y + prevy, original_x + x,
            original_y + y,original_r);
    }


    wave.unshift(y);


    for(var i = 0; i < wave.length; i++){

        drawFillCircle(i + original_x + xoff ,wave[i] + original_y,0.1);

        drawLine(i + original_x + xoff ,wave[i] + original_y,
            i + 1 + original_x + xoff ,wave[i + 1] + original_y);
    }


    drawLine(x + original_x,y + original_y,
        original_x + xoff ,wave[0] + original_y);

    if(wave.length > 250){
        wave.pop();
    }

    theta -= (0.005 * speed);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);