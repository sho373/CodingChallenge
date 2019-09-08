import {getRandomInt} from "./index.js";

export class Pipe{
    constructor(gameWidth,gameHeight){
        this.gameWidth= gameWidth;
        this.gameHeight = gameHeight;
        this.x = this.gameWidth;
        this.width  = 20;　//パイプの太さ
        this.top = getRandomInt(0,this.gameHeight/2); //上のパイプの長さ
        this.bottom= getRandomInt(0,this.gameHeight/2);　//下のパイプの長さ
        this.speed = 5;
        this.highLight = false;

    }
    //画面外かどうかの判定
    offScreen(){
        if(this.x <= -this.width){
            return true;
        }else{
            return false;
        }
    }
    //パイプと鳥の当たり判定
    checkHit(bird){
        if(bird.position.y < this.top+bird.r
            || bird.position.y > this.gameHeight - this.bottom-bird.r){
                if(bird.position.x > this.x
                    && bird.position.x < this.x + this.width){
                        this.highLight = true;
                        return true;
                }
        }
        else{
            return false;
        }
        this.highLight = false;
    }
    update(deltaTime){
        this.x -= this.speed;
    }
    draw(ctx){
        if(this.highLight){
            ctx.fillStyle = "red";
        }else{
            ctx.fillStyle = "green";
        }
        
        ctx.fillRect(this.x,0,this.width,this.top);　//上のパイプの描画
        ctx.fillRect(this.x,this.gameHeight-this.bottom,this.width,this.bottom);　//下のパイプの描画
    }
}