/**
 * Created by kale on 2016/11/15.
 */

var GameBackgroundLayer = cc.Layer.extend({

    _bg1: null,
    _table: null,
    _point: null,
    _numLabel: null,
    _shi: null,
    _ge: null,
    speed: 5,
    timeFlag: 9,
    times: 0,
    numFlag: 0,
    innerFlag: 0,
    _pointNum: 0,

    ctor: function () {
        this._super();
        this.times = 0;
        // this.numFlag=10;

        var winSize = cc.director.getWinSize();
        this._bg1 = new cc.Sprite(res.bg_full_1_png);
        this._bg1.x = winSize.width / 2;
        this._bg1.y = winSize.height / 2;
        this.addChild(this._bg1);

        //加载桌子
        // this.loadTable();

        //加载点
        // this.loadPoint();

        //加载倒计时
        // this._numLabel=new cc.LabelTTF(10,"Arial",32,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._numLabel.setPositionX(this.width/2);
        // this._numLabel.setPositionY(this.height/2);
        // this.addChild(this._numLabel,10);
        // this._numLabel.setVisible(false);

        return true;
    },
    loadTable: function () {
        var action = null;
        this._table = new cc.Sprite(res.b_1_jpg);
        this._table.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        switch (Game.userPosition || DIRECTION.DOWN) {
            case DIRECTION.UP:
                //上
                action = cc.rotateTo(0.5, 180);
                break;
            case DIRECTION.DOWN:
                //下
                action = cc.delayTime(0.5);
                break;
            case DIRECTION.LEFT:
                //左
                action = cc.rotateTo(0.5, 90);
                break;
            case DIRECTION.RIGHT:
                //右
                action = cc.rotateTo(0.5, -90);
                break;

        }
        this.addChild(this._table);
        this._table.runAction(action);
    },
    loadItems: function () {
        this._table = new cc.Sprite("#pic_table.png");
        // this._table.setAnchorPoint(0.5, 0.5);
        this._table.setPosition(cc.p(cc.winSize.width / 2, 380));
        this.addChild(this._table);

        this._point = new cc.Sprite("#pic_table_back.png");
        // this._point.setAnchorPoint(0.5, 0.5);
        this._point.setPosition(this._table.width / 2, this._table.height / 2);
        this._table.addChild(this._point);
        // var _blink = cc.blink(50, 50);
        // var rotato=cc.rotateTo(0.5,180);
        // this._turntable_lightning.flash();
        // this._point.runAction(_blink);

        this._shi = new cc.Sprite("#ng_8.png");
        this._table.addChild(this._shi);
        this._shi.setPosition(57, 65);

        this._ge = new cc.Sprite("#ng_8.png");
        this._table.addChild(this._ge);
        this._ge.setPosition(73, 65);

        var delt = null;
        switch (Game.userPosition || DIRECTION.DOWN) {
            case DIRECTION.UP:
                //上
                delt = 180;
                break;
            case DIRECTION.DOWN:
                //下
                delt = 0;
                break;
            case DIRECTION.LEFT:
                //左
                delt = 90;
                break;
            case DIRECTION.RIGHT:
                //右
                delt = 270;
                break;

        }

        if (Game.playerNum == 4) {
            for (var index = 0; index < 4; index++) {
                var _label = new cc.Sprite("#icon_green_" + index + ".png");
                _label.setAnchorPoint(0.5, 2.5);
                _label.setPosition(this._table.width / 2, this._table.height / 2);
                _label.setRotation(delt + index * 90);
                // this._turntable_textLabels[index] = _label;
                this._table.addChild(_label);
            }
        }
    },

    loadCount: function (num) {
        this.numFlag = num;
        if (num <= 3) {
            this._shi.setSpriteFrame("nr_" + parseInt(num / 10) + ".png");
            this._ge.setSpriteFrame("nr_" + parseInt(num % 10) + ".png");
        } else {
            this._shi.setSpriteFrame("ng_" + parseInt(num / 10) + ".png");
            this._ge.setSpriteFrame("ng_" + parseInt(num % 10) + ".png");
        }
        this.scheduleUpdate();
    },
    // stopCount:function () {
    //   this._numLabel.setVisible(false);
    // },
    loadPoint: function () {
        this._point = new cc.Sprite(res.point_png);
        this._point.setPosition(640, 260);
        this.addChild(this._point);
        this.scheduleUpdate();
    },
    closePoint: function () {
        this.removeChild(this._point);
    },
    changeStatus: function (position) {
        // if(this._point==null){
        //     // this.loadPoint();
        //     this._numLabel.setVisible(true);
        // }

        var delt = null;
        switch (DIRECTION.positionToDirection(position || DIRECTION.DOWN)) {
            case DIRECTION.UP:
                //上 90
                delt = 90;
                break;
            case DIRECTION.DOWN:
                //下 270
                delt = 270;
                break;
            case DIRECTION.LEFT:
                //左 0
                delt = 0;
                break;
            case DIRECTION.RIGHT:
                //右 180
                delt = 180;
                break;
        }
        this._point.setRotation(delt);


        this.numFlag = 10;
        // this._numLabel.setString(10);
        // this._numLabel.setVisible(true);
    },
    closeCount: function () {
        this.removeChild(this.count);
    },
    update: function (dt) {
        if ((this.times++ > 60) && (this.numFlag > 0)) {
            this.numFlag--;
            this.times = 0;
            if (this.numFlag <= 3) {
                this._shi.setSpriteFrame("nr_" + parseInt(this.numFlag / 10) + ".png");
                this._ge.setSpriteFrame("nr_" + parseInt(this.numFlag % 10) + ".png");
            } else {
                this._shi.setSpriteFrame("ng_" + parseInt(this.numFlag / 10) + ".png");
                this._ge.setSpriteFrame("ng_" + parseInt(this.numFlag % 10) + ".png");
            }

        }
        this._pointNum++;
        if (this._pointNum > 60) {
            this._pointNum = 0;
            this._point.setOpacity(255);
        } else if (this._pointNum > 30) {
            this._point.setOpacity(255 - 8 * (this._pointNum - 30));
        }
    },


});

