
let button = document.getElementById("btn");

let root1,root2; //二つの解

function reset(){
    answerValue1.innerHTML="";　//リセット
    answerValue2.innerHTML ="";
}

button.addEventListener('click',function(){

    reset();

    let a = document.getElementById("a").value;
    let b = document.getElementById("b").value;
    let c = document.getElementById("c").value;

    if(a == 0){

        alert("a は 0 以外の値");
        reset();

        return;
    }
    
    let d = b * b - 4 * a * c;　//判別式

    if (d > 0){　//異なる実数解を二つ持つ

        root1 = (-b + Math.sqrt(d)) / (2*a);
        root2 = (-b - Math.sqrt(d)) / (2*a);

        answerValue1.innerHTML = root1
        answerValue2.innerHTML = root2;

    }else if(d == 0){ //重解

        root1 = -b / (2*a);

        answerValue1.innerHTML = root1;
        
    }else{
        //互いに共役な二つの複素数解

        let realPart = -b / (2*a); //実部
        let iPart = Math.sqrt(-d) / (2 * a);　//虚部

        answerValue1.innerHTML = realPart + "+" + iPart + " i";
        answerValue2.innerHTML = realPart + "-" + iPart + " i";
    }

    if(!(a && b && c)){

       alert("a,b,c に数字をタイプしてください");
       reset();
       
       return;
    }

    document.getElementById('answerMessage').style.display = 'block';　//解を表示
})



