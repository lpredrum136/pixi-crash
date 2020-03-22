let Application = PIXI.Application,
  TextureCache = PIXI.utils.TextureCache,
  Container = PIXI.Container,
  Sprite = PIXI.Sprite;

const app = new Application({
  width: 512,
  height: 512,
  antialiasing: true,
  transparent: false,
  resolution: 1
});

app.renderer.autoDensity = true;

document.body.appendChild(app.view);

let cat, hedgehog, tiger;

app.loader.add('images/animals.json').load((loader, resources) => {
  const animalTextures = resources['images/animals.json'].textures;

  // Animals
  cat = new Sprite(animalTextures['cat.png']);
  hedgehog = new Sprite(animalTextures['hedgehog.png']);
  tiger = new Sprite(animalTextures['tiger.png']);

  cat.position.set(16, 16);
  hedgehog.position.set(32, 32);
  tiger.position.set(64, 64);

  const animals = new Container();

  animals.addChild(cat);
  animals.addChild(hedgehog);
  animals.addChild(tiger);

  // From now on, animals is like a new Sprite

  animals.position.set(200, 200);

  app.stage.addChild(animals);

  console.log(animals);
  console.log(animals.children);

  console.log(
    `Animals width: ${animals.width} & Animals height: ${animals.height}`
  );
});
