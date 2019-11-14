let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

let div = [];

let koukaon =  []; //10個の効果音配列
let bgm = [];　　　//10個のbgm配列

let stop = [];  //10個のbgm用ストップ配列

let bottunNum = 10;　

let bgm_flag = 0;


ctx.fillStyle = 'white';
ctx.font = 'bold 40pt sans-serif';
ctx.fillText('効果音',100,100,100); 


let koukaon_div = document.getElementById("koukaon");
let bgm_div = document.getElementById("bgm");


for(var i = 0; i < bottunNum;i++){

     div[i] = document.getElementById(i);  //ボタン（画像）

     koukaon.push(new Audio("./sounds/" + i + ".mp3"));　//効果音読み込み
     bgm.push(new Audio("./bgm/" + i + ".mp3"));　　　//bgm読み込み
     
     stop.push(0);    //bgm用ストップ配列
}



koukaon_div.addEventListener('click',function(){　　//効果音ボタンが押されたとき

    bgm_flag = 0; 

    ctx.clearRect (0,0,width,height);  
    ctx.fillText('効果音',100,100,100); 
    
})

bgm_div.addEventListener('click',function(){　//bgmボタンが押されたとき

    bgm_flag = 1; 

    ctx.clearRect (0,0,width,height);
    ctx.fillText('BGM',100,100,100);   
})

function chose_music(bgm_flag,i){

    koukaon[i].currentTime = 0;  //効果音の連続再生のため
    
    if(bgm_flag){

        koukaon[i].pause();　　//効果音を止める
        //bgm[i].play();　　//bgmを再生

        var playPromise = bgm[i].play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
            
            })
            .catch(error => {
            console.log(error);
            });
        }

        stop[i]++;
        stop[i] = (stop[i]) % 2;
        
    }else{
        
        koukaon[i].play();　　//効果音を再生
        
    }  
   
}

function stop_music(stop,i){
 
    if(!stop[i]){
         bgm[i].pause() ;
    }

}

div[0].addEventListener('click',function(){

   chose_music(bgm_flag,0);
   stop_music(stop,0);

});

div[1].addEventListener('click',function(){

    chose_music(bgm_flag,1);
    stop_music(stop,1);

});

div[2].addEventListener('click',function(){

    chose_music(bgm_flag,2);
    stop_music(stop,2);

});

div[3].addEventListener('click',function(){
    
    chose_music(bgm_flag,3);
    stop_music(stop,3);

});

div[4].addEventListener('click',function(){
   
    chose_music(bgm_flag,4);
    stop_music(stop,4);

});

div[5].addEventListener('click',function(){
    
    chose_music(bgm_flag,5);
    stop_music(stop,5);

});

div[6].addEventListener('click',function(){
    
    chose_music(bgm_flag,6);
    stop_music(stop,6);

});

div[7].addEventListener('click',function(){
    
    chose_music(bgm_flag,7);
    stop_music(stop,7);
    
});

div[8].addEventListener('click',function(){
    
    chose_music(bgm_flag,8);
    stop_music(stop,8);

});

div[9].addEventListener('click',function(){
    
    chose_music(bgm_flag,9);
    stop_music(stop,9);

});

 
