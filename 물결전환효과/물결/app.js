// import{Ripple} from '../../물결/ripple.js';
// import{Dot} from '../../물결/dot.js';
// import{collide} from '../../물결/utils.js'

class App{
    constructor(){
        this.canvas=document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx=this.canvas.getContext('2d');

        this.tmpcanvas = document.createElement('canvas');
        this.tmpctx=this.tmpcanvas.getContext('2d');

        this.pixelRatio=window.devicePixelRatio > 1 ? 2 : 1;

        this.ripple = new Ripple();

        window.addEventListener('resize',this.resize.bind(this),false);
        this.resize();

        this.radius=10;
        this.pixelSize=30;
        this.dots = [];

        this.isLoaded =false;
        this.imgPos={
            x:0,
            y:0,
            width:0,
            height:0,
        };

        this.image=new Image();
        this.image.src='dropthebit_logo.png'
        this.image.onload=()=>{
            this.isLoaded=true;
            this.drawImage();
        };
 
        window.requestAnimationFrame(this.animate.bind(this));

        this.canvas.addEventListener('click',this.onClick.bind(this), false);

    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width=this.stageWidth*this.pixelRatio;
        this.canvas.height=this.stageHeight*this.pixelRatio;
        this.ctx.scale(this.pixelRatio,this.pixelRatio);

        this.tmpcanvas.width =this.stageWidth;
        this.tmpcanvas.height=this.stageHeight;

        this.ripple.resize(this.stageWidth, this.stageHeight);

        if(this.isLoaded){
            this.drawImage();
        }


    }
    drawImage(){
        const stageRatio = this.stageWidth/this.stageHeight;
        const imgRatio = this.image.width/this.image.height;

        this.imgPos.width=this.stageWidth;
        this.imgPos.height=this.stageHeight;

        if(imgRatio>stageRatio){
            this.imgPos.width=Math.round(
                this.image.width*(this.stageHeight/this.image.height)
            );
            this.imgPos.x=Math.round(
                (this.stageWidth-this.imgPos.width)/2
            );
        }else{
            this.imgPos.height=Math.round(
                this.image.height*(this.stageWidth/this.image.width)
            );
            this.imgPos.y=Math.round(
                (this.stageHeight-this.imgPos.height)/2
            );
    }

    this.ctx.drawImage(
    this.image,
    0,0,
    this.image.width,this.image.height,
    this.imgPos.x, this.imgPos.y,
    this.imgPos.width, this.imgPos.height
    );

    this.tmpctx.drawImage(
        this.image,
        0,0,
        this.image.width,this.image.height,
        this.imgPos.x, this.imgPos.y,
        this.imgPos.width, this.imgPos.height
    );
    
    this.imgData = this.tmpctx.getImageData(0,0, this. stageWidth, this. stageHeight);

 this.drawDots();
    }

    drawDots(){
        this.dots = [];

        this.columns = Math.ceil(this.stageWidth / this.pixelSize);
        this.rows = Math.ceil(this.stageHeight / this.pixelSize);

        for (let i = 0; i<this.rows; i++){
            const y=(i+0.5)*this.pixelSize;
            const pixelY = Math.max(Math.min(y,this.stageHeight), 0);

            for(let j= 0; j<this.columns; j++){
                const x = (j+ 0.5)*this.pixelSize;
                const pixelX = Math.max(Math.min(x,this.stageWidth),0);

                const pixelIndex =(pixelX+pixelY*this.stageWidth)*4;
                const red = this.imgData.data[pixelIndex+0];
                const green = this.imgData.data[pixelIndex+1];
                const blue = this.imgData.data[pixelIndex+2];

                const dot = new Dot(
                    x,y,
                    this.radius,
                    this.pixelSize,
                    red,green,blue
                );
                    this.dots.push(dot);
            }
        }
    }


animate(){
    window.requestAnimationFrame(this.animate.bind(this));
    this.ripple.animate(this.ctx);

    for(let i=0; i<this.dots.length; i++){
        const dot = this.dots[i];
        if(collide(
            dot.x,dot.y,
            this.ripple.x, this.ripple.y,
            this.ripple.radius
        )){
            dot.animate(this.ctx);
        }

    }
}
onClick(e){
    this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
    
    this.ctx.drawImage(
        this.image,
        0,0,
        this.image.width, this.image.height,
        this.imgPos.x, this.imgPos.y,
        this.imgPos.width, this.imgPos.height
        );

    this.ripple.start(e.offsetX,e.offsetY);
}

}



class Dot {
    constructor(x,y,radius,pixelSize,red,green,blue){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.pixelSize=pixelSize;
        this.pixelSizeHalf=pixelSize/2;
        this.red=red;
        this.green=green;
        this.blue=blue;
        this.canvas=document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx=this.canvas.getContext('2d');
        
    }

    animate(ctx){
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.fillRect(
            this.x-this.pixelSizeHalf,
            this.y-this.pixelSizeHalf,
            this.pixelSize,this.pixelSize
        );
        const PI2 = Math.PI*2;
        ctx.beginPath();
        ctx.fillStyle=`rgb(${this.red}, ${this.green}, ${this.blue})`;
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
        ctx.fill();
    }

    reset(){

    }

}
class Ripple{
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

        this.ctx.beginPath();
        this.ctx.fillStyle='#00ff00';
        this.ctx.arc(this.x, this.y, this.radius,Math.PI*2,false)
        this.ctx.fill();
    }
    getMax(x,y){
        const c1 = distance(0,0,x,y);
        const c2 = distance(this.stageWidth,0,x,y);
        const c3 = distance(0,this.stageHeight,x,y);
        const c4 = distance(this.stageWidth,this.stageHeight,x,y);
        return Math.max(c1,c2,c3,c4);
        
    }
}


function distance(x1,y1,x2,y2){
    const x =x2-x1;
    const y =y2-y1;
    return Math.sqrt(x*x+y*y);

}
function collide(x1,y1,x2,y2,radius){
    if (distance(x1,y1,x2,y2)<=radius){
        return true;

    }else{
        return false;
    }
}
window.onload=()=>{
    new App();
}
