/**
 * Created by kale on 2016/12/15.
 */
var ConfirmLayer = ccui.Layout.extend({
    _backGround: null,
    _create: null,
    _cancle: null,
    _info: null,
    _textFiled: null,
    _createListener: null,
    _cancleListener: null,
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
    _clear: null,
    _del: null,
    _buttons: [],
    _close:null,


    ctor: function () {
        this._super();

        this._backGround = new ccui.ImageView(res.createRoom_bg_jpg);
        this.addChild(this._backGround);
        this.loadTextField();
        this._buttons = new Array();
        this.loadButton();


        //     this._create=new cc.LabelTTF("","Arial",28,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        //     this._create.setPositionX(this.width/2-100);
        //     this._create.setPositionY(this.height/2);
        //     // this._gang.setColor(cc.color(0,0,0));
        //     this.addChild(this._create);
        //
        //     this._createListener = cc.EventListener.create({
        //         event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //         swallowTouches: true,
        //         onTouchBegan: function (touch, event) {
        //             var target = event.getCurrentTarget();
        //             var posInNode = target.convertToNodeSpace(touch.getLocation());
        //             var size = target.getContentSize();
        //             var rect = cc.rect(0, 0, size.width, size.width);
        //             if (!(cc.rectContainsPoint(rect, posInNode))) {
        //                 return false;
        //             }
        //             cc.log("press button");
        //
        //             console.log("began action" + target.y);
        //             target.setScale(0.8);
        //             return true;
        //         }.bind(this),
        //         onTouchMoved: function (touch, event) {
        //             var target = event.getCurrentTarget();
        //         },
        //         onTouchEnded: function (touch, event) {
        //             var target = event.getCurrentTarget();
        //
        //             if(this._textFiled != null){
        //                 Game.roomId=this._textFiled.getString();
        //             }
        //
        //             cc.log("joinroom");
        //             Game.op.joinRoom(Game.roomId,function (data) {
        //                 cc.log(data);
        //                 var _players = data.player;
        //                 for(var i= 0 ; i<_players.length;i++){
        //                     if(_players[i].id == Game.user.id){
        //                         Game.userPosition = _players[i].position;
        //                     }
        //                 }
        //                 cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
        //             });
        //
        //             target.setScale(1);
        //             console.log("touch Ended");
        //         }.bind(this)
        //     });
        //     //加载设置按钮事件
        //
        //
        //     this._cancle=new cc.LabelTTF("取消","Arial",28,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        //     this._cancle.setPositionX(this.width/2+100);
        //     this._cancle.setPositionY(this.height/2);
        //     // this._gang.setColor(cc.color(0,0,0));
        //     this.addChild(this._cancle);
        //
        //     this._cancleListener = cc.EventListener.create({
        //         event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //         swallowTouches: true,
        //         onTouchBegan: function (touch, event) {
        //             var target = event.getCurrentTarget();
        //             var posInNode = target.convertToNodeSpace(touch.getLocation());
        //             var size = target.getContentSize();
        //             var rect = cc.rect(0, 0, size.width, size.width);
        //             if (!(cc.rectContainsPoint(rect, posInNode))) {
        //                 return false;
        //             }
        //             cc.log("press button");
        //
        //             console.log("began action" + target.y);
        //             target.setScale(0.8);
        //             return true;
        //         }.bind(this),
        //         onTouchMoved: function (touch, event) {
        //             var target = event.getCurrentTarget();
        //         },
        //         onTouchEnded: function (touch, event) {
        //             var target = event.getCurrentTarget();
        //
        //             //进入房间
        //             this.setVisible(false);
        //             cc.eventManager.removeListener(this._createListener);
        //             cc.eventManager.removeListener(this._cancleListener);
        //
        //             target.setScale(1);
        //             console.log("touch Ended");
        //         }.bind(this)
        //     });
        //     //加载设置按钮事件
        //
        //     this._info=new cc.LabelTTF("","Arial",28,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        //     this._info.setPositionX(this.width/2);
        //     this._info.setPositionY(this.height/2+50);
        //     // this._gang.setColor(cc.color(0,0,0));
        //     this.addChild(this._info);
        //
        // },
        // loadInfo:function (flag) {
        //     if(flag == 0){
        //         this._create.setString("创建房间");
        //         this._info.setString("房卡数量："+Game.user.roomCard);
        //     }else if(flag == 1){
        //         this._create.setString("加入房间");
        //         this._info.setString("");
        //
        //         this.loadTextField();
        //     }
        //     cc.eventManager.addListener(this._cancleListener,this._cancle);
        //     cc.eventManager.addListener(this._createListener,this._create);


        // this._create.setTouchEnabled(true);
        // this._cancle.setTouchEnabled(true);
    },

    loadButton: function () {
        this._close=new ccui.ImageView(res.back_png);
        this.addChild(this._close);
        this._close.setPosition(cc.p(-360,200));
        this._close.setName("close");

        this._num0 = new cc.LabelTTF("0", "", 52, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._num0);
        this._num0.setPosition(cc.p(0, -150));
        this._num1 = new cc.LabelTTF("1", "", 52, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._num1);
        this._num1.setPosition(cc.p(-200, 0));
        this._num2 = new cc.LabelTTF("2", "", 52, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._num2);
        this._num2.setPosition(cc.p(0, 0));
        this._num3 = new cc.LabelTTF("3", "", 52, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._num3);
        this._num3.setPosition(cc.p(200, 0));
        this._num4 = new cc.LabelTTF("4", "", 52, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._num4);
        this._num4.setPosition(cc.p(-200, -50));
        this._num5 = new cc.LabelTTF("5", "", 52, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._num5);
        this._num5.setPosition(cc.p(0, -50));
        this._num6 = new cc.LabelTTF("6", "", 52, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._num6);
        this._num6.setPosition(cc.p(200, -50));
        this._num7 = new cc.LabelTTF("7", "", 52, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._num7);
        this._num7.setPosition(cc.p(-200, -100));
        this._num8 = new cc.LabelTTF("8", "", 52, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._num8);
        this._num8.setPosition(cc.p(0, -100));
        this._num9 = new cc.LabelTTF("9", "", 52, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._num9);
        this._num9.setPosition(cc.p(200, -100));
        this._clear = new cc.LabelTTF("清空", "", 52, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._clear);
        this._clear.setPosition(cc.p(-200, -150));
        this._del = new cc.LabelTTF("删除", "", 52, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._del);
        this._del.setPosition(cc.p(200, -150));
        this._buttons.push(this._num0);
        this._buttons.push(this._num1);
        this._buttons.push(this._num2);
        this._buttons.push(this._num3);
        this._buttons.push(this._num4);
        this._buttons.push(this._num5);
        this._buttons.push(this._num6);
        this._buttons.push(this._num7);
        this._buttons.push(this._num8);
        this._buttons.push(this._num9);
        this._buttons.push(this._clear);
        this._buttons.push(this._del);
        this._buttons.push(this._close);

        for (var i = 0; i < this._buttons.length; i++) {
            EventManager.bindTouch({target: this, onTouchBegan: this.onTouchBegan}, this._buttons[i]);

        }

    },

    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var str = this._textFiled.getString();

        if (target._string == "清空") {
            this._textFiled.setString("");
        } else if (target._string == "删除") {
            this._textFiled.setString(str.substring(0,str.length-1));
            // this._textFiled.deleteBackward();
        } else if(target.getName()=="close"){
            this.setVisible(false);
        }else {
            this._textFiled.setString(str + target._string);
        }
        if (str.length + 1 == 6) {
            Game.op.joinRoom(this._textFiled.getString(), function (data) {
                cc.log(data);
                Game.roomId=data.id;
                var _players = data.player;
                for (var i = 0; i < _players.length; i++) {
                    if (_players[i].id == Game.user.id) {
                        Game.userPosition = _players[i].position;
                    }
                }
                cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
                Game.op.ready(Game.roomId, function (data) {
                    cc.log(data);
                    cc.log("准备。。。。");
                });
            });
        }
    },

    loadTextField: function () {
        var title = new cc.LabelTTF("加入房间", "", 32, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(title);
        title.setPosition(cc.p(0, 200));
        title.setColor(cc.color(0, 0, 0));
        var subTitle = new cc.LabelTTF("请输入房间号:", "Arial", 26, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(subTitle);
        subTitle.setColor(cc.color(0, 0, 0));
        subTitle.setPosition(cc.p(0, 150));

        this._textFiled = new ccui.TextField("", "Arial", 42);
        this.addChild(this._textFiled);
        this._textFiled.setColor(cc.color(255, 0, 0));
        this._textFiled.setPosition(cc.p(0, 100));
        this._textFiled.addEventListener(this.onTextFieldEvent, this);
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
                cc.log("输入法编辑器--输入");
                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                cc.log("输入法编辑器--删除");
                break;
        }
    },


})
