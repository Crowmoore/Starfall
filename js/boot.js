var BasicGame = {
	orientated: false
};

var bootState = {
	
	create: function() {
				
		BasicGame.orientated = true;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = this.game.width / 4;
		this.scale.minHeight = this.game.height / 4;
		this.scale.pageAlignHorizontally = true;

		if (this.game.device.desktop)
		{
			this.scale.maxWidth = this.game.width;
			this.scale.maxHeight = this.game.height;
			this.scale.setScreenSize(true);
			this.scale.refresh();
		}
		else
		{
			this.scale.maxWidth = this.game.width / 3;
			this.scale.maxHeight = this.game.height / 3;
			this.scale.setScreenSize(true);
			this.scale.refresh();
		}
		
		game.state.start('load');
	}
};
