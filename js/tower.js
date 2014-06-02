var Tower= function(game){
	this.state=null;
	this.bullet=new Bullet(game);
	this.towerData={

		"type1":{
			"icon":"tower1",
			"key":"tower1",
			"name": "pew pew",
			"cost":100,
			"damage":1,
			"exploding":false,
			"explosionRadius":0,
			"range":50,
			"slowBy":50,
			"slowDuration":3,
			"rateOfFire":250,
			"bulletType":"bullet",
			"bulletVelocity":100,
     
      "upgrades":{
         "numberOfUpgrades":2,
          1:{
           
            "icon":"tower1",
            "key":"tower1",
            "name": "pew pew",
            "cost":10,
            "damage":2,
            "exploding":false,
            "explosionRadius":0,
            "range":70,
            "slowBy":60,
            "slowDuration":3,
            "rateOfFire":250,
            "bulletType":"bullet",
            "bulletVelocity":100,
          },
          2:{
           
            "icon":"tower1",
            "key":"tower1",
            "name": "pew pew",
            "cost":100,
            "damage":3,
            "exploding":false,
            "explosionRadius":0,
            "range":100,
            "slowBy":50,
            "slowDuration":3,
            "rateOfFire":250,
            "bulletType":"bullet",
            "bulletVelocity":100,
           },
          3:{
            
           "icon":"tower1",
            "key":"tower1",
            "name": "pew pew",
            "cost":200,
            "damage":5,
            "exploding":false,
            "explosionRadius":0,
            "range":120,
            "slowBy":50,
            "slowDuration":3,
            "rateOfFire":250,
            "bulletType":"bullet",
            "bulletVelocity":100,
          },
      },
		},
		"type2":{
			"icon":"tower2",
			"key":"tower2",
			"name": "boom boom",
			"cost":100,
			"damage":1,
			"exploding":true,
			"explosionRadius":15,
			"range":25,
			"slowBy":20,
			"slowDuration":5,
			"rateOfFire":1000,
			"bulletType":"bullet",
			"bulletVelocity":100,
       "numberOfUpgrades":0,
		},
		"type3":{
			"icon":"tower2",
			"key":"tower2",
			"name": "boom boom",
			"cost":100,
			"damage":5,
			"exploding":true,
			"explosionRadius":15,
			"range":50,
			"slowBy":0,
			"slowDuration":0,
			"rateOfFire":300,
			"bulletType":"bullet",
			"bulletVelocity":100,
       "numberOfUpgrades":0,
		},


	}
};

Tower.prototype={

	create: function(){
		this.state=game.state.getCurrentState();
	},

	createTower: function(choice){
    var selectedTower=this.towerData[choice['type']];
    console.log(choice);
    var tower=game.add.sprite(choice.tileX, choice.tileY,selectedTower.key);
    tower.anchor.set(0.5);

  	for (var property in selectedTower) { tower[property] = selectedTower[property]; };
  	

  
    
    var circle = new Phaser.Circle(tower.x, tower.y,selectedTower.range*2);
    console.log(circle.diameter);
    tower.circle=circle;
    tower.lastTimeFired=0;
    tower.upgrade=0;
    tower.type=choice.type;
    tower.inputEnabled=true;
    tower.events.onInputDown.add(function(tower){this.state.hud.towerProperties(tower)},this);
        
    this.state.towers.add(tower);
    var selectedTile=this.state.level.map.getTileWorldXY(choice.tileX, choice.tileY);
    selectedTile.hasTower=true;
    if (this.state.choiceMenu!==null){
        this.state.choiceMenu.kill();
        this.state.choiceMenu=null;
      }
    
    //type.kill();
    //selectedTile.hasTower=true;
    
    
  },

  

    checkRadius: function(){
      //checks if an enemy is near the firing range of a tower

      this.state.towers.forEachAlive(function(tower){

      this.state.enemies.forEachAlive(function(enemy){

      if (Phaser.Math.distance(enemy.x, enemy.y, tower.circle.x, tower.circle.y) <= tower.circle.radius) {
      //	console.log(Phaser.Math.distance(enemy.x, enemy.y, tower.circle.x, tower.circle.y));
       this.shoot(tower,enemy);
      }

      },this);

      },this);

    
  },
  upgrade: function(tower){
    var currentTowerData=this.towerData[tower.type].upgrades[tower.upgrade+1];
    if(this.state.gold<currentTowerData.cost)return;
    this.state.gold-=currentTowerData.cost;
    this.state.hud.updateGold();
   
    tower.upgrade++;
     console.log( tower.circle);
   for (var property in currentTowerData) { tower[property] = currentTowerData[property]; }
    console.log(currentTowerData);
   tower.circle.radius=tower.range;
  },

  shoot: function(tower,enemy){
    
    if (tower.lastTimeFired < game.time.now - 250) {
       var bullet=this.bullet.create(tower,enemy);
      // 	bullet.damage=tower.damage;
      
      // game.physics.arcade.enable(bullet);
      // if(tower.exploding){
      //   var radius=new Phaser.Circle(bullet.x, bullet.y,tower.explosionRadius*2);
      //   bullet.circle=radius;
      //   bullet.exploding=true;
        
      //   console.log(bullet.damage);
      //   game.add.tween(bullet.circle).to( {x:enemy.x}, 100, Phaser.Easing.Linear.None,true);
      //   game.add.tween(bullet.circle).to( {y:enemy.y}, 100, Phaser.Easing.Linear.None,true);
      //   game.add.tween(bullet).to( {x:enemy.x}, 100, Phaser.Easing.Linear.None,true);
      //   game.add.tween(bullet).to( {y:enemy.y}, 100, Phaser.Easing.Linear.None,true)
      //   .onComplete.add(function(){this.explodeRadius(bullet);},this);
              
      // }else{
      //   game.physics.arcade.moveToObject(bullet,enemy,300);
      // }
           
      // bullet.body.outOfBoundsKill=true;
      // bullet.body.checkWorldBounds=true;
      // bullet.lifespan=1000; 
      
      // tower.lastTimeFired=game.time.now;
      // this.state.bullets.add(bullet);
     } 
    

    },

  //   explodeRadius: function(bullet){
  //   this.state.enemies.forEachAlive(function(enemy){
  //     if (Phaser.Math.distance(enemy.x, enemy.y, bullet.circle.x, bullet.circle.y) <= bullet.circle.diameter) {
        
  //       enemy.damage(bullet.damage);
  //       if(!enemy.alive){
  //         this.gold++;
  //        this.state.hud.updateGold();
  //       }
        
  //     }
      
      
  //   },this);
  //   bullet.kill();
  // },

};