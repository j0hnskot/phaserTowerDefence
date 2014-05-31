var game_state=function(game){
  this.goingTo=[];
  this.player=null;
  this.reachedDestination=false;
  this.q=0;
  this.layer=null;
  this.layer2=null;
  this.start=null;
  this.finish=null;
  this.circle=null;
  this.towers=null;
  this.bullets=null;
  this.enemies=null;
  this.life=50;
  this.cursors=null;
  this.wave=new Wave(game);
  
  this.map=null;
  this.choiceMenu=null;


};

game_state.prototype={
  
  preload: function(){  
    game.scale.setShowAll();
    game.scale.setScreenSize();
    game.load.tilemap('map', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('spritesheet','assets/spritesheet.png');
    game.load.image('tower1','assets/tower1.png');
    game.load.image('tower2','assets/tower2.png');
    game.load.image('bullet','assets/bullet.png');
    game.load.image('menu','assets/menu.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    
    
    
  },
  
  create: function(){
    
    
    
    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('spritesheet');
    this.layer2= this.map.createLayer('Tile Layer 2');
    this.layer= this.map.createLayer('Tile Layer 1');
    
    
    //layer.debug = true;
    
    // layer.debug = true
    // map.setCollision([7,10]);
    this.layer.resizeWorld();
    this.start=this.map.searchTileIndex(8,0, false,this.layer2);
    this.finish=this.map.searchTileIndex(5,0, false,this.layer2);
    console.log('start');
    console.log(this.start);
    console.log('finish');
    console.log(this.finish);
    // player=game.add.sprite(start.worldX,start.worldY,'dude');
    // player.anchor.set(0.5);
    // p=game.add.sprite(start.worldX,start.worldY,'');
    // game.physics.arcade.enable(player);
    // game.camera.follow(player);
    // player.body.setSize(1,player.height/2,0,20)
    
    //  map.setTileIndexCallback(2, tileProperties, this);
    this.towers=game.add.group();
    this.bullets=game.add.group();
    this.enemies=game.add.group();
    // circle = new Phaser.Circle(game.input.activePointer.x, game.input.activePointer.y,64);
    //  circle.alpha=0.5;
    //  player.circle=circle;
    // circles.add(player);
    
    this.map.setTileIndexCallback([2,3,4,9], this.tileProperties, this);
    this.cursors = game.input.keyboard.createCursorKeys();
    console.log(this.map.tilesets[0].tileProperties);
    console.log(this.map);
    game.input.onDown.add(this.createCircle,this);
    this.wave.create();
    //    for(var i=0;i<9;i++){
    //    firstTile=map.searchTileIndex(2, i, false, layer2)
    //    console.log(firstTile);
    //    //console.log(firstTile.worldY);
    // }
  },
  
  update: function(){
    
    this.checkRadius();
    
    
    //  whereToGo();
    game.physics.arcade.collide(this.enemies, this.layer);
    game.physics.arcade.overlap(this.enemies, this.bullets,this.damaged);
    // player.body.velocity.x = 0;
    // player.body.velocity.y=0;
    
    
    
  },
  
  damaged: function(enemy,bullet){
    // console.log('damaged');
    // enemy.damage(1);
    // bullet.damage(1);
    if(bullet.exploding)return;
    //console.log('not exploding');
    enemy.damage(1);
    bullet.kill();
  },
  
  checkRadius: function(){
    
    this.towers.forEachAlive(function(tower){
      
      this.enemies.forEachAlive(function(enemy){
        //console.log(enemy);
        if (Phaser.Math.distance(enemy.x, enemy.y, tower.circle.x, tower.circle.y) <= 64) {
          this.shoot(tower,enemy);
        }
        
      },this);
      
    },this);
    
    
  },
  
  explodeRadius: function(bullet){
    this.enemies.forEachAlive(function(enemy){
      if (Phaser.Math.distance(enemy.x, enemy.y, bullet.circle.x, bullet.circle.y) <= 30) {
        
        enemy.damage(1);
        
      }
      
      
    });
    bullet.kill();
  },
  
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
    //console.log('reached');
    var destination=this.map.tilesets[0].tileProperties[tile.index-1];
    //console.log(destination);
    enemy.body.velocity.x=0;
    enemy.body.velocity.y=0;
    if(this.finish.worldX==tile.worldX && this.finish.worldY==tile.worldY){
      enemy.kill();
      this.life--;
      //console.log('life: '+life);
    }else{
      switch(destination.goto){
        case 'left':
          enemy.body.offset.x=10;
          enemy.body.offset.y=0;
          enemy.body.velocity.x=-150;
          break;
          
        case 'right':
          //console.log('go right');
          enemy.body.offset.x=-10;
          enemy.body.offset.y=0;
          enemy.body.velocity.x=150;
          break;
          
        case 'up':
          //console.log('go up');
          enemy.body.offset.y=32;
          enemy.body.offset.x=0;
          enemy.body.velocity.y=-150;
          break;
          
        case 'down':
          //console.log('go down');
          enemy.body.offset.y=-10;
          enemy.body.offset.x=0;
          enemy.body.velocity.y=150;
          break;
          
          
          
      }
    }
    //if(tile.worldX==goingTo[0]&& tile.worldY==goingTo[1]){
    //console.log('reached');
    //console.log(tile);
    //console.log(map.tilesets[0].tileProperties[tile.index-1]);
    
    //player.body.velocity.x = 0;
    //player.body.velocity.y=0;
    //reachedDestination=true;
    //goingTo[0]=0;
    //goingTo[1]=1;
    
  },
  
  
  shoot: function(tower,enemy){
    
    if (tower.lastTimeFired < game.time.now - 250) {
       var bullet=game.add.sprite(tower.x,tower.y,'bullet');
      
      
      game.physics.arcade.enable(bullet);
      if(tower.exploding){
        var radius=new Phaser.Circle(bullet.x, bullet.y,80);
        bullet.circle=radius;
        
        game.add.tween(bullet.circle).to( {x:enemy.x}, 100, Phaser.Easing.Linear.None,true);
        game.add.tween(bullet.circle).to( {y:enemy.y}, 100, Phaser.Easing.Linear.None,true);
        game.add.tween(bullet).to( {x:enemy.x}, 100, Phaser.Easing.Linear.None,true);
        game.add.tween(bullet).to( {y:enemy.y}, 100, Phaser.Easing.Linear.None,true)
        .onComplete.add(function(){this.explodeRadius(bullet);},this);
        
        
        
        
      }else{
        game.physics.arcade.moveToObject(bullet,enemy,300);
      }
      
      
      
      
      
      bullet.body.outOfBoundsKill=true;
      bullet.body.checkWorldBounds=true;
      bullet.lifespan=500; 
      
      tower.lastTimeFired=game.time.now;
      this.bullets.add(bullet);
      
    }
    
    
    
    
    //for(var i=1;i<=enemy.mountPoints.ammount;i++){
    //currentPoint=enemy.mountPoints['point'+i];  
    //if(this.state.enemy_bullets.getFirstDead()){
    
    //bullet=this.state.enemy_bullets.getFirstDead();
    //bullet.resetProperties(enemy.x+(currentPoint.x),enemy.y+currentPoint.y+59,enemy.weapon,'enemy');
    //}else{
    //bullet=new Bullet(game,enemy.x+currentPoint.x,enemy.y+currentPoint.y+59,enemy.weapon,'enemy')
    //}
    //}
    
    
    
    
    //var bullet=new Bullet(game,enemy.x,enemy.y+59,enemy.weapon,'enemy')
    //enemy.lastTimeFired=game.time.now;
    
    // }
    
    
  },
  
  
  createCircle: function(){
    var selectedTile=this.map.getTileWorldXY(game.input.activePointer.x, game.input.activePointer.y);
    //console.log(selectedTile);
    if(selectedTile.index==1 && !selectedTile.hasTower){
      if (this.choiceMenu!==null){
        this.choiceMenu.kill();
        this.choiceMenu=null;
      }
      this.choiceMenu=game.add.sprite(selectedTile.worldX, selectedTile.worldY-20,'menu');
      this.choiceMenu.anchor.x=0.5;
      
      var choiceOne=game.add.sprite(-40,0,'tower1');
      choiceOne.tileX=selectedTile.worldX+16;
      choiceOne.tileY=selectedTile.worldY+16;
      this.choiceMenu.addChild(choiceOne);
      choiceOne.inputEnabled=true;
      choiceOne.events.onInputDown.add(toCreateTower,this);
      
      
      var choiceTwo=game.add.sprite(10,0,'tower2');
      choiceTwo.tileX=selectedTile.worldX+16;
      choiceTwo.tileY=selectedTile.worldY+16;
      this.choiceMenu.addChild(choiceTwo);
      choiceTwo.inputEnabled=true;
      choiceTwo.events.onInputDown.add(toCreateTower,this);
      
      
      function toCreateTower(sprite){
        
        this.createTower(sprite);
        console.log(sprite);
        console.log(choiceTwo);
        console.log(choiceTwo);
        this.choiceMenu.kill();
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
    var selectedTile=this.map.getTileWorldXY(type.tileX, type.tileY);
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