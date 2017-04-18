/**
 * Created by evil on 2017/1/5.
 */
/**
 * Created by Wasu on 17/1/4.
 */



var HintLayer=ccui.Layout.extend({
    _enter:null,
    _message:null,

    ctor:function () {
        this._super();
        //加载背景
        var backGround=new ccui.ImageView(res.background_userInfo2);
        this.addChild(backGround);
        var title=new cc.LabelTTF("提示","提示",36,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        title.setColor(cc.color(0,0,0));
        this.addChild(title);
        title.y=70;
        this.loadButton("000000");
    },
    loadButton:function (roomNum) {

        this._message=new cc.LabelTTF("你输入的房间号"+roomNum+"不存在，请重新输入！","",28,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._message);
        this._message.setPosition(0,20);
        this._message.setColor(cc.color(0,0,0));
        this._enter=new cc.LabelTTF("确认","提示",32,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._enter);
        this._enter.setColor(cc.color(255,0,0));
        this._enter.setPosition(cc.p(0,-50))
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
                this.setPosition(2000,0);
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
        cc.eventManager.addListener(_btn1Listener, this._enter);
    },

})