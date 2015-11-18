var player;
var background;
var texts;
var ground;
var shootingStars;
var nextShooting = 10000;
var stars;
var nextStar = 300;
var score;
var scoreText;
var howTo;
var floating;
var pointsPerStar;
var pickup;
var snow;
var failed;
var playState = {

create: function() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    background = game.add.tileSprite(0, 0, 800, 800, 'sky');	
	
	ground = game.add.sprite(0, game.world.height + 100, 'ground');
	game.physics.arcade.enable(ground);
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;	
	
	snow = game.add.sprite(0, game.world.height - 100, 'snow');
   
	player = game.add.sprite(game.world.width / 2, game.world.height, 'dude');
	player.anchor.set(0.5);

	failed = false;
	
	score = 0;
	pointsPerStar = 10;
	
	pickup = game.add.audio('pickup');
	
	stars = game.add.group();
	stars.enableBody = true;

	shootingStars = game.add.group();
	shootingStars.enableBody = true;
	
	texts = game.add.group();
	
    game.physics.arcade.enable(player);

    player.body.gravity.y = 550;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    scoreText = game.add.text(16, 20, 'score: 0', { fontSize: '32px', fill: '#eee' });
	scoreText.fixedToCamera = true;
	
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	
    game.input.mouse.capture = true;
	
	howTo = game.add.text(game.world.width - 550, game.world.height - 200, "Jump as high as you can!\nRed stars double the points\ngiven by yellow stars.\nOh! Click to take the first jump!", { fontSize: '16px', fill: '#eee' });
},

update: function() {
	
	this.spawnStar();
	this.updateStars();
	if(!failed) {
		this.spawnShootingStar();
		this.scrollBackground();	
		this.updateMultipliers();

		game.camera.focusOnXY(player.x, player.y - 100);
		background.position.y = game.camera.y;
		game.physics.arcade.collide(player, ground);
		game.world.setBounds(0, -player.yChange, game.world.width, game.world.height);
		
		game.physics.arcade.overlap(player, stars, this.collectStar, null, this);
		game.physics.arcade.overlap(player, shootingStars, this.collectMultiplier, null, this);
		
		player.body.velocity.x = 0;
		scoreText.position.y = player.body.y - 250;
		
		this.checkPlayerInput();
		
		if (player.body.velocity.y > 1000) {
			failed = true;
			this.playerFailed();
		}
		if(texts.children.length != 0) {
			this.fadeText();
		}
	}
},
playerFailed: function() {
	failText = game.add.text(350, 300, 'That\'s it!', { fontSize: '32px', fill: '#eee' });
	failText.fixedToCamera = true;
	failText.alpha = 0;
	game.add.tween(failText).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true);
	if(score > localStorage.getItem('highscore')) {
		localStorage.setItem('highscore', score);
		newHighscore = game.add.text(280, game.camera.y + 400, 'New highscore: ' + score, { fontSize: '32px', fill: '#eee' });
		newHighscore.alpha = 0;
		game.add.tween(newHighscore).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true);
	}
	restartbutton = game.add.button(350, game.camera.y + 450, 'restartbutton', this.backToMenu, this);
},
checkPlayerInput: function() {
	if(player.x < game.input.x - 20) {
			player.body.velocity.x += 550;
			player.animations.play('right')
		}
		else if(player.x > game.input.x + 20) {
			player.body.velocity.x -= 550;
			player.animations.play('left');
		}
		else
		{
			player.body.velocity.x = 0;
			player.animations.stop();
			player.frame = 4;
		}
		if(player.body.velocity.y < 0) {
			game.add.tween(howTo).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
		}
		if (game.input.activePointer.isDown && player.body.touching.down)
		{
			this.jump(player);		
		}
},
backToMenu: function() {
	game.state.start('menu');
},
updateStars: function() {
	for(var i = 0; i < stars.children.length; i++) {
		stars.children[i].angle += 1;
		if(stars.children[i].body.position.y > game.camera.y + 600) {
			stars.children[i].destroy();
		}
	}
},
updateMultipliers: function() {
	for(var i = 0; i < shootingStars.children.length; i++) {
		shootingStars.children[i].angle += 1;
		if(shootingStars.children[i].body.position.x > game.world.width + 40) {
			shootingStars.children[i].destroy();
		}
	}
},
spawnShootingStar: function() {
	if(game.time.now > nextShooting) {
		nextShooting = game.time.now + 10000;
		var star = shootingStars.create(0, game.camera.y + 40, 'star');
		star.anchor.setTo(0.5);	
		star.tint = 0xff00ff;
		star.body.velocity.x = 75;
	}
},

spawnStar: function() {
	if(game.time.now > nextStar) {
		nextStar = game.time.now + 300;
		var star = stars.create(Math.random() * (760 - 40) + 40, game.camera.y, 'star');
		star.anchor.setTo(0.5);
		star.angle += Math.random() * 360;
		star.body.velocity.y = 75;
	}
},
scrollBackground: function() {
		background.tilePosition.y -= player.body.velocity.y / 100;
},
jump: function(player) {
	player.body.velocity.y = -500;
},

collectStar: function(player, star) {
    this.jump(player);
	var text = game.add.text(0, 0, pointsPerStar, { fontSize: '16px', fill: '#eee' });
	text.position.x = star.body.x;
	text.position.y = star.body.y;
	texts.add(text);
    star.destroy();
	if(game.state.states['menu'].fxEnabled) {
		pickup.play();
	}

    score += pointsPerStar;
    scoreText.text = 'Score: ' + score;
},
collectMultiplier: function(player, shooting) {
	this.jump(player);
	var text = game.add.text(0, 0, '2X', { fontSize: '16px', fill: '#eee' });
	text.position.x = shooting.body.x;
	text.position.y = shooting.body.y;
	texts.add(text);
    shooting.destroy();
	if(game.state.states['menu'].fxEnabled) {
		pickup.play();
	}
    pointsPerStar *= 2;
},
fadeText: function() {
	for (var i = 0; i < texts.children.length; i++) {
		game.add.tween(texts.children[i]).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
		if(texts.children[i].position.y > game.camera.y + 600) {
			texts.children[i].destroy();
		}
	}
}
};