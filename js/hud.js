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
	this.TEXT_COLOR='#ffffff';
	this.TEXT_FONT='11px Arial';


 }

Hud.prototype={



create : function(){
	
	this.state=game.state.getCurrentState();
if(game.state.current==='game' && this.enabled){

	//tower Menu
	this.towerMenu=game.add.image(-64,0,'towerMenu');
	this.towerDescriptionMenu=game.add.image(0,game.height+100,'towerDescriptionMenu');
	//Tower text
	this.towerText=game.add.group();

	this.nameText=game.add.text(this.towerDescriptionMenu.width/6,game.height-90,'',{font:this.TEXT_FONT,fill:this.TEXT_COLOR});// "name": "pew pew",
	this.towerText.add(this.nameText);
	

	this.costText=game.add.text(this.towerDescriptionMenu.width/6,game.height-80,'',{font:this.TEXT_FONT,fill:this.TEXT_COLOR});			// "cost":100,	
	this.towerText.add(this.costText);

	this.damageText=game.add.text(this.towerDescriptionMenu.width/6,game.height-70,' ',{font:this.TEXT_FONT,fill:this.TEXT_COLOR});// "damage":1,
	this.towerText.add(this.damageText);
	
	this.rateOfFireText=game.add.text(this.towerDescriptionMenu.width/6,game.height-60,'',{font:this.TEXT_FONT,fill:this.TEXT_COLOR});// "rateOfFire":250,
	this.towerText.add(this.rateOfFireText);


	this.rangeText=game.add.text(this.towerDescriptionMenu.width/6,game.height-50,'',{font:this.TEXT_FONT,fill:this.TEXT_COLOR});// "range":50,
	this.towerText.add(this.rangeText);

	this.slowText=game.add.text(this.towerDescriptionMenu.width/2,game.height-90,'',{font:this.TEXT_FONT,fill:this.TEXT_COLOR});// "slowBy":50,
	this.towerText.add(this.slowText);

	this.slowDuration=game.add.text(this.towerDescriptionMenu.width/2,game.height-80,'',{font:this.TEXT_FONT,fill:this.TEXT_COLOR});// "slowDuration":3,
	this.towerText.add(this.slowDuration);


	this.explosionRadiusText=game.add.text(this.towerDescriptionMenu.width/2,game.height-70,'',{font:this.TEXT_FONT,fill:this.TEXT_COLOR});	// "explosionRadius":0,
	this.towerText.add(this.explosionRadiusText);
	
	 this.towerText.setAll('visible',false);
	
	
	//create life bar
	this.healthText=game.add.text(16,game.height-40,'Life: '+this.state.life,{font:this.TEXT_FONT,fill:this.TEXT_COLOR});


	this.waveTimerText=game.add.text(game.width-100,game.height-40,'Press Start to begin',{font:this.TEXT_FONT,fill:this.TEXT_COLOR});

	this.waveTimerText.anchor.set(0.5);

	

	this.goldText = game.add.text(game.width/2, 16, 'Gold: '+this.state.gold, { font: this.TEXT_FONT, fill: this.TEXT_COLOR });

	this.goldText.anchor.set(0.5);
	//fps
	  game.time.advancedTiming = true;
   		this.fpsText = game.add.text(
        20, 20, '', { font: this.TEXT_FONT, fill:this.TEXT_COLOR }
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

toggleTowerMenu: function(to,kill){
	if(kill){
		for(var child in this.towerMenu.children){
				this.towerMenu.children[child].kill();
			}
	}

	if(to=='off'){
		
		  game.add.tween(this.towerMenu).to( {x:-64}, 200, Phaser.Easing.Linear.None,true);
			
				
	}else{
		if(!this.towerMenu.alive)this.towerMenu.revive();
		game.add.tween(this.towerMenu).to( {x:0}, 200, Phaser.Easing.Linear.None,true);
		
	}
			
			
},
toggleTowerDescriptionMenu: function(to,kill){
	this.towerText.setAll('visible',false);	
	if(kill){
		for(var child in this.towerDescriptionMenu.children){
				this.towerDescriptionMenu.children[child].kill();
			}
	}

	if(to=='off'){

		  game.add.tween(this.towerDescriptionMenu).to( {y:game.height+100}, 200, Phaser.Easing.Linear.None,true);
			
	}else{
		game.add.tween(this.towerDescriptionMenu).to( {y:game.height-100}, 200, Phaser.Easing.Linear.None,true);

		
	}

},


towerShop: function(selectedTile,upgrade){
	this.toggleTowerMenu('on',true);
 	var towerData=this.state.tower.towerData;
	if(upgrade!==true){
		console.log('ton upgrade')
		this.toggleTowerDescriptionMenu('off',true);
	

      
      var i=0;

      for(var type in towerData){

        var tower=game.add.image(this.towerMenu.width/2,20+(i*70),towerData[type].icon);
        tower.anchor.set(0.5);
        tower.type=type;
        tower.tileX=selectedTile.worldX+8;
        tower.tileY=selectedTile.worldY+8;
      
      
        tower.inputEnabled=true;
        tower.events.onInputDown.add(function(tower){this.towerProperties(tower,true)},this);
        this.towerMenu.addChild(tower);
        i++;
       
      }
    }//else if(upgrade==true){
   // 	this.toggleTowerDescriptionMenu('on');

   //    var i=0;

   //    for(var type in towerData){

   //      var tower=game.add.image(this.towerMenu.width/2,20+(i*70),towerData[type].icon);
   //      tower.anchor.set(0.5);
   //      tower.type=type;
   //      tower.tileX=selectedTile.worldX+8;
   //      tower.tileY=selectedTile.worldY+8;
      
      
   //      tower.inputEnabled=true;
   //      tower.events.onInputDown.add(function(tower){this.towerProperties(tower)},this);
   //      this.towerMenu.addChild(tower);
   //      i++;

  	//  }

   //  } 

},
towerProperties: function(tower,buy){
	console.log(tower);
	var towerData
	if(buy!==true){
		this.toggleTowerMenu('off',true);
		this.toggleTowerDescriptionMenu('off',true);

		// if(tower.upgrade>0){
		//   		 towerData=this.state.tower.towerData[tower.type].upgrades;
		//   		 console.log(towerData);
		//   }else{
		//   	 towerData=this.state.tower.towerData[tower.type];
		//   }

		}else{
		console.log(buy);
		this.toggleTowerMenu('on');
		this.toggleTowerDescriptionMenu('off',true);
		
	}
  	 towerData=this.state.tower.towerData[tower.type];
  	this.toggleTowerDescriptionMenu('on',true);
 //  	if(tower.upgrade>0){
 //  		var towerData=this.state.tower.towerData[tower.type].upgrades[tower.upgrade];
 //  	}
	// var towerData=this.state.tower.towerData[tower.type];
	console.log(towerData);
  	


  	if(buy==true){
  		console.log('buy');
  		console.log(buy);

  		var buyButton=game.add.image(game.width-100,0,'buy_button');
  		this.towerDescriptionMenu.addChild(buyButton);
  		buyButton.inputEnabled=true;
  		buyButton.events.onInputDown.add(function(){
  			 if(this.state.gold<towerData.cost)return;
  			
	     var choice={
	        "tileX":tower.tileX,
	        "tileY":tower.tileY,
	        "type":tower.type,

	      }
	      console.log(choice);
	        this.state.gold-=towerData.cost;
	        this.updateGold();
	        this.state.tower.createTower(choice);
	        this.toggleTowerMenu('off',true);
	       	this.toggleTowerDescriptionMenu('off',true);

  		},this);
  	}else if(towerData.upgrades.numberOfUpgrades>0 ){
  			console.log('yolo');
  		
	  			if(tower.upgrade!==towerData.upgrades.numberOfUpgrades){
			  		var upgradeButton=game.add.image(game.width-100,0,'upgradeButton');
			  		this.towerDescriptionMenu.addChild(upgradeButton);
			  		upgradeButton.inputEnabled=true;
			  		upgradeButton.events.onInputDown.add(function(){
			  		
			  			
				    this.state.tower.upgrade(tower);
				      //console.log(choice);
				       
			        this.toggleTowerMenu('off',true);
			       	this.toggleTowerDescriptionMenu('off',true);

			  		},this);
			  	}
			  	if(tower.upgrade>0){
  			 towerData=this.state.tower.towerData[tower.type].upgrades[tower.upgrade];
  			}
  		
  	}

  	var towerIcon=game.add.image(100,this.towerDescriptionMenu.height/2,tower.icon);
  	towerIcon.anchor.set(0.5);
  	
	this.towerDescriptionMenu.addChild(towerIcon);				  	// "icon":"tower1",
	this.towerText.setAll('visible',true);					
	this.nameText.text='Name: '+towerData.name;// "name": "pew pew",
	this.costText.text='Cost: '+towerData.cost;			// "cost":100,	
	this.damageText.text='Damage: '+towerData.damage;// "damage":1,
	if(towerData.explosionRadius>0){
		this.explosionRadiusText.text='Explosion Radius: '+towerData.explosionRadius;	// "explosionRadius":0,
	}else{
		this.explosionRadiusText.text='Explosion Radius: N/A'
	}
	this.rangeText.text='Range: '+towerData.range;// "range":50,
	if(towerData.slowBy>0){
		this.slowText.text='Slow by: '+towerData.slowBy;// "slowBy":50,
		this.slowDuration.text='Slow duration: '+towerData.slowDuration;// "slowDuration":3,
		
	}else{
		this.slowText.text='Slow by: N/A'// "slowBy":50,
		this.slowDuration.text='Slow duration: N/A '// "slowDuration":3,
		
	}
	this.rateOfFireText.text='Rate of fire: '+towerData.rateOfFire;// "rateOfFire":250,
	// "bulletType":"bullet",
	// "bulletVelocity":100,

  	console.log(this.towerMenu);
  	console.log('tower details');
	console.log(tower)

  },

 


};


