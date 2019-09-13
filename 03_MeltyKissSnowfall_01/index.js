import { Snowflake } from "./snowflake.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;

let backImg = document.getElementById("img_back");

let snowflake = [];

for(var i = 0 ; i<80;i++){
    snowflake.push(new Snowflake(GAME_WIDTH,GAME_HEIGHT));
    
}

let lastTime = 0;
function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.drawImage(backImg,0,0,GAME_WIDTH,GAME_HEIGHT);

    for(let flake of snowflake){
        flake.update(deltaTime);
        flake.draw(ctx);
    }
    

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
