let gameSeq = [];
let userSeq = [];

let colors = ["red","yellow","green","purple"];

let h2 = document.querySelector("h2");
let body = document.querySelector("body");


document.addEventListener("keypress",function(){
    restart();
});
function userFlash(){
    document.addEventListener("click",function(e){
        if(-1 != colors.indexOf(e.target.id)){
            e.target.classList.add("flash");
            userSeq.push(e.target.id);
            console.log(e.target.id,"is added to userSeq");
            console.log("userSeq:",userSeq);
            if((userSeq[userSeq.length-1] != gameSeq[userSeq.length-1 ])&& userSeq.length != 0){
                gameOver();
            }else if(userSeq.length == level){
                levelUp();
            }
            setTimeout(function(){
                e.target.classList.remove("flash");
            },250);
        }
    });  
}
function gameFlash(){
    let randColor = colors[Math.floor(Math.random() * 4)];
    gameSeq.push(randColor);
    console.log("gameSeq",gameSeq);
    if(gameSeq.length != 0){
        let color = document.getElementById(gameSeq[gameSeq.length-1]);
        color.classList.add("flash");
        setTimeout(function(){
            color.classList.remove("flash");
        },250);
    }  
}

function restart(){
    body.style.backgroundColor = "white";
    level = 0;
    gameSeq = [];
    levelUp();
}
function levelUp(){
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level}`;
     
    setTimeout(function(){
        gameFlash();
    },1000);
}

function gameOver(){

    body.style.backgroundColor = "red";
    h2.innerHTML = `Your Score ${level}, Press Any Key to Restart`;
    
}

userFlash();
