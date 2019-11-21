function getRandomDouble(min,max){
    return min + Math.random()*(max - min);
}

export class Rain{

    constructor(gameWidth,gameHeight){

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.length = getRandomDouble(50,110);
        this.position ={
            x:getRandomDouble(0,gameWidth),
            y:getRandomDouble(-400,-200)
        };
        this.speed = getRandomDouble(2,7);
        this.width = 2;
        this.color = "#c9171e";
        this.alpha=this.changeScale(this.length,50,110,0.1,0.5);

    }

    changeScale(value,minOld,maxOld,minNew,maxNew){
        return ((maxNew- minNew)/(maxOld - minOld))*(value - maxOld) + maxNew;
    }

    draw(ctx){
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x,this.position.y,this.width,this.length);
    }

    update(){

        this.position.y += this.speed;
        
        this.speed = this.speed + 0.08;

        if(this.position.y > this.gameHeight){
            this.position.y = - this.length;
            this.speed = getRandomDouble(2,7);
            this.position.x = getRandomDouble(0,this.gameWidth);            
        }
    }
}