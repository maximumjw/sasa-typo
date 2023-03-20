import {Text} from './text.js';
import {Particle} from './particle.js';

export const RANDOM_TEXT = 'ABCMNRSTUXZ';

let flag=1;
export class Visual{
    constructor(){
        this.text=new Text();

        this.textArr= RANDOM_TEXT.split('');

        this.particles=[];

        this.mouse={
            x:0,
            y:0,
            radius:100
        };

        document.addEventListener('pointermove', this.onMove.bind(this),false);
    } 
    
    show(stageWidth, stageHeight){
        const str='SASA';
        this.pos=this.text.setText(str,26,stageWidth, stageHeight);
    
        this.particles=[];
        for(let i=0; i<this.pos.length;i++){
            const item=new Particle(this.pos[i]);
            this.particles.push(item);
        }
        for(let i=0; i<this.particles.length;i++){
            this.particles[i].move();
            this.particles[i].update(1);
        }
    }
    
    animate(ctx,t){
        for(let i=0; i<this.particles.length;i++){
            const item=this.particles[i];
    
            const dx=this.mouse.x-item.x;
            const dy=this.mouse.y-item.y;
            const dist=Math.sqrt(dx*dx+dy*dy);
            const minDist=item.radius+this.mouse.radius;

            if(dist<minDist){
                const angle=Math.atan2(dy,dx);
                const tx=item.x+Math.cos(angle)*minDist;
                const ty=item.y+Math.sin(angle)*minDist;
                const ax=tx-this.mouse.x;
                const ay=ty-this.mouse.y;
                item.vx-=ax;
                item.vy-=ay;
                item.collide();
            }

            item.draw(ctx,t,flag);
            item.update(flag);
            setTimeout(()=>flag=0,3500); //3초 뒤에 돌아오는 기능 없앰
            //setTimeout()
        }
    }
    
    onMove(e){
        this.mouse.x=e.clientX;
        this.mouse.y=e.clientY;
    }
}




