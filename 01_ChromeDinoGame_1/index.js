import { Dino } from "./dino.js";
import { InputHandler } from "./input.js";


let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let backImg = document.getElementById("img_back"); //背景


const GAME_WIDTH = 800;　//ゲームキャンバスの幅
const GAME_HEIGHT = 500;　//ゲームキャンバスの高さ

let dino = new Dino(GAME_WIDTH,GAME_HEIGHT);
new InputHandler(dino);


let lastTime = 0;


function gameLoop(timestamp){
    let deltaTime = timestamp -lastTime;
    lastTime = timestamp;

    ctx.drawImage(backImg,0,0,GAME_WIDTH,GAME_HEIGHT); //背景の描写 

    dino.update(deltaTime); 
    dino.draw(ctx);

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
