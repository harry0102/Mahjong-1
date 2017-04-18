/**
 * Created by Wasu on 17/1/4.
 */



var ExitLoginLayer=ccui.Layout.extend({
    _exit:null,
    _cancel:null,

    ctor:function () {
        this._super();
        //加载背景
        var backGround=new ccui.ImageView(res.background_userInfo2);
        this.addChild(backGround);
        var title=new cc.LabelTTF("确定退出登录吗?","提示",30,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        title.setColor(cc.color(0,0,0));
        this.addChild(title);
        title.y=70;
        this.loadButton();
    },
    loadButton:function () {
        this._cancel=new cc.LabelTTF("取消","提示",24,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._cancel);
        this._cancel.setColor(cc.color(0,0,0));
        this._cancel.setPosition(cc.p(-100,-50))
        var _btn1Listener = cc.EventListener.create({
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
                this.setVisible(false);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        cc.eventManager.addListener(_btn1Listener, this._cancel);

        this._exit=new cc.LabelTTF("确定","提示",24,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._exit);
        this._exit.setColor(cc.color(0,0,0));
        this._exit.setPosition(cc.p(100,-50));
        var _btn1Listener = cc.EventListener.create({
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
                // Game.op.closeWebSocket();
                Game.user=null;
                cc.director.runScene(new cc.TransitionFade(0.5,new LoginScene()));
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        cc.eventManager.addListener(_btn1Listener, this._exit);

    },

})