let move_speed_x = 0.8; let speeds = [0.8,0.9,1,1.2,1.4,1.5]; let init_y_speeds = [-0.8,-0.9,-1,-1.2,-1.5,0.8,0.9,1,1.2,1.5];
let move_speed_y = init_y_speeds[Math.floor(Math.random()*10)];
const inc_speed = 1;
const delta = 0.05;
let ball = document.getElementById('ball');
let ball_props = ball.getBoundingClientRect();
let paddle = document.getElementById('player-paddle');
let paddle_props = paddle.getBoundingClientRect();
let computer_paddle = document.getElementById('computer-paddle');
let comp_paddle_props = computer_paddle.getBoundingClientRect();

let player_score = document.getElementById('player-score');
let computer_score = document.getElementById('computer-score');
let message = document.getElementById('message');
let bonus_ele;
let bonus_props;
let bonus_score;
let body = document.querySelector('body');
//audio assets
let player_paddle_audio = new Audio('audio/player_paddle.mp3');
let computer_paddle_audio = new Audio('audio/computer_paddle.mp3');
let ball_table_hit_audio = new Audio('audio/ball_table_hit_audio.mp3');
let bonus_audio = new Audio('audio/bonus_audio.mp3');
let draw_audio = new Audio('audio/draw_audio.mp3');
//
//Berfore the start of game
game_state='Unset'; 
message.classList.add('game_start');
message.innerHTML += `use mouse to hover the paddle`.fontcolor('white') + `<br>press Enter`.fontcolor('white').fontsize('5rem');
message.style.borderColor = 'white';
//starting the game by keyboard event
document.addEventListener('keydown',(e)=>{
    if((e.key == 'Enter' || e.key == ' ')&& game_state == 'Unset'){
        draw_audio.play();
        game_state = 'Play';
        message.innerHTML='';
        message.classList.remove('game_over','game_start');
        play();
    }
});
document.addEventListener('keydown',(e)=>{
    if((e.key == 'Enter' || e.key == ' ')&& game_state == 'End'){
        game_state = 'Unset';draw_audio.play();
        window.location.reload();
    }
});
//starting the game by mouse events
document.addEventListener('mousedown',(e)=>{
    if(game_state == 'Unset'){
        draw_audio.play();
        game_state = 'Play';
        message.innerHTML='';
        message.classList.remove('game_over','game_start');
        play();
    }
});
document.addEventListener('mousedown',(e)=>{
    if(game_state == 'End'){
        game_state = 'Unset';draw_audio.play();
        window.location.reload();
    }
});

let paddle_pos = getComputedStyle(paddle).getPropertyValue('--position');
document.addEventListener('mousemove',(e)=>{       
    if(e.y/window.innerHeight * 100 > 6 && e.y/window.innerHeight * 100<94){
        paddle.style.setProperty('--position',(e.y/window.innerHeight)*100);
    }
    
});
document.addEventListener('touchmove', (e) => {
    // Prevent default behavior to avoid scrolling
    //e.preventDefault();
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        let y_coordinates = touch.clientY/window.innerHeight * 100;
        if(y_coordinates > 6 && y_coordinates < 94){
            paddle.style.setProperty('--position',y_coordinates);
        }
    }
});        

function play(){
    function move(){
        if(game_state != 'Play') return;
        //background_color
        let hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
        document.documentElement.style.setProperty('--hue', hue+delta); //console.log(hue+delta);
        //background_coloring over
        ball_props = ball.getBoundingClientRect();
        comp_paddle_props = computer_paddle.getBoundingClientRect();
        paddle_props = paddle.getBoundingClientRect();
        //change y direction  
        if(ball_props.top <=0){
            move_speed_y = speeds[Math.floor(Math.random()*4)];
            move_speed_y = Math.abs(move_speed_y);ball_table_hit_audio.play();
        }
        if(ball_props.bottom+1 >= window.innerHeight ){
            move_speed_y = speeds[Math.floor(Math.random()*5)];
            move_speed_y = -1 * Math.abs(move_speed_y);ball_table_hit_audio.play();
        }
        //computer_paddle_hit
        if((ball_props.right >= comp_paddle_props.left && ball_props.left <= comp_paddle_props.right && ball_props.bottom >= comp_paddle_props.top && ball_props.top <= comp_paddle_props.bottom)){
            move_speed_x = speeds[Math.floor(Math.random()*6)];
            move_speed_x = -1 * Math.abs(move_speed_x);
            //add_computer_score
            computer_score.textContent = parseInt(computer_score.textContent) + 1;
            computer_paddle_audio.play();
        }
        //player_paddle_hit
        if((ball_props.left <= paddle_props.right 
            && ball_props.right >= paddle_props.left 
            && ball_props.bottom >= paddle_props.top 
            && ball_props.top <= paddle_props.bottom)){
            move_speed_x = speeds[Math.floor(Math.random()*5)];
            move_speed_x = Math.abs(move_speed_x);
            if(ball_props.top + ball_props.height/2 <= paddle_props.top + paddle_props.height/2){
                //hit the ball upwards
                move_speed_y = init_y_speeds[Math.floor(Math.random()*5)+1];
            }
            else{//hit the ball downwards
                move_speed_y = init_y_speeds[Math.floor(Math.random()*5)+5];
            }
            //add_player_score
            player_score.textContent = parseInt(player_score.textContent) + 1;
            player_paddle_audio.play();
            
        }else if(ball_props.left <= 1){
            //gameOver 
            game_over();
            
            console.log(game_state);
        }
        let x = getComputedStyle(ball).getPropertyValue('--x');
        let y = getComputedStyle(ball).getPropertyValue('--y');
        let y_pos = move_speed_y + parseFloat(y);
        let x_pos = move_speed_x + parseFloat(x);
        ball.style.setProperty('--x',x_pos);
        ball.style.setProperty('--y',y_pos);
        
        if(y_pos > 5 && y_pos < 93 && x_pos > 0){
            computer_paddle.style.setProperty('--position',y_pos);
        }
           
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);
    //bonus function
    function bonus_fun(){
        if(game_state != 'Play') return;
        let ps = parseInt(player_score.textContent);
        let cs = parseInt(computer_score.textContent);
        
        if((comp_paddle_props.left <= ball_props.right || paddle_props.right >= ball_props.left)&& !bonus_ele){
            bonus_ele = document.createElement('div');
            bonus_ele.className = 'bonus';
            bonus_score = Math.floor(Math.random()*(3)+1);
            bonus_ele.style.top = Math.floor(Math.random() * (80) + 10)+'vh';
            bonus_ele.innerHTML = ('+' + bonus_score).fontsize('5rem').fontcolor('white');
            body.appendChild(bonus_ele);
        }if(bonus_ele){
            bonus_props = bonus_ele.getBoundingClientRect();
            let x = getComputedStyle(bonus_ele).getPropertyValue('--x');
            let bonus_move = parseFloat(x) - 0.2;
            bonus_ele.style.setProperty('--x',bonus_move);
            if(bonus_props.left <= paddle_props.right 
                && bonus_props.right >= paddle_props.left 
                && bonus_props.bottom >= paddle_props.top 
                && bonus_props.top <= paddle_props.bottom){
                    player_score.textContent = parseInt(player_score.textContent)+bonus_score;
                    bonus_audio.play();
                    bonus_ele.remove();
                    // console.log(bonus_move);
            }else if(bonus_props.right <= 5){
                bonus_ele.remove();
                bonus_ele = null;
            }
            
        }
        requestAnimationFrame(bonus_fun);
    }
    requestAnimationFrame(bonus_fun);
}
function game_over(){
    game_state='End';
    message.classList.add('game_over');
    message.innerHTML = 'Game Over';
    let ps = parseInt(player_score.textContent);
    let cs = parseInt(computer_score.textContent);
    ball.style.backgroundColor = 'red';
    // console.log(ball);
    if(ps > cs){
        message.innerHTML += `<br> You won by ${ps-cs} scores`.fontcolor('green') + `<br><br>press Enter`.fontcolor('white').fontsize('2.5rem');
        message.style.borderColor = 'green';draw_audio.play();
    }
    else if(ps == cs){
        message.innerHTML += `<br> Draw`.fontcolor('white') + `<br><br>press Enter`.fontcolor('white').fontsize('2.5rem');
        message.style.borderColor = 'white';
        draw_audio.play();
    }
    else{
        message.innerHTML += `<br> You lost by ${cs-ps} scores`.fontcolor('red') + `<br><br>press Enter`.fontcolor('white').fontsize('2.5rem');
        message.style.borderColor = 'red';draw_audio.play();
    }
}
