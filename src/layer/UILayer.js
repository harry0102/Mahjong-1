/**
 * Created by kale on 2016/11/16.
 */

var startBtn;
var head_down_confirm;
var inviteBtn;
var backBtn;

var UILayer = cc.Layer.extend({
    _setBtn: null,
    _chatBtn: null,
    _voiceBtn: null,
    _menuLayer: null,
    _endMenuLayer: null,
    _chatLayer: null,
    _default_message: null,
    _textFiled: null,
    _backBtn: null,
    _releaseBtn: null,
    _inviteBtn: null,
    _startBtn: null,
    _ruleInfo: null,
    _bossLabel: null,
    _help: null,
    _bao: null,
    _fangjianwanfa: null,
    text1: null,
    _signal: null,
    _battery: null,

    _head_up: null,
    _head_down: null,
    _head_left: null,
    _head_right: null,
    _head_up_confirm: null,
    _head_down_confirm: null,
    _head_left_confirm: null,
    _head_right_confirm: null,
    _head_up_gold: null,
    _head_down_gold: null,
    _head_left_gold: null,
    _head_right_gold: null,
    _head_up_name: null,
    _head_down_name: null,
    _head_left_name: null,
    _head_right_name: null,
    _head_up_ting: null,
    _head_down_ting: null,
    _head_left_ting: null,
    _head_right_ting: null,
    _userInfoLayer: null,
    _head_up_voice: null,
    _head_down_voice: null,
    _head_left_voice: null,
    _head_right_voice: null,
    _confirm: null,
    _release: null,
    _maikefeng: null,
    _numFlag: 0,
    img: null,
    heads: [],
    _icon: null,
    _name: null,
    _id: null,
    _ip: null,
    _listener: null,
    _infoBackground: null,
    _bgFrame: null,
    _confirm: null,
    _diamond: null,
    _y_plus: 0,
    _y_label: 0,
    _baoCard: null,


    _head_nodes: [],

    ctor: function () {
        this._super();


        // self = this;
        // this.loadConform1();
        this.loadDiamond();
        //加载音量设置层
        this._menuLayer = new MenuLayer2();
        this.addChild(this._menuLayer, 10);
        // var gPosition=this.convertToNodeSpace(cc.p(640,360));
        this._menuLayer.setPosition(cc.p(6400, 360));
        // this._menuLayer.setVisible(false);
        // this._menuLayer.retain();

        // this.loadBtns();

        //加载聊天按钮
        // this._voiceBtn = new cc.Sprite("#icon_voice.png");
        // this._voiceBtn.setPosition(cc.p(1200, 180));
        // this._voiceBtn.setAnchorPoint(1.2,0.5);
        // this.addChild(this._voiceBtn);

        this._voiceBtn = new VoiceBtn(this, this.onTouchBegan, this);
        this._voiceBtn.setPosition(1200, 180);

        //加载聊天界面
        // this._chatLayer = new ChatLayer();
        // this.addChild(this._chatLayer);
        // this._chatLayer.setPosition(cc.p(6400,3600));

        this._fangjianwanfa = new cc.Sprite("#pic_fangjianwanfa.png");
        this._fangjianwanfa.setPosition(cc.p(640, 500));
        this.addChild(this._fangjianwanfa);

        this._inviteBtn = new MyNode(this, "#btn_green1.png", this.onTouchInvite);
        this._inviteBtn.setPosition(cc.p(640, 170));

        var inviteLabel = new cc.LabelTTF("邀请微信好友", "Arial", 35, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._inviteBtn.addChild(inviteLabel);
        inviteLabel.setPosition(this._inviteBtn.width / 2, this._inviteBtn.height / 2);
        inviteBtn = this._inviteBtn;

        this._startBtn = new MyNode(this, "#btn_orange1.png", this.onTouchStart);
        this._startBtn.setPosition(cc.p(640, 75));
        startBtn = this._startBtn;
        var startLabel = new cc.LabelTTF("开始", "Arial", 35, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._startBtn.addChild(startLabel);
        startLabel.setPosition(this._startBtn.width / 2, this._startBtn.height / 2);

        this._backBtn = new MyNode(this, "#btn_green2.png", this.onTouchBack);
        this._backBtn.setPosition(cc.p(1120, 580));

        var backLabel = new cc.LabelTTF("返回大厅", "Arial", 35, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._backBtn.addChild(backLabel);
        backLabel.setPosition(this._backBtn.width / 2, this._backBtn.height / 2);
        backBtn = this._backBtn;

        // this._maikefeng = new cc.Sprite(res.icon_recorder_png);
        // this.addChild(this._maikefeng);
        // this._maikefeng.setPosition(cc.p(650, 300));
        // this._maikefeng.setVisible(false);

        this._maikefeng = new cc.Sprite();
        this._maikefeng.setPosition(650, 300);
        this.addChild(this._maikefeng, 1);

        var allFrame = [];
        for (var i = 1; i < 4; i++) {
            var str = "speak" + i + ".png";
            var allf = cc.spriteFrameCache.getSpriteFrame(str);//new cc.SpriteFrame()

            if (!allf) {
                cc.log("@@@@@@@");
            }

            allFrame.push(allf);
        }
        var animation = new cc.Animation(allFrame, 0.5);
        var animate =cc.animate(animation);
        var action = animate.repeatForever();
        this._maikefeng.runAction(action);
        this._maikefeng.setVisible(false);

        //头像信息

        this.loadHeads();

        //显示庄精灵
        this._bossLabel = new cc.Sprite("#icon_zhunag2.png");
        this.addChild(this._bossLabel, 2);
        this._bossLabel.setVisible(false);
        this._bossLabel.setPosition(cc.p(7200, 3600));

        //返回大厅
        this._release = new ReleaseLayer();
        this.addChild(this._release, 10000);
        this._release.setPosition(cc.p(6400, 360));
        // this._release.setVisible(false);

        //加载信号
        this._signal = new cc.Sprite("#icon_wifi_3.png");
        this.addChild(this._signal);
        this._signal.setPosition(cc.p(1140, 670));
        this._signal.setVisible(false);

        this._battery = new cc.Sprite("#icon_battery_5.png");
        this.addChild(this._battery);
        this._battery.setPosition(cc.p(1200, 670));
        this._battery.setVisible(false);

        this._currentTime = new cc.LabelTTF("", "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._currentTime);
        this._currentTime.setPosition(1195, 640);
        this._currentTime.setVisible(false);

        var date = new Date();
        this._currentTime.setString(date.getHours() + ":" + date.getMinutes());

    },
    loadHeads: function () {

        this._head_down = new HeadNode(this, null, this.onTouchBeganHead);
        this._head_down.setPosition(cc.p(150, 150));
        this._head_down.setTag(DIRECTION.DOWN);

        this._head_down_voice = new cc.Sprite(res.icon_effect_png);
        this.addChild(this._head_down_voice);
        this._head_down_voice.setPosition(cc.p(210, 150));
        this._head_down_voice.setVisible(false);

        head_down_voice = this._head_down_voice;

        this._head_down_confirm = new cc.Sprite("#icon_ok.png");
        this.addChild(this._head_down_confirm);
        this._head_down_confirm.setPosition(cc.p(250, 150));
        this._head_down_confirm.setVisible(false);
        head_down_confirm = this._head_down_confirm;

        this._head_down_gold = new cc.LabelTTF(0, "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._head_down_name = new cc.LabelTTF(0, "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._head_down_gold);
        this.addChild(this._head_down_name);
        this._head_down_ting = new cc.Sprite("#icon_ting.png");
        this.addChild(this._head_down_ting, 2);
        this._head_down_ting.setPosition(114, 260);
        this._head_down_ting.setVisible(false);

        this._head_up = new HeadNode(this, null, this.onTouchBeganHead); //new MyNode(this,"#icon_wait.png",this.onTouchBeganHead);
        this._head_up.setPosition(cc.p(650, 640));
        this._head_up.setTag(DIRECTION.UP);

        this._head_left = new HeadNode(this, null, this.onTouchBeganHead);
        this._head_left.setPosition(cc.p(150, 350));
        this._head_left.setTag(DIRECTION.LEFT);

        this._head_right = new HeadNode(this, null, this.onTouchBeganHead);//new MyNode(this,"#icon_wait.png",this.onTouchBeganHead);
        this._head_right.setPosition(cc.p(1130, 350));
        this._head_right.setTag(DIRECTION.RIGHT);


        this._head_up_voice = new cc.Sprite(res.icon_effect_png);
        this.addChild(this._head_up_voice);
        this._head_up_voice.setPosition(cc.p(710, 640));

        this._head_left_voice = new cc.Sprite(res.icon_effect_png);
        this.addChild(this._head_left_voice);
        this._head_left_voice.setPosition(cc.p(210, 350));
        this._head_right_voice = new cc.Sprite(res.icon_effect_png);
        this.addChild(this._head_right_voice);
        this._head_right_voice.setPosition(cc.p(1070, 350));
        this._head_up_voice.setVisible(false);
        this._head_left_voice.setVisible(false);
        this._head_right_voice.setVisible(false);

        head_up_voice = this._head_up_voice;
        head_left_voice = this._head_left_voice;
        head_right_voice = this._head_right_voice;

        this._head_up_confirm = new cc.Sprite("#icon_ok.png");
        this.addChild(this._head_up_confirm);
        this._head_up_confirm.setPosition(cc.p(735, 630));
        this._head_up_confirm.setVisible(false);

        this._head_left_confirm = new cc.Sprite("#icon_ok.png");
        this.addChild(this._head_left_confirm);
        this._head_left_confirm.setPosition(cc.p(250, 350));
        this._head_left_confirm.setVisible(false);

        this._head_right_confirm = new cc.Sprite("#icon_ok.png");
        this.addChild(this._head_right_confirm);
        this._head_right_confirm.setPosition(cc.p(1030, 350));
        this._head_right_confirm.setVisible(false);

        this._head_up_gold = new cc.LabelTTF(0, "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._head_left_gold = new cc.LabelTTF(0, "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._head_right_gold = new cc.LabelTTF(0, "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

        this._head_up_name = new cc.LabelTTF(0, "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._head_left_name = new cc.LabelTTF(0, "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._head_right_name = new cc.LabelTTF(0, "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);


        this.addChild(this._head_up_gold);
        this.addChild(this._head_left_gold);
        this.addChild(this._head_right_gold);

        this.addChild(this._head_up_name);
        this.addChild(this._head_left_name);
        this.addChild(this._head_right_name);


        //显示听牌符号
        this._head_up_ting = new cc.Sprite("#icon_ting.png");
        this._head_left_ting = new cc.Sprite("#icon_ting.png");
        this._head_right_ting = new cc.Sprite("#icon_ting.png");

        this.addChild(this._head_up_ting, 2);
        this.addChild(this._head_left_ting, 2);
        this.addChild(this._head_right_ting, 2);

        this._head_up_ting.setPosition(305, 670);
        this._head_left_ting.setPosition(114, 484);
        this._head_right_ting.setPosition(1226, 484);

        this._head_down_ting.setVisible(false);
        this._head_up_ting.setVisible(false);
        this._head_left_ting.setVisible(false);
        this._head_right_ting.setVisible(false);

        this._head_left_gold.setPosition(cc.p(150, 300));
        this._head_left_name.setPosition(cc.p(150, 275));

        this._head_right_gold.setPosition(cc.p(1130, 300));
        this._head_right_name.setPosition(cc.p(1130, 275));

        this._head_up_gold.setPosition(cc.p(650, 590));
        this._head_up_name.setPosition(cc.p(650, 565));

        this._head_down_gold.setPosition(cc.p(150, 100));
        this._head_down_name.setPosition(cc.p(150, 75));

        if (Game.playerNum == 4) {

        } else if (Game.playerNum == 3) {
            this._head_up.setVisible(false);
        } else {
            this._head_right.setVisible(false);
            this._head_left.setVisible(false);
        }

    },
    onTouchBegan: function () {
        cc.log("ontouchbegan   outter");
    },
    startVoice: function () {
        this._maikefeng.setVisible(true);
        Cocos2dxBridge.startVoice(Game.user.id);
    },
    endVoice: function () {
        this._maikefeng.setVisible(false);
        Cocos2dxBridge.endVoice(Game.user.id);
    },
    onTouchStart: function () {
        Game.op.ready(Game.roomId, function (data) {
            cc.log(data);
            cc.log("准备。。。。");
        });

        // this._startBtn.setVisible(false);
        this._startBtn.setPosition(cc.p(1500, 360));
        this._startBtn.setVisible(false);
        // this._startBtn.setTouchEnabled(false);
        this._head_down_confirm.setVisible(true);
    },
    onTouchBack: function () {
        var label;
        if (Game.host == 1) {
            label = "房主离开房间，房间自动解散。\n确认解散？";
        } else if (Game.host == 0) {
            label = "确认离开房间？";
        }
        PopUp.show(label,
            function () {
                cc.log("取消");
            },
            function () {
                cc.log("确认");
                // Game.user=null;
                try {
                    Cocos2dxBridge.quitChatRoom(Game.roomNum);
                    Utils.runScene(new MenuScene());
                }
                catch (ex) {
                    cc.log("_quedinglistener:" + ex);
                }
                // 推出房间调用参数
                Game.op.outRoom(function (data) {
                    cc.log(data);
                    cc.log("退出房间。。。。");
                });
            });
    },
    onTouchInvite: function () {
        cc.log("邀请微信好友");
        Cocos2dxBridge.inivteWX(Game.roomNum,Game.roundNum,Game.roomInfo.toString());
    },
    _clickBack: function () {
        cc.log("click");
    },
    loadDiamond: function () {
        this._diamond = new cc.Sprite("#icon_diamond.png");
        this.addChild(this._diamond, 10);
        this._diamond.setAnchorPoint(0.5, 1);
        this._diamond.setPosition(12000, 888);
        this.scheduleUpdate();

    },
    setDiamondPosition: function (pos) {
        this._diamond.setPosition(pos);
        this._y_label = 0;
        this._y_plus = 0;
    },
    loadConform1: function () {
        this._confirm1 = new cc.LayerColor(cc.color(0, 0, 0, 153), 1280, 720);
        this.addChild(this._confirm1, 99);
        this._confirm1.setPosition(1280, 720);

        var back = new cc.Sprite(res.bg_info_png);
        this._confirm1.addChild(back);
        back.setPosition(this._confirm1.width / 2, this._confirm1.height / 2);

        var label = new cc.LabelTTF("", "Arial", 22, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        if (Game.host == 1) {
            label.setString("房主离开房间，房间自动解散\n确认解散？");
        } else {
            label.setString("确认离开房间？");
        }
        this._confirm1.addChild(label);
        label.setColor(cc.color(0, 0, 0));
        label.setPosition(this._confirm1.width / 2, this._confirm1.height / 2 + 30);

        // var queding=new cc.MenuItemImage("#btn_orange2.png","#btn_orange2.png",this._clickBack);
        var queding = new cc.Sprite("#btn_orange2.png");
        var label1 = new cc.LabelTTF("确认", "Arial", 22, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        queding.addChild(label1);
        label1.setPosition(queding.width / 2, queding.height / 2);
        // var quxiao=new cc.MenuItemImage("#btn_green2.png","#btn_green2.png",this._clickBack);
        var quxiao = new cc.Sprite("#btn_green2.png");
        var label2 = new cc.LabelTTF("取消", "Arial", 22, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        quxiao.addChild(label2);
        label2.setPosition(quxiao.width / 2, quxiao.height / 2);
        this._confirm1.addChild(queding);
        this._confirm1.addChild(quxiao);
        queding.setPosition(this._confirm1.width / 2 - 100, this._confirm1.height / 2 - 30);
        quxiao.setPosition(this._confirm1.width / 2 + 100, this._confirm1.height / 2 - 30);

        var _quedinglistener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.height);
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                // Utils
                // cc.director.runScene(new cc.TransitionFade(0.5, new MenuScene()));
                try {
                    Cocos2dxBridge.quitChatRoom(Game.roomNum);
                    Utils.runScene(new MenuScene());
                }
                catch (ex) {
                    cc.log("_quedinglistener:" + ex);
                }
                // 推出房间调用参数
                Game.op.outRoom(function (data) {
                    cc.log(data);
                    cc.log("退出房间。。。。");
                });


                // if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                //     var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "quitChatRoom", "(Ljava/lang/String;)V", Game.roomNum);
                // }
            }.bind(this)
        });
        var _quxiaolistener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.height);
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                this._confirm1.setPosition(1280, 720);
            }.bind(this)
        });
        cc.eventManager.addListener(_quedinglistener, queding);
        cc.eventManager.addListener(_quxiaolistener, quxiao);
    },
    onRoomCheckBoxSelectedEvent: function (sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
                if (sender == this._dialect) {
                    this._language.setSelected(false);

                } else if (sender == this._language) {
                    this._dialect.setSelected(false);
                }
                cc.log("复选框选中");

                break;
            case ccui.CheckBox.EVENT_UNSELECTED:
                cc.log("复选框没选中");
                break;
            default:
                break;
        }
    },
    loadExit: function (d) {
        this._release.setPosition(0, 0);
        this._release.setData(d);
    },
    loadWait: function (d) {
        var label;
        var members = Game.players;
        if (d.state == OpManager.ROOMSTATE.PRERELEASE) {
            for (var i = 0; i < d.isDissolution.length; i++) {
                if (d.applyDissolution == members[i].position) {
                    label = "玩家" + members[i].name + "发起解散申请，是否同意解散？";
                }
            }
            for (var j = 0; j < d.isDissolution.length; j++) {
                if (Game.userPosition == members[j].position) {
                    if (d.isDissolution[j] == 1) {
                        Game.op._roomScene._UILayer._menuLayer.loadWait();
                    } else if (d.isDissolution[j] == 0) {
                        PopUp.show(label, function () {
                            cc.log("cancle");
                            Game.op.releaseRoom(0, function (data) {
                                cc.log(data);
                                cc.log("不同意解散房间。。。。");
                            });
                            PopUp.close();
                        }, function () {
                            cc.log("sure");
                            Game.op.releaseRoom(1, function (data) {
                                cc.log(data);
                                cc.log("同意解散房间。。。。");
                            });
                        });
                    }
                }
            }

        } else if (d.state == OpManager.ROOMSTATE.RELEASE) {
            Cocos2dxBridge.quitChatRoom(Game.roomNum);
            Utils.runScene(new MenuScene());
            cc.log("done");
        } else {
            PopUp.close();
            EmptyLabel.close();
            cc.log("normal");
        }
    },

    update: function (dt) {
        // if (this.numFlag > 0) {
        //     if (this.times++ > 60) {
        //         this._text_clock.setString(this.numFlag--);
        //         this.times = 0;
        //     }
        // } else {
        //     this._confirm.setVisible(false);
        // }

        if (this._y_label == 0) {
            if (this._y_plus < 30) {
                this._diamond.y += 1;
                this._y_plus++;
            } else {
                this._y_label = 1;
            }
        } else if (this._y_label == 1) {
            if (this._y_plus >= 0) {
                this._diamond.y -= 1;
                this._y_plus--;
            } else {
                this._y_label = 0;
            }
        }
    },
    loadMessage: function (message) {
        var that = this.getParent();
        that._infoLayer.loadMessage(message);
        that._infoLayer.setDirection(0);
        that._infoLayer.loadOtherMessage("其他人说的话", 1);
        cc.log(message + "loadMessage");
    },
    loadTwoBtns: function () {

        cc.log("loading two button..");

        this._releaseBtn = new cc.LabelTTF("解散房间", "解散房间", 40, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._releaseBtn);
        this._releaseBtn.setPosition(cc.p(11200, 100));
        this._releaseBtn.setVisible(false);

        this._confirm = new cc.Layer();
        this.addChild(this._confirm, 20);
        // this._confirm.setPosition(6400,360);
        this._confirm.setVisible(false);

        var back = new cc.Sprite(res.bg_input_png);
        this._confirm.addChild(back);
        back.setPosition(cc.p(640, 360));

        var text1 = new cc.LabelTTF("确定", "确定", 40, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        text1.setPosition(cc.p(520, 250));
        this._confirm.addChild(text1);

        var text2 = new cc.LabelTTF("取消", "取消", 40, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        text2.setPosition(cc.p(760, 250));
        this._confirm.addChild(text2);

        var text3 = new cc.LabelTTF("解散房间", "解散房间", 40, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        text3.setPosition(cc.p(640, 500));
        this._confirm.addChild(text3);

        var text4 = new cc.LabelTTF("您未开始一局比赛，解散房间不扣房卡，是否解散？", "您未开始一局比赛，解散房间不扣房卡，是否解散？", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        text4.setPosition(cc.p(760, 400));
        this._confirm.addChild(text4);


        var _cancleListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.width);
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                this._confirm.setPosition(6400, 360);

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });


        var _releaseListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.width);
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                this._confirm.setPosition(0, 0);

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        // var self = this;
        var _text1Listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.width);
                if (!(cc.rectContainsPoint(rect, posInNode)) || !self._confirm.isVisible()) {
                    return false;
                }

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                cc.director.runScene(new cc.TransitionFade(0.5, new MenuScene()));

                Game.op.releaseRoom(1, function (data) {
                    cc.log(data);
                    cc.log("解散房间。。。。");
                });
                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });

        //加载设置按钮事件
        // cc.eventManager.addListener(_releaseListener, this._releaseBtn);
        cc.eventManager.addListener(_cancleListener, text2);
        cc.eventManager.addListener(_text1Listener, text1);


    },
    showTwoBtns: function () {
        this._releaseBtn.setPosition(1120, 100);
    },
    setBao: function (card) {
        // var type = Card.TYPE.HAND_UP;
        // var img=new cc.Sprite("#mm_"+card+".png");
        // this._baoCard.setSpriteFrame(img.getSpriteFrame());
        this._bao = new DownCard(this, card, Card.TYPE.ORIGIN_DOWN_HAND);
        this._bao.setPosition(cc.p(80,610));
        this._bao.wait();

    },
    restrtGame:function () {
        this._head_down_confirm.setVisible(false);
        this._head_up_confirm.setVisible(false);
        this._head_right_confirm.setVisible(false);
        this._head_left_confirm.setVisible(false);
    },
    startGame: function () {

        if (this._backBtn.x == 1120) {
            this._backBtn.x = 11200;
        }
        if (this._startBtn.x == 640) {
            this._startBtn.x = 12000;
        }

        this._fangjianwanfa.setVisible(false);
        this._bossLabel.setVisible(true);
        this.getParent()._infoLayer.removeRules();

        this._head_down_confirm.setVisible(false);
        var action_down = cc.moveTo(0.1, cc.p(84, 220));
        var action_down_name = cc.moveTo(0.1, cc.p(84, 150));
        var action_down_voice = cc.moveTo(0.1, cc.p(144, 220));
        var action_down_gold = cc.moveTo(0.1, cc.p(84, 168));
        this._head_down.runAction(action_down);
        this._head_down_gold.runAction(action_down_gold);
        this._head_down_name.runAction(action_down_name);
        this._head_down_voice.runAction(action_down_voice);

        this._head_up_confirm.setVisible(false);
        this._head_right_confirm.setVisible(false);
        this._head_left_confirm.setVisible(false);

        var action_up = cc.moveTo(0.1, cc.p(275, 630));
        var action_left = cc.moveTo(0.1, cc.p(84, 444));
        var action_right = cc.moveTo(0.1, cc.p(1196, 444));

        var action_up_name = cc.moveTo(0.1, cc.p(270, 560));
        var action_left_name = cc.moveTo(0.1, cc.p(84, 374));
        var action_right_name = cc.moveTo(0.1, cc.p(1200, 374));

        var action_up_gold = cc.moveTo(0.1, cc.p(270, 579));
        var action_left_gold = cc.moveTo(0.1, cc.p(84, 392));
        var action_right_gold = cc.moveTo(0.1, cc.p(1200, 392));

        var action_up_voice = cc.moveTo(0.1, cc.p(335, 630));
        var action_left_voice = cc.moveTo(0.1, cc.p(144, 444));
        var action_right_voice = cc.moveTo(0.1, cc.p(1136, 444));

        this._head_up.runAction(action_up);
        this._head_left.runAction(action_left);
        this._head_right.runAction(action_right);
        this._head_up_gold.runAction(action_up_gold);
        this._head_left_gold.runAction(action_left_gold);
        this._head_right_gold.runAction(action_right_gold);
        this._head_up_name.runAction(action_up_name);
        this._head_left_name.runAction(action_left_name);
        this._head_right_name.runAction(action_right_name);
        this._head_up_voice.runAction(action_up_voice);
        this._head_left_voice.runAction(action_left_voice);
        this._head_right_voice.runAction(action_right_voice);

        if (Game.playerNum == 4) {

        } else if (Game.playerNum == 3) {
            // this._head_right_confirm.setVisible(false);
            // this._head_left_confirm.setVisible(false);
            //
            // var action_left = cc.moveTo(0.1, cc.p(84, 444));
            // var action_right = cc.moveTo(0.1, cc.p(1196, 444));
            //
            // var action_left_name = cc.moveTo(0.1, cc.p(84, 374));
            // var action_right_name = cc.moveTo(0.1, cc.p(1200, 374));
            //
            // var action_left_gold = cc.moveTo(0.1, cc.p(84, 392));
            // var action_right_gold = cc.moveTo(0.1, cc.p(1200, 392));
            //
            // var action_left_voice = cc.moveTo(0.1, cc.p(144, 444));
            // var action_right_voice = cc.moveTo(0.1, cc.p(1136, 444));
            //
            // this._head_left.runAction(action_left);
            // this._head_right.runAction(action_right);
            // this._head_left_gold.runAction(action_left_gold);
            // this._head_right_gold.runAction(action_right_gold);
            // this._head_left_name.runAction(action_left_name);
            // this._head_right_name.runAction(action_right_name);
            // this._head_left_voice.runAction(action_left_voice);
            // this._head_right_voice.runAction(action_right_voice);
        } else {
            // this._head_up_confirm.setVisible(false);
            // var action_up = cc.moveTo(0.1, cc.p(275, 630));
            // var action_up_name = cc.moveTo(0.1, cc.p(270, 560));
            // var action_up_gold = cc.moveTo(0.1, cc.p(270, 579));
            // var action_up_voice = cc.moveTo(0.1, cc.p(335, 630));
            // this._head_up.runAction(action_up);
            // this._head_up_gold.runAction(action_up_gold);
            // this._head_up_name.runAction(action_up_name);
            // this._head_up_voice.runAction(action_up_voice);

        }

        var action_signal = cc.moveTo(0.1, cc.p(1040, 670));
        var action_battery = cc.moveTo(0.1, cc.p(1110, 670));
        var action_currentTime = cc.moveTo(0.1, cc.p(1110, 640));

        // this._bossLabel.runAction(action_boss);
        this._signal.runAction(action_signal);
        this._battery.runAction(action_battery);
        this._currentTime.runAction(action_currentTime);

        //去掉邀请好友按钮
        this._inviteBtn.setVisible(false);

        //加载宝牌
        // this._bao = new cc.Sprite("#k_yellow.png");
        // this.addChild(this._bao);
        // this._bao.setPosition(cc.p(80, 610));
        //
        // this._baoCard = new cc.Sprite("#mf_bao.png");
        // this._bao.addChild(this._baoCard);
        // this._baoCard.setPosition(this._bao.width / 2, this._bao.height / 2);

        //加载设置按钮
        this._setBtn = new MyNode(this, "#icon_setup.png", this.onTouchSetup);

        // this._setBtn = new cc.Sprite("#icon_setup.png");
        this._setBtn.setPosition(cc.p(1197.5, 660));
        // this.addChild(this._setBtn);

        //加载帮助按钮
        this.loadHelp();

        //info
        this.getParent()._infoLayer.startGame();

        //加载聊天按钮
        this._chatBtn = new MyNode(this, "#icon_chat.png", this.onTouchChat);

        // this._chatBtn = new cc.Sprite("#icon_chat.png");
        this._chatBtn.setPosition(cc.p(1200, 260));
        // this._chatBtn.setAnchorPoint(1.2,0.5);
        // this.addChild(this._chatBtn);

        //加载聊天界面
        this._chatLayer = new ChatLayer();
        this.addChild(this._chatLayer,20);
        this._chatLayer.setPosition(cc.p(9000, 390));

        // this._bao.setVisible(true);

        var _setupListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.width);
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                this._menuLayer.setPosition(0, 0);
                // Sound.playBackgroundMusic();
                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });

        var _chatListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.width);
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();


            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                //加载聊天界面
                // this._chatLayer=new ChatLayer();
                // this.addChild(this._chatLayer);
                // var gPosition=this.convertToNodeSpace(cc.p(640,360));
                // this._chatLayer.setPosition(gPosition);
                // this._chatLayer.setExit(this.loadMessage.bind(this));
                // this._chatLayer.setPosition(640,360);
                if (this._chatLayer.x == 9000) {
                    this._chatLayer.setPosition(900, 390);
                } else {
                    this._chatLayer.setPosition(9000, 390);
                }

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        // cc.eventManager.addListener(_setupListener, this._setBtn);

        // cc.eventManager.addListener(_chatListener, this._chatBtn);

    },
    onTouchSetup: function () {
        this._menuLayer.setPosition(0, 0);
    },
    onTouchChat: function () {
        // if(!this._chatLayer){
        //     this._chatLayer = new ChatLayer(this);
        //     this.addChild(this._chatLayer);
        //     this._chatLayer.setPosition(cc.p(900, 390));
        // }
        if (this._chatLayer.x == 9000) {
            this._chatLayer.setPosition(900, 390);
        } else {
            this._chatLayer.setPosition(9000, 390);
        }
        // if (this._chatLayer.isVisible()) {
        //     this._chatLayer.setVisible(false);
        // } else {
        //     this._chatLayer.setVisible(true);
        // }
    },
    setZhuang: function (position) {
        switch (DIRECTION.positionToDirection(position)) {
            case DIRECTION.UP:
                //up
                this._bossLabel.setPosition(cc.p(245, 600));
                break;
            case DIRECTION.DOWN:
                //down
                this._bossLabel.setPosition(cc.p(54, 190));
                // action_boss=new cc.moveTo(0.1,cc.p(54,190));
                break;
            case DIRECTION.LEFT:
                //left
                this._bossLabel.setPosition(cc.p(54, 414));
                // action_boss=new cc.moveTo(0.1,cc.p(54,190));
                break;
            case DIRECTION.RIGHT:
                //right
                this._bossLabel.setPosition(cc.p(1166, 414));
                // action_boss=new cc.moveTo(0.1,cc.p(1166,414));
                break;
        }
    },
    onTouchHelp: function () {
        // if (this._helpInfo.x == 1050) {
        //     this._helpInfo.setPosition(10500, 475);
        // } else {
        //     this._helpInfo.setPosition(1050, 475);
        // }
        if (this._helpInfo.isVisible()) {
            this._helpInfo.setVisible(false);
        } else {
            this._helpInfo.setVisible(true);
        }
    },
    loadHelp: function () {
        //加载帮助按钮
        this._help = new MyNode(this, "#icon_help.png", this.onTouchHelp);

        // this._help = new cc.Sprite("#icon_help.png");
        // this.addChild(this._help);
        this._help.setPosition(cc.p(1197.5, 580));

        this._helpInfo = new HelpInfoLayer();
        this.addChild(this._helpInfo);
        var _helpListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.width);
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();


            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                //加载聊天界面
                if (this._helpInfo.x == 1050) {
                    this._helpInfo.setPosition(10500, 475);
                } else {
                    this._helpInfo.setPosition(1050, 475);
                }

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        // cc.eventManager.addListener(_helpListener, this._help);

        // this._helpInfo = new cc.Sprite(res.bg_help_png);
        // this.addChild(this._helpInfo);
        // this._helpInfo.setPosition(10500, 475);
        //
        // var rule = Game.roomInfo;
        // var x, y;
        // var message = "";
        // for (var j = 0; j < rule.length; j++) {
        //     var text = new cc.LabelTTF("", "Arial", 27, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        //     this._helpInfo.addChild(text);
        //     // text.setColor(cc.color(243, 191, 148));
        //     text.setAnchorPoint(0, 0.5);
        //     switch (parseInt(rule[j])) {
        //         case OpManager.RULETYPE.BUJIA:
        //             message = (j + 1) + ".不夹不胡";
        //             break;
        //         case OpManager.RULETYPE.FEI:
        //             message = (j + 1) + ".红中满天飞";
        //             break;
        //         case OpManager.RULETYPE.FENG:
        //             message = (j + 1) + ".刮大风";
        //             break;
        //         case OpManager.RULETYPE.LOU:
        //             message = (j + 1) + ".漏胡";
        //             break;
        //         case OpManager.RULETYPE.SANQIJIA:
        //             message = (j + 1) + ".三七夹";
        //             break;
        //         case OpManager.RULETYPE.XIANDA:
        //             message = (j + 1) + ".先打后抓";
        //             break;
        //     }
        //     text.setString(message);
        //     x = 20;
        //     y = 250 - j * 40;
        //
        //     text.setPosition(cc.p(x, y));
        //
        // }

    },
    loadPlayer: function (data) {
        this.initPlayer();

        var players = data.player;
        for (var i = 0; i < players.length; i++) {

            switch (DIRECTION.positionToDirection(players[i].position || DIRECTION.DOWN)) {
                case DIRECTION.UP:
                    //上
                    this._head_up_gold.setString(players[i].id + "");
                    // this._head_up_gold.setPosition(cc.p(650, 590));
                    this._head_up_name.setString(players[i].name);
                    // this._head_up_name.setPosition(cc.p(650, 565));

                    // var headNode = gg.headNode = new HeadNode("#icon_wait.png");
                    // headNode.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
                    // this.addChild(headNode);

                    this._head_up.setUrl(players[i].face);

                    // this.loadImgFromUrl(this, players[i].face, this._head_up);
                    // this._head_up.loadTextures(res.icon_head1_png, res.icon_head1_png, "");
                    if (players[i].state == 1) {
                        this._head_up_confirm.setVisible(true);
                    }

                    // if (data.adminId == players[i].id) {
                    //     this._bossLabel.setPosition(cc.p(620, 610));
                    //     this._bossLabel.setVisible(true);
                    // }
                    break;
                case DIRECTION.DOWN:
                    //下
                    this._head_down_gold.setString(Game.user.id + "");
                    // this._head_down_gold.setPosition(cc.p(150, 100));
                    this._head_down_name.setString(Game.user.name);
                    // this._head_down_name.setPosition(cc.p(150, 75));
                    this._head_down.setUrl(players[i].face);

                    // this.loadImgFromUrl(this, players[i].face, this._head_down);
                    // this._head_down.loadTextures(res.icon_head1_png,res.icon_head1_png,"");
                    if (players[i].state == 1) {
                        this._head_down_confirm.setVisible(true);
                    }

                    // if (data.adminId == players[i].id) {
                    //     this._bossLabel.setPosition(cc.p(120, 120));
                    //     this._bossLabel.setVisible(true);
                    // }
                    break;
                case DIRECTION.LEFT:
                    //左
                    this._head_left_gold.setString(players[i].id + "");
                    // this._head_left_gold.setPosition(cc.p(150, 300));
                    this._head_left_name.setString(players[i].name);
                    // this._head_left_name.setPosition(cc.p(150, 275));
                    this._head_left.setUrl(players[i].face);

                    // this.loadImgFromUrl(this, players[i].face, this._head_left);
                    // this._head_left.loadTextures(res.icon_head1_png, res.icon_head1_png, "");
                    if (players[i].state == 1) {
                        this._head_left_confirm.setVisible(true);
                    }
                    // if (data.adminId == players[i].id) {
                    //     this._bossLabel.setPosition(cc.p(120, 320));
                    //     this._bossLabel.setVisible(true);
                    // }
                    break;
                case DIRECTION.RIGHT:
                    //右
                    this._head_right_gold.setString(players[i].id + "");
                    // this._head_right_gold.setPosition(cc.p(1130, 300));
                    this._head_right_name.setString(players[i].name);
                    // this._head_right_name.setPosition(cc.p(1130, 275));
                    this._head_right.setUrl(players[i].face);
                    // this.loadImgFromUrl(this, players[i].face, this._head_right);
                    // this._head_right.loadTextures(res.icon_head1_png, res.icon_head1_png, "");
                    if (players[i].state == 1) {
                        this._head_right_confirm.setVisible(true);
                    }

                    // if (data.adminId == players[i].id) {
                    //     this._bossLabel.setPosition(cc.p(1100, 320));
                    //     this._bossLabel.setVisible(true);
                    // }
                    break;
            }
        }
    },
    loadConfirm: function (data) {
        var players = data.player;
        for (var i = 0; i < players.length; i++) {

            switch (DIRECTION.positionToDirection(players[i].position || DIRECTION.DOWN)) {
                case DIRECTION.UP:
                    //上
                    // this._head_up.loadTextures(res.icon_head1_png, res.icon_head1_png, "");
                    this._head_up_confirm.setVisible(true);
                    break;
                case DIRECTION.DOWN:
                    //下
                    // this._head_down.loadTextures(res.icon_head1_png,res.icon_head1_png,"");
                    this._head_down_confirm.setVisible(true);
                    break;
                case DIRECTION.LEFT:
                    //左
                    // this._head_left.loadTextures(res.icon_head1_png, res.icon_head1_png, "");
                    this._head_left_confirm.setVisible(true);
                    break;
                case DIRECTION.RIGHT:
                    //右
                    // this._head_right.loadTextures(res.icon_head1_png, res.icon_head1_png, "");
                    this._head_right_confirm.setVisible(true);
                    break;
            }
        }

    },
    loadImgFromUrl: function (Context, imgUrl, userIcon) {
        if (!imgUrl)return;
        imgUrl = "http://i3.dpfile.com/pc/50e07f17aeaa6399013cf34d3193b1d9%2880c80%29/thumb.jpg";
        cc.loader.loadImg(imgUrl, {isCrossOrigin: true}, function (err, img) {
            if (err) {
                cc.log(err);
            }
            else {
                var img = new cc.Sprite(img);
                userIcon.setSpriteFrame(img.getSpriteFrame());
                img = null;
            }
        });
    },

    initPlayer: function (data) {
        // this._head_up.setTexture("icon_wait.png");
        // this._head_up_gold.setString(0);
        // this._head_up_name.setString(0);
        if (this._head_up != null) {
            this._head_up.clearUrl();
            this._head_up_gold.setString("");
            this._head_up_name.setString("");
            this._head_up_confirm.setVisible(false);

        }

        if (this._head_down != null) {
            this._head_down.clearUrl();
            this._head_down_gold.setString("");
            this._head_down_name.setString("");
            this._head_down_confirm.setVisible(false);

        }
        if (this._head_left != null) {
            this._head_left.clearUrl();
            this._head_left_gold.setString("");
            this._head_left_name.setString("");
            this._head_left_confirm.setVisible(false);

        }
        if (this._head_right != null) {
            this._head_right.clearUrl();
            this._head_right_gold.setString("");
            this._head_right_name.setString("");
            this._head_right_confirm.setVisible(false);

        }
    },

    loadTing: function (data) {
        // cc.director.pause();
        var position = 0;
        for (var i = 0; i < data.tipInfos.length; i++) {
            if (data.tipInfos[i].cards[0].cards.length == 3) {
                position = data.tipInfos[i].position;
            }

        }
        switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
            case DIRECTION.UP:
                //上
                this._head_up_ting.setVisible(true);
                break;
            case DIRECTION.DOWN:
                //下
                this._head_down_ting.setVisible(true);
                break;
            case DIRECTION.LEFT:
                //左
                this._head_left_ting.setVisible(true);
                break;
            case DIRECTION.RIGHT:
                //右
                this._head_right_ting.setVisible(true);
                break;
        }
    },


    loadTing1: function (data) {
        var position = data.tipInfos[0].position;

        switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
            case DIRECTION.UP:
                //上
                this._head_up_ting.setVisible(true);
                break;
            case DIRECTION.DOWN:
                //下
                this._head_down_ting.setVisible(true);
                break;
            case DIRECTION.LEFT:
                //左
                this._head_left_ting.setVisible(true);
                break;
            case DIRECTION.RIGHT:
                //右
                this._head_right_ting.setVisible(true);
                break;
        }
    },

    loadPlayer1: function (position) {

        switch (position) {
            case DIRECTION.UP:
                //上
                this._head_up.setTexture(res.icon_head_png);
                this.loadImgFromUrl(this, Game.user.face, this._head_up);
                this._head_up_confirm.setVisible(true);

                break;
            case DIRECTION.DOWN:
                //下
                this._head_down_gold.setString(Game.user.id + "");
                this._head_down_gold.setPosition(cc.p(150, 100));
                this._head_down_name.setString(Game.user.name);
                this._head_down_name.setPosition(cc.p(150, 75));
                this._head_down.setUrl(Game.user.face);
                // this.loadImgFromUrl(this, Game.user.face, this._head_down);

                // this._head_down_confirm.setVisible(true);
                break;
            case DIRECTION.LEFT:
                //左
                // this.loadImgFromUrl(this,Game.user.face,this._head_);
                this._head_down_confirm.setVisible(true);
                break;
            case DIRECTION.RIGHT:
                //右
                // this.loadImgFromUrl(this,Game.user.face,this._head_right);
                this._head_down_confirm.setVisible(true);
                break;
        }

    },

    onTouchBeganHead: function (target, event) {
        cc.log(target.getTag());
        switch (target.getTag()) {
            case DIRECTION.UP:
                for (var i = 0; i < Game.players.length; i++) {
                    if (DIRECTION.positionToDirection(Game.players[i].position) == DIRECTION.UP) {
                        // this._name.setString(Game.players[i].wId);
                        // this._id.setString("ID：" + Game.players[i].id);
                        // this._ip.setString("IP：" + Game.players[i].loginIp);
                        // this.loadImgFromUrl(this, Game.players[i].face, this._icon);
                        // this._bgFrame.setVisible(true);
                        // this._userInfoLayer.setVisible(true);
                        UserInfo2.show(Game.players[i].face, Game.players[i].name, Game.players[i].id, Game.players[i].loginIp);
                    }
                }

                break;
            case DIRECTION.DOWN:
                for (var i = 0; i < Game.players.length; i++) {
                    if (DIRECTION.positionToDirection(Game.players[i].position) == DIRECTION.DOWN) {
                        // this._name.setString(Game.players[i].wId);
                        // this._id.setString("ID：" + Game.players[i].id);
                        // this._ip.setString("IP：" + Game.players[i].loginIp);
                        // this.loadImgFromUrl(this, Game.players[i].face, this._icon);
                        // this._bgFrame.setVisible(true);
                        // this._userInfoLayer.setVisible(true);
                        UserInfo2.show(Game.players[i].face, Game.players[i].name, Game.players[i].id, Game.players[i].loginIp);
                    }
                }
                break;
            case DIRECTION.LEFT:
                for (var i = 0; i < Game.players.length; i++) {
                    if (DIRECTION.positionToDirection(Game.players[i].position) == DIRECTION.LEFT) {
                        // this._name.setString(Game.players[i].wId);
                        // this._id.setString("ID：" + Game.players[i].id);
                        // this._ip.setString("IP：" + Game.players[i].loginIp);
                        // this.loadImgFromUrl(this, Game.players[i].face, this._icon);
                        // this._bgFrame.setVisible(true);
                        // this._userInfoLayer.setVisible(true);
                        UserInfo2.show(Game.players[i].face, Game.players[i].name, Game.players[i].id, Game.players[i].loginIp);
                    }
                }
                break;
            case DIRECTION.RIGHT:
                for (var i = 0; i < Game.players.length; i++) {
                    if (DIRECTION.positionToDirection(Game.players[i].position) == DIRECTION.RIGHT) {
                        // this._name.setString(Game.players[i].wId);
                        // this._id.setString("ID：" + Game.players[i].id);
                        // this._ip.setString("IP：" + Game.players[i].loginIp);
                        // this.loadImgFromUrl(this, Game.players[i].face, this._icon);
                        // this._bgFrame.setVisible(true);
                        // this._userInfoLayer.setVisible(true);
                        UserInfo2.show(Game.players[i].face, Game.players[i].name, Game.players[i].id, Game.players[i].loginIp)
                    }
                }
                break;
        }
    },

    showFace: function (sp) {
        var sprite = new cc.Sprite();
        sprite.setSpriteFrame(sp.getSpriteFrame());
        sprite.setPosition(144, 220);
        this.addChild(sprite);
        var seq = cc.sequence(cc.delayTime(1), cc.callFunc(function () {
            sprite.removeFromParent();
        }, this));
        sprite.runAction(seq);
    },
    showMessage: function (str) {
        var label = new cc.LabelTTF(str, "", 30);
        label.setPosition(144, 220);
        label.setAnchorPoint(0, 0);
        this.addChild(label);
        var seq = cc.sequence(cc.delayTime(1), cc.callFunc(function () {
            label.removeFromParent();
        }, this));
        label.runAction(seq);

    },
    showFace1: function (id, message) {
        // message=message.substring(1);
        var sprite = new cc.Sprite("#exp_" + parseInt(message) + ".png");
        var spritePosition;
        var x, y;
        for (var i = 0; i < Game.players.length; i++) {
            if (id == Game.players[i].id) {
                switch (DIRECTION.positionToDirection(Game.players[i].position)) {
                    case DIRECTION.UP:
                        x = 335;
                        y = 630;
                        // spritePosition=cc.p(335, 630);
                        break;
                    case DIRECTION.DOWN:
                        x = 144;
                        y = 220;
                        // spritePosition=cc.p(144, 220);
                        break;
                    case DIRECTION.LEFT:
                        x = 144;
                        y = 444;
                        // spritePosition=cc.p(144, 444);
                        break;
                    case DIRECTION.RIGHT:
                        x = 1136;
                        y = 444;
                        // spritePosition=cc.p(1136, 444);
                        break;
                }
            }
        }
        sprite.setPosition(x, y);
        this.addChild(sprite);
        var seq = cc.sequence(cc.delayTime(1), cc.callFunc(function () {
            sprite.removeFromParent();
        }, this));
        sprite.runAction(seq);
    },
    showmessage1: function (id, message) {
        var label = new cc.LabelTTF(message, "", 30);
        var spritePosition;
        var x, y;
        for (var i = 0; i < Game.players.length; i++) {
            if (id == Game.players[i].id) {
                switch (DIRECTION.positionToDirection(Game.players[i].position)) {
                    case DIRECTION.UP:
                        x = 335;
                        y = 630;
                        // spritePosition=cc.p(335, 630);
                        break;
                    case DIRECTION.DOWN:
                        x = 144;
                        y = 220;
                        // spritePosition=cc.p(144, 220);
                        break;
                    case DIRECTION.LEFT:
                        x = 144;
                        y = 444;
                        // spritePosition=cc.p(144, 444);
                        break;
                    case DIRECTION.RIGHT:
                        x = 1036;
                        y = 444;
                        // spritePosition=cc.p(1136, 444);
                        break;
                }
            }
        }
        label.setAnchorPoint(0, 0);
        label.setPosition(x, y);
        this.addChild(label);
        var seq = cc.sequence(cc.delayTime(1), cc.callFunc(function () {
            label.removeFromParent();
        }, this));
        label.runAction(seq);
    },

});