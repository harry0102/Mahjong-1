/**
 * Created by Administrator on 2017/1/17 0017.
 */
/*結束之後的層*/
var gg = gg || {};
var OverLayer = MyLayer.extend({
    ctor: function (p) {
        this._super(this.onTouchEndEvent(), this);
        p.addChild(this, 1000);
        this.init();
    },
    init: function () {
        this.bgArr = [];
        this.setOpacity(153);
        this.loadBackGround();
        this.loadShare();
        this.loadTip();
        this.loadRoomNo();
        // this.loadTime();
        this.loadBack();
    },
    onTouchEndEvent: function (traget) {
        return false;
    },
    loadBackGround: function () {
        var sp = new cc.Sprite(res.bg_finish_png);
        this.addChild(sp);
        var ws = cc.director.getWinSize();
        sp.setPosition(ws.width * 0.5, ws.height * 0.5);
        // var prev = null;

        // var length = gg.overJson.player.length;
        // /*计算间隔*/
        // var mm = 8 + (4 - length) * 271 / (length - 1);
        // for (var i = 0; i < length; i++) {
        //     var sp2 = new OverPlayerInfo(this, gg.overJson.player[i]);
        //     if (prev) {
        //         Utils.right(prev, sp2, mm);
        //     } else {
        //         sp2.setPosition(214.5, 356);
        //     }
        //     prev = sp2;
        //     this.bgArr.push(sp2);
        // }
    },
    laodOverInfo: function (data) {
        var length = data.player.length;
        gg.overJson = data;
        var prev;
        /*计算间隔*/
        if (length == 4) {
            var mm = 8 + (4 - length) * 271 / (length - 1);
            for (var i = 0; i < length; i++) {
                var sp2 = new OverPlayerInfo(this, data.player[i]);
                if (prev != undefined) {
                    Utils.right(prev, sp2, mm);
                } else {
                    sp2.setPosition(214.5, 356);
                }
                prev = sp2;
                this.bgArr.push(sp2);
            }
        }
        if (length == 3) {
            var mm = (1184 - length * 271) / 4;
            for (var i = 0; i < length; i++) {
                var sp2 = new OverPlayerInfo(this, data.player[i]);
                if (prev != undefined) {
                    Utils.right(prev, sp2, mm);
                } else {
                    sp2.setPosition(270, 356);
                }
                prev = sp2;
                this.bgArr.push(sp2);
            }
        } else {
            for (var i = 0; i < length; i++) {
                var sp2 = new OverPlayerInfo(this, data.player[i]);
                if (prev != undefined) {
                    sp2.setPosition(900, 356);
                } else {
                    sp2.setPosition(380, 356);
                }
                prev = sp2;
                this.bgArr.push(sp2);
            }
        }
    },
    loadShare: function () {
        var share = this.share = new MyNode(this, "#btn_orange2.png", this.cb, this);
        var label = new cc.LabelTTF("分享", "微软雅黑", 40);
        share.addChild(label);
        label.setPosition(share.width * 0.5, share.height * 0.5);
        var ws = cc.director.getWinSize();
        share.setPosition(ws.width * 0.5, 95);
    },
    loadTip: function () {
        var str = "游戏结果仅作娱乐用途,禁止用于赌博行为！";
        var tip = new cc.LabelTTF(str, "微软雅黑", 19);
        tip.setPosition(84, 71);
        tip.setColor(cc.color(129, 37, 15));
        tip.setAnchorPoint(0, 0);
        this.addChild(tip);
    },
    loadRoomNo: function () {
        var str = "房间号 " + gg.overJson.roomNum;
        var roomNo = new cc.LabelTTF(str, "微软雅黑", 19);
        roomNo.setPosition(1026, 100);
        roomNo.setColor(cc.color(55, 15, 6));
        roomNo.setAnchorPoint(0, 0.5);
        this.addChild(roomNo);
    },
    loadTime: function () {
        var str = this.getTime();
        var time = new cc.LabelTTF(str, "微软雅黑", 19);
        time.setPosition(1026, 75);
        time.setColor(cc.color(55, 15, 6));
        time.setAnchorPoint(0, 0.5);
        this.addChild(time);
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
    loadBack: function () {
        // var back = this.back = new MyNode(this, "#icon_back.png", this.cb, this);
        var back = this.back = new MyNode(this, "#icon_back.png", function () {
            Utils.runScene(new MenuScene());
        });
        back.setPosition(45, 678);
        // this.addChild(this.back);
        // var _backlListener = cc.EventListener.create({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     swallowTouches: true,
        //     onTouchBegan: function (touch, event) {
        //         var target = event.getCurrentTarget();
        //         var posInNode = target.convertToNodeSpace(touch.getLocation());
        //         var size = target.getContentSize();
        //         var rect = cc.rect(0, 0, size.width, size.width);
        //         if (!(cc.rectContainsPoint(rect, posInNode))) {
        //             return false;
        //         }
        //
        //         return true;
        //     }.bind(this)
        // });
        // cc.eventManager.addListener(_backlListener, back);
    },
    cb: function (p) {
        switch (p) {
            case this.share:
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
                break;
            case this.back:
                cc.log("返回");
                this.setVisible(false);
                break;
        }
    }

});

var OverPlayerInfo = cc.Sprite.extend({
    ctor: function (p, json) {
        this._super(res.bg_dialog_png);
        this.player = json;
        this.record = this.player.record;
        p.addChild(this);
        this.init();
    },
    init: function () {
        this.redBorder();
        this.loadHead();
        this.loadList();
    },
    loadList: function () {
        var l1 = this.addLabel("胡牌次数", this.record.winTime);
        l1.setPosition(17, 285);
        var l2 = this.addLabel("坐庄次数", this.record.bankerTime);
        Utils.down(l1, l2, 43);
        var l3 = this.addLabel("点炮次数", this.record.gunTime);
        Utils.down(l2, l3, 43);
        var l4 = this.addLabel("摸宝次数", this.record.baoTime);
        Utils.down(l3, l4, 43);
        var l5 = this.addLabel("宝中宝次数", this.record.bigBaoTime);
        Utils.down(l4, l5, 43);
        var line = this.loadLine();
        line.setScaleX(0.25);
        Utils.down(l5, line, 25);
        var score = this.addScore();
        Utils.down(line, score, 35)
    },
    loadLine: function () {
        var sp = new cc.Sprite("#line_1.png");
        sp.setAnchorPoint(0, 0.5);
        this.addChild(sp);
        return sp;
    },
    addLabel: function (str, count) {
        var node = new cc.Node();
        this.addChild(node);
        var label = new cc.LabelTTF(str, "微软雅黑", 24);
        label.setAnchorPoint(0, 0.5);
        label.setColor(cc.color(0, 0, 0));
        node.addChild(label);
        var lbg = new cc.Sprite("#oic_input_2.png");
        node.addChild(lbg);
        lbg.setPosition(193.5, 0);
        var cl = new cc.LabelTTF(count + "", "微软雅黑", 24);
        cl.setPosition(lbg.width * 0.5, lbg.height * 0.5);
        lbg.addChild(cl);
        return node;
    },
    addScore: function () {//总成绩
        var node = new cc.Node();
        this.addChild(node);
        var sp = new cc.Sprite("#pic_final_score.png");
        sp.setAnchorPoint(0, 0.5);
        node.addChild(sp);
        var lbg = new cc.Sprite("#oic_input_2.png");
        node.addChild(lbg);
        lbg.setPosition(193.5, 0);
        var cl = new cc.LabelTTF(this.record.point + "", "微软雅黑", 24);
        cl.setColor(cc.color(247, 202, 21));
        cl.setPosition(lbg.width * 0.5, lbg.height * 0.5);
        lbg.addChild(cl);
        return node;
    },
    loadHead: function () {
        var head = this.head = new cc.Sprite(res.biaoqing2);
        head.setPosition(22 + 40, 365);
        this.addChild(head);
        var url = this.player.face;
        url = "http://i3.dpfile.com/pc/50e07f17aeaa6399013cf34d3193b1d9%2880c80%29/thumb.jpg";
        cc.loader.loadImg(url, {isCrossOrigin: true},
            function (err, img) {
                var face = new cc.Sprite(img);
                head.setSpriteFrame(face.getSpriteFrame());
            });
        this.iconHost();
        this.loadHeadRight();
        this.loadTitle();
    },
    loadTitle: function () {
        var img = null, pos = null;
        if (gg.overJson.bigWiner == this.player.id) {
            img = "#icon_win_big.png";
            pos = cc.p(230, 420);
        } else if (gg.overJson.gunner == this.player.id) {
            img = "#pic_best_pao.png";
            pos = cc.p(80, 330);
        } else {
            return;
        }
        var sp = new cc.Sprite(img);
        this.addChild(sp, 5);
        sp.setPosition(pos);
    },
    loadHeadRight: function () {
        var label1 = new cc.LabelTTF("" + this.player.wId, "微软雅黑", 19);
        var label2 = new cc.LabelTTF("id:" + this.player.id, "微软雅黑", 19);
        label1.setAnchorPoint(0, 0.5);
        label2.setAnchorPoint(0, 0.5);
        this.addChild(label1);
        this.addChild(label2);
        label1.setPosition(22 + 14 + 80, 381);
        //label2.setPosition(140, 346);
        Utils.down(label1, label2);
    },
    iconHost: function () {
        if (this.player.id == gg.overJson.adminId) {
            var host = new cc.Sprite("#icon_host.png");
            host.setPosition(17 + host.width * 0.5, 400);
            this.addChild(host);
        }
    },
    redBorder: function () {
        if (!Game.user) {
            Game.user = {
                "id": "2"
            };
        }
        if (Game.user.id == this.player.id) {
            var red = new cc.Sprite(res.k_red_png);
            red.setPosition(this.width * 0.5, this.height * 0.5);
            this.addChild(red)
        }
    },
});

gg.overJson = {
    "bigWiner": -1,//赢的人的id
    "applyDissolution": 0,
    "banker": 0,
    "totalCount": 0,
    "playerNum": 0,
    "currentRount": 0,
    "roomNum": 112321,
    "round": 0,
    "currentCount": 0,
    "adminId": 3,
    "id": 2,
    "openCount": 0,
    "state": 0,
    "gunner": 4,//最佳炮手
    "win": 1,
    "player": [
        {
            "winCount": 0,
            "name": "大赢家",
            "face": "http://ww2.sinaimg.cn/square/00663XUTgw1ey61yraw9uj30h20hegop.jpg",
            "roomCard": 0,
            "point": 0,
            "roomId": 0,
            "lostCount": 0,
            "gold": 0,
            "record": {
                "bigBaoTime": 1,//宝中宝
                "baoTime": 2,//墨宝次数
                "winTime": 3,//胡牌次数
                "zhan": false,
                "gunTime": 4,//点炮次数
                "huType": 3,
                "ting": false,
                "bankerTime": 0,//坐庄次数
                "startTime": 1484705136118,
                "point": 11//总成绩
            },
            "drawCount": 0,
            "id": 1,
            "position": 0,
            "state": 0,
            "fleeCount": 0
        },
        {
            "winCount": 0,
            "name": "二号人",
            "face": "http://img001.photo.21cn.com/photos/album/20071126/o/22E126FB957E57A3E30127737B73BCFE.jpg",
            "roomCard": 0,
            "point": 0,
            "roomId": 0,
            "lostCount": 0,
            "gold": 0,
            "record": {
                "bigBaoTime": 3,
                "baoTime": 2,
                "winTime": 4,
                "zhan": false,
                "gunTime": 1,
                "huType": 0,
                "ting": false,
                "bankerTime": 0,
                "startTime": 1484705136118,
                "point": -9
            },
            "drawCount": 0,
            "id": 2,
            "position": 0,
            "state": 0,
            "fleeCount": 0
        },
        {
            "winCount": 0,
            "name": "三号人",
            "face": "http://ww2.sinaimg.cn/square/bacd706djw1f1l03p2cwxj20qo0qo7a8.jpg",
            "roomCard": 0,
            "point": 0,
            "roomId": 0,
            "lostCount": 0,
            "gold": 0,
            "record": {
                "bigBaoTime": 0,
                "baoTime": 2,
                "winTime": 1,
                "zhan": false,
                "gunTime": 1,
                "huType": 0,
                "ting": false,
                "bankerTime": 0,
                "startTime": 1484705136118,
                "point": 7
            },
            "drawCount": 0,
            "id": 3,
            "position": 0,
            "state": 0,
            "fleeCount": 0
        },
        {
            "winCount": 0,
            "name": "老四",
            "face": "http://ww2.sinaimg.cn/square/6f5ef307tw1eokw1wpv9aj20eu0gr0v8.jpg",
            "roomCard": 0,
            "point": 0,
            "roomId": 0,
            "lostCount": 0,
            "gold": 0,
            "record": {
                "bigBaoTime": 1,
                "baoTime": 1,
                "winTime": 1,
                "zhan": false,
                "gunTime": 2,
                "huType": 0,
                "ting": false,
                "bankerTime": 2,
                "startTime": 1484705136118,
                "point": 2
            },
            "drawCount": 0,
            "id": 4,
            "position": 0,
            "state": 0,
            "fleeCount": 0
        }
    ]
};