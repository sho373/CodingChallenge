export class Bird{
  //自動的に実行されるメソッドで初期化のためのもの
    constructor(gameWidth,gameHeight){
        this.gameWidth= gameWidth;
        this.gameHeight = gameHeight;
        this.position ={
            x: 20,
            y: this.gameHeight/2
        };
        this.r = 20;
        this.gravity = 0.5;
        this.speed = 0;
        this.lift = -10;

    }
    up(){
        this.speed = this.lift;
    }
    update(deltaTime){
        this.position.y += this.speed;

       
        this.speed += this.gravity;

        if(this.position.y >= this.gameHeight-this.r){
            this.position.y = this.gameHeight-this.r;
            this.speed = 0;
            
        }
    }
    draw(ctx){
        ctx.beginPath(); //パスを初期化　リセット
        ctx.fillStyle = "blue";
        ctx.arc(this.position.x,this.position.y,this.r,0,2*Math.PI);
        ctx.fill();　//塗りつぶし
        
    }
}
