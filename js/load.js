
var loadState = {
	
	preload: function() {
		
		var loadingLabel = game.add.text(80, 150, 'Loading...', { font: '30px Courier', fill: '#eee'});
		
		game.load.image('sky', 'starfall/assets/starfield.png');
		game.load.image('ground', 'starfall/assets/platform.png');
		game.load.image('star', 'starfall/assets/star.png');
		game.load.image('snow', 'starfall/assets/ground.png');
		game.load.image('restartbutton', 'starfall/assets/restartbutton.png');
		game.load.image('musicbutton', 'starfall/assets/musicbutton.png');
		game.load.image('musicoffbutton', 'starfall/assets/musicoffbutton.png');
		game.load.image('soundbutton', 'starfall/assets/soundbutton.png');
		game.load.image('soundoffbutton', 'starfall/assets/soundoffbutton.png');
		game.load.image('playbutton', 'starfall/assets/playbutton.png');
		game.load.spritesheet('dude', 'starfall/assets/dude.png', 32, 48);
		game.load.audio('music', 'starfall/assets/Daily Beetle.mp3');
		game.load.audio('pickup', 'starfall/assets/pickup.wav');
	},
	
	create: function() {
		music = game.add.audio('music');
		music.loop = true;
		music.play();
		game.state.start('menu');
	}
};