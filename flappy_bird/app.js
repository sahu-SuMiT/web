let move_speed = 3; let gravity = 0.5;
let background = document.querySelector('.background');
let bird = document.querySelector('.bird');
let bird_props = bird.getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let body = document.querySelector('body');
let game_state = 'Unset';
let message = document.querySelector('.message');
let bg_props = background.getBoundingClientRect();
let roof = document.querySelector('.up');
let base = document.querySelector('.down');
let roof_base = roof.getBoundingClientRect().bottom;
let base_top = base.getBoundingClientRect().top;

//sounds
let sound_die = new Audio('audio/crash.mp3');
let game_over = new Audio('audio/game_over.mp3');
let woosh = new Audio('audio/woosh.mp3'); //fly
let ding = new Audio('audio/ding.mp3'); //coin collect

document.addEventListener('keydown',(e)=>{
  if(e.key == 'Enter' && game_state == 'Unset' ){
    game_state = 'Play';
    message.classList.remove('messageStyle');
    message.innerHTML = '';
    bird.style.display = 'block';
    play();woosh.play();
  }
  else if (e.key == 'Enter' && game_state == 'End'){
    woosh.play();
    window.location.reload();
    game_state = 'Unset';
    bird.src = 'images/Bird.png'; 
  }
});
//extra lines for touch 1 start
document.addEventListener('touchstart',(e)=>{
  if(game_state == 'Unset' ){
    game_state = 'Play';
    message.classList.remove('messageStyle');
    message.innerHTML = '';
    bird.style.display = 'block';
    play();woosh.play();
    bird.src = 'images/bird.gif';
  }
  else if (game_state == 'End'){
    woosh.play();
    window.location.reload();
    game_state = 'Unset';
    bird.src = 'images/Bird.png'; 
  }
});
//extra lines for touch 1 end

function play(){
  function move(){
    if(game_state != 'Play') return;
    let pipe_sprites = document.querySelectorAll('.pipe_sprite');
    
    
    pipe_sprites.forEach((pipe)=>{
      bird_props = bird.getBoundingClientRect();
      let pipe_sprite_props = pipe.getBoundingClientRect();
      if(pipe_sprite_props.right <= 0){
        pipe.remove();
      }
      
      let flag = bird_props.right > pipe_sprite_props.left 
                  && bird_props.left < pipe_sprite_props.right 
                  && bird_props.top < pipe_sprite_props.bottom 
                  && bird_props.bottom > pipe_sprite_props.top ;//bird_props.top < pipe_sprite_props.top && (bird_props.top < pipe_sprite_props.bottom || bird_props.bottom > pipe_sprite_props.top);
      
      if(flag){
        //display_the score board
        game_state = 'End';
        message.innerHTML = 'Game Over'.fontcolor('red') + '<br> press Enter to restart';
        message.classList.add('game_over');message.classList.add('messageStyle');
        sound_die.play();game_over.play();
        return;
      }else{
        //increase the score
        if(pipe_sprite_props.right < bird_props.left && pipe.increase_score == '1'){
          score_val.innerHTML = parseInt(score_val.innerHTML) + 1;
          pipe.increase_score = '0'; ding.play();
        }
        
      }
      pipe.style.left = pipe_sprite_props.left - move_speed + 'px';
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);
  let dy = 0;
  function apply_gravity(){
    if(game_state != 'Play') return;
    bird_props = bird.getBoundingClientRect();
    dy = gravity + dy;
    document.addEventListener('keydown',(e)=>{
      if(e.key == ' ' || e.key == 'ArrowUp'){
        woosh.play();
        dy = - 7.6;
        //change image for upwards
        //bird.src = 'images/Bird-2.png';
      }
    });
    // document.addEventListener('keyup',(e)=>{
    //   if(e.key == ' ' || e.key == 'ArrowUp'){
    //     //change image if for downwards
    //     bird.src = 'images/Bird.png';
    //   }
    // });
    document.addEventListener('touchstart',(e)=>{
        woosh.play();
        dy = - 9;
        //change image for upwards
          
    });
    
    bird.style.top = bird_props.top + dy + 'px';
    if(bird_props.top < roof_base || bird_props.bottom > base_top){
      game_state = 'End';
      message.innerHTML = 'Game Over'.fontcolor('red') + '<br> press Enter to restart';
        message.classList.add('game_over');message.classList.add('messageStyle');
        bird.style.height = '25px'; sound_die.play();game_over.play();
    }
    
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);
  let pipe_separation = 0; let pipe_gap = 50;
  function create_pipes(){
    if(game_state != 'Play') return;  
    if(pipe_separation > 115){
      pipe_separation = 0;
      let pipe_sprite_inv = document.createElement('div');
      pipe_sprite_inv.classList.add('pipe_sprite');
      pipe_sprite_inv.increase_score = '1';
      let pipe_pos = Math.floor(Math.random() * 65);
      pipe_sprite_inv.style.top = pipe_pos - 70 + 'vh';
      body.appendChild(pipe_sprite_inv);

      let pipe_sprite_st = document.createElement('div');
      pipe_sprite_st.classList.add('pipe_sprite');
      pipe_sprite_st.style.top = pipe_pos + pipe_gap + 'vh';
      body.appendChild(pipe_sprite_st);
    }
    pipe_separation++;
    requestAnimationFrame(create_pipes);
  }
  requestAnimationFrame(create_pipes);
}

