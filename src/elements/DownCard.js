/**
 * Created by kale on 2017/1/17.
 */
/*麻将下方的牌*/
var DownCard = MyNode.extend({
    state: 0,// 0默认， 1出头 2打出 3听牌
    clicked: false,

    ctor: /*@param p 父节点 @param typeid 牌类型*/function (p, typeid, type, callback, back) {
        var fileName = "";
        if (Card.TYPE.ORIGIN_DOWN_HAND == type) {
            this._super(p, "#" + Card.TYPE.ORIGIN_DOWN_HAND.prefix + ".png", this.cb, back);
        } else if (Card.TYPE.ORIGIN_DOWN_DESK == type) {
            this._super(p, "#" + Card.TYPE.ORIGIN_DOWN_DESK.prefix + ".png");
        }
        var sp = new cc.Sprite("#mm_" + typeid + ".png");
        this.addChild(sp);
        if (Card.TYPE.ORIGIN_DOWN_HAND == type) {
            // sp.setScale(1);
            sp.setPosition(this.width * 0.5, sp.height * 0.5 + 6);
        } else if (Card.TYPE.ORIGIN_DOWN_DESK == type) {
            sp.setScale(0.47);
            sp.setPosition(this.width * 0.5, sp.height * 0.47);
        } else if (Card.TYPE.ORIGIN_DOWN_HAND == type) {
            // sp.setPosition(this.width * 0.5, sp.height * 0.47);
            // this.setScale(1.11);
        }
        this.p = p;
        this.setCanMove(true);
    },
    cb: function () {
        // cc.log(cb);
        // this.click();
        // Game.op.chiTingCard(cardList,target.id);
    },
    onTouchBegan: function (touch, event) {
        cc.log("ontouchbegan");
        this.origPos = this.getPosition();
        cc.log("ontouchbegan2");
        this.origTouch = touch.getLocation();
        this.moveing = false;
        cc.log("ontouchbegan3");

        if (this.clicked) {
            this.clicked = false;
            this.doubleTouchEvent();
        } else {
            cc.log("ontouchbegan4");
            this.clicked = true;
            this.runAction(cc.sequence(cc.delayTime(0.25), cc.callFunc(function () {
                this.singleTouchEvent();
            }.bind(this))))
        }
        cc.log("ontouchbegan5");


    },
    doubleTouchEvent: function () {
        if (this.state == 3) {
            this.finish(this.origPos);
            Game.op.chiTingCard(this.message, this.id);
        } else if (this.state == 4) {
            this.finish(this.origPos);
            Game.op.pengTingCard(this.message, this.id);
        } else {
            this.p.getParent().refreshCards();
            this.finish(this.origPos);
            cc.log("双击出牌");
            this.deal();
        }
    },
    singleTouchEvent: function () {
        cc.log("ontouchbegan6");
        if (this.state == 0) {
            cc.log("ontouchbegan7");
            this.p.getParent().refreshCards();
            cc.log("ontouchbegan8");
            this.state = 1;
            this._click2up();
        } else if (this.state == 1) {
            this.finish(this.origPos);
            cc.log("单击出牌");
            this.deal();
        } else if (this.state == 3) {
            this.finish(this.origPos);
            Game.op.chiTingCard(this.message, this.id);
        } else if (this.state == 4) {
            this.finish(this.origPos);
            Game.op.pengTingCard(this.message, this.id);
        }
    },
    onTouchMoved: function (touch, event) {
        var pos = touch.getLocation();
        var tmp = cc.pSub(pos, this.origTouch);
        var sq = Math.sqrt(tmp.x * tmp.x + tmp.y * tmp.y);
        if (sq > 1 || this.moveing) {
            //this.setPosition(pos);
            this.moveing = true;
            var delta = touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
        }
        if (this.clicked) {
            this.unschedule(this.singleTouchEvent);
        }
    },
    finish: function (pos) {
        this.setPosition(pos);
        Game.op._roomScene.players[Game.userPosition].refreshCards();
        Game.op._roomScene.players[Game.userPosition].overCards();
        // Game.op._roomScene.players[0].sortHandCard1();
    },
    setpos: function (pos) {
        this.pos = pos;
    },
    onTouchEnded: function (touch, event) {
        var pos = this.getPosition();
        if (pos.y - this.origPos.y > 112) {//打牌
            this.dealPair = false;
            if (this.state == 3) {
                this.finish(this.origPos);
                Game.op.chiTingCard(this.message, this.id);
                // this.setPosition(this.origPos);
                // this.state=0;
                // this.setVisible(false);
            } else if (this.state == 4) {
                this.finish(this.origPos);
                Game.op.pengTingCard(this.message, this.id);
                // this.setPosition(this.origPos);
                // this.state=0;
                // this.setVisible(false);
            }
            else {
                // Game.op.playCard(this.id);
                this.finish(this.origPos);
                cc.log("拖动出牌");
                this.deal();
                // this.setPosition(this.origPos);
                // this.deal(this.pos);
            }

        } else {//回到原来位置
            // this.state = 0;
            this.setPosition(this.origPos);
            if (this.origPos.y == 68) {
                this.state = 0;
                this.clicked = false;
            }
        }
    },
    deal: function () {
        this.state = 2;

        //出牌的逻辑
        this.pp = this.p.getParent();
        this.pp.disableTouchEvent = true;
        Game.op.playCard(this.id);

        this.setCanMove(false);
        this.setEnable(false);
    },
    fapai: function (delay) {
        var seq = cc.sequence(cc.delayTime(delay), cc.callFunc(function () {
            this.setScale(1.65);
            this.setVisible(true);

        }, this), cc.scaleTo(0.2, 1.1));
        this.runAction(seq);
    },
    afterDeal: function () {

    },
    ting: function () {
        this.state = 3;
        this.setCanMove(false);
        this.setEnable(false);
    },
    chupai: function () {
        this.setCanMove(true);
        this.setEnable(true);
    },
    wait: function () {
        this.setCanMove(false);
        this.setEnable(false);
        this.state = 0;
    },
    click: function () {
        if (this.state == 0) {
            this._click2up();
        } else if (this.state == 1) {
            this._click2deal(this.pos);
        } else if (this.state == 3) {
            this._click3deal();
        }
    },
    _click2up: function () {
        //this.p.
        cc.log("------------click21--------");
        this.runAction(cc.moveBy(0.01, cc.p(0, 30)));
        cc.log("--------------click22--------");
    },
    _click2down: function () {
        this.runAction(cc.moveBy(0.01, cc.p(0, -30)));
    },
    _click2deal: function (pos) {
        if (this.state == 1) {
            // this.deal(pos);
        }
    },
    setMessage: function (message) {
        this.message = message;
    },
    _click3deal: function () {
        Game.op.chiTingCard(this.message, this.id);
    },
    onExit: function () {
        this._super();
    }
});