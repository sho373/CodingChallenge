import Bird from "./bird.js";
import InputHandler from "./input.js";

let canvas = document.getElementById("gameScreen"); //HTMLファイルと関連付け
let ctx = canvas.getContext("2d"); //getContextメソッドで描写機能をオンにしています

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;


//クラスからオブジェクトを作成
//変数名は作成したオブジェクトを認識するための名前
let bird = new Bird(GAME_WIDTH,GAME_HEIGHT);
new InputHandler(bird);

let lastTime =0;


//アップデートして再描写するためのゲームループ関数
function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    
    bird.update(deltaTime);
    bird.draw(ctx);
   
    requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);
