/**
 * Created by kale on 2016/12/1.
 */

var InfoLayer = cc.Layer.extend({
    _roomNum: null,
    _pokeNum: null,
    _roundNum: null,
    _playerNum: null,
    _roundSumNum: null,
    _text1: null,
    _text2: null,
    _ruleLayer: null,
    _defaultMessage: null,
    _otherMessage: null,
    _default_direction: null,

    ctor: function () {
        this._super();
        var roomId = 12345;
        // this.loadLabel(roomId);
        // this.loadText(6,199);
        // this._roomNum.setPosition(cc.p(100,690));
        // this._pokeNum.setPosition(cc.p(100,640));

        this._text1 = new cc.LabelTTF("房号:               (    人 )", "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._text1);
        this._text1.setAnchorPoint(0, 0.5);
        this._text1.setPosition(cc.p(30, 690));

        this._text2 = new cc.LabelTTF("共    圈", "Arial", 24, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        if (Game.playerNum != 4) {
            this._text2.setString("共    把");
        }
        this.addChild(this._text2);
        this._text2.setAnchorPoint(0, 0.5);
        this._text2.setPosition(cc.p(30, 650));
        // this._text2.setVisible(false);

        this._roomNum = new cc.LabelTTF("", "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._roomNum);
        // this._roomNum.setAnchorPoint(0,1);
        this._roomNum.setPosition(cc.p(110, 690));

        this._playerNum = new cc.LabelTTF("", "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._playerNum);
        // this._playerNum.setAnchorPoint(0,1);
        this._playerNum.setPosition(cc.p(170, 690));

        this._roundSumNum = new cc.LabelTTF("", "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._roundSumNum);
        this._roundSumNum.setPosition(cc.p(65, 650));
        // this._roundSumNum.setVisible(false);

        this._text3 = new cc.LabelTTF("剩余：    " + " 张", "Arial", 24, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._text3);
        // this._text3.setAnchorPoint(0,0.5);
        this._text3.setPosition(cc.p(641, 300));
        this._text3.setVisible(false);

        this._pokeNum = new cc.LabelTTF("", "Arial", 24, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._pokeNum);
        this._pokeNum.setVisible(false);
        this._pokeNum.setPosition(cc.p(658, 300));
        this._pokeNum.setColor(cc.color(3, 241, 155));

        this._roundNum = new cc.LabelTTF("第1 " + "/" + " 4圈", "Arial", 24, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._roundNum);
        this._roundNum.setVisible(false);
        this._roundNum.setColor(cc.color(250, 237, 15));

        this._ruleLayer = new cc.Layer();
        this.addChild(this._ruleLayer);


    },
    setDirection: function (direction) {
        this._default_direction = direction;
    },
    loadCardText: function (pokeId) {
        this._pokeNum.setVisible(true);
        this._pokeNum.setString(pokeId);
        this._text3.setVisible(true);

        this._roundNum.setVisible(true);
        this._roundNum.setPosition(cc.p(640, 460));
    },
    startGame: function () {
        this._text2.setVisible(false);
        this._roundSumNum.setVisible(false);
    },
    loadRules: function () {
        var rule = Game.roomInfo;
        var j = 0;

        for (var i = 1; i < 7; i++) {

            if (i <= 3) {
                var sprite;
                if (rule.indexOf(i + "") >= 0) {
                    sprite = new cc.Sprite("#rule_" + i + "_1" + ".png");
                } else {
                    sprite = new cc.Sprite("#rule_" + i + "_0" + ".png");
                }
                this._ruleLayer.addChild(sprite);
                sprite.setPosition(189 + 227 * i, 410);
            } else {
                if (rule.indexOf(i + "") >= 0) {
                    j++;
                    var sprite = new cc.Sprite("#rule_" + i + ".png");
                    this._ruleLayer.addChild(sprite);
                    sprite.setPosition(189 + 227 * j, 330)
                }
            }

        }
        // for (var j = 0; j < rule.length; j++) {
        //
        //     var rules = new cc.Sprite("#rule_" + rule[j] + ".png");
        //     this._ruleLayer.addChild(rules);
        //     switch (j) {
        //         case 0:
        //             x = 416;
        //             y = 410;
        //             break;
        //         case 1:
        //             x = 639;
        //             y = 410;
        //             break;
        //         case 2:
        //             x = 870;
        //             y = 410;
        //             break;
        //         case 3:
        //             x = 416;
        //             y = 330;
        //             break;
        //         case 4:
        //             x = 639;
        //             y = 330;
        //             break;
        //         case 5:
        //             x = 870;
        //             y = 330;
        //             break;
        //
        //     }
        //     rules.setPosition(cc.p(x, y));
        // }
    },
    removeRules: function () {
        this._ruleLayer.removeAllChildren();
    },
    setLabelText: function (roomNum, playerNum, round) {
        this._roomNum.setString(roomNum);
        this._roomNum.setColor(cc.color(245, 201, 8));
        this._playerNum.setString(playerNum);
        this._playerNum.setColor(cc.color(245, 201, 8));
        this._roundSumNum.setString(round);
        this._roundSumNum.setColor(cc.color(245, 201, 8));
    },
    setPokeText: function (text) {
        if (this._pokeNum == null) {
            this.loadCardText(136);
        }
        this._pokeNum.setString(text);
    },
    setRound: function (current, total) {
        if (Game.playerNum == 4) {
            this._roundNum.setString("第 " + current + "/" + total + " 圈");
        } else {
            this._roundNum.setString("第 " + current + "/" + total + " 把");
        }
    },
    loadMessage: function (message) {
        //创建按钮
        this._default_message = new ccui.Button();
        this._default_message.setName("TextButton");
        this._default_message.setTouchEnabled(false);
        this._default_message.loadTextures(res.bubble_1_png, res.bubble_1_png, "");
        this._default_message.setTitleText(message);
        this.addChild(this._default_message);
        // this._default_message.setE
        // var gPosition=this.convertToNodeSpace(cc.p(200,200));
        this._default_message.setPosition(cc.p(200, 200));
        // this.scheduleOnce(this.close, 5);
        this.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(function () {
           this.close();
        }.bind(this))));
        cc.log(message + "loadMessage");
    },
    close: function () {
        var self = this.getParent();
        cc.log("5秒以后执行");
        this.removeChild(this._default_message);
        self._infoLayer.setLabelText("54321");
    },
    loadOtherMessage: function (message, position) {
        var gPosition = null;
        //创建按钮
        this._otherMessage = new ccui.Button();
        this._otherMessage.setName("TextButton");
        this._otherMessage.setTouchEnabled(false);
        this._otherMessage.loadTextures(res.bubble_1_png, res.bubble_1_png, "");
        this._otherMessage.setTitleText(message);
        this.addChild(this._otherMessage);
        // this._default_message.setE
        //根据位置不同设置不同显示位置
        switch (DIRECTION.positionToDirection(position || DIRECTION.RIGHT)) {
            case DIRECTION.UP:
                //上
                gPosition = this.convertToNodeSpace(cc.p(1000, 200));
                break;
            case DIRECTION.LEFT:
                //左
                gPosition = this.convertToNodeSpace(cc.p(200, 600));
                break;
            case DIRECTION.RIGHT:
                //右
                gPosition = this.convertToNodeSpace(cc.p(1000, 600));
                break;
        }
        // var gPosition=this.convertToNodeSpace(cc.p(200,200));
        this._otherMessage.setPosition(gPosition);
        // this.scheduleOnce(this.closeOther, 5);
        this.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(function () {
            this.closeOther();
        }.bind(this))));
        cc.log(message + "loadMessage");
    },
    closeOther: function () {
        cc.log("5秒以后执行");
        this.removeChild(this._otherMessage);
        // self._infoLayer.setLabelText("54321");
    },
    loadPlayImages: function (list) {
        for (var i = 0; i < list.length; i++) {
            var position = list[i];
            //加载图片按钮
            var Image = new cc.Sprite(res.fate_019_png);
            this.addChild(Image);

            var Text = new cc.LabelTTF("姓名：" + list[i], "Arial", 32);
            this.addChild(Text);

            //根据位置不同设置不同显示位置

            switch (position) {
                case DIRECTION.UP:
                    //上
                    var gPosition = cc.p(1100, 650);
                    var gPosition1 = cc.p(1110, 580);
                    break;
                case DIRECTION.DOWN:
                    //下
                    var gPosition = cc.p(100, 200);
                    var gPosition1 = cc.p(110, 130);
                    break;
                case DIRECTION.LEFT:
                    //左
                    var gPosition = cc.p(50, 360);
                    var gPosition1 = cc.p(60, 290);
                    break;
                case DIRECTION.RIGHT:
                    //右
                    var gPosition = cc.p(1200, 360);
                    var gPosition1 = cc.p(1210, 290);
                    break;
            }
            Image.setPosition(gPosition);
            Text.setPosition(gPosition1);
        }
    }

});