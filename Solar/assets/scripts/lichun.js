

cc.Class({
    extends: cc.Component,

    properties: {
       pos:0,
       luobo:cc.Node,
       success:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    back(){
        cc.director.loadScene("game");
    },
    next(){
        cc.director.loadScene("yushuiPre");
    },
    change(){
        if(this.pos==3){
            console.log("该显示东西了")
            this.luobo.children[this.pos].active = false;
            this.success.children[0].active = true;
            this.success.children[1].active = true;
            this.success.children[2].active = true;
            this.success.children[3].active = true;
        }else{
            this.luobo.children[this.pos].active = false;
            this.pos = this.pos + 1;
            this.luobo.children[this.pos].active = true;
        }
    },
    start () {

    },

    // update (dt) {},
});
