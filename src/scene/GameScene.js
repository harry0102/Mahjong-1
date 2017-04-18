/**
 * Created by kale on 2016/11/15.
 */


var GameScene = cc.Scene.extend({

    _gameBackgroundLayer: null,
    _infoLayer: null,
    _UILayer: null,
    players: [],
    _userAction: null,
    _result: null,
    _allResult: null,
    _init_data: null,
    _type: null,
    _huTypeMagic:null,
    ctor: function (data) {
        this._super();

        if (data != null) {
            this._type = 1;  //第一把
            this._init_data = data;
        } else {
            this._type = 2;
            this._init_data = Game.userData;
        }
        this.init();

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function (keyCode, event) {
                if (keyCode == cc.KEY.back) {
                    Cocos2dxBridge.showAlertDialog();
                }
                else if (keyCode == cc.KEY.menu) {
                }
            }
        }, this);

        return true;
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        cc.log("enter listener");
        target.getParent().removeFromParent();

    },
    //初始化
    init: function () {

        //加载背景层
        this._gameBackgroundLayer = new GameBackgroundLayer();
        this.addChild(this._gameBackgroundLayer);

        //加载提示信息层
        this._infoLayer = new InfoLayer();
        this.addChild(this._infoLayer);

        //加载设置层
        this._UILayer = new UILayer();
        this.addChild(this._UILayer, 900);

        //吃 碰 过
        this._userAction = new UserActionLayer();
        this.addChild(this._userAction, 800);
        this._userAction.setVisible(false);

        //结果显示
        this._result = new EndMenuLayer();
        this.addChild(this._result, 999);
        this._result.setPosition(cc.p(7200, 3600));

        //总结果显示
        this._allResult = new OverLayer(this);
        this._allResult.setPosition(cc.p(7200, 3600));
        if (this._init_data.leftDeskCardNum) {
            // this.reconnect(this._init_data);
        } else {
            if (this._init_data) {
                this.intoRoom(this._init_data);
            }
        }


    },
    //测试方法
    loadtest: function () {
        var sp1 = new DownCard(this, 4, Card.TYPE.ORIGIN_DOWN_HAND, this.onTouchBegan, this);
        sp1.setPosition(100, 500);
        sp1.setScale(1.11);

        var sp2 = new DownCard(this, 7, Card.TYPE.ORIGIN_DOWN_HAND, this.onTouchBegan, this);
        sp2.setPosition(200, 500);
    },

    onEnter: function () {
        this._super();
        Game.op.bindRoom(this);

        this._UILayer.loadPlayer1(0);
        this._infoLayer.loadRules();
        this._infoLayer.setLabelText(Game.roomNum, Game.playerNum, Game.roundNum);

        if (this._init_data.leftDeskCardNum) {
            this.reconnect(this._init_data);
        }

    },

    //发牌
    dealCard: function (data) {
        //获取房间信息
        this._UILayer.startGame();
        this._infoLayer.loadCardText(136);
        this._gameBackgroundLayer.loadItems();

        cc.log(data);
        if (data.playerInfos) {
            for (var i = 0; i < data.playerInfos.length; i++) {

                var pInfo = data.playerInfos[i];
                var _direction = DIRECTION.positionToDirection(pInfo.position);
                this.players[pInfo.position] = new UserLayer(_direction);
                this.addChild(this.players[pInfo.position], 101);

                var _cards = pInfo.cards;
                var _dealCard;
                for (var j = 0; j < _cards.length; j++) {
                    if (_cards[j].type == 0) {
                        if (_direction == DIRECTION.DOWN) {
                            _dealCard = _cards[j].cards;
                        } else {
                            var _index = _cards[j].cardNum;
                            _dealCard = new Array();
                            while (_index-- > 0) {
                                _dealCard.push(0);
                            }
                        }
                        break;
                    }
                }
                cc.log(DIRECTION[_direction]);
                cc.log(_dealCard);
                this.players[pInfo.position].dealCard1(_dealCard);
            }
        }

    },
    //抓牌
    drawCard: function (data) {

        if (data && data.playerInfos && data.playerInfos.length) {
            var _player = data.playerInfos[0];
            this.players[_player.position].drawCard1(_player.userid == Game.user.id ? _player.cards[0].cards[0] : 0);
            this._gameBackgroundLayer.changeStatus((_player.position));
            // this._userAction.resetBackGround();

            this._gameBackgroundLayer.loadCount(10);

            this._infoLayer.setPokeText(data.leftDeskCardNum);

        }
    },
    enableTouchCards: function (data) {
        for (var j = 0; j < this.players[data[0].tipInfos[0].position]._handCards.length; j++) {
            this.players[data[0].tipInfos[0].position]._handCardsLayer.getChildByTag(j).setTouchFlag(true);
        }
    },
    disableTouchCards: function (data) {
        for (var j = 0; j < this.players[data[0].tipInfos[0].position]._handCards.length; j++) {
            this.players[data[0].tipInfos[0].position]._handCardsLayer.getChildByTag(j).setTouchFlag(false);
        }
    },
    //断线重连
    reconnect: function (data) {
        cc.log(data);
        this._UILayer.startGame();
        this.roomInfo(data);
        this._infoLayer.loadCardText(136);
        this._gameBackgroundLayer.loadItems();

        if (data.players) {
            for (var i = 0; i < data.players.length; i++) {

                var pInfo = data.players[i];
                var _direction = DIRECTION.positionToDirection(pInfo.position);
                this.players[pInfo.position] = new UserLayer(_direction);
                this.addChild(this.players[pInfo.position], 101);
                if (data.status == 1) {
                    //开始状态
                    this.players[pInfo.position].recovery(pInfo);
                } else if (data.status == 0) {
                    //准备状态

                } else if (data.status == 3) {
                    //解散状态
                }
            }
            if (data.tempTips != null) {
                this.tipCard(data.tempTips);
                this._gameBackgroundLayer.changeStatus(data.current);
            } else {
                if (data.current == Game.userPosition) {
                    this.players[data.current].readyCard();
                }
                this._gameBackgroundLayer.changeStatus(data.current);
                this._gameBackgroundLayer.loadCount(10);
                this._infoLayer.setPokeText(data.leftDeskCardNum);
                this._UILayer._diamond.setPosition(10000, 0);
            }
        }
        Game.op.roomInfo1();

    },
    //提示信息
    tipCard: function (data) {

        for (var i = 0; i < data.length; i++) {
            if (data[i].userid == Game.user.id) {

                switch (data[i].type) {
                    case OpManager.TIPTYPE.CANCHIPAI:
                        //tip
                        this._userAction.chiAction(data);
                        this._userAction.setVisible(true);
                        //倒计时
                        this._gameBackgroundLayer.loadCount(4);
                        break;
                    case OpManager.TIPTYPE.CANPENGPAI:
                        this._userAction.pengAction(data);
                        this._userAction.setVisible(true);
                        //倒计时
                        this._gameBackgroundLayer.loadCount(4);
                        break;
                    case OpManager.TIPTYPE.CANMINGGANG:
                        this._userAction.gangAction(data);
                        this._userAction.setVisible(true);
                        //倒计时
                        this._gameBackgroundLayer.loadCount(4);
                        break;
                    case OpManager.TIPTYPE.CANANGANG:
                        this._userAction.angangAction(data);
                        this._userAction.setVisible(true);
                        //倒计时
                        this._gameBackgroundLayer.loadCount(4);
                        break;
                    case OpManager.TIPTYPE.CANHU:
                        var result = data[i].tipInfos[0].cards[0].cards[0];
                        // Game.op.huCard(result);
                        this._userAction.huAction(data);
                        this._userAction.setVisible(true);
                        //倒计时
                        this._gameBackgroundLayer.loadCount(4);
                        break;
                    case OpManager.TIPTYPE.CANTING:
                        cc.log("————————————————收到可以听牌数据————————————————");
                        cc.log(data);
                        var result = data[i].tipInfos[0].cards[0].cards[0];
                        // Game.op.huCard(result);
                        this._userAction.tingACtion(data);
                        this._userAction.setVisible(true);
                        //倒计时
                        this._gameBackgroundLayer.loadCount(4);
                        break;
                    case OpManager.TIPTYPE.CANPENGTING:
                        cc.log("————————————————收到可以碰听牌数据————————————————");
                        cc.log(data);
                        var result = data[i].tipInfos[0].cardsList[0];
                        this._userAction.pengTingACtion(data);
                        this._userAction.setVisible(true);
                        //倒计时
                        this._gameBackgroundLayer.loadCount(4);
                        break;
                    case OpManager.TIPTYPE.CANCHITING:
                        cc.log("————————————————收到可以吃听牌数据————————————————");
                        cc.log(data);
                        var result = data[i].tipInfos[0].cardsList[0];
                        this._userAction.chiTingACtion(data);
                        this._userAction.setVisible(true);
                        //倒计时
                        this._gameBackgroundLayer.loadCount(4);
                        break;

                    default:

                        break;
                }
            }
        }
    },
    //房间信息
    roomInfo: function (data) {
        cc.log("this is roominfo");
        this._infoLayer.setLabelText(data.roomNum, data.playerNum, data.currentCount);
        if (data.playerNum == 4) {
            this._infoLayer.setRound(data.currentRount, data.round);
        } else {
            this._infoLayer.setRound(data.currentCount, data.totalCount);

        }

        this._UILayer.setZhuang(data.banker);
    },
    //碰牌
    pengCard: function (data) {
        cc.log(data);
        for (var i = 0; i < data.playerInfos.length; i++) {
            var player = data.playerInfos[i];
            if(player.position==Game.userPosition&&player.userid == Game.user.id){
                this._userAction.resetBackGround();
            }
            if (player.cards[0].type == OpManager.CARDTYPE.PENGPAI) {
                this.players[player.position].pengCard1(player);
                this._gameBackgroundLayer.changeStatus(player.position);
                this.dealMagic(OpManager.CMD.PENG, player.position);
            } else if (player.cards[0].type == OpManager.CARDTYPE.BEPENG) {
                this.players[player.position].removeCard();
            }
        }
        cc.audioEngine.playEffect(res.peng_mp3,false);
        this._gameBackgroundLayer.loadCount(10);
        this._infoLayer.setPokeText(data.leftDeskCardNum);
        this._UILayer._diamond.setPosition(10000, 0);
    },
    //听牌
    tingCard: function (data) {
        cc.log(data);
        var position = data.tipInfos[0].position;
        this._UILayer.loadTing1(data);
        if(position==Game.userPosition&&data.tipInfos[0].userid == Game.user.id){
            this._userAction.resetBackGround();
        }
        this.dealMagic(OpManager.CMD.TING, position);
    },
    //特效
    dealMagic: function (type, position) {
        var x_tmp, y_tmp;
        switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
            case DIRECTION.DOWN:
                x_tmp = 633;
                y_tmp = 218;
                break;
            case DIRECTION.LEFT:
                x_tmp = 247;
                y_tmp = 437;
                break;
            case DIRECTION.UP:
                x_tmp = 633;
                y_tmp = 557;
                break;
            case DIRECTION.RIGHT:
                x_tmp = 1003;
                y_tmp = 437;
                break;
        }
        var ss = new cc.Sprite("#ting1.png");
        this.addChild(ss, 1000);
        switch (type) {
            case OpManager.CMD.TING:
                ss.setSpriteFrame("magic_ting.png");
                break;
            case OpManager.CMD.CHI:
                ss.setSpriteFrame("magic_chi.png");
                break;
            case OpManager.CMD.GANG:
                ss.setSpriteFrame("magic_gang.png");
                break;
            case OpManager.CMD.HU:
                ss.setSpriteFrame("magic_hu.png");
                break;
            case OpManager.CMD.PENG:
                ss.setSpriteFrame("magic_peng.png");
                break;
        }
        ss.setScale(0.3);
        ss.setPosition(x_tmp, y_tmp);

        var scale = cc.scaleTo(1.2, 1);
        var elasticInMoveTo = scale.easing(cc.easeBackInOut());
        var action = cc.sequence(elasticInMoveTo, cc.delayTime(0.7), cc.fadeOut(0.3));
        ss.runAction(action);

    },
    //获取宝牌
    baoCard: function (data) {
        cc.log(data);
        var card = data.playerInfos[0].cards[0].cards[0];
        this._UILayer.setBao(card);
    },
    //
    caishenCard:function (data) {
        var team=data.playerInfos[0].cards;
        var card;
        for(var i=0;i<team.length;i++){
            if(101 == team[i].type){
                card=team[i].cards[0];
            }else if(1 == team[i].type){

            }
        }
        this._UILayer.setBao(card);
    },
    test: function () {
        Game.op.tingCard(1);
    },
    //吃听牌
    chiTingCard: function (data) {
        cc.log("————————————————收到吃听消息————————————————");

        var _d = {};

        for (var i = 0; i < data.tipInfos.length; i++) {
            var player = data.tipInfos[i];
            _d[player.cards[0].type] = player;
            if(player.position==Game.userPosition&&player.userid == Game.user.id){
                this._userAction.resetBackGround();
            }
        }

        this.players[_d[OpManager.CARDTYPE.CHIPAI].position].chiCard1(_d[OpManager.CARDTYPE.CHIPAI], _d[OpManager.CARDTYPE.BECHI]);

        this.players[_d[OpManager.CARDTYPE.BECHI].position].removeCard();
        this._UILayer._diamond.setPosition(10000, 0);

        this._gameBackgroundLayer.changeStatus(player.position);
        this._gameBackgroundLayer.loadCount(10);

        this._UILayer.loadTing(data);

        this.dealMagic(OpManager.CMD.TING, _d[OpManager.CARDTYPE.CHIPAI].position);
    },
    //碰听牌
    pengTingCard: function (data) {
        cc.log("————————————————收到碰听消息————————————————");

        var _d = {};

        for (var i = 0; i < data.tipInfos.length; i++) {
            var player = data.tipInfos[i];
            _d[player.cards[0].type] = player;
            if(player.position==Game.userPosition&&player.userid == Game.user.id){
                this._userAction.resetBackGround();
            }
        }

        this.players[_d[OpManager.CARDTYPE.PENGPAI].position].pengCard1(_d[OpManager.CARDTYPE.PENGPAI], _d[OpManager.CARDTYPE.BEPENG]);
        this.players[_d[OpManager.CARDTYPE.BEPENG].position].removeCard();

        this._UILayer._diamond.setPosition(10000, 0);

        this._gameBackgroundLayer.changeStatus(player.position);
        this._gameBackgroundLayer.loadCount(10);

        this._UILayer.loadTing(data);
        this.dealMagic(OpManager.CMD.TING, _d[OpManager.CARDTYPE.PENGPAI].position);
    },
    //暗杠牌
    annGangCard: function (data) {
        cc.log(data);
        for (var i = 0; i < data.playerInfos.length; i++) {
            var player = data.playerInfos[i];
            if(player.position==Game.userPosition&&player.userid == Game.user.id){
                this._userAction.resetBackGround();
            }
            if (player.cards[0].type == OpManager.CARDTYPE.ANGANG) {
                this.players[player.position].angangCard1(player);
                this.dealMagic(OpManager.CMD.GANG, player.position);
            }
        }
        cc.audioEngine.playEffect(res.gang_mp3,false);
        this._gameBackgroundLayer.changeStatus(Game.user.position);
        this._gameBackgroundLayer.loadCount(10);
        this._infoLayer.setPokeText(data.leftDeskCardNum);
    },
    //杠牌
    gangCard: function (data) {
        cc.log(data);
        for (var i = 0; i < data.playerInfos.length; i++) {
            var player = data.playerInfos[i];
            if(player.position==Game.userPosition&&player.userid == Game.user.id){
                this._userAction.resetBackGround();
            }
            if (player.cards[0].type == OpManager.CARDTYPE.MINGGANG) {
                this.players[player.position].gangCard1(player);
                this.dealMagic(OpManager.CMD.GANG, player.position);
            } else if (player.cards[0].type == OpManager.CARDTYPE.BEMINGGANG) {
                this.players[player.position].removeCard();
            }
        }
        cc.audioEngine.playEffect(res.gang_mp3,false);
        this._UILayer._diamond.setPosition(10000, 0);
        this._gameBackgroundLayer.changeStatus(Game.user.position);
        this._gameBackgroundLayer.loadCount(10);
        this._infoLayer.setPokeText(data.leftDeskCardNum);


    },
    //准备出牌
    readyCard: function (data) {
        cc.log(data);
        var item = data.tipInfos[0];
        if (item.userid == Game.user.id) {
            this.players[item.position].readyCard();
        }
        this._gameBackgroundLayer.changeStatus(item.position);
        this._gameBackgroundLayer.loadCount(10);
    },
    //吃牌
    chiCard: function (data) {
        cc.log("--------------------收到吃牌消息-------------------------");
        for (var i = 0; i < data.playerInfos.length; i++) {
            var player = data.playerInfos[i];
            if(player.position==Game.userPosition&&player.userid == Game.user.id){
                this._userAction.resetBackGround();
            }
            if (player.cards[0].type == OpManager.CARDTYPE.CHIPAI) {
                this.players[player.position].chiCard1(player);
                this.dealMagic(OpManager.CMD.CHI, player.position);
                this._gameBackgroundLayer.changeStatus(player.position);
            } else if (player.cards[0].type == OpManager.CARDTYPE.BECHI) {
                this.players[player.position].removeCard();
            }
        }
        cc.audioEngine.playEffect(res.chi_mp3,false);
        this._UILayer._diamond.setPosition(10000, 0);
        this._gameBackgroundLayer.loadCount(10);
        this._infoLayer.setPokeText(data.leftDeskCardNum);
    },
    //胡牌
    huCard: function (data) {
        cc.log("我胡了");
        Game.cardData = data;
        this.players[Game.userPosition].refreshCard();
        cc.audioEngine.playEffect(res.hu_mp3,false);
    },
    end: function (data) {
        if (Game.userData != null) {
            for (var i = 0; i < Game.userData.player.length; i++) {
                Game.userData.player[i].state = 0;
            }
        }
        this._result.loadBaoPai(data.bao);
        this._result.loadTime();
        this._result.loadPlayerInfo1(data);
        if (data.win != null) {
            this.dealMagic(OpManager.CMD.HU, Game.userPosition);
            switch(data.player[0].record.huType){
                case 9:
                    //摸宝
                    this.showHuMagic(45,"bao_");
                    break;
                case 10:
                    //夹胡摸宝
                    this.showHuMagic(45,"bao_");
                    break;
                case 11:
                    //宝中宝
                    this.showHuMagic(45,"bao_");
                    break;
                case 12:
                    //刮大风
                    this.showHuMagic(29,"blow_");
                    break;
                case 13:
                    //夹胡刮大风
                    this.showHuMagic(29,"blow_");
                case 14:
                    //红中满天飞
                    this.showHuMagic(39,"fly_");
                    break;
                case 15:
                    //夹胡红中满天飞
                    this.showHuMagic(39,"fly_");
                    break;
                case 16:
                    this.showHuMagic(46,"lou_");
                    break;
                case 17:
                    this.showHuMagic(46,"lou_");
                    break;
                case 18:
                    this.showHuMagic(46,"lou_");
                    break;
                case 19:
                    this.showHuMagic(46,"lou_");
                    break;
                default:
                    setTimeout(function () {
                        this._result.setPosition(cc.p(0, 0));
                    }.bind(this), 2000);
                    break;
            }
                // 9 摸宝  12 刮大风  14 红中  16 漏胡
        }
    },
    loadOutInfo: function (id) {
        for (var i = 0; i < Game.players.length; i++) {
            if (id == Game.players[i].id) {
                switch (DIRECTION.positionToDirection(Game.players[i].position)) {
                    case DIRECTION.UP:
                        // this._UILayer._head_up.setVisible(false);
                        this._UILayer._head_up.grey();
                        this._UILayer._head_up_confirm.setVisible(false);
                        break;
                    case DIRECTION.DOWN:
                        // this._UILayer._head_down.setVisible(false);
                        this._UILayer._head_down.grey();
                        this._UILayer._head_down_confirm.setVisible(false);
                        break;
                    case DIRECTION.LEFT:
                        // this._UILayer._head_left.setVisible(false);
                        this._UILayer._head_left.grey();
                        this._UILayer._head_left_confirm.setVisible(false);
                        break;
                    case DIRECTION.RIGHT:
                        // this._UILayer._head_right.setVisible(false);
                        this._UILayer._head_right.grey();
                        this._UILayer._head_right_confirm.setVisible(false);
                        break;
                }
            }
        }

    },
    loadInInfo: function (id) {

        for (var i = 0; i < Game.players.length; i++) {
            if (id == Game.players[i].id) {
                switch (DIRECTION.positionToDirection(Game.players[i].position)) {
                    case DIRECTION.UP:
                        // this._UILayer._head_up.setVisible(false);
                        this._UILayer._head_up.setUrl(Game.players[i].face);
                        break;
                    case DIRECTION.DOWN:
                        // this._UILayer._head_down.setVisible(false);
                        this._UILayer._head_down.setUrl(Game.players[i].face);
                        break;
                    case DIRECTION.LEFT:
                        // this._UILayer._head_left.setVisible(false);
                        this._UILayer._head_left.setUrl(Game.players[i].face);
                        break;
                    case DIRECTION.RIGHT:
                        // this._UILayer._head_right.setVisible(false);
                        this._UILayer._head_right.setUrl(Game.players[i].face);
                        break;
                }
            }
        }
    },
    overGame: function (data) {
        Game.isOver = true;
        this._result._cont_text.setString("总  分");
        this._allResult.loadTime();
        this._allResult.laodOverInfo(data);
    },
    getAllMembers: function () {
        var members = [];
        for (var i = 0; i < this.players.length; i++) {
            members.push(this.players[i].getMembers());
        }
        return members;
    },
    //进入房间
    intoRoom: function (data) {
        if (this._type == 2) {
            for (var i = 0; i < data.player.length; i++) {
                if (data.player[i].id == Game.user.id) {
                    data.player[i].state == 1
                }
            }
        } else {

        }

        this._UILayer.loadPlayer(data);
        Game.roomNum = data.roomNum;
        Game.userData = data;
        Game.players = data.player;
        this.roomInfo(data);

    },
    prepareRoom: function (data) {
        this._UILayer.loadConfirm(data);
    },
    //解散房间
    releaseRoom: function (d) {

        this._UILayer.loadWait(d);
    },
    //强制出牌
    playCard: function (data) {
        cc.log("————————————————收到打牌消息————————————————");
        if (data && data.playerInfos && data.playerInfos.length) {
            var _player = data.playerInfos[0];

            // this.players[_player.position].playCard(_player.cards[0].cards[0]);
            this.players[_player.position].autoPlayCard1(_player);
            cc.audioEngine.playEffect("res/sounds/mjt" + _player.cards[0].cards[0] + ".mp3", false);
        }
    },
    autoPlayCard: function (data) {
        cc.log(data);
        if (data && data.playerInfos && data.playerInfos.length) {
            if (data.playerInfos[0].userid == Game.user.id) {
                this._userAction.resetBackGround();
            }
            cc.log("autoplaycard reset");
            this._userAction.resetBackGround();
            var _player = data.playerInfos[0];
            this.players[_player.position].autoPlayCard1(_player.cards[0].cards[0]);
        }

    },
    showHuMagic:function (num,name) {
        this.sp = new cc.Sprite();
        this.sp.setTag(1000);
        this.sp.setPosition(400, 400);
        this.addChild(this.sp, 1);

        //定义一个数组 后面加中括号
        var allFrame = [];
        //for语句载入5个动画图片
        for (var i = 1; i < num; i++) {
            //加载针动画，rect四个参数，前两个X,Y的坐标，默认0就OK,
            //后面两个参数传图片的宽度和高度
            var str = name + i + ".png";
            var allf = cc.spriteFrameCache.getSpriteFrame(str);//new cc.SpriteFrame()

            if (!allf) {
                cc.log("@@@@@@@");
            }

            allFrame.push(allf);
        }

        //每隔0.03秒切换一张图片
        var animation = new cc.Animation(allFrame, 0.05);
        //把所有的动画连接起来进行播放
        var animate = new cc.Animate(animation);
        //重复的执行摸个动作
        var action = animate.repeat(1);//new cc.RepeatForever(animate)
        //用精灵来执行针动画，让针动画跑起来
        this.sp.runAction(cc.sequence(action,cc.callFunc(function (){
            this.sp.removeFromParent();
            this._result.setPosition(cc.p(0, 0));
        }.bind(this))));

    },
    // cb: function (direction) {
    //     this.scheduleOnce(function () {
    //         var card = parseInt(Math.random() * 27 + 1);
    //         switch (direction) {
    //             case DIRECTION.DOWN:
    //                 this._rightUser.drawCard(card);
    //                 break;
    //             case DIRECTION.RIGHT:
    //                 this._upUser.drawCard(card);
    //                 break;
    //             case DIRECTION.UP:
    //                 this._leftUser.drawCard(card);
    //                 break;
    //             case DIRECTION.LEFT:
    //                 this._downUser.drawCard(card);
    //                 break;
    //         }
    //
    //         // if(direction!=DIRECTION.DOWN){
    //         this.cbPlayCard(direction);
    //         // }
    //     }, 1);
    //
    // },
    // cbPlayCard: function (direction) {
    //     this.scheduleOnce(function () {
    //         var card = parseInt(Math.random() * 27 + 1);
    //         switch (direction) {
    //             case DIRECTION.DOWN:
    //                 this._rightUser.playCard(card);
    //                 break;
    //             case DIRECTION.RIGHT:
    //                 this._upUser.playCard(card);
    //                 break;
    //             case DIRECTION.UP:
    //                 this._leftUser.playCard(card);
    //                 break;
    //             case DIRECTION.LEFT:
    //                 break;
    //         }
    //     }, 1);
    // },
    onExit: function () {
        this._super();
    }
});
