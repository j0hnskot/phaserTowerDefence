var Level = function (game){
	this.state=null;
	this.map=null;
	this.layer=null;

	this.start=null;
	this.finish=null;
	this.LAYER_NAME='Tile Layer 1';
	this.GO_LEFT_TILE=3;
	this.GO_RIGHT_TILE=4;
	this.GO_UP_TILE=11;
	this.GO_DOWN_TILE=2;
	this.START_UP_TILE=10;
	this.START_DOWN_TILE=8;
	this.START_LEFT_TILE=9;
	this.START_RIGHT_TILE=13;
	this.FINISH_TILE=5;
	this.BUILD_TILE=1;
	this.CurrentLevel=null;
	this.startTiles={};
	this.wave=new Wave(game);
	this.level;

	//level data structure guide
	//	1:{	 //this is the number of the level
	//		"numberOfSpawns":2, //each level must include a number of starting positions,at least one
	//		"numberOfWaves":10, //this must represent the amount of waves correctly or not all waves
								//you populated bellow will work

	//		"waves":{ //start wave declaration
	//				1:{	//the number of the wave
	//					"numberOfTypes":2, //this represent the amount of enemies,it works the same way as 'numberOfwaves'
	//					1:{ //first type
	//						"start":2, //the starting position. Be sure that the number is right . 
									   //If the number of spawns is lower than this, the enemy will not spawn at all
	//						"type":"dude", //the type of the enemy,also the key of the sprite used. 
	//						"amount":10,	// the amount of this enemy to be spawned. At least 1.
	//						'spawnRate':100, // how fast the enemy will spawn, at least 1
	//					},//end of type object
	//					2:{ //this is a second type of enemy, can have completelly different values. 
							//Be sure that the number is not higher than 'numberOfTypes' or the enemy will now spawn
	//						"start":1, //the rest work like before.
	//						"type":"dude",
	//						"amount":5,
	//						'spawnRate':600,
	//					},
	//				},//end of wave object
	//
	//		},//end of level object








 	this.levelData={
		"levels":{
			1:{
				"numberOfSpawns":4,
				"numberOfWaves":5,
				"waves":{
					1:{	
						"start":1,
						"type":"dude",
						"amount":1,
						'spawnRate':100,
					},
					2:{	
						"start":2,
						"type":"dude",
						"amount":5,
						'spawnRate':100,
					},
					3:{		
						"start":3,
						"type":"dude",
						"amount":10,
						'spawnRate':100,
					},
					4:{	
						"start":4,
						"type":"dude",
						"amount":20,
						'spawnRate':100,
					},
					5:{	
						"start":1,
						"type":"dude",
						"amount":30,
						'spawnRate':100,
					},
				},
			},
			2:{	
				"numberOfSpawns":2,
				"numberOfWaves":10,
				"waves":{
					1:{	
						"numberOfTypes":2,
						1:{
							"start":2,
							"type":"dude",
							"amount":10,
							'spawnRate':100,
						},
						2:{
							"start":1,
							"type":"dude",
							"amount":5,
							'spawnRate':600,
						},
					},
					2:{
						"numberOfTypes":1,
						1:{
							"start":2,
						"type":"dude",
						"amount":5,
						'spawnRate':100,
						}
						
					},
					3:{
						"numberOfTypes":1,
						1:{"start":1,
						"type":"dude",
						"amount":10,
						'spawnRate':100,}
			},
					4:{
						"numberOfTypes":1,
						1:{"start":1,
						"type":"dude",
						"amount":10,
						'spawnRate':100,},
					},
					5:{
						"numberOfTypes":1,
						1:{"start":1,
						"type":"dude",
						"amount":10,
						'spawnRate':100,},
					},
					6:{
						"numberOfTypes":1,
						1:{"start":1,
						"type":"dude",
						"amount":10,
						'spawnRate':100,},
					},
					7:{
						"numberOfTypes":1,
						1:{"start":1,
						"type":"dude",
						"amount":10,
						'spawnRate':100,},
					},
					8:{
						"numberOfTypes":1,
						1:{"start":1,
						"type":"dude",
						"amount":10,
						'spawnRate':100,},
					},
					9:{
						"numberOfTypes":1,
						1:{"start":1,
						"type":"dude",
						"amount":10,
						'spawnRate':100,},
					},
					10:{
						"numberOfTypes":1,
						1:{"start":1,
						"type":"dude",
						"amount":10,
						'spawnRate':100,},
					},
				},
			},
			3:{},	
		}
	}
}

Level.prototype={

	create: function(number){
			
			this.CurrentLevel=number;
			
			this.state=game.state.getCurrentState();
			
			this.map = game.add.tilemap('map'+this.CurrentLevel);
		    this.map.addTilesetImage('spritesheet');
		    
		    this.layer= this.map.createLayer(this.LAYER_NAME);
		    this.layer.resizeWorld();
		    console.log(this.map);
		 

		   
		  
		    this.map.setTileIndexCallback([this.GO_LEFT_TILE,this.GO_RIGHT_TILE,
		    								this.GO_UP_TILE,this.GO_DOWN_TILE,
		    								this.FINISH_TILE,this.START_LEFT_TILE,
		    								this.START_RIGHT_TILE,this.START_UP_TILE,
		    								this.START_DOWN_TILE],
		    								 this.state.tileProperties, this.state);


			this.levelData=this.createLevel();
			console.log(this.startTiles);
			this.wave.create(this.levelData);
			
	},

	createLevel: function(){
		this.level=this.levelData.levels[this.CurrentLevel];
		var	left=0;
		var right=0;
		var down=0;
		var up=0;
		    for(var i=0;i<this.level.numberOfSpawns;i++){
		    	var start;
		    	if((start=this.map.searchTileIndex(this.START_RIGHT_TILE,right))!==null){
		    		console.log(start);
		    		right++;
		    		this.startTiles[i]={
		    			'worldX':start.worldX,
		    			'worldY': start.worldY,
		    		};
		    		console.log(i);

		    	}else if((start=this.map.searchTileIndex(this.START_LEFT_TILE,left))!==null){
		    		console.log(start);
		    		left++;
		    		this.startTiles[i]={
		    			'worldX':start.worldX,
		    			'worldY': start.worldY,
		    		};
		    		console.log(i);
		    	}else if((start=this.map.searchTileIndex(this.START_UP_TILE,up))!==null){
		    		console.log(start);
		    		up++;
		    		this.startTiles[i]={
		    			'worldX':start.worldX,
		    			'worldY': start.worldY,
		    		};
		    		console.log(i);
		    	}else if((start=this.map.searchTileIndex(this.START_DOWN_TILE,down))!==null){
		    		console.log(start);
		    		down++;
		    		this.startTiles[i]={
		    			'worldX':start.worldX,
		    			'worldY': start.worldY,
		    		};
		    		console.log(i);
		    	}
		    }	
		return this.level;

	},
		


};