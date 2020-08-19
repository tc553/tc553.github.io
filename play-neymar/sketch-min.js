let click=!0,clickButtonPressed=!1;function touchStarted(){click=!1,event.code="Touch",currentScene===sceneGame&&character.jump()}function mousePressed(){clickButtonPressed?clickButtonPressed=!1:click&&currentScene===sceneGame&&character.jump()}function keyPressed(){"ArrowUp"===key&&currentScene===sceneGame&&character.jump()}function preload(){imgScenario=loadImage("images/scenario/background.png"),imgCharacter=loadImage("images/character/stanley.png"),imgCharacterDead=loadImage("images/character/dead.png"),imgCharacterWin=loadImage("images/character/finished.png"),imgEnemyDwight=loadImage("images/enemies/dwight.png"),imgEnemyMichael=loadImage("images/enemies/michael.png"),imgEnemyFlyingMichael=loadImage("images/enemies/flying-michael.png"),imgEnemyJim=loadImage("images/enemies/jim.png"),imgEnemyAndy=loadImage("images/enemies/andy.png"),imgEnemyFlyingCreed=loadImage("images/enemies/flying-creed.png"),imgEnemyPam=loadImage("images/enemies/pam.png"),imgEnemyRyan=loadImage("images/enemies/ryan.png"),imgEnemyKelly=loadImage("images/enemies/kelly.png"),imgEnemyKevin=loadImage("images/enemies/kevin.png"),imgEnemyOscar=loadImage("images/enemies/oscar.png"),imgEnemyAngela=loadImage("images/enemies/angela.png"),imgEnemyFlyingPrisonMike=loadImage("images/enemies/flying-prison-mike.png"),imgEnemyJimAsDwight=loadImage("images/enemies/jim-dwight.png"),imgEnemyMeredith=loadImage("images/enemies/meredith.png"),imgEnemyToby=loadImage("images/enemies/toby.png"),imgEnemyFlyingPhyllis=loadImage("images/enemies/flying-phyllis.png"),imgFirstAid=loadImage("images/assets/first-aid.png"),imgFirstAidResponder=loadImage("images/assets/first-aid-responder.png"),imgPretzel=loadImage("images/assets/pretzel.gif"),imgCrossword=loadImage("images/assets/crossword.gif"),imgStressGreen=loadImage("images/assets/stress-01.gif"),imgStressYellow=loadImage("images/assets/stress-02.gif"),imgStressRed=loadImage("images/assets/stress-03.gif"),imgStressBomb=loadImage("images/assets/stress-bomb-gif.gif"),imgClock=loadImage("images/assets/clock.png"),imgClockBlinking=loadImage("images/assets/clock-blinking.gif"),imgDay=loadImage("images/assets/day.png"),jumpTheme=loadSound("sounds/jump.wav"),powerUpTheme=loadSound("sounds/powerup.wav"),failTheme=loadSound("sounds/fail.mp3"),deathTheme=loadSound("sounds/death.wav"),endTheme=loadSound("sounds/end.mp3"),firstAidTheme=loadSound("sounds/death-michael.mp3"),jumpTheme.setVolume(.7),powerUpTheme.setVolume(.1),failTheme.setVolume(.7),deathTheme.setVolume(.5),endTheme.setVolume(.5),firstAidTheme.setVolume(.5),parkourMichaelTheme=loadSound("sounds/parkour-michael.mp3"),parkourDwightTheme=loadSound("sounds/parkour-dwight.mp3"),parkourAndyTheme=loadSound("sounds/parkour-andy.mp3")}function setup(){createCanvas(canvasWidth,canvasHeight),resetGame(sceneMenu)}function clearGame(){scenario=null,character=null,pretzelsPositionMatrix=[],crosswordsPositionMatrix=[],firstAidResponder=null,enemies=[],powerUps=[],firstAidKit=null,score=null,life=null,startButton=null,resetButton=null,highScoresButton=null,sendScoreButton=null,nameInput=null,highScores=null,lastScore=null,mapTimerCount=0,gameStoppedTimerCount=0,scoreBoardTimerCount=0,mapIndex=0}function resetGame(e){clearGame(),currentScene=e,scenario=new Scenario(imgScenario,scenarioSpeed,imgScenarioWidth),character=new Character(stanleyPositionMatrix,imgCharacter,stanleyOffsetX,stanleyOffsetY,stanleyWidth,stanleyHeight,stanleyWidth,stanleyHeight,imgCharacterDead,imgCharacterWin),createEnemies(),createPowerUps(),firstAidResponder=new Enemy(firstAidResponderPositionMatrix,imgFirstAidResponder,width+300,5,firstAidResponderWidth,firstAidResponderHeight,firstAidResponderWidth,firstAidResponderHeight,10,200),score=new Score,life=new Life(imgFirstAid);windowWidth,canvasWidth,windowHeight,canvasHeight;currentScene===sceneMenu&&(startButton=createImg(imgButtonPlay),startButton.addClass("imgButton").addClass("startButton")),pauseButton=createImg(imgButtonPause),pauseButton.addClass("imgButton").addClass("imgButtonSmall").addClass("pauseButton"),pauseButton.hide(),highScoresButton=createImg(imgButtonTrophy),highScoresButton.addClass("imgButton").addClass("highScoresButton"),highScoresButton.hide(),resumeButton=createImg(imgButtonPlay),resumeButton.addClass("imgButton"),resumeButton.hide(),resetButton=createImg(imgButtonRestart),resetButton.addClass("imgButton"),resetButton.hide(),homeButton=createImg(imgButtonHome),homeButton.addClass("imgButton").addClass("homeButton"),homeButton.hide(),sendScoreButton=createButton("Send score"),sendScoreButton.addClass("sendScoreButton"),sendScoreButton.hide(),nameInput=createInput().attribute("maxlength",10),nameInput.addClass("nameInput"),nameInput.hide(),highScoresButton.mousePressed(()=>{highScoresButton.remove(),startButton.remove(),homeButton.addClass("homeButtonFromScores"),homeButton.show(),readHighScores(5,!0)}),resumeButton.mousePressed(()=>{clickButtonPressed=!0,resetButton.hide(),resumeButton.hide(),homeButton.hide(),currentScene=sceneGame,loop()}),resetButton.mousePressed(()=>{clickButtonPressed=!0,resetButton.remove(),resumeButton.remove(),homeButton.remove(),pauseButton.remove(),highScoresButton.remove(),sendScoreButton.remove(),nameInput.remove(),resetGame(sceneGame),loop()}),homeButton.mousePressed(()=>{resetButton.remove(),resumeButton.remove(),homeButton.remove(),pauseButton.remove(),highScoresButton.remove(),sendScoreButton.remove(),nameInput.remove(),resetGame(sceneMenu),loop()}),readHighScores(5,!1);let t=localStorage.getItem("currentUserHighScoreV2");currentUserHighScore=JSON.parse(t),isGameStopped=!1,isGameOver=!1,isGameFinished=!1,isLevelFinished=!1,resetButtonVisible=!1,messageAllPretzels=new FloatingMessage("Pick up ALL pretzels to restore your first aid kit!",scenarioSpeed,590,105,270,65),messageDoubleJump=new FloatingMessage("Tap twice to double jump!",scenarioSpeed,1390,105,155,65),messageCrosswords=new FloatingMessage("Crosswords give +30 min and -50% stress level!",scenarioSpeed,2090,115,275,65),gameMessages=[],gameMessages.push(messageAllPretzels),gameMessages.push(messageDoubleJump),gameMessages.push(messageCrosswords),frameRate(30)}function readHighScores(e,t){readHighScoresFromDb(e).then((function(e){highScores=e,t&&(currentScene=sceneHighScores,isGameOver&&(homeButton.removeClass("homeButtonFromPause").addClass("homeButtonFromScores"),homeButton.show(),resetButton.addClass("resetButtonFromScores"),resetButton.show()))}))}function createPowerUps(){buildPretzelsPositionMatrix(),pretzelsPositionMatrix.forEach(e=>{let t=new PowerUp(imgPretzel,e[0],e[1],scenarioSpeed,90,90,typePretzel);powerUps.push(t)}),buildCrosswordsPositionMatrix(),crosswordsPositionMatrix.forEach(e=>{let t=new PowerUp(imgCrossword,e[0],e[1],scenarioSpeed,90,90,typeCrossword);powerUps.push(t)}),firstAidKit=new PowerUp(imgFirstAid,-width,260,scenarioSpeed,60,50,typeFirstAid)}function createEnemies(){const e=new Enemy(dwightPositionMatrix,imgEnemyDwight,width,0,dwightWidth,dwightHeight,dwightWidth,dwightHeight,8,200),t=new Enemy(michaelPositionMatrix,imgEnemyMichael,1.5*width,5,michaelWidth,michaelHeight,michaelWidth,michaelHeight,12,150),i=new Enemy(flyingMichaelPositionMatrix,imgEnemyFlyingMichael,1.8*width,200,flyingMichaelWidth/1.5,flyingMichaelHeight/1.5,flyingMichaelWidth,michaelHeight,15,500),s=new Enemy(dwightPositionMatrix,imgEnemyJim,width,0,dwightWidth,dwightHeight,dwightWidth,dwightHeight,8,150),r=new Enemy(michaelPositionMatrix,imgEnemyAndy,1.5*width,5,michaelWidth,michaelHeight,michaelWidth,michaelHeight,12,100),o=new Enemy(flyingMichaelPositionMatrix,imgEnemyFlyingCreed,1.8*width,200,flyingMichaelWidth/1.5,flyingMichaelHeight/1.5,flyingMichaelWidth,michaelHeight,15,50),a=new Enemy(michaelPositionMatrix,imgEnemyPam,1.5*width,5,michaelWidth,michaelHeight,michaelWidth,michaelHeight,8,300),n=new Enemy(dwightPositionMatrix,imgEnemyRyan,width,0,dwightWidth,dwightHeight,dwightWidth,dwightHeight,12,100),m=new Enemy(michaelPositionMatrix,imgEnemyKelly,width+100,5,michaelWidth,michaelHeight,michaelWidth,michaelHeight,12,100),c=new Enemy(dwightPositionMatrix,imgEnemyKevin,width,0,dwightWidth,dwightHeight,dwightWidth,dwightHeight,8,100),l=new Enemy(michaelPositionMatrix,imgEnemyOscar,1.5*width,5,michaelWidth,michaelHeight,michaelWidth,michaelHeight,12,300),d=new Enemy(michaelPositionMatrix,imgEnemyAngela,1.5*width,5,michaelWidth,michaelHeight,michaelWidth,michaelHeight,15,500),h=new Enemy(flyingMichaelPositionMatrix,imgEnemyFlyingPrisonMike,1.8*width,200,flyingMichaelWidth/1.5,flyingMichaelHeight/1.5,flyingMichaelWidth,michaelHeight,15,200),g=new Enemy(michaelPositionMatrix,imgEnemyMeredith,1.5*width,5,michaelWidth,michaelHeight,michaelWidth,michaelHeight,8,300),u=new Enemy(dwightPositionMatrix,imgEnemyJimAsDwight,width,0,dwightWidth,dwightHeight,dwightWidth,dwightHeight,8,150),p=new Enemy(michaelPositionMatrix,imgEnemyToby,1.5*width,5,michaelWidth,michaelHeight,michaelWidth,michaelHeight,8,300),y=new Enemy(flyingMichaelPositionMatrix,imgEnemyFlyingPhyllis,1.8*width,200,flyingMichaelWidth/1.5,flyingMichaelHeight/1.5,flyingMichaelWidth,michaelHeight,15,200);enemies.push(c),enemies.push(r),enemies.push(g),enemies.push(a),enemies.push(p),enemies.push(e),enemies.push(l),enemies.push(y),enemies.push(s),enemies.push(n),enemies.push(m),enemies.push(u),enemies.push(d),enemies.push(o),enemies.push(t),enemies.push(h),enemies.push(i)}function draw(){switch(currentScene){case sceneMenu:drawMenu();break;case sceneHighScores:drawHighScores();break;case sceneGame:drawGame();break;case scenePause:drawGame(),drawPauseMenu();break;case sceneLevelEnd:drawGame(),drawLevelEnd();break;case sceneEnd:drawGame(),drawEnd();break}}function stopGame(e){powerUps.forEach(e=>{e.stop()}),enemies.forEach(e=>{e.stop()}),e===typeDeath?(scenario.stop(),character.changeState(typeDeath),gameMessages.forEach(e=>{e.stop()}),life.firstAidHasDecreased||(isGameOver=life.decreaseFirstAid(),life.firstAidHasDecreased=!0,isGameOver?score.consolidateScore():score.increaseFirstAidOccurrences()),isGameStopped=!0,gameStoppedTimerCount++):e===typeLevelFinish&&(score.consolidateScore(),character.changeState(typeLevelFinish),isLevelFinished||endTheme.play(),isLevelFinished=!0)}function startNewLevel(){character.changeState(typeNormal),isLevelFinished=!1,score.scoreHasBeenConsolidated=!1,scoreBoardTimerCount=0,score.pretzels=0,score.crosswords=0,powerUps=[],firstAidKit=null,createPowerUps(),enemies=[],createEnemies()}function resumeGame(){life.resetBpm(),scenario.restart(),character.restart(),firstAidResponder.x=width,isGameStopped=!1,gameStoppedTimerCount=0,powerUps.forEach(e=>{e.restart()}),enemies.forEach(e=>{e.restart()}),gameMessages.forEach(e=>{e.restart()})}function isBusinessHours(){return score.scoreHour>=9&&score.scoreHour<17}function drawPauseMenu(){drawWhiteBoard(0);P5Style.titleStyle(),text("Game paused",width/2,1*height/6+35),homeButton.removeClass("homeButtonFromScores").addClass("homeButtonFromPause"),homeButton.show(),resetButton.addClass("resetButtonFromPause"),resetButton.show(),resumeButton.addClass("resumeButtonFromPause"),resumeButton.show(),noLoop()}function drawMenu(){scenario.display(),drawWhiteBoard(0);P5Style.titleStyle(),text("Neymar",width/2,1*height/6+35);let e=1*height/6+45,t=e+20;P5Style.simpleTextStyle(),e=t,t=e+15,text("Ajude o Neymar a ser campeão e ganhar a Bola de Ouro!",140,t),e=t,t=e+35,text("Crossword puzzles reduce your stress and make time\ngo faster. Also, look up for delicious pretzels!",140,t),e=t,t=e+40,text("Use a seta para cima ou toque na tela para pular.",140,t),highScoresButton.show(),character.display(),startButton.mousePressed(()=>{clickButtonPressed=!0,startButton.remove(),resetButton.remove(),resumeButton.remove(),homeButton.remove(),pauseButton.remove(),highScoresButton.remove(),sendScoreButton.remove(),nameInput.remove(),resetGame(sceneGame)})}function drawHighScores(){scenario.display(),drawWhiteBoard(0);P5Style.titleStyle(),text("High Scores",width/2,1*height/6+35);let e=1*height/6+80;highScores.forEach(t=>{null!=lastScore&&t.docId===lastScore.docId?P5Style.redTextStyle():P5Style.simpleTextStyle(),textAlign(LEFT),text(highScores.indexOf(t)+1+". "+t.name,240,e),textAlign(RIGHT),text(t.totalScore,400,e),e+=20}),null!=lastScore&&null!=currentUserHighScore&&lastScore.docId===currentUserHighScore.docId?P5Style.redTextStyle():P5Style.simpleTextStyle(),e+=20,textAlign(LEFT),text("Your high score:",240,e),textAlign(RIGHT),null!=currentUserHighScore?text(currentUserHighScore.totalScore,400,e):text(0,400,e),null!=lastScore&&(P5Style.redTextStyle(),e+=20,textAlign(LEFT),text("Your last score:",240,e),textAlign(RIGHT),text(lastScore.totalScore,400,e)),character.display()}function drawEnd(){scoreBoardTimerCount++;scoreBoardTimerCount<210?(scoreBoardTimerCount<170?offsetStep=0:offsetStep-=20,drawWhiteBoard(offsetStep),drawScoreBoard("Game Over!",offsetStep),animateScoreBoard()):(pauseButton.hide(),null!=lastScore&&null!=lastScore.docId||(lastScore=new HighScore(null,score.totalScore,score.scoreDay,score.scoreHour,score.scoreMinute,score.totalPretzels,score.totalCrosswords,score.totalDaysAllPretzelsPicked,score.totalFirstAidOccurrences,null)),null==currentUserHighScore||score.totalScore>currentUserHighScore.totalScore?(drawWhiteBoard(0),drawHighScoreInput(0)):readHighScores(5,!0)),character.display()}function drawLevelEnd(){scoreBoardTimerCount++;let e=!1;score.pretzels===pretzelQuantity&&life.firstAid<maxFirstAid&&(e=!0),scoreBoardTimerCount<220?(offsetStep=0,e&&(firstAidKit.x=width)):(offsetStep-=20,e&&(firstAidKit.display(),firstAidKit.move())),e&&character.isColliding(firstAidKit)&&!firstAidKit.picked&&(firstAidKit.getPicked(),life.increaseFirstAid()),drawWhiteBoard(offsetStep),drawScoreBoard("Day "+score.scoreDay+" Finished!",offsetStep),animateScoreBoard(),animateNewLevelCountdown(),life.decreaseBpm(100),character.display(),isBusinessHours()&&(currentScene=sceneGame,startNewLevel())}function drawGame(){scenario.display(),scenario.move(),isGameOver||(pauseButton.show(),pauseButton.mousePressed(()=>{clickButtonPressed=!0,currentScene=scenePause})),null!=messageAllPretzels&&(messageAllPretzels.display(),messageAllPretzels.move(),messageAllPretzels.x<-messageAllPretzels.boxWidth&&(messageAllPretzels=null)),null!=messageDoubleJump&&(messageDoubleJump.display(),messageDoubleJump.move(),messageDoubleJump.x<-messageDoubleJump.boxWidth&&(messageDoubleJump=null)),null!=messageCrosswords&&(messageCrosswords.display(),messageCrosswords.move(),messageCrosswords.x<-messageCrosswords.boxWidth&&(messageCrosswords=null)),powerUps.forEach(e=>{e.display(),e.move(),character.isColliding(e)&&!e.picked&&(e.getPicked(),e.type===typePretzel?score.increasePretzels():e.type===typeCrossword&&(score.increaseCrosswords(),life.decreaseBpm(),score.fastForward(crosswordFastForwardMinutes)))}),character.display(),character.applyGravity(),score.scoreHour>=17&&(stopGame(typeLevelFinish),currentScene=sceneLevelEnd),life.bpm<life.maxBpm&&!isGameStopped&&(character.animate(),score.increaseScore());let e=(score.scoreDay+gameMap.length-1)%gameMap.length,t=gameMap[e].levelMap;mapIndex>=t.length&&(mapIndex=0);let i=t[mapIndex],s=i.enemies,r=s.map((function(e){return e.enemyId}));if(enemies.filter((function(e){return r.includes(enemies.indexOf(e))})).forEach(e=>{if(e.display(),e.animate(),e.move(),isBusinessHours()){let t=s.filter((function(t){return t.enemyId===enemies.indexOf(e)}))[0].speed;if(e.setSpeed(t),score.scoreDay%7==0&&(e.applyGravity(),e.y===e.initialY&&0==e.hasJumped&&!isGameStopped)){e.hasJumped=!0,setTimeout((function(){e.jump(),e.hasJumped=!1}),1/e.speed*100*100*2.5),setTimeout((function(){switch(enemies.indexOf(e)){case indexEnemyMichael:parkourMichaelTheme.play();break;case indexEnemyDwight:parkourDwightTheme.play();break;case indexEnemyAndy:parkourAndyTheme.play();break}}),1/e.speed*100*100*2.5-500)}character.isColliding(e)&&!isGameStopped?(e.hasCollided||failTheme.play(),life.increaseBpm(),e.hasCollided=!0):e.hasCollided=!1}}),score.display(),life.display(),life.bpm>=life.maxBpm&&(stopGame(typeDeath),isGameOver?gameStoppedTimerCount>50&&(currentScene=sceneEnd):(firstAidResponder.display(),(firstAidResponder.x>character.x+70||gameStoppedTimerCount>100)&&(firstAidResponder.animate(),firstAidResponder.move()),gameStoppedTimerCount>120&&resumeGame())),mapTimerCount++,mapTimerCount>=i.duration){enemies.filter((function(e){return r.includes(enemies.indexOf(e))})).forEach(e=>{e.stop()}),enemies.filter((function(e){return r.includes(enemies.indexOf(e))})).filter((function(e){return e.x>-e.characterWidth})).length<=0&&(enemies.filter((function(e){return r.includes(enemies.indexOf(e))})).forEach(e=>{e.restart()}),mapTimerCount=0,mapIndex++)}}function drawWhiteBoard(e){fill(255,255,255,200),noStroke(),rect(1*width/8+e,1*height/8,3*width/4,3*height/4)}function drawScoreBoard(e,t){let i;P5Style.titleStyle(),text(e,width/2+t,1*height/6+35),i=isBusinessHours()?score.n(score.scoreHour)+"h"+score.n(score.scoreMinute):"17h00",image(imgClock,200+t,1*height/6+55,30,30),P5Style.clockCountStyle(),text(i,240+t,1*height/6+80),textAlign(RIGHT),text(score.scoreIncrementTime,430+t,1*height/6+80),image(imgPretzel,190+t,1*height/6+90,50,50),P5Style.pretzelCountStyle(),text(score.pretzels,240+t,1*height/6+120),textAlign(RIGHT),text(score.scoreIncrementPretzels,430+t,1*height/6+120),image(imgCrossword,190+t,1*height/6+125,50,50),P5Style.clockCountStyle(),text(score.crosswords,240+t,1*height/6+160),textAlign(RIGHT),text(score.scoreIncrementCrosswords,430+t,1*height/6+160),fill(103,130,133),noStroke(),rect(1*width/4+t,240,1*width/2,1*height/7,10),P5Style.clockCountStyle(),text("Total score:",190+t,1*height/6+215),textAlign(RIGHT),text(score.totalScore,430+t,1*height/6+215)}function animateScoreBoard(){scoreBoardTimerCount>30&&score.addTimeScoreToTotal(),scoreBoardTimerCount>75&&score.addPretzelScoreToTotal(),scoreBoardTimerCount>120&&score.addCrosswordScoreToTotal()}function drawHighScoreInput(e){P5Style.titleStyle(),text("New high score!",width/2+e,1*height/6+35),P5Style.clockCountStyle(),text("Total score:",185+e,1*height/6+90),textAlign(RIGHT),text(score.totalScore,430+e,1*height/6+90),fill(103,130,133),noStroke(),rect(1*width/4+e,177,1*width/2,1*height/7,10),P5Style.clockCountStyle(),text("Your name:",185+e,1*height/6+150),nameInput.show(),sendScoreButton.show(),sendScoreButton.mousePressed(()=>{let e=nameInput.value();nameInput.attribute("disabled",!0),sendScoreButton.attribute("disabled",!0);let t=null==currentUserHighScore||score.totalScore>currentUserHighScore.totalScore;var i;t&&(currentUserHighScore=new HighScore(e,score.totalScore,score.scoreDay,score.scoreHour,score.scoreMinute,score.totalPretzels,score.totalCrosswords,score.totalDaysAllPretzelsPicked,score.totalFirstAidOccurrences,null)),i=score,addScoreToDb(e,i).then((function(e){nameInput.remove(),sendScoreButton.remove(),lastScore.setDocId(e.id),t&&currentUserHighScore.setDocId(e.id),localStorage.setItem("currentUserHighScoreV2",JSON.stringify(currentUserHighScore)),readHighScores(5,!0)}))})}function animateNewLevelCountdown(){P5Style.titleLargeStyle(),5===score.scoreHour?text("Day "+(score.scoreDay+1)+" starting in...",width/2,1*height/6+35):6===score.scoreHour?text("3...",width/2,1*height/6+35):7===score.scoreHour?text("2...",width/2,1*height/6+35):8===score.scoreHour&&text("1...",width/2,1*height/6+35)}function buildPretzelsPositionMatrix(){pretzelsPositionMatrix=[];let e=pretzelFirstXPostion;pretzelsPositionMatrix.push([e,pretzelYHigh]);for(let t=0;t<pretzelQuantity-1;t++){let t;e+=100*Math.floor(random(1,11)),2e3===e||11e3===e?e+=100*Math.floor(random(1,11)):e>mapLength&&(e=mapLength-100*Math.floor(random(1,11))),t=Math.floor(10*random())%2==0?pretzelYHigh:pretzelYLow,pretzelsPositionMatrix.push([e,t])}}function buildCrosswordsPositionMatrix(){crosswordsPositionMatrix=[],crosswordsPositionMatrix.push([2e3,100]),crosswordsPositionMatrix.push([11e3,100])}