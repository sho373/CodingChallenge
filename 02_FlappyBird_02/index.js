import {Bird} from "./bird.js";
import {InputHandler} from "./input.js";
import {Pipe} from "./pipe.js";

export function getRandomInt(min,max){
    return Math.floor(min + Math.random()*(max-min+1));
}

let canvas = document.getElementById("gameScreen"); //HTMLファイルとの関連付け
let ctx = canvas.getContext("2d"); //getContextメソッドで描写機能をオン

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;


//クラスからオブジェクトを作成
//変数名は作成したオブジェクトを認識するための名前
let bird = new Bird(GAME_WIDTH,GAME_HEIGHT);
new InputHandler(bird);
let pipe = [];

let lastTime =0;
let counter = 0;
let interval = 0;

//アップデートして再描写するためのゲームループ関数
function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    
    bird.update(deltaTime);
    bird.draw(ctx);
    
    counter += deltaTime;
    if(counter > interval ){
        pipe.push(new Pipe(GAME_WIDTH,GAME_HEIGHT));
        counter = 0;
        interval = getRandomInt(200,1000);
    }
    
    for(var i = pipe.length -1;i >= 0;i--){
        pipe[i].update(deltaTime);
        pipe[i].draw(ctx);
        if(pipe[i].checkHit(bird)){
            console.log("HIT");
        }
        if(pipe[i].offScreen()){
            pipe.splice(i,1);
        }
    }
    

    requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);
