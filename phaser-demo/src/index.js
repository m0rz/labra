import Phaser, { GameObjects } from 'phaser';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1920,
  height: 1028,
  scene: {
    preload: preload,
    create: () => create(window.appContext),
  }
};

const game = new Phaser.Game(config);

function preload() {
  window.appContext = this;
  this.load.image('raster', 'assets/image.jpg');
  this.load.image('taxes', 'assets/image2.jpg');

  this.load.audio('theme', 'assets/theme-song.mp3');
}

function getRandomColor() {
  const colors = [0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c];
  const index = Math.floor(Math.random() * Math.floor(colors.length));
  return colors[index];
}

const create = (context) => {
  const group = context.add.group();
  const objectCount = 8;
  const theme = context.sound.add('theme');
  
  group.createMultiple({ key: 'raster', repeat: objectCount }); 

  const textGroup = context.add.group();
  textGroup.create({key: 'taxes'});

  textGroup.children.iterate((child) => {
    child.x = -100;
    child.y = 512;
    child.depth = 10;
    child.tint = getRandomColor();

    context.tweens.add({
      targets: child,
      x: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      duration: 5000,
    })
  })
  
  let ci = 0;

  group.children.iterate((child) => {
    
    child.x = 100;
    child.y = 300;
    child.depth = objectCount - ci;
    child.tint = getRandomColor();

    ci++;
    
    context.tweens.add({
      targets: child,
      y: 700,
      x: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      duration: 750,
      delay: 150 * ci,
    });
  });

  theme.play();
}
