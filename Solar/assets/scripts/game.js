
cc.Class({
    extends: cc.Component,

    properties: {
       bg:cc.Node,
       startGameButton:cc.Node,
       chooseSetButton:cc.Node,
       bg_music:cc.AudioSource,
       button_music:cc.AudioSource,
       startPoint:null,
       endPoint:null,
    },

    start () {
        console.log("111"); 
        this.bg_music.loop = true;
        this.bg_music.play();
    },
    addEventHandlerForBg() {
        this.bg.on('touchstart',(event)=>{
            this.startPoint = event.getLocation();
            console.log(this.startPoint);
            return true;
        });

        this.bg.on('touchend',(event)=>{
            this.endPoint = event.getLocation();
            console.log(this.endPoint);
            return true;
        });
    },

    startGame() {
        this.button_music.play();
        console.log("startGame");   
        cc.director.loadScene("lichunPre");
    },

    chooseSet() {
        this.button_music.play();
        console.log("chooseSet");
        cc.director.loadScene("channel"); 
    }
    
});
