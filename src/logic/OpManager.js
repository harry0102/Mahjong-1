/**
 * Created by foo on 2016/12/1.
 */



var OpManager = cc.Class.extend({

    connect: null,
    builder: null,
    _connected: null,
    _loginFinish: null,
    _builders: null,
    _roomScene: null,
    _prepareScene: null,
    // _listener:null,
    ctor: function () {
        // this.builder = dcodeIO.ProtoBuf.loadProtoFile("res/proto/PlayerModule.proto");
        // this._builders = {};
        this.connect = new ConnectManager();
        this.connect.bindListener(this._onMessage.bind(this));
    },
    connection: function (callback) {
        this.connect.connect().then(callback);
    },
    closeWebSocket: function () {
        this.connect.close();
    },
    login: function (userOpenId, userName, userIconUrl, userGender, callback) {
        this._loginFinish = callback;

        this.connect.sendMessage({
            module: OpManager.MODULE.LOGIN,
            cmd: OpManager.PLAYERCMD.WEIXINLOGIN,
            data: {wId: userOpenId, name: userName, face: userIconUrl, gender: userGender}
        }).then(function (data) {

            var d = eval("(" + data.data + ")");

            // cc.log("登陆成功。。。");
            // this._loginFinish && this._loginFinish(this.decode(OpManager.BUILD.USERRESPONSE, data.data));
            this._loginFinish && this._loginFinish(d);
        }.bind(this));
    },
    onError: function (evt) {

    },
    createRoom: function (rule, totalCount, playerNum, password, callback) {
        this.connect.sendMessage({
            module: OpManager.MODULE.PLAYER,
            cmd: OpManager.PLAYERCMD.CREATEROOM,
            data: {id: Game.user.id, rule: rule, totalCount: totalCount, playerNum: playerNum, password: password}
        }).then(function (data) {
            // if (data.stateCode == OpManager.STATECODE.ROOMCARD_NOT_ENOUGH) {
            //     cc.log("房卡不足");
            //     PopUp.show("您的房卡不足,请充值");
            // } else {
            cc.log("进入房间。。。");
            var d = eval("(" + data.data + ")");
            Game.players = d.player;
            callback && callback(data);
            // callback && callback(this.decode(OpManager.BUILD.ROOMRESPONSE, data.data));
            // }
        }.bind(this));
    },
    joinRoom: function (roomNum, password, callback) {
        var d = null;
        this.connect.sendMessage({
            module: OpManager.MODULE.PLAYER,
            cmd: OpManager.PLAYERCMD.INTOROOM,
            data: {id: Game.user.id, roomNum: roomNum, password: password}
        }).then(function (data) {
            // if (data.stateCode == OpManager.STATECODE.ROOMFUlL) {
            //     cc.log("房间已满或该用户已进入");
            //     callback && callback(data);
            // } else {
            //     cc.log("进入房间。。。");
            //     // var d = eval("("+data.data+")");
            //
            //     // callback && callback(this.decode(OpManager.BUILD.ROOMRESPONSE, data.data));
            // }
            d = eval("(" + data.data + ")");
            // this._roomScene.intoRoom(d);
            if (d != null) {
                Game.players = d.player;
            }
            // cc.director.getRunningScene().intoRoom(d);
            callback && callback(data);
        }.bind(this));
        // this._roomScene.intoRoom(d);
    },
    outRoom: function (callback) {
        //退出房间
        this.connect.sendMessage({
            module: OpManager.MODULE.PLAYER,
            cmd: OpManager.PLAYERCMD.OUTROOM,
            data: {id: Game.user.id, roomId: Game.roomId}
        }).then(function (data) {
            if (data.stateCode == OpManager.STATECODE.ROOMFUlL) {
                cc.log("房间已满或该用户已进入");
            } else {
                cc.log("进入房间。。。");
                var d = eval("(" + data.data + ")");
                callback && callback(d);
                // callback && callback(this.decode(OpManager.BUILD.ROOMRESPONSE, data.data));
            }
        }.bind(this));
    },
    releaseRoom: function (dissolution, callback) {
        //解散房间
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.DISSOLUTION,
            data: {id: Game.user.id, roomId: Game.roomId, dissolution: dissolution}
        }).then(function (data) {
            var d = eval("(" + data.data + ")");
            callback && callback(d);
            // callback && callback(this.decode(OpManager.BUILD.ROOMRESPONSE, data.data));

        }.bind(this));
    },
    bindRoom: function (scene) {
        this._roomScene = scene;
    },
    unbindRoom: function () {
        this._roomScene = null;
    },
    bindPrepareScene: function (scene) {
        this._prepareScene = scene;
    },
    unbindPrepareRoom: function () {
        this._prepareScene = null;
    },
    playCard: function (card) {
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.PLAYCARD,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                outCard: card
            }
        }).then(function (data) {
            cc.log("出牌完成！！！！");
            cc.log(data);
        });
    },
    roomInfo: function () {
        this.connect.sendMessage({
            module: OpManager.MODULE.PLAYER,
            cmd: OpManager.PLAYERCMD.ROOMINFO,
            data: {
                roomId: Game.roomId
            }
        }).then(function (data) {
            cc.log("获取房间信息完成！！！！");
            var d = eval("(" + data.data + ")");
            cc.log("庄位置" + d.banker);
            Game.op._roomScene.roomInfo(d);
        });
    },
    roomInfo1: function () {
        this.connect.sendMessage({
            module: OpManager.MODULE.PLAYER,
            cmd: OpManager.PLAYERCMD.ROOMINFO1,
            data: {
                id: Game.user.id,
                roomId: Game.roomId
            }
        }).then(function (data) {
            cc.log("获取房间信息完成！！！！");
            var d = eval("(" + data.data + ")");
            cc.log("庄位置" + d.banker);
            Game.op._roomScene.roomInfo(d);
        });
    },
    pengCard: function (card) {
        cc.log("connect peng" + card);
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.PENG,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                card: card
            }
        }).then(function (data) {
            cc.log("碰牌完成！！！！");
            cc.log(data);
        });
    },
    passCard: function () {
        cc.log("pass");
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.PASS,
            data: {
                id: Game.user.id,
                roomId: Game.roomId
            }
        }).then(function (data) {
            cc.log("pass完成！！！！");
            cc.log(data);
        });
    },
    chiCard: function (card) {
        card = card.split("|");
        cc.log("connect chi" + card);
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.CHI,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                card: card
            }
        }).then(function (data) {
            cc.log("吃牌完成！！！！");
            cc.log(data);
        });
    },
    tingCard: function (card) {
        cc.log("connect chi" + card);
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.TING,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                card: card
            }
        }).then(function (data) {
            cc.log("听牌完成！！！！");
            cc.log(data);
        });
    },
    tingCard1: function () {
        cc.log("connect chi");
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.TING,
            data: {
                id: Game.user.id,
                roomId: Game.roomId
            }
        }).then(function (data) {
            cc.log("听牌完成！！！！");
            cc.log(data);
        });
    },
    baoCard: function () {
        cc.log("connect chi");
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.BAO,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
            }
        }).then(function (data) {
            cc.log("获取宝牌完成！！！！");
            cc.log(data);
        });
    },
    chiTingCard: function (card, outCard) {
        cc.log("发送前" + Game.op._roomScene.players[0].disableTouchEvent);
        // card=card.split("|");
        cc.log("connect chiting" + card);
        // outCard=parseInt(outCard);
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.CHITING,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                outCard: outCard,
                card: card
            }
        }).then(function (data) {
            cc.log("吃听完成！！！！");
            cc.log(data);
        });
    },
    pengTingCard: function (card, outCard) {
        // card = card.split("|");
        cc.log("connect pengtingi" + card);
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.PENGTING,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                outCard: outCard,
                card: card
            }
        }).then(function (data) {
            cc.log("碰听完成！！！！");
            cc.log(data);
        });
    },
    gangCard: function (card) {
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.GANG,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                card: card
            }
        }).then(function (data) {
            cc.log("杠牌完成！！！！");
            cc.log(data);
        });
    },
    angangCard: function (card) {
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.ANGANG,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                card: card
            }
        }).then(function (data) {
            cc.log("暗杠牌完成！！！！");
            cc.log(data);
        });
    },
    huCard: function (card) {
        this.connect.sendMessage({
            module: OpManager.MODULE.CARD,
            cmd: OpManager.CMD.HU,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                card: card
            }
        }).then(function (data) {
            cc.log("胡牌完成！！！！");
            cc.log(data);
        });
    },
    ready: function (roomId, callback) {
        this.connect.sendMessage({
            module: OpManager.MODULE.PLAYER,
            cmd: OpManager.PLAYERCMD.READY,
            data: {
                id: Game.user.id,
                roomId: roomId
            }
        }).then(function (data) {
            var d = eval("(" + data.data + ")");
            callback && callback(d);
            // callback && callback(this.decode(OpManager.BUILD.ROOMRESPONSE, data.data));
        }.bind(this));
    },
    _onMessage: function (data) {
        var d = eval("(" + data.data + ")");
        switch (data.cmd) {
            case OpManager.CMD.DEALCARD:
                this._roomScene.dealCard(d);
                cc.log(data);
                break;
            case OpManager.CMD.DRAWCARD:
                this._roomScene.drawCard(d);
                cc.log(data);
                break;
            case OpManager.CMD.PLAYCARD:
                this._roomScene.playCard(d);
                cc.log("收到打牌消息");
                cc.log(data);
                break;
            case OpManager.CMD.AUTOPLAYCARD:
                this._roomScene.autoPlayCard(d);
                cc.log("autoplaycard");
                cc.log(data);
                break;
            case OpManager.CMD.TIP:
                cc.log("---------------------收到提示--------------");
                cc.log(d);
                cc.log(data);

                this._roomScene.tipCard(d);
                break;
            case OpManager.CMD.READYCHUPAI:
                //准备出牌
                this._roomScene.readyCard(d);
                cc.log("---------------------canchupai--------------" + d);
                break;
            case OpManager.CMD.PENG:
                cc.log("---------------------收到碰牌消息--------------" + d);
                //碰
                this._roomScene.pengCard(d);
                break;
            case OpManager.CMD.GANG:
                //杠
                this._roomScene.gangCard(d);
                cc.log("---------------------收到杠牌消息--------------" + d);
                break;
            case OpManager.CMD.ANGANG:
                //杠
                this._roomScene.annGangCard(d);
                cc.log("---------------------收到暗杠消息--------------" + d);
                break;
            case OpManager.CMD.CHI:
                cc.log("---------------------收到吃牌消息--------------" + d);
                //吃
                this._roomScene.chiCard(d);
                break;
            case OpManager.CMD.CHITING:
                cc.log("---------------------收到吃听消息--------------" + d);
                //吃
                this._roomScene.chiTingCard(d);
                break;
            case OpManager.CMD.TING:
                cc.log("---------------------收到听消息--------------" + d);
                //吃
                this._roomScene.tingCard(d);
                break;
            case OpManager.CMD.CAISHEN:
                cc.log("---------------------收到获取财神消息--------------" + d);
                //吃
                this._roomScene.caishenCard(d);
                break;
            case OpManager.CMD.BAO:
                cc.log("---------------------收到宝牌消息--------------" + d);
                //吃
                this._roomScene.baoCard(d);
                break;
            case OpManager.CMD.PENGTING:
                cc.log("---------------------收到碰听消息--------------" + d);
                //吃
                this._roomScene.pengTingCard(d);
                break;
            case OpManager.CMD.INTOROOM:
                //进入房间
                cc.log("收到进入房间消息");
                this._roomScene.intoRoom(d);
                break;
            case OpManager.CMD.OUTROOM:
                //进入房间
                cc.log("---------------------收到退出房间消息---------------------");
                this._roomScene.intoRoom(d);
                break;
            case OpManager.CMD.READY:
                cc.log("进入房间准备消息：----------------");
                cc.log(d);
                for (var i = 0; i < Game.userData.player.length; i++) {
                    if (d.player[0].position == Game.userData.player[i].position) {
                        Game.userData.player[i].state = 1;
                    }
                }
                this._roomScene.prepareRoom(d);
                break;
            case OpManager.CMD.SHOWCARDS:
                // this._roomScene.huCard(d);
                this._roomScene.huCard(d);
                cc.log("---------------------收到胡牌消息----------------");
                cc.log(d);
                break;
            case OpManager.CMD.GAMEOVER:
                // this._roomScene.huCard(d);
                cc.log("---------------------收到游戏结束消息----------------");
                this._roomScene.overGame(d);
                break;
            case OpManager.CMD.CANANGANG:
                this._roomScene.canAnGangCard(d);
                break;
            case OpManager.CMD.END:
                this._roomScene.end(d);
                break;
            case OpManager.CMD.DISSOLUTION:
                cc.log(d);
                cc.log("---------------------收到解散房间消息---------------------");
                this._roomScene.releaseRoom(d);
                break;
            case OpManager.CMD.ROOMINFO:
                cc.log(d);
                cc.log("---------------------收到获取房间房间消息---------------------");
                this._roomScene.roomInfo(d);
                break;
            case OpManager.CMD.OUT:
                cc.log(d);
                cc.log("---------------------收到掉线或退出房间消息---------------------");
                this._roomScene.loadOutInfo(d);
                break;
            case OpManager.CMD.RECONNECT:
                cc.log(d);
                cc.log("---------------------收到断线重连消息---------------------");
                // this.reconnect(d);
                break;
            case OpManager.CMD.ROOMINFO1:
                cc.log(d);
                cc.log("---------------------收到房间信息消息---------------------");
                this._roomScene.intoRoom(d);
                this._roomScene._UILayer.restrtGame();
                break;
            case OpManager.CMD.ONLINE:
                cc.log(d);
                cc.log("---------------------收到重新上线消息---------------------");
                if (d.id != Game.user.id) {
                    this._roomScene.loadInInfo(d.id);
                }
                break;

        }
        cc.log("---------------------收到消息---------------------");
        cc.log(d);
    },
    decode: function (build, data) {
        if (!this._builders[build]) {
            this._builders[build] = this.builder.build(build);
        }
        return this._builders[build].decode(dcodeIO.ByteBuffer.fromBase64(data));
    },
    getMsg: function (responseId) {
        return this.connect._msgs[responseId];
    },
    reconnect: function (data) {
        Game.roomNum = data.roomNum;
        Game.playerNum = data.playerNum;
        if (Game.playerNum == 4) {
            Game.roundNum = data.round;
        } else {
            Game.roundNum = data.totalCount;
        }
        if (data.rule != null) {
            Game.roomInfo = data.rule;
        } else {
            Game.roomInfo = "";
        }
        Game.host = 1;
        Game.roomId = data.roomId;
        var _players = data.players;
        for (var i = 0; i < _players.length; i++) {
            if (_players[i].playerId == Game.user.id) {
                Game.userPosition = _players[i].position;
            }
        }
        Cocos2dxBridge.joinChatRoom(Game.roomNum);
        Utils.runScene(new GameScene(data));

    }
});


OpManager.BUILD = {
    ROOMRESPONSE: "RoomResponse",
    USERRESPONSE: "UserResponse",
    ROOMOPERATIONINFORESPONSE: "RoomOperationInfoResponse"
};

OpManager.CMD = {
    /**
     * 微信登录
     */
    WEIXINLOGIN: 1,
    /**
     * 进入房间
     */
    INTOROOM: 2,
    /**
     * 创建房间
     */
    CREATEROOM: 3,
    /**
     * 准备
     */
    READY: 4,
    /**
     * 发牌
     */
    DEALCARD: 5,
    /**
     * 退出房间
     */
    OUTROOM: 6,
    /**
     * 获取财神
     */
    CAISHEN: 7,
    /**
     * 准备出牌
     */
    READYCHUPAI: 10,
    /**
     * 出牌
     */
    PLAYCARD: 11,
    /**
     * 抓牌
     */
    DRAWCARD: 12,
    /**
     * 强制出牌
     */
    AUTOPLAYCARD: 13,
    /**
     * 碰
     */
    PENG: 14,
    /**
     * 吃
     */
    CHI: 15,
    /**
     * 杠
     */
    GANG: 16,
    /**
     * 不碰
     */
    ANGANG: 17,
    /**
     * 不吃
     */
    PASS: 18,
    /**
     * 听
     */
    TING: 19,
    /**
     * 宝牌
     */
    BAO: 20,
    /**
     * 断线重连
     */
    RECONNECT: 99,
    /**
     * 碰听
     */
    PENGTING: 101,
    /**
     * 吃听
     */
    CHITING: 102,
    /**
     * 不听
     */
    NOTING: 103,
    /**
     * 不碰听
     */
    NOPENGTING: 104,
    /**
     * 不吃听
     */
    NOCHITING: 105,
    /**
     * 胡
     */
    HU: 106,
    /**
     * 胡
     */
    END: 107,
    /**
     * 所有牌
     */
    SHOWCARDS: 108,
    /**
     * 房间使用完毕
     */
    GAMEOVER: 109,


    /**
     * 提示
     */
    TIP: 21,
    /**
     * 可以吃
     */
    CANEAT: 22,
    /**
     * 可以胡
     */
    CANWIN: 23,
    /**
     * 可以吃听
     */
    CANCHITING: 24,
    /**
     * 可以碰听
     */
    CANPENGTING: 25,

    /**
     * 可以暗杠
     */
    CANANGANG: 26,

    /**
     * 退出
     */
    OUT: 0,
    /**
     * 解散
     */
    DISSOLUTION: 31,

    /**
     * 房间信息
     */
    ROOMINFO: 200,
    /**
     *
     * */
    ROOMINFO1: 98,
    /**
     * online
     */
    ONLINE: 97,
};

OpManager.PLAYERCMD = {
    /**
     * 微信登录
     */
    WEIXINLOGIN: 1,

    /**
     * 进入房间
     */
    INTOROOM: 2,

    /**
     * 创建房间
     */
    CREATEROOM: 3,

    /**
     * 准备
     */
    READY: 4,

    /**
     * 发牌
     */
    SENDCARD: 5,

    /**
     * 退出房间
     */
    OUTROOM: 6,

    /**
     * 出牌
     */
    CHUPAI: 11,

    /**
     * 抓牌
     */
    ZHUAPAI: 12,

    /**
     * 配置
     */
    CONFIG: 13,

    /**
     * 房间信息
     */
    ROOMINFO: 200,
    /**
     *
     * */
    ROOMINFO1: 98,
    /**
     * 退出
     */
    OUT: 0
};

OpManager.MODULE = {
    /**
     * 登陆
     */
    LOGIN: 1,
    /**
     * 用户
     */
    PLAYER: 2,
    /**
     * CARD
     */
    CARD: 3
};


OpManager.STATECODE = {
    /**
     * 成功
     */
    SUCCESS: 0,
    /**
     * 找不到命令
     */
    NO_INVOKER: 1,
    /**
     * 参数异常
     */
    AGRUMENT_ERROR: 2,
    /**
     * 未知异常
     */
    UNKOWN_EXCEPTION: 3,
    /**
     * 玩家名或密码不能为空
     */
    PLAYERNAME_NULL: 4,
    /**
     * 玩家名已使用
     */
    PLAYER_EXIST: 5,
    /**
     * 玩家不存在
     */
    PLAYER_NO_EXIST: 6,
    /**
     * 未找到房间
     */
    ROOM_UNDEFIND: 7,
    /**
     * 您已登录
     */
    HAS_LOGIN: 8,
    /**
     * 登录失败
     */
    LOGIN_FAIL: 9,
    /**
     * 玩家不在线
     */
    PLAYER_NO_ONLINE: 10,
    /**
     * 请先登录
     */
    LOGIN_PLEASE: 11,
    /**
     * 房间已满或该用户已进入
     */
    ROOMFUlL: 12,
    /**
     * 未准备
     */
    UNREADY: 13,
    /**
     * 房卡不足
     */
    ROOMCARD_NOT_ENOUGH: 15,
    /**
     * 咩有密码
     */
    ERROR_PASSWORD: 18,
};

OpManager.TIPTYPE = {
    CANPENGPAI: 21,//提示是否碰的时候  返回给玩家的牌的类型
    CANCHIPAI: 22,//提示是否吃的时候  返回给玩家的牌的类型
    CANANGANG: 23,//提示是否暗杠的时候  返回给玩家的牌的类型
    CANMINGGANG: 24,//提示是否明杠的时候  返回给玩家的牌的类型
    CANHU: 25, //胡
    CANPENGTING: 26,//提示是否碰听的时候  返回给玩家的牌的类型
    CANTING: 27,////提示是否听的时候  返回给玩家的牌的类型
    CANCHITING: 28,//提示是否吃听的时候  返回给玩家的牌的类型
    CANMINGGANG2: 29,//在抓牌时，提示明杠
    YAOCHUDEPAI: 31,//要出的牌
};

OpManager.CARDTYPE = {
    SHOUPAI: 0,
    PENGPAI: 11,
    CHIPAI: 12,
    ANGANG: 13,
    MINGGANG: 14,
    YICHUPAI: 15,
    UNUSEPAI: 16,
    OUT: 31,
    IN: 32,
    BEPENG: 51,
    BEMINGGANG: 52,
    BECHI: 53,
    BEHU: 54,
    BEMINGGANG2: 55
};
OpManager.RULETYPE = {
    BUJIA: 1,
    SANQIJIA: 2,
    XIANDA: 3,
    LOU: 4,
    FENG: 5,
    FEI: 6,
};
OpManager.ROOMSTATE = {
//0:准备，1：开始，2：结束，3：申请解散，4：解散
    READY: 0,
    START: 1,
    FINISH: 2,
    PRERELEASE: 3,
    RELEASE: 4,
};


Game.op = new OpManager();