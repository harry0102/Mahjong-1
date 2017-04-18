/**
 * Created by Wasu on 17/2/8.
 */


var head_up_voice, head_down_voice, head_left_voice, head_right_voice;

function setHeadVoice(id) {
    cc.log(id);
    for (var i = 0; i < Game.players.length; i++) {
        if (id == Game.players[i].id) {
            switch (DIRECTION.positionToDirection(Game.players[i].position)) {
                case DIRECTION.UP:
                    head_up_voice.setVisible(true);
                    break;
                case DIRECTION.DOWN:
                    head_down_voice.setVisible(true);
                    break;
                case DIRECTION.LEFT:
                    head_left_voice.setVisible(true);
                    break;
                case DIRECTION.RIGHT:
                    head_right_voice.setVisible(true);
                    break;
            }
        }
    }

}
function cancelHeadVoice(id) {
    for (var i = 0; i < Game.players.length; i++) {
        if (id == Game.players[i].id) {
            switch (DIRECTION.positionToDirection(Game.players[i].position)) {
                case DIRECTION.UP:
                    head_up_voice.setVisible(false);
                    break;
                case DIRECTION.DOWN:
                    head_down_voice.setVisible(false);
                    break;
                case DIRECTION.LEFT:
                    head_left_voice.setVisible(false);
                    break;
                case DIRECTION.RIGHT:
                    head_right_voice.setVisible(false);
                    break;
            }
        }
    }
}
function ShowMessage(msg, id, type) {
    cc.log("id:" + id);
    cc.log("text:" + msg);
    cc.log("type:" + type);
    var message = decodeURI(msg);
    if (type == 2) {
        Game.op._roomScene._UILayer.showFace1(id, message)
    } else {
        Game.op._roomScene._UILayer.showmessage1(id, message);
    }
}

var IMEI;
function setUser(openid, name, iconUrl, gender) {
    Game.userOpenId = decodeURI(openid);
    Game.userName = decodeURI(name);
    Game.userIconUrl = iconUrl;
    Game.userGender = decodeURI(gender);
    Utils.runScene(new MenuScene());
    cc.log("登录信息------------：" + Game.userOpenId + "--" + Game.userName + "--" + Game.userIconUrl + "--" + Game.userGender)
}

