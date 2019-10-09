
import Dan from './Dan.js'
/**
 * 
 * @param {*} ememyPlane 传入敌机对象
 */
function computerPlane (ememyPlane) {
    this.name = 'npc'; //npc飞机名称
    this.blood = 100;   //npc血量
    this.ememyPlane = ememyPlane;   //每次生成一个NPC，给它们同一个敌人
    this.wrapper = document.querySelector('.box');  //获取父级
    this.dom = document.createElement('div');   //定义当前NPC飞机对应的dom，每次生成都对应不同的dom
    this.width = 50;    //定义NPC飞机的宽
    this.height = 50;   //定义NPC飞机的高
    this.speed = 2;    //定义NPC飞机移动时的距离
    this.x = this.width * randomPosition(0,Math.floor (this.wrapper.clientWidth / this.width)); //随机生成NPC飞机的x坐标
    this.y = - this.height * randomPosition(0,10);  //随机生成NPC飞机的y坐标
    this.timer = null;  //定义NPC移动时所需的定时器
    this.fireTimer = null;  //定义NPC生成子弹时的定时器
    this.createDom();
    this.move();
    this.fire();
}

/**
 * 创建NPC飞机
 */
computerPlane.prototype.createDom = function () {
    this.dom.setAttribute('class','npcPlane');
    this.dom.style.left = this.x + 'px';
    this.dom.style.top = this.y + 'px';
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
    this.wrapper.appendChild(this.dom);
}

/**
 * NPC飞机自主移动
 */
computerPlane.prototype.move = function () {
    let flag1,flag2;    //定义两个判断条件

    this.timer = setInterval( () => {
        this.y = this.dom.offsetTop + this.speed;   //每次移动时都去更改当前的NPC对象的y轴距离

        this.dom.style.top = this.y + 'px';

        //flag1 和 flag2 判断当前NPC是否与玩家飞机位置上发生了重叠，也就是相撞
        flag1 = this.dom.offsetTop + this.height >= this.ememyPlane.y && this.dom.offsetTop + this.height <= this.ememyPlane.y + this.ememyPlane.height;
        
        flag2 = this.dom.offsetLeft + this.width >= this.ememyPlane.x && this.dom.offsetLeft + this.width <= this.ememyPlane.x + this.ememyPlane.width;
    
        // 如果飞机已经超过底边，就让它移除掉自身，并再次创建一个飞机
        if (this.dom.offsetTop >= this.wrapper.clientHeight) {

            this.hurt();
        }
        //如果判断npc飞机时候与玩家的飞机是否发生碰撞
        else if (flag1 && flag2 ) {

        } 

    },1000 / 60);
}

/**
 * 生成子弹
 */
computerPlane.prototype.fire = function () {
    this.fireTimer = setInterval( () => {
        new Dan(this.ememyPlane,this);
    },800)
}


/**
 * 当被击败时
 */
computerPlane.prototype.hurt = function () {
    clearInterval(this.timer);  //先清除自身运动时用到的定时器
    clearInterval(this.fireTimer);  //清除生成子弹时用到的定时器
    this.wrapper.removeChild(this.dom); //移除自身对应的dom结构
    /**
     * 此循环是用来更新当前player当中存储的NPC对象
     */
    for (let i = 0 ; i < this.ememyPlane.ememyPlaneList.length ; i ++) {
        //如果player飞机对象当中的存储的NPC飞机与当前这个npc相对应，就把这个NPC对象飞机给移除掉
        if (this.ememyPlane.ememyPlaneList[i].x == this.x && this.ememyPlane.ememyPlaneList[i].y == this.y) {
            
            this.ememyPlane.ememyPlaneList.splice(i,1);
        }
    }
    //重新添加一个新的NPC飞机
    this.ememyPlane.ememyPlaneList.push( new computerPlane(this.ememyPlane));
}

/**
 * 获取随机位置
 * @param {*} min 最小值
 * @param {*} max 最大值
 */
function randomPosition (min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}
export default computerPlane;