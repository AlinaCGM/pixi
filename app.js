const Application = PIXI.Application;

const app = new Application({
  width: 500,
  height: 500,
  transparent: false,
  antialias: true, //to smooth out the jagged edges of lines and curves in digital graphics.
});

app.renderer.backgroundColor = 0x23395d;

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
