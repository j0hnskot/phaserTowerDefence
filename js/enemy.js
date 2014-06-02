var Enemy = function (game){
	this.state=null;
	this.enemyData={

		"dude":{
			'health':5,
			'reward':5,
			'speed':100,


		},


	}
}

Enemy.prototype={

	create: function(){
		this.state=game.state.getCurrentState();
	},
	createEnemy: function(type,start){

		
		var enemy=game.add.sprite(this.state.level.startTiles[start-1].worldX,this.state.level.startTiles[start-1].worldY,type);
		enemy.anchor.set(0.5);
		game.physics.arcade.enable(enemy);
		enemy.body.setSize(1,enemy.height/2,0,20);
		
		enemy.body.allowGravity=false;
		for (var property in this.enemyData[type]) { enemy[property] = this.enemyData[type][property]; };
		
		enemy.slowedBy=0;
		this.state.enemies.add(enemy);

	},
		
	damaged: function(enemy,bullet){
    
    //if the bullet is explodable let the shoot() get control
    if(bullet.exploding)return;

    //else damage normally
    enemy.damage(bullet.damage);
     if(!enemy.alive){

          this.state.gold+=enemy.reward;
         this.state.hud.updateGold();
        }else if(bullet.slowBy!==0){

        	this.slow(enemy,bullet);
        	
        

        }
    bullet.kill();
  },

  checkSlow: function(){
  	this.state.enemies.forEachAlive(function(enemy){
  		if(enemy.slowedBy!==0){
  			if(enemy.slowStarted+(enemy.slowDuration*1000)<game.time.now){
  				enemy.slowedBy=0;
  				enemy.slowDuration=0;
        		enemy.slowStarted=0;
        		switch(enemy.goingTo){
        			case 'left':
        			enemy.body.velocity.x=-enemy.speed;
        			break;
        			case 'right':
        			enemy.body.velocity.x=enemy.speed;
        			break;
        			case 'up':
        			enemy.body.velocity.y=-enemy.speed;
        			break;
        			case 'down':
        			enemy.body.velocity.y=enemy.speed;
        			break;
        		}
        		console.log(enemy);


  			}

  		}

  	},this)
  },
  slow: function(enemy,bullet){
		var maxSlow=enemy.speed-bullet.slowBy;
			if(enemy.body.velocity.x!==0){
					if(enemy.body.velocity.x<0 ){
						enemy.body.velocity.x=(-(enemy.speed-bullet.slowBy));
					}else{
						enemy.body.velocity.x=enemy.speed-bullet.slowBy;
					}
	        		
	      	}else if(enemy.body.velocity.y!==0){
	      		console.log('else');
	        		if(enemy.body.velocity.y<0){
						enemy.body.velocity.y=(-(enemy.speed-bullet.slowBy));
					}else{
						enemy.body.velocity.y=enemy.speed-bullet.slowBy;
					}
	        	}
	      
        	enemy.slowedBy=bullet.slowBy;
        	enemy.slowDuration=bullet.slowDuration;
        	enemy.slowStarted=game.time.now

  },
  update: function(){
  	this.checkSlow();
  },
};