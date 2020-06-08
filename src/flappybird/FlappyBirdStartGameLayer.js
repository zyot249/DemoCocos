/**
 * Created by Zyot on 6/8/2020.
 */
var FlappyBirdStartGameLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.init();
        this.addTouchListener();
    },
    init: function() {
        let winSize = cc.director.getWinSize();
        let bg = new cc.Sprite(res.flbBackground_png);
        let fg = new cc.Sprite(res.flbOnStart_png);

        let bgSize = bg.getContentSize();
        let fgSize = fg.getContentSize();
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            scaleX: winSize.width/bgSize.width,
            scaleY: winSize.height/bgSize.height
        });
        fg.attr({
            scaleX: winSize.width/fgSize.width *2/3,
            scaleY: winSize.height/fgSize.height *2/3
        });
        fg.x = winSize.width/2;
        fg.y = winSize.height/2;
        this.addChild(bg, 0);
        this.addChild(fg, 1);
    },
    addTouchListener: function() {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            shallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this)
        }, this);
    },onTouchBegan: function(touch, event) {
        this.onNewGame();
        return true;
    },
    onNewGame: function() {
        cc.LoaderScene.preload(g_maingame, function () {
            let scene = FlappyBirdGameLayer.scene();
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        }, this);
    }
});

FlappyBirdStartGameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new FlappyBirdStartGameLayer();
    scene.addChild(layer, 0);
    return scene;
};