function gameScreen()
{
	// variables
	var screenWidth = game.canvas.width;
	var screenHeight = game.canvas.height;
	
	var self = this;
	var score = 0;
    var elapsedTime = 0;
    var gameOver = false;	
	var booList = [];
	
	var sprScore = [64,0,80,36];
	var sprTime = [64,38,80,36];
	
	game.sndLevel.play();
	generateBoos();
	
	
	
	function generateBoos()
	{
		var num = Math.floor(Math.random() * 3) + 1;  // 1 to 3
		for (var i = 0; i < num; i++)
        {
            booList.push(new Boo(screenWidth, screenHeight, self));
        }
	}
	
	function drawNumbers()
	{
		var srcLeft;
        var dstLeft;
        var remainder;
        var started = false;

        // Score
        dstLeft = 90;
        remainder = score;
        for (var n = 100; n > 1; Math.round(n /= 10))
        {
            if (remainder >= n) started = true;
            if (started)
            {
                srcLeft = 150 + Math.floor(remainder / n) * 25;
                game.ctx.drawImage(game.imgUI, srcLeft, 0, 20, 35, dstLeft, 0, 20, 35);
                dstLeft += 21;
                remainder = remainder % n;
            }
        }
        srcLeft = 150 + remainder * 25;
        game.ctx.drawImage(game.imgUI, srcLeft, 0, 20, 35, dstLeft, 0, 20, 35);

        // Time
        // minutos
        dstLeft = 655;
        remainder = Math.floor(elapsedTime / 3600);
        srcLeft = 150 + Math.floor(remainder / 10) * 25;
        game.ctx.drawImage(game.imgUI, srcLeft, 0, 20, 35, dstLeft, 0, 20, 35);
        dstLeft += 21;
        remainder = remainder % 10;
        srcLeft = 150 + remainder * 25;
        game.ctx.drawImage(game.imgUI, srcLeft, 0, 20, 35, dstLeft, 0, 20, 35);
        dstLeft += 21;
        // sinal de minutos
        game.ctx.drawImage(game.imgUI, 400, 0, 22, 35, dstLeft, 0, 22, 35);
        dstLeft += 13;
        // segundos
        remainder = Math.floor((elapsedTime % 3600) / 60);
        srcLeft = 150 + Math.floor(remainder / 10) * 25;
        game.ctx.drawImage(game.imgUI, srcLeft, 0, 22, 35, dstLeft, 0, 22, 35);
        dstLeft += 21;
        remainder = remainder % 10;
        srcLeft = 150 + remainder * 25;
        game.ctx.drawImage(game.imgUI, srcLeft, 0, 22, 35, dstLeft, 0, 22, 35);
        dstLeft += 21;
        // sinal de segundos
        game.ctx.drawImage(game.imgUI, 425, 0, 22, 35, dstLeft, 0, 22, 35);
        dstLeft += 15;
        // décimos de segundo
        remainder = Math.floor(((elapsedTime % 3600) % 60) / 6);
        srcLeft = 150 + remainder * 25;
        game.ctx.drawImage(game.imgUI, srcLeft, 0, 22, 35, dstLeft, 0, 22, 35);
	}
	
	
	// public methods
	this.update = function()
	{
		for (var n = 0; n < booList.length; n++)
        {
            booList[n].update(gameOver);
        }

        if (!gameOver)
        {
            elapsedTime++;
            if (elapsedTime % 60 == 0) // a cada segundo
            {
                generateBoos();
            }
        }
	}
	
	this.draw = function()
	{
		//draw boos
        for (var n = booList.length - 1; n >= 0; n--)
        {
            booList[n].draw();
        }
		
		if (gameOver)
		{
			game.ctx.fillStyle = "#FF0000";
			game.ctx.globalAlpha = 0.5;
			game.ctx.fillRect(0,0,screenWidth,screenHeight);
			game.ctx.globalAlpha = 1;
			game.ctx.drawImage(game.imgGameOver,250,65);
		}

        // draw scores
		game.ctx.drawImage(game.imgUI, sprScore[0], sprScore[1], sprScore[2], sprScore[3], 0, 0, sprScore[2], sprScore[3]);
		game.ctx.drawImage(game.imgUI, sprTime[0], sprTime[1], sprTime[2], sprTime[3], 570, 0, sprTime[2], sprTime[3]);
        drawNumbers();
	}
	
	this.onClick = function(clickX, clickY)
	{
		if (!gameOver)
        {
			for (var n = 0; n < booList.length; n++)
			{
				var a = booList[n].x - clickX;
				var b = booList[n].y - clickY;
				var dist = Math.sqrt(a*a + b*b);
				if (dist <= booList[n].radius)
				{
					if (booList[n].state != "hurt")
					{
						score++;
						booList[n].die();
					}
				}
			}	
		}
		else // game over
		{
			if (clickX > 250 && clickX < 250 + 299 && clickY > 65 + 288 && clickY < 65 + 288 + 32)
			{
				changeScreen("title");	
			}
		}
	}
	
	this.GameOver = function()
	{
		gameOver = true;	
	}
	
	this.removeBoo = function(boo)
	{
		booList.splice(booList.indexOf(boo), 1);
	}
}