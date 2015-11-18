var orientationState = {
	create: function () {
	},

	update: function () {
        if (BasicGame.orientated) {
            this.state.start('load');
        }
	}

};