var Wave = function (game){
	this.state=null;
	this.currentWave=null;
	this.amountOfEnemies=null;
	this.typeOfEnemy=null;
	this.wavesCompleted=0;
	this.waveTimer=null;
	this.currentLevelData=null;
	this.TIME_FOR_EACH_WAVE=30000;
	this.enemy=new Enemy(game); //responsible for enemy creation 


	  
};

Wave.prototype={

	preload: function(){},

	create: function(levelData){
		this.enemy.create();
		this.currentLevelData=levelData;
		console.log(this.currentLevelData);
		this.state=game.state.getCurrentState();
		//this.currentLevelData=this.state.level.createLevel(2);
		// game.time.events.add(2500, this.selectWave,this);
		this.waveTimer=game.time.create();  
				

		//this.createWave();
	},

	update: function(){},

	checkState: function(){
		console.log(this.waveTimer.ms/1000);
		if(this.currentWave===null){
			this.selectWave();
			return
		}else if(this.state.enemies.getFirstAlive()===null){
			this.currentLevelData.waves[this.currentWave].complete=true;
			this.wavesCompleted++;
			if(this.wavesCompleted>=this.currentLevelData.numberOfWaves){
				console.log('all waves completed');
				return
			}

			this.selectWave();

		}

		
	},

	selectWave: function(){	
		if(this.currentWave>=this.currentLevelData.numberOfWaves)return

		for(var i=1;i<=this.currentLevelData.numberOfWaves;i++){
			if(!this.currentLevelData.waves[i].complete){
				this.currentWave=i;
				this.amountOfEnemies=this.currentLevelData.waves[i].amount;
				var type=this.currentLevelData.waves[i].type;
				var start=this.currentLevelData.waves[i].start;
				console.log('wave chosen');
			
				for(var e=0;e<this.amountOfEnemies;e++){
					game.time.events.add(1000+(100*e), function(){
						this.enemy.createEnemy(type,start);

					
					

					}, this);

				}
				this.waveTimer.destroy();
				this.waveTimer=game.time.create();  
			
			
				this.waveTimer.add(this.TIME_FOR_EACH_WAVE, this.state.level.wave.selectWave,this);    
	    			 this.waveTimer.start();
				this.currentLevelData.waves[i].complete=true;

				return
			}else{
				console.log(i+' complete');

			}
		}
		console.log('q');

	},

  // addEnemy: function(){
    
  //   for(var i=0;i<10;i++){
  //     game.time.events.add(1000+(100*i), function(){
        
  //       var enemy=game.add.sprite(this.state.start.worldX,this.state.start.worldY,'dude');
  //       enemy.anchor.set(0.5);
  //       game.physics.arcade.enable(enemy);
  //       enemy.body.setSize(1,enemy.height/2,0,20);
  //       enemy.health=3;
  //       enemy.body.allowGravity=false;
  //       this.state.enemies.add(enemy);
        
  //     }, this);
      
  //   }
    
    
  // },
}