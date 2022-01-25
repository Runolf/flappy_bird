// run: npm run dev
import Phaser from 'phaser';
var lost = document.getElementById('lost');
var buttonRestart = document.getElementById("restart");
buttonRestart.onclick = restart;
const config = {
  // WebGL (Web Graphics Library) JS APi to render 2D and 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade physics plugin, manages physics simulation 
    default: 'arcade',
    arcade:{
      gravity:{
  //      y:200                 // provide gravity to all objects
      },
      debug: true,
    }
  },
  scene:{
    preload: preload,
    create: create,
    update: update,
  }
};
var bird = null;
const initialBirdPos = {
  x: config.width/10,
  y: config.height/2,
}
var upperPipe = null;
var lowerPipe = null;
                                          // random value between 2 ranges
let pipeVerticalDistance = Phaser.Math.Between(150, 250);

var game = new Phaser.Game(config);

// load assets such as img, musics ... 
function preload(){
  // this context = scene. contains func and propperties we can use.
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');


}

function create(){
  // x : 400 : width/2
  // y : 300 : height/2
  // key img
  // this.add.image(config.width/2,config.height/2,'sky');
  this.add.image(0,0,'sky').setOrigin(0,0);
  bird =  this.physics.add.sprite(initialBirdPos.x,initialBirdPos.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 200; // gravity is changing at updates
  //bird.body.velocity.y = 200; // velocity not changing at updates
  //bird.body.velocity.x = 200; go right
  upperPipe = this.add.sprite(400,100, 'pipe').setOrigin(0,1);
  lowerPipe = this.add.sprite(400, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0,0);
  this.input.on('pointerdown', flap);
                          // case sensitive!
  this.input.keyboard.on('keydown_SPACE', flap);
}

//60fps.refresh 60 times per seconds. 
function update(time, delta){
  if(bird.y > config.height || bird.y <= 0 - bird.height){
    lost.hidden = false;
    buttonRestart.hidden = false;
  }
}

function restart(){
  bird.x = initialBirdPos.x;
  bird.y = initialBirdPos.y;
  bird.body.velocity.y = 0;
  lost.hidden = true;
  buttonRestart.hidden = true;
  
}

function flap(){
  bird.body.velocity.y = -200;
}