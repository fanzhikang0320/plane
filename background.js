
/**
 * 让背景移动
 */
function backgroundMove () {
    let  gameGround = document.querySelector('.box');
    let speed = 0;
    let timer = setInterval( () => {
        speed += 5;
        gameGround.style.backgroundPositionY = speed + 'px';
        if (parseInt(gameGround.style.backgroundPositionY) >= gameGround.clientHeight) {
            clearInterval(timer);
            gameGround.style.backgroundPositionY = 0;
            backgroundMove();
        }
    },1000/30)
    
   
       
    
}

export default backgroundMove;