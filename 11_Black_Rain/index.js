import {Rain} from "./rain.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;
const GAME_WIDTH = canvas.width
const GAME_HEIGHT = canvas.height

let backImg = document.getElementById("img_back");

let rain = [];

for(var i = 0; i < canvas.width / 20; i++){
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
