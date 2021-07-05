var game = 
{
	// global variables
	canvas: null,
	ctx: null,
	imgBoo: new Image(),
	imgBG: new Image(),
	imgUI: new Image(),
	imgGameOver: new Image(),
	mouseX: 0,
	mouseY: 0,
	sndFire: new Audio(),
	sndRoar: new Audio(),
	sndTitle: new Audio(),
	sndLevel: new Audio()
};

/* Each screen handles its input, update and draw methods */
var currentScreen;

var resLoaded;
var sprCursor = [5,200,36,36];

window.onload = function()
{
	// initialize canvas
	game.canvas = document.getElementById("canvas");
	game.canvas.addEventListener("click", onClick, false);
	game.canvas.addEventListener("mousemove", onMove, false);
	game.ctx = game.canvas.getContext('2d');
	
	resLoaded = 0;
	
	// Load all resources, in the form:
	game.imgBoo.src = "boo.png";
	game.imgBoo.onload = loadRes;
	game.imgBG.src = "hauntedhouse.png";
	game.imgBG.onload = loadRes;
	game.imgUI.src = "ui.png";
	game.imgUI.onload = loadRes;
	game.imgGameOver.src = "gameover.png";
	game.imgGameOver.onload = loadRes;
	
	game.sndFire.src = "fire.ogg";
	game.sndFire.onloadeddata = loadRes;
	game.sndRoar.src = "roar.ogg";
	game.sndRoar.onloadeddata = loadRes;
	game.sndTitle.src = "citynite.ogg";
	game.sndTitle.loop = true;
	game.sndTitle.onloadeddata = loadRes;
	game.sndLevel.src = "level.mp3";
	game.sndLevel.loop = true;
	game.sndLevel.onloadeddata = loadRes;
}

function loadRes()
{
	resLoaded++;	
	if (resLoaded == 8) // if this is the last resource loaded
	{
		run();	
	}
}

function run()
{
	// set game loop - at fixed frame rate
	setInterval(loop, 1000 / 60); // 60 fps
	
	// begin wit first screen
	currentScreen = new titleScreen();
}

function loop()
{
	// call update and draw methods
    update();
    draw();
}

function update()
{
	currentScreen.update(); // update screen
}

function draw()
{
	game.ctx.drawImage(game.imgBG, 0, 0);
	currentScreen.draw();  // draw current screen
	game.ctx.drawImage(game.imgUI, sprCursor[0], sprCursor[1], sprCursor[2], sprCursor[3], game.mouseX - 18, game.mouseY - 18, sprCursor[2], sprCursor[3])
}

function onClick(e)
{
	game.sndFire.play();
	currentScreen.onClick(e.offsetX, e.offsetY);	
}

function onMove(e)
{
	game.mouseX = e.offsetX;
	game.mouseY = e.offsetY;
}

function changeScreen(nextScreen)
{
	if (nextScreen == "title")
	{
		currentScreen = new titleScreen();
	}
	else if (nextScreen == "game")
	{
		currentScreen = new gameScreen();
	}
}




