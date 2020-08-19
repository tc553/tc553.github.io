class Character extends Animation{constructor(i,t,h,s,e,a,r,g,n,o){super(i,t,h,s,e,a,r,g),this.initialY=height-this.characterHeight-this.offsetY,this.y=this.initialY,this.floor=this.initialY,this.gravity=2,this.jumpSpeed=0,this.jumpLimit=2,this.jumpCount=0,this.originalImg=t,this.imgDead=n,this.imgWin=o,this.originalWidth=this.characterWidth,this.originalHeight=this.characterHeight}jump(){this.jumpCount<this.jumpLimit&&(jumpTheme.play(),this.jumpSpeed=-30,this.jumpCount++)}applyGravity(){this.y=this.y+this.jumpSpeed,this.jumpSpeed=this.jumpSpeed+this.gravity,this.y>this.floor&&(this.y=this.floor,this.jumpCount=0)}isColliding(i){return collideRectRect(this.x,this.y,.6*this.characterWidth,.8*this.characterHeight,i.x,i.y,.6*i.characterWidth,.8*i.characterHeight)}changeState(i){i===typeDeath?(this.jumpLimit=0,this.currentFrame=0,isGameStopped||(deathTheme.play(),life.firstAid),this.img=this.imgDead,this.lieDown()):i===typeLevelFinish?this.img=this.imgWin:i===typeNormal&&(this.img=this.originalImg)}restart(){this.img=this.originalImg,this.standUp(),this.jumpLimit=2,this.animate()}lieDown(){this.characterWidth=this.originalHeight,this.characterHeight=this.originalWidth,this.spriteWidth=this.originalHeight,this.spriteHeight=this.originalWidth,this.floor=this.initialY+(this.originalHeight-this.originalWidth)}standUp(){this.characterWidth=this.originalWidth,this.characterHeight=this.originalHeight,this.spriteWidth=this.originalWidth,this.spriteHeight=this.originalHeight,this.floor=this.initialY}}