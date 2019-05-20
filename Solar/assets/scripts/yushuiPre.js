const WAIT_TIME = 3000 //毫秒
cc.Class({
    extends: cc.Component,

    properties: {
        bg:cc.Node,
        label:cc.Node,
    },


    // onLoad () {},

    start () {
        setTimeout(this.work,WAIT_TIME);
        var animationComponent = this.label.getComponent(cc.Animation);
        animationComponent.play('label');
    },
    work(){
        cc.director.loadScene("yushui");
    }
    // update (dt) {},
});
