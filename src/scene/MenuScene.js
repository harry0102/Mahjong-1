/**
 * Created by foo on 2016/11/15.
 */



var MenuLayer = cc.Layer.extend({
    sprite: null,
    _joinRoomBtn: null,
    _createRoomBtn: null,
    _joinRoomBtn: null,
    _passwordLayer: null,
    _setupLayer: null,
    _confirm: null,
    _createRoomLayer: null,
    _userIcon: null,
    _userName: null,
    _userID: null,
    _exitLogin: null,
    _shop: null,
    _welfare: null,//福利
    _record: null,// 战机
    _notice: null,//公告
    _rule: null,//法规
    _proxy: null,//代理
    _more: null,//更多
    _gold: null,
    _roomCard: null,
    _goldNum: null,
    _roomCardNum: null,
    _goldNumAdd: null,
    _roomCardNumAdd: null,
    _userInfoLayer: null,
    _goldLow: null,
    _goldLowMin: null,
    _goldMedium: null,
    _goldMediumMin: null,
    _goldHigh: null,
    _goldHighMin: null,
    _createRoom: null,
    _joinRoom: null,


    ctor: function () {
        this._super();


        var gameName = new cc.LabelTTF("哈尔滨麻将", "Arial", 44, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(gameName);
        gameName.setColor(cc.color(0, 0, 0));
        gameName.setPosition(cc.p(670, 679));
        this.loadBackground();
        this.loadButton();
        //用户信息层
        // this._userInfoLayer = new UserInfoLayer();
        // this.addChild(this._userInfoLayer);
        // this._userInfoLayer.setVisible(false);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function (keyCode, event) {

                if (keyCode == cc.KEY.back) {
                    Cocos2dxBridge.showAlertDialog();
                }
                else if (keyCode == cc.KEY.menu) {
                }
            }
        }, this);
    },
    loadtest: function () {
        var sp1 = new DownCard(this, 4, Card.TYPE.ORIGIN_DOWN_HAND, this.onTouchBegan, this);
        sp1.setPosition(100, 500);
        sp1.setScale(1.11);

        var sp2 = new DownCard(this, 7, Card.TYPE.ORIGIN_DOWN_HAND, this.onTouchBegan, this);
        sp2.setPosition(200, 500);
        // var sp2 = new DownCard(this, 0);
        // Utils.right(sp1,sp2,-34);
        // var sp3 = new DownCard(this, 0);
        // Utils.right(sp2,sp3,-34);
        // var sp4 = new DownCard(this, 0);
        // Utils.right(sp3,sp4,-34);
        // var sp5 = new DownCard(this, 0);
        // Utils.right(sp4,sp5,-34);
        // this._turntable_textLabels=[];
        // this._turntable_bg = new cc.Sprite("#pic_table.png");
        // // this._turntable_bg.setAnchorPoint(0.5, 0.5);
        // this._turntable_bg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        // this.addChild(this._turntable_bg);
        //
        //
        // this._turntable_lightning = new cc.Sprite("#pic_table_back.png");
        // // this._turntable_lightning.setAnchorPoint(0.5, 0.5);
        // this._turntable_lightning.setPosition(this._turntable_bg.width / 2, this._turntable_bg.height / 2);
        // // var _blink = cc.blink(50, 50);
        // var rotato=cc.rotateTo(0.5,180);
        // // this._turntable_lightning.flash();
        // this._turntable_lightning.runAction(rotato);
        // this._turntable_bg.addChild(this._turntable_lightning);
        //
        // this._shi=new cc.Sprite("#ng_8.png");
        // this._turntable_bg.addChild(this._shi);
        // this._shi.setPosition(57,65);
        // this._shi.setSpriteFrame("ng_9.png");
        // this._ge=new cc.Sprite("#ng_8.png");
        // this._turntable_bg.addChild(this._ge);
        // this._ge.setPosition(73,65);
        //
        // var _turntable_texts = ["东", "南", "西", "北"];
        // for (var index = 0; index < _turntable_texts.length; index++) {
        //     var _label = new cc.LabelTTF(_turntable_texts[index], "Arial", 24, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        //     _label.setAnchorPoint(0.5, 2);
        //     _label.setPosition(this._turntable_bg.width / 2, this._turntable_bg.height / 2);
        //     _label.setRotation(index * 90);
        //     this._turntable_textLabels[index] = _label;
        //     this._turntable_bg.addChild(_label);
        // }
    },
    onEnter: function () {
        this._super();
        cc.log("enter menuscene");
        this.loadUserInfo("小萝莉", "11111", 1000, 10);
        if (!Game.user) {
            Game.op.connection(function (evt) {
                cc.log("服务器连接成功。。。。");
                this.login();
            }.bind(this));
        } else {
            this.setUserInfo2();
        }
        this._createRoomLayer = new CreateRoomLayer();
        this.addChild(this._createRoomLayer, 100);
        this._createRoomLayer.setPosition(cc.p(2000, 0));

        cc.log("_createRoomLayer");
        this._joinRoomLayer = new JoinRoomLayer();
        this.addChild(this._joinRoomLayer, 100);
        this._joinRoomLayer.setPosition(cc.p(2000, 0));
        cc.log("_createRoomLayer");

        this._passwordLayer = new PasswordLayer();
        this.addChild(this._passwordLayer, 100);
        this._passwordLayer.setPosition(cc.p(2000, 0));
    },
    login: function () {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            Game.op.login(Game.userOpenId, Game.userName, Game.userIconUrl, Game.userGender, function (data) {
                // Game.op.login("12344324", "哈哈", "www.baiud.com", "男", function (data) {
                // Game.setUser(data);
                Game.user = data;
                Cocos2dxBridge.initToken(Game.user.token);
                cc.log(data);
                cc.log("用户登陆成功。。。。 id: " + data.id+data.name);
                this.setUserInfo2();
                // this.loadUserInfo(data.wId+"",data.id+"",data.gold,data.roomCard);
            }.bind(this));
        }else{
            Game.op.login(Game.getUdid(), "啊啊啊啊","http://wx.qlogo.cn/mmopen/aaA5uL8OiaNTpsZhPBW47s5Ll3qFs2obsiciciaFDgcMUjOpgrlCaHwOKPgNaKibCQkPbQQ1rpwMKic4nqG691sXZd5rbyjkCBmuIia/0", "男", function (data) {
                Game.user = data;
                Cocos2dxBridge.initToken(Game.user.token);
                cc.log(data);
                cc.log("用户登陆成功。。。。 id: " + data.id+data.name);
                this.setUserInfo2();
                // this.loadUserInfo(data.wId+"",data.id+"",data.gold,data.roomCard);
            }.bind(this));
        }


    },
    loadBackground: function () {
        var winSize = cc.director.getWinSize();
        this.sprite = new cc.Sprite(res.menu_jpeg);
        this.sprite.x = winSize.width / 2;
        this.sprite.y = winSize.height / 2;
        this.addChild(this.sprite);

        var bg = new ccui.ImageView(res.menu_bg2_jpg);
        this.addChild(bg);
        bg.setPosition(cc.p(850, 380));
    },
    setUserInfo2: function () {
        this.setUserInfo(Game.user.name + "", Game.user.id + "", Game.user.gold + "", Game.user.roomCard + "", Game.user.face);
        cc.log("设置玩家信息："+Game.user.name+Game.user.id);
    },
    setUserInfo: function (name, id, gold, roomCard, url) {
        this._userName.setString(name);
        this._userID.setString("ID：" + id);
        this._goldNum.setString(gold);
        this._roomCardNum.setString(roomCard);
        cc.log(url);
        // this.loadImgFromUrl(this, url, this._userIcon);
        this._userIcon.setUrl(url);

    },
    loadImgFromUrl: function (Context, imgUrl, userIcon) {
        if (!imgUrl)return;
        imgUrl = "http://i3.dpfile.com/pc/50e07f17aeaa6399013cf34d3193b1d9%2880c80%29/thumb.jpg";
        cc.loader.loadImg(imgUrl, {isCrossOrigin: true}, function (err, img) {
            if (err) {
                cc.log(err);
            }
            else {
                cc.log("ok");
                var img = new cc.Sprite(img);
                userIcon.setSpriteFrame(img.getSpriteFrame());

            }
        });
    },
    loadButton: function () {
        this._buttons = new Array();
        this._exitLogin = new MyNode(this, res.exitLogin_png, function () {
            PopUp.show("确定退出登录吗",
                function () {
                    cc.log("取消");

                },
                function () {
                    cc.log("确认");
                    Game.user = null;
                    Cocos2dxBridge.deleteOauthVerify();
                    cc.director.runScene(new cc.TransitionFade(0.5, new LoginScene()));
                });
        });
        this._exitLogin.setPosition(cc.p(30, 690));

        this._goldLow = new cc.LabelTTF("金币初级场", "Arial", 38, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._goldLow);
        this._goldLow.setColor(cc.color(255, 0, 0));
        this._goldLow.setPosition(cc.p(200, 510));
        this._goldLowMin = new cc.LabelTTF("底分：500", "Arial", 22, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._goldLowMin);
        this._goldLowMin.setColor(cc.color(0, 0, 0));
        this._goldLowMin.setPosition(cc.p(250, 470));


        this._goldMedium = new cc.LabelTTF("金币中级场", "Arial", 38, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._goldMedium);
        this._goldMedium.setColor(cc.color(255, 0, 0));
        this._goldMedium.setPosition(cc.p(200, 390));
        this._goldMediumMin = new cc.LabelTTF("底分：2000", "Arial", 22, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._goldMediumMin);
        this._goldMediumMin.setColor(cc.color(0, 0, 0));
        this._goldMediumMin.setPosition(cc.p(250, 350));


        this._goldHigh = new cc.LabelTTF("金币高级场", "Arial", 38, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._goldHigh);
        this._goldHigh.setColor(cc.color(255, 0, 0));
        this._goldHigh.setPosition(cc.p(200, 270))
        this._goldHighMin = new cc.LabelTTF("底分：5000", "Arial", 22, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._goldHighMin);
        this._goldHighMin.setColor(cc.color(0, 0, 0));
        this._goldHighMin.setPosition(cc.p(250, 230));


        this._shop = new cc.LabelTTF("商城", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._shop);
        this._shop.setColor(cc.color(0, 0, 0));
        this._shop.setPosition(cc.p(200, 50));

        this._welfare = new cc.LabelTTF("福利", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._welfare);
        this._welfare.setColor(cc.color(0, 0, 0));
        this._welfare.setPosition(cc.p(350, 50));

        this._record = new cc.LabelTTF("战绩", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._record);
        this._record.setColor(cc.color(0, 0, 0));
        this._record.setPosition(cc.p(500, 50));

        this._notice = new cc.LabelTTF("公告", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._notice);
        this._notice.setColor(cc.color(0, 0, 0));
        this._notice.setPosition(cc.p(650, 50));

        this._rule = new cc.LabelTTF("法规", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._rule);
        this._rule.setColor(cc.color(0, 0, 0));
        this._rule.setPosition(cc.p(800, 50));

        this._proxy = new cc.LabelTTF("代理", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._proxy);
        this._proxy.setColor(cc.color(0, 0, 0));
        this._proxy.setPosition(cc.p(950, 50));

        this._more = new cc.LabelTTF("更多", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._more);
        this._more.setColor(cc.color(0, 0, 0));
        this._more.setPosition(cc.p(1100, 50));


        this._createRoom = new MyNode(this, "#btn_orange2.png", this.onTouchCreateRoom);
        this._createRoom.setPosition(cc.p(720, 390));
        this._joinRoom = new MyNode(this, "#btn_orange2.png", this.onTouchJoinRoom);
        this._joinRoom.setPosition(cc.p(970, 390));


        var createRoomText = new ccui.Text("创建房间", "Arial", 38);
        this._createRoom.addChild(createRoomText);
        createRoomText.setPosition(cc.p(this._createRoom.width / 2, this._createRoom.height / 2));
        var joinRoomText = new ccui.Text("加入房间", "Arial", 38);
        this._joinRoom.addChild(joinRoomText);
        joinRoomText.setPosition(cc.p(this._joinRoom.width / 2, this._joinRoom.height / 2))
        // this._createRoom = new cc.LabelTTF("创建房间", "Arial", 38, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._createRoom.setPosition(cc.p(720, 390));
        // this.addChild(this._createRoom);
        // this._joinRoom = new cc.LabelTTF("加入房间", "Arial", 38, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._joinRoom.setPosition(cc.p(970, 390));
        // this.addChild(this._joinRoom);
        // var _btn1Listener = cc.EventListener.create({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     swallowTouches: true,
        //     onTouchBegan: function (touch, event) {
        //         var target = event.getCurrentTarget();
        //         var posInNode = target.convertToNodeSpace(touch.getLocation());
        //         var size = target.getContentSize();
        //         var rect = cc.rect(0, 0, size.width, size.height);
        //         if (!(cc.rectContainsPoint(rect, posInNode))) {
        //
        //             return false;
        //         }
        //         cc.log("createroom");
        //         this._createRoomLayer.setPosition(cc.p(0, 0));
        //
        //         console.log("began action" + target.y);
        //         return true;
        //     }.bind(this),
        //     onTouchMoved: function (touch, event) {
        //         var target = event.getCurrentTarget();
        //     },
        //     onTouchEnded: function (touch, event) {
        //         var target = event.getCurrentTarget();
        //         console.log("touch Ended");
        //     }.bind(this)
        // });
        //
        // var _btn2Listener = cc.EventListener.create({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     swallowTouches: true,
        //     onTouchBegan: function (touch, event) {
        //         var target = event.getCurrentTarget();
        //         var posInNode = target.convertToNodeSpace(touch.getLocation());
        //         var size = target.getContentSize();
        //         var rect = cc.rect(0, 0, size.width, size.height);
        //         if (!(cc.rectContainsPoint(rect, posInNode))) {
        //             return false;
        //         }
        //
        //         cc.log("joinroom");
        //         // this._joinRoom.setVisible(true);
        //         this._joinRoomLayer.setPosition(0, 0);
        //
        //         console.log("began action" + target.y);
        //         return true;
        //     }.bind(this),
        //     onTouchMoved: function (touch, event) {
        //         var target = event.getCurrentTarget();
        //     },
        //     onTouchEnded: function (touch, event) {
        //         var target = event.getCurrentTarget();
        //         console.log("touch Ended");
        //     }.bind(this)
        // });
        //加载设置按钮事件
        // cc.eventManager.addListener(_btn1Listener, this._createRoom);
        // cc.eventManager.addListener(_btn2Listener, this._joinRoom);

        // this._buttons.push(this._goldLow);
        // this._buttons.push(this._goldMedium);
        // this._buttons.push(this._goldHigh);
        // this._buttons.push(this._shop);
        // this._buttons.push(this._welfare);
        // this._buttons.push(this._record);
        // this._buttons.push(this._notice);
        // this._buttons.push(this._rule);
        // this._buttons.push(this._proxy);
        // this._buttons.push(this._more);
        // for (var i = 0; i < this._buttons.length; i++) {
        //     EventManager.bindTouch({target: this, onTouchBegan: this.onTouchBegan}, this._buttons[i]);
        // }

    },
    onTouchCreateRoom: function (target) {
        this._createRoomLayer.setPosition(cc.p(0, 0));
    },
    onTouchJoinRoom: function (target) {
        this._joinRoomLayer.setPosition(0, 0);
    },
    loadUserInfo: function (userName, userID, goldNum, roomCardNum) {


        this._userIcon = new HeadNode(this, null, function () {
            cc.log("usericon");
            // this._userInfoLayer.setText(Game.user.wId, Game.user.id, "nan", Game.user.loginIp, Game.user.gold, Game.user.roomCard, Game.user.face);
            //         this._userInfoLayer.setVisible(true);
            //         this._userInfoLayer.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
            UserInfo2.show(Game.user.face, Game.user.wId, Game.user.id, Game.user.loginIp);
        });
        // this._userIcon.setUrl("");
        // this.addChild(this._userIcon);
        this._userIcon.setPosition(cc.p(100, 680));
        this._userIcon.setScale(0.8);
        // var _btn1Listener = cc.EventListener.create({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     swallowTouches: true,
        //     onTouchBegan: function (touch, event) {
        //         var target = event.getCurrentTarget();
        //         var posInNode = target.convertToNodeSpace(touch.getLocation());
        //         var size = target.getContentSize();
        //         var rect = cc.rect(0, 0, size.width, size.height);
        //         if (!(cc.rectContainsPoint(rect, posInNode))) {
        //             return false;
        //         }
        //         this._userInfoLayer.setText(Game.user.wId, Game.user.id, "nan", Game.user.loginIp, Game.user.gold, Game.user.roomCard, Game.user.face);
        //         this._userInfoLayer.setVisible(true);
        //         this._userInfoLayer.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        //         target.setScale(0.6);
        //         return true;
        //     }.bind(this),
        //     onTouchMoved: function (touch, event) {
        //         var target = event.getCurrentTarget();
        //     },
        //     onTouchEnded: function (touch, event) {
        //         var target = event.getCurrentTarget();
        //
        //         target.setScale(0.8);
        //         console.log("touch Ended");
        //     }.bind(this)
        // });
        // cc.eventManager.addListener(_btn1Listener, this._userIcon);

        this._userName = new cc.LabelTTF(userName, "1000", 22, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._userName);
        this._userName.setPosition(cc.p(190, 695));
        this._userName.setColor(cc.color(0, 0, 0));
        this._userID = new cc.LabelTTF("ID:" + userID, "1000", 22, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._userID);
        this._userID.setPosition(cc.p(190, 665));
        this._userID.setColor(cc.color(0, 0, 0));

        this._gold = new ccui.ImageView(res.gold_png);
        this.addChild(this._gold);
        this._gold.setPosition(cc.p(850, 690));
        this._goldNum = new cc.LabelTTF(goldNum, "1000", 22, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._goldNum);
        this._goldNum.setColor(cc.color(0, 0, 0));
        this._goldNum.setPosition(cc.p(900, 690));
        this._goldNumAdd = new ccui.ImageView(res.add_png);
        this.addChild(this._goldNumAdd);
        this._goldNumAdd.setPosition(cc.p(1000, 690));


        this._roomCard = new ccui.ImageView(res.roomCard_png);
        this.addChild(this._roomCard);
        this._roomCard.setPosition(cc.p(1050, 690));
        this._roomCardNum = new cc.LabelTTF(roomCardNum, "1000", 22, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._roomCardNum);
        this._roomCardNum.setColor(cc.color(0, 0, 0));
        this._roomCardNum.setPosition(cc.p(1100, 690));
        this._roomCardNumAdd = new ccui.ImageView(res.add_png);
        this.addChild(this._roomCardNumAdd);
        this._roomCardNumAdd.setPosition(cc.p(1200, 690));
    },

    fonTouchBegan: function (touch, event) {
        // if (this.disableTouchEvent) return false;
        cc.log("onTouchBegan");

        // this.disableTouchEvent = false;
        return true;
    },
});


var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});