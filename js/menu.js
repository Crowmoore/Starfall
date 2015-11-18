var nextStar = 1000;
var stars;
var click;
var fxEnabled = true;

var menuState = {

	create: function() {
		
		background = game.add.tileSprite(0, 0, 800, 800, 'sky');
		
		var nameLabel = game.add.text(270, 80, 'Starfall', { font: '60px Courier', fill: '#eee'});
		
		musicbutton = game.add.button(game.world.width - 130, 20, 'musicbutton', this.musicToggle, this);
		playbutton = game.add.button(350, 300, 'playbutton', this.start, this);
		soundbutton = game.add.button(game.world.width - 130, 90, 'soundbutton', this.soundToggle, this);
		if(localStorage.getItem('highscore') == null || localStorage.getItem('highscore') == undefined) {
			localStorage.setItem('highscore', 0);
		}
		var highscore = game.add.text(320, 450, 'Highscore:\n' + localStorage.getItem('highscore'), { font: '30px Courier', fill: '#eee'}); 
		
		click = game.add.audio('pickup');
		
		stars = game.add.group();
		stars.enableBody = true;
	},
	
	update: function() {
		this.spawnStar();
		this.updateStars();
		background.tilePosition.y -= 0.1;
		
		if(this.fxEnabled) {	
			soundbutton.loadTexture('soundbutton');
		}
		else {
			soundbutton.loadTexture('soundoffbutton');
		}
		if(!music.mute) {
			musicbutton.loadTexture('musicbutton');
		}
		else {
			musicbutton.loadTexture('musicoffbutton');
		}
	},
	updateStars: function() {
	for(var i = 0; i < stars.children.length; i++) {
		stars.children[i].angle += 1;
		if(stars.children[i].body.position.y > game.camera.y + 600) {
			stars.children[i].destroy();
			}
		}
	},
	soundToggle: function () {
		if(this.fxEnabled) {	
			click.play()
			this.fxEnabled = false;
			soundbutton.loadTexture('soundoffbutton');
		}
		else {
			this.fxEnabled = true;
			soundbutton.loadTexture('soundbutton');
		}		
	},
	start: function() {
		if(this.fxEnabled) {
			click.play()
		}
		game.state.start('play');
	},
	
	musicToggle: function() {
		if(!music.mute) {
			music.mute = true;
			musicbutton.loadTexture('musicoffbutton');
		}
		else {
			musicbutton.loadTexture('musicbutton');
			music.mute = false;
		}
		if(this.fxEnabled) {
			click.play()
		}
	},
	spawnStar: function() {
	if(game.time.now > nextStar) {
		nextStar = game.time.now + 1000;
		var star = stars.create(Math.random() * (760 - 40) + 40, game.camera.y, 'star');
		star.anchor.setTo(0.5);
		star.angle += Math.random() * 360;
		star.body.velocity.y = 75;
		}
	},
};