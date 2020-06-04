

var HitEffect = cc.Sprite.extend({
    active:true,
    ctor:function () {
        this._super("#hit.png");
        this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
    },
    //Hiệu ứng effect
    reset:function (x, y, rotation) {
        this.stopAllActions();
        //Làm hiệu ứng đạn nổ: scale ảnh từ 0.5 lên 2.5 và fade out ảnh trong 0.3s
        //Add code here
    },
    //Hủy effect
    destroy:function () {
        //Add code here
    }
});

//Lấy và hiển thị effect
HitEffect.getOrCreateHitEffect = function (x, y, rotation) {
    //Add code here
};

//Khởi tạo effect và thêm vào layer game
HitEffect.create = function () {
    //Add code here
};

//Khởi tạo trước list effect
HitEffect.preSet = function () {
    //Add code here
};
