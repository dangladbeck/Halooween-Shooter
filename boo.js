function Boo(screenWidth, screenHeight, level)
{
	this.state = "appear";
	var timer = 0.0;
	var currentFrame = 0;
	var frameTimer = 0;
	this.radius = 40;
	this.x = Math.random() * (screenWidth - this.radius * 2) + this.radius;
	this.y = Math.random() * (screenHeight - this.radius * 2) + this.radius;
	var velX = Math.random() * 5 - 2.5; // -2 to 2
	var velY = Math.random() * 2 - 1; // -1 to 1
	
	var frames = [
		[3,5,89,81],
		[107,4,91,81],
		[216,5,93,81],
		[327,4,91,81],
		[436,4,91,81],
		[542,6,91,80],
		[653,7,93,81],
		[760,8,86,79],
		[5,99,89,84],
		[115,98,89,106],
		[227,98,90,110],
		[355,110,92,80],
		[455,109,93,80],
	];
	
	var move = [
		[0,48,42,5],
		[1,48,42,5],
		[2,50,42,5],
		[3,48,42,5],
		[4,48,42,5],
		[5,48,42,5]
	];
	var prepare = [
		[6,50,42,5],
		[7,44,42,60]
	];
	var attack = [
		[8,45,42,5],
		[9,42,44,5],
		[10,42,44,50]
	];
	var hurt = [
		[11,42,42,5],
		[12,52,42,5]
	];
	
	var anim = move;
	
	
	function updateAnim()
	{
		frameTimer++;
		if (frameTimer >= anim[currentFrame][3])
		{
			frameTimer = 0;
			currentFrame++;
			if (currentFrame >= anim.length) currentFrame = 0;			
		}
	}
	
	this.update = function(gameOver)
	{
		if (this.state == "appear")
		{
			if (gameOver) return;
			updateAnim();
			
			timer += 0.05;
			if (timer >= 1.0)
			{
				this.state = "move";
				currentFrame = 0;
				frameTimer = 0;
				timer = 0;
			}
		}
		else if (this.state == "move")
		{
			if (gameOver) return;
			updateAnim();
			
			this.x += velX;
			this.y += velY;
			if (this.x - this.radius <= 0 || this.x + this.radius >= screenWidth)
			{
				velX *= -1;	
			}
			if (this.y - this.radius <= 0 || this.y + this.radius >= screenHeight)
			{
				velY *= -1;	
			}

			timer++;
			if (timer > 180) // 3 seconds
			{				
				velX = 0;
				velY = 0;
				this.state = "prepare";
				currentFrame = 0;
				frameTimer = 0;
				anim = prepare;
				timer = 0;
			}
		}
		else if (this.state == "prepare")
		{
			if (gameOver) return;
			updateAnim();
			
			timer++;
			if (timer >= 60) // 1 second
			{
				timer = 0;
				this.state = "attack";
				currentFrame = 0;
				frameTimer = 0;
				anim = attack;
				level.GameOver();
				game.sndLevel.pause();
				game.sndRoar.play();
			}
		}
		else if (this.state == "attack")
		{
			updateAnim();
			if (currentFrame == anim.length - 1) // stop at last frame
			{
				frameTimer = 0;
			}
			
			timer++;
			if (timer % 10 < 5)
			{
				this.y++;
			}
			else
			{
				this.y--;
			}
		}
		else if (this.state == "hurt")
		{
			if (gameOver) return;
			updateAnim();
			
			timer++;
			if (timer >= 30) // 0.5 second
			{
				timer = 0;
				this.state = "dead";
				level.removeBoo(this);
			}
		}
	}
	
	this.draw = function()
	{
		var srcX = frames[anim[currentFrame][0]][0];
		var srcY = frames[anim[currentFrame][0]][1];
		var width = frames[anim[currentFrame][0]][2];
		var height = frames[anim[currentFrame][0]][3];
		var offX = anim[currentFrame][1];
		var offY = anim[currentFrame][2];
		
		if (this.state == "appear")
		{
			game.ctx.globalAlpha = timer;
			game.ctx.drawImage(game.imgBoo, srcX, srcY, width, height, this.x - offX, this.y - offY, width, height);
			game.ctx.globalAlpha = 1.0;
		}
		else
		{
			game.ctx.drawImage(game.imgBoo, srcX, srcY, width, height, this.x - offX, this.y - offY, width, height);
		}
	}
	
	
	this.die = function()
	{
		this.state = "hurt";
		anim = hurt;
		currentFrame = 0;
		frameTimer = 0;
		timer = 0;
	}
	
	
}


