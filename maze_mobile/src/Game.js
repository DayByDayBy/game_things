Ball.Game = function(game) {};
Ball.Game.prototype = {
      create() {
          this.add.sprite(0, 0, "screen-bg");
          this.add.sprite(0, 0, 'panel');
          this.physics.startSystem(Phaser.Physics.ARCADE);
          this.fontSmall = { font: "16px Helvetica", fill:"#e4beef"};
          this.fontBig = { font: "24px Helvetica", fill:"#e4beef"};
          this.fontMessage = {font: "24px Helvetica", fill:"#e4beef", align: "center", stroke: "#320C3E", strokeThickness: 4};
          this.audioStatus = true;
          this.timer = 0;
          this.totalTimer = 0;
          this.level = 1;
          this.maxLevels = 5;
          this.movementForce = 10;
          this.ballStartPos = { x: Ball._WIDTH*0.5, y: 450 };

          this.pauseButton = this.add.button(Ball._WIDTH-8, 8, 'button-pause', this.managePause, this);
          this.pauseButton.anchor.set(1, 0);
          this.pauseButton.input.useHandCursor = true;
          this.audioButton = this.add.button(Ball._WIDTH-this.pauseButton.width-8*2, 8, 'buton-audio', this.manageAudio, this);
          this.audioButton.anchor.set(1,0);
          this.audioButton.input.useHandCursor = true;
          this.audioButton.animations.add('true', [0], 10, true);
          this.audioButton.animations.add('false', [1], 10, false);
          this.audioButton.animations.play(this.audioStatus);
          this.timerText = this.game.add.text(15, 15, "Time: " +this.level+" / "+this.maxLevels+ this.fontSmall);
          this.totalTimneText = this.game.add.text(120, 30, "Total Time: "+this.totalTimer, this.fontSmall);

          this.hole = this.add.sprite(Ball._WIDTH*0.5, 90, 'hole');
        
          this.physics.enable(this.hole, Phaser.Physics.ARCADE);
          this.hole.anchor.set(0.5);
          this.hole.body.setSize(2, 2);

          this.ball = this.add.sprite(this.ballStartPos.x, 
            this.ballStartPos.y, "ball");
          this.ball.anchor.set(0.5);
          this.physics.enable(this.ball, Phaser.Physics.ARCADE);
          this.ball.body.setSize(18, 18);
          this.ball.body.bounce.set(0.3, 0.3);

          this.initLevels();
          this.showLevel(1);

          this.keys = this.game.input.keyboard.createCursorKeys();

        
        Ball._player = this.ball;
          window.addEventListener("deviceorientation",
            this.handleOrientation, true);

          this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

          this.borderGroup = this.add.group();
          this.borderGroup.enableBody = true;
          this.borderGroup.physicsBodyType = Phaser.Physics.ARCADE;
          this.borderGroup.create(0, 50, 'border-horizontal');
          this.borderGroup.create(0, Ball._HEIGHT-2, 'border-vertical');
          this.borderGroup.create(0, 0, 'border-vertical');
          this.borderGroup.create(0, Ball._WIDTH-2, 0, 'border-vertical');
          this.borderGroup.setAll('body-immovable', true);
          this.bounceSound = this.game.add.audio('audio-bounce');

        },

      initLevels(){
          this.levels = [];
          this.levelData = [
                [{ x: 96, y: 224, t: "w" }],
                [
                { x: 72, y: 320, t: "w" },
                { x: 200, y: 320, t: "h" },
                { x: 72, y: 150, t: "w" },
                ],
                [
                  { x: 64, y: 352, t: 'h' },
                  { x: 224, y: 352, t: 'h' },
                  { x: 0, y: 240, t: 'w' },
                  { x: 128, y: 240, t: 'w' },
                  { x: 200, y: 52, t: 'h' }
                ],
                [
                  { x: 78, y: 352, t: 'h' },
                  { x: 78, y: 320, t: 'w' },
                  { x: 0, y: 240, t: 'w' },
                  { x: 192, y: 240, t: 'w' },
                  { x: 30, y: 150, t: 'w' },
                  { x: 158, y: 150, t: 'w' }
                ],
                [
                  { x: 188, y: 352, t: 'h' },
                  { x: 92, y: 320, t: 'w' },
                  { x: 0, y: 240, t: 'w' },
                  { x: 128, y: 240, t: 'w' },
                  { x: 256, y: 240, t: 'h' },
                  { x: 180, y: 52, t: 'h' },
                  { x: 52, y: 148, t: 'w' }
                ]
        ];

        for(let i=0; i<this.maxLevels; i++) {
          let newLevel = this.add.group();
          newLevel.enableBody = true;
          newLevel.physicsBodyType = Phaser.Physics.ARCADE;
          for(let e=0; e<this.levelData[i].length; e++) {
            let item = this.levelData[i][e];
            newLevel.create(item.x, item.y, 'element-'+item.t);
          }
          newLevel.setAll('body.immovable', true);
          newLevel.visible = false;
          this.levels.push(newLevel);
        }

      },
  

      showLevel(level) {
          const lvl = level | this.level;
          if (this.levels[lvl-2]) {
              this.levels[lvl-2].visible = false;
          }
          this.levels[lvl -1].visible = true;
          },

      updateCounter() {

        this.timer++;
        this.timerText.setText("Time: " +this.timer);
        this.totalTimeText.setText("Total time: "+(this.totalTimer+this.timer));
        },

      managePause() {
        this.game.paused = true;
        let pausedText = this.add.text(Ball._WIDTH*0.5, 250, "Game is paused, \ntap to continue");
        pausedText.anchor.set(0.5);
        this.input.onDown.add(function(){
          pausedText.Desroy();
          this.game.pasued = false;
        }, this);
      },
      manageAudio() {
        this.audioStatus =! this.audioStatus;
        this.audioButton.anuimations.play(this.audioStatus);     
      },

      update() {  
            if (this.keys.left.isDown){
              this.ball.body.velocity.x -= this.movementForce;
            } else if (this.keys.right.isDown){
              this.ball.body.velocity.x += this.movementForce;
            }
      
            if (this.keys.up.isDown){
              this.ball.body.velocity.y -= this.movementForce;
            } else if (this.keys.down.isDown) {
              this.ball.body.velocity.y += this.movementForce
            }

            this.physics.arcade.collide(this.ball, this.borderGroup, this,this.wallCollision, null, this);
            this.physics.arcade.collide(this.ball, this.levels[this.level-1], this.wallCollision, null, this);
            this.physics.arcade.overlap(this.ball, this,hole, this.finishLevel, null, this);

        },



      wallCollision() {
          if(this.audioStatus){
            this.bounceSound.play();
          }

          if("vibrate" in window.navigator){
            window.navigator.vibrate(100);
          }
        },
  
    

      handleOrientation(e) {
        const x = e.gamma;
        const y = e.beta;
        const z = e.alpha;
        Ball._player.body.velocity.x += x;
        Ball.player.body.velocity.y += y*0.5;
      },

      finishLevel(){
        if (this.level>= this.maxLevels){
            this.totalTimer += this.timer;
            alert("WINNER!! \n\ntotal play time: "+this.totalTimer+" seconds!");
            this.game.state.start('MainMenu');
        } else {
            alert('Level ' +this.level+' Completed')
            this.totalTimer += this.timer;
            this.timer = o;
            this.level++;
            this.timerText.setText("Time: "+this.timer);
            this.totalTimeText.setText("Total Time: "+this.totalTimer);
            this.levelText.setText("Level: "+this.level+ " / "  +this.maxLevels);
            this.ball.body.x = this.ballStartPos.x;
            this.ball.body.y = this.ballStartPos.y;
            this.ball.body.velocity.x = 0;
            this.ball.body.velocity.y = 0;
            this.showLevel();
        }
      },
      render(){
          // this.game.debug.body(this.ball);
          // this.game.debug.body(this.hole);
      }

    };

