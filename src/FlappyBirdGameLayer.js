/**
 * Created by Zyot on 6/4/2020.
 */

var g_sharedPlappyBirdGameLayer;

var FlappyBirdGameLayer = cc.Layer.extend({
    _bird: null,
    _isScheduled: false,
    _base: null,
    winSize: null,
    _tmpScore: 0,
    lbScore: null,

    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        this.winSize = cc.director.getWinSize();
        this.initBackground();
        this._bird = new Bird();
        this.addChild(this._bird, 10);
        this._base = new BaseLayer();
        this.addChild(this._base, 1, 10);
        this.addTouchListener();
        g_sharedPlappyBirdGameLayer = this;

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
        return true;
    },
    initBackground: function () {
        var bg = new cc.Sprite(res.flbBackground_png);
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
            onTouchBegan: this.onTouchBegan.bind(this),
            //onTouchesMoved: function(touch, event) {
            //
            //},
            //onTouchEnded: function(touch, event) {
            //
            //},
            //onTouchCancelled: function(touch, event) {
            //
            //}
        }, this);
    },
    onTouchBegan: function(touch, event) {
        if (!this._isScheduled) {
            this.scheduleUpdate();
            this._isScheduled = true;
        }
        this._bird.updateVelocity(420);
        return true;
    },
    update: function (dt) {
        this.checkIsCollision();
        this._bird.update(dt);
        for (var i = 0; i < MW.CONTAINER.PIPES.length; i ++) {
            var pipe = MW.CONTAINER.PIPES[i];
            if (i % 2 == 1) {
                pipe.updateMove(MW.CONTAINER.PIPES[i - 1]);
            } else {
                pipe.updateMove(null);
                if (!pipe.isPassed) {
                    if (pipe.isBirdIn) {
                        if (this._bird.x > pipe.x + pipe.width / 2) {
                            MW.SCORE++;
                            pipe.isPassed = true;
                        }
                    } else {
                        if ((this._bird.x <= pipe.x + pipe.width / 2) && (this._bird.x >= pipe.x - pipe.width / 2)) {
                            pipe.isBirdIn = true;
                        }
                    }
                }
            }
        }
        this.updateUI();
    },
    checkIsCollision: function() {
        if (this._bird.y <= BASE_HEIGHT + this._bird.height / 2) {
            cc.log("Collide");
            this._base.stopMove();
            this.unscheduleUpdate();
            this._bird.fall();
            return;
        }
        for (var i = 0; i < MW.CONTAINER.PIPES.length; i ++) {
            var pipe = MW.CONTAINER.PIPES[i];
            if (this.collide(this._bird, pipe)) {
                cc.log("Collide");
                this._base.stopMove();
                this.unscheduleUpdate();
                this._bird.fall();
            }
        }
    },
    updateUI:function () {
        if (this._tmpScore < MW.SCORE) {
            this._tmpScore += 1;
        }
        this.lbScore.setString("Score: " + this._tmpScore);
    },
    collide: function(a, b) {
        var ax = a.x, ay = a.y, bx = b.x, by = b.y;
        var aRect = a.collideRect(ax, ay);
        var bRect = b.collideRect(bx, by);
        return cc.rectIntersectsRect(aRect, bRect);
    }
});

FlappyBirdGameLayer.prototype.addPipe = function (pipe, z, tag) {
    this.addChild(pipe, z, tag);
};

FlappyBirdGameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new FlappyBirdGameLayer();
    scene.addChild(layer, 0);
    //var baseLayer = new BaseLayer();
    //scene.addChild(baseLayer, 1, 10);
    return scene;
};

