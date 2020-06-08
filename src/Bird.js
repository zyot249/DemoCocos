/**
 * Created by Zyot on 6/4/2020.
 */
var Bird = cc.Sprite.extend({
    velocity: 0,
    acceleration: -981,
    winSize: null,
    ctor: function() {
        this._super(res.flbBirdUp_png);
        this.winSize = cc.director.getWinSize();
        this.init();
    },
    update: function(dt) {
        var nextY = this.y + this.velocity*dt;
        if (nextY <= BASE_HEIGHT + this.height / 2) {
            this.y = BASE_HEIGHT + this.height / 2;
            this.velocity = 0;
        } else if (nextY >= this.winSize.height - this.height / 2) {
            this.y = this.winSize.height - this.height / 2;
            this.velocity = 0;
        } else {
            this.y = nextY;
        }
        this.velocity = this.velocity + this.acceleration*dt;
    },
    updateVelocity: function(v) {
        this.velocity = v;
    },
    collideRect: function (x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w/2, y - h/2, w, h);
    },
    fall: function() {
        this.stopAllActions();
        this.setRotation(90);
        var actionFall = cc.moveTo(0.5, this.x, BASE_HEIGHT + this.height / 2);
        this.runAction(actionFall);
    },
    init: function() {
        this.setRotation(0);
        this.x = this.winSize.width / 2;
        this.y = (this.winSize.height - BASE_HEIGHT) / 2 + BASE_HEIGHT;

        var animation = new cc.Animation();
        animation.addSpriteFrameWithFile(res.flbBirdUp_png);
        animation.addSpriteFrameWithFile(res.flbBirdMid_png);
        animation.addSpriteFrameWithFile(res.flbBirdDown_png);
        animation.setDelayPerUnit(1 / 20);
        animation.setRestoreOriginalFrame(true);

        var animate = cc.animate(animation);
        this.runAction(animate.repeatForever());
    }
});