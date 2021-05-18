class Menu extends Phaser.Scene {

	constructor() {
		super("Menu");
	}

	create() {

		this.title = this.add.text(230, 150,"ZOMBIE SLAYERS", {fontSize: 40, color: "red"});

		this.soloText = this.add.text(368,285,"SOLO", {fontSize:30, color: "green"});
		this.soloButton = this.add.sprite(400,300,"buttonFrame");
		this.soloButton.setInteractive();

		this.fullScreenText = this.add.text(255,385,"\"F\" for full screen", {fontSize:25, color: "green"});

		let flag = false;		

		this.soloButton.on('pointerdown', () => { flag = true; });
		this.soloButton.on('pointerover', () => { this.soloText.setStyle( {color:"blue"} ) });
		this.soloButton.on('pointerout', () => { this.soloText.setStyle( {color:"green"} ); flag = false;   });
		this.soloButton.on('pointerup', () => { if(flag==true) this.scene.start("PlayGame"); });

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

	update() {

		
	
	}

}