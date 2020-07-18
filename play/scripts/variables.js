const imgButtonPlay = 'images/buttons/play.png';
const imgButtonPause = 'images/buttons/pause.png';
const imgButtonHome = 'images/buttons/home.png';
const imgButtonRestart = 'images/buttons/redo.png';
const imgButtonPodium = 'images/buttons/podium.png';
const imgButtonTrophy = 'images/buttons/trophy.png';

let imgScenario;
let imgCharacter;
let imgCharacterDead;
let imgCharacterWin;
let imgEnemyDwight;
let imgEnemyMichael;
let imgEnemyFlyingMichael;
let imgGameOver;
let imgFirstAid;
let imgFirstAidResponder;
let imgPretzel;
let imgCrossword;
let imgStressGreen;
let imgStressYellow;
let imgStressRed;
let imgStressBomb;
let imgClock;
let imgClockBlinking;
let imgDay;
let scenario;
let character;
let firstAidResponder;
let musicTheme;
let jumpTheme;
let powerUpTheme;
let failTheme;
let deathTheme;
let endTheme;

let enemies = [];
let powerUps = [];
let pretzelsPositionMatrix = [];
let crosswordsPositionMatrix = [];

// let highScoresText = '';
let highScores = [];
let lastScore;
let currentUserHighScore;

const canvasWidth = 640;
const canvasHeight = 360;

const pretzelYHigh = 100;
const pretzelYLow = 260;
const pretzelFirstXPostion = 500;
const pretzelQuantity = 25;
const crosswordFastForwardMinutes = 30;
const crosswordStressReduction = 20;

const typePretzel = 'PRETZEL';
const typeCrossword = 'CROSSWORD';
const typeFirstAid = 'FIRST_AID';
const typeDeath = 'DEATH';
const typeFinish = 'FINISH';
const typeLevelFinish = 'LEVELFINISH';
const typeNormal = 'NORMAL';

const sceneMenu = 'MENU';
const sceneHighScores = 'HIGHSCORES';
const sceneGame = 'GAME';
const scenePause = 'PAUSE';
const sceneLevelEnd = 'LEVELEND';
const sceneEnd = 'END';

let isGameStopped;
let isGameOver;
let isGameFinished;
let isLevelFinished;

const mapLength = 14000;

let scenarioSpeed = 6;
const imgScenarioWidth = 1280;

const minuteScore = 10;
const pretzelScore = 150;
const crosswordScore = 450;
const allPretzelsScore = 1000;

let mapTimerCount = 0;
let gameStoppedTimerCount = 0;
let scoreBoardTimerCount = 0;
let mapIndex = 0;
let resetButtonVisible;

const gameMap = [
  {
    levelMap: [
      {
        enemies: [
          {
            enemyId: 0,
            speed: 8
          },
          // {
          //   enemyId: 1,
          //   speed: 12
          // },
          // {
          //   enemyId: 2,
          //   speed: 15
          // }
        ],
        duration: 50
      },
      {
        enemies: [
          {
            enemyId: 0,
            speed: 8
          },
          {
            enemyId: 1,
            speed: 12
          },
          // {
          //   enemyId: 2,
          //   speed: 15
          // }
        ],
        duration: 50
      },
      {
        enemies: [
          {
            enemyId: 0,
            speed: 8
          },
          // {
          //   enemyId: 1,
          //   speed: 12
          // },
          {
            enemyId: 2,
            speed: 15
          }
        ],
        duration: 50
      },
      {
        enemies: [
          {
            enemyId: 0,
            speed: 8
          },
          {
            enemyId: 1,
            speed: 12
          },
          {
            enemyId: 2,
            speed: 15
          }
        ],
        duration: 900
      }
    ]
  },
  {
    levelMap: [
      {
        enemies: [
          {
            enemyId: 3,
            speed: 8
          },
          {
            enemyId: 4,
            speed: 12
          },
          // {
          //   enemyId: 5,
          //   speed: 15
          // }
        ],
        duration: 50
      },
      {
        enemies: [
          {
            enemyId: 3,
            speed: 7
          },
          {
            enemyId: 4,
            speed: 14
          },
          {
            enemyId: 5,
            speed: 10
          }
        ],
        duration: 250
      },
      {
        enemies: [
          {
            enemyId: 3,
            speed: 8
          },
          {
            enemyId: 4,
            speed: 15
          },
          {
            enemyId: 5,
            speed: 10
          }
        ],
        duration: 250
      },
      {
        enemies: [
          {
            enemyId: 3,
            speed: 8
          },
          {
            enemyId: 4,
            speed: 14
          },
          {
            enemyId: 5,
            speed: 10
          }
        ],
        duration: 250
      },
      {
        enemies: [
          {
            enemyId: 3,
            speed: 8
          },
          {
            enemyId: 4,
            speed: 15
          },
          {
            enemyId: 5,
            speed: 12
          }
        ],
        duration: 250
      }
    ]
  }
]

const stanleyWidth = 90;
const stanleyHeight = 125;
const dwightWidth = 90;
const dwightHeight = 145;
const michaelWidth = 90;
const michaelHeight = 140;
const flyingMichaelWidth = 90;
const flyingMichaelHeight = 110;
const firstAidResponderWidth = 90;
const firstAidResponderHeight = 145;

const stanleyOffsetX = 60;
const stanleyOffsetY = 5;

const stanleyPositionMatrix = [
  [0, 0],
  [stanleyWidth, 0],
  [stanleyWidth * 2, 0],
  [stanleyWidth * 3, 0]
];

const dwightPositionMatrix = [
  [0, 0],
  [dwightWidth, 0],
  [dwightWidth * 2, 0],
  [dwightWidth * 3, 0]
];

const michaelPositionMatrix = [
  [0, 0],
  [michaelWidth, 0],
  [michaelWidth * 2, 0],
  [michaelWidth * 3, 0]
];

const flyingMichaelPositionMatrix = [
  [0, 0],
  [flyingMichaelWidth, 0],
  [flyingMichaelWidth * 2, 0],
  [flyingMichaelWidth * 3, 0]
];

const firstAidResponderPositionMatrix = [
  [0, 0],
  [firstAidResponderWidth, 0],
  [firstAidResponderWidth * 2, 0],
  [firstAidResponderWidth * 3, 0]
];