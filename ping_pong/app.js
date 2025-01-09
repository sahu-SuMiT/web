//inside moduless
const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;
class Ball{
    constructor(ballElem){
        this.ballElem = ballElem;
    }
    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x'));
    }
    set x(value){
        this.ballElem.style.setProperty('--x',value);
    }
    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y'));
    }
    set y(value){
        this.ballElem.style.setProperty('--y',value);
    }
    rect(){
        return this.ballElem.getBoundingClientRect();
    }
    update(delta){

        this.x += this.direction.x * this.velocity + 0.1;
        this.y += this.direction.y * this.velocity + 0.1;  
        const rect = this.rect();
        if(rect.bottom >= window.innerHeight || rect.top <=0){
            this.direction.y *= -1;
        }
        if(rect.left <= 0 || rect.right >= window.innerWidth){
            this.direction.x *= -1;
        }
        this.velocity = VELOCITY_INCREASE * delta;
        console.log(this.x, '  ',this.y);
    }
    reset(){
        this.x = 50;
        this.y = 50;
        this.direction = {x:0.75,y:0.5};
        while(Math.abs(this.direction.x) <= .2 || Math.abs(this.direction) >= .9){
            const heading = randomNumberBetween(0,2*Math.PI);
            this.direction = {x:Math.cos(heading),y:Math.sin(heading)};
        }
        this.velocity = INITIAL_VELOCITY;
    }
}

function randomNumberBetween(min, max){
    return Math.random() * (max - min) + min;
}
//Module end


const ball = new Ball(document.getElementById('ball'));

console.log(ball.ballElem);

ball.reset();
let lastTime;
function update(time){
    if(lastTime != null){
         const delta = time - lastTime;
         //update code
         // console.log(delta);
         ball.update(delta);
    }
    lastTime = time
    //window.requestAnimationFrame(update);
}

//window.requestAnimationFrame(update);
console.log(window.innerHeight);
let ball_props = ball.getBoundingClientRect();
console.log(ball.bottom)