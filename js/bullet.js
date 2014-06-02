var Bullet = function(game){
	this.state=null;


};

Bullet.prototype={

	create: function(tower,enemy){
		this.state=game.state.getCurrentState();
		var bullet=game.add.sprite(tower.x,tower.y,tower.bulletType);
      	bullet.damage=tower.damage;
      	bullet.exploding=tower.exploding;
      	bullet.explosionRadius=tower.explosionRadius;
      	bullet.slowBy=tower.slowBy;
      	bullet.slowDuration=tower.slowDuration;
      	bullet.velocity=tower.bulletVelocity;
      console.log(bullet);
     	 game.physics.arcade.enable(bullet);
      if(bullet.exploding){
        bullet.circle=new Phaser.Circle(bullet.x, bullet.y,bullet.explosionRadius*2);
               
        console.log(bullet.damage);
        game.add.tween(bullet.circle).to( {x:enemy.x}, bullet.velocity, Phaser.Easing.Linear.None,true);
        game.add.tween(bullet.circle).to( {y:enemy.y}, bullet.velocity, Phaser.Easing.Linear.None,true);
        game.add.tween(bullet).to( {x:enemy.x}, bullet.velocity, Phaser.Easing.Linear.None,true);
        game.add.tween(bullet).to( {y:enemy.y}, bullet.velocity, Phaser.Easing.Linear.None,true)
        .onComplete.add(function(){this.explodeRadius(bullet);},this);
              console.log(bullet.radius);
      }else{
        game.physics.arcade.moveToObject(bullet,enemy,bullet.velocity);
      }
           
      bullet.body.outOfBoundsKill=true;
      bullet.body.checkWorldBounds=true;
      bullet.lifespan=1000; 
      
      tower.lastTimeFired=game.time.now;
      this.state.bullets.add(bullet);

	},

	explodeRadius: function(bullet){
    this.state.enemies.forEachAlive(function(enemy){
      if (Phaser.Math.distance(enemy.x, enemy.y, bullet.circle.x, bullet.circle.y) <= bullet.circle.radius) {
        
        enemy.damage(bullet.damage);

        if(!enemy.alive){
          this.state.gold+=enemy.reward;
         this.state.hud.updateGold();
        }else if(bullet.slowBy!==0){
        	this.state.level.wave.enemy.slow(enemy,bullet);

        }
        
      }
      
      
    },this);
    bullet.kill();
  },
};