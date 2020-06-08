/**
 * Created by Zyot on 6/4/2020.
 */

VELOCITY_ONCLICK = 420;
var g_sharedFlappyBirdGameLayer;

var FlappyBirdGameLayer = cc.Layer.extend({
    bird: null,
    isScheduled: false,
    base: null,
    winSize: null,
    tmpScore: 0,
    lbScore: null,
    isGameEnded: false,
    gameOverSprite: null,

    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        this.winSize = cc.director.getWinSize();
        this.initBackground();
        this.bird = new Bird();
        this.addChild(this.bird, 10);
        this.base = new BaseLayer();
        this.addChild(this.base, 1, 10);
        this.addTouchListener();
        g_sharedFlappyBirdGameLayer = this;

        // score
        this.lbScore = new cc.LabelBMFont("Score: 0", res.arial_14_fnt);
        this.lbScore.attr({
            anchorX: 1,
            anchorY: 0,
            x: this.winSize.width - 5,
            y: this.winSize.height - 30,
            scale: MW.SCALE
        });
        this.lbScore.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this.lbScore, 1000);

        MW.SCORE = 0;

        Pipe.preSet();
        this.gameOverSprite = new FlappyBirdGameOver();
        this.addChild(this.gameOverSprite, 10);

        return true;
    },
    initBackground: function () {
        let bg = new cc.Sprite(res.flbBackground_png);
        var size = bg.getContentSize();
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            scaleX: this.winSize.width/size.width,
            scaleY: this.winSize.height/size.height
        });
        this.addChild(bg, 0, 1);
    },
    addTouchListener: function() {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            shallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this)
        }, this);
    },
    onTouchBegan: function(touch, event) {
        if (this.bird.isFalling()) {
            return true;
        }
        if (this.isGameEnded) {
            this.renewGame();
        } else {
            if (!this.isScheduled) {
                this.scheduleUpdate();
                this.base.flow();
                this.isScheduled = true;
            }
            this.bird.updateVelocity(VELOCITY_ONCLICK);
        }
        return true;
    },
    update: function (dt) {
        this.checkIsCollision();
        this.bird.update(dt);
        for (var i = 0; i < MW.CONTAINER.PIPES.length; i ++) {
            var pipe = MW.CONTAINER.PIPES[i];
            if (i % 2 == 1) {
                pipe.updateMove(MW.CONTAINER.PIPES[i - 1]);
            } else {
                pipe.updateMove(null);
                if (!pipe.checkIsPassed()) {
                    if (pipe.checkIsBirdIn()) {
                        if (this.bird.x > pipe.x + pipe.width / 2) {
                            MW.SCORE++;
                            pipe.setIsPassed(true);
                        }
                    } else {
                        if ((this.bird.x <= pipe.x + pipe.width / 2) && (this.bird.x >= pipe.x - pipe.width / 2)) {
                            pipe.setIsBirdIn(true);
                        }
                    }
                }
            }
        }
        this.updateUI();
    },
    checkIsCollision: function() {
        if (this.bird.y <= BASE_HEIGHT + this.bird.height / 2) {
            cc.log("Collide");
            this.endGame();
            return;
        }
        for (var i = 0; i < MW.CONTAINER.PIPES.length; i ++) {
            var pipe = MW.CONTAINER.PIPES[i];
            if (this.collide(this.bird, pipe)) {
                cc.log("Collide");
                this.endGame();
            }
        }
    },
    endGame: function() {
        this.unscheduleUpdate();
        this.isScheduled = false;
        this.isGameEnded = true;
        this.base.stopMove();
        this.bird.fall();
        this.gameOverSprite.init();
    },
    updateUI:function () {
        if (this.tmpScore < MW.SCORE) {
            this.tmpScore += 1;
        }
        this.lbScore.setString("Score: " + this.tmpScore);
    },
    collide: function(a, b) {
        var ax = a.x, ay = a.y, bx = b.x, by = b.y;
        var aRect = a.collideRect(ax, ay);
        var bRect = b.collideRect(bx, by);
        return cc.rectIntersectsRect(aRect, bRect);
    },
    renewGame: function() {
        this.gameOverSprite.disable();
        this.isGameEnded = false;
        this.bird.init();
        Pipe.resetToStart();
        this.tmpScore = 0;
        MW.SCORE = 0;
    }
});

FlappyBirdGameLayer.prototype.addPipe = function (pipe, z, tag) {
    this.addChild(pipe, z, tag);
};

FlappyBirdGameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new FlappyBirdGameLayer();
    scene.addChild(layer, 0);
    return scene;
};

