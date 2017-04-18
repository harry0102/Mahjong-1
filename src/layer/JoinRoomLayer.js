/**
 * Created by kale on 2016/12/15.
 */
var JoinRoomLayer = MyLayer.extend({
    _backGround: null,
    _num0: null,
    _num1: null,
    _num2: null,
    _num3: null,
    _num4: null,
    _num5: null,
    _num6: null,
    _num7: null,
    _num8: null,
    _num9: null,
    _roomNums: [],
    _clear: null,
    _del: null,
    _buttons: [],
    _close: null,
    _hintLayer: null,
    _password: "123",
    _infoMessage: null,
    _enter: null,
    _bgFrame: null,
    _roomNum: "",
    bg_Listener: null,

    ctor: function () {
        this._super(this.onTouchEndEvent, this);
        this._bgFrame = new cc.LayerColor(cc.color(0, 0, 0, 153), 1280, 720);
        this.addChild(this._bgFrame);
        this._bgFrame.setPosition(cc.p(0, 0));
        this._backGround = new cc.Sprite(res.bg_search_png);
        this.addChild(this._backGround);
        this._backGround.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this.loadButton();
        this.loadText();
    },

    onTouchEndEvent: function (target) {
        return false;
    },
    loadText: function () {
        var _roomNum = [
            {"roomNum": "一", "pos": {"x": 490, "y": 500}},
            {"roomNum": "一", "pos": {"x": 550, "y": 500}},
            {"roomNum": "一", "pos": {"x": 610, "y": 500}},
            {"roomNum": "一", "pos": {"x": 670, "y": 500}},
            {"roomNum": "一", "pos": {"x": 730, "y": 500}},
            {"roomNum": "一", "pos": {"x": 790, "y": 500}},
        ];

        for (var i = 0; i < _roomNum.length; i++) {
            var roomNum = new ccui.Text(_roomNum[i].roomNum + "", "Arial", 42);
            this.addChild(roomNum);
            roomNum.setColor(cc.color(52, 33, 12));
            roomNum.setPosition(cc.p(_roomNum[i].pos.x, _roomNum[i].pos.y));
            roomNum.retain();
            this._roomNums.push(roomNum);
        }
    },
    loadButton: function () {
        this._close = new MyNode(this, "#icon_close.png", function () {
            this.setPosition(2000, 0);
            this._roomNum = "";
            for (var i = 0; i < this._roomNums.length; i++) {
                this._roomNums[i].setString("一");
            }
        });
        this._close.setPosition(cc.p(960 + this._close.width / 2, 585 + this._close.height / 2));
        var _buttons = [
            {"txt": "0", "pos": {"x": 548, "y": 112}},
            {"txt": "1", "pos": {"x": 341, "y": 351}},
            {"txt": "2", "pos": {"x": 548, "y": 351}},
            {"txt": "3", "pos": {"x": 748, "y": 351}},
            {"txt": "4", "pos": {"x": 341, "y": 274}},
            {"txt": "5", "pos": {"x": 548, "y": 274}},
            {"txt": "6", "pos": {"x": 748, "y": 274}},
            {"txt": "7", "pos": {"x": 341, "y": 194}},
            {"txt": "8", "pos": {"x": 548, "y": 194}},
            {"txt": "9", "pos": {"x": 748, "y": 194}},
            {"txt": "清空", "pos": {"x": 341, "y": 112}},
            {"txt": "删除", "pos": {"x": 748, "y": 112}}
        ];

        for (var i = 0; i < _buttons.length; i++) {

            var tmpButton = _buttons[i];
            var num_bg = new MyNode(this, res.num_bg_png, this.onTouchBegan2);
            num_bg.setPosition(cc.p(tmpButton.pos.x + num_bg.width / 2, tmpButton.pos.y + num_bg.height / 2));
            if (i <= 9) {
                num_bg.setName("" + i);
            } else if (i == 10) {
                num_bg.setName("清空");
            } else if (i == 11) {
                num_bg.setName("删除");
            }
            var numLabel = new ccui.Text(tmpButton.txt, "黑体", 48);
            numLabel.setColor(cc.color(102, 64, 33));
            num_bg.addChild(numLabel);
            numLabel.setPosition(cc.p(num_bg.width / 2, num_bg.height / 2));
            this._buttons.push(numLabel);
        }

    },
    onTouchBegan2: function (target, event) {
        if (target.getName() == "清空") {
            for (var i = 0; i < this._roomNums.length; i++) {
                this._roomNums[i].setString("一");
            }
            this._roomNum = "";
        } else if (target.getName() == "删除") {
            for (var j = this._roomNums.length - 1; j >= 0; j--) {
                if (this._roomNums[j].getString() != "一") {
                    this._roomNums[j].setString("一");
                    break;
                }
            }
        } else {
            for (var i = 0; i < this._roomNums.length; i++) {
                if (this._roomNums[i].getString() == "一") {
                    this._roomNums[i].setString(target.getName());
                    if (i == 5) {
                        this.joinRoom();
                    }
                    break;
                }
            }
        }
        cc.log(this._roomNum);
    },

    joinRoom: function () {
        if (this._roomNum != "") {
            this._roomNum = "";
        }
        for (var i = 0; i < this._roomNums.length; i++) {
            this._roomNum = this._roomNum + this._roomNums[i].getString();
        }
        cc.log("=======" + this._roomNum);
        Game.op.joinRoom(this._roomNum, "", function (data) {
            cc.log(data);
            if (data.stateCode == OpManager.STATECODE.ROOM_UNDEFIND) {
                Message.show("你输入的房间号[" + this._roomNum + "]不存在" + "\n" + "请重新输入！");
                for (var i = 0; i < this._roomNums.length; i++) {
                    this._roomNums[i].setString("一");
                }
                cc.log("房间不存在");
            } else if (data.stateCode == OpManager.STATECODE.ROOMFUlL) {
                Message.show("玩家已满!");
                for (var i = 0; i < this._roomNums.length; i++) {
                    this._roomNums[i].setString("一");
                }
            } else if (data.stateCode == OpManager.STATECODE.ERROR_PASSWORD) {
                this.getParent()._passwordLayer.setPosition(cc.p(0,0));
                this.setPosition(2000, 0);
                cc.log("请输入密码");
            } else {
                var d = eval("(" + data.data + ")");
                Game.roomNum = d.roomNum;
                Game.playerNum = d.playerNum;
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
                Game.host = 0;
                Game.roomId = d.id;
                cc.log(d);
                var _players = d.player;
                for (var i = 0; i < _players.length; i++) {
                    if (_players[i].id == Game.user.id) {
                        Game.userPosition = _players[i].position;
                    }
                }
                try {
                    cc.log(Game.roomNum);
                    Cocos2dxBridge.joinChatRoom(Game.roomNum);
                    Utils.runScene(new GameScene(d));

                } catch (ex) {
                    cc.log(ex);
                }
                for (var i = 0; i < this._roomNums.length; i++) {
                    this._roomNums[i].setString("一");
                }
            }

        }.bind(this));
    },
    onExit: function () {
        this._roomNums.splice(0, this._roomNums.length);
        this._super();
    },

});
