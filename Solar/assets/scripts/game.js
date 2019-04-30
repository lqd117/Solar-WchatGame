
cc.Class({
    extends: cc.Component,

    properties: {
       bg:cc.Node,
       startGameButton:cc.Node,
       musicSetButton:cc.Node,
       startPoint:null,
       endPoint:null,
    },

    start () {
        console.log("111"); 
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
        console.log("startGame");
        cc.director.loadScene("channel");
    },

    musicSet() {
        console.log("musicSet");
    }
    
});
