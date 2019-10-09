
import Dan from  './Dan.js';

/**
 * 玩家飞机
 */
function UserPlane () {
    this.score = 0;
    this.name = 'player';   //飞机名称
    this.blood = 100;   //飞机血量
    this.width = 50;    //飞机的宽
    this.height = 50;   //飞机的高
    this.wrapper = document.querySelector('.box');  //获取飞机的父级元素
    this.x = Math.floor(this.wrapper.clientWidth / 2 - this.width / 2);    //飞机x轴方向的距离
    this.y = Math.floor(this.wrapper.offsetHeight / 2 - this.height / 2);    //飞机y轴方向的距离
    this.dom = document.createElement('div');   //获取当前飞机对应的节点
    this.ememyPlaneList = [];   //用于存储当前游戏内npc飞机
    this.createPlane();
    this.move();
    this.ememyPlaneList && this.fire();
}

/**
 * 创建飞机，生成对应的dom节点
 */
UserPlane.prototype.createPlane = function () {
    this.dom.setAttribute('class','userPlane');
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
    this.dom.style.left = this.x + 'px';
    this.dom.style.top = this.y + 'px';
    this.wrapper.appendChild(this.dom);
}


/**
 * 移动
 */
UserPlane.prototype.move = function () {
    let that = this;
    
    this.dom.ontouchstart = function (e) {
        let prevX = e.targetTouches[0].clientX;
        let prevY = e.targetTouches[0].clientY;
        let disX,disY;
        let nowX,nowY;
        that.dom.ontouchmove = function (e) {
            nowX = e.targetTouches[0].clientX;
            nowY = e.targetTouches[0].clientY;
            disX = nowX - prevX;
            disY = nowY - prevY;
            prevX = nowX;
            prevY = nowY;
            that.x = parseInt(that.dom.offsetLeft) + disX ; //每次移动都去更改player飞机的x坐标
            that.y = parseInt(that.dom.offsetTop) + disY ;//每次移动都去更改player飞机的y坐标
            that.dom.style.left =that.x + 'px';
            that.dom.style.top =that.y + 'px';

            //判断是否移动出游戏区域
            if (that.dom.offsetLeft >= that.wrapper.offsetWidth - that.width) {
               that.x = that.wrapper.offsetWidth - that.width  ;
                that.dom.style.left =that.x + 'px';
            } else if (that.dom.offsetLeft <= 0) {
               that.x = 0;
                that.dom.style.left = 0 + 'px';
            } else if (that.dom.offsetTop + that.height >= that.wrapper.offsetHeight ) {
               that.y = that.wrapper.offsetHeight - that.height
                that.dom.style.top =that.y + 'px';
            } else if (that.dom.offsetTop <= 0) {
               that.y = 0;
                that.dom.style.top =that.y + 'px';
            }
            
            
        }
    }
 


}

/**
 * 开火
 */
UserPlane.prototype.fire = function () {
   
    this.fireTimer = setInterval( () => {
        new Dan(this.ememyPlaneList,this);
    },600);
}


/**
 * 当被攻击时，
 */
UserPlane.prototype.hurt = function () {

    clearInterval(this.fireTimer);  //先把fire当中的定时器清掉，否则飞机消失时仍然创建
    
    this.dom.style.display = 'none';
    // console.log(this.wrapper)
    // this.wrapper.removeChild(this.dom);
    alert(`共击败` + this.score + `架飞机`);
    location.reload();
}



export default UserPlane;