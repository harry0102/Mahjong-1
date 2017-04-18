/**
 * Created by Wasu on 16/12/13.
 */

var UserActionLayer = ccui.Layout.extend({
    _gang: null,
    _angang: null,
    _peng: null,
    _chi: null,
    _hu: null,
    _ting: null,
    _pengTing: null,
    _chiTing: null,
    _cancel: null,
    _gangListener: null,
    _angangListener: null,
    _pengListener: null,
    _chiListener: null,
    _tingListener: null,
    _chiTingListener: null,
    _pengTingListener: null,
    _huListener: null,
    _cancelListener: null,
    _fifthBackground: null,
    _fourthBackground: null,
    _thirdBackground: null,
    _secondBackground: null,
    _firstBackground: null,

    _gangCards: [],
    _angangCards: [],
    _chiCards: [],
    _pengCards: [],
    _huCards: [],
    _tingCards: [],
    _chiTingCards: [],
    _chudepai: null,
    _pengTingCards: [],
    bigBox: null,
    _data: null,
    _beichiCards: [],
    _beichiTingCards: [],


    ctor: function () {
        this._super();

        // this.loadBackGround();
        this.loadText();
        this._chi.setPosition(1680, -160);
        this._peng.setPosition(1600, -160);
        this._gang.setPosition(1520, -160);
        this._hu.setPosition(1760, -160);
        this._ting.setPosition(1920, -160);
        this._ting1.setPosition(2160, -160);
        this._chiTing.setPosition(2000, -160);
        this._pengTing.setPosition(2080, -160);
        this._cancel.setPosition(1840, -160);
        this._angang.setPosition(1680, -160);

        this.initListener();

        this.bigBox = new cc.Layer(res.kuang);
        this.addChild(this.bigBox);
        this.bigBox.setPosition(cc.p(450, 200));
        this.bigBox.width = 400;
        this.bigBox.height = 100;

        // var node=new ccui.ImageView(res.kuang);
        // this.bigBox.addChild(node);
        // node.setScale9Enabled(true);
        // node.setSize(Size(300,200));

    },
    loadText: function () {
        // this._gang = new cc.LabelTTF("杠", "Arial", 32, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._gang = new cc.Sprite("#icon_green_gang.png");
        this._gang = new MyNode(this, "#icon_green_gang.png", this.onTouchGang);
        this._gang.setScale(0.6);
        this._gang.setLocalZOrder(900);
        // this._gang.setPositionX(this.width/2);
        // this._gang.setPositionY(this.height/2);
        // this._gang.setColor(cc.color(0,0,0));
        // this.addChild(this._gang, 900);

        // this._angang = new cc.LabelTTF("暗杠", "Arial", 32, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._angang = new cc.Sprite("#icon_green_gang.png");
        this._angang = new MyNode(this, "#icon_green_gang.png", this.onTouchAnGang);
        this._angang.setScale(0.6);
        this._angang.setLocalZOrder(900);
        // this._gang.setPositionX(this.width/2);
        // this._gang.setPositionY(this.height/2);
        // this._gang.setColor(cc.color(0,0,0));
        // this.addChild(this._angang, 900);

        // this._peng = new cc.LabelTTF("碰", "Arial", 32, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._peng = new cc.Sprite("#icon_green_peng.png");
        this._peng = new MyNode(this, "#icon_green_peng.png", this.onTouchPeng);
        this._peng.setScale(0.6);
        this._peng.setLocalZOrder(900);
        // this._peng.setPositionX(this.width/2);
        // this._peng.setPositionY(this.height/2);
        // this._peng.setColor(cc.color(0,0,0));
        // this.addChild(this._peng, 900);

        // this._chi = new cc.LabelTTF("吃", "Arial", 32, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._chi = new cc.Sprite("#icon_green_chi.png");
        this._chi = new MyNode(this, "#icon_green_chi.png", this.onTouchChi);
        this._chi.setScale(0.6);
        this._chi.setLocalZOrder(900);
        // this._chi.setPositionX(this.width/2);
        // this._chi.setPositionY(this.height/2);
        // this._chi.setColor(cc.color(0,0,0));
        // this.addChild(this._chi, 900);

        // this._hu = new cc.LabelTTF("胡", "Arial", 32, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._hu = new cc.Sprite("#icon_green_hu.png");
        this._hu = new MyNode(this, "#icon_green_hu.png", this.onTouchHu);
        this._hu.setScale(0.6);
        this._hu.setLocalZOrder(900);
        // this._hu.setPositionX(this.width/2);
        // this._hu.setPositionY(this.height/2);
        // this._hu.setColor(cc.color(0,0,0));
        // this.addChild(this._hu, 900);

        // this._ting = new cc.LabelTTF("听", "Arial", 32, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._ting = new cc.Sprite("#icon_green_ting.png");
        this._ting = new MyNode(this, "#icon_green_ting.png", this.onTouchTing);
        this._ting.setScale(0.6);
        this._ting.setLocalZOrder(900);

        this._ting1 = new MyNode(this, "#icon_green_ting.png", this.onTouchTing1);
        this._ting1.setScale(0.6);
        this._ting1.setLocalZOrder(900);
        // this._ting.setPositionX(this.width/2);
        // this._ting.setPositionY(this.height/2);
        //this._cancel.setColor(cc.color(0,0,0));
        // this.addChild(this._ting, 900);

        // this._chiTing = new cc.LabelTTF("吃听", "Arial", 32, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._chiTing = new cc.Sprite("#icon_yellow_chiting.png");
        this._chiTing = new MyNode(this, "#icon_yellow_chiting.png", this.onTouchChiTing);
        this._chiTing.setScale(0.75);
        this._chiTing.setLocalZOrder(900);
        // this._chiTing.setPositionX(this.width/2);
        // this._chiTing.setPositionY(this.height/2);
        //this._cancel.setColor(cc.color(0,0,0));
        // this.addChild(this._chiTing, 900);

        // this._pengTing = new cc.LabelTTF("碰听", "Arial", 32, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._pengTing = new cc.Sprite("#icon_yellow_pengting.png");
        this._pengTing = new MyNode(this, "#icon_yellow_pengting.png", this.onTouchPengTing);
        this._pengTing.setScale(0.75);
        this._pengTing.setLocalZOrder(900);
        // this._pengTing.setPositionX(this.width/2);
        // this._pengTing.setPositionY(this.height/2);
        //this._cancel.setColor(cc.color(0,0,0));
        // this.addChild(this._pengTing, 900);

        // this._cancel = new cc.LabelTTF("过", "Arial", 32, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._cancel = new cc.Sprite("#icon_green_guo.png");
        this._cancel = new MyNode(this, "#icon_green_guo.png", this.onTouchGuo);
        this._cancel.setScale(0.6);
        this._cancel.setLocalZOrder(900);
        // this._cancel.setPositionX(this.width/2);
        // this._cancel.setPositionY(this.height/2);
        //this._cancel.setColor(cc.color(0,0,0));
        // this.addChild(this._cancel, 900);

    },
    loadBackGround: function () {
        this._fifthBackground = new ccui.ImageView(res.logo_bg);
        this._fifthBackground.setPosition(860, 200);
        this._fifthBackground.setScale(0.35);
        this.addChild(this._fifthBackground);
        this._fifthBackground.setVisible(false);

        this._fourthBackground = new ccui.ImageView(res.logo_bg);
        this._fourthBackground.setPosition(940, 200);
        this._fourthBackground.setScale(0.35);
        this.addChild(this._fourthBackground);
        this._fourthBackground.setVisible(false);

        this._thirdBackground = new ccui.ImageView(res.logo_bg);
        this._thirdBackground.setPosition(1020, 200);
        this._thirdBackground.setScale(0.35);
        this.addChild(this._thirdBackground);
        this._thirdBackground.setVisible(false);

        this._secondBackground = new ccui.ImageView(res.logo_bg);
        this._secondBackground.setPosition(1100, 200);
        this._secondBackground.setScale(0.35);
        this.addChild(this._secondBackground);
        this._secondBackground.setVisible(false);

        this._firstBackground = new ccui.ImageView(res.logo_bg);
        this._firstBackground.setPosition(1180, 200);
        this._firstBackground.setScale(0.35);
        this.addChild(this._firstBackground);
        this._firstBackground.setVisible(false);

    },

    initListener: function () {


    },
    onTouchGuo: function () {
        this.setVisible(false);
        this.resetBackGround();
        //发送pass提示
        Game.op.passCard();

        if((Game.roomInfo.indexOf("3") < 0)&&(Game.op._roomScene.players[Game.userPosition]._handCardsLayer.getChildren().length % 3 == 2)){
            Game.op._roomScene.players[Game.userPosition].readyCard();
        }

    },
    onTouchPengTing: function () {
        var x, y;
        var tipCard = Card.TYPE.ORIGIN_DOWN_DESK;
        cc.log("press button");

        for (var i = 0; i < this._pengTingCards.length; i++) {
            var name2 = "";
            var name1 = "";
            var box = new cc.Layer(res.kuang);

            for (var j = 0; j < this._pengTingCards[i].length; j++) {
                if (this._pengTingCards[i][j].type == OpManager.TIPTYPE.CANPENGTING) {

                    this.bigBox.addChild(box, 2);
                    box.setPosition(cc.p(i * 100 - 18, -26));
                    box.width = 75;
                    box.height = 55;

                    var scle9 = new cc.Scale9Sprite(res.scale9_png, cc.rect(0, 0, 83, 83), cc.rect(10, 10, 20, 20));
                    scle9.x = box.x + box.width / 2;
                    scle9.y = box.y + box.height / 2;
                    scle9.width = box.width + 20;
                    scle9.height = box.height + 20;
                    this.bigBox.addChild(scle9);
                    for (var k = this._pengTingCards[i][j].cards.length - 1; k >= 0; k--) {

                        // var name=this._pengTingCards[i][j].cards[0]+"|"+this._pengTingCards[i][j].cards[1];
                        // box.setName(name);

                        var card = new DownCard(this.bigBox, this._pengTingCards[i][j].cards[k], tipCard);
                        card.wait();
                        x = k * tipCard.offset.width;
                        y = 0;
                        card.setPosition(cc.p(100 * i + k * 36, 0));
                        name1 += this._pengTingCards[i][j].cards[k] + "|";

                    }
                    EventManager.bindTouch({target: this, onTouchBegan: this.onTouchBeganPengTing}, box);

                } else if (this._pengTingCards[i][j].type == OpManager.TIPTYPE.YAOCHUDEPAI) {
                    this._chudepai = this._pengTingCards[i][j].cards[0];
                    for (var k = this._pengTingCards[i][j].cards.length - 1; k >= 0; k--) {
                        name2 += this._pengTingCards[i][j].cards[k] + "|";
                    }
                }
            }
            box.setName(name1 + "*" + name2);
            if (this._pengTingCards.length == 1) {
                this.bigBox.removeAllChildren();

                var card0 = name1.split("|");
                var sendCard = name2.split("|");

                var cardList = [];
                for (var i = 0; i < card0.length; i++) {
                    if (card0[i] != "") {
                        cardList.push(card0[i]);
                    }
                }
                var cards = Game.op._roomScene.players[Game.userPosition]._handCardsLayer;
                var handCard = Game.op._roomScene.players[Game.userPosition]._handCards;
                for (var j = 0; j < sendCard.length; j++) {
                    if (sendCard[j] != "") {
                        var _target = cards.getChildByTag(handCard.indexOf(parseInt(sendCard[j])));
                        _target.y = _target.y + 30;
                        _target.state = 4;
                        _target.setMessage(cardList);
                        _target.chupai();
                    }
                }

            }
        }

        this.resetBackGround1();
    },
    onTouchChiTing1: function () {
        var x, y;
        var tipCard = Card.TYPE.ORIGIN_DOWN_HAND;
        cc.log("press button");

        for (var i = 0; i < this._chiTingCards.length; i++) {
            var name2 = "";
            var name1 = "";
            var box = new cc.Layer(res.kuang);

            for (var j = 0; j < this._chiTingCards[i].length; j++) {

                if (this._chiTingCards[i][j].type == OpManager.TIPTYPE.CANCHITING) {

                    this.bigBox.addChild(box, 2);
                    box.setPosition(cc.p(i * 150 - 33, -56));
                    box.width = 134;
                    box.height = 112;

                    var scle9 = new cc.Scale9Sprite(res.scale9_png, cc.rect(0, 0, 83, 83), cc.rect(10, 10, 20, 20));
                    scle9.x = box.x + box.width / 2;
                    scle9.y = box.y + box.height / 2;
                    scle9.width = box.width + 20;
                    scle9.height = box.height + 20;
                    this.bigBox.addChild(scle9);

                    for (var k = this._chiTingCards[i][j].cards.length - 1; k >= 0; k--) {
                        var card = new DownCard(this.bigBox, this._chiTingCards[i][j].cards[k], tipCard);
                        card.wait();
                        x = k * tipCard.offset.width;
                        y = 0;
                        card.setPosition(cc.p(150 * i + k * 67, 0));
                        name1 += this._chiTingCards[i][j].cards[k] + "|";

                    }
                    EventManager.bindTouch({target: this, onTouchBegan: this.onTouchBeganChiTing}, box);

                } else if (this._chiTingCards[i][j].type == OpManager.TIPTYPE.YAOCHUDEPAI) {
                    this._chudepai = this._chiTingCards[i][j].cards[0];
                    for (var k = this._chiTingCards[i][j].cards.length - 1; k >= 0; k--) {
                        name2 += this._chiTingCards[i][j].cards[k] + "|";
                    }
                }

            }
            box.setName(name1 + "*" + name2);

            if (this._chiTingCards.length == 1) {
                this.bigBox.removeAllChildren();

                var card0 = name1.split("|");
                var sendCard = name2.split("|");

                var cardList = [];
                for (var i = 0; i < card0.length; i++) {
                    if (card0[i] != "") {
                        cardList.push(card0[i]);
                    }
                }
                var cards = Game.op._roomScene.players[Game.userPosition]._handCardsLayer;
                var handCard = Game.op._roomScene.players[Game.userPosition]._handCards;
                for (var j = 0; j < sendCard.length; j++) {
                    if (sendCard[j] != "") {
                        var _target = cards.getChildByTag(handCard.indexOf(parseInt(sendCard[j])));
                        _target.y = _target.y + 30;
                        _target.state = 3;
                        _target.setMessage(cardList);
                        _target.chupai();
                    }
                }

            }
        }

        this.resetBackGround1();
    },
    onTouchTing: function () {
        var x, y;
        var tipCard = Card.TYPE.ORIGIN_DOWN_HAND;
        cc.log("press button");

        for (var i = 0; i < this._tingCards.length; i++) {


            for (var k = this._tingCards[i].cards.length - 1; k >= 0; k--) {
                var box = new cc.Layer(res.kuang);
                this.bigBox.addChild(box, 2);
                box.setPosition(cc.p(k * 150 - 33, -56));
                box.width = 67;
                box.height = 112;
                box.setName(this._tingCards[i].cards[k]);

                var scle9 = new cc.Scale9Sprite(res.scale9_png, cc.rect(0, 0, 83, 83), cc.rect(10, 10, 20, 20));
                scle9.x = box.x + box.width / 2;
                scle9.y = box.y + box.height / 2;
                scle9.width = box.width + 20;
                scle9.height = box.height + 20;
                this.bigBox.addChild(scle9);

                // var card = Card.create(this._tingCards[i].cards[k], tipCard.prefix);
                var card = new DownCard(this.bigBox, this._tingCards[i].cards[k], tipCard);
                card.wait();
                // box.addChild(card);
                x = k * tipCard.offset.width;
                y = 0;
                card.setPosition(cc.p(k * 150, 0));
                card.setName(this._tingCards[i].cards[k]);

                if (this._tingCards[i].cards.length == 1) {
                    this.bigBox.removeAllChildren();
                    this.resetBackGround();
                    // Game.op._roomScene.players[0].sortHandCard1();
                    Game.op.tingCard(this._tingCards[i].cards[k]);
                }
                EventManager.bindTouch({target: this, onTouchBegan: this.onTouchBeganTing}, box);

            }


        }
        this.resetBackGround1();
    },
    onTouchTing1:function () {
        Game.op.tingCard1();
        this.resetBackGround();
    },
    onTouchHu: function () {
        this.resetBackGround();

        Game.op.huCard(this._huCards);

    },
    onTouchPeng: function () {
        //弹框消失
        this.resetBackGround();
        Game.op.pengCard(this._pengCards);

    },
    onTouchAnGang: function () {
        this.resetBackGround();
        //发送杠提示
        Game.op.angangCard(this._angangCards);

    },
    onTouchGang: function () {
        this.resetBackGround();
        //发送杠提示
        Game.op.gangCard(this._gangCards);

    },
    onTouchChi: function () {
        var x, y;
        var tipCard = Card.TYPE.ORIGIN_DOWN_HAND;
        var result = [];
        cc.log("press button");

        for (var i = 0; i < this._chiCards.length; i++) {
            var box = new cc.Layer(res.kuang);
            var name = this._chiCards[i].cards[0] + "|" + this._chiCards[i].cards[1];
            box.setName(name);
            box.setPosition(cc.p(i * 185 - 25, -41));
            box.width = 145;
            box.height = 80;
            this.bigBox.addChild(box);

            var scle9 = new cc.Scale9Sprite(res.scale9_png, cc.rect(0, 0, 83, 83), cc.rect(10, 10, 20, 20));
            scle9.x = box.x + box.width / 2;
            scle9.y = box.y + box.height / 2;
            scle9.width = box.width + 10;
            scle9.height = box.height + 10;
            this.bigBox.addChild(scle9);

            for (var k = this._chiCards[i].cards.length - 1; k >= 0; k--) {
                // var card = Card.create(this._chiCards[i].cards[k], tipCard.prefix);
                result.push(this._chiCards[i].cards[k]);

            }
            result.push(this._beichiCards[0].cards[0]);
            result = result.sort();

            for (var j = 0; j < result.length; j++) {
                var card = new DownCard(this.bigBox, result[j], tipCard);
                if (result[j] == this._beichiCards[0].cards[0]) {
                    card.setColor(cc.color(237, 209, 10));
                }
                card.wait();
                card.setScale(0.7);
                x = k * tipCard.offset.width;
                y = 0;
                card.setPosition(cc.p(185 * i + j * 47, 0));
                var name = this._chiCards[i].cards[0] + "|" + this._chiCards[i].cards[1];
                card.setName(name);
                // card.setName(this._chiCards[i].cards[k]);
            }
            EventManager.bindTouch({
                target: this,
                onTouchBegan: this.onTouchBeganChi
            }, box);

            if (this._chiCards.length == 1) {
                this.bigBox.removeAllChildren();
                this.resetBackGround();
                Game.op.chiCard(name);
            }
            result = [];
        }
        this.resetBackGround1();
    },
    onTouchChiTing: function () {
        var x, y;
        var tipCard = Card.TYPE.ORIGIN_DOWN_HAND;
        var result = [];
        cc.log("press button");

        for (var i = 0; i < this._chiTingCards.length; i++) {
            var name2 = "";
            var name1 = "";
            var box = new cc.Layer(res.kuang);

            for (var j = 0; j < this._chiTingCards[i].length; j++) {

                if (this._chiTingCards[i][j].type == OpManager.TIPTYPE.CANCHITING) {

                    this.bigBox.addChild(box, 2);
                    box.setPosition(cc.p(i * 185 - 25, -41));
                    box.width = 145;
                    box.height = 80;

                    var scle9 = new cc.Scale9Sprite(res.scale9_png, cc.rect(0, 0, 83, 83), cc.rect(10, 10, 20, 20));
                    scle9.x = box.x + box.width / 2;
                    scle9.y = box.y + box.height / 2;
                    scle9.width = box.width + 10;
                    scle9.height = box.height + 10;
                    this.bigBox.addChild(scle9);


                    for (var k = this._chiTingCards[i][j].cards.length - 1; k >= 0; k--) {
                        // var card = Card.create(this._chiCards[i].cards[k], tipCard.prefix);
                        result.push(this._chiTingCards[i][j].cards[k]);
                        name1 += this._chiTingCards[i][j].cards[k] + "|";
                    }
                    result.push(this._beichiTingCards[0].cards[0]);
                    result = result.sort();

                    for (var l = 0; l < result.length; l++) {
                        var card = new DownCard(this.bigBox, result[l], tipCard);
                        if (result[l] == this._beichiTingCards[0].cards[0]) {
                            card.setColor(cc.color(237, 209, 10));
                        }
                        card.wait();
                        card.setScale(0.7);
                        x = k * tipCard.offset.width;
                        y = 0;
                        card.setPosition(cc.p(185 * i + l * 47, 0));

                    }
                    result.splice(0, result.length);
                    EventManager.bindTouch({target: this, onTouchBegan: this.onTouchBeganChiTing}, box);

                } else if (this._chiTingCards[i][j].type == OpManager.TIPTYPE.YAOCHUDEPAI) {
                    this._chudepai = this._chiTingCards[i][j].cards[0];
                    for (var k = this._chiTingCards[i][j].cards.length - 1; k >= 0; k--) {
                        name2 += this._chiTingCards[i][j].cards[k] + "|";
                    }
                }
                    result=[];
            }
            box.setName(name1 + "*" + name2);

            if (this._chiTingCards.length == 1) {
                this.bigBox.removeAllChildren();

                var card0 = name1.split("|");
                var sendCard = name2.split("|");

                var cardList = [];
                for (var i = 0; i < card0.length; i++) {
                    if (card0[i] != "") {
                        cardList.push(card0[i]);
                    }
                }
                var cards = Game.op._roomScene.players[Game.userPosition]._handCardsLayer;
                var handCard = Game.op._roomScene.players[Game.userPosition]._handCards;
                for (var j = 0; j < sendCard.length; j++) {
                    if (sendCard[j] != "") {
                        var _target = cards.getChildByTag(handCard.indexOf(parseInt(sendCard[j])));
                        _target.y = _target.y + 30;
                        _target.state = 3;
                        _target.setMessage(cardList);
                        _target.chupai();
                    }
                }

            }
        }

        this.resetBackGround1();
    },
    onTouchChi1: function () {
        var x, y;
        var tipCard = Card.TYPE.ORIGIN_DOWN_HAND;
        cc.log("press button");

        for (var i = 0; i < this._chiCards.length; i++) {
            var box = new cc.Layer(res.kuang);
            var name = this._chiCards[i].cards[0] + "|" + this._chiCards[i].cards[1];
            box.setName(name);
            box.setPosition(cc.p(i * 150 - 33, -56));
            box.width = 134;
            box.height = 112;
            this.bigBox.addChild(box);

            var scle9 = new cc.Scale9Sprite(res.scale9_png, cc.rect(0, 0, 83, 83), cc.rect(10, 10, 20, 20));
            scle9.x = box.x + box.width / 2;
            scle9.y = box.y + box.height / 2;
            scle9.width = box.width + 20;
            scle9.height = box.height + 20;
            this.bigBox.addChild(scle9);

            for (var k = this._chiCards[i].cards.length - 1; k >= 0; k--) {
                // var card = Card.create(this._chiCards[i].cards[k], tipCard.prefix);
                var card = new DownCard(this.bigBox, this._chiCards[i].cards[k], tipCard);
                card.wait();
                // box.addChild(card);
                x = k * tipCard.offset.width;
                y = 0;
                card.setPosition(cc.p(150 * i + k * 67, 0));
                card.setName(this._chiCards[i].cards[k]);

            }
            EventManager.bindTouch({
                target: this,
                onTouchBegan: this.onTouchBeganChi
            }, box);

            if (this._chiCards.length == 1) {
                this.bigBox.removeAllChildren();
                this.resetBackGround();
                Game.op.chiCard(name);
            }
        }

        this.resetBackGround1();
    },
    onTouchBeganChi: function (touch, event) {
        var target = event.getCurrentTarget();

        Game.op.chiCard(target.getName());
        this.resetBackGround();

        // target.getParent().removeFromParent();
    },
    onTouchBeganTing: function (touch, event) {
        var target = event.getCurrentTarget();
        // Game.op._roomScene.players[0].sortHandCard1();

        Game.op.tingCard(target.getName());
        this.resetBackGround();

        // target.getParent().removeFromParent();
    },
    onTouchBeganChiTing: function (touch, event) {
        var target = event.getCurrentTarget();
        var card0 = target.getName().split("*")[0];
        var sendCard = target.getName().split("*")[1];
        card0 = card0.split("|");
        sendCard = sendCard.split("|");

        var cardList = [];
        for (var i = 0; i < card0.length; i++) {
            if (card0[i] != "") {
                cardList.push(parseInt(card0[i]));
            }
        }

        var cards = Game.op._roomScene.players[Game.userPosition]._handCardsLayer;
        var handCard = Game.op._roomScene.players[Game.userPosition]._handCards;
        for (var j = 0; j < sendCard.length; j++) {
            if (sendCard[j] != "") {
                var _target = cards.getChildByTag(handCard.indexOf(parseInt(sendCard[j])));
                _target.y = _target.y + 30;
                _target.state = 3;
                _target.setMessage(cardList);
                // _target.ting();

                _target.chupai();
            }
        }
        this.resetBackGround();
    },
    onTouchBeganPengTing: function (touch, event) {
        var target = event.getCurrentTarget();
        var tipCard = Card.TYPE.ORIGIN_DOWN_HAND;
        var card0 = target.getName().split("*")[0];
        var sendCard = target.getName().split("*")[1];
        card0 = card0.split("|");
        sendCard = sendCard.split("|");

        var cardList = [];
        for (var i = 0; i < card0.length; i++) {
            if (card0[i] != "") {
                cardList.push(parseInt(card0[i]));
            }
        }
        var cards = Game.op._roomScene.players[Game.userPosition]._handCardsLayer;
        var handCard = Game.op._roomScene.players[Game.userPosition]._handCards;
        for (var j = 0; j < sendCard.length; j++) {
            if (sendCard[j] != "") {
                var _target = cards.getChildByTag(handCard.indexOf(parseInt(sendCard[j])));
                _target.y = _target.y + 30;
                _target.state = 4;
                _target.setMessage(cardList);
                // _target.ting();

                _target.chupai();
            }
        }

        this.resetBackGround();
    },
    gangAction: function (card) {
        this._data = card;
        cc.log("gangaction+++++++++");
        for (var i = 0; i < card.length; i++) {
            if (card[i].type == OpManager.TIPTYPE.CANMINGGANG) {
                this._gang.setPosition(cc.p(900 - 120 * i, 200));
                // this._firstBackground.setVisible(true);
                this._cancel.setPosition(1020, 200);
                this._gangCards = card[i].tipInfos[0].cards[0].cards[0];
                // this._chi.setTouchEnabled(true);
            }
        }
        cc.log("pgangaction+++++++++finish");
    },
    angangAction: function (card) {
        this._data = card;
        cc.log("gangaction+++++++++");
        for (var i = 0; i < card.length; i++) {
            if (card[i].type == OpManager.TIPTYPE.CANANGANG) {
                this._angang.setPosition(cc.p(900 - 120 * i, 200));
                // this._firstBackground.setVisible(true);
                this._cancel.setPosition(1020, 200);
                this._angangCards = card[i].tipInfos[0].cards[0].cards[0];
                // this._chi.setTouchEnabled(true);
            }
        }
        cc.log("pgangaction+++++++++finish");
    },
    pengAction: function (card) {
        this._data = card;
        cc.log("pengaction+++++++++");
        for (var i = 0; i < card.length; i++) {
            if (card[i].type == OpManager.TIPTYPE.CANPENGPAI) {
                this._peng.setPosition(cc.p(900 - 120 * i, 200));
                // this._firstBackground.setVisible(true);
                this._cancel.setPosition(cc.p(1020, 200));
                this._pengCards = card[i].tipInfos[0].cards[0].cards[0];
                // this._chi.setTouchEnabled(true);
                cc.log("chiAction ====:++++finish");
            }
        }
        cc.log("pengaction+++++++++finish");
    },
    chiAction: function (card) {
        this._data = card;
        cc.log("chiAction ====:" + card);
        for (var i = 0; i < card.length; i++) {
            if (card[i].type == OpManager.TIPTYPE.CANCHIPAI) {
                this._chi.setPosition(cc.p(900 - 120 * i, 200));
                // this._firstBackground.setVisible(true);
                this._cancel.setPosition(1020, 200);
                this._chiCards = card[i].tipInfos[0].cards;
                this._beichiCards = card[i].tipInfos[1].cards;
                // this._chi.setTouchEnabled(true);
                cc.log("chiAction ====:++++finish");
            }
        }

    },
    huAction: function (card) {
        // this._data=card;
        for (var i = 0; i < card.length; i++) {
            if (card[i].type == OpManager.TIPTYPE.CANHU) {
                this._hu.setPosition(cc.p(900 - 120 * i, 200));
                // this._firstBackground.setVisible(true);
                this._cancel.setPosition(1020, 200);
                this._huCards = card[i].tipInfos[0].cards[0].cards[0];
                // this._chi.setTouchEnabled(true);
                cc.log("huAction=====");
            }
        }
    },
    tingACtion: function (card) {
        this._data = card;
        for (var i = 0; i < card.length; i++) {
            if (card[i].type == OpManager.TIPTYPE.CANTING) {
                if(Game.roomInfo.indexOf("3") >= 0){
                    this._ting1.setPosition(cc.p(900 - 120 * i, 200));
                }else{
                    this._ting.setPosition(cc.p(900 - 120 * i, 200));
                    this._tingCards = card[i].tipInfos[0].cards;
                }

                // this._firstBackground.setVisible(true);
                this._cancel.setPosition(1020, 200);
                // this._chi.setTouchEnabled(true);
                cc.log("tingAction=====");
            }
        }
    },
    chiTingACtion: function (card) {
        this._data = card;
        for (var i = 0; i < card.length; i++) {
            if (card[i].type == OpManager.TIPTYPE.CANCHITING) {
                this._chiTing.setPosition(cc.p(900 - 120 * i, 200));
                // this._firstBackground.setVisible(true);
                this._cancel.setPosition(1020, 200);
                this._chiTingCards = card[i].tipInfos[0].cardsList;
                this._beichiTingCards = card[i].tipInfos[1].cards;
                // this._chi.setTouchEnabled(true);
                cc.log("chitingAction=====");
            }
        }
    },
    pengTingACtion: function (card) {
        this._data = card;
        for (var i = 0; i < card.length; i++) {
            if (card[i].type == OpManager.TIPTYPE.CANPENGTING) {
                this._pengTing.setPosition(cc.p(900 - 120 * i, 200));
                // this._firstBackground.setVisible(true);
                this._cancel.setPosition(1020, 200);
                this._pengTingCards = card[i].tipInfos[0].cardsList;
                // this._chi.setTouchEnabled(true);
                cc.log("pengtingAction=====");
            }
        }
    },

    resetBackGround: function () {
        this.bigBox.removeAllChildren();
        this.setVisible(false);
        this._peng.x = 1600;
        this._gang.x = 1520;
        this._chi.x = 1680;
        this._hu.x = 1760;
        this._cancel.x = 1840;
        this._ting.x = 1920;
        this._chiTing.x = 2000;
        this._pengTing.x = 2080;
        this._angang.x = 2160;
        this._ting1.x=2240;

    },
    resetBackGround1: function () {

        this._peng.x = 1600;
        this._gang.x = 1520;
        this._chi.x = 1680;
        this._hu.x = 1760;
        // this._cancel.x = 1840;
        this._ting.x = 1920;
        this._chiTing.x = 2000;
        this._pengTing.x = 2080;
        this._angang.x = 2160;
        this._ting1.x=2240;
    },
});