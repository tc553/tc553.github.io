class Scenario{constructor(i,t,h){this.myImage=i,this.originalSpeed=t,this.speed=t,this.imgScenarioWidth=h,this.x1=0,this.x2=h}display(){image(this.myImage,this.x1,0,this.imgScenarioWidth,height),image(this.myImage,this.x2,0,this.imgScenarioWidth,height)}move(){this.x1=this.x1-this.speed,this.x2=this.x2-this.speed,this.x1<-this.imgScenarioWidth&&(this.x1=this.imgScenarioWidth),this.x2<-this.imgScenarioWidth&&(this.x2=this.imgScenarioWidth)}stop(){this.speed=0}restart(){this.speed=this.originalSpeed,this.move()}}