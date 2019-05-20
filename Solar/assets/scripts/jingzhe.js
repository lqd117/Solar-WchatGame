const NUM = 2;
const MINLEN = 200;
cc.Class({
    extends: cc.Component,

    properties: {
        bg:cc.Node,
        jYun:cc.Prefab,
        lYun:cc.Prefab,
        shandian:cc.Prefab,
        long:cc.Node,
        longshen:cc.Node,
        longweiba:cc.Node,
        success:cc.Node,
        shandian_X_id:-1,
        shandian_Y_id:-1,
        long_X_id:-1,
        long_Y_id:-1,
        allPos:[],
        array:[],
        all_yun:[],
        allPosVis:[],
        num:0,
        shandian_temp:cc.Node,
    },

    back(){
        cc.director.loadScene("game");
    },
    start () {
        console.log(this.bg.width);
        this.init_allPos();
        this.init_long();
        
        this.create_some_yun();
        this.addEventHandler();
        this.num = NUM;
        this.create_a_new_shandian();
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
            var len_x = this.endPoint.x-this.startPoint.x;
            var len_y = this.endPoint.y-this.startPoint.y;
            console.log(len_x);
            console.log(len_y)
            var pre = this.pos;
            if(len_x>MINLEN && Math.abs(len_y)<MINLEN){
                this.move_long(this.long_X_id,this.long_Y_id,1);
            }
            if(len_y>MINLEN && Math.abs(len_x)<MINLEN){
                this.move_long(this.long_X_id,this.long_Y_id,2);
            }
            if(len_x<-MINLEN && Math.abs(len_y)<MINLEN){
                this.move_long(this.long_X_id,this.long_Y_id,3);
            }
            if(len_y<-MINLEN && Math.abs(len_x)<MINLEN){
                this.move_long(this.long_X_id,this.long_Y_id,4);
            }
            this.check();
            return true;
        });
        this.bg.on('touchcancel',(event)=>{
            this.endPoint = event.getLocation();
            console.log(this.endPoint);
            var len_x = this.endPoint.x-this.startPoint.x;
            var len_y = this.endPoint.y-this.startPoint.y;
            console.log(len_x);
            console.log(len_y)
            var pre = this.pos;
            if(len_x>MINLEN && Math.abs(len_y)<MINLEN){
                this.move_long(this.long_X_id,this.long_Y_id,1);
            }
            if(len_y>MINLEN && Math.abs(len_x)<MINLEN){
                this.move_long(this.long_X_id,this.long_Y_id,2);
            }
            if(len_x<-MINLEN && Math.abs(len_y)<MINLEN){
                this.move_long(this.long_X_id,this.long_Y_id,3);
            }
            if(len_y<-MINLEN && Math.abs(len_x)<MINLEN){
                this.move_long(this.long_X_id,this.long_Y_id,4);
            }
            this.check();
            return true;
        });
    },
    next(){
        cc.director.loadScene('chunfenPre');
    },
    check(){
        if(this.long_X_id == this.shandian_X_id && this.long_Y_id == this.shandian_Y_id){
            this.num -= 1;
            this.shandian_temp.destroy();
            for(var i=0;i<this.all_yun.length;i++){
                this.allPosVis[this.all_yun[i][1]][this.all_yun[i][2]] = -1;
                this.all_yun[i][0].destroy();
            }
            this.all_yun = [];
            if(this.num==0){
                console.log('success');
                this.long.destroy();    
                this.longshen.destroy();
                this.longweiba.destroy();
                this.success.active = true;
                return ;
            }
            this.create_some_yun();
            this.create_a_new_shandian();
            
        }
    },
    move_long(x,y,flag){
        if(flag == 1){//向右移动
            if(y+1>=4||this.allPosVis[x][y+1]!=-1){
                return ;
            }
            this.long.rotation = 270;    
            this.long.x = this.allPos[x][y+1][0];
            this.long.y = this.allPos[x][y+1][1];
            this.allPosVis[x][y+1] = 1;
            this.long_Y_id = this.long_Y_id + 1;
        }
        if(flag == 2){//向上移动
            if(x+1>=5||this.allPosVis[x+1][y]!=-1){
                return;
            }
            this.long.rotation = 180;
            this.long.x = this.allPos[x+1][y][0];
            this.long.y = this.allPos[x+1][y][1];
            this.allPosVis[x+1][y] = 1;
            this.long_X_id = this.long_X_id + 1;
        }
        if(flag == 3){//向左移动
            if(y-1<0||this.allPosVis[x][y-1]!=-1){
                return;
            }
            this.long.rotation = 90;
            this.long.x = this.allPos[x][y-1][0];
            this.long.y = this.allPos[x][y-1][1];
            this.allPosVis[x][y-1] = 1;
            this.long_Y_id = this.long_Y_id - 1;
        }
        if(flag == 4){//向下移动
            if(x-1<0||this.allPosVis[x-1][y]!=-1){
                return;
            }
            this.long.rotation = 0;
            this.long.x = this.allPos[x-1][y][0];
            this.long.y = this.allPos[x-1][y][1];
            this.allPosVis[x-1][y] = 1;
            this.long_X_id = this.long_X_id - 1;
        }
        var rot = this.long.rotation;
        var temp_X = this.longshen.x;
        var temp_Y = this.longshen.y;
        var temp_rot = this.longshen.rotation;
        this.longshen.x = this.allPos[x][y][0];
        this.longshen.y = this.allPos[x][y][1];
        this.longshen.rotation = rot;
        this.cancel_longweiba();
        this.longweiba.x = temp_X;
        this.longweiba.y = temp_Y;
        this.longweiba.rotation = temp_rot;
        
        
    },
    cancel_longweiba(){
        var temp_X = this.longweiba.x;
        var temp_Y = this.longweiba.y;
        var id_X,id_Y;
        for(var i=0;i<5;i++){
            var flag = 0;
            for(var j=0;j<4;j++){
                if(this.allPos[i][j][0]==temp_X&&this.allPos[i][j][1]==temp_Y){
                    flag=1;
                    id_X = i;
                    id_Y = j;
                    break;
                }
            }
            if(flag == 1){
                break;
            }
        }
        this.allPosVis[id_X][id_Y] = -1;
    },
    init_allPos(){
        this.allPos = [[[90,90],[270,90],[450,90],[630,90]],
                       [[90,270],[270,270],[450,270],[630,270]],
                       [[90,450],[270,450],[450,450],[630,450]],
                       [[90,630],[270,630],[450,630],[630,630]],
                       [[90,810],[270,810],[450,810],[630,810]], ];
        this.allPosVis = [[-1,-1,-1,-1],
                          [-1,-1,-1,-1],
                          [-1,-1,-1,-1],
                          [-1,-1,-1,-1],
                          [-1,-1,-1,-1],];
        var preX = 360;
        var preY = 450;
        for(var i=0;i<5;i++){
            for(var j=0;j<4;j++){
                this.allPos[i][j][0] -=preX;
                this.allPos[i][j][1] -=preY;
            }
        }
    },
    init_long(){
        this.long.x = this.allPos[2][0][0];
        this.long.y = this.allPos[2][0][1];
        this.longshen.x = this.allPos[1][0][0];
        this.longshen.y = this.allPos[1][0][1];
        this.longweiba.x = this.allPos[0][0][0];
        this.longweiba.y = this.allPos[0][0][1];
        this.allPosVis[0][0] = 1;
        this.allPosVis[1][0] = 1;
        this.allPosVis[2][0] = 1;
        this.long.rotation = 180;
        this.longshen.rotation = 180;
        this.longweiba.rotation = 180;
        this.long_X_id = 2;
        this.long_Y_id = 0;
    },
    create_a_new_shandian(){
        var newPoint = cc.instantiate(this.shandian);
        var pos = this.get_position();
        this.shandian_X_id = pos[0];
        this.shandian_Y_id = pos[1];
        newPoint.x = this.allPos[this.shandian_X_id][this.shandian_Y_id][0];
        newPoint.y = this.allPos[this.shandian_X_id][this.shandian_Y_id][1];
        newPoint.parent = this.bg;
        console.log(newPoint);
        this.shandian_temp = newPoint;
    },
    create_some_yun(){
        this.array = [];
        for(var i=0;i<NUM;i++){
            this.create_one_yun();
        }
    },
    create_one_yun(){
        var type = this.get_type();
        var newPoint;
        if(type == 0){
            newPoint = cc.instantiate(this.lYun);
        }else{
            newPoint = cc.instantiate(this.jYun);
        }
        var pos = this.get_position();
        var temp = pos;
        temp.push(type);
        this.array.push(temp);
        console.log(temp);
        newPoint.x = this.allPos[pos[0]][pos[1]][0];
        newPoint.y = this.allPos[pos[0]][pos[1]][1];
        newPoint.parent = this.bg;
        this.all_yun.push([newPoint,pos[0],pos[1]]);
        this.allPosVis[pos[0]][pos[1]] = 1;
    },
    get_position(){
        var temp_X,temp_Y;
        while(true){
            temp_X = Math.floor(Math.random()*5);
            temp_Y = Math.floor(Math.random()*4);
            if(this.allPosVis[temp_X][temp_Y]==-1){
                break;
            }
        }
        return [temp_X,temp_Y];
    },
    get_type(){
        var temp = Math.random();
        if(temp < 0.5){
            return 0;
        }else{
            return 1;
        }
    },
    // update (dt) {},
});
