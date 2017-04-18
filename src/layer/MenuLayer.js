/**
 * Created by kale on 2016/11/17.
 */

var MenuLayer2 = MyLayer.extend({
    _backGround: null,
    _slider_music: null,
    _slider_effect: null,
    _icon_effect: null,
    _icon_music: null,
    _dialect: null,
    _language: null,
    _text: null,
    _close: null,
    _confirm: null,
    _numFlag: 0,
    times: 0,
    _text_clock: null,
    _info: null,
    _release: null,

    ctor: function () {
        this._super(this.onTouchEndEvent, this);
        //加载背景
        this.loadBackground();
        //加载滑块
        this.loadSliders();
        // this._slider.setPosition(cc.p(0,0));
        //加载文字说明
        //加载关闭符号
        this.loadButton("icon_close.png", this.onButtonTouchEvent);
        this._close.setPosition(cc.p(980, 630));
    },
    onEnter: function () {
        this._super();
        // Sound.playBackgroundMusic();
        //cc.director.pause();

        var twoRoom = new cc.LabelTTF("方言", "Arial", 38, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(twoRoom);
        twoRoom.setPosition(cc.p(535, 250));
        twoRoom.setColor(cc.color(83, 58, 0));
        var threeRoom = new cc.LabelTTF("普通话", "Arial", 38, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(threeRoom);
        threeRoom.setPosition(cc.p(815, 250));
        threeRoom.setColor(cc.color(83, 58, 0));

        this._release = new cc.Sprite("#btn_orange2.png");
        this.addChild(this._release);
        this._release.setPosition(640, 125);

        var releaseRoom = new cc.LabelTTF("解散房间", "Arial", 38, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._release.addChild(releaseRoom);
        releaseRoom.setPosition(this._release.width / 2, this._release.height / 2);

        var _releaseListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.width);
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }
                // Game.op.releaseRoom(1, function (data) {
                //     cc.log(data);
                //     cc.log("解散房间。。。。");
                // });

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();

            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                // Game.op._roomScene._UILayer._confirm1.setPosition(0,0);
                // this._confirm1.setPosition(0,0);
                //加载聊天界面s

                PopUp.show("需要所有玩家同意方可解散房间。\n确认申请解散？",
                    function () {
                        cc.log("取消");
                    },
                    function () {
                        cc.log("确认");
                        // Game.user=null;
                        try {
                            Game.op.releaseRoom(1, function (data) {
                                var d = eval("(" + data.data + ")");
                                cc.log(data);
                                cc.log("解散房间。。。。");
                            });
                        }
                        catch (ex) {
                            cc.log("_quedinglistener:" + ex);
                        }
                        // 推出房间调用参数
                        // Game.op._roomScene._UILayer._menuLayer.loadWait();
                    });

                this.setPosition(6400, 360);

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        cc.eventManager.addListener(_releaseListener, releaseRoom);

        this._dialect = new ccui.CheckBox();
        this.addChild(this._dialect);
        this._dialect.loadTextures("point_grey_1.png", "point_grey_1.png", "point_yellow_1.png", "point_grey_1.png", "point_yellow_1.png", ccui.Widget.PLIST_TEXTURE);
        this._dialect.setPosition(450, 250);
        this._dialect.setTouchEnabled(true);
        this._dialect.addEventListener(this.onRoomCheckBoxSelectedEvent, this);
        this._dialect.setSelected(true);
        this._language = new ccui.CheckBox();
        this.addChild(this._language);
        this._language.loadTextures("point_grey_1.png", "point_grey_1.png", "point_yellow_1.png", "point_grey_1.png", "point_yellow_1.png", ccui.Widget.PLIST_TEXTURE);
        this._language.setPosition(700, 250);
        this._language.setTouchEnabled(true);
        this._language.addEventListener(this.onRoomCheckBoxSelectedEvent, this);


    },
    onTouchEndEvent: function (target) {
        cc.log("onTouchEndEvent");
        this.setPosition(6400, 360);
        return false;
    },
    onTouchOut: function () {

    },
    loadExit: function (d) {
        var members = Game.players;

        this._confirm = new cc.Layer();
        this.addChild(this._confirm, 10);

        var background = new cc.Sprite(res.createRoom_bg_png);
        this._confirm.addChild(background);
        background.setPosition(cc.p(640, 360));

        var text1 = new cc.LabelTTF("玩家" + "申请解散房间，请问是否同意？(超过五分钟未做选择默认同意)", "Arial", 40, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._confirm.addChild(text1);
        text1.setPosition(cc.p(640, 600));

        // var text2=new new cc.LabelTTF("玩家"+"等待选择", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._confirm.addChild(text2);
        // text2.setPosition(cc.p(600, 500));
        // var tex3=new new cc.LabelTTF("玩家"+"等待选择", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._confirm.addChild(tex3);
        // tex3.setPosition(cc.p(600, 400));
        // var text4=new new cc.LabelTTF("玩家"+"等待选择", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._confirm.addChild(text4);
        // text4.setPosition(cc.p(600, 300));

        var clock = new cc.Sprite(res.icon_clock_png);
        this._confirm.addChild(clock);
        clock.setPosition(cc.p(900, 500));

        this._text_clock = new cc.LabelTTF(300, "Arial", 20, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._confirm.addChild(this._text_clock);
        this._text_clock.setPosition(cc.p(900, 500));
        this._numFlag = 300;
        this.scheduleUpdate();

        var admit = new cc.Sprite(res.btn_admit_png);
        this._confirm.addChild(admit);
        admit.setPosition(cc.p(450, 150));

        var refuse = new cc.Sprite(res.btn_refuse_png);
        this._confirm.addChild(refuse);
        refuse.setPosition(cc.p(600, 150));

        for (var i = 0; i < d.isDissolution.length; i++) {
            if (d.applyDissolution == members[i].position) {
                text1.setString("玩家" + members[i].wId + "申请解散房间，请问是否同意？(超过五分钟未做选择默认同意)");
            }
        }
        var k = 0;
        for (var j = 0; j < d.isDissolution.length; j++) {
            if (d.isDissolution[j] == 0) {
                var text2 = new cc.LabelTTF("玩家" + members[j].wId + "等待选择", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this._confirm.addChild(text2);
                text2.setPosition(cc.p(600, 500 - 100 * k));
                k++;
            }
        }


        var _admitListener = cc.EventListener.create({
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
                // Game.op.releaseRoom(1, function (data) {
                //     cc.log(data);
                //     cc.log("解散房间。。。。");
                // });

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
                Game.op.releaseRoom(1, function (data) {
                    cc.log(data);
                    cc.log("解散房间。。。。");
                });

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        var _refuseListener = cc.EventListener.create({
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
                // Game.op.releaseRoom(1, function (data) {
                //     cc.log(data);
                //     cc.log("解散房间。。。。");
                // });

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
                Game.op.releaseRoom(0, function (data) {
                    cc.log(data);
                    cc.log("解散房间。。。。");
                });

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });

        cc.eventManager.addListener(_admitListener, admit);
        cc.eventManager.addListener(_refuseListener, refuse);


    },
    loadWait: function () {
        EmptyLabel.show("请等待其他玩家确认...");
    },
    loadInfo: function () {
        this._info = new cc.Layer();
        this.addChild(this._info);

        var background = new cc.Sprite(res.createRoom_bg_png);
        this._info.addChild(background);
        background.setPosition(cc.p(640, 360));

        var title = new cc.LabelTTF("提示", "Arial", 40, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._info.addChild(title);
        title.setPosition(cc.p(500, 500));
        var text = new cc.LabelTTF("由于玩家1拒绝，房间解散失败，游戏继续", "Arial", 22, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._info.addChild(text);
        text.setPosition(cc.p(700, 400));


        var submit = new cc.Sprite(res.btn_admit_png);
        this._info.addChild(submit);
        submit.setPosition(cc.p(600, 300));

        var _submitListener = cc.EventListener.create({
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
                // Game.op.releaseRoom(1, function (data) {
                //     cc.log(data);
                //     cc.log("解散房间。。。。");
                // });

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
                this._info.setVisible(false);

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        cc.eventManager.addListener(_submitListener, submit);

    },
    update: function (dt) {
        if (this.numFlag > 0) {
            if (this.times++ > 60) {
                this._text_clock.setString(this.numFlag--);
                this.times = 0;
            }
        } else {
            this._confirm.setVisible(false);
        }
    },
    onRoomCheckBoxSelectedEvent: function (sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
                if (sender == this._dialect) {
                    this._dialect.setSelected(true);
                    this._language.setSelected(false);
                } else if (sender == this._language) {
                    this._language.setSelected(true);
                    this._dialect.setSelected(false);
                }
                cc.log("复选框选中");

                break;
            case ccui.CheckBox.EVENT_UNSELECTED:
                cc.log("复选框没选中");
                if (sender == this._dialect) {
                    this._dialect.setSelected(true);
                    this._language.setSelected(false);
                } else if (sender == this._language) {
                    this._language.setSelected(true);
                    this._dialect.setSelected(false);
                }
                break;
            default:
                break;
        }
    },

    onExit: function () {
        //cc.director.resume();
        this._super();
    },
    loadBackground: function () {
        this._black = new cc.LayerColor(cc.color(0, 0, 0, 153), 1280, 720);
        this.addChild(this._black);

        this._backGroud = new MyNode(this, res.bg_setup_png, function () {
            return false;
        });
        this._backGroud.setPosition(cc.p(640, 360));
    },
    loadButton: function (texture, event) {
        this._close = new ccui.Button();
        this.addChild(this._close);
        this._close.loadTextures(texture, texture, "", ccui.Widget.PLIST_TEXTURE);
        this._close.setScale(1);
        this._close.setTouchEnabled(true);
        this._close.addTouchEventListener(event, this);
    },
    onButtonTouchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("关闭当前层");
                // this.removeFromParent();
                // Sound.stop();
                this.setPosition(6400, 360);
                break;
            case ccui.Widget.TOUCH_MOVED:
                cc.log("touch move");
                break;
            case ccui.Widget.TOUCH_ENDED:
                cc.log("touch up");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                cc.log("touch cancel");
                break;
            default:
                break;
        }
    },
    loadText: function () {
        cc.log("start load text");
        var text = new cc.LabelTTF("音     效", "Arial", 40, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(text);
        text.setPosition(cc.p(400, 480));
        text.setColor(cc.color(64, 27, 21));
        var text1 = new cc.LabelTTF("音     乐", "Arial", 40, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(text1);
        text1.setPosition(cc.p(400, 360));
        text1.setColor(cc.color(64, 27, 21));
    },
    loadSliders: function () {
        cc.log("start load sider");

        var text = new cc.LabelTTF("音    效", "Arial", 40, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(text);
        text.setPosition(cc.p(400, 370));
        text.setColor(cc.color(65, 50, 17));
        var text1 = new cc.LabelTTF("音    乐", "Arial", 40, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(text1);
        text1.setPosition(cc.p(400, 480));
        text1.setColor(cc.color(65, 50, 17));

        this._icon_effect = new cc.Sprite(res.icon_effect_png);
        // this.addChild(this._icon_effect);
        this._icon_effect.setPosition(cc.p(800, 300));

        this._icon_music = new cc.Sprite(res.icon_music_png);
        // this.addChild(this._icon_music);
        this._icon_music.setPosition(cc.p(800, 400));

        var _musicListener = cc.EventListener.create({
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
                var percent = this._slider_music.getPercent();
                cc.log("music百分比：" + percent.toFixed(0));
                if (percent != 0) {
                    Sound.setMusic(0);
                    this._slider_music.setPercent(0);
                } else {
                    Sound.setMusic(1);
                    this._slider_music.setPercent(100);
                }
                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        var _effectListener = cc.EventListener.create({
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
                var percent = this._slider_effect.getPercent();
                cc.log("music百分比：" + percent.toFixed(0));
                if (percent != 0) {
                    Sound.setEffects(0);
                    this._slider_effect.setPercent(0);
                } else {
                    Sound.setEffects(1);
                    this._slider_effect.setPercent(100);
                }

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        // cc.eventManager.addListener(_musicListener, this._icon_music);
        // cc.eventManager.addListener(_effectListener, this._icon_effect);

        this._slider_effect = new ccui.Slider();
        this._slider_music = new ccui.Slider();
        // this._slider_music.setScale(1);

        this.addChild(this._slider_music);
        this.addChild(this._slider_effect);
        this._slider_music.setPosition(cc.p(740, 480));
        this._slider_effect.setPosition(cc.p(740, 370));

        //加载背景纹理图
        this._slider_music.loadBarTexture("line_black.png", ccui.Widget.PLIST_TEXTURE);
        this._slider_music.loadSlidBallTextures(
            "point_selected.png",
            "point_selected.png",
            "", ccui.Widget.PLIST_TEXTURE
        );
        this._slider_music.loadProgressBarTexture("line_yellow.png", ccui.Widget.PLIST_TEXTURE);
        // this._slider_music.setPosition(cc.p(820,640));
        // this._slider_music.setScale(2);

        this._slider_effect.loadBarTexture("line_black.png", ccui.Widget.PLIST_TEXTURE);
        this._slider_effect.loadSlidBallTextures(
            "point_selected.png",
            "point_selected.png",
            "", ccui.Widget.PLIST_TEXTURE
        );
        this._slider_effect.loadProgressBarTexture("line_yellow.png", ccui.Widget.PLIST_TEXTURE);
        // this._slider_effect.setPosition(cc.p(820,540));
        // this._slider_effect.setScale(2);

        this._slider_music.addEventListener(this.onSliderEvent_music, this);
        this._slider_effect.addEventListener(this.onSliderEvent_effect, this);
        this._slider_music.setPercent(Sound.getMusic());
        this._slider_effect.setPercent(Sound.getEffects());
        // cc.eventManager.addEventListener(this.onSliderEvent_music,this._slider_music);
        // cc.eventManager.addEventListener(this.onSliderEvent_effect,this._slider_effect);

    },
    onSliderEvent_music: function (sender, type) {
        switch (type) {
            case ccui.Slider.EVENT_PERCENT_CHANGED:
                var percent = sender.getPercent();
                cc.log("music百分比：" + percent.toFixed(0));
                Sound.setMusic(percent.toFixed(0) / 100);
                break;
            default:
                break;
        }
    },
    onSliderEvent_effect: function (sender, type) {
        switch (type) {
            case ccui.Slider.EVENT_PERCENT_CHANGED:
                var percent = sender.getPercent();
                cc.log("effect百分比：" + percent.toFixed(0));
                Sound.setEffects(percent.toFixed(0) / 100);
                break;
            default:
                break;
        }
    },
    removeSilder: function () {
        this.removeChild(this._slider_music);
        this.removeChild(this._slider_effect);

    }

});

