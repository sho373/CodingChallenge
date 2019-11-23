//7セグメントを表示するキャンバス
let canvas = document.getElementById("gameScreen"); 
let ctx = canvas.getContext("2d");

//お見事！正解ですと表示するキャンバス
let textCanvas = document.getElementById("textScreen");
let textCtx = textCanvas.getContext("2d");

let button = document.getElementById("btn");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;

const digit = 4;
const answerArr = [];

let eat = 0;
let bite = 0;

let count = 0;

function getRandomInt(){
    return Math.floor(Math.random()*10);
}

function generateNum(){

    for(var i = 0; i < digit; i++){

        //重複する数字が無い配列の作成
       
        var val = getRandomInt();

        for(var j = 0; j < i;j++){

            if(val == answerArr[j]){
                val = getRandomInt();
                j = -1;
            }
        }
            
        answerArr[i] = val;
        
    }
    
    for(var i = 0; i < digit; i++){
        console.log(i,answerArr[i]);
    } 
}


function checkInput(){

    let guessStr = document.getElementById("guess").value;
    
    //桁数が違う場合
    if(guessStr.length != digit){
         return 1;
    }
    
    let guessNum = Number(guessStr);
    
    //整数ではない場合
    if(!(Number.isInteger(guessNum))){
        return 2;
    };

    //同じ数字を含んでいる場合
    for(var i = 0; i < digit; i++){
        for(var j = 0; j < i; j++){
            if(guessStr[i] == guessStr[j]){
                return 3;
            }
        }
    }
    
    return guessStr;  
}


function judge(answerArr,guessStr){

    for(var i = 0; i < digit; i++){

        for(var j = 0; j < digit;j++){
            
            if(answerArr[i] == guessStr[j]){
                if(i == j){
                    eat++;
                }else{
                    bite++;
                }
                
            }

        }

    }

}

function resetEatBite(){
    eat = 0;
    bite = 0;
    eatValue.innerHTML = "";
    biteValue.innerHTML = "";
}



generateNum();

button.addEventListener('click',function(){
   
    let isCheckedStr = checkInput();

    //打ち込んだ数字にエラーが無いかチェック
    switch(isCheckedStr){
        case 1:alert("４桁の数を入力してください"); break;
        case 2:alert("整数を入力してください"); break;
        case 3:alert("全て異なる数字を入力してください"); break;
    }

    //エラーがある場合、isCheckedStrは文字列ではなく数字
    if(typeof isCheckedStr == "string"){

        resetEatBite();

        judge(answerArr,isCheckedStr);

        //console.log("Eat:",eat,"Bite:",bite);

        count++;

        eatValue.innerHTML = eat;
        biteValue.innerHTML = bite;

        document.getElementById('hintMessage').style.display = 'block';　//eat,biteの数字を表示

        tryValue.innerHTML = count;

        document.getElementById('tryMessage').style.display = 'block';　//何回目のトライか表示   

    }
    
    //4 EATの場合
    if(eat == digit){
        
        textCtx.fillStyle = "black";
        textCtx.font = "bold 30px serif";

        textCtx.fillText("お見事！正解は",100,30);

        textCanvas.style.visibility = "visible"
        canvas.style.visibility = "visible"
    }
})

// 7セグメントパート
//数字の透明度alphaを決める
function getColor(val, shift) {
    
    let alpha = 0.08 +  1 * ((val >> shift) & 1);
    
    return alpha;
}

function sevenSegment(x,val){　//sevenSegment(int x: 桁, val: 表示する16進数の数字)

    ctx.lineWidth = 2;

    //A
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + getColor(val,6) + ")";
    ctx.rect(42 + x * 90,10,45,7);
    ctx.fill();

    //B
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + getColor(val,5) + ")";
    ctx.rect(89+ x * 90,19,7,45);
    ctx.fill();
    
    //C
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + getColor(val,4) + ")";
    ctx.rect(89 + x * 90,74,7,45);
    ctx.fill();
    
    //D
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + getColor(val,3) + ")";
    ctx.rect(42+ x * 90,121,45,7);
    ctx.fill();
    
    //E
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + getColor(val,2) + ")";
    ctx.rect( 33+ x * 90,74,7,45);
    ctx.fill();
    
    //F
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + getColor(val,1) + ")";
    ctx.rect( 33 + x * 90,19,7,45);
    ctx.fill();
    
    //G
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + getColor(val,0) + ")";
    ctx.rect(42+ x * 90,65,45,7);
    ctx.fill();
}

//16進数
let num = [0x7E,0x30,0x6D,0x79,0x33,0x5B,
0x5F,0x70,0x7F,0x7B];

//パネルの数字を表示
for(var i = 0; i < digit;i++){ 
    sevenSegment(i,num[answerArr[i]]);
}





