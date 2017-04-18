
/**
 * Created by kale on 2017/2/7.
 */
var VoiceBtn = MyNode.extend({
    ctor:function (p, callback, back) {
        this._super(p, "#icon_voice.png", this.cb, back);
        this.p = p;
        this.setCanMove(true);

    },
    cb:function () {
        cc.log("cb");
        Game.op._roomScene._UILayer.endVoice();
    },
    onTouchBegan: function (touch, event) {
        cc.log("onTouchBegan:");
        this.origPos = this.getPosition();
        this.origTouch = touch.getLocation();
        this.moveing = false;

        Game.op._roomScene._UILayer.startVoice();

    },
    onTouchMoved: function (touch, event) {

    },
    setpos: function (pos) {
        this.pos = pos;
    },
    onTouchEnded: function (touch, event) {
        cc.log("onTouchEnd:");
        var pos = this.getPosition();

        Game.op._roomScene._UILayer.endVoice();
    },
    onExit:function() {
        this._super();
    }
})
