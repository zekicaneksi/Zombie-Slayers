class Loading extends Phaser.Scene {

	constructor(){
		super("Loading");
	}

	preload() {
		this.load.image("ground","../assets/ground.png");
		this.load.image("wallLeftRight","../assets/wallLeftRight.png");
		this.load.image("wallTopBottom","../assets/wallTopBottom.png");
		this.load.image("buttonFrame","../assets/buttonFrame.png");
		this.load.image("player","../assets/player.png");
		this.load.image("bullet","../assets/bullet.png");
		this.load.image("zombie","../assets/zombie.png");
	}

	create() {
		this.add.text(20, 20, "Loading game...");
		this.scene.start("Menu");
	}

}