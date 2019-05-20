<<<<<<< HEAD
const ROT_ONE_DOWN = 30;
const ONE_DOWN = 50;
const TIME = 3;
=======
const ROT_ONE_DOWN = 10;
const ONE_DOWN = 30;
const TIME = 5;
>>>>>>> b24798a5e2f2aa6b78943fa2c62288dd8555c311
cc.Class({
    extends: cc.Component,

    properties: {
        bg:cc.Node,
        jidan:cc.Node,
        daoying:cc.Node,
        yingzi:cc.Node,
        hongsheng1:cc.Node,
        hongsheng2:cc.Node,
        hongsheng3:cc.Node,
        huadongkuai:cc.Node,
        success:cc.Node,
        button:cc.Node,
        time:0,
        game:true,
    },


    back(){
        cc.director.loadScene("game");
    },

    start () {
<<<<<<< HEAD
=======
        var animationComponent = this.bg.getComponent(cc.Animation);
        animationComponent.play('chunfen_hint'); 
        this.bg.on('touchend',(event)=>{
            this.action();
        })
>>>>>>> b24798a5e2f2aa6b78943fa2c62288dd8555c311
        this.time = TIME;
    },
    action(){
        if(this.game == false){return ;}
        console.log('action');
        console.log(this.huadongkuai.y);
<<<<<<< HEAD
        console.log(this.jidan.rotation);
        this.hongsheng1.y += ONE_DOWN;
        this.huadongkuai.y += ONE_DOWN;
        this.hongsheng2.y += ONE_DOWN;
        this.hongsheng3.y -= ONE_DOWN;
        if(this.jidan.rotation<0){
            this.jidan.rotation+=ROT_ONE_DOWN;
            this.daoying.rotation-=ROT_ONE_DOWN;
        }else{
            this.jidan.rotation-=ROT_ONE_DOWN;
            this.daoying.rotation+=ROT_ONE_DOWN;
        }

        
=======
        console.log("鸡蛋旋转："+this.jidan.rotation);

        if(this.jidan.rotation >0){
        	this.jidan.rotation -= ROT_ONE_DOWN;
        	this.daoying.rotation += ROT_ONE_DOWN;
        	this.hongsheng1.y -= ONE_DOWN;
	        this.huadongkuai.y -= ONE_DOWN;
	        this.hongsheng2.y -= ONE_DOWN;
	        this.hongsheng3.y += ONE_DOWN;
        }else{
        	this.jidan.rotation += ROT_ONE_DOWN;
        	this.daoying.rotation -= ROT_ONE_DOWN;
        	this.hongsheng1.y += ONE_DOWN;
	        this.huadongkuai.y += ONE_DOWN;
	        this.hongsheng2.y += ONE_DOWN;
	        this.hongsheng3.y -= ONE_DOWN;
        }

>>>>>>> b24798a5e2f2aa6b78943fa2c62288dd8555c311
    },
    gameover(){
        this.hongsheng1.destroy();
        this.hongsheng2.destroy();
        this.hongsheng3.destroy();
        this.huadongkuai.destroy();
        this.button.destroy();
        this.success.active = true;
        this.game = false;
    },
    next(){
        cc.director.loadScene('game');
    },
    update (dt) {
        if(this.game == false){return ;}
<<<<<<< HEAD
        var jidan_speed = 100;
        var shengzi_speed = 200;
        console.log(this.jidan.rotation);
        if(this.jidan.rotation<0){
            if(this.jidan.rotation-dt*jidan_speed>-90){
                this.jidan.rotation -= dt * jidan_speed;
                this.daoying.rotation += dt * jidan_speed;
            }
        }else{
            if(this.jidan.rotation+dt*jidan_speed<90){
                this.jidan.rotation += dt * jidan_speed;
                this.daoying.rotation -= dt * jidan_speed;
            }
        }
        this.hongsheng1.y -= dt * shengzi_speed;
        this.huadongkuai.y -=  dt * shengzi_speed;
        this.hongsheng2.y -=  dt * shengzi_speed;
        this.hongsheng3.y +=  dt * shengzi_speed;
        if(Math.abs(this.jidan.rotation)<30){
=======
        var jidan_speed = 30;  //干扰项
        var shengzi_speed = 90;
        if(this.jidan.rotation >0){
        	this.jidan.rotation += dt * jidan_speed;
    		this.daoying.rotation -= dt * jidan_speed;
    		this.hongsheng1.y += dt * shengzi_speed;
	        this.huadongkuai.y +=  dt * shengzi_speed;
	        this.hongsheng2.y +=  dt * shengzi_speed;
	        this.hongsheng3.y -=  dt * shengzi_speed;
    		
        }else{
        	this.jidan.rotation -= dt * jidan_speed;
    		this.daoying.rotation += dt * jidan_speed;
    		this.hongsheng1.y -= dt * shengzi_speed;
	        this.huadongkuai.y -=  dt * shengzi_speed;
	        this.hongsheng2.y -=  dt * shengzi_speed;
	        this.hongsheng3.y +=  dt * shengzi_speed;
        }
    	
        // this.hongsheng1.y -= dt * shengzi_speed;
        // this.huadongkuai.y -=  dt * shengzi_speed;
        // this.hongsheng2.y -=  dt * shengzi_speed;
        // this.hongsheng3.y +=  dt * shengzi_speed;
        if(Math.abs(this.huadongkuai.y)<200){
>>>>>>> b24798a5e2f2aa6b78943fa2c62288dd8555c311
            this.time -=dt;
        }else{
            this.time = TIME;
        }
        if(this.time < 0){
            this.gameover();
        }
    },
});
