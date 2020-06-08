/**
 * Created by Fresher_LOCAL on 6/5/2020.
 */
BASE_HEIGHT = 200;

var BaseLayer = cc.Layer.extend({
    winSize: null,
    actionBaseMove: null,
    ctor: function() {
        this._super();
        this.winSize = cc.director.getWinSize();
        this.width = this.winSize.width*2;
        this.height = BASE_HEIGHT;

        var base1 = new cc.Sprite(res.flbBase_png);
        base1.attr({
            anchorX: 0,
            anchorY: 0,
            scaleX: this.winSize.width/base1.width,
            scaleY: BASE_HEIGHT/base1.height,
        });
        base1.width = this.winSize.width;
        base1.height = BASE_HEIGHT;
        base1.x = this.winSize.width;

        var base2 = new cc.Sprite(res.flbBase_png);
        base2.attr({
            anchorX: 0,
            anchorY: 0,
            scaleX: this.winSize.width/base2.width,
            scaleY: BASE_HEIGHT/base2.height,
        });
        base2.width = this.winSize.width;
        base2.height = BASE_HEIGHT;
        base2.x = 0;
        this.addChild(base1);
        this.addChild(base2);

        var actionMove = cc.moveTo(5, -this.winSize.width, 0);
        var callFun = cc.callFunc(this.moveToRight, this);
        var seq = cc.sequence(actionMove, callFun);
        this.actionBaseMove = seq.repeatForever();
        this.runAction(this.actionBaseMove);
    },
    moveToRight: function() {
        this.x = 0;
    },
    stopMove: function() {
        this.stopAllActions();
    }
});