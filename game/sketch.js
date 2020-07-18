let click = true;
let clickButtonPressed = false;

function touchStarted() {
  click = false;
  event.code = 'Touch';
  if (currentScene === sceneGame) {
    character.jump();
  }
}

function mousePressed() {
  if (!clickButtonPressed){
    if (click) {
      if (currentScene === sceneGame) {
          character.jump();
        }
    } 
  }
  else {
    clickButtonPressed = false;
  }
}

function keyPressed() {
  if (key === 'ArrowUp') {
    if (currentScene === sceneGame)
      character.jump();
  }
}

function preload() {
  imgScenario = loadImage('images/scenario/background.png');
  imgCharacter = loadImage('images/character/stanley.png');
  imgCharacterDead = loadImage('images/character/dead.png');
  imgCharacterWin = loadImage('images/character/finished.png');
  imgEnemyDwight = loadImage('images/enemies/dwight.png');
  imgEnemyMichael = loadImage('images/enemies/michael.png');
  imgEnemyFlyingMichael = loadImage('images/enemies/flying_michael.png');
  imgEnemyJim = loadImage('images/enemies/jim.png');
  imgEnemyAndy = loadImage('images/enemies/andy.png');
  imgEnemyCreed = loadImage('images/enemies/creed.png');
  imgEnemyFlyingCreed = loadImage('images/enemies/flying_creed.png');
  imgFirstAid = loadImage('images/assets/first-aid.png');
  imgFirstAidResponder = loadImage('images/assets/first-aid-responder.png');
  imgPretzel = loadImage('images/assets/pretzel.gif');
  imgCrossword = loadImage('images/assets/crossword.gif');
  imgStressGreen = loadImage('images/assets/stress-01.gif');
  imgStressYellow = loadImage('images/assets/stress-02.gif');
  imgStressRed = loadImage('images/assets/stress-03.gif');
  imgStressBomb = loadImage('images/assets/stress-bomb-gif.gif');
  imgClock = loadImage('images/assets/clock.png');
  imgClockBlinking = loadImage('images/assets/clock-blinking.gif');
  imgDay = loadImage('images/assets/day.png');

  jumpTheme = loadSound('sounds/jump.wav');
  powerUpTheme = loadSound('sounds/powerup.wav');
  failTheme = loadSound('sounds/fail.mp3');
  deathTheme = loadSound('sounds/death.wav');
  endTheme = loadSound('sounds/end.mp3');
  
  jumpTheme.setVolume(0.7);
  powerUpTheme.setVolume(0.1);
  failTheme.setVolume(0.7);
  deathTheme.setVolume(0.5);
  endTheme.setVolume(0.5);
  // jumpTheme.setVolume(0);
  // powerUpTheme.setVolume(0);
  // failTheme.setVolume(0);
  // deathTheme.setVolume(0);
  // endTheme.setVolume(0);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  resetGame(sceneMenu);
}

function clearGame() {
  scenario = null;
  character = null
  pretzelsPositionMatrix = [];
  crosswordsPositionMatrix = [];
  firstAidResponder = null;
  enemies = [];
  powerUps = [];
  score = null;
  life = null;
  startButton = null;
  resetButton = null;
  highScoresButton = null;
  sendScoreButton = null;
  nameInput = null;
  highScores = null;
  lastScore = null;
  mapTimerCount = 0;
  gameStoppedTimerCount = 0;
  scoreBoardTimerCount = 0;
  mapIndex = 0;
}

function resetGame(scene) {
  clearGame();
  
  currentScene = scene;
  scenario = new Scenario(imgScenario, scenarioSpeed, imgScenarioWidth);
  character = new Character(stanleyPositionMatrix, imgCharacter, stanleyOffsetX, stanleyOffsetY, stanleyWidth, stanleyHeight, stanleyWidth, stanleyHeight, imgCharacterDead, imgCharacterWin)

  createEnemies();
  createPowerUps();

  firstAidResponder = new Enemy(firstAidResponderPositionMatrix, imgFirstAidResponder, width + 300, 5, firstAidResponderWidth, firstAidResponderHeight, firstAidResponderWidth, firstAidResponderHeight, 10, 200);

  score = new Score();
  life = new Life(imgFirstAid);

  let canvasPositionX = (windowWidth - canvasWidth)/2;
  let canvasPositionY = (windowHeight - canvasHeight)/2;

  if (currentScene === sceneMenu) {
    startButton = createImg(imgButtonPlay);
    startButton.addClass('imgButton').addClass('startButton');
  }

  pauseButton = createImg(imgButtonPause);
  pauseButton.addClass('imgButton').addClass('imgButtonSmall').addClass('pauseButton');
  pauseButton.hide();

  highScoresButton = createImg(imgButtonTrophy);
  highScoresButton.addClass('imgButton').addClass('highScoresButton');
  highScoresButton.hide();

  resumeButton = createImg(imgButtonPlay);
  resumeButton.addClass('imgButton');
  resumeButton.hide();

  resetButton = createImg(imgButtonRestart);
  resetButton.addClass('imgButton');
  resetButton.hide();

  homeButton = createImg(imgButtonHome);
  homeButton.addClass('imgButton').addClass('homeButton');
  homeButton.hide();
  
  sendScoreButton = createButton('Send score');
  sendScoreButton.addClass('sendScoreButton');
  sendScoreButton.hide();

  nameInput = createInput().attribute('maxlength', 10);
  nameInput.addClass('nameInput');
  nameInput.hide();

  highScoresButton.mousePressed(() => {
    highScoresButton.remove();
    startButton.remove();
    homeButton.addClass('homeButtonFromScores');
    homeButton.show();
    readHighScores(5, true);
  })

  resumeButton.mousePressed(() => {
    clickButtonPressed = true;
    resetButton.hide();
    resumeButton.hide();
    homeButton.hide();

    currentScene = sceneGame;
    loop();
  });
  
  resetButton.mousePressed(() => {
    clickButtonPressed = true;
    resetButton.remove();
    resumeButton.remove();
    homeButton.remove();
    pauseButton.remove();
    highScoresButton.remove();
    sendScoreButton.remove();
    nameInput.remove();

    resetGame(sceneGame);
    loop();
  });

  homeButton.mousePressed(() => {
    resetButton.remove();
    resumeButton.remove();
    homeButton.remove();
    pauseButton.remove();
    highScoresButton.remove();
    sendScoreButton.remove();
    nameInput.remove();

    resetGame(sceneMenu);
    loop();
  });

  readHighScores(5, false);
  let stringScore = localStorage.getItem('currentUserHighScore');
  currentUserHighScore = JSON.parse(stringScore);

  isGameStopped = false;
  isGameOver = false;
  isGameFinished = false;
  isLevelFinished = false;
  resetButtonVisible = false;

  frameRate(30);
}

function readHighScores(qty, displayLeaderboard) {
  readHighScoresFromDb(qty).then(function(result) {
    highScores = result;
    if (displayLeaderboard) {
      currentScene = sceneHighScores;

      if (isGameOver) {
        homeButton.removeClass('homeButtonFromPause').addClass('homeButtonFromScores')
        homeButton.show();

        resetButton.addClass('resetButtonFromScores')
        resetButton.show();
      }
    }
  })
}

function createPowerUps() {
  buildPretzelsPositionMatrix();
  pretzelsPositionMatrix.forEach(pretzelPosition => {
    let newPretzel = new PowerUp(imgPretzel, pretzelPosition[0], pretzelPosition[1], scenarioSpeed, 90, 90, typePretzel)
    powerUps.push(newPretzel);
  })

  buildCrosswordsPositionMatrix();
  crosswordsPositionMatrix.forEach(crosswordPosition => {
    let newCrossword = new PowerUp(imgCrossword, crosswordPosition[0], crosswordPosition[1], scenarioSpeed, 90, 90, typeCrossword)
    powerUps.push(newCrossword);
  })
}

function createEnemies() {
  const enemyDwight = new Enemy(dwightPositionMatrix, imgEnemyDwight, width, 0, dwightWidth, dwightHeight, dwightWidth, dwightHeight, 8, 200);
  const enemyMichael = new Enemy(michaelPositionMatrix, imgEnemyMichael, width * 1.5, 5, michaelWidth, michaelHeight, michaelWidth, michaelHeight, 12, 500);
  const enemyFlyingMichael = new Enemy(flyingMichaelPositionMatrix, imgEnemyFlyingMichael, width * 1.8, 200, flyingMichaelWidth/1.5, flyingMichaelHeight/1.5, flyingMichaelWidth, michaelHeight, 15, 500);
  
  const enemyJim = new Enemy(dwightPositionMatrix, imgEnemyJim, width, 0, dwightWidth, dwightHeight, dwightWidth, dwightHeight, 8, 300);
  const enemyAndy = new Enemy(michaelPositionMatrix, imgEnemyAndy, width * 1.5, 5, michaelWidth, michaelHeight, michaelWidth, michaelHeight, 12, 100);
  const enemyFlyingCreed = new Enemy(flyingMichaelPositionMatrix, imgEnemyFlyingCreed, width * 1.8, 200, flyingMichaelWidth/1.5, flyingMichaelHeight/1.5, flyingMichaelWidth, michaelHeight, 15, 50);

  enemies.push(enemyDwight);
  enemies.push(enemyMichael);
  enemies.push(enemyFlyingMichael);
  
  enemies.push(enemyJim);
  enemies.push(enemyAndy);
  enemies.push(enemyFlyingCreed);
}

function draw() {
  switch (currentScene) {
    case sceneMenu:
      drawMenu();
      break;
    case sceneHighScores:
      drawHighScores();
      break;
    case sceneGame:
      drawGame();
      break;
    case scenePause:
      drawGame();
      drawPauseMenu();
      break;
    case sceneLevelEnd:
      drawGame();
      drawLevelEnd();
      break;
    case sceneEnd:
      drawGame();
      drawEnd();
      break;
  }
}

function stopGame(type) {
  powerUps.forEach(powerUp => {
    powerUp.stop();
  });
  enemies.forEach(enemy => {
    enemy.stop();
  });


  if (type === typeDeath) {
    scenario.stop();
    character.changeState(typeDeath);

    if (!life.firstAidHasDecreased) {
      isGameOver = life.decreaseFirstAid();
      life.firstAidHasDecreased = true;
      
      if (!isGameOver) {
        score.increaseFirstAidOccurrences();
      }
      else {
        score.consolidateScore();
      }
    }

    isGameStopped = true;
    gameStoppedTimerCount++;
  }
  else if (type === typeLevelFinish) {
    score.consolidateScore();
    character.changeState(typeLevelFinish);
    
    if (!isLevelFinished){
      endTheme.play();
    }
    isLevelFinished = true;
  }
}

function startNewLevel() {
  character.changeState(typeNormal);
  isLevelFinished = false;
  score.scoreHasBeenConsolidated = false;
  scoreBoardTimerCount = 0;
  score.pretzels = 0;
  score.crosswords = 0;

  powerUps = [];
  createPowerUps();
  
  enemies = [];
  createEnemies();
}

function resumeGame() {
  life.resetBpm();
  scenario.restart();
  character.restart();
  firstAidResponder.x = width;
  isGameStopped = false;
  gameStoppedTimerCount = 0;

  powerUps.forEach(powerUp => {
    powerUp.restart();
  });
  
  enemies.forEach(enemy => {
    enemy.restart();
  });
}

function isBusinessHours() {
  if (score.scoreHour >= 9 && score.scoreHour < 17) {
    return true;
  }
  else {
    return false;
  }
}

function drawPauseMenu() {
  drawWhiteBoard(0);
  
  let title = "Game paused";
  
  P5Style.titleStyle();
  text(title, width/2, height * 1/6 + 35);
  
  homeButton.removeClass('homeButtonFromScores').addClass('homeButtonFromPause');
  homeButton.show();

  resetButton.addClass('resetButtonFromPause');
  resetButton.show();

  resumeButton.addClass('resumeButtonFromPause')
  resumeButton.show();

  noLoop();
}

function drawMenu() {
  scenario.display();
  
  drawWhiteBoard(0);
  
  let title = "Stanley's Day At The Office";
  
  P5Style.titleStyle();
  text(title, width/2, height * 1/6 + 35);

  let previousHeight = height * 1/6 + 45;
  let newHeight = previousHeight + 20;

  P5Style.simpleTextStyle();
  previousHeight = newHeight;
  newHeight = previousHeight + 15;
  text("Avoid getting too close to your boss and your co-workers,\nor your stress level will increase!", 140, newHeight);
  
  previousHeight = newHeight;
  newHeight = previousHeight + 35;
  text("Crossword puzzles reduce your stress and make time\ngo faster. Also, look up for delicious pretzels!",  140, newHeight);
  
  previousHeight = newHeight;
  newHeight = previousHeight + 40;
  text("Use ArrowUp or Click/Tap to jump.", 140, newHeight);

  highScoresButton.show();
  
  character.display();

  startButton.mousePressed(() => {
    clickButtonPressed = true;
    startButton.remove();
    resetButton.remove();
    resumeButton.remove();
    homeButton.remove();
    pauseButton.remove();
    highScoresButton.remove();
    sendScoreButton.remove();
    nameInput.remove();
    
    resetGame(sceneGame);
  });
}

function drawHighScores() {
  scenario.display();
  drawWhiteBoard(0);
  
  let title = "High Scores";
  P5Style.titleStyle();
  text(title, width/2, height * 1/6 + 35);

  
  let currentHeight = height * 1/6 + 80;
  highScores.forEach(highScore => {

    if (lastScore != null && highScore.docId === lastScore.docId) {
      P5Style.redTextStyle();
    }
    else {
      P5Style.simpleTextStyle();
    }

    textAlign(LEFT);
    text((highScores.indexOf(highScore) + 1) + ". " + highScore.name, 240, currentHeight);
    textAlign(RIGHT);
    text(highScore.totalScore, 400, currentHeight);
    currentHeight = currentHeight + 20;
  })

  if (lastScore != null && currentUserHighScore != null && lastScore.docId === currentUserHighScore.docId) {
    P5Style.redTextStyle();
  }
  else {
    P5Style.simpleTextStyle();
  }

  currentHeight = currentHeight + 20;
  textAlign(LEFT);
  text("Your high score:", 240, currentHeight);
  textAlign(RIGHT);
  if (currentUserHighScore != null) {
    text(currentUserHighScore.totalScore, 400, currentHeight);
  }
  else {
    text(0, 400, currentHeight);
  }

  if (lastScore != null) {
    P5Style.redTextStyle();
    currentHeight = currentHeight + 20;
    textAlign(LEFT);
    text("Your last score:", 240, currentHeight);
    textAlign(RIGHT);
    text(lastScore.totalScore, 400, currentHeight);
  }
  



  character.display();
}

function drawEnd() {
  scoreBoardTimerCount++;

  let title = "Game Over!"
  
  if (scoreBoardTimerCount < 210) {
    if (scoreBoardTimerCount < 170) {
      offsetStep = 0;
    }
    else {
      offsetStep = offsetStep - 20;
    }
    drawWhiteBoard(offsetStep);
    drawScoreBoard(title, offsetStep);
    animateScoreBoard();
  }
  else {
    pauseButton.hide();

    if (lastScore == null || lastScore.docId == null) {
      lastScore = new HighScore(
        null,
        score.totalScore,
        score.scoreDay,
        score.scoreHour,
        score.scoreMinute,
        score.totalPretzels,
        score.totalCrosswords,
        score.totalDaysAllPretzelsPicked,
        score.totalFirstAidOccurrences,
        null
      );
    }

    let minHighScore = 0;
    if (highScores[4] != null) {
      minHighScore = highScores[4].totalScore
    }

    if(currentUserHighScore == null || score.totalScore > currentUserHighScore.totalScore || score.totalScore > minHighScore) {
      drawWhiteBoard(0);
      drawHighScoreInput(0);  
    }
    else {
      readHighScores(5, true);
    }
  }

  character.display();
}

function drawLevelEnd() {
  scoreBoardTimerCount++;
  
  if (scoreBoardTimerCount < 220) {
    offsetStep = 0;
  }
  else {
    offsetStep = offsetStep - 20;
  }
  drawWhiteBoard(offsetStep);
  let title = "Day " + score.scoreDay + " Finished!";
  drawScoreBoard(title, offsetStep);
  
  animateScoreBoard();
  animateNewLevelCountdown();

  life.decreaseBpm(100);
  character.display();
  
  if (isBusinessHours()) {
    currentScene = sceneGame;
    startNewLevel();
  }
}

function drawGame() {
  scenario.display();
  scenario.move();

  if (!isGameOver) {
    pauseButton.show();
    pauseButton.mousePressed(() => {
      clickButtonPressed = true;
      currentScene = scenePause;
    });
  }
    
  powerUps.forEach(powerUp => {
    powerUp.display();
    powerUp.move();
  
    if (character.isColliding(powerUp) && !powerUp.picked) {
      powerUp.getPicked();

      if (powerUp.type === typePretzel) {
        score.increasePretzels();
      }
      else if (powerUp.type === typeCrossword) {
        score.increaseCrosswords();
        life.decreaseBpm();
        score.fastForward(crosswordFastForwardMinutes);
      }
    }
  });

  character.display();
  character.applyGravity();

  if (score.scoreHour >= 17) {
    stopGame(typeLevelFinish);

    currentScene = sceneLevelEnd;
  }

  if ((life.bpm < life.maxBpm) && !isGameStopped) {
    character.animate();
    score.increaseScore();
  }

  let levelIndex = (score.scoreDay + gameMap.length - 1) % gameMap.length;
  let levelMap = gameMap[levelIndex].levelMap;

  if (mapIndex >= levelMap.length) {
    mapIndex = 0;
  }
  
  let currentLevelMap = levelMap[mapIndex];
  let currentEnemies = currentLevelMap.enemies;
  let currentEnemiesIds = currentEnemies.map(function(item) {return item.enemyId});

  enemies.filter(function (item) {
      return currentEnemiesIds.includes(enemies.indexOf(item));
    }).forEach(enemy => {
      enemy.display();
      enemy.animate();
      enemy.move();

      if (isBusinessHours()) {
        let currentSpeed = currentEnemies.filter(function (item) {return item.enemyId === enemies.indexOf(enemy)})[0].speed;

        enemy.setSpeed(currentSpeed);

        if (character.isColliding(enemy) && !isGameStopped) {
          if (!enemy.hasCollided) {
            failTheme.play();
          }

          life.increaseBpm();

          enemy.hasCollided = true;
        }
        else {
          enemy.hasCollided = false;
        }
      };
  });
  
  score.display();
  life.display();
  
  if (life.bpm >= life.maxBpm) {
    stopGame(typeDeath);

    if (isGameOver) {
      if (gameStoppedTimerCount > 50) {
        currentScene = sceneEnd;
      }
    }
    else {
      firstAidResponder.display();

      if (firstAidResponder.x > character.x + 70 || gameStoppedTimerCount > 100) {
        firstAidResponder.animate();
        firstAidResponder.move();
      }

      if (gameStoppedTimerCount > 120) {
        resumeGame();
      }
    }
  }

  mapTimerCount++;
  
  if (mapTimerCount >= currentLevelMap.duration) {

    enemies.filter(function (item) {
        return currentEnemiesIds.includes(enemies.indexOf(item));
      }).forEach(enemy => {
        enemy.stop();
    });

    let currentEnemies = enemies.filter(function (item) {
      return currentEnemiesIds.includes(enemies.indexOf(item));
    })

    let visibleEnemies = currentEnemies.filter(function (item) {
      return item.x > -item.characterWidth;
    }).length;

    if (visibleEnemies <= 0) {
      enemies.filter(function (item) {
          return currentEnemiesIds.includes(enemies.indexOf(item));
        }).forEach(enemy => {
          enemy.restart();
      });

      mapTimerCount = 0;
      mapIndex++;
    }
  }
}

function drawWhiteBoard(offsetX) {
  fill(255,255,255,200);
  noStroke();
  rect(width * 1/8 + offsetX, height * 1/8, width * 3/4, height * 3/4);
}

function drawScoreBoard(title, offsetX) {
  P5Style.titleStyle();
  text(title, width/2 + offsetX, height * 1/6 + 35);

  let clockTime;

  if (isBusinessHours()) {
    clockTime = score.n(score.scoreHour) + "h" + score.n(score.scoreMinute);
  }
  else {
    clockTime = "17h00";
  }

  image(imgClock, 200 + offsetX, height * 1/6 + 55, 30, 30);
  P5Style.clockCountStyle();
  text(clockTime, 240 + offsetX, height * 1/6 + 80);
  textAlign(RIGHT);
  text(score.scoreIncrementTime, 430 + offsetX, height * 1/6 + 80);
  
  image(imgPretzel, 190 + offsetX, height * 1/6 + 90, 50, 50);
  P5Style.pretzelCountStyle();
  text(score.pretzels, 240 + offsetX, height * 1/6 + 120);
  textAlign(RIGHT);
  text(score.scoreIncrementPretzels, 430 + offsetX, height * 1/6 + 120);

  image(imgCrossword, 190 + offsetX, height * 1/6 + 125, 50, 50);
  P5Style.clockCountStyle();
  text(score.crosswords, 240 + offsetX, height * 1/6 + 160);
  textAlign(RIGHT);
  text(score.scoreIncrementCrosswords, 430 + offsetX, height * 1/6 + 160);

  fill(103, 130, 133);
  noStroke();
  rect(width * 1/4 + offsetX, 240, width * 1/2, height * 1/7, 10);
  
  P5Style.clockCountStyle();
  text("Total score:", 190 + offsetX, height * 1/6 + 215);
  textAlign(RIGHT);
  text(score.totalScore, 430 + offsetX, height * 1/6 + 215);
}

function animateScoreBoard() {
  if (scoreBoardTimerCount > 30) {
    score.addTimeScoreToTotal();
  }
  if (scoreBoardTimerCount > 75) {
    score.addPretzelScoreToTotal();
  }
  if (scoreBoardTimerCount > 120) {
    score.addCrosswordScoreToTotal();
  }
}

function drawHighScoreInput(offsetX) {
  P5Style.titleStyle();
  text("New high score!", width/2 + offsetX, height * 1/6 + 35);

  P5Style.clockCountStyle();
  text("Total score:", 185 + offsetX, height * 1/6 + 90);
  textAlign(RIGHT);
  text(score.totalScore, 430 + offsetX, height * 1/6 + 90);

  fill(103, 130, 133);
  noStroke();
  rect(width * 1/4 + offsetX, 177, width * 1/2, height * 1/7, 10);
  
  P5Style.clockCountStyle();
  text("Your name:", 185 + offsetX, height * 1/6 + 150);
  nameInput.show();

  sendScoreButton.show();

  sendScoreButton.mousePressed(() => {
    let nameValue = nameInput.value();
    nameInput.attribute('disabled', true);
    sendScoreButton.attribute('disabled', true);

    let updateUserHighScore = (currentUserHighScore == null || score.totalScore > currentUserHighScore.totalScore);

    if (updateUserHighScore) {
      currentUserHighScore = new HighScore(
        nameValue,
        score.totalScore,
        score.scoreDay,
        score.scoreHour,
        score.scoreMinute,
        score.totalPretzels,
        score.totalCrosswords,
        score.totalDaysAllPretzelsPicked,
        score.totalFirstAidOccurrences,
        null
      );
    }

    function addNewScore(myName, myScore) {
      addScoreToDb(myName, myScore).then(function(result) {
        nameInput.remove();
        sendScoreButton.remove();

        lastScore.setDocId(result.id);
        if (updateUserHighScore) {
          currentUserHighScore.setDocId(result.id);
        }
        
        localStorage.setItem('currentUserHighScore', JSON.stringify(currentUserHighScore));

        readHighScores(5, true);
      })
    }
    
    addNewScore(nameValue, score);
  });
}

function animateNewLevelCountdown() {
  P5Style.titleLargeStyle();
  if (score.scoreHour === 5) {
    text("Day " + (score.scoreDay + 1) + " starting in...", width/2, height * 1/6 + 35);  
  }
  else if (score.scoreHour === 6) {
    text("3...", width/2, height * 1/6 + 35);
  }
  else if (score.scoreHour === 7) {
    text("2...", width/2, height * 1/6 + 35);
  }
  else if (score.scoreHour === 8) {
    text("1...", width/2, height * 1/6 + 35);
  }
}

function buildPretzelsPositionMatrix() {
  pretzelsPositionMatrix = [];

  let lastPosition = pretzelFirstXPostion;
  pretzelsPositionMatrix.push([lastPosition, pretzelYHigh]);
  for (let i = 0; i < pretzelQuantity - 1; i++) {
    lastPosition = lastPosition + (100 * Math.floor(random(1, 11)));

    if (lastPosition === 2000 || lastPosition === 11000) {
      lastPosition = lastPosition + (100 * Math.floor(random(1, 11)));
    }
    else if (lastPosition > mapLength) {
      lastPosition = mapLength - (100 * Math.floor(random(1, 11)));
    }

    let positionY;
    let randomNumber = Math.floor(random()*10);
    if (randomNumber % 2 === 0) {
      positionY = pretzelYHigh;
    }
    else {
      positionY = pretzelYLow;
    }

    pretzelsPositionMatrix.push([lastPosition, positionY]);
  }
}

function buildCrosswordsPositionMatrix() {
  crosswordsPositionMatrix = [];

  crosswordsPositionMatrix.push([2000, 100]);
  crosswordsPositionMatrix.push([11000, 100]);
}

// function touchStarted() {
//   getAudioContext().resume();
// }
