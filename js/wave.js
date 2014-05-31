var Wave = function (game){
	this.state=null;
	this.currentWave=null;
	this.amountOfEnemies=null;
	this.typeOfEnemy=null;
	this.wavesCompleted=0;
	this.waveTimer=null;


	  this.levelData={

  "numberOfWaves":5,
  "waves":{
    1:{
      "type":"dude",
      "amount":10,
    },
    2:{
      "type":"dude",
      "amount":5,
    },
    3:{
      "type":"dude",
      "amount":10,
    },
    4:{
      "type":"dude",
      "amount":20,
    },
    5:{
      "type":"dude",
      "amount":30,
    },
  },  
}

};

Wave.prototype={

	preload: function(){},

	create: function(){
		this.state=game.state.getCurrentState();
		game.time.events.loop(2000, this.checkState,this);
		this.waveTimer=game.time.create();      
	     //
	      this.waveTimer.start();

		//this.createWave();
	},

	update: function(){},

	checkState: function(){
		console.log(this.waveTimer.ms/1000);
		if(this.currentWave===null){
			this.selectWave();
			return
		}else if(this.state.enemies.getFirstAlive()===null){
			this.levelData.waves[this.currentWave].complete=true;
			this.wavesCompleted++;
			if(this.wavesCompleted>=this.levelData.numberOfWaves){
				console.log('all waves completed');
				return
			}

			this.selectWave();

		}

		
	},

	selectWave: function(){
		
		for(var i=1;i<=this.levelData.numberOfWaves;i++){
			if(!this.levelData.waves[i].complete){
				this.currentWave=i;
				this.amountOfEnemies=this.levelData.waves[i].amount;
				this.type=this.levelData.waves[i].type;
				console.log('wave chosen');
				this.waveTimer.destroy();
				this.waveTimer=game.time.create();
				this.waveTimer.start();
				for(var i=0;i<this.amountOfEnemies;i++){
					game.time.events.add(1000+(100*i), function(){

					var enemy=game.add.sprite(this.state.start.worldX,this.state.start.worldY,this.type);
					enemy.anchor.set(0.5);
					game.physics.arcade.enable(enemy);
					enemy.body.setSize(1,enemy.height/2,0,20);
					enemy.health=3;
					enemy.body.allowGravity=false;
					this.state.enemies.add(enemy);
					

					}, this);

				}

				return
			}else{
				console.log('complete');

			}
		}
		console.log('q');

	},

  addEnemy: function(){
    
    for(var i=0;i<10;i++){
      game.time.events.add(1000+(100*i), function(){
        
        var enemy=game.add.sprite(this.state.start.worldX,this.state.start.worldY,'dude');
        enemy.anchor.set(0.5);
        game.physics.arcade.enable(enemy);
        enemy.body.setSize(1,enemy.height/2,0,20);
        enemy.health=3;
        enemy.body.allowGravity=false;
        this.state.enemies.add(enemy);
        
      }, this);
      
    }
    
    
  },
}