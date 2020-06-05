/**
 * Created by Fresher_LOCAL on 6/5/2020.
 */
DISTANCE_OF_TWO_PIPES = 140;

var Pipe = cc.Sprite.extend({
    winSize: null,
    dx: 2,
    isUp: false,
    spacePositionY: 0,
    ctor: function (isUp, spacePositionY, x) {
        this._super(res.flbPipe_png);
        this.winSize = cc.director.getWinSize();
        this.x = x + this.width/2;
        this.isUp = isUp;
        this.spacePositionY = spacePositionY;
        if (isUp) {
            this.y = spacePositionY - this.height/2 - DISTANCE_OF_TWO_PIPES/2;
        } else {
            this.flippedY = true;
            this.y = spacePositionY + this.height/2 + DISTANCE_OF_TWO_PIPES/2;
        }

    },
    updateMove: function(pipeUp) {
        var nextX = this.x - this.dx;
        if (nextX <= -this.width/2) {
            this.x = this.width/2 + this.winSize.width*3/2;
            if (pipeUp !== null) {
                this.spacePositionY = pipeUp.spacePositionY;
                this.y = this.spacePositionY + this.height/2 + DISTANCE_OF_TWO_PIPES/2;
            } else {
                this.spacePositionY = this.getRandomInt(this.winSize.height - DISTANCE_OF_TWO_PIPES, BASE_HEIGHT + DISTANCE_OF_TWO_PIPES);
                this.y = this.spacePositionY - this.height/2 - DISTANCE_OF_TWO_PIPES/2;
            }
        } else {
            this.x = nextX;
        }
    },
    collideRect: function(x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w/2, y - h/2, w, h);
    },
    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});

Pipe.create = function (isUp, spacePositionY, x) {
    var pipe = new Pipe(isUp, spacePositionY, x);
    g_sharedPlappyBirdGameLayer.addPipe(pipe, 0, 2);
    MW.CONTAINER.PIPES.push(pipe);
    return pipe;
};

Pipe.preSet = function() {
    var winWidth = cc.director.getWinSize().width;
    var distance = winWidth/2;
    for (var i = 0; i < 3; i++) {
        Pipe.create(true, BASE_HEIGHT + 150 + 50*i, winWidth + distance*i);
        Pipe.create(false, BASE_HEIGHT + 150 + 50*i, winWidth + distance*i);
    }
};
