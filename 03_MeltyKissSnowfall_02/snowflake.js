function getRandomDouble(min, max) {
    return (Math.random() * (max - min)) + min;
  }
function getRandomInt(min,max) {
    return Math.floor(min+Math.random() * (max - min + 1));
}

var melty; //描画するメルティキッスを選択するため

export class Snowflake{
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.img_meiji = document.getElementById("img_meiji");
        this.img_macha = document.getElementById("img_macha");
        this.img_ichigo = document.getElementById("img_ichigo");
        this.r = getRandomDouble(8,25);
        this.width = this.r*2;
        this.height = this.r * 2;
        this.alpha=this.changeScale(this.r,8,25,0.5,1);
        this.xoff = 0;
        this.dir = (Math.random() > 0.5) ? 1 : -1;
        this.index = getRandomInt(1,3);
    }
    randomize(){
        this.position ={
            x:getRandomDouble(0,this.gameWidth),
            y:getRandomDouble(-200,-50)
        }; 

        this.speed = Math.sqrt(this.r)*0.4;
        this.angle = getRandomDouble(0,2*Math.PI);
        //this.xoff = Math.sin(this.angle)*0.3;
        
    }
    update(deltaTime){
        
        //メルティキッスが下へ落ちていく動作
        this.position.y += this.speed;

        this.xoff = Math.sin(this.angle) + Math.sin(3*this.angle);
        
        //左右に少しずれる
        this.position.x += (this.xoff * 0.1);
    
        if(this.position.y >= this.gameHeight+this.r){
            this.randomize();
        }
        
    }
  
    changeScale(value,minOld,maxOld,minNew,maxNew){
        return ((maxNew- minNew)/(maxOld - minOld))*(value - maxOld) + maxNew;

    }

    drawRotatedImage(ctx,image, xa, ya) { 
 
        // 現在の座標システムを保存
        ctx.save(); 
     
        //回転したい画像の中心へと移動
        ctx.translate(xa, ya);
     
        // 移動した点を起点に画像を回転
        ctx.rotate(this.angle);

        // 元の場所へ戻る
        ctx.translate(-xa, -ya);
        
        //画像を描画
        ctx.drawImage(image,this.position.x,this.position.y,this.width,this.height);

        // 座標を復元
        ctx.restore(); 

        this.angle += (this.dir * this.index * 0.003);
   
    }

    draw(ctx){
        
        ctx.globalAlpha = this.alpha;
        
        switch(this.index){
            case 1:
                melty = this.img_meiji;
                break;
            case 2:
                melty = this.img_macha;
                break;
            case 3:
                melty = this.img_ichigo;
                break;
            default:
                melty = this.img_macha;
        }
        //ctx.drawImage(this.img_meiji,this.position.x,this.position.y,this.width,this.height);
       this.drawRotatedImage(ctx,melty,this.position.x+this.r,this.position.y+this.r);
       
    }
}
