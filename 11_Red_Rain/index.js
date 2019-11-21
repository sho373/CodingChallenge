import {Rain} from "./rain.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;

let backImg = document.getElementById("img_back");

let rain = [];

for(var i = 0; i < 140; i++){
    rain.push(new Rain(GAME_WIDTH,GAME_HEIGHT));
}


function gameLoop(){

    ctx.drawImage(backImg,0,0,GAME_WIDTH,GAME_HEIGHT); //背景の描写 

    for(var i = 0; i < rain.length;i++){
        rain[i].update();
        rain[i].draw(ctx);
    }

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);