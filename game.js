var config = {
	type: Phaser.AUTO,
  	scale: {
		mode: Phaser.Scale.FIT,
		parent: "game",
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600
  	},
	backgroundColor: 0x000000,
        physics: {
            default: 'arcade'
        },
	scene: [Loading, Menu, GameOver, PlayGame]
}

window.onload = function() {
	var game = new Phaser.Game(config);
}