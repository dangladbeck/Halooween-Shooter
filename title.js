function titleScreen()
{
	// variables
	var sprLogo = [148,40,332,202];
	var sprStart1 = [0,78,118,56];
	var sprStart2 = [0,136,122,58];
	var sprScore = [0,0,142,36];
	var sprTime = [0,38,136,36];
	
	var buttonOver = false;
	
	game.sndTitle.play();
	
	
	// public methods
	this.update = function()
	{
		buttonOver =  (game.mouseX > 339 && game.mouseX < 461 && game.mouseY > 299 && game.mouseY < 357);
		
	}
	
	this.draw = function()
	{
		//game.ctx.drawImage(game.imgUI, sprScore[0], sprScore[1], sprScore[2], sprScore[3], 0, 0, sprScore[2], sprScore[3]);
		//game.ctx.drawImage(game.imgUI, sprTime[0], sprTime[1], sprTime[2], sprTime[3], 500, 0, sprTime[2], sprTime[3]);
		game.ctx.drawImage(game.imgUI, sprLogo[0], sprLogo[1], sprLogo[2], sprLogo[3], 234, 50, sprLogo[2], sprLogo[3]);
		if (buttonOver)
		{
			game.ctx.drawImage(game.imgUI, sprStart2[0], sprStart2[1], sprStart2[2], sprStart2[3], 339, 299, sprStart2[2], sprStart2[3]);
		}
		else
		{
			game.ctx.drawImage(game.imgUI, sprStart1[0], sprStart1[1], sprStart1[2], sprStart1[3], 341, 300, sprStart1[2], sprStart1[3]);
		}
		
		
	}
	
	this.onClick = function(X, Y)
	{
		if (buttonOver)
		{
			game.sndTitle.pause();
			changeScreen("game");
		}
	}
}