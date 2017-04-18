/**
 * Created by kale on 2017/1/17.
 */
/*麻将上方的牌*/
var DeskCard = MyNode.extend({
    ctor: /*@param p 父节点 @param typeid 牌类型*/function (p, typeid, type) {
        var fileName = "";
        if (type == 1) {
            //左
            this._super(p, "#" + Card.TYPE.ORIGIN_HORIZON_DESK.prefix + ".png");
            var sp = new cc.Sprite("#md_l_" + typeid + ".png");
            this.addChild(sp);
            // sp.setScale(0.47);
            sp.setPosition(this.width * 0.5, this.height / 2 + 10);
        } else if (type == 2) {
            //中
            this._super(p, "#" + Card.TYPE.ORIGIN_VERTICAL_DESK.prefix + ".png");
            var sp = new cc.Sprite("#md_m_" + typeid + ".png");
            this.addChild(sp);
            sp.setScale(0.8);
            sp.setPosition(this.width * 0.5, this.height / 2 + 10);
        } else if (type == 3) {
            //右
            this._super(p, "#" + Card.TYPE.ORIGIN_HORIZON_DESK.prefix + ".png");
            var sp = new cc.Sprite("#md_r_" + typeid + ".png");
            this.addChild(sp);
            // sp.setScale(0.47);
            sp.setPosition(this.width * 0.5, this.height / 2 + 10);
        }
    },
    fapai: function (delay) {
        var seq = cc.sequence(cc.delayTime(delay), cc.callFunc(function () {
            this.setScale(1.5);
            this.setVisible(true);

        }, this), cc.scaleTo(0.2, 1));
        this.runAction(seq);
    },
    onExit: function () {
        this._super();
    }
});