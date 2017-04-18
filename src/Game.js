/**
 * Created by foo on 2016/11/30.
 */



var Game = {

    server: "ws://10.88.33.128:8088/websocket",
    // server:"ws://10.88.33.128:8088/websocket",

    // server: "ws://125.210.141.30:8088/websocket",
    // server:"ws://127.0.0.1:8088/websocket",
    // server:"ws://192.168.0.112:8088/websocket",
    // server:"ws://192.168.0.160:8088/websocket",
    // server: "ws://xdsfoo.gicp.net:8088/websocket",

    user: null,

    gameRoom: null,

    connect: null,

    op: null,

    roomId: "1",

    userPosition: null,

    roomInfo: null,

    host: null,

    roomNum: "1",

    players: null,

    userData: null,

    tingState: 0,

    playerNum: "",

    roundNum: "",

    cardData: "",

    isOver: false,

    canTouch: false,

    userName: null,

    userOpenId: null,

    userGender: null,

    userIconUrl: null


};

Game.setUser = function (user) {
    window.localStorage && window.localStorage.setItem("user", JSON.stringify(Game.user = user));
};

Game.getUser = function () {
    if (!Game.user && window.localStorage) {
        try {
            Game.user = JSON.parse(window.localStorage.getItem("user"));
        } catch (ex) {
        }
    }
    return Game.user;
};


Game.getUdid = function () {

    // return "918";
    var udid;
    // if (window.localStorage) {
    //     udid = localStorage.getItem("udid");
    // }
    if (!udid) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            if (IMEI != null) {
                udid = IMEI;
                // udid=142142+"";
            }


        } else {
            udid = 'xxxxxx'.replace(/[x]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
            window.localStorage && localStorage.setItem("udid", udid);
        }


    }
    cc.log("udid:" + udid);
    return udid;
};

Game.setServer = function (server) {
    // sys.localStorage.setItem("game.server" ,string);
};


// (function () {
//     if (window.localStorage) {
//         try {
//             Game.user = JSON.parse(window.localStorage.getItem("user"));
//         } catch (ex) {
//         }
//     }
// })();
