/**
 * Created by kale on 2017/1/17.
 */
/*麻将上方的牌*/
var UpCard = MyNode.extend({
    ctor:/*@param p 父节点 @param typeid 牌类型*/function (p,typeid) {
        var fileName = "";
        if(typeid == 0){
            this._super(p,"#"+Card.TYPE.ORIGIN_UP_HAND.prefix+".png");
        } else {
            this._super(p,"#"+Card.TYPE.ORIGIN_UP_DESK.prefix+".png");
            var sp = new cc.Sprite("#mm_"+typeid+".png");
            this.addChild(sp);
            sp.setScale(0.47);
            sp.setPosition(this.width*0.5,sp.height*0.47);
        }
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