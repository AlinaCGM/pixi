const Application = PIXI.Application;

const app = new Application({
  width: 500,
  height: 500,
  transparent: false,
  antialias: true, //to smooth out the jagged edges of lines and curves in digital graphics.
});

app.renderer.background.color = "0x23395d";

app.renderer.resize(window.innerWidth, window.innerHeight);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.top = "0";
app.renderer.view.style.left = "0";

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

const rectangle = new Graphics(); //creating new item
rectangle
  .beginFill(0xaa33bb)
  .lineStyle(4, 0xffea00)
  .drawRect(200, 200, 100, 120) //first two-coordinates, second two-width and height
  .endFill();

app.stage.addChild(rectangle); //showing created item in app

//GRAPHICS

const poly = new Graphics();
poly
  .beginFill(0xff66ff)
  .lineStyle(4, 0xffea00)
  .drawPolygon([500, 150, 500, 50, 600, 300, 400, 400])
  .endFill();

app.stage.addChild(poly);

const circle = new Graphics();
circle.beginFill(0x0000ff).drawCircle(440, 200, 80).endFill();

app.stage.addChild(circle);

const line = new Graphics();
line.lineStyle(10, 0xffea00).moveTo(350, 100).lineTo(350, 800);
app.stage.addChild(line);

const torus = new Graphics();
torus
  .beginFill(0xfffddd)
  .drawTorus(100, 700, 80, 100, 0, Math.PI / 2) //last 2 indicates which part to draw
  .endFill();

app.stage.addChild(torus);

const star = new Graphics();
star.beginFill(0xddaa00).drawStar(100, 500, 100, 80).endFill();

app.stage.addChild(star);

//TEXT

const style = new PIXI.TextStyle({
  fontFamily: "Montserrat",
  fontSize: 48,
  fill: "deepskyblue",
  stroke: "#08e514",
  strokeThickness: 4,
  dropShadow: true,
  dropShadowDistance: 10,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 4,
  dropShadowColor: "#000000",
});

const myText = new PIXI.Text("Hello World!", style);

//changes of existing values

app.stage.addChild(myText);

myText.text = "Text Changed!";
myText.style.wordWrap = true;
myText.style.wordWrapWidth = 100;
myText.style.align = "center";

// create an ANIMATE element automatically
//use request animation frame method

// app.ticker.add((delta) => loop(delta));

// function loop(delta) {
//   const rect = new Graphics(); //creating new item
//   rect
//     .beginFill(0xff33dd)
//     .lineStyle(4, 0xffad00)
//     .drawRect(
//       Math.random() * app.screen.width,
//       Math.random() * app.screen.height,
//       1,
//       1
//     ) //first two-coordinates, second two-width and height
//     .endFill();

//app.stage.addChild(rect); //showing created item in app

//-----------------------------------

//IMAGES
//----------------ADDING AN IMAGE

// const char1Texture = PIXI.Texture.from("./images/bullet.png");
// const char1Sprite = new PIXI.Sprite(char1Texture);  OR
const char1Sprite = PIXI.Sprite.from("./images/bullet.png");
app.stage.addChild(char1Sprite);
//-------------------SIZE
//one way
// char1Sprite.width = 500;
// char1Sprite.height = 500;
//another way
// char1Sprite.scale.x = 2;
// char1Sprite.scale.y = 2;
//third way
char1Sprite.scale.set(2, 2);
//------------------POSITION
//ONE WAY
// char1Sprite.x = 200;
// char1Sprite.y = 400;
//another way
char1Sprite.position.set(200, 400);

//................ANIMATION

app.ticker.add((delta) => loop(delta));
function loop(delta) {
  // char1Sprite.x += 1; //TRANSITION
  //char1Sprite.rotation += 0.01; //ROTATION
}

char1Sprite.anchor.set(1, 1); //anchor

//............INTERACTION
char1Sprite.eventMode = true;
char1Sprite.buttonMode = true;

char1Sprite.on("pointerdown", function () {
  char1Sprite.scale.x += 0.1;
  char1Sprite.scale.y += 0.1;
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") char1Sprite.x += 10;
  if (e.key === "ArrowLeft") char1Sprite.x -= 10;
  if (e.key === "ArrowUp") char1Sprite.y -= 10;
  if (e.key === "ArrowDown") char1Sprite.y += 10;
});

//...........IMAGES IN ONE CONTAINER

const container = new PIXI.Container();
const catSprite = PIXI.Sprite.from("./images/cat.jpg");
container.addChild(catSprite);
const gunSprite = PIXI.Sprite.from("./images/gun.jpg");
container.addChild(gunSprite);
app.stage.addChild(container);

container.x = 300;

catSprite.width = 100;
catSprite.height = 100;
catSprite.position.set(100, 200);
gunSprite.width = 20;
gunSprite.height = 20;
gunSprite.position.set(150, 250);

const particleContainer = new PIXI.ParticleContainer(1000, {
  position: true,
  rotation: true,
  vertices: true,
  tint: true,
  uvs: true,
});

const duckTexture = PIXI.Texture.from("./images/duck.png");
const orangeTexture = PIXI.Texture.from("./images/orange.png");

// Use textures when they are loaded
duckTexture.baseTexture.on("loaded", () => {
  const duckSprite = new PIXI.Sprite(duckTexture);
  duckSprite.y = 400;
  duckSprite.width = 100;
  duckSprite.height = 100;
  app.stage.addChild(duckSprite);
});

const dragonTexture = PIXI.Texture.from("./images/drags.json");
dragonTexture.baseTexture.on("loaded", () => {
  const textures = [];
  for (let i = 1; i < 13; i++) {
    const texture = PIXI.Texture.from(`drag${i}.png`);
    textures.push(texture);
  }
  const drag = new PIXI.AnimatedSprite(textures);
  drag.position.set(800, 300);
  drag.scale.set(2, 2);
  app.stage.addChild(drag);
  drag.play();
  drag.animationSpeed = 0.1;
});
