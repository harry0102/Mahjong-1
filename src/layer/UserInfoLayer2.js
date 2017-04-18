/**
 * Created by Wasu on 17/1/24.
 */



var UserInfoLayer2 = MyLayer.extend({

    _hintLayer: null,
    _infoMessage1: null,
    _infoMessage2: null,
    _infoMessage_bg: null,
    _enter_btn: null,
    _cb1: null,
    _cb2: null,
    _cancel: null,
    _icon: null,
    _name: null,
    _ip: null,
    _id: null,
    ctor: function () {
        this._super(this.onTouchEndEvent, this);

        this._infoMessage_bg = new cc.Sprite(res.bg_info_png);
        this.addChild(this._infoMessage_bg);
        this._infoMessage_bg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));

        this._bgFrame = new cc.LayerColor(cc.color(0, 0, 0, 153), 1280, 720);
        this.addChild(this._bgFrame);
        this._bgFrame.setPosition(cc.p(0, 0));

        this._icon = new HeadNode(this, null);
        this._icon.setPosition(cc.p(462, 378));
        this._icon.setScale(1.3);
        this._name = new cc.LabelTTF("243242", "Arial", 35, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._name.setAnchorPoint(cc.p(0, 0));
        this.addChild(this._name);
        this._name.setPosition(cc.p(582, 408));
        // this._name.setColor(cc.color(124, 98, 134));
        this._id = new cc.LabelTTF("ID:123", "Arial", 28, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._id);
        this._id.setAnchorPoint(cc.p(0, 0));
        this._id.setPosition(cc.p(582, 357));
        // this._id.setColor(cc.color(124, 98, 134));
        this._ip = new cc.LabelTTF("IP:134.141.414.14", "Arial", 28, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._ip);
        this._ip.setAnchorPoint(cc.p(0, 0));
        this._ip.setPosition(cc.p(582, 310));
        // this._ip.setColor(cc.color(124, 98, 134));

    },
    onTouchEndEvent: function (target) {
        cc.log("onTouchEndEvent"+target);
        this.close();
        return false;
    },
    setCallback: function (cb1, cb2) {
        this._cb1 = cb1;
        this._cb2 = cb2;
    },
    setText: function (name, id, ip) {
        this._name.setString(name);
        this._id.setString("ID:" + id);
        this._ip.setString("IP:" + ip);
        this._show();
    },
    setImage: function (imgUrl) {
        // if (!imgUrl)return;
        // imgUrl = "http://i3.dpfile.com/pc/50e07f17aeaa6399013cf34d3193b1d9%2880c80%29/thumb.jpg";
        // cc.loader.loadImg(imgUrl, {isCrossOrigin: true}, function (err, img) {
        //     if (err) {
        //         cc.log(err);
        //     }
        //     else {
        //         var img = new cc.Sprite(img);
        //         this._icon.setSpriteFrame(img.getSpriteFrame());
        //         img = null;
        //     }
        // }.bind(this));
        this._icon.setUrl(imgUrl);
    },

    _show: function () {
        this.setVisible(true);
    },
    _hide: function () {
        this.setVisible(false);
    },
    success: function () {
        this._cb1 && this._cb1();
        this._cb2 && this._cb2();
        this._hide();
    },
    close: function () {
        this._hide();
    }
});


var UserInfo2 = {
    show: function (imgUrl, name, id, ip) {
        var currentScene = cc.director.getRunningScene();
        var _userInfoLayer;
        if (!(_userInfoLayer = currentScene._userInfoLayer)) {
            _userInfoLayer = currentScene._userInfoLayer = new UserInfoLayer2();
            currentScene.addChild(_userInfoLayer, 1000);
        }
        _userInfoLayer.setText(name, id, ip);
        _userInfoLayer.setImage(imgUrl);
    }
};