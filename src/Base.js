/**
 * Created by Fresher_LOCAL on 6/5/2020.
 */
BASE_HEIGHT = 200;
var Base = cc.Sprite.extend({
   ctor: function() {
       this._super(res.flbBase_png);
       var winSize = cc.director.getWinSize();

       this.scaleX = winSize.width/this.width;
       this.scaleY = BASE_HEIGHT/this.height;

       this.width = winSize.width;
       this.height = BASE_HEIGHT;
       this.anchorX = 0;
       this.anchorY = 0;
   }
});