/**
 * Created by kale on 2017/1/17.
 */
/*麻将上方的牌*/
var LeftCard = MyNode.extend({
    ctor:/*@param p 父节点 @param typeid 牌类型*/function (p,typeid) {
        var fileName = "";
        if(typeid == 0){
            this._super(p,"#"+Card.TYPE.ORIGIN_LEFT_HAND.prefix+".png");
        } else {
            this._super(p,"#"+Card.TYPE.ORIGIN_LEFT_DESK.prefix+".png");
            var sp = new cc.Sprite("#ml_"+typeid+".png");
            this.addChild(sp);
            // sp.setScale(0.47);
            sp.setPosition(this.width*0.5,sp.height);
        }
        // var sp1 = new LeftCard(this, 0);
        // sp1.setPosition(100,500);
        // var sp2 = new LeftCard(this, 0);
        // Utils.down(sp1,sp2,-34);
        // var sp3 = new LeftCard(this, 0);
        // Utils.down(sp2,sp3,-34);
        // var sp4 = new LeftCard(this, 0);
        // Utils.down(sp3,sp4,-34);
        // var sp5 = new LeftCard(this, 0);
        // Utils.down(sp4,sp5,-34);
},
    fapai: function (delay) {
        var seq = cc.sequence(cc.delayTime(delay),cc.callFunc(function(){
            this.setScale(1.5);
            this.setVisible(true);

        },this), cc.scaleTo(0.2, 1));
        this.runAction(seq);
    },
    onExit: function () {
        this._super();
    }
});