/**
 * Created by Wasu on 17/1/24.
 */



var MessageLayer = MyLayer.extend({

    _hintLayer: null,
    _infoMessage: null,
    _infoMessage_bg: null,
    _enter_btn: null,
    _cb: null,
    ctor: function () {
        this._super(this.onTouchEndEvent, this);

        this._infoMessage_bg = new cc.Sprite(res.bg_info_png);
        this.addChild(this._infoMessage_bg);
        this._infoMessage_bg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));

        this._infoMessage = new ccui.Text("", "", 28);
        this._infoMessage.setColor(cc.color(110, 98, 85));
        this._infoMessage.setPosition(this._infoMessage_bg.width / 2, this._infoMessage_bg.height / 2 + 30);
        this._infoMessage_bg.addChild(this._infoMessage);

        this._enter_btn = new MyNode(this._infoMessage_bg, "#btn_orange1.png", function (target) {
            cc.log("message ok button");
            this._cb && this._cb();
            this.close();
            return false;
        }, this);

        var text = new ccui.Text("确认", "黑体", "32");
        text.setPosition(cc.p(this._enter_btn.width / 2, this._enter_btn.height / 2));
        this._enter_btn.addChild(text);
        this._enter_btn.setPosition(cc.p(this._infoMessage_bg.width / 2, 50));
    },
    onTouchEndEvent: function (target) {
        // cc.log("onTouchEndEvent");
        return false;
    },
    setCallback: function (cb) {
        this._cb = cb;
    },
    setText: function (text) {
        this._infoMessage.setString(text);
        this._show();
    },
    _show: function () {
        this.setVisible(true);
    },
    _hide: function () {
        this.setVisible(false);
    },
    success: function () {
        this._cb && this._cb();
        this._hide();
    },
    close: function () {
        this._hide();
    }
});


var Message = {
    show: function (text, callback) {
        var currentScene = cc.director.getRunningScene();
        var _messageLayer;
        if (!(_messageLayer = currentScene.messageLayer)) {
            _messageLayer = currentScene.messageLayer = new MessageLayer();
            currentScene.addChild(_messageLayer, 1000);
        }

        _messageLayer.setCallback(callback);
        _messageLayer.setText(text);
    }
};