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
        this.x = this.winSize.width / 2;
        this.y = (this.winSize.height - BASE_HEIGHT) / 2 + BASE_HEIGHT;

        //var frame0 = cc.spriteFrameCache.getSpriteFrame(res.flbBirdUp_png);
        //var frame1 = cc.spriteFrameCache.getSpriteFrame(res.flbBirdMid_png);
        //var frame2 = cc.spriteFrameCache.getSpriteFrame(res.flbBirdDown_png);
        //
        //var animFrames = [];
        //animFrames.push(frame0);
        //animFrames.push(frame1);
        //animFrames.push(frame2);
        //
        //var animation = new cc.Animation(animFrames, 0.2);
        //var animate = cc.animate(animation);
        //this.runAction(animate.repeatForever());
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
        this.setRotation(90);
        var actionFall = cc.moveTo(0.5, this.x, BASE_HEIGHT + this.height / 2);
        this.runAction(actionFall);
    }
});