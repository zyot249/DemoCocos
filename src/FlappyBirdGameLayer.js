/**
 * Created by Zyot on 6/4/2020.
 */
var FlappyBirdGameLayer = cc.Layer.extend({
    _bird: null,
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        this.initBackground();
        this._bird = new Bird();
        this.addChild(this._bird, 0, 4);
        this.addKeyboardListener();
    },
    initBackground: function () {
        var bg = new cc.Sprite(res.flbBackground_png);
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            scale: MW.SCALE
        });
        this.addChild(bg, 0, 1);
    },
    addKeyboardListener:function(){
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            var self = this;
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    if (key === 32) {
                        self._bird.updateBirdPosition();
                    }
                }
            }, this);
        }
    }

});



FlappyBirdGameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new FlappyBirdGameLayer();
    scene.addChild(layer);
    return scene;
};