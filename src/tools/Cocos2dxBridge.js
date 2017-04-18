/**
 * Created by Wasu on 17/1/19.
 */

var Cocos2dxBridge = {
    //获取token
    initToken: function (token) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "initToken", "(Ljava/lang/String;)V", token);
        }
    },
    //加入聊天室
    joinChatRoom: function (roomNum) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "joinChatRoom", "(Ljava/lang/String;)V", roomNum + "");
        }
    },
    startVoice: function (userID) {
        //开始语音
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "startVoice", "(I)V", userID);
        }
    },
    endVoice: function (userID) {
        //结束录音
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "endVoice", "(I)V", userID);
        }

    },
    //退出聊天室
    quitChatRoom: function (roomNum) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "quitChatRoom", "(Ljava/lang/String;)V", roomNum + "");
        }
    },
    //发送文字及表情
    //type:1文字2表情
    sendTextMessage: function (msg, roomNum) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "sendTextMessage", "(Ljava/lang/String;Ljava/lang/String;)V", msg + "", roomNum + "");
        }
    },
    //退出提示框
    showAlertDialog: function () {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showAlertDialog", "()V");
        }
    },
    //获取手机IMEI
    getIMEI: function () {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getIMEI", "()Ljava/lang/String;");
            cc.log("!!!!!!!!!!!!!!!!!获取手机IMEI!!!!!!!!!!!!!!!!!!!!" + ret)
        }
    },
    //微信登录
    login: function () {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "login", "()V");
            cc.log("!!!!!!!!!!!!!!微信登录!!!!!!!!!!!!!!!!!!!!!!!" + ret)
        }
    },
    //邀请微信好友
    inivteWX: function (roomNum, round, rules) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "inviteWX", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", roomNum + "", round + "", rules + "");
            cc.log("!!!!!!!!!!!!!!!!!!邀请微信好友!!!!!!!!!!!!!!!!!" + ret)
        }
    },
    //分享战绩
    share: function (type) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "share", "(I)V",type);
            cc.log("!!!!!!!!!!!!!!!!!分享!!!!!!!!!!!!!!!!!" + ret)
        }
    },
    //取消授权
    deleteOauthVerify: function () {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "noOauthVerify", "()V");
            cc.log("!!!!!!!!!!!!!!!!!取消授权!!!!!!!!!!!!!!!!!" + ret)
        }
    }
};