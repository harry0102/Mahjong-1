/**
 * Created by foo on 2017/1/19.
 */




var HeadNode = MyNode.extend({
    _dealer_icon: null,
    _ting_icon: null,
    ctor: function (parent, url, callback, callbackTarget) {
        this._super(parent, "#icon_wait.png", callback, callbackTarget);
        url && this.setUrl(url);
    },
    showDealer: function () {
        if (!this._dealer_icon) {
            this._dealer_icon = new cc.Sprite("#icon_zhunag2.png");
            this._dealer_icon.setLocalZOrder(10);
            this.addChild(this._dealer_icon);
        }
        this._dealer_icon.setVisible(true);
    },
    hideDealer: function () {
        this._dealer_icon && this._dealer_icon.setVisible(false);
    },
    showTing: function () {
        if (!this._ting_icon) {
            this._ting_icon = new cc.Sprite("#icon_ting.png");
            this._ting_icon.setLocalZOrder(10);
            this._ting_icon.setPosition(this.width, this.height);
            this.addChild(this._ting_icon);
        }
        this._ting_icon.setVisible(true);
    },
    hideTing: function () {
        this._ting_icon && this._ting_icon.setVisible(false);
    },
    setUrl: function (url) {
        var that = this;
        // url = "http://wx.qlogo.cn/mmopen/aaA5uL8OiaNTpsZhPBW47s5Ll3qFs2obsiciciaFDgcMUjOpgrlCaHwOKPgNaKibCQkPbQQ1rpwMKic4nqG691sXZd5rbyjkCBmuIia/0";
        cc.loader.loadImg(url, {isCrossOrigin: true}, function (err, img) {
            var marker = new cc.Sprite("#icon_wait.png");
            var clipNode = new cc.ClippingNode(marker);
            var sprHead = that.sprHead = new cc.Sprite(img);
            sprHead.setScale(marker.width / sprHead.width);
            clipNode.addChild(sprHead);
            clipNode.setAlphaThreshold(0.05);
            clipNode.setScale(0.945);
            clipNode.setPosition(that.width / 2, that.height / 2);
            clipNode.setLocalZOrder(5);
            that.addChild(clipNode);
        });
    },
    clearUrl: function () {
        this.sprHead && this.sprHead.removeFromParent();
    },
    grey:function () {
        this.sprHead.setColor(cc.color(100,100,100));
    }

});