/**
 * Created by Wasu on 17/1/24.
 */



var PopUpLayer = MyLayer.extend({

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


        this._cancel=new MyNode(this._infoMessage_bg,"#btn_green2.png",function () {
            this._cb1 && this._cb1();
            this.close();
            return false;
        },this);
        this._cancel.setPosition(cc.p(this._infoMessage_bg.width/2+100,this._infoMessage_bg.height / 2 - 45));

        this._enter=new MyNode(this._infoMessage_bg,"#btn_orange2.png",function () {
            this._cb2 && this._cb2();
            this.close();
            return false;
        },this);
        this._enter.setPosition(cc.p(this._infoMessage_bg.width/2-100,this._infoMessage_bg.height / 2 - 45));

        this._infoMessage = new ccui.Text("", "Arial", 27);
        this._infoMessage.setColor(cc.color(0, 0, 0));
        this._infoMessage.setPosition(this._infoMessage_bg.width / 2, this._infoMessage_bg.height / 2 + 30);
        this._infoMessage_bg.addChild(this._infoMessage);

        this._infoMessage1 = new ccui.Text("取消", "Arial", 25);
        // this._infoMessage1.setColor(cc.color(110, 98, 85));
        this._cancel.addChild(this._infoMessage1);
        this._infoMessage1.setPosition(this._cancel.width / 2, this._cancel.height / 2);

        this._infoMessage2 = new ccui.Text("确认", "Arial", 25);
        // this._infoMessage2.setColor(cc.color(110, 98, 85));
        this._enter.addChild(this._infoMessage2);
        this._infoMessage2.setPosition(this._enter.width / 2, this._enter.height / 2);

    },
    onTouchEndEvent: function (target) {
        // cc.log("onTouchEndEvent");
        return false;
    },
    setCallback: function (cb1,cb2) {
        this._cb1 = cb1;
        this._cb2 = cb2;
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
        this._cb1 && this._cb1();
        this._cb2 && this._cb2();
        this._hide();
    },
    close: function () {
        this._hide();
    }
});


var PopUp = {
    show: function (text, callback1,callback2) {
        var currentScene = cc.director.getRunningScene();
        var _popupLayer;
        if (!(_popupLayer = currentScene.popupLayer)) {
            _popupLayer = currentScene.popupLayer = new PopUpLayer();
            currentScene.addChild(_popupLayer, 1000);
        }
        _popupLayer.setCallback(callback1,callback2);
        _popupLayer.setText(text);
    },
    close:function () {
        var currentScene = cc.director.getRunningScene();
        var _popupLayer;
        if ((_popupLayer = currentScene.popupLayer)) {
            _popupLayer.close();
        }
    }
};