/**
 * Created by Wasu on 16/12/23.
 */





var CreateRoomLayer = MyLayer.extend({
    _backGround: null,
    _create: null,
    _textFiled: null,
    _allSelect: null,
    _allCancel: null,
    _textInput: null,
    _twoCheckBox: null,
    _threeCheckBox: null,
    _fourCheckBox: null,
    _gamesCheckBox_8: null,
    _gamesCheckBox_16: null,
    _totalCount: 4,
    _playerNum: 4,
    _checkBoxRule1: null,
    _checkBoxRule2: null,
    _checkBoxRule3: null,
    _checkBoxRule4: null,
    _checkBoxRule5: null,
    _checkBoxRule6: null,
    _gamesNum_8: null,
    _gamesNum_16: null,
    _roomNum: null,
    _selectedGamesNumTarget: null,
    _rules: [],
    _rule: null,
    _password: "",
    _password_bg: null,
    checkBoxs: [],
    texts: [],
    _createText: null,
    _bgFrame: null,
    ctor: function () {
        this._super(this.onTouchEndEvent, this);

        this._bgFrame = new cc.LayerColor(cc.color(0, 0, 0, 153), 1280, 720);
        this.addChild(this._bgFrame);
        this._bgFrame.setPosition(cc.p(0, 0));

        this._backGround = new cc.Sprite(res.bg_create_png);
        this.addChild(this._backGround);
        this._backGround.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        var line = new cc.Sprite("#line_1.png");
        this.addChild(line);
        line.setPosition(cc.p(cc.winSize.width / 2, 503));
        var line = new cc.Sprite("#line_1.png");
        this.addChild(line);
        line.setPosition(cc.winSize.width / 2, 251);

        this.loadCheckBox();
        this.loadTextFiled();
        this.loadButton();

    },
    onTouchEndEvent: function (target) {
        cc.log("touch joinRoom")
        return false;
    },
    loadButton: function () {
        this._close = new MyNode(this, "#icon_close.png", function () {
            this.setPosition(cc.p(2000, 0));
            return false;
        });
        this._close.setPosition(cc.p(1181 + this._close.width / 2, 629 + this._close.height / 2));
        this._create = new MyNode(this, "#btn_orange2.png", function () {
            cc.log("createRoom");

            if (this._rules.length < 1) {
                this._rule = "";
                cc.log("当前规则为空");
            } else {
                this._rule = this._rules.join(",");
                cc.log("当前规则是:" + this._rules.join(","));
            }
            this._totalCount=4;
            Game.op.createRoom(this._rule, this._totalCount+ "", this._playerNum, this._password.getString(), function (data) {
                cc.log(data);
                if (data.stateCode == OpManager.STATECODE.ROOMCARD_NOT_ENOUGH) {
                    cc.log("房卡不足");
                    PopUp.show("您的房卡不足,请充值");
                    this.setVisible(false);
                } else {
                    var d = eval("(" + data.data + ")");
                    Game.roomNum = d.roomNum;
                    Game.playerNum = d.playerNum;
                    // Game.roundNum = data.round;
                    if (Game.playerNum == 4) {
                        Game.roundNum = d.round;
                    } else {
                        Game.roundNum = d.totalCount;
                    }
                    if (d.rule != null) {
                        Game.roomInfo = d.rule;
                    } else {
                        Game.roomInfo = "";
                    }
                    Game.host = 1;
                    Game.roomId = d.id;
                    var _players = d.player;
                    for (var i = 0; i < _players.length; i++) {
                        if (_players[i].id == Game.user.id) {
                            Game.userPosition = _players[i].position;
                        }
                    }
                    try {
                        Cocos2dxBridge.joinChatRoom(Game.roomNum);
                        Utils.runScene(new GameScene(d));
                    } catch (ex) {
                        cc.log(ex);
                    }
                }
            });

        });
        this._create.retain();
        this._create.setPosition(cc.p(512 + this._create.width / 2, 63 + this._create.height / 2));
        this._createText = new cc.LabelTTF("确定", "Arial", 36, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._create.addChild(this._createText);
        this._createText.setPosition(cc.p(this._create.width / 2, this._create.height / 2));
        this._allCancel = new MyNode(this, "#btn_none.png", function () {
            for (var i = 0; i < this.checkBoxs.length - 3; i++) {
                this.checkBoxs[i].setSelected(false);
            }
            this._rules.splice(0, this._rules.length);
            cc.log("规则：" + this._rules);
        });
        this._allCancel.setPosition(757 + this._allCancel.width / 2, 282 + this._allCancel.height / 2);
        this._allCancel.retain();
        this._allSelect = new MyNode(this, "#btn_all.png", function () {
            for (var i = 0; i < this.checkBoxs.length - 3; i++) {
                this.checkBoxs[i].setSelected(true);
            }
            this._rules.splice(0, this._rules.length);
            this._rules.push(OpManager.RULETYPE.BUJIA);
            this._rules.push(OpManager.RULETYPE.SANQIJIA);
            this._rules.push(OpManager.RULETYPE.XIANDA);
            this._rules.push(OpManager.RULETYPE.LOU);
            this._rules.push(OpManager.RULETYPE.FENG);
            this._rules.push(OpManager.RULETYPE.FEI);
            cc.log("规则" + this._rules);
        });
        this._allSelect.setPosition(476 + this._allSelect.width / 2, 282 + this._allSelect.height / 2);
        this._allSelect.retain();
    },
    loadCheckBox: function () {
        var _ruleTexts = [
            {"txt": "不夹不胡", "pos": {"x": 434, "y": 433}},
            {"txt": "三七夹", "pos": {"x": 700, "y": 433}},
            {"txt": "先打后抓", "pos": {"x": 958, "y": 433}},
            {"txt": "漏胡", "pos": {"x": 434, "y": 366}},
            {"txt": "刮大风", "pos": {"x": 700, "y": 366}},
            {"txt": "红中满天飞", "pos": {"x": 958, "y": 366}},
            {"txt": "4人(4圈)", "pos": {"x": 444, "y": 532}},
            {"txt": "3人(20把)", "pos": {"x": 696, "y": 532}},
            {"txt": "2人(26把)", "pos": {"x": 965, "y": 532}},
        ];
        for (var i = 0; i < _ruleTexts.length; i++) {
            var rule = new cc.LabelTTF(_ruleTexts[i].txt, "Arial", 33, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.addChild(rule);
            rule.setPosition(cc.p(_ruleTexts[i].pos.x + rule.width / 2, _ruleTexts[i].pos.y + rule.height / 2));
            rule.setColor(cc.color(143, 121, 89));
            this.texts.push(rule);
        }
        var _checkBoxs = [
            {"tag": OpManager.RULETYPE.BUJIA, "pos": {"x": 371, "y": 421}, "name": "rule"},
            {"tag": OpManager.RULETYPE.SANQIJIA, "pos": {"x": 624, "y": 421}, "name": "rule"},
            {"tag": OpManager.RULETYPE.XIANDA, "pos": {"x": 891, "y": 421}, "name": "rule"},
            {"tag": OpManager.RULETYPE.LOU, "pos": {"x": 371, "y": 358}, "name": "rule"},
            {"tag": OpManager.RULETYPE.FENG, "pos": {"x": 624, "y": 358}, "name": "rule"},
            {"tag": OpManager.RULETYPE.FEI, "pos": {"x": 891, "y": 358}, "name": "rule"},
            {"tag": 4, "pos": {"x": 371, "y": 519}, "name": "playerNum"},
            {"tag": 3, "pos": {"x": 625, "y": 519}, "name": "playerNum"},
            {"tag": 2, "pos": {"x": 891, "y": 519}, "name": "playerNum"},
        ];

        for (var i = 0; i < _checkBoxs.length; i++) {
            var checkBox = new ccui.CheckBox();
            this.addChild(checkBox);
            if (_checkBoxs[i].name == "rule") {
                checkBox.loadTextures("point_grey_2.png", "point_grey_2.png", "point_yellow_2.png", "point_grey_2.png", "point_yellow_2.png", ccui.Widget.PLIST_TEXTURE);

            } else if (_checkBoxs[i].name == "playerNum") {
                checkBox.loadTextures("point_grey_1.png", "point_grey_1.png", "point_yellow_1.png", "point_grey_1.png", "point_yellow_1.png", ccui.Widget.PLIST_TEXTURE);
                if (_checkBoxs[i].tag == 4) {
                    checkBox.setSelected(true);
                }
            }
            checkBox.setName(_checkBoxs[i].name);
            checkBox.setTag(_checkBoxs[i].tag);
            checkBox.setPosition(_checkBoxs[i].pos.x + checkBox.width / 2, _checkBoxs[i].pos.y + checkBox.height / 2);
            checkBox.addEventListener(this.onCheckBoxSelectedEvent, this);
            checkBox.retain();
            this.checkBoxs.push(checkBox);
        }
    },
    onCheckBoxSelectedEvent: function (sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
                if (sender.getName() == "rule") {
                    switch (sender.getTag()) {
                        case OpManager.RULETYPE.BUJIA:
                            this._rules.push(OpManager.RULETYPE.BUJIA);
                            break;
                        case OpManager.RULETYPE.SANQIJIA:
                            this._rules.push(OpManager.RULETYPE.SANQIJIA);
                            break;
                        case OpManager.RULETYPE.XIANDA:
                            this._rules.push(OpManager.RULETYPE.XIANDA);
                            break;
                        case OpManager.RULETYPE.LOU:
                            this._rules.push(OpManager.RULETYPE.LOU);
                            break;
                        case OpManager.RULETYPE.FENG:
                            this._rules.push(OpManager.RULETYPE.FENG);
                            break;
                        case OpManager.RULETYPE.FEI:
                            this._rules.push(OpManager.RULETYPE.FEI);
                            break;
                    }
                    cc.log("当前规则：" + this._rules);
                } else if (sender.getName() == "playerNum") {
                    switch (sender.getTag()) {
                        case 4:
                            this.checkBoxs[this.checkBoxs.length - 3].setTouchEnabled(false);
                            this.checkBoxs[this.checkBoxs.length - 1].setTouchEnabled(true);
                            this.checkBoxs[this.checkBoxs.length - 2].setTouchEnabled(true);
                            this.checkBoxs[this.checkBoxs.length - 1].setSelected(false);
                            this.checkBoxs[this.checkBoxs.length - 2].setSelected(false);
                            this._playerNum = 4;
                            this._totalCount = 4;
                            break;
                        case 3:
                            this.checkBoxs[this.checkBoxs.length - 2].setTouchEnabled(false);
                            this.checkBoxs[this.checkBoxs.length - 1].setTouchEnabled(true);
                            this.checkBoxs[this.checkBoxs.length - 3].setTouchEnabled(true);
                            this.checkBoxs[this.checkBoxs.length - 1].setSelected(false);
                            this.checkBoxs[this.checkBoxs.length - 3].setSelected(false);
                            this._playerNum = 3;
                            this._totalCount = 20;
                            break;
                        case 2:
                            this.checkBoxs[this.checkBoxs.length - 1].setTouchEnabled(false);
                            this.checkBoxs[this.checkBoxs.length - 2].setTouchEnabled(true);
                            this.checkBoxs[this.checkBoxs.length - 3].setTouchEnabled(true);
                            this.checkBoxs[this.checkBoxs.length - 2].setSelected(false);
                            this.checkBoxs[this.checkBoxs.length - 3].setSelected(false);
                            this._playerNum = 2;
                            this._totalCount = 26;
                            break;
                    }
                    cc.log("当前人数：" + this._playerNum);
                }
                break;

            case ccui.CheckBox.EVENT_UNSELECTED:
                cc.log("复选框没选中");
                if (sender.getName() == "rule") {
                    switch (sender.getTag()) {
                        case OpManager.RULETYPE.BUJIA:
                            this._rules.splice(this.getArrayIndex(this._rules, OpManager.RULETYPE.BUJIA), 1);
                            break;
                        case OpManager.RULETYPE.SANQIJIA:
                            this._rules.splice(this.getArrayIndex(this._rules, OpManager.RULETYPE.SANQIJIA), 1);
                            break;
                        case OpManager.RULETYPE.XIANDA:
                            this._rules.splice(this.getArrayIndex(this._rules, OpManager.RULETYPE.XIANDA), 1);
                            break;
                        case OpManager.RULETYPE.LOU:
                            this._rules.splice(this.getArrayIndex(this._rules, OpManager.RULETYPE.LOU), 1);
                            break;
                        case OpManager.RULETYPE.FENG:
                            this._rules.splice(this.getArrayIndex(this._rules, OpManager.RULETYPE.FENG), 1);
                            break;
                        case OpManager.RULETYPE.FEI:
                            this._rules.splice(this.getArrayIndex(this._rules, OpManager.RULETYPE.FEI), 1);
                            break;
                    }
                }
                break;
        }
    },
    loadTextFiled: function () {
        var roomNum = new cc.LabelTTF("人数", "Arial", 38, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(roomNum);
        roomNum.setColor(cc.color(0, 0, 0));
        roomNum.setPosition(cc.p(222 + roomNum.width / 2, 530 + roomNum.height / 2));

        var roomNum2 = new cc.LabelTTF("玩法", "Arial", 38, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(roomNum2);
        roomNum2.setColor(cc.color(0, 0, 0));
        roomNum2.setPosition(cc.p(222 + roomNum2.width / 2, 433 + roomNum2.height / 2));

        var hint = new cc.LabelTTF("房间密码", "Arial", 38, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(hint);
        hint.setColor(cc.color(0, 0, 0));
        hint.setPosition(cc.p(144 + hint.width / 2, 180 + hint.height / 2));
        this._password = new cc.EditBox(cc.size(287, 57), new cc.Scale9Sprite(res.pic_input));
        this._password.setPosition(cc.p(381 + this._password.width / 2, 173 + this._password.height / 2));
        this._password.setFontSize(32);
        this.addChild(this._password, 2);

        var reminder = new ccui.Text("注：开房后若没有开局,不会扣除房卡.", "Arial", 22);
        this.addChild(reminder);
        reminder.setColor(cc.color(145, 96, 82));
        reminder.setPosition(cc.p(687 + reminder.width / 2, 180 + reminder.height / 2));
    },
    onTextFieldEvent: function (textField, type) {
        switch (type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                cc.log("挂载到输入法编辑器");

                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                cc.log("输入法编辑器--失去挂载");
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                cc.log("输入法编辑器--输入:--" + this._password.getString());

                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                cc.log("输入法编辑器--删除");
                break;
        }
    },
    getArrayIndex: function (array, str) {
        if (array.indexOf(str) != -1) {
            return array.indexOf(str);
        } else {
            return null;
        }
    },
    onExit: function () {
        this._rules.splice(0, this._rules.length);
        this.checkBoxs.splice(0, this.checkBoxs.length);
        // this._rule="";
        this._super();
    }
});

