class FloatingMessage{constructor(t,s,i,e,h,o){this.textMessage=t,this.originalSpeed=s,this.speed=s,this.x=i,this.y=e,this.boxWidth=h,this.boxHeight=o}display(){fill(255,255,255,200),noStroke(),rect(this.x,this.y,this.boxWidth,this.boxHeight),P5Style.clockCountStyle(),text(this.textMessage,this.x+10,this.y+10,this.boxWidth,this.boxHeight)}move(){this.x=this.x-this.speed}stop(){this.speed=0}restart(){this.speed=this.originalSpeed,this.move()}}