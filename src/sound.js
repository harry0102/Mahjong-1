/**
 * Created by kale on 2016/11/18.
 */

var Sound = {
    silence: false,
    _eatEffect: 0,
    playBackgroundMusic: function () {
        if (!Sound.silence)
            cc.audioEngine.playMusic("res/sounds/background_1.mp3", true);
    },
    // playEat:function(){
    //     if(!Sound.silence)
    //     {
    //         //先停止之前播放的吃音效，否则会因为连续播放过多而报错
    //         if(Sound._eatEffect)
    //             cc.audioEngine.stopEffect(Sound._eatEffect);
    //         Sound._eatEffect = cc.audioEngine.playEffect("res/sounds/eat.mp3", false);
    //     }
    // },
    play: function (card, type) {
        //type:1-普通麻将2-吃碰
        if (!Sound.silence) {
            if (type == 1) {
                cc.log("播放麻将声音" + card);
                cc.audioEngine.playMusic("res/sounds/mjt" + card + ".mp3", false);
            } else if (type == 2) {
                cc.log("播放动作声音" + card);
                switch (card) {
                    case OpManager.CMD.CHI:
                        cc.audioEngine.playMusic("res/sounds/chi1.mp3", false);
                        break;
                    case OpManager.CMD.PLAYCARD:
                        cc.audioEngine.playMusic("res/sounds/chupai.mp3", false);
                        break;
                    case OpManager.CMD.GANG:
                        cc.audioEngine.playMusic("res/sounds/gang1.mp3", false);
                        break;
                    case OpManager.CMD.PENG:
                        cc.audioEngine.playMusic("res/sounds/peng1.mp3", false);
                        break;
                    case OpManager.CMD.HU:
                        cc.audioEngine.playMusic("res/sounds/hu1.mp3", false);
                        break;
                }
            }

        }
    },
    stop: function () {
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
    },
    setMusic: function (volume) {
        cc.audioEngine.setMusicVolume(volume);
    },
    setEffects: function (volume) {
        cc.audioEngine.setEffectsVolume(volume);
    },
    getMusic: function () {
        return cc.audioEngine.getMusicVolume();
    },
    getEffects: function () {
        return cc.audioEngine.getEffectsVolume();
    },
    toggleOnOff: function () {
        if (Sound.silence) {
            Sound.silence = false;
            cc.audioEngine.setEffectsVolume(1);
            cc.audioEngine.setMusicVolume(1);
        }
        else {
            Sound.silence = true;
            cc.audioEngine.setEffectsVolume(0);
            cc.audioEngine.setMusicVolume(0);
        }
    }
};
