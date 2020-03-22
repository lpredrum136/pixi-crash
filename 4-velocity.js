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

let explorer;

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
  const treasure = new Sprite(spriteTextures['treasure.png']);
  treasure.x = (app.renderer.width / 10) * 8;
  treasure.y = app.renderer.height / 2 - treasure.height / 2;

  app.stage.addChild(treasure);

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
  explorer.vx = 0.1;
  explorer.vy = 0.1;
  explorer.x += explorer.vx;
  explorer.y += explorer.vy;
};

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
