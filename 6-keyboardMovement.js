let Application = PIXI.Application,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle;

const app = new Application({
  width: 512,
  height: 512,
  antialiasing: true,
  transparent: false,
  resolution: 1
});

app.renderer.autoDensity = true;

document.body.appendChild(app.view);

let state, explorer, treasure;

app.loader.add('images/treasureHunter.json').load((loader, resources) => {
  // Load dungeon. Cach 1
  const dungeonTexture = TextureCache['dungeon.png'];
  const dungeon = new Sprite(dungeonTexture);
  app.stage.addChild(dungeon);

  // Load explorer. Cach 2.
  explorer = new Sprite(
    resources['images/treasureHunter.json'].textures['explorer.png']
  );

  explorer.x = app.renderer.width / 10;
  explorer.y = app.renderer.height / 2 - explorer.height / 2;
  explorer.vx = 0;
  explorer.vy = 0;

  app.stage.addChild(explorer);

  // Load the rest. Cach 3. Use treasure
  const spriteTextures = resources['images/treasureHunter.json'].textures;

  // Treasure
  treasure = new Sprite(spriteTextures['treasure.png']);
  treasure.x = (app.renderer.width / 10) * 8;
  treasure.y = app.renderer.height / 2 - treasure.height / 2;
  treasure.vx = 0;
  treasure.vy = 0;

  app.stage.addChild(treasure);

  // Keyboard movement for treasure
  const left = keyboard('ArrowLeft');
  const up = keyboard('ArrowUp');
  const right = keyboard('ArrowRight');
  const down = keyboard('ArrowDown');

  // Move treasure handlers
  left.press = () => {
    treasure.vx = -5;
    treasure.vy = 0;
  };

  // Left arrow key 'release' method
  left.release = () => {
    // If the left arrow has been released, and the right arrow is not down, and the treasure is not moving vertically
    // Stop the treasure
    if (!right.isDown && treasure.vy == 0) treasure.vx = 0;
  };

  // Move treasure up
  up.press = () => {
    treasure.vx = 0;
    treasure.vy = -5;
  };

  up.release = () => {
    if (!down.isDown && treasure.vx == 0) treasure.vy = 0;
  };

  // Move treasure right
  right.press = () => {
    treasure.vx = 5;
    treasure.vy = 0;
  };

  right.release = () => {
    if (!left.isDown && treasure.vy == 0) treasure.vx = 0;
  };

  // Move treasure down
  down.press = () => {
    treasure.vx = 0;
    treasure.vy = 5;
  };

  down.release = () => {
    if (!up.isDown && treasure.vx == 0) treasure.vy = 0;
  };

  // Exit door
  const door = new Sprite(spriteTextures['door.png']);
  door.position.set(32, 0);

  app.stage.addChild(door);

  // Blobs
  const numBlobs = 6;
  const spacing = 48;
  const xOffset = 150;

  for (let i = 0; i < numBlobs; i++) {
    let blob = new Sprite(spriteTextures['blob.png']);

    // Space each blob horizontally according to the `spacing` value.
    // `xOffset` determines the point from the left of the screen
    // at which the first blob should be added.
    let x = spacing * i + xOffset;

    // Give the blob a random y position
    // (`randomInt` is a custom function - see below)
    let y = randomInt(0, app.renderer.height - blob.height);

    // Set blob position
    blob.position.set(x, y);

    app.stage.addChild(blob);
  }

  // Set the game state
  state = play;

  // Movement
  app.ticker.add(delta => movement(delta));

  /* or
  app.ticker.add(() => {
    explorer.x += 0.1;
  }); */

  /* or
  const movement = () => {
    requestAnimationFrame(movement);
    explorer.x += 0.1;
  };
  movement(); */
});

const movement = delta => {
  state(delta);
};

const play = delta => {
  treasure.x += treasure.vx;
  treasure.y += treasure.vy;
};

const keyboard = value => {
  const key = {
    value: value,
    isDown: false,
    isUp: true,
    press: undefined,
    release: undefined,
    // The 'downHandler'
    downHandler: event => {
      if (event.key == key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    },
    // The 'upHandler'
    upHandler: event => {
      if (event.key == key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    }
  };

  // Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener('keydown', downListener, false);
  window.addEventListener('keyup', upListener, false);

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener);
    window.removeEventListener('keyup', upListener);
  };

  return key;
};

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
