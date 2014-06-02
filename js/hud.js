var Hud = function (game){

	this.fpsText
	this.enabled=true;
	this.fpsEnabled=false;
	this.healthText;
	this.goldText;
	this.state;

 }

Hud.prototype={



create : function(){
	this.state=game.state.getCurrentState();
if(game.state.current==='game' && this.enabled){
	
	//create life bar
	this.healthText=game.add.text(16,game.height-40,'Life: '+this.state.life,{fontSize:'32px',fill:'#ffffff'});
	this.healthText.alpha=0.5;

	

	this.goldText = game.add.text(game.width/2, 16, 'Gold: '+this.state.gold, { fontSize: '32px', fill: '#ffffff' });
	this.goldText.alpha=0.5;
	this.goldText.anchor.set(0.5);
	//fps
	  game.time.advancedTiming = true;
   		this.fpsText = game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );

}



},

update: function(){
	if(this.enabled){
	//	scoreText.text = 'Score: ' + score; 
	//	healthText.text='Health: ' +game.state.callbackContext.player.sprite.health;
		if (game.time.fps !== 0 && this.fpsEnabled) {
			this.fpsText.setText(game.time.fps + ' FPS');
		}
	}


},

updateLife: function(){
	if(this.enabled){

		var life=this.state.life;
		
		if(life<0){life=0};
		


		this.healthText.text='Life: '+life;
		
	}
},
updateGold: function(){
	if(this.enabled){

		var gold=this.state.gold;
		
		


		this.goldText.text='Gold: '+gold;
		
	}
},
 


};


// Enemy.prototype = Object.create(Phaser.Sprite.prototype);
// Enemy.prototype.constructor = Enemy;

// Enemy.prototype.setWeapon = function(weapon){

//  	this.weapon=new Weapon(weapon);
//  };