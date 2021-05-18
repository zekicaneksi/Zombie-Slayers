class GameOver extends Phaser.Scene {

	constructor(){
		super("GameOver");
	}

	create(scoreParam) {

		this.title = this.add.text(290, 150,"Game Over", {fontSize: 40, color: "red"});
		this.scoreText = this.add.text(290,270,"Alive:" + scoreParam, {fontSize:30, color: "green"});
		
		this.againText = this.add.text(320,365,"Play Again", {fontSize:27, color: "green"});
		this.againButton = this.add.sprite(400,380,"buttonFrame");

		this.menuText = this.add.text(368,445,"Menu", {fontSize:30, color: "green"});
		this.menuButton = this.add.sprite(400,460,"buttonFrame");

		this.againButton.setInteractive();
		this.menuButton.setInteractive();

		let flag = false;

		this.againButton.on('pointerdown', () => { flag = true; });
		this.againButton.on('pointerover', () => { this.againText.setStyle( {color:"blue"} ) });
		this.againButton.on('pointerout', () => { this.againText.setStyle( {color:"green"} ); flag = false; });
		this.againButton.on('pointerup', () => { if(flag==true) this.scene.start("PlayGame"); });

		this.menuButton.on('pointerdown', () => { flag = true; });
		this.menuButton.on('pointerover', () => { this.menuText.setStyle( {color:"blue"} ) });
		this.menuButton.on('pointerout', () => { this.menuText.setStyle( {color:"green"} ); flag = false;  });
		this.menuButton.on('pointerup', () => { if(flag==true) this.scene.start("Menu"); });

		this.input.keyboard.on('keydown-F', () => { 

           		if (this.scale.isFullscreen)
            		{

                		this.scale.stopFullscreen();
            		}
            		else
            		{

                		this.scale.startFullscreen();
            		}

		}, null);

	}

}