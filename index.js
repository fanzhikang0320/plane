
import UserPlane from './Player.js'

import computerPlane from './NPC.js';

import backgroundMove from './background.js';

import createMusic from './util/createMusic.js';
//获取游戏开始按键
let gameStartBtn = document.getElementsByClassName('gameStart')[0];

//获取进入时的初始化场景
let initGame = document.getElementsByClassName('initGame')[0];

gameStartBtn.onclick = gameStart;


//播放开场音效
let startBGM = createMusic('./mp3/bgm.mp3');

//空白音效，主要用于防止google无法自动开启音效

function kongbaiBGM () {
    let box = document.querySelector('.box');
    let iframe = document.createElement('iframe');
    iframe.src = './mp3/kongbai.mp3';
    iframe.style.display = 'none';
    box.appendChild(iframe);
}
kongbaiBGM();

// let kongbaiBGM = createMusic('./mp3/kongbai.mp3');
// kongbaiBGM.play();


/**
 * 把当前的敌机全部传给每个子弹，然后子弹去遍历看看当前与那个敌机的位置重合，然后扣除当前敌机的血量
 * 
 * 
 */

/**
 * 游戏开始入口
 */
function gameStart () {
    this.style.display = 'none';
    initGame.style.display = 'none';
    backgroundMove();   //背景移动
    // kongbaiBGM.pause();
    startBGM.play();    //播放bgm
    init();
}


function init () {
    let player = new UserPlane(init);   //生成player的飞机

    //初始化生成五个npc飞机
    for (let i = 0 ; i < 5 ; i++) {
        player.ememyPlaneList.push(new computerPlane(player));
    }

}


    















