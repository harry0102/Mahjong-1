/**
 * Created by foo on 2016/11/15.
 */


var UserLayer = cc.Layer.extend({
    _handCards: [],
    _deskCards: [],
    _solidCards: [],
    _gangSolidCards: [],
    _handCardsLayer: null,
    _deskCardsLayer: null,
    _solidCardsLayer: null,
    _drawCard: null, // 抓牌
    _pongManage: null,
    _direction: null, //方向
    _cardtype: null,
    disableTouchEvent: true,
    _callback: null,
    user: null,
    isOrdered: false,
    isProtected: false,
    ctor: function (direction) {
        this._super();
        this._direction = direction;

        switch (this._direction) {
            case DIRECTION.DOWN:
                // this._cardtype = Card.TYPE.HAND_DOWN;
                this._cardtype = Card.TYPE.ORIGIN_DOWN_HAND;
                break;
            case DIRECTION.UP:
                // this._cardtype = Card.TYPE.HAND_UP;
                this._cardtype = Card.TYPE.ORIGIN_UP_HAND;
                break;
            case DIRECTION.LEFT:
                // this._cardtype = Card.TYPE.HAND_LEFT;
                this._cardtype = Card.TYPE.ORIGIN_LEFT_HAND;
                break;
            case DIRECTION.RIGHT:
                // this._cardtype = Card.TYPE.HAND_RIGHT;
                this._cardtype = Card.TYPE.ORIGIN_RIGHT_HAND;
                break;
        }

        this._solidCardsLayer = new cc.Layer();
        this._handCardsLayer = new cc.Layer();
        this._deskCardsLayer = new cc.Layer();
        this._handCards = new Array();
        this._solidCards = new Array();
        this._deskCards = new Array();
        // this._handCardsLayer
        this.addChild(this._solidCardsLayer);
        this.addChild(this._handCardsLayer);
        this.addChild(this._deskCardsLayer);
    },
    setCallback: function (callback) {
        this._callback = callback;
    },
    dealCard2: function (cards) {
        this._handCards = cards.sort();
    },
    //发牌
    dealCard1: function (cards) {
        cc.log("------------------开始发牌--------------");
        this._handCards = cards.sort(function (a, b) {
            return b - a;
        });
        var prev = null;
        var offset = this._cardtype.offset, scale = this._cardtype.scale || 1;
        for (var i = 0; i < this._handCards.length; i++) {   // = this._handCards.length - 1; i >= 0; i--) {
            var k = this._direction == DIRECTION.DOWN ? this._handCards[i] : "";

            var newCard = null;
            switch (this._direction) {
                case DIRECTION.DOWN:
                    newCard = new DownCard(this._handCardsLayer, k, Card.TYPE.ORIGIN_DOWN_HAND, this.onTouchBegan, this);
                    newCard.setScale(1.11);
                    if (!prev) {
                        newCard.setPosition(1010, 68);
                    } else {
                        Utils.left(prev, newCard);
                    }
                    prev = newCard;

                    newCard.wait();

                    break;
                case DIRECTION.UP:
                    newCard = new UpCard(this._handCardsLayer, k, Card.TYPE.ORIGIN_UP_HAND);
                    if (!prev) {
                        newCard.setPosition(405, 651.5);
                    } else {
                        Utils.right(prev, newCard);
                    }
                    prev = newCard;
                    break;
                case DIRECTION.LEFT:
                    newCard = new LeftCard(this._handCardsLayer, k, Card.TYPE.ORIGIN_LEFT_HAND);
                    if (!prev) {
                        newCard.setPosition(184, 237);
                    } else {
                        Utils.up(prev, newCard, -34);
                    }
                    newCard.setLocalZOrder(100 - i);
                    prev = newCard;
                    break;
                case DIRECTION.RIGHT:
                    newCard = new RightCard(this._handCardsLayer, k, Card.TYPE.ORIGIN_RIGHT_HAND);
                    if (!prev) {
                        newCard.setPosition(1097, 580);
                    } else {
                        Utils.down(prev, newCard, -34);
                    }
                    prev = newCard;
                    break;
            }
            // card.setTag(k);
            newCard.setTag(i);
            newCard.setName(this._handCards[i]);
            newCard.id = this._handCards[i];
            newCard.setVisible(false);
            newCard.fapai(0.2);
        }
        cc.log("------------------发牌结束--------------当前手牌为:");
        cc.log(this._handCards);

    },
    dealDeskCard: function (cards) {

        var ctd, x, y, offset;
        for (var i = 0; i < cards.length; i++) {

            switch (this._direction) {
                case DIRECTION.DOWN:
                    ctd = Card.TYPE.ORIGIN_DOWN_DESK;
                    offset = ctd.offset;
                    var deskTarget = new DownCard(this._deskCardsLayer, cards[i], Card.TYPE.ORIGIN_DOWN_DESK, this.onTouchBegan, this);

                    x = 450 + parseInt(this._deskCards.length % 11) * offset.width;
                    y = 250 - parseInt(this._deskCards.length / 11) * offset.height;

                    break;
                case DIRECTION.LEFT:
                    ctd = Card.TYPE.ORIGIN_LEFT_DESK;
                    offset = ctd.offset;
                    var deskTarget = new LeftCard(this._deskCardsLayer, cards[i], Card.TYPE.ORIGIN_LEFT_DESK);

                    x = 400 - parseInt(this._deskCards.length / 11) * offset.width;
                    y = 520 - parseInt(this._deskCards.length % 11) * (offset.height - 10);
                    deskTarget.setLocalZOrder(this._deskCards.length);

                    break;
                case DIRECTION.UP:
                    ctd = Card.TYPE.ORIGIN_UP_DESK;
                    offset = ctd.offset;
                    var deskTarget = new UpCard(this._deskCardsLayer, cards[i], Card.TYPE.ORIGIN_UP_DESK);

                    x = 450 + parseInt(this._deskCards.length % 11) * offset.width;
                    y = 580 - parseInt(this._deskCards.length / 11) * offset.height;

                    break;
                case DIRECTION.RIGHT:
                    ctd = Card.TYPE.ORIGIN_RIGHT_DESK;
                    offset = ctd.offset;
                    var deskTarget = new RightCard(this._deskCardsLayer, cards[i], Card.TYPE.ORIGIN_RIGHT_DESK);

                    x = 880 + parseInt(this._deskCards.length / 11) * offset.width;
                    y = 180 + parseInt(this._deskCards.length % 11) * (offset.height - 10);
                    deskTarget.setLocalZOrder(-this._deskCards.length);

                    cc.log("right 坐标为：" + x + "   " + y);
                    cc.log(this._deskCards);
                    cc.log(this._deskCardsLayer);
                    break;
            }
            deskTarget.setPosition(x, y);
            this._deskCards = this._deskCards.add(cards[i]);
        }

    },

    sortHandCard1: function () {
        cc.log("------------------需要整理牌--------------");
        if (this.isProtected) {
            this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
                this.sortHandCard1();
            }.bind(this))));
            return false;
        }
        cc.log("------------------开始整理牌--------------当前手牌为:");
        cc.log(this._handCards);
        var childs = this._handCardsLayer.getChildren();
        childs = childs.sort(function (a, b) {
            return b.id - a.id;
        });
        // this._direction == DIRECTION.DOWN && cc.log(this._handCards);

        this._handCards = this._handCards.sort(function (a, b) {
            return b - a;
        });
        // this._direction == DIRECTION.DOWN && cc.log(this._handCards);

        var offset = this._cardtype.offset, scale = this._cardtype.scale || 1;
        var prev = null;
        for (var i = 0; i < childs.length; i++) {
            var card = childs[i];
            switch (this._direction) {
                case DIRECTION.DOWN:
                    if (!prev) {
                        card.setPosition(1010, 68);
                    } else {
                        Utils.left(prev, card);
                    }
                    prev = card;
                    break;
                case DIRECTION.RIGHT:
                    if (!prev) {
                        card.setPosition(1097, 580);
                    } else {
                        Utils.down(prev, card, -34);
                    }
                    // card.setLocalZOrder(100-i);
                    prev = card;
                    break;
                case DIRECTION.UP:
                    if (!prev) {
                        card.setPosition(405, 651.5);
                    } else {
                        Utils.right(prev, card);
                    }
                    prev = card;
                    break;
                case DIRECTION.LEFT:
                    if (!prev) {
                        card.setPosition(184, 237);
                    } else {
                        Utils.up(prev, card, -34);
                    }
                    card.setLocalZOrder(100 - i);
                    prev = card;
                    break;
            }
            card.setTag(i);
            // card.setScale(scale);
        }

        cc.log("------------------整理结束--------------当前手牌为:");
        cc.log(this._handCards);

    },

    _bindTouchEvent: function (card) {
        EventManager.bindTouch({target: this, onTouchBegan: this.onTouchBegan}, card);
    },
    onEnter: function () {
        this._super();
        // this.dealCard();
        cc.log("UserLayer onEnter")
    },
    onTouchBegan: function (touch, event) {

    },
    onExit: function () {
        this._super();
    },
    update: function (dt) {
        // for(var i=0;i<this._handCards.length;i++){
        //     this._handCardsLayer =
        // }
        cc.log("ttt:" + dt);
    },
    //抓牌
    closeProtect: function () {
        this.isProtected = false;
    },
    drawCard1: function (card) {
        cc.log("------------------开始抓牌--------------当前手牌为:");
        cc.log(this._handCards);

        this.isProtected = true;
        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
           this.closeProtect();
        }.bind(this))));
        var offset = this._cardtype.offset;
        var newCard = null;
        // var prev=null;
        switch (this._direction) {
            case DIRECTION.DOWN:
                newCard = new DownCard(this._handCardsLayer, card, Card.TYPE.ORIGIN_DOWN_HAND, this.onTouchBegan, this);
                newCard.setScale(1.11);
                newCard.x = 1078 + offset.width / 2;
                newCard.y = 68;

                this._handCards.push(card);

                if ((Game.tingState == 0) && (Game.roomInfo.indexOf("3") < 0) && (!this.getParent()._userAction.isVisible())) {
                    this.disableTouchEvent = false;
                    for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
                        var target = this._handCardsLayer.getChildren()[i];
                        target.chupai();
                    }
                }
                break;
            case DIRECTION.UP:
                newCard = new UpCard(this._handCardsLayer, card, Card.TYPE.ORIGIN_UP_HAND);
                newCard.x = 336 + offset.width / 2;
                newCard.y = 620 + offset.height / 2;
                this._handCards.push(card);

                break;
            case DIRECTION.LEFT:
                newCard = new LeftCard(this._handCardsLayer, card, Card.TYPE.ORIGIN_LEFT_HAND);
                newCard.x = 170 + offset.width / 2;
                newCard.y = 150 + offset.height / 2;
                this._handCards.push(card);

                break;
            case DIRECTION.RIGHT:
                newCard = new RightCard(this._handCardsLayer, card, Card.TYPE.ORIGIN_RIGHT_HAND);
                newCard.x = 1084 + offset.width / 2;
                newCard.y = 630 + offset.height / 2;
                this._handCards.push(card);

                break;
        }

        newCard.setTag(this._handCards.length);
        newCard.id = card;
        newCard.setName(card);

        if (card != 0 && this._handCardsLayer.getChildren().length % 3 == 1) {
            this.refreshCard();
        }
        if ((!Game.op._roomScene._UILayer._head_down_ting.isVisible()) && (Game.roomInfo.indexOf("3") >= 0)) {
            this.sortHandCard1();
        }

        cc.log("------------------抓牌结束--------------当前手牌为:");
        cc.log(this._handCards);
    },
    refreshCard: function () {
        for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
            var _target = this._handCardsLayer.getChildren()[i];
            _target.wait();
        }
    },
    //碰牌
    pengCard1: function (player) {
        cc.log("------------------开始碰牌--------------当前手牌为:");
        cc.log(this._handCards);

        var card = player.cards[0].cards[0];

        var position = player.position;

        var solid;
        var x, y;

        if ((this._direction == DIRECTION.DOWN)) {
            //去除手中的碰牌
            var _t_cards = [];
            for (var j = 0; j < 2; j++) {
                // var _target = this._handCardsLayer.getChildByTag(this._handCards.indexOf(card) + j);
                var _target = this._handCardsLayer.getChildByName(card);
                _target.removeFromParent();
                _t_cards.push(card);
            }
            this._handCards.remove(_t_cards);

            for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
                var target = this._handCardsLayer.getChildren()[i];
                target.chupai();
            }
        } else {
            //其他人删除
            for (var j = 0; j < 2; j++) {
                var index = this._handCards.indexOf(0);
                var pengItems = this._handCardsLayer.getChildByTag(index + j);
                pengItems.removeFromParent();
                this._handCards.remove(0);
            }
        }

        for (var i = 0; i < 3; i++) {
            var tmpCard = null;
            switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
                case DIRECTION.DOWN:
                    // this._cardtype = Card.TYPE.HAND_DOWN;
                    // solid = Card.TYPE.ORIGIN_DOWN_HAND;
                    // tmpCard = new DownCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_DOWN_DESK, this.onTouchBegan, this);
                    tmpCard = new DeskCard(this._solidCardsLayer, card, 2);
                    tmpCard.setLocalZOrder(100 - i);

                    break;
                case DIRECTION.UP:
                    // this._cardtype = Card.TYPE.HAND_UP;
                    // solid = Card.TYPE.ORIGIN_UP_HAND;
                    tmpCard = new UpCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_UP_DESK);
                    break;
                case DIRECTION.LEFT:
                    // this._cardtype = Card.TYPE.HAND_LEFT;
                    // solid = Card.TYPE.ORIGIN_LEFT_HAND;
                    tmpCard = new LeftCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_UP_DESK);
                    break;
                case DIRECTION.RIGHT:
                    // this._cardtype = Card.TYPE.HAND_RIGHT;
                    // solid = Card.TYPE.ORIGIN_RIGHT_HAND;
                    tmpCard = new RightCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_UP_DESK);
                    tmpCard.setLocalZOrder(100 - i);
                    break;
            }
            // var tmpCard = Card.create(card, solid.prefix);

            tmpCard.id = card;
            this._solidCards.add(card);
            // this._solidCardsLayer.addChild(tmpCard);


            switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
                case DIRECTION.UP:
                    //上885,651.5
                    // x=1200-parseInt((this._solidCards.length-1)/3)*160 -parseInt((this._solidCards.length-1)%3)*33;
                    x = 950 - parseInt((this._solidCards.length - 1) / 3) * 130 - parseInt((this._solidCards.length - 1) % 3) * 33;
                    y = 650;
                    break;
                case DIRECTION.DOWN:
                    //下 125,68
                    x = (70 + parseInt((this._solidCards.length - 1) / 3) * 190 + parseInt((this._solidCards.length - 1) % 3) * 55);
                    y = 75;
                    break;
                case DIRECTION.LEFT:
                    //左170+1/2,563
                    x = 184;
                    y = 650 - parseInt((this._solidCards.length - 1) / 3) * 110 - parseInt((this._solidCards.length - 1) % 3) * 30;
                    break;
                case DIRECTION.RIGHT:
                    //右1084+1/2,188.5
                    x = 1097;
                    y = 166 + parseInt((this._solidCards.length - 1) / 3) * 110 + parseInt((this._solidCards.length - 1) % 3) * 30;
                    break;
            }

            //动作之后的相同逻辑
            this.finishAction();

            var action = cc.spawn(cc.moveTo(0.1, cc.p(x, y)), cc.scaleTo(0.1, 1));

            tmpCard.runAction(cc.sequence(action, cc.callFunc(function () {
                // this._deskCardsLayer.removeChild(tmpTarget);
                cc.log(tmpCard.x + "," + tmpCard.y);

                // this.sortHandCard();
            }.bind(this))));
            // }
        }

        this.sortHandCard1();
        this.disableTouchEvent = false;

        cc.log("------------------碰牌结束--------------当前手牌为:");
        cc.log(this._handCards);
    },
    //碰听牌
    pengtingCard1: function (player, player1) {
        cc.log("------------------开始碰听牌--------------当前手牌为:");
        cc.log(this._handCards);

        var card = player.cards[0].cards[0];

        var newCard = player.cards[0].cards.remove(player1.cards[0].cards[0]);

        var position = player.position;

        var solid;
        var x, y;

        if ((this._direction == DIRECTION.DOWN)) {
            //去除手中的碰牌
            var _t_cards = [];
            for (var j = 0; j < newCard.length; j++) {
                var _target = this._handCardsLayer.getChildByName(newCard[j]);
                _target.removeFromParent();
                _t_cards.push(card);
            }
            this._handCards.remove(_t_cards);

            for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
                var target = this._handCardsLayer.getChildren()[i];
                target.chupai();
            }
        } else {
            //其他人删除
            for (var j = 0; j < 2; j++) {
                var index = this._handCards.indexOf(0);
                var pengItems = this._handCardsLayer.getChildByTag(index + j);
                pengItems.removeFromParent();
                this._handCards.remove(0);
            }
        }

        for (var i = 0; i < 3; i++) {
            var tmpCard = null;
            switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
                case DIRECTION.DOWN:
                    // this._cardtype = Card.TYPE.HAND_DOWN;
                    // solid = Card.TYPE.ORIGIN_DOWN_HAND;
                    // tmpCard = new DownCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_DOWN_DESK, this.onTouchBegan, this);
                    tmpCard = new DeskCard(this._solidCardsLayer, card, 2);
                    tmpCard.setLocalZOrder(100 - i);

                    break;
                case DIRECTION.UP:
                    // this._cardtype = Card.TYPE.HAND_UP;
                    // solid = Card.TYPE.ORIGIN_UP_HAND;
                    tmpCard = new UpCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_UP_DESK);
                    break;
                case DIRECTION.LEFT:
                    // this._cardtype = Card.TYPE.HAND_LEFT;
                    // solid = Card.TYPE.ORIGIN_LEFT_HAND;
                    tmpCard = new LeftCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_UP_DESK);
                    break;
                case DIRECTION.RIGHT:
                    // this._cardtype = Card.TYPE.HAND_RIGHT;
                    // solid = Card.TYPE.ORIGIN_RIGHT_HAND;
                    tmpCard = new RightCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_UP_DESK);
                    tmpCard.setLocalZOrder(100 - i);
                    break;
            }
            // var tmpCard = Card.create(card, solid.prefix);

            tmpCard.id = card;
            this._solidCards.add(card);
            // this._solidCardsLayer.addChild(tmpCard);


            switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
                case DIRECTION.UP:
                    //上885,651.5
                    // x=1200-parseInt((this._solidCards.length-1)/3)*160 -parseInt((this._solidCards.length-1)%3)*33;
                    x = 950 - parseInt((this._solidCards.length - 1) / 3) * 130 - parseInt((this._solidCards.length - 1) % 3) * 33;
                    y = 650;
                    break;
                case DIRECTION.DOWN:
                    //下 125,68
                    x = (70 + parseInt((this._solidCards.length - 1) / 3) * 190 + parseInt((this._solidCards.length - 1) % 3) * 55);
                    y = 75;
                    break;
                case DIRECTION.LEFT:
                    //左170+1/2,563
                    x = 184;
                    y = 650 - parseInt((this._solidCards.length - 1) / 3) * 110 - parseInt((this._solidCards.length - 1) % 3) * 30;
                    break;
                case DIRECTION.RIGHT:
                    //右1084+1/2,188.5
                    x = 1097;
                    y = 166 + parseInt((this._solidCards.length - 1) / 3) * 110 + parseInt((this._solidCards.length - 1) % 3) * 30;
                    break;
            }

            //动作之后的相同逻辑
            this.finishAction();

            var action = cc.spawn(cc.moveTo(0.1, cc.p(x, y)), cc.scaleTo(0.1, 1));

            tmpCard.runAction(cc.sequence(action, cc.callFunc(function () {
                // this._deskCardsLayer.removeChild(tmpTarget);
                cc.log(tmpCard.x + "," + tmpCard.y);

                // this.sortHandCard();
            }.bind(this))));
            // }
        }

        this.sortHandCard1();
        this.disableTouchEvent = false;

        cc.log("------------------碰听牌结束--------------当前手牌为:");
        cc.log(this._handCards);
    },

    //杠牌
    gangCard1: function (player) {
        cc.log("------------------开始杠牌--------------当前手牌为:");
        cc.log(this._handCards);

        var card = player.cards[0].cards[0];
        var position = player.position;

        var solid;
        var x, y;

        if ((this._direction == DIRECTION.DOWN)) {
            //去除手中的碰牌
            var _t_cards = [];
            for (var j = 0; j < player.cards[0].cards.length - 1; j++) {
                var _target = this._handCardsLayer.getChildByName(card);
                if (_target == null) {

                    cc.log("card:" + card);
                    for (var k = 0; k < this._handCardsLayer.getChildren().length; k++) {
                        cc.log(this._handCardsLayer.getChildren()[k].name + "==");
                    }
                }
                _target.removeFromParent();
                _t_cards.push(card);
            }
            for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
                var target = this._handCardsLayer.getChildren()[i];
                target.chupai();
            }
            this._handCards.remove(_t_cards);
        } else {
            //其他人删除
            for (var j = 0; j < player.cards[0].cards.length - 1; j++) {
                var index = this._handCards.indexOf(0);
                var pengItems = this._handCardsLayer.getChildByTag(index + j);
                pengItems.removeFromParent();
                this._handCards.remove(0);
            }
        }

        for (var i = 0; i < player.cards[0].cards.length; i++) {
            // var tmpCard = Card.create(card, solid.prefix);
            var tmpCard = null;
            switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
                case DIRECTION.DOWN:
                    // this._cardtype = Card.TYPE.HAND_DOWN;
                    // solid = Card.TYPE.ORIGIN_DOWN_HAND;
                    tmpCard = new DeskCard(this._solidCardsLayer, card, 2);
                    // tmpCard = new DownCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_DOWN_DESK, this.onTouchBegan, this);
                    tmpCard.setLocalZOrder(100 - i);
                    if (i == player.cards[0].cards.length - 1) {
                        tmpCard.setLocalZOrder(100 + i);
                    }
                    break;
                case DIRECTION.UP:
                    // this._cardtype = Card.TYPE.HAND_UP;
                    // solid = Card.TYPE.ORIGIN_UP_HAND;
                    tmpCard = new UpCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_UP_DESK);
                    break;
                case DIRECTION.LEFT:
                    // this._cardtype = Card.TYPE.HAND_LEFT;
                    // solid = Card.TYPE.ORIGIN_LEFT_HAND;
                    tmpCard = new LeftCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_UP_DESK);
                    break;
                case DIRECTION.RIGHT:
                    // this._cardtype = Card.TYPE.HAND_RIGHT;
                    // solid = Card.TYPE.ORIGIN_RIGHT_HAND;
                    tmpCard = new RightCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_UP_DESK);
                    tmpCard.setLocalZOrder(100 - i);
                    if (i == player.cards[0].cards.length - 1) {
                        tmpCard.setLocalZOrder(100 + i);
                    }
                    break;
            }

            tmpCard.id = card;
            if (i != player.cards[0].cards.length - 1) {
                this._solidCards.add(card);

            } else {
                this._gangSolidCards.add(card);
            }
            // this._solidCardsLayer.addChild(tmpCard);


            switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
                case DIRECTION.UP:
                    //上
                    x = 950 - parseInt((this._solidCards.length - 1) / 3) * 130 - parseInt((this._solidCards.length - 1) % 3) * 33;
                    y = 650;
                    if (i == player.cards[0].cards.length - 1) {
                        x = 983 - parseInt((this._solidCards.length - 1) / 3) * 130 - parseInt((this._solidCards.length - 1) % 3) * 33;
                        y = 665;
                    }
                    break;
                case DIRECTION.DOWN:
                    //下
                    x = 70 + parseInt((this._solidCards.length - 1) / 3) * 190 + parseInt((this._solidCards.length - 1) % 3) * 55;
                    y = 75;
                    if (i == player.cards[0].cards.length - 1) {
                        x = 16.5 + parseInt((this._solidCards.length - 1) / 3) * 190 + parseInt((this._solidCards.length - 1) % 3) * 55;
                        y = 95;
                    }
                    break;
                case DIRECTION.LEFT:
                    //左
                    x = 184;
                    y = 650 - parseInt((this._solidCards.length - 1) / 3) * 110 - parseInt((this._solidCards.length - 1) % 3) * 30;
                    if (i == player.cards[0].cards.length - 1) {
                        x = 184;
                        y = 683 - parseInt((this._solidCards.length - 1) / 3) * 110 - parseInt((this._solidCards.length - 1) % 3) * 30;
                    }
                    break;
                case DIRECTION.RIGHT:
                    //右
                    x = 1097;
                    y = 166 + parseInt((this._solidCards.length - 1) / 3) * 110 + parseInt((this._solidCards.length - 1) % 3) * 30;
                    if (i == player.cards[0].cards.length - 1) {
                        x = 1097;
                        y = 136 + parseInt((this._solidCards.length - 1) / 3) * 110 + parseInt((this._solidCards.length - 1) % 3) * 30;
                    }
                    break;
            }

            //动作之后的相同逻辑
            this.finishAction();

            var action = cc.spawn(cc.moveTo(0.1, cc.p(x, y)), cc.scaleTo(0.1, 1));

            tmpCard.runAction(cc.sequence(action, cc.callFunc(function () {
                // this._deskCardsLayer.removeChild(tmpTarget);
                cc.log(tmpCard.x + "," + tmpCard.y);

                // this.sortHandCard();
            }.bind(this))));
            // }
        }

        this.sortHandCard1();
        this.disableTouchEvent = false;

        cc.log("------------------杠牌结束--------------当前手牌为:");
        cc.log(this._handCards);

    },
    //暗杠牌
    angangCard1: function (player) {
        cc.log("------------------开始暗杠牌--------------当前手牌为:");
        cc.log(this._handCards);

        var card = player.cards[0].cards[0];
        var position = player.position;

        var solid;
        var x, y;

        if ((this._direction == DIRECTION.DOWN)) {
            //去除手中的碰牌
            var _t_cards = [];
            for (var j = 0; j < player.cards[0].cards.length; j++) {
                var _target = this._handCardsLayer.getChildByName(card);
                _target.removeFromParent();
                _t_cards.push(card);
            }
            for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
                var target = this._handCardsLayer.getChildren()[i];
                target.chupai();
            }
            this._handCards.remove(_t_cards);
        } else {
            //其他人删除
            for (var j = 0; j < player.cards[0].cards.length; j++) {
                var index = this._handCards.indexOf(0);
                var pengItems = this._handCardsLayer.getChildByTag(index + j);
                pengItems.removeFromParent();
                this._handCards.remove(0);
            }
        }

        for (var i = 0; i < player.cards[0].cards.length; i++) {
            // var tmpCard = Card.create(card, solid.prefix);
            var tmpCard = null;
            switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
                case DIRECTION.DOWN:
                    // this._cardtype = Card.TYPE.HAND_DOWN;
                    // solid = Card.TYPE.ORIGIN_DOWN_HAND;
                    // tmpCard = new DownCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_DOWN_DESK, this.onTouchBegan, this);
                    tmpCard = new DeskCard(this._solidCardsLayer, card, 2);
                    tmpCard.setLocalZOrder(100 - i);
                    if (i == player.cards[0].cards.length - 1) {
                        tmpCard.setLocalZOrder(100 + i);
                    }
                    tmpCard.id = card;
                    break;
                case DIRECTION.UP:
                    // this._cardtype = Card.TYPE.HAND_UP;
                    // solid = Card.TYPE.ORIGIN_UP_HAND;
                    tmpCard = new UpCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_UP_DESK);
                    tmpCard.id = 0;
                    break;
                case DIRECTION.LEFT:
                    // this._cardtype = Card.TYPE.HAND_LEFT;
                    // solid = Card.TYPE.ORIGIN_LEFT_HAND;
                    tmpCard = new LeftCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_UP_DESK);
                    tmpCard.id = 0;

                    break;
                case DIRECTION.RIGHT:
                    // this._cardtype = Card.TYPE.HAND_RIGHT;
                    // solid = Card.TYPE.ORIGIN_RIGHT_HAND;
                    tmpCard = new RightCard(this._solidCardsLayer, card, Card.TYPE.ORIGIN_UP_DESK);
                    tmpCard.id = 0;
                    tmpCard.setLocalZOrder(100 - i);
                    if (i == player.cards[0].cards.length - 1) {
                        tmpCard.setLocalZOrder(100 + i);
                    }
                    break;
            }

            if (i != player.cards[0].cards.length - 1) {
                this._solidCards.add(card);
            } else {
                this._gangSolidCards.add(card);
            }
            // this._solidCardsLayer.addChild(tmpCard);


            switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
                case DIRECTION.UP:
                    //上
                    x = 900 - parseInt((this._solidCards.length - 1) / 3) * 130 - parseInt((this._solidCards.length - 1) % 3) * 33;
                    y = 650;
                    if (i == player.cards[0].cards.length - 1) {
                        x = 933 - parseInt((this._solidCards.length - 1) / 3) * 130 - parseInt((this._solidCards.length - 1) % 3) * 33;
                        y = 665;
                    }
                    break;
                case DIRECTION.DOWN:
                    //下
                    x = 70 + parseInt((this._solidCards.length - 1) / 3) * 190 + parseInt((this._solidCards.length - 1) % 3) * 55;
                    y = 75;
                    if (i == player.cards[0].cards.length - 1) {
                        x = 16.5 + parseInt((this._solidCards.length - 1) / 3) * 190 + parseInt((this._solidCards.length - 1) % 3) * 55;
                        y = 95;
                    }
                    break;
                case DIRECTION.LEFT:
                    //左
                    x = 184;
                    y = 650 - parseInt((this._solidCards.length - 1) / 3) * 110 - parseInt((this._solidCards.length - 1) % 3) * 30;
                    if (i == player.cards[0].cards.length - 1) {
                        x = 184;
                        y = 683 - parseInt((this._solidCards.length - 1) / 3) * 110 - parseInt((this._solidCards.length - 1) % 3) * 30;
                    }
                    break;
                case DIRECTION.RIGHT:
                    //右
                    x = 1097;
                    y = 166 + parseInt((this._solidCards.length - 1) / 3) * 110 + parseInt((this._solidCards.length - 1) % 3) * 30;
                    if (i == player.cards[0].cards.length - 1) {
                        x = 1097;
                        y = 136 + parseInt((this._solidCards.length - 1) / 3) * 110 + parseInt((this._solidCards.length - 1) % 3) * 30;
                    }
                    break;
            }

            var action = cc.spawn(cc.moveTo(0.1, cc.p(x, y)), cc.scaleTo(0.1, 1));

            tmpCard.runAction(cc.sequence(action, cc.callFunc(function () {
                // this._deskCardsLayer.removeChild(tmpTarget);
                cc.log(tmpCard.x + "," + tmpCard.y);

                // this.sortHandCard();
            }.bind(this))));
            // }
        }

        this.sortHandCard1();
        this.disableTouchEvent = false;

        cc.log("------------------暗杠牌结束--------------当前手牌为:");
        cc.log(this._handCards);

    },

    //听牌
    tingCard: function (player) {

    },
    saveMembers: function (player) {
        this.user = player;
    },
    getMembers: function () {
        return this.user;
    },
    //吃牌
    chiCard1: function (player) {
        cc.log("------------------开始吃牌--------------吃的牌是：" + player.cards[0].cards);
        cc.log(this._handCards);

        var prev;
        var card = player.cards[0].cards;
        var position = player.position;

        var solid;
        var x, y;

        if ((this._direction == DIRECTION.DOWN)) {
            //去除手中的碰牌
            var _t_cards = [];
            for (var j = 0; j < card.length - 1; j++) {
                // var _target = this._handCardsLayer.getChildByTag(this._handCards.indexOf(card[j]));
                var _target = this._handCardsLayer.getChildByName(card[j]);
                _target.removeFromParent();
                _t_cards.push(card[j]);
            }
            for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
                var target = this._handCardsLayer.getChildren()[i];
                target.chupai();
            }
            this._handCards.remove(_t_cards);
        } else {
            //其他人删除
            for (var j = 0; j < 2; j++) {
                var index = this._handCards.indexOf(0);
                var pengItems = this._handCardsLayer.getChildByTag(index + j);
                pengItems.removeFromParent();
                this._handCards.remove(0);
            }
        }

        var sortCard = card.sort();

        for (var i = 0; i < 3; i++) {
            var tmpCard = null;
            switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
                case DIRECTION.DOWN:

                    tmpCard = new DeskCard(this._solidCardsLayer, card[i], 2);
                    tmpCard.setLocalZOrder(100 - i);

                    // }

                    break;
                case DIRECTION.UP:
                    // this._cardtype = Card.TYPE.HAND_UP;
                    // solid = Card.TYPE.ORIGIN_UP_HAND;
                    tmpCard = new UpCard(this._solidCardsLayer, card[i], Card.TYPE.ORIGIN_UP_DESK);
                    break;
                case DIRECTION.LEFT:
                    // this._cardtype = Card.TYPE.HAND_LEFT;
                    // solid = Card.TYPE.ORIGIN_LEFT_HAND;
                    tmpCard = new LeftCard(this._solidCardsLayer, card[i], Card.TYPE.ORIGIN_UP_DESK);
                    break;
                case DIRECTION.RIGHT:
                    // this._cardtype = Card.TYPE.HAND_RIGHT;
                    // solid = Card.TYPE.ORIGIN_RIGHT_HAND;
                    tmpCard = new RightCard(this._solidCardsLayer, card[i], Card.TYPE.ORIGIN_UP_DESK);
                    tmpCard.setLocalZOrder(100 - i);
                    break;
            }
            tmpCard.id = sortCard[i];
            this._solidCards.add(sortCard[i]);
            // this._solidCardsLayer.addChild(tmpCard);
            switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
                case DIRECTION.UP:
                    //上
                    x = 950 - parseInt((this._solidCards.length - 1) / 3) * 130 - parseInt((this._solidCards.length - 1) % 3) * 33;
                    y = 650;
                    break;
                case DIRECTION.DOWN:
                    //下
                    x = (70 + parseInt((this._solidCards.length - 1) / 3) * 190 + parseInt((this._solidCards.length - 1) % 3) * 55);
                    y = 75;
                    break;
                case DIRECTION.LEFT:
                    //左
                    x = 184;
                    y = 650 - parseInt((this._solidCards.length - 1) / 3) * 110 - parseInt((this._solidCards.length - 1) % 3) * 30;
                    break;
                case DIRECTION.RIGHT:
                    //右
                    x = 1097;
                    y = 166 + parseInt((this._solidCards.length - 1) / 3) * 110 + parseInt((this._solidCards.length - 1) % 3) * 30;
                    break;
            }

            //动作之后的相同逻辑
            this.finishAction();

            var action = cc.spawn(cc.moveTo(0.1, cc.p(x, y)), cc.scaleTo(0.1, 1));

            tmpCard.runAction(cc.sequence(action, cc.callFunc(function () {
                // this._deskCardsLayer.removeChild(tmpTarget);
                cc.log(tmpCard.x + "," + tmpCard.y);

                // this.sortHandCard();
            }.bind(this))));
            // }
        }

        this.sortHandCard1();

        this.disableTouchEvent = false;

        cc.log("------------------吃牌结束--------------手牌是：");
        cc.log(this._handCards);
        cc.log("------------------吃牌结束--------------吃碰牌是：");
        cc.log(this._solidCards);


    },
    finishAction: function () {
        Game.op._roomScene._UILayer.setDiamondPosition(cc.p(2000, 2000));
    },
    //吃听牌
    chitingCard1: function (player, player1) {
        cc.log("------------------碰听牌结束--------------当前手牌为:");
        cc.log(this._handCards);

        var prev;
        var card = player.cards[0].cards;
        var newCard = card.remove(player1.cards[0].cards[0]);

        var position = player.position;
        cc.log(card);

        var solid;
        var x, y;

        if ((this._direction == DIRECTION.DOWN)) {
            //去除手中的碰牌
            var _t_cards = [];
            for (var j = 0; j < newCard.length - 1; j++) {
                var _target = this._handCardsLayer.getChildByName(newCard[j]);
                _target.removeFromParent();
                _t_cards.push(card[j]);
            }
            for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
                var target = this._handCardsLayer.getChildren()[i];
                target.chupai();
            }
            this._handCards.remove(_t_cards);
        } else {
            //其他人删除
            for (var j = 0; j < 2; j++) {
                var index = this._handCards.indexOf(0);
                var pengItems = this._handCardsLayer.getChildByTag(index + j);
                pengItems.removeFromParent();
                this._handCards.remove(0);
            }
        }

        var sortCard = card.sort();

        for (var i = 0; i < 3; i++) {
            var tmpCard = null;
            switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
                case DIRECTION.DOWN:
                    tmpCard = new DeskCard(this._solidCardsLayer, card[i], 2);
                    tmpCard.setLocalZOrder(100 - i);

                    break;
                case DIRECTION.UP:
                    tmpCard = new UpCard(this._solidCardsLayer, card[i], Card.TYPE.ORIGIN_UP_DESK);
                    break;
                case DIRECTION.LEFT:
                    tmpCard = new LeftCard(this._solidCardsLayer, card[i], Card.TYPE.ORIGIN_UP_DESK);
                    break;
                case DIRECTION.RIGHT:
                    tmpCard = new RightCard(this._solidCardsLayer, card[i], Card.TYPE.ORIGIN_UP_DESK);
                    tmpCard.setLocalZOrder(100 - i);
                    break;
            }
            tmpCard.id = sortCard[i];
            this._solidCards.add(sortCard[i]);
            switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
                case DIRECTION.UP:
                    //上
                    x = 950 - parseInt((this._solidCards.length - 1) / 3) * 130 - parseInt((this._solidCards.length - 1) % 3) * 33;
                    y = 650;
                    break;
                case DIRECTION.DOWN:
                    //下
                    x = (70 + parseInt((this._solidCards.length - 1) / 3) * 190 + parseInt((this._solidCards.length - 1) % 3) * 55);
                    y = 75;
                    break;
                case DIRECTION.LEFT:
                    //左
                    x = 184;
                    y = 650 - parseInt((this._solidCards.length - 1) / 3) * 110 - parseInt((this._solidCards.length - 1) % 3) * 30;
                    break;
                case DIRECTION.RIGHT:
                    //右
                    x = 1097;
                    y = 166 + parseInt((this._solidCards.length - 1) / 3) * 110 + parseInt((this._solidCards.length - 1) % 3) * 30;
                    break;
            }

            //动作之后的相同逻辑
            this.finishAction();

            var action = cc.spawn(cc.moveTo(0.1, cc.p(x, y)), cc.scaleTo(0.1, 1));

            tmpCard.runAction(cc.sequence(action, cc.callFunc(function () {
                // this._deskCardsLayer.removeChild(tmpTarget);
                cc.log(tmpCard.x + "," + tmpCard.y);

            }.bind(this))));
            // }
        }

        this.sortHandCard1();

        this.disableTouchEvent = false;

        cc.log("------------------吃听牌结束--------------手牌是：");
        cc.log(this._handCards);
        cc.log("------------------吃听牌结束--------------吃碰牌是：");
        cc.log(this._solidCards);
    },

    removeCard: function () {
        cc.log("------------------删除牌开始--------------手牌是：");
        cc.log(this._handCards);
        cc.log("------------------删除牌开始--------------吃碰牌是：");
        cc.log(this._solidCards);

        if (this._direction == DIRECTION.RIGHT) {
            this._deskCardsLayer.getChildren()[0].removeFromParent();
        } else {
            this._deskCardsLayer.getChildren()[this._deskCards.length - 1].removeFromParent();
        }
        this._deskCards.removeLastItem();

        cc.log("------------------删除牌结束--------------手牌是：");
        cc.log(this._handCards);
        cc.log("------------------删除牌结束--------------吃碰牌是：");
        cc.log(this._solidCards);

    },

    autoPlayCard1: function (player) {
        cc.log("------------开始打牌-------------------打的牌是：" + player.cards[0].cards[0]);
        cc.log(this._handCards);

        var card = player.cards[0].cards[0];
        if ((player.userid == Game.user.id) && (Game.roomInfo.indexOf("3") < 0)) {
            this.isOrdered = true;
        }

        if (this._direction == DIRECTION.DOWN) {

            var target;
            if (!Game.op._roomScene._UILayer._head_down_ting.isVisible()) {
                for (var l = 0; l < this._handCardsLayer.getChildren().length; l++) {
                    var item = this._handCardsLayer.getChildren()[l];
                    if (item.state == 2) {
                        target = item;
                    }
                }
                if (target == null) {
                    target = this._handCardsLayer.getChildByName(card);
                }
            } else {
                if (this._handCardsLayer.getChildren()[this._handCardsLayer.getChildrenCount() - 1].getName() == card) {
                    target = this._handCardsLayer.getChildren()[this._handCardsLayer.getChildrenCount() - 1];
                } else {
                    target = this._handCardsLayer.getChildByName(card);
                }
            }

            for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
                var _target = this._handCardsLayer.getChildren()[i];
                _target.wait();
            }

        } else {
            var target = this._handCardsLayer.getChildren()[this._handCardsLayer.getChildrenCount() - 1]
        }
        target.id = card;

        this.playCard21(target);
        this.disableTouchEvent = true;

        cc.log("------------------开始打牌结束--------------手牌是：");
        cc.log(this._handCards);
        cc.log("------------------开始打牌结束--------------吃碰牌是：");
        cc.log(this._solidCards);

    },
    //可以出牌
    readyCard: function () {
        cc.log("-----------当前用户可以出牌-----------------");
        if (this._direction == DIRECTION.DOWN) {
            this.disableTouchEvent = false;
            for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
                var _target = this._handCardsLayer.getChildren()[i];
                if (_target == null) {
                    cc.log("now i=" + i);
                    for (var j = 0; j < this._handCardsLayer.getChildren().length; j++) {
                        cc.log(this._handCardsLayer.getChildren()[j].name);

                    }
                } else {
                    _target.chupai();

                }
            }
        }

    },
    playCard21: function (target) {
        cc.log("------------打牌-------------------打的牌是：" + target.id);
        cc.log(this._handCards);

        var tmpTarget = new DownCard(this._deskCardsLayer, target.id, Card.TYPE.ORIGIN_DOWN_HAND, this.onTouchBegan, this);
        tmpTarget.setScale(1.11);
        tmpTarget.setLocalZOrder(999);
        tmpTarget.wait();
        tmpTarget.setPosition(target.getPosition());
        tmpTarget.id = target.id;
        target.removeFromParent();

        this._handCards = this._direction == DIRECTION.DOWN ? this._handCards.remove(tmpTarget.id) : this._handCards.remove(this._handCards[0]);

        var ctd;
        switch (this._direction) {
            case DIRECTION.DOWN:
                ctd = Card.TYPE.ORIGIN_DOWN_DESK;
                var deskTarget = new DownCard(this._deskCardsLayer, tmpTarget.id, Card.TYPE.ORIGIN_DOWN_DESK, this.onTouchBegan, this);
                break;
            case DIRECTION.LEFT:
                ctd = Card.TYPE.ORIGIN_LEFT_DESK;
                var deskTarget = new LeftCard(this._deskCardsLayer, tmpTarget.id, Card.TYPE.ORIGIN_LEFT_DESK);
                break;
            case DIRECTION.UP:
                ctd = Card.TYPE.ORIGIN_UP_DESK;
                var deskTarget = new UpCard(this._deskCardsLayer, tmpTarget.id, Card.TYPE.ORIGIN_UP_DESK);
                break;
            case DIRECTION.RIGHT:
                ctd = Card.TYPE.ORIGIN_RIGHT_DESK;
                var deskTarget = new RightCard(this._deskCardsLayer, tmpTarget.id, Card.TYPE.ORIGIN_RIGHT_DESK);
                break;
        }
        deskTarget.setPosition(-100, -100);

        var offset = ctd.offset;
        var x, y;
        var x_tmp, y_tmp;
        switch (this._direction) {
            case DIRECTION.DOWN:
                x = 450 + parseInt(this._deskCards.length % 11) * offset.width;
                y = 250 - parseInt(this._deskCards.length / 11) * offset.height;

                x_tmp = 633;
                y_tmp = 218;
                break;
            case DIRECTION.LEFT:
                x = 400 - parseInt(this._deskCards.length / 11) * offset.width;
                y = 520 - parseInt(this._deskCards.length % 11) * (offset.height - 10);
                deskTarget.setLocalZOrder(this._deskCards.length);

                x_tmp = 247;
                y_tmp = 437;
                break;
            case DIRECTION.UP:
                x = 450 + parseInt(this._deskCards.length % 11) * offset.width;
                y = 580 - parseInt(this._deskCards.length / 11) * offset.height;

                x_tmp = 633;
                y_tmp = 557;
                break;
            case DIRECTION.RIGHT:
                x = 880 + parseInt(this._deskCards.length / 11) * offset.width;
                y = 180 + parseInt(this._deskCards.length % 11) * (offset.height - 10);
                deskTarget.setLocalZOrder(-this._deskCards.length);

                x_tmp = 1003;
                y_tmp = 437;

                cc.log("right 坐标为：" + x + "   " + y);
                cc.log(this._deskCards);
                cc.log(this._deskCardsLayer);
                break;
        }

        this._deskCards = this._deskCards.add(tmpTarget.id);
        var action = cc.spawn(cc.moveTo(0.1, cc.p(x_tmp, y_tmp)), cc.scaleTo(0.1, 1.5));
        action = cc.sequence(action, cc.delayTime(1), cc.moveTo(0.1, cc.p(x, y)));

        tmpTarget.runAction(cc.sequence(action, cc.scaleTo(0.1, 0.5), cc.callFunc(function (target, data) {
            tmpTarget.removeFromParent();
            deskTarget.setPosition(data.x, data.y);
            Game.op._roomScene._UILayer.setDiamondPosition(cc.p(data.x, data.y + 40));

        }.bind(this), this, {x: x, y: y})));
        if (!Game.op._roomScene._UILayer._head_down_ting.isVisible() || (this.isSorted())) {
            this.sortHandCard1();
        }

        this.isOrdered = false;

        cc.log("------------------打牌结束--------------手牌是：");
        cc.log(this._handCards);
        cc.log("------------------打牌结束--------------吃碰牌是：");
        cc.log(this._solidCards);

    },
    isSorted: function () {
        var last = this._handCardsLayer.getChildren()[this._handCardsLayer.getChildrenCount() - 1].x;
        var first = this._handCardsLayer.getChildren()[0].x;
        for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
            if (this._handCardsLayer.getChildren()[i].x < first) {
                first = this._handCardsLayer.getChildren()[i].x;
            }
            if (this._handCardsLayer.getChildren()[i].x > last) {
                last = this._handCardsLayer.getChildren()[i].x;
            }
        }
        var length = (this._handCardsLayer.getChildren().length - 1) * 76;

        if ((last - first) > length) {
            return true;
        } else {
            return false;
        }
    },
    //断线重连恢复碰牌，吃牌
    recovery: function (player) {
        var cards = player.cards;
        var ids = [];
        for (var i = 0; i < cards.length; i++) {
            switch (cards[i].type) {
                case OpManager.CARDTYPE.SHOUPAI:
                    for (var j = 0; j < cards[i].cardNum; j++) {
                        var id = [];
                        if (cards[i].cards) {
                            id = cards[i].cards[j];
                        } else {
                            id = 0;
                        }
                        ids.push(id);
                    }
                    //重新发牌
                    this.dealCard1(ids);

                    break;
                case OpManager.CARDTYPE.PENGPAI:
                    for (var j = 0; j < cards[i].cardNum; j++) {
                        var id = [];
                        id = cards[i].cards[j];
                        ids.push(id);
                    }
                    this.dealSolidCard(ids);
                    cc.log("pengpai");
                    break;
                case OpManager.CARDTYPE.CHIPAI:
                    for (var j = 0; j < cards[i].cardNum; j++) {
                        var id = [];
                        id = cards[i].cards[j];
                        ids.push(id);
                    }
                    this.dealSolidCard(ids);
                    cc.log("chipai");
                    break;
                case OpManager.CARDTYPE.ANGANG:
                    for (var j = 0; j < cards[i].cardNum; j++) {
                        var id = [];
                        id = cards[i].cards[j];
                        ids.push(id);
                    }
                    this.dealSolidCard(ids);
                    cc.log("angangpai");
                    break;
                case OpManager.CARDTYPE.MINGGANG:
                    for (var j = 0; j < cards[i].cardNum; j++) {
                        var id = [];
                        id = cards[i].cards[j];
                        ids.push(id);
                    }
                    this.dealSolidCard(ids);
                    cc.log("minggangpai");
                    break;
                case OpManager.CARDTYPE.YICHUPAI:
                    cc.log("yichudepai");
                    for (var j = 0; j < cards[i].cardNum; j++) {
                        var id = [];
                        id = cards[i].cards[j];
                        ids.push(id);
                    }
                    this.dealDeskCard(ids);
                    break;
            }
            ids = [];
        }
    },
    //断线重连恢复桌牌
    dealSolidCard: function (cards) {
        var tmpCard, x, y;
        for (var i = 0; i < cards.length; i++) {
            this._solidCards = this._solidCards.add(cards[i]);
            switch (this._direction) {
                case DIRECTION.DOWN:

                    tmpCard = new DeskCard(this._solidCardsLayer, cards[i], 2);
                    tmpCard.setLocalZOrder(100 - i);

                    x = (70 + parseInt((this._solidCards.length - 1) / 3) * 190 + parseInt((this._solidCards.length - 1) % 3) * 55);
                    y = 75;
                    if (i == 3) {
                        tmpCard.setLocalZOrder(100 + i);
                        x = 16.5 + parseInt((this._solidCards.length - 1) / 3) * 190 + parseInt((this._solidCards.length - 1) % 3) * 55;
                        y = 95;
                    }

                    break;
                case DIRECTION.LEFT:

                    tmpCard = new LeftCard(this._solidCardsLayer, cards[i], Card.TYPE.ORIGIN_UP_DESK);

                    x = 184;
                    y = 650 - parseInt((this._solidCards.length - 1) / 3) * 110 - parseInt((this._solidCards.length - 1) % 3) * 30;
                    if (i == 3) {
                        x = 184;
                        y = 683 - parseInt((this._solidCards.length - 1) / 3) * 110 - parseInt((this._solidCards.length - 1) % 3) * 30;
                    }

                    break;
                case DIRECTION.UP:
                    tmpCard = new UpCard(this._solidCardsLayer, cards[i], Card.TYPE.ORIGIN_UP_DESK);

                    x = 950 - parseInt((this._solidCards.length - 1) / 3) * 130 - parseInt((this._solidCards.length - 1) % 3) * 33;
                    y = 650;
                    if (i == 3) {
                        x = 983 - parseInt((this._solidCards.length - 1) / 3) * 130 - parseInt((this._solidCards.length - 1) % 3) * 33;
                        y = 665;
                    }
                    break;
                case DIRECTION.RIGHT:
                    tmpCard = new RightCard(this._solidCardsLayer, cards[i], Card.TYPE.ORIGIN_UP_DESK);
                    tmpCard.setLocalZOrder(100 - i);

                    x = 1097;
                    y = 166 + parseInt((this._solidCards.length - 1) / 3) * 110 + parseInt((this._solidCards.length - 1) % 3) * 30;
                    if (i == 3) {
                        tmpCard.setLocalZOrder(100 + i);
                        x = 1097;
                        y = 136 + parseInt((this._solidCards.length - 1) / 3) * 110 + parseInt((this._solidCards.length - 1) % 3) * 30;
                    }

                    break;
            }
            tmpCard.setPosition(x, y);
        }
    },
    refreshCards: function () {
        for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
            var _target = this._handCardsLayer.getChildren()[i];
            _target.clicked = false;
            _target.state = 0;
            _target.y = 68;
        }
    },
    overCards: function () {
        for (var i = 0; i < this._handCardsLayer.getChildren().length; i++) {
            var _target = this._handCardsLayer.getChildren()[i];
            _target.wait();
        }
    },
    _getCardType: function () {
        var ct = null;
        switch (this._direction) {
            case DIRECTION.DOWN:
                ct = Card.TYPE.HAND_DOWN;
                break;
            case DIRECTION.RIGHT:
                ct = Card.TYPE.HAND_RIGHT;
                break;
            case DIRECTION.UP:
                ct = Card.TYPE.HAND_UP;
                break;
            case DIRECTION.LEFT:
                ct = Card.TYPE.HAND_LEFT;
                break;
        }
        return ct;
    },
});