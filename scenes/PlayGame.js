class PlayGame extends Phaser.Scene {

	constructor() {
		super("PlayGame");
	}

	create() {

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

		this.input.setDefaultCursor('url(assets/crosshair.cur), auto');

		this.ground = this.add.image(400,300,"ground");

		this.walls = this.physics.add.staticGroup();
		
		this.walls.create(2.5,300,"wallLeftRight");
		this.walls.create(797.5,300,"wallLeftRight");
		this.walls.create(400,2.5,"wallTopBottom");
		this.walls.create(400,597.5,"wallTopBottom");

		this.player = this.physics.add.sprite(400, 300, 'player').setScale(0.3);

		this.physics.add.collider(this.player, this.walls);
		
		this.cursors = this.input.keyboard.addKeys( {
			up:Phaser.Input.Keyboard.KeyCodes.W,
			down:Phaser.Input.Keyboard.KeyCodes.S,
			left:Phaser.Input.Keyboard.KeyCodes.A,
			right:Phaser.Input.Keyboard.KeyCodes.D } );

		this.AliveScore = 0;
		this.AliveText = this.add.text(32,32);

		this.AliveTimer = this.time.addEvent({ delay: 1000, callback: AliveTimerEvent, callbackScope: this, loop: true });

		this.zombies = this.physics.add.group();
		this.zombieTimer = this.time.addEvent({ delay: 1000, callback: spawnZombie, callbackScope: this, loop: true });

		this.physics.add.overlap(this.zombies, this.player, gameOver, null, this);

		function AliveTimerEvent(){
			
			this.AliveScore++;

			if(this.AliveScore == 200){
				gameOver();				
			}

			if(this.AliveScore % 10 == 0){
				this.zombieTimer.reset({ delay: 1000-this.AliveScore*5, callback: spawnZombie, callbackScope: this, loop: true });
			}
		}

		function gameOver(zombie, player){
		
			this.scene.start("GameOver",this.AliveScore);
		}

		function spawnZombie(){

			let x = (Phaser.Math.Between(0, 1) == 0) ? Phaser.Math.Between(30, this.player.x-100) : Phaser.Math.Between(770, this.player.x+100);
			if(x <= 30) x+= Phaser.Math.Between(300,600);
			else if(x >= 770) x-= Phaser.Math.Between(300,600);

			let y = (Phaser.Math.Between(0, 1) == 0) ? Phaser.Math.Between(30, this.player.y-100) : Phaser.Math.Between(570, this.player.y+80);
			if(y <= 30) y+= Phaser.Math.Between(100,400);
			else if(y >= 570) y-= Phaser.Math.Between(100,400);

			let zombie = this.zombies.create(x,y,'zombie').setScale(0.3);
			zombie.speed = Phaser.Math.Between(50,175);
			zombie.setCollideWorldBounds(true);
		}

    		this.bullets = this.physics.add.group({
        		frameQuantity: 30,
			active: false,
			visible: false,
			key: 'bullet'
    		});

		this.lastFired = 0;

		this.physics.add.collider(this.bullets, this.walls, resetBullet, null, this);
		this.physics.add.overlap(this.bullets, this.zombies, killZombie, null, this);

		function resetBullet(bullet,wall){
			bullet.setActive(false);
			bullet.setVisible(false);
			bullet.body.enable = false;
		}

		function killZombie(bullet,zombie){
			bullet.setActive(false);
			bullet.setVisible(false);
			bullet.body.enable = false;
			this.zombies.remove(zombie,this);
		}
	
	}

	update(time, delta) {

		this.AliveText.setText(['Alive:' + this.AliveScore]);

		this.angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.x, this.input.y);
		this.player.rotation = this.angle;

		this.dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.input.x, this.input.y);

		if (this.input.activePointer.isDown) {

			if(this.dist > 50) {

				if(time > this.lastFired) {

					var bullet = this.bullets.getFirstDead(false);

        				if (bullet)
        				{
					
					bullet.body.enable = true;
            				bullet.body.reset(this.player.x + Math.cos(this.angle+0.35) * 36, this.player.y + Math.sin(this.angle+0.35) * 36);
					bullet.rotation = this.angle;
 
					bullet.setActive(true);
					bullet.setVisible(true);
 
					this.physics.moveTo(bullet,this.input.x,this.input.y,600);

					this.lastFired = time + 60;
        				}



				}

			}
		}

        	this.zombies.children.iterate(function (child) {

                	this.angle = Phaser.Math.Angle.Between(child.x, child.y, this.player.x, this.player.y);
                	child.rotation = this.angle;
			this.physics.moveTo(child,this.player.x,this.player.y,child.speed);
        	},this);

		if (this.cursors.left.isDown) {
        		this.player.setVelocityX(-160);
		}

    		else if (this.cursors.right.isDown) {
        		this.player.setVelocityX(160);
		}

    		else {
        		this.player.setVelocityX(0);
    		}

		if (this.cursors.up.isDown) {
        		this.player.setVelocityY(-160);
		}

    		else if (this.cursors.down.isDown) {
        		this.player.setVelocityY(160);
		}

    		else {
        		this.player.setVelocityY(0);
    		}

	}

}