
export default class InputHandler{
    constructor(bird){
      //特定のイベントが行われたときに呼び出される関数を設定する

       document.addEventListener("keydown",event =>{

           switch(event.keyCode){
               case 38:
                bird.up();
                break;


           }
       });

    }
}
