var game_state=function(game){
  this.goingTo=[];
  this.player=null;
  this.reachedDestination=false;
  this.q=0;
  this.circle=null;
  this.towers=null;
  this.bullets=null;
  this.enemies=null;
  this.life=50;
  this.gold=5500;
  this.cursors=null;
  this.tower=new Tower(game);
this.hud=new Hud(game);

  this.level=new Level(game); //where the tilemap and wave creation takes place
  
  

  this.choiceMenu=null; //the choice menu panel appearing when clicking a buildable spot. 



};

game_state.prototype={
  
  preload: function(){  
    game.scale.setShowAll();
      game.scale.forceLandScape=true;
       game.scale.setScreenSize();
    game.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map2', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map3', 'assets/maps/map3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('spritesheet','assets/spritesheet.png');
    game.load.image('tower1','assets/tower1.png');
    game.load.image('tower2','assets/tower2.png');
    game.load.image('bullet','assets/bullet.png');
    game.load.image('menu','assets/menu.png');
    game.load.image('nextWaveButton','assets/nextWaveButton.png');
    game.load.spritesheet('dude', 'assets/dude.png', 10, 16,9);
    game.load.image('buy_button','assets/buy_button.png')
    
    
    
  },
  
  create: function(){
    //create the level
     this.level.create(2);
     this.tower.create();
     console.log(this.start);
    
  //create the groups to hold towers,bullets,enemies
    this.towers=game.add.group();
    this.bullets=game.add.group();
    this.enemies=game.add.group();
   
    //create next wave button
    this.nextWaveButton=game.add.sprite(game.width-64,game.height/2,'nextWaveButton');
    this.nextWaveButton.inputEnabled=true;
    this.nextWaveButton.events.onInputDown.add(this.level.wave.selectWave,this.level.wave);

   
    //this.cursors = game.input.keyboard.createCursorKeys();
    
    game.input.onDown.add(this.createCircle,this);
    this.hud.create();
    this.hud.fpsEnabled=false;
    
  },
  
  update: function(){
    //check if an enemy is near a tower
    this.level.wave.enemy.update();
    this.tower.checkRadius();
    this.hud.update();
    
    //enable enemy-to-layer overlaping to check in which tile the enemy is
    game.physics.arcade.overlap(this.enemies, this.level.layer);

    //enable overlaping between bullets and enemies 
    game.physics.arcade.overlap(this.enemies, this.bullets,this.level.wave.enemy.damaged,null,this.level.wave.enemy);
    
  },
  
  damaged: function(enemy,bullet){
    
    //if the bullet is explodable let the shoot() get control
    if(bullet.exploding)return;

    //else damage normally
    enemy.damage(1);
     if(!enemy.alive){
          this.gold++;
         this.hud.updateGold();
        }
    bullet.kill();
  },
  
  
  render: function(){
    
    // this.bullets.forEachAlive(this.renderGeom,this);
    // this.enemies.forEachAlive(this.renderBody,this);
     this.towers.forEachAlive(this.renderGeom,this);
    //this.game.debug.body(this.player.sprite);
    
  },
  renderGeom: function (obj){
    game.debug.geom(obj.circle,'#cfffff',false);
    //this.game.debug.body(obj);
  },
  
  renderBody: function (obj){
    game.debug.body(obj);
    //this.game.debug.body(obj);
  },
  
  tileProperties: function(enemy,tile){

    
    //console.log(destination);
    enemy.body.velocity.x=0;
    enemy.body.velocity.y=0;
   

      switch(tile.index){
        case this.level.GO_LEFT_TILE :
        case this.level.START_LEFT_TILE :
          enemy.body.offset.x=8;
          enemy.body.offset.y=0;
          enemy.goingTo='left';
          enemy.body.velocity.x=-(enemy.speed-enemy.slowedBy);
          break;
          
        case this.level.GO_RIGHT_TILE :
        case this.level.START_RIGHT_TILE:
        
          enemy.body.offset.x=-8;
          enemy.body.offset.y=0;
          enemy.goingTo='right';
          enemy.body.velocity.x=enemy.speed-enemy.slowedBy;
          break;
          
        case this.level.GO_UP_TILE:
        case this.level.START_UP_TILE:
          enemy.body.offset.y=8;
          enemy.body.offset.x=0;
          enemy.goingTo='up';
          enemy.body.velocity.y=-(enemy.speed-enemy.slowedBy);
          break;
          
        case this.level.GO_DOWN_TILE:
        case this.level.START_DOWN_TILE:
          enemy.body.offset.y=-8;
          enemy.body.offset.x=0;
          enemy.goingTo='down';
          enemy.body.velocity.y=enemy.speed-enemy.slowedBy;
          break;
         
        case this.level.FINISH_TILE:
            enemy.kill();
            this.life--;
            this.hud.updateLife();
            break; 


          
          
      }
    // }
    
  },
  
  createCircle: function(){
    var selectedTile=this.level.map.getTileWorldXY(game.input.activePointer.x, game.input.activePointer.y);
    
    //console.log(selectedTile);
   
    if(selectedTile.index==this.level.BUILD_TILE && !selectedTile.hasTower){
      //this.hud.towerMenu.visible=true;
      
      this.hud.towerShop(selectedTile);
      console.log('no tower');
      //this.hud.toggleTowerMenu('on');
      // var choice={};
    

      // var towerData=this.tower.towerData;
      // var i=0;

      // for(var type in towerData){

      //   var tower=game.add.sprite(this.hud.towerMenu.width/2,20+(i*70),towerData[type].icon);
      //   tower.anchor.set(0.5);
      //   tower.type=type;
      //   tower.inputEnabled=true;
      //   tower.events.onInputDown.add(toCreateTower,this);
      //   this.hud.towerMenu.addChild(tower);
      //   i++;
       
      // }
          
      // function toCreateTower(sprite){
      //   if(this.gold<towerData[sprite.type].cost)return;
      //   choice={
      //   "tileX":selectedTile.worldX+8,
      //   "tileY":selectedTile.worldY+8,
      //   "type":sprite.type,
      // }
      //   this.gold-=towerData[choice.type].cost;
      //   this.hud.updateGold();
      //   this.tower.createTower(choice);
        
    
      // }
    
    }else  if(selectedTile.index!==this.level.BUILD_TILE && !selectedTile.hasTower){
       this.hud.toggleTowerMenu('off');
       this.hud.toggleTowerDescriptionMenu('off');
    }
  },
  
  // createTower: function(type){
  //   console.log(type.key);
  //   var tower=game.add.sprite(type.tileX, type.tileY,type.key);
  //   tower.anchor.set(0.5);
  //   if(type.key=='tower2'){tower.exploding=true;}
    
  //   var circle = new Phaser.Circle(tower.x, tower.y,64);
  //   tower.circle=circle;
  //   tower.lastTimeFired=0;
  //   this.towers.add(tower);
  //   var selectedTile=this.level.map.getTileWorldXY(type.tileX, type.tileY);
  //   selectedTile.hasTower=true;
    
    
    
    
  // },
};