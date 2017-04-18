/**
 * Created by kale on 2017/2/23.
 */

var HelpInfoLayer = MyLayer.extend({
    background: null,

    ctor: function () {
        this._super(this.onTouchEndEvent, this);

        this.background = new MyNode(this, res.bg_help_png, function () {
            return false;
        });

        this.background.setPosition(1050, 475);

        var rule = Game.roomInfo;
        var x, y,k=0;
        var message = "";
        for (var i = 1; i < 7; i++) {
            var text = new cc.LabelTTF("", "Arial", 27, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.background.addChild(text);
            text.setAnchorPoint(0, 0.5);
            if (rule.indexOf(i+"") >= 0) {
                switch (i) {
                    case OpManager.RULETYPE.BUJIA:
                        message = i + ".不夹不胡";
                        k++;
                        break;
                    case OpManager.RULETYPE.SANQIJIA:
                        message = i + ".三七夹";
                        k++;
                        break;
                    case OpManager.RULETYPE.XIANDA:
                        message = i + ".先打后抓";
                        k++;
                        break;
                    case OpManager.RULETYPE.FEI:
                        message = i + ".红中满天飞";
                        k++;
                        break;
                    case OpManager.RULETYPE.FENG:
                        message = i + ".刮大风";
                        k++;
                        break;
                    case OpManager.RULETYPE.LOU:
                        message = i + ".漏胡";
                        k++;
                        break;
                }
            } else {
                switch (i) {
                    case OpManager.RULETYPE.BUJIA:
                        message = i + ".可夹可不夹";
                        k++;
                        break;
                    case OpManager.RULETYPE.SANQIJIA:
                        message = i + ".三七不算夹";
                        k++;
                        break;
                    case OpManager.RULETYPE.XIANDA:
                        message = i + ".先抓后打";
                        k++;
                        break;
                }
            }
            text.setString(message);
            x = 20;
            y = 290 - k * 40;

            text.setPosition(cc.p(x, y));
            if(message == "" || message == null){
                text.removeFromParent();
            }
        }

        this.close();

    },
    onTouchEndEvent: function (target) {
        cc.log("onTouchEndEvent" + target);
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


var HelpInfo = {
    show: function () {
        var currentScene = cc.director.getRunningScene();
        var _helpInfoLayer;
        if (!(_helpInfoLayer = currentScene._helpInfoLayer)) {
            _helpInfoLayer = currentScene._helpInfoLayer = new HelpInfoLayer();
            currentScene.addChild(_helpInfoLayer, 1000);
        }
        // _helpInfoLayer.setText(name, id, ip);
        // _helpInfoLayer.setImage(imgUrl);
    }
};