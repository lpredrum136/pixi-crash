// import * as PIXI from 'pixi.js';

// Aliases
let Application = PIXI.Application,
  Sprite = PIXI.Sprite;

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application({
  width: 512,
  height: 512,
  antialias: true,
  transparent: false,
  resolution: 1
  //this is fine, or see below
  //backgroundColor: 0xd06131
});

/* Set canvas color */
app.renderer.backgroundColor = 0xd06131;

/* Set canvas size */
/* app.renderer.view.width = 100;
app.renderer.view.height = 100; */

/* Set canvas size 2 */
/* app.renderer.autoDensity = true;
app.renderer.resize(100, 100); */

/* Make canvas fill window */
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// Run every time a file loads, e.g. bunny or kitty image file, so before the main load() function
const loadProgressHandler = (loader, resources) => {
  // Display the file `url` currently being loaded
  console.log(`loading... ${resources.name} from ${resources.url}`);

  // Display the percentage of files currently loaded
  console.log(`progress: ${loader.progress}%`);
};

// load the texture we need
app.loader
  // .add('bunny', 'bunny.png')
  // .add('kitty', 'kitty.jpg')
  .add([
    {
      name: 'bunny',
      url: 'bunny.png',
      onComplete: () => console.log('bunny finished loading')
    },
    {
      name: 'kitty',
      url: 'kitty.jpg',
      onComplete: () => console.log('kitty finished loading')
    }
  ])
  .on('progress', loadProgressHandler)
  .load((loader, resources) => {
    console.log('All files loaded. Setting up...');

    // This creates a texture from a 'bunny.png' image
    const bunny = new Sprite(resources.bunny.texture);
    const kitty = new Sprite(resources.kitty.texture);

    /* BUNNY */
    // Resize half
    bunny.scale.set(0.5, 0.5);

    // Setup the position of the bunny (bunny anchor goes here)
    /* bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2; */
    bunny.position.set(app.renderer.width / 2, app.renderer.height / 2);

    // set the center of bunny to be, well, center, tam quay, default la top left.
    // chu y. the anchor point does not move, it is the texture that positions itself over the anchor.
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;
    // bunny.anchor.set(0.5, 0.5)

    /* KITTY */
    kitty.x = app.renderer.width / 4;
    kitty.y = app.renderer.height / 4;

    // Size
    kitty.width = 80;
    kitty.height = 120;
    /*
    kitty.scale.x = 0.5
    kitty.scale.y = 2
    */

    // Rotation (in rad)
    kitty.rotation = 3.14;

    // Pivot, similar to anchor, setting the position of the sprite's x/y origin point. Different from anchor? pixels vs 0-1 scale
    kitty.pivot.set(10, 10);

    // Pivot nay se cach bunny anchor x = 200, y = 200
    // Nhung do pivot luon la tam cua canvas, nen bunny thuc ra se bi di chuyen
    bunny.pivot.set(200, 0);

    // Click on bunny to zoom
    app.stage.interactive = true;
    bunny.interactive = true;
    bunny.click = () => {
      bunny.scale.x += 0.1;
      bunny.scale.y += 0.1;
    };

    // Add the bunny to the scene we are building
    app.stage.addChild(bunny);
    app.stage.addChild(kitty);

    // Hide the sprite
    // kitty.visible = false;

    // Change texture, i.e. load other image in kitty variable
    // kitty.texture = PIXI.utils.TextureCache['bunny.png'];

    // Listen for frame updates
    app.ticker.add(() => {
      // each frame we spin the bunny around a bit
      bunny.rotation += 0.01;
    });
  });

/* PIXI.utils.sayHello();

const renderer = PIXI.autoDetectRenderer(512, 512, {
  transparent: true,
  resolution: 1
});

document.getElementById('display').appendChild(renderer.view);

const stage = new PIXI.Container();

PIXI.loader.add('bunny', 'bunny.png').load(setup);

let bunny;

function setup() {
  stage.interactive = true;
  bunny = new PIXI.Sprite(PIXI.loader.resources['bunny'].texture);

  bunny.interactive = true;
  bunny.scale.set(0.5, 0.5);
  bunny.anchor.set(0.5, 0.5);
  bunny.pivot.set(200, 0);

  bunny.click = function() {
    bunny.scale.x += 0.1;
    bunny.scale.y += 0.1;
  };

  stage.addChild(bunny);
  animationLoop();
}

function animationLoop() {
  requestAnimationFrame(animationLoop);

  bunny.x = renderer.width / 2;
  bunny.y = renderer.height / 2;

  bunny.rotation += 0.01;

  renderer.render(stage);
}
 */
