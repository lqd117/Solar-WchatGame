const MINLEN = 100;
const SOLARNUM = 4;

cc.Class({
    extends: cc.Component,

    properties: {
        bg:cc.Node,
        solarName:cc.Node,
        solarPlace:cc.Node,
        startPoint:null,
        endPoint:null,
        pos:0,
        chunfenName:cc.Node,
        chunfenPlace:cc.Node,

        shuxinName:cc.Node,
        shuxinPlace:cc.Node,

        yushuiName:cc.Node,
        yushuiPlace:cc.Node,

        lichunName:cc.Node,
        lichunPlace:cc.Node,

        bg_music:cc.AudioSource,
       button_music:cc.AudioSource,

    },

    
    start () {
        this.bg_music.loop = true;
        this.bg_music.play();
        console.log(this.solarName.children);
        this.addEventHandler();
    },
    change(pre,now){
        this.solarName.children[pre].active = false;
        this.solarName.children[now].active = true;
        this.solarPlace.children[pre].active = false;
        this.solarPlace.children[now].active = true;
    },
    choose(){
        this.button_music.play();
        cc.director.loadScene(this.solarName.children[this.pos].name+'Pre');
    },
    addEventHandler() {
        this.bg.on('touchstart',(event)=>{
            this.startPoint = event.getLocation();
            console.log(this.startPoint);
            return true;
        });
        this.bg.on('touchend',(event)=>{
            this.endPoint = event.getLocation();
            console.log(this.endPoint);
            var len = this.endPoint.x-this.startPoint.x;
            console.log(len);
            var pre = this.pos;
            if(len > MINLEN){
                this.pos = (this.pos-1+SOLARNUM)%SOLARNUM;
                this.change(pre,this.pos);
            }
            if(len < -MINLEN){
                this.pos = (this.pos+1+SOLARNUM)%SOLARNUM;
                this.change(pre,this.pos);
            }
            console.log(this.pos);

            return true;
        });
    },

    // update (dt) {},
});
