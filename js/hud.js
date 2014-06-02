var Hud = function (game){

	this.fpsText
	this.enabled=true;
	this.fpsEnabled=false;
	this.healthText;
	this.goldText;
	this.state;
	this.waveTimerText;
	this.towerMenu;
	this.towerIcon=null;

 }

Hud.prototype={



create : function(){
	this.state=game.state.getCurrentState();
if(game.state.current==='game' && this.enabled){

	//tower Menu
	this.towerMenu=game.add.image(-64,0,'towerMenu');
	this.towerDescriptionMenu=game.add.image(0,game.height+100,'towerDescriptionMenu');

	
	
	//create life bar
	this.healthText=game.add.text(16,game.height-40,'Life: '+this.state.life,{fontSize:'32px',fill:'#ffffff'});
	this.healthText.alpha=0.5;

	this.waveTimerText=game.add.text(game.width-100,game.height-40,'Press Start to begin',{font:'16px Arial',fill:'#ffffff'});
	this.waveTimerText.alpha=0.5;
	this.waveTimerText.anchor.set(0.5);

	

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
		if(this.state.level.wave.waveTimer.duration!==0){
			this.waveTimerText.text='Next wave in: \n' + Math.round(this.state.level.wave.waveTimer.duration/1000);
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

toggleTowerMenu: function(to){
	if(to=='off'){
		for(var child in this.towerMenu.children){
				this.towerMenu.children[child].kill();
			}
		  game.add.tween(this.towerMenu).to( {x:-64}, 200, Phaser.Easing.Linear.None,true);
			
				
	}else{
		if(!this.towerMenu.alive)this.towerMenu.revive();
		game.add.tween(this.towerMenu).to( {x:0}, 200, Phaser.Easing.Linear.None,true);
		
	}
			
			
},
toggleTowerDescriptionMenu: function(to){
	if(to=='off'){
		for(var child in this.towerMenu.children){
				this.towerMenu.children[child].kill();
			}

		  game.add.tween(this.towerDescriptionMenu).to( {y:game.height+100}, 200, Phaser.Easing.Linear.None,true);
			
	}else{
		game.add.tween(this.towerDescriptionMenu).to( {y:game.height-100}, 200, Phaser.Easing.Linear.None,true);
		
	}

},
towerProperties: function(tower){
  	this.toggleTowerMenu('on');
  	this.toggleTowerDescriptionMenu('on');
  	var towerIcon=game.add.image(0,0,tower.key);
  	this.towerMenu.addChild(towerIcon);
  	console.log(this.towerMenu);
  	this.towerMenu.removeChild(towerIcon);
  	console.log(this.towerMenu);
  	console.log('tower details');
	console.log(tower)

  },
towerMenu: function(){


},
 


};


