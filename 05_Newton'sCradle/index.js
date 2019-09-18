// モジュール設定
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Composites = Matter.Composites,
    Body = Matter.Body,
    Bodies = Matter.Bodies;

// Engine 作成
var engine = Engine.create();

// 描画システムの作成
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
        
      }
});

//ニュートンのゆりかご作成
//newtonsCradle(xx, yy, number, size, length)　
//という最初から用意されている関数を使用

var cradleA = Composites.newtonsCradle(300, 15, 5, 20, 250);

//左から3個の球を持ち上げる
for(var i = 0; i< 3;i++){
    Body.translate(cradleA.bodies[i],{x:-200,y:-200});
}


// add all of the bodies to the world
World.add(engine.world, [cradleA]);

// Engine をラン
Engine.run(engine);

// レンダラーをラン
Render.run(render);