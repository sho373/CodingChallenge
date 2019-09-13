import {Snowflake} from "./snowflake.js";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let backimage = document.getElementById("img_back"); //背景写真

let snowflake = [];

for(var i = 0;i<90;i++){
    snowflake.push(new Snowflake(GAME_WIDTH,GAME_HEIGHT)); 
    snowflake[i].randomize();  
}


let lastTime = 0;


function gameLoop(timestamp){

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
        
    ctx.drawImage(backimage,0,0,GAME_WIDTH,GAME_HEIGHT);

    for(let flake of snowflake){
        flake.update(deltaTime);
        flake.draw(ctx);
    }
    
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
