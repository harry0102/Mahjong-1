/**
 * Created by Wasu on 17/1/10.
 */
var ReleaseLayer = cc.Layer.extend({

    background:null,
    text1: null,
    textBox:null,
    ctor: function () {
        this._super();

        this.background = new cc.Sprite(res.createRoom_bg_png);
        this.addChild(this.background);
        this.background.setPosition(cc.p(640,360));

        this.text1 = new cc.LabelTTF("玩家" + "申请解散房间，请问是否同意？(超过五分钟未做选择默认同意)", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this.text1);
        this.text1.setPosition(cc.p(640, 600));

        var clock = new cc.Sprite(res.icon_clock_png);
        this.addChild(clock);
        clock.setPosition(cc.p(900, 500));

        this._text_clock = new cc.LabelTTF(300, "Arial", 16, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._text_clock);
        this._text_clock.setPosition(cc.p(900, 500));
        // this._numFlag=300;
        // this.scheduleUpdate();

        var admit = new cc.Sprite(res.btn_admit_png);
        this.addChild(admit);
        admit.setPosition(cc.p(450, 150));

        var refuse = new cc.Sprite(res.btn_refuse_png);
        this.addChild(refuse);
        refuse.setPosition(cc.p(600, 150));

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
                // this.textBox.removeFromParent();
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
                // this.textBox.removeFromParent();
                target.setScale(1);
                console.log("touch Ended");

            }.bind(this)
        });

        cc.eventManager.addListener(_admitListener, admit);
        cc.eventManager.addListener(_refuseListener, refuse);
    },
    setData: function (d) {
        if(this.textBox!=null){
            this.textBox.removeFromParent();
        }
        var members = Game.players;
        if(d.state ==OpManager.ROOMSTATE.PRERELEASE){
            for (var i = 0; i < d.isDissolution.length; i++) {
                if (d.applyDissolution == members[i].position) {
                    this.text1.setString("玩家" + members[i].wId + "申请解散房间，请问是否同意？(超过五分钟未做选择默认同意)");
                }
            }
            var k = 0;
            // var flag=0;
            this.textBox=new cc.Layer();
            this.addChild(this.textBox);
            for (var j = 0; j < d.isDissolution.length; j++) {
                if (j!=d.applyDissolution) {
                    var text2 = new cc.LabelTTF("玩家" + members[j].wId + "等待选择", "Arial", 30, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    if(d.isDissolution[j]==1){
                        text2.setString("玩家" + members[j].wId + "确认解散");
                        // flag++;
                    }else{
                        text2.setString("玩家" + members[j].wId + "等待选择");
                    }
                    text2.setPosition(cc.p(600, 500 - 100 * k));
                    this.textBox.addChild(text2);
                    k++;
                }
            }
            // if(flag==3){
            //     cc.director.runScene(new cc.TransitionFade(0.5, new MenuScene()));
            // }
        }else if(d.state==OpManager.ROOMSTATE.RELEASE){
            cc.director.runScene(new cc.TransitionFade(0.5, new MenuScene()));
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "quitChatRoom", "(Ljava/lang/String;)V",Game.roomNum);
            }
        }else{
            this.removeFromParent();
        }

        // var flag=0;
        // for(var k=0;k<d.isDissolution.length;k++){
        //     if(d.isDissolution[k]==1){
        //         flag++;
        //     }
        // }
    },


})

