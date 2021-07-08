import { distance } from "../물결/utils.js";

export class Ripple{
    constructor(){
        this.x=0;
        this.y=0;
        this.radius=0;
        this.maxRadius=0;
        this.speed=10;
        this.canvas=document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx=this.canvas.getContext('2d');

        this.tmpcanvas = document.createElement('canvas');
        this.tmpctx=this.tmpcanvas.getContext('2d');
    }
    resize(stageWidth,stageHeight){
        this.stageWidth=stageWidth;
        this.stageHeight=stageHeight;
    }
    start(x,y){
        this.x=x;
        this.y=y;
        this.radius=0;
        this.maxrRadius=this.getMax(x,y);
    }

    animate(){
        if(this.radius<this.maxRadius){
            this.radius+=this.speed;
        }

        ctx.beginPath();
        ctx.fillStyle='#00ff00';
        ctx.arc(this.x, this.y, this.radius,Math.PI*2,false)
        ctx.fill();
    }
    getMax(x,y){
        const c1 = distance(0,0,x,y);
        const c2 = distance(this.stageWidth,0,x,y);
        const c3 = distance(0,this.stageHeight,x,y);
        const c4 = distance(this.stageWidth,this.stageHeight,x,y);
        return Math.max(c1,c2,c3,c4);
        
    }
}