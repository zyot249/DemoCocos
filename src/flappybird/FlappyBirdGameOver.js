/**
 * Created by Zyot on 6/8/2020.
 */
var FlappyBirdGameOver = cc.Sprite.extend({
    winSize: null,
    ctor: function() {
        this._super(res.flbGameOver_png);
        this.winSize = cc.director.getWinSize();
        let size = this.getContentSize();
        //this.attr({
        //    scaleX:
        //});
        //this.init();
    },
    init: function() {
        this.visible = true;
        this.x = this.winSize.width/2;
        this.y = this.height/2;

        let actionMoveUp = cc.moveTo(1, this.winSize.width/2, this.winSize.height*2/3);
        this.runAction(actionMoveUp);
    },
    disable: function() {
        this.visible = false;
    }
});