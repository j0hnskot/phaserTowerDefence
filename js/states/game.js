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
  this.gold=100;
  this.cursors=null;
  this.tower=new Tower(game);
this.hud=new Hud(game);

  this.level=new Level(game); //where the tilemap and wave creation takes place
  
  

  this.choiceMenu=null; //the choice menu panel appearing when clicking a buildable spot. 



};

game_state.prototype={
  
  preload: function(){  
    game.scale.setShowAll();
    game.scale.setScreenSize();
    game.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map2', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('spritesheet','assets/spritesheet.png');
    game.load.image('tower1','assets/tower1.png');
    game.load.image('tower2','assets/tower2.png');
    game.load.image('bullet','assets/bullet.png');
    game.load.image('menu','assets/menu.png');
    game.load.image('nextWaveButton','assets/nextWaveButton.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    
    
    
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
    this.hud.fpsEnabled=true;
    
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
  
  // checkRadius: function(){
  //   //checks if an enemy is near the firing range of a tower
    
  //   this.towers.forEachAlive(function(tower){
      
  //     this.enemies.forEachAlive(function(enemy){
     
  //       if (Phaser.Math.distance(enemy.x, enemy.y, tower.circle.x, tower.circle.y) <= 64) {
  //         this.shoot(tower,enemy);
  //       }
        
  //     },this);
      
  //   },this);
    
    
  // },
  
  // explodeRadius: function(bullet){
  //   this.enemies.forEachAlive(function(enemy){
  //     if (Phaser.Math.distance(enemy.x, enemy.y, bullet.circle.x, bullet.circle.y) <= 30) {
        
  //       enemy.damage(1);
  //       if(!enemy.alive){
  //         this.gold++;
  //        this.hud.updateGold();
  //       }
        
  //     }
      
      
  //   },this);
  //   bullet.kill();
  // },
  
  render: function(){
    
    this.bullets.forEachAlive(this.renderGeom,this);
    this.enemies.forEachAlive(this.renderBody,this);
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
    // if(this.level.finish.worldX==tile.worldX && this.level.finish.worldY==tile.worldY){
    //   enemy.kill();
    //   this.life--;
  
    // }else{

      switch(tile.index){
        case this.level.GO_LEFT_TILE :
        case this.level.START_LEFT_TILE :
          enemy.body.offset.x=10;
          enemy.body.offset.y=0;
          enemy.goingTo='left';
          enemy.body.velocity.x=-(enemy.speed-enemy.slowedBy);
          break;
          
        case this.level.GO_RIGHT_TILE :
        case this.level.START_RIGHT_TILE:
        
          enemy.body.offset.x=-10;
          enemy.body.offset.y=0;
          enemy.goingTo='right';
          enemy.body.velocity.x=enemy.speed-enemy.slowedBy;
          break;
          
        case this.level.GO_UP_TILE:
        case this.level.START_UP_TILE:
          enemy.body.offset.y=32;
          enemy.body.offset.x=0;
          enemy.goingTo='up';
          enemy.body.velocity.y=-(enemy.speed-enemy.slowedBy);
          break;
          
        case this.level.GO_DOWN_TILE:
        case this.level.START_DOWN_TILE:
          enemy.body.offset.y=-10;
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
  
  
  // shoot: function(tower,enemy){
    
  //   if (tower.lastTimeFired < game.time.now - 250) {
  //      var bullet=game.add.sprite(tower.x,tower.y,'bullet');
      
      
  //     game.physics.arcade.enable(bullet);
  //     if(tower.exploding){
  //       var radius=new Phaser.Circle(bullet.x, bullet.y,80);
  //       bullet.circle=radius;
        
  //       game.add.tween(bullet.circle).to( {x:enemy.x}, 100, Phaser.Easing.Linear.None,true);
  //       game.add.tween(bullet.circle).to( {y:enemy.y}, 100, Phaser.Easing.Linear.None,true);
  //       game.add.tween(bullet).to( {x:enemy.x}, 100, Phaser.Easing.Linear.None,true);
  //       game.add.tween(bullet).to( {y:enemy.y}, 100, Phaser.Easing.Linear.None,true)
  //       .onComplete.add(function(){this.explodeRadius(bullet);},this);
        
        
        
        
  //     }else{
  //       game.physics.arcade.moveToObject(bullet,enemy,300);
  //     }
      
      
      
      
      
  //     bullet.body.outOfBoundsKill=true;
  //     bullet.body.checkWorldBounds=true;
  //     bullet.lifespan=500; 
      
  //     tower.lastTimeFired=game.time.now;
  //     this.bullets.add(bullet);
      
  //   }
    
    
    
    
  //   //for(var i=1;i<=enemy.mountPoints.ammount;i++){
  //   //currentPoint=enemy.mountPoints['point'+i];  
  //   //if(this.state.enemy_bullets.getFirstDead()){
    
  //   //bullet=this.state.enemy_bullets.getFirstDead();
  //   //bullet.resetProperties(enemy.x+(currentPoint.x),enemy.y+currentPoint.y+59,enemy.weapon,'enemy');
  //   //}else{
  //   //bullet=new Bullet(game,enemy.x+currentPoint.x,enemy.y+currentPoint.y+59,enemy.weapon,'enemy')
  //   //}
  //   //}
    
    
    
    
  //   //var bullet=new Bullet(game,enemy.x,enemy.y+59,enemy.weapon,'enemy')
  //   //enemy.lastTimeFired=game.time.now;
    
  //   // }
    
    
  // },
  
  
  createCircle: function(){
    var selectedTile=this.level.map.getTileWorldXY(game.input.activePointer.x, game.input.activePointer.y);
    //console.log(selectedTile);
    if (this.choiceMenu!==null){
        this.choiceMenu.kill();
        this.choiceMenu=null;
      }
    if(selectedTile.index==this.level.BUILD_TILE && !selectedTile.hasTower){
    
      var choice={};
      this.choiceMenu=game.add.sprite(selectedTile.worldX, selectedTile.worldY-20,'menu');
      this.choiceMenu.anchor.x=0.5;

      var towerData=this.tower.towerData;
      var i=0;

      for(var type in towerData){

        var tower=game.add.sprite(-40+(32*i),0,towerData[type].key);
        tower.type=type;
        tower.inputEnabled=true;
        tower.events.onInputDown.add(toCreateTower,this);
        this.choiceMenu.addChild(tower);
        i++;
       
      }
      // var choiceOne=game.add.sprite(-40,0,'tower1');
      // choiceOne.tileX=selectedTile.worldX+16;
      // choiceOne.tileY=selectedTile.worldY+16;

      // this.choiceMenu.addChild(choiceOne);
      // choiceOne.inputEnabled=true;
      // choiceOne.events.onInputDown.add(toCreateTower,this);
      
      
      // var choiceTwo=game.add.sprite(10,0,'tower2');
      // choiceTwo.tileX=selectedTile.worldX+16;
      // choiceTwo.tileY=selectedTile.worldY+16;
      // this.choiceMenu.addChild(choiceTwo);
      // choiceTwo.inputEnabled=true;
      // choiceTwo.events.onInputDown.add(toCreateTower,this);
      
      
      function toCreateTower(sprite){
        if(this.gold<towerData[sprite.type].cost)return;
        choice={
        "tileX":selectedTile.worldX+16,
        "tileY":selectedTile.worldY+16,
        "type":sprite.type,
      }
        this.gold-=towerData[choice.type].cost;
        this.hud.updateGold();
        this.tower.createTower(choice);
        //console.log(sprite);
     //   console.log(choiceTwo);
       // console.log(choiceTwo);
       // this.choiceMenu.kill();
      }
      // var tower=game.add.sprite(selectedTile.worldX+16, selectedTile.worldY+16,'tower');
      // tower.anchor.set(0.5);
      // circle = new Phaser.Circle(tower.x, tower.y,64);
      // tower.circle=circle;
      // tower.lastTimeFired=0;
      // towers.add(tower);
      // selectedTile.hasTower=true;
    }
  },
  
  createTower: function(type){
    console.log(type.key);
    var tower=game.add.sprite(type.tileX, type.tileY,type.key);
    tower.anchor.set(0.5);
    if(type.key=='tower2'){tower.exploding=true;}
    
    var circle = new Phaser.Circle(tower.x, tower.y,64);
    tower.circle=circle;
    tower.lastTimeFired=0;
    this.towers.add(tower);
    var selectedTile=this.level.map.getTileWorldXY(type.tileX, type.tileY);
    selectedTile.hasTower=true;
    
    //type.kill();
    //selectedTile.hasTower=true;
    
    
  },
  //function whereToGo(){
  //if(goingTo.length==0){
  
  //firstTile=map.searchTileIndex(1,0, false)
  //goingTo[0]=firstTile.worldX;
  //goingTo[1]=firstTile.worldY;
  
  //game.physics.arcade.moveToXY(player,goingTo[0],goingTo[1],80);
  //q++;
  //console.log('where to go');
  //console.log( firstTile);
  
  //}else if(reachedDestination){
  
  //firstTile=map.searchTileIndex(1,q, false, layer2)
  //goingTo[0]=firstTile.worldX;
  //goingTo[1]=firstTile.worldY;
  
  //game.physics.arcade.moveToXY(player,goingTo[0],goingTo[1],80);
  //console.log(q);
  //q++;
  //reachedDestination=false;
  
  //}
  
  //}
  
};