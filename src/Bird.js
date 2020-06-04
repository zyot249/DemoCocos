/**
 * Created by Zyot on 6/4/2020.
 */
var Bird = cc.Sprite.extend({
    ctor: function() {
        this._super(res.flbBirdUp_png);
        this.x = MW.WIDTH / 2 - 20;
        this.y = MW.HEIGHT / 2;
    },
    updateBirdPosition: function() {
        this.y += 5;
    }

});