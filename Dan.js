

/**
 * 
 * @param {*} wrapper 
 * @param {*} ememyPlane 敌机对象（敌机为NPC时，则传入数组）
 * @param {*} father 父级飞机对象
 */
function Dan (ememyPlane,father) {
    this.wrapper = father.dom; //是由谁产生的子弹，对应的dom
    this.timer = null; //让子弹移动时用到的定时器
    this.width = 10;    //子弹dom的宽度
    this.height = 10;   //子弹dom对应的高度
    this.fatherName = father.name;  //存储父级飞机对象的名字（用于判断当前子弹是由谁发射的）
    this.x = father.x;     //把当前父级飞机对象当前所在的x坐标，初始为子弹的x坐标
    this.y = father.y;      //把当前父级飞机对象当前所在的y坐标，初始为子弹的y坐标
    this.father = father;   //存储父级飞机对象
    this.speed = 5;    //子弹固定时间内移动的距离
    this.bgColor = '#fff';  //子弹的颜色
    this.ememyPlane = ememyPlane;   //子弹需要攻击的目标飞机
    this.gameGround = document.querySelector('.box');   //获取游戏区域
    this.createDan();

}

/**
 * 创建子弹的dom元素
 */
Dan.prototype.createDan = function () {
    this.dom = document.createElement('div');
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
    this.dom.style.backgroundColor = this.bgColor;
    this.dom.style.boxSizing = 'border-box';
    this.dom.style.border = '1px solid #202020';
    this.dom.style.position = 'absolute';
    this.dom.style.top = this.y + 'px';
    this.dom.style.left = this.x + Math.floor(this.wrapper.clientWidth / 2) -  (Math.floor(this.width / 2)) + 'px';

    this.dom.style.marginTop = 10 + 'px';
    this.dom.style.marginBottom = 20 + 'px';
    this.gameGround.appendChild(this.dom);
    this.move();
}

/**
 * 让子弹能够移动
 */
Dan.prototype.move = function () {
    // clearInterval(this.timer);

    this.timer = setInterval( () => {

        //根据子弹是由谁产生的，从而确定子弹的方向
        if (this.fatherName == 'npc') {
            this.y = parseInt (this.dom.style.top) + this.speed;    //更新当前子弹的y坐标
            this.dom.style.top = this.y + 'px';
        } else if (this.fatherName == 'player') {
            this.y = parseInt (this.dom.style.top) -  this.speed;
            this.dom.style.top = this.y + 'px';
        }
        

        //如果子弹已经超出了游戏区域，则直接移除自身
        if (this.dom.offsetTop >= this.gameGround.clientHeight || this.dom.offsetTop < 0) {

            clearInterval(this.timer);
            this.gameGround.removeChild(this.dom);
        }
         else {
            //如果为数组说明敌机为 NPC飞机，发射子弹者为 player飞机
            if (Array.isArray(this.ememyPlane)) {

                //循环是用来查看player飞机是否攻击到了当前游戏区域内的某个NPC飞机
                for (let i = 0 ; i< this.ememyPlane.length ; i++) {

                    let flag1 = this.dom.offsetLeft  + this.width > this.ememyPlane[i].dom.offsetLeft && this.dom.offsetLeft  + this.width < this.ememyPlane[i].dom.offsetLeft + this.ememyPlane[i].width
                    
                    let flag2 = this.dom.offsetTop  + this.height > this.ememyPlane[i].dom.offsetTop && this.dom.offsetTop  + this.height < this.ememyPlane[i].dom.offsetTop + this.ememyPlane[i].height
                    
                    //flag1 和 flag2 是用来判断子弹是否击中敌机
                    if (flag1 && flag2) {
                        // 击中了先查看当前敌机是否还有血量，有就扣除
                        if (this.ememyPlane[i].blood > 0) {
                            this.ememyPlane[i].blood -= 50;
                            // 扣除完后继续判断是否还有血量
                            if (this.ememyPlane[i].blood <= 0) {
                                // 执行当前NPC当中的hurt函数，移除掉自身并重新创建
                                this.ememyPlane[i].hurt();
                                //让分数加1
                                this.father.score ++;
                               
                            }
                        } 
                       
                        clearInterval(this.timer);  //清除掉当前对应的定时器
                        this.gameGround.removeChild(this.dom);  //从游戏区域内移除掉当前dom元素
                    }
                }

            }
            //如果当前敌机是player飞机，那么发射子弹者为 NPC飞机
            else if (!Array.isArray(this.ememyPlane)){

                let flag1 = this.dom.offsetLeft + this.width > this.ememyPlane.x && this.dom.offsetLeft + this.width < this.ememyPlane.x + this.ememyPlane.width
                
                let flag2 = this.dom.offsetTop + this.height > this.ememyPlane.y && this.dom.offsetTop + this.height < this.ememyPlane.y + this.ememyPlane.height

                if (flag1 && flag2) {
                    if (this.ememyPlane.blood > 0) {
                        this.ememyPlane.blood -= 20;
                        if (this.ememyPlane.blood <= 0) {
                            this.ememyPlane.hurt();
                        }
                    } 
                
                    clearInterval(this.timer);
                    this.gameGround.removeChild(this.dom);
                }
                  
            }
       
        }
        
   
         
    },1000 / 60)
}

export default Dan;