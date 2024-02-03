// need to flesh out the functions, and fiddle a bit to join up some dots




Ball.game - function (game) {};
      Ball.Game.prototype = {
        create() {},

        showLevels() {},
        showLevel(level) {},
        updateCounter() {},
        managePause() {},
        manageAudio() {},
        update() {},
        wallCollision() {},
        handleOrientation(e) {},
        finishLevel() {},
      };


      this.ball - this.add.sprite(this.ballStartPos.x,
      this.ballStartPos.y, "ball");
      this.ball.anchor.set(0.5);
      this.physics.enable(this.ball, Phaser.Physics.ARCADE);
      this.ball.body.setSize(18, 18);
      this.ball.body.bounce.set(0.3, 0.3);

      this.keys = this.game.input.keyboard.createCursorKeys();

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


      window.addEventListener("deviceorientation",
      this.handleOrientation, true);

      handleOrientation(event) {
        const x = event.gamma;
        const y = event.beta;
        Ball._player.body.velocity.x += x;
        Ball.player.body.velocity.y += y;
        }

        this.hole = this.add.sprite(BAll._WIDTH * 0.5, 90, "hole");
        this.physics.enable(this.hole, Phaser.Physics.ARCADE);
        this.hole.anchor.set(0.5);
        this.hole.body.setSize(2, 2);

        this.levelData = [
        [{ x: 96, y: 224, t: "w" }],
        [
        { x: 72, y: 320, t: "w" },
        { x: 200, y: 320, t: "h" },
        { x: 72, y: 150, t: "w" },
        ],
        
        ];


        for (let i = 0; i < this.maxLevels; i++){
            const newLevel = this.add.group();
            newLevel.enableBody = true;
            newLevel.physicsBodyType = Phaser.Physics.ARCADE;
            for (let e = 0; e < this.levelData[i].length; e++){
                const item = this.levelDate[i][e];
                newLevel.create(item.x, item.y, `element-${item.t}`);
            }
            newLevel.setAll("body.immovable", true);
            newLevel.visible = false;
            this.levels.push(newLevel);
        };

        showLevel(level) {
            const lvl = level | this.level;
            if (this.levels[lvl-2]) {
                this.levels[lvl-2].visible = false;
            }
            this.levels[lvl -1].visible = true;
            }