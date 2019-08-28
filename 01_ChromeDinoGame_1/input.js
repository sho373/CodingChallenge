export class InputHandler{
    constructor(dino){
        document.addEventListener("keydown",event =>{
            switch(event.keyCode){
                case 38: //キーボードの上↑のボタンが押されたとき
                    dino.up();
                    break;
               
            }
        })
    }
}