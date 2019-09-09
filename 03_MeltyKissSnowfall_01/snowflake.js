export class SnowFlake{
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.img_normal = document.getElementById("img_meiji");
        this.img_ichigo = document.getElementById("img_ichigo");
        this.img_macha = document.getElementById("img_macha");
        this.r = 20;
        this.width = this.r  *2;
        this.height = this.r * 2;
        this.position = {
            x:50,
            y:50
        };
        this.speed = 2;
    }
    
    update(deltaTime){
        this.position.y += this.speed;
       
    }
    draw(ctx){
        ctx.drawImage(this.img_ichigo,this.position.x,this.position.y,this.width,this.height);
    }
}