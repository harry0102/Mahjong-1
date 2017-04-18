/**
 * Created by kale on 2017/2/8.
 */
var LabelLayer = MyLayer.extend({

    _hintLayer: null,
    _infoMessage1: null,
    _infoMessage2: null,
    _infoMessage_bg: null,
    _enter_btn: null,
    _cb1: null,
    _cb2: null,
    _cancel:null,
    _enter:null,
    ctor: function () {
        this._super(this.onTouchEndEvent, this);

        this._black = new cc.LayerColor(cc.color(0, 0, 0, 153), 1280, 720);
        this.addChild(this._black);
        // this._black.setPosition(1280, 720);

        this._infoMessage_bg = new cc.Sprite(res.bg_info_png);
        this.addChild(this._infoMessage_bg);
        this._infoMessage_bg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));

        this._infoMessage = new ccui.Text("", "Arial", 22);
        this._infoMessage.setColor(cc.color(0, 0, 0));
        this._infoMessage.setPosition(this._infoMessage_bg.width / 2, this._infoMessage_bg.height / 2 + 50);
        this._infoMessage_bg.addChild(this._infoMessage);


    },
    onTouchEndEvent: function (target) {
        // cc.log("onTouchEndEvent");
        return false;
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
    close: function () {
        this._hide();
    }
});


var EmptyLabel = {
    show: function (text) {
        var currentScene = cc.director.getRunningScene();
        var _labelLayer;
        if (!(_labelLayer = currentScene.labelLayer)) {
            _labelLayer = currentScene.labelLayer = new LabelLayer();
            currentScene.addChild(_labelLayer, 1000);
        }
        _labelLayer.setText(text);
    },
    close:function () {
        var currentScene = cc.director.getRunningScene();
        var _labelLayer;
        if ((_labelLayer = currentScene.labelLayer)) {
            _labelLayer.close();
        }
    }
};