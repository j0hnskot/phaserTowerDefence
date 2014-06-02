var Level = function (game){
	this.state=null;
	this.map=null;
  this.layer=null;

  this.start=null;
  this.finish=null;
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
					},
					2:{	
						"start":2,
						"type":"dude",
						"amount":5,
					},
					3:{		
						"start":3,
						"type":"dude",
						"amount":10,
					},
					4:{	
						"start":4,
						"type":"dude",
						"amount":20,
					},
					5:{	
						"start":1,
						"type":"dude",
						"amount":30,
					},
				},
			},
			2:{	
				"numberOfSpawns":2,
				"numberOfWaves":10,
				"waves":{
					1:{	
						"start":1,
						"type":"dude",
						"amount":10,
					},
					2:{
						"start":2,
						"type":"dude",
						"amount":5,
					},
					3:{
						"start":1,
						"type":"dude",
						"amount":10,
					},
					4:{
						"start":2,
						"type":"dude",
						"amount":20,
					},
					5:{
						"start":1,
						"type":"dude",
						"amount":30,
					},
					6:{
						"start":2,
						"type":"dude",
						"amount":10,
					},
					7:{
						"start":1,
						"type":"dude",
						"amount":5,
					},
					8:{
						"start":2,
						"type":"dude",
						"amount":10,
					},
					9:{
						"start":1,
						"type":"dude",
						"amount":20,
					},
					10:{
						"start":2,
						"type":"dude",
						"amount":30,
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
		    
		    this.layer= this.map.createLayer('Tile Layer 1');
		    this.layer.resizeWorld();
		    console.log(this.map);
		    //this.start=this.map.searchTileIndex(this.START_RIGHT_TILE,0, false,this.layer2);

		   
		  
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