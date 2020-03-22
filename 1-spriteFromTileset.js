let Application = PIXI.Application,
  // Container = PIXI.Container,
  /* loader = PIXI.loader,
  resources = PIXI.loader.resources, */
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle;

//Create a Pixi Application
const app = new Application({
  width: 256,
  height: 256,
  antialiasing: true,
  transparent: false,
  resolution: 1
});

app.renderer.autoDensity = true;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

app.loader.add('texture', 'images/09-tileset.png').load((loader, resources) => {
  //Create the `tileset` sprite from the texture
  const texture = TextureCache['images/09-tileset.png'];

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  const rectangle = new Rectangle(96, 64, 32, 32);

  //Tell the texture to use that rectangular section
  texture.frame = rectangle;

  //Create the sprite from the texture
  const rocket = new Sprite(texture);

  //Position the rocket sprite on the canvas
  rocket.x = 32;
  rocket.y = 32;

  //Optionally use `pivot` to move the sprite's x and y position
  /*
rocket.pivot.set(32, 32);
rocket.rotation = 0.3;
console.log(rocket.position)
*/

  //Add the rocket to the stage
  app.stage.addChild(rocket);
});
