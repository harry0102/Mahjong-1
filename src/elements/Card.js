/**
 * Created by foo on 2016/11/15.
 */

var Card = cc.Sprite.extend({
    id: 0,
    type: null,
    touchFlag :true,
    ctor: function (id, type) {
        this._super("#" + type + id + ".png");
        this.id = id;
        this.type = type;
        // if(type==Card.TYPE.HAND_UP.prefix){
        //     this.setScale(0.5);
        // }
        return true;
    },
    setTouchFlag:function(bool){
        this.touchFlag = bool;
    },
    /**
     * call by cc.pool.getFromPool
     * @param type int
     */
    reuse: function (id, type) {
        debugger
        this.setSpriteFrame(type + id + ".png");
        // if(type==Card.TYPE.HAND_UP.prefix){
        //     this.setScale(0.5);
        // }

        this.id = id;
        this.type = type;
    },
    unuse: function () {
        this.retain();          //jsb必须加这句
    }
});

Card.create = function (id, type) {
    if (cc.pool.hasObject(Card)) {
        return cc.pool.getFromPool(Card, id, type);
    }
    else {
        return new Card(id, type);
    }
};


Card.TYPE = {
    DESK_RIGHT_SMALL: {prefix: "yx_", offset: {width: 40, height: 28}},//40,37
    DESK_LEFT_SMALL: {prefix: "zx_", offset: {width: 40, height: 28}}, //40,37
    DESK_DOWN_SMALL: {prefix: "szx_", offset: {width: 50, height: 47}}, //33,47
    DESK_UP_SMALL: {prefix: "sfx_", offset: {width: 33, height: 47}},  //33,47

    HAND_DOWN: {prefix: "x_", offset: {width: 66, height: 94}},   //66,94
    HAND_UP: {prefix: "bx", offset: {width: 66, height: 94},scale:0.5},   //66,94
    HAND_RIGHT: {prefix: "by", offset: {width: 16, height: 21}, scale: 1.5},
    HAND_LEFT: {prefix: "bz", offset: {width: 16, height: 21}, scale: 1.5},

    SELF_WIN: {prefix: "sz_"},         //66,94
    DESK_BACK_RIGHT: {prefix: ""},
    DESK_BACK_UP: {prefix: "bx"},
    DESK_BACK_DOWN: {prefix: ""},

    MAP_RIGHT: {prefix: "mr_", offset: {width: 35, height: 26}},//40,37
    MAP_LEFT: {prefix: "ml_", offset: {width: 35, height: 26}}, //40,37
    MAP_UP: {prefix: "mm_", offset: {width: 51, height: 70}}, //33,47
    MAP_DOWN: {prefix: "mm_", offset: {width: 51, height: 70},scale:0.5},  //33,47

    MAP_DESK_RIGHT:{prefix: "md_r_", offset: {width: 35, height: 26}},//40,37
    MAP_DESK_LEFT:{prefix: "md_l_", offset: {width: 35, height: 26}},//40,37
    MAP_DESK_UP:{prefix: "md_m_", offset: {width: 35, height: 26}},//40,37
    MAP_DESK_DOWN:{prefix: "md_m_", offset: {width: 35, height: 26}},//40,37

    ORIGIN_RIGHT_HAND: {prefix: "mr_o_hand", offset: {width: 29, height: 26}},//29,64
    ORIGIN_LEFT_HAND: {prefix: "ml_o_hand", offset: {width: 29, height: 26}}, //29,64
    ORIGIN_UP_HAND: {prefix: "mm_o_hand_up", offset: {width: 40, height: 61},scale:0.5}, //33,47
    ORIGIN_DOWN_HAND: {prefix: "mm_o_hand_down", offset: {width: 67, height: 112},scale:1.11},  //33,47

    ORIGIN_RIGHT_DESK: {prefix: "ml_o_desk", offset: {width: 52, height: 43}},//40,37
    ORIGIN_LEFT_DESK: {prefix: "ml_o_desk", offset: {width: 52, height: 43}}, //40,37
    ORIGIN_UP_DESK: {prefix: "mm_o_desk", offset: {width: 36, height: 53}}, //33,47
    ORIGIN_DOWN_DESK: {prefix: "mm_o_desk", offset: {width: 36, height: 53}},  //33,47

    ORIGIN_HORIZON_DESK:{prefix: "md_o_horizon", offset: {width: 35, height: 26}},//40,37
    ORIGIN_VERTICAL_DESK:{prefix: "md_o_vertical", offset: {width: 35, height: 26}}//40,37


};

Card.POSITION = {
    DESK: 0,
    HAND: 1,
    BACK: 2
};


// Card.get = function (card) {
//     var ct = null;
//     switch (this._direction) {
//         case DIRECTION.DOWN:
//             ct = Card.TYPE.HAND_DOWN;
//             break;
//         case DIRECTION.RIGHT:
//             ct = Card.TYPE.HAND_RIGHT;
//             break;
//         case DIRECTION.UP:
//             ct = Card.TYPE.HAND_UP;
//             break;
//         case DIRECTION.LEFT:
//             ct = Card.TYPE.HAND_LEFT;
//             break;
//     }
//     return new Card(card, ct);
// }
//

// Card.offset= function () {
//
//
// };

