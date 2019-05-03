const HEIGHT = -900;
const FULL = 50;
const MINLEN = 100;
const pos = {left1:-360,right1:-120,
            left2:-120,right2:120,
            left3:120,right3:360};
cc.Class({
    extends: cc.Component,

    properties: {
        bg:cc.Node,
        hua:cc.Node,
        yun:cc.Node,
        success:cc.Node,
        yudi:cc.Prefab,
        followSpeed: 300,
        array:[],
        sum:0,
    },

    back(){
        cc.director.loadScene("game");
    },
    next(){
        cc.director.loadScene("jingzhe");
    },
    create(){
        var newNode = cc.instantiate(this.yudi);
        newNode.position = cc.v2(0,0);
        newNode.parent = this.yun;
        newNode.runAction(cc.sequence(cc.moveBy(2, 0, HEIGHT), cc.callFunc(function (newNode) {
            console.log("Pos: " + newNode.x + ", " + newNode.y);
            newNode.destroy();
            this.changeHua(this.yun.x);
            this.create();
        }, this)));
    },
    changeHua(x){
        var id = this.getId(x);
        var step = this.array[id][0];
        console.log('id: ',id);
        if(step == 6) return;
        this.array[id][step] -= 1;
        if(this.array[id][step] == 0){
            this.hua.children[step-1].children[id].active = false;
            this.array[id][0] += 1;
            step = this.array[id][0];
            this.hua.children[step-1].children[id].active = true;
        }
        if(step==6) this.sum += 1;
        if(this.sum == 3){
            console.log('success');
            this.hua.active = false;
            this.yun.active = false;
            this.success.active = true;
        }
    },
    getId(x){
        if(pos['left1']<=x&&x<pos['right1'])return 0;
        if(pos['left2']<=x&&x<pos['right2'])return 1;
        if(pos['left3']<=x&&x<pos['right3'])return 2;
    },
    start () {
        this.create();
        var animationComponent = this.bg.getComponent(cc.Animation);
        animationComponent.play('yushui_hint'); //提示玩法的动画
        this.array =  [[1,2,2,2,2,2],[1,2,2,2,2,2],[1,2,2,2,2,2]];//每行第一个数字表示在第几阶段
        console.log(this.array);
    },
    onLoad: function () {
        this.yun.isMoving = false;
        this.bg.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            this.yun.isMoving = true;
            this.yun.moveToPos = this.bg.convertToNodeSpaceAR(touchLoc);
        }, this);
        this.bg.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            this.yun.moveToPos = this.bg.convertToNodeSpaceAR(touchLoc);
        }, this);
        this.bg.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.yun.isMoving = false; // when touch ended, stop moving
        }, this);
        this.bg.on(cc.Node.EventType.TOUCH_CANCEL,function (event) {
            this.yun.isMoving = false;
        },this);
    },

    // called every frame
    update: function (dt) {
        if (!this.yun.isMoving) return;
        var oldPos = this.yun.position;
        // get move direction
        var direction = this.yun.moveToPos.sub(oldPos).normalize();
        // multiply direction with distance to get new position
        var newPos = oldPos.add(direction.mul(this.followSpeed * dt));
        // set new position
        this.yun.setPosition(newPos);
    }

});
