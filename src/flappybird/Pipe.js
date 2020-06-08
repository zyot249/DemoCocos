/**
 * Created by Fresher_LOCAL on 6/5/2020.
 */
DISTANCE_OF_TWO_PIPES = 140;
NUMBER_OF_PIPE_COUPLE = 3;

var Pipe = cc.Sprite.extend({
    winSize: null,
    dx: 2,
    spacePositionY: 0,
    isPassed: false,
    isBirdIn: false,
    ctor: function (x, isPipeUp, spacePositionY) {
        this._super(res.flbPipe_png);
        this.winSize = cc.director.getWinSize();
        this.init(x, isPipeUp, spacePositionY);
    },
    updateMove: function(pipeUp) {
        var nextX = this.x - this.dx;
        if (nextX <= -this.width/2) {
            if (pipeUp !== null) {
                this.init(this.winSize.width*3/2,
                    false,
                    pipeUp.spacePositionY);
            } else {
                this.init(this.winSize.width*3/2,
                    true,
                    this.getRandomInt(this.winSize.height - DISTANCE_OF_TWO_PIPES, BASE_HEIGHT + DISTANCE_OF_TWO_PIPES));
            }

        } else {
            this.x = nextX;
        }
    },
    init: function (x, isPipeUp, spacePositionY) {
        this.spacePositionY = spacePositionY;
        if (isPipeUp) {
            this.y = this.spacePositionY - this.height/2 - DISTANCE_OF_TWO_PIPES/2;
        } else {
            this.flippedY = true;
            this.y = this.spacePositionY + this.height/2 + DISTANCE_OF_TWO_PIPES/2;
        }
        this.x = x + this.width/2;
        this.isPassed = false;
        this.isBirdIn = false;
    },
    collideRect: function(x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w/2, y - h/2, w, h);
    },
    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    setIsPassed: function(isPassed) {
        this.isPassed = isPassed;
    },
    checkIsPassed: function() {
        return this.isPassed;
    },
    setIsBirdIn: function(isBirdIn) {
        this.isBirdIn = isBirdIn;
    },
    checkIsBirdIn: function () {
        return this.isBirdIn;
    }
});

Pipe.create = function (x, isPipeUp, spacePositionY) {
    var pipe = new Pipe(x, isPipeUp, spacePositionY);
    g_sharedFlappyBirdGameLayer.addPipe(pipe, 0, 2);
    MW.CONTAINER.PIPES.push(pipe);
    return pipe;
};

Pipe.preSet = function() {
    MW.CONTAINER.PIPES.length = 0;
    var winWidth = cc.director.getWinSize().width;
    var distance = winWidth/2;
    let startHeight = BASE_HEIGHT + 150;
    let step = 50;
    for (var i = 0; i < NUMBER_OF_PIPE_COUPLE; i++) {
        Pipe.create(winWidth + distance*i, true, startHeight + step*i);
        Pipe.create(winWidth + distance*i, false, startHeight + step*i);
    }
};

Pipe.resetToStart = function() {
    let winWidth = cc.director.getWinSize().width;
    let distance = winWidth/2;
    let startHeight = BASE_HEIGHT + 150;
    let step = 50;
    for (var i = 0; i < NUMBER_OF_PIPE_COUPLE; i++) {
        MW.CONTAINER.PIPES[2*i].init(winWidth + distance*i, true, startHeight + step*i);
        MW.CONTAINER.PIPES[2*i+1].init(winWidth + distance*i, false, startHeight + step*i);
    }
};
