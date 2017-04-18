/**
 * Created by kale on 2016/12/1.
 */
var gg = gg || {};
gg.fontName = "微软雅黑";

var overData = overData || {};
var cardData = cardData || {};
var self = self || {};
// var EndMenuLayer = cc.Layer.extend({
var EndMenuLayer = MyLayer.extend({
    _backGroud: null,
    _text1: null,
    _text2: null,
    _text3: null,
    _text4: null,
    _continue: null,
    _continueListener: null,
    line2H: 0,
    _cont_text: null,
    ctor: function () {
        this._super(this.onTouchEndEvent, this);
        self = this;
        this.loadBackGround();
        this.loadName();
        this.loadBottomButton();
        // this.loadResultTile();
        // this.loadPlayerInfo();
        this.loadRoomNo();
        // this.loadTime();
        // this.loadBaoPai();
    },
    onTouchEndEvent: function (target) {
        cc.log("1111");
        return false;
    },
    loadBaoPai: function (bao) {
        var sp = new cc.Sprite("#mb_bao.png");
        sp.setPosition(990, 271.5);
        this.addChild(sp);
        if (bao != null) {
            var card = new DownCard(sp, bao, Card.TYPE.ORIGIN_DOWN_HAND);
            card.setScale(0.8);
            card.wait();
        } else {
            var card = new cc.Sprite("#mf_bao.png");
            sp.addChild(card);
        }


        card.setPosition(sp.width / 2, sp.height / 2 + 14);

    },
    loadName: function () {
        var label = new cc.LabelTTF("趣玩·哈尔滨麻将", gg.fontName, 28);
        label.setPosition(40, 680);
        label.setAnchorPoint(0, 0.5);
        this.addChild(label);
    },
    loadBackGround: function () {
        var bg = new cc.Sprite(res.bg_full_3_png);
        bg.setPosition(640, 360);
        this.addChild(bg);

        var mbg = new cc.Sprite(res.bg_middle_png);
        mbg.setPosition(640, 525);
        this.addChild(mbg);
    },
    loadBottomButton: function () {
        // var share = this.share = new MyNode(this, "#btn_green1.png", this.cb, this);
        // var l1 = new cc.LabelTTF("分  享", "微软雅黑", 28);
        // share.addChild(l1);
        // l1.setPosition(share.width * 0.5, share.height * 0.5);
        // share.setPosition(399 + share.width * 0.5, 73 - share.height * 0.5);
        // var cont = this.continue = new MyNode(this, "#btn_orange1.png", this.cb, this);
        // var l2 = new cc.LabelTTF("继  续", "微软雅黑", 28);
        // cont.addChild(l2);
        // l2.setPosition(cont.width * 0.5, cont.height * 0.5);

        var share = this.share = new MyNode(this, "#btn_green3.png", function () {
            cc.log("分享");
            var winSize=cc.winSize;
            var tex = new cc.RenderTexture(parseInt(winSize.width),parseInt(winSize.height));
            tex.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
            tex.begin();
            cc.director.getRunningScene().visit();
            tex.end();
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                var imgPath = jsb.fileUtils.getWritablePath();
                if (imgPath.length == 0) {
                    return;
                }
                var fileName="invite.png";
                var result = tex.saveToFile(fileName,cc.IMAGE_FORMAT_PNG, true,function () {
                    cc.log("截图:successfully!");
                    Cocos2dxBridge.share(1);
                });
            }
            return false;
        });
        // this.addChild(share);
        var l1 = new cc.LabelTTF("分  享", "微软雅黑", 28);
        share.addChild(l1);
        l1.setPosition(share.width * 0.5, share.height * 0.5);
        share.setPosition(399 + share.width * 0.5, 73 - share.height * 0.5);
        var cont = this.continue = new MyNode(this, "#btn_orange3.png", function () {
            cc.log("继续");
            // this.setVisible(false);
            this.setPosition(cc.p(7200, 3600));
            if (Game.isOver) {
                this.getParent()._allResult.setPosition(cc.p(0, 0));
                Game.isOver = false;
            } else {
                Utils.runScene(new GameScene());
                //自动准备
                // Game.op._roomScene._UILayer.onTouchStart();

                Game.op.ready(Game.roomId, function (data) {
                    cc.log(data);
                    cc.log("准备。。。。");
                });
                startBtn.setPosition(cc.p(10000, 0));
                head_down_confirm.setVisible(true);
                inviteBtn.setPosition(cc.p(10000, 0));
                backBtn.setPosition(cc.p(10000, 0));

            }
            return false;
        });
        this._cont_text = new cc.LabelTTF("继  续", "微软雅黑", 28);
        cont.addChild(this._cont_text);
        this._cont_text.setPosition(cont.width * 0.5, cont.height * 0.5);
        Utils.right(share, cont, 45);
    },
    loadResultTile: function () {
        var img = null;
        if (!Game.user) {
            Game.user = {
                "id": "2"
            };
        }
        if (overData.win == Game.user.id) {
            img = "#pic_win.png";
        } else if (overData.win == 0
            || overData.win == null) {
            img = "#pic_equal.png";
        } else {
            img = "#pic_lose.png";
        }
        var sp = new cc.Sprite(img);
        sp.setPosition(640, 634);
        this.addChild(sp);

        var hu = new cc.Sprite("#icon_hu.png");
        this.addChild(hu);
        hu.setPosition(996, 484.5);
        if (overData.win != null) {
            hu.setVisible(true);
        } else {
            hu.setVisible(false);
        }
    },
    loadPlayerInfo1: function (data) {
        overData = data;
        if (Game.cardData != "") {
            cardData = Game.cardData;
        }
        this.loadResultTile();
        var posArr = [cc.p(0, 545), cc.p(0, 415), cc.p(0, 305), cc.p(0, 195)];
        var length = data.player.length;
        var key = 1;

        if (length == 4 || length == 3) {
            for (var i = 0; i < length; i++) {
                if (data.win != null) {
                    if (data.player[i].id == data.win) {
                        var end = new EndPlayerInfo(this, data.player[i], data.huCard);

                        end.setPosition(posArr[0]);
                    } else {
                        var end = new EndPlayerInfo(this, data.player[i], -1);
                        end.setPosition(posArr[key]);
                        key++;
                    }
                } else {
                    for (var i = 0; i < length; i++) {
                        var end = new EndPlayerInfo(this, data.player[i], -1);
                        end.setPosition(posArr[i]);
                    }
                }

                // var end = new EndPlayerInfo(this,data.player[i]);
                // end.setPosition(posArr[i]);
            }
        } else if (length == 2) {
            for (var i = 0; i < length; i++) {
                if (data.win != null) {
                    if (data.player[i].id == data.win) {
                        var end = new EndPlayerInfo(this, data.player[i], data.huCard);
                        end.setPosition(posArr[0]);
                    } else {
                        var end = new EndPlayerInfo(this, data.player[i], -1);
                        end.setPosition(posArr[2]);
                    }
                } else {
                    for (var i = 0; i < length; i++) {
                        var end = new EndPlayerInfo(this, data.player[i], -1);
                        end.setPosition(posArr[i * 2]);
                    }
                }
            }

        }
    },
    loadRoomNo: function () {
        var str = "房间号 " + gg.overJson.roomNum;
        var roomNo = new cc.LabelTTF(str, "微软雅黑", 19);
        roomNo.setPosition(1097, 75);
        roomNo.setAnchorPoint(0, 0.5);
        this.addChild(roomNo);
    },
    getTime: function () {
        var date = new Date();
        var str = date.getFullYear() + "/";
        str += (date.getMonth() + 1) + "/";
        str += date.getDate() + " ";
        str += date.getHours() + ":";
        str += date.getMinutes() + "";
        return str;
    },
    loadTime: function () {
        var str = this.getTime();
        var time = new cc.LabelTTF(str, "微软雅黑", 19);
        time.setPosition(1097, 50);
        time.setAnchorPoint(0, 0.5);
        this.addChild(time);
    },
    // cb: function (p) {
    //     switch (p) {
    //         case this.share:
    //             cc.log("分享");
    //             break;
    //         case this.continue:
    //             cc.log("继续");
    //             this.setVisible(false);
    //             Utils.runScene(new GameScene());
    //             // if(Game.roundNum!=0){
    //             //     Game.roomNum-=1;
    //             //     Utils.runScene(new GameScene());
    //             // }else{
    //             //
    //             //     this.getParent()._allResult.setPosition(cc.p(0,0));
    //             // }
    //             break;
    //     }
    // },
    showCards: function (winData, data) {
        for (var n = 0; n < winData.tipInfos.length; n++) {
            var a = this.sortCard1(winData.tipInfos[n].cards);
            cc.log(a);
            if (data.gunner == data.player[n].id) {
                var gun = new cc.Sprite("#icon_fire_pao.png");
                gun.setPosition(cc.p(20 + gun.width * 0.5, this.line2H));
                this.addChild(gun);
            }
            var prev = null, mm = 0;
            var flag = 0;
            for (var i = 0; i < a.length; i++) {
                flag++;
                var cell = a[i];
                if (cell == -1) {// 拉开距离
                    mm = this.cardM;
                    continue;
                }
                var card = new DownCard(this, cell, Card.TYPE.ORIGIN_DOWN_DESK);
                if (prev) {
                    Utils.right(prev, card, mm);
                } else {
                    card.setPosition(89 + card.width * 0.5 * this.cardScale, this.line2H);
                    // card.setPosition(189 + flag*35, 500);
                }


                mm = 0;
                prev = card;
            }
            /*添加分数*/
            // var cl = new cc.LabelTTF(this.record.point + "", "微软雅黑", 24);
            // cl.setColor(cc.color(247, 202, 21));
            // cl.setPosition(851, this.line2H);
            // this.addChild(cl);
        }


        //
        // var x, y,cardY,cardX;
        // for (var j = 0; j < data.tipInfos.length; j++) {
        //     var cards = data.tipInfos[j].cards;
        //     y = 150+ 75 * j;
        //     cardY=150+75*j;
        //     cardX=0;
        //     var flag = 0;
        //     var label = new ccui.Text("玩家" + data.tipInfos[j].userid, "AmericanTypewriter", 20);
        //     this.addChild(label);
        //     label.setPosition(cc.p(370, y));
        //     for (var k = 0; k < cards.length; k++) {
        //         var sortCards = [];
        //
        //         if (cards[k].type == OpManager.CARDTYPE.CHIPAI) {
        //             sortCards = cards[k].cards.sort();
        //             for (var i = 0; i < sortCards.length; i++) {
        //                 flag++;
        //                 var tmpCard=new DownCard(self,sortCards[i],Card.TYPE.ORIGIN_DOWN_DESK);
        //                 cardX = 460 + flag * 35;
        //                 tmpCard.setPosition(cc.p(cardX, cardY));
        //             }
        //         } else if (cards[k].type == OpManager.CARDTYPE.PENGPAI) {
        //             sortCards = cards[k].cards.sort();
        //             for (var i = 0; i < sortCards.length; i++) {
        //                 flag++;
        //                 var tmpCard=new DownCard(self,sortCards[i],Card.TYPE.ORIGIN_DOWN_DESK);
        //                 cardX = 460 + flag * 35;
        //                 tmpCard.setPosition(cc.p(cardX, cardY));
        //             }
        //
        //         } else if (cards[k].type == OpManager.CARDTYPE.GANG) {
        //             sortCards = cards[k].cards.sort();
        //             for (var i = 0; i < sortCards.length; i++) {
        //                 flag++;
        //                 var tmpCard=new DownCard(self,sortCards[i],Card.TYPE.ORIGIN_DOWN_DESK);
        //                 cardX = 460 + flag * 35;
        //                 tmpCard.setPosition(cc.p(cardX, cardY));
        //             }
        //         } else if (cards[k].type == OpManager.CARDTYPE.SHOUPAI) {
        //             sortCards = cards[k].cards.sort();
        //             for (var i = 0; i < sortCards.length; i++) {
        //                 flag++;
        //                 var tmpCard=new DownCard(self,sortCards[i],Card.TYPE.ORIGIN_DOWN_DESK);
        //                 cardX = 460 + flag * 35;
        //                 tmpCard.setPosition(cc.p(cardX, cardY));
        //             }
        //         } else if (cards[k].type == OpManager.CARDTYPE.MINGGANG) {
        //             sortCards = cards[k].cards.sort();
        //             for (var i = 0; i < sortCards.length; i++) {
        //                 flag++;
        //                 var tmpCard=new DownCard(self,sortCards[i],Card.TYPE.ORIGIN_DOWN_DESK);
        //                 cardX = 460 + flag * 35;
        //                 tmpCard.setPosition(cc.p(cardX, cardY));
        //             }
        //         }
        //
        //     }
        // }
    },
    endCard: function (data) {
        var win = null;

        for (var i = 0; i < data.length; i++) {
            if (data[i].win != null) {
                win = data[i].win;
            } else {
                win = "平局";
            }
            var label = null;
            if (data[i].win == data[i].playerId) {
                label = new ccui.Text(data[i].userName + "      " + data[i].changePoint + "      win    " + win, "AmericanTypewriter", 20);
                label.setPosition(cc.p(-250, -160 - 30 * i));
            } else {
                label = new ccui.Text(data[i].userName + "      " + data[i].changePoint + "      fail    " + win, "AmericanTypewriter", 20);
                label.setPosition(cc.p(-250, -160 - 30 * i));
            }
            this.addChild(label);

        }
        // switch (data.){
        //     case 1:
        //         this._text1.setString(message);
        //         break;
        //     case 2:
        //         this._text2.setString(message);
        //         break;
        //     case 3:
        //         this._text3.setString(message);
        //         break;
        //     case 4:
        //         this._text4.setString(message);
        //         break;
        // }
    },
    setText: function (i, message) {

    }
});

var EndPlayerInfo = cc.Node.extend({
    cardScale: 1,//牌的缩放比例
    cardM: 1,//牌的间距
    line2H: 0,
    _huCard: -1,
    ctor: function (p, json, huCard) {
        this._super();
        p.addChild(this);
        this._huCard = huCard;
        this.player = json;
        this.record = this.player.record;
        this.init();
    },
    init: function () {
        if (this.player.id == overData.win) {//赢家，牌大一点
            this.cardScale = 75 / 112;
            this.cardM = 33;
            this.line2H = -60;
        } else {
            this.cardScale = 60 / 112;
            this.cardM = 33;
            this.line2H = -50;
        }
        this.loadCardJson1(cardData);
        this.cardArr = this.sortCard();
        this.loadLine1();// 第一行
        this.loadLine2();// 第二行
    },
    loadCardJson1: function (cardData) {
        var arr = cardData.tipInfos;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].userid == this.player.id) {
                this.cardJson = arr[i].cards;
                return;
            }
        }
    },
    // loadCardJson: function () {
    //     var arr = gg.overCardJson.tipInfos;
    //     for (var i = 0; i < arr.length; i++) {
    //         if (arr[i].userid == this.player.id) {
    //             this.cardJson = arr[i].card;
    //             return;
    //         }
    //     }
    // },
    sortCard: function () {//牌排序
        var result = [];
        /*获取明牌，吃碰杠 data[i].card*/
        for (var i = 0; i < this.cardJson.length; i++) {
            var card3 = this.cardJson[i];
            // if (card3.type != 0 && card3.type != 99) {// 明牌
            //     var array=[];
            //     for (var i=0;i<card3.cards.length;i++){
            //         array.push(card3.cards[i]);
            //         if((i+1)%3==0){
            //             result.push.apply(result, array);
            //             result.push(-1);
            //             array=[];
            //         }
            //     }
            //
            //
            //
            //     // result.push.apply(result, card3.cards);
            //     // result.push(-1);
            // }

            if (card3.type == 11) {
                var array = [];
                for (var i = 0; i < card3.cards.length; i++) {
                    array.push(card3.cards[i]);
                    if ((i + 1) % 3 == 0) {
                        result.push.apply(result, array);
                        result.push(-1);
                        array = [];
                    }
                }
            }
        }
        /*获取吃牌*/
        for (i = 0; i < this.cardJson.length; i++) {
            var card3 = this.cardJson[i];
            if (card3.type == 12) {
                var array = [];
                for (var i = 0; i < card3.cards.length; i++) {
                    array.push(card3.cards[i]);
                    if ((i + 1) % 3 == 0) {
                        var sort = array.sort(function sortNumber(a, b) {
                            return a - b
                        });
                        result.push.apply(result, sort);
                        result.push(-1);
                        array = [];
                        sort = [];
                    }
                }
            }
        }
        //获取an杠牌
        for (i = 0; i < this.cardJson.length; i++) {
            var card3 = this.cardJson[i];
            if (card3.type == 13) {
                var array = [];
                for (var i = 0; i < card3.cards.length; i++) {
                    array.push(card3.cards[i]);
                    if ((i + 1) % 4 == 0) {
                        result.push.apply(result, array);
                        result.push(-1);
                        array = [];
                    }
                }
            }
        }
        //获取明杠牌
        for (i = 0; i < this.cardJson.length; i++) {
            var card3 = this.cardJson[i];
            if (card3.type == 14) {
                var array = [];
                for (var i = 0; i < card3.cards.length; i++) {
                    array.push(card3.cards[i]);
                    if ((i + 1) % 4 == 0) {
                        result.push.apply(result, array);
                        result.push(-1);
                        array = [];
                    }
                }
            }
        }
        /*获取手牌*/
        for (i = 0; i < this.cardJson.length; i++) {
            var card = this.cardJson[i];
            if (card.type == 0) {// 手牌
                var sort = card.cards.sort(function sortNumber(a, b) {
                    return a - b
                });
                result.push.apply(result, sort);
                break;
            }
        }
        result.push(-2);
        /*获取胡的牌*/
        // for (i = 0; i < this.cardJson.length; i++) {
        //     var card2 = this.cardJson[i];
        //     if (card2.type == 99) {// 胡牌
        //         result.push.apply(result, card2.cards);
        //         break;
        //     }
        // }
        var huCard = [this._huCard];
        if (this._huCard != -1) {
            result.push.apply(result, huCard);
        }
        return result;
    },
    loadLine1: function () {
        this.loadZhuang();
        var l1 = this.addLabel(this.player.id + "", 24);
        l1.setPosition(89, 0);
        var l2 = this.addLabel(this.player.name, 24);//昵称
        l2.setPosition(280, 0);
        if (this.player.id == overData.win) {
            var str = HU_TYPE[this.record.huType];
            var l5 = this.addLabel(str, 24);//
            l5.setPosition(459, 0);
        } else {
            var l3str = this.record.zhan ? "站立" : "非站立";
            var l3 = this.addLabel(l3str, 24);//
            l3.setPosition(459, 0);
            var l4str = this.record.ting ? "听牌" : "未听牌";
            var l4 = this.addLabel(l4str, 24);//
            l4.setPosition(586, 0);
        }
    },
    loadZhuang: function () {
        if (this.record.bankerTime == 1) {
            var zhuan = new cc.Sprite("#icon_zhunag2.png");
            zhuan.setPosition(cc.p(30 + zhuan.width * 0.5, 0));
            this.addChild(zhuan);
        }
    },
    loadLine2: function () {
        this.loadGun();
        var prev = null, mm = 0;
        for (var i = 0; i < this.cardArr.length; i++) {
            var cell = this.cardArr[i];
            if (cell == -1) {// 拉开距离
                mm = this.cardM;
                continue;
            }
            else if (cell == -2) {
                // mm = this.cardM * 2;
                // prev=null;
                continue;
            }
            if (i != this.cardArr.length - 1) {
                var card = new DownCard(this, cell, Card.TYPE.ORIGIN_DOWN_HAND);
                card.setScale(this.cardScale);
                card.wait();
                if (prev) {
                    Utils.right(prev, card, mm);
                } else {
                    card.setPosition(89 + card.width * 0.5 * this.cardScale, this.line2H);
                }
            } else {
                var card = new DownCard(this, cell, Card.TYPE.ORIGIN_DOWN_HAND);
                card.setScale(this.cardScale);
                card.wait();
                card.setPosition(cc.p(851, this.line2H));
            }


            mm = 0;
            prev = card;
        }
        /*添加分数*/
        var cl = new cc.LabelTTF(this.record.point + "", "微软雅黑", 24);
        cl.setColor(cc.color(247, 202, 21));
        cl.setPosition(851, 0);
        this.addChild(cl);
    },
    loadGun: function () {
        if (this.record.gunTime == 1) {
            var gun = new cc.Sprite("#icon_fire_pao.png");
            gun.setPosition(cc.p(20 + gun.width * 0.5, this.line2H));
            this.addChild(gun);
        }
    },
    addLabel: function (str, size) {
        var label = new cc.LabelTTF(str, gg.fontName, size);
        label.setColor(cc.color(178, 131, 116));
        label.setAnchorPoint(0, 0.5);
        this.addChild(label);
        return label;
    }
});

HU_TYPE = ["", "点炮小胡", "夹胡点炮", "站立点炮",
    "站立夹胡点炮", "自摸小胡", "夹胡自摸",
    "站立自摸", "站立夹胡自摸", "摸宝",
    "夹胡摸宝", "宝中宝", "刮大风",
    "夹胡刮大风", "红中满天飞", "夹胡红中满天飞",
    "漏胡", "漏胡夹胡", "漏胡刮大风", "漏胡红中满天飞"];

gg.overCardJson = {
    priority: 0,
    userid: 0,
    position: 0,
    type: 1,
    tipInfos: [
        {
            userid: 1,
            posistion: 0,
            card: [
                {
                    cards: [1, 2, 3, 3],
                    type: 0,
                    cardNum: 12
                }, {
                    cards: [3],
                    type: 99,
                    cardNum: 12
                }, {
                    cards: [5, 5, 5],
                    type: 11,
                    cardNum: 12
                }, {
                    cards: [6, 6, 6],
                    type: 11,
                    cardNum: 12
                }, {
                    cards: [7, 7, 7],
                    type: 11,
                    cardNum: 12
                }
            ]
        }, {
            userid: 2,
            posistion: 0,
            card: [
                {
                    cards: [1, 9, 10, 18, 19, 27, 1, 9, 10, 18, 19, 27, 1],
                    type: 11,
                    cardNum: 12
                }
            ]
        }, {
            userid: 3,
            posistion: 0,
            card: [
                {
                    cards: [1, 9, 10, 18, 19, 27, 1, 9, 10, 18, 19, 27, 1],
                    type: 11,
                    cardNum: 12
                }
            ]
        }, {
            userid: 4,
            posistion: 0,
            card: [
                {
                    cards: [1, 9, 10, 18, 19, 27, 1, 9, 10, 18, 19, 27, 1],
                    type: 11,
                    cardNum: 12
                }
            ]
        }
    ]
};