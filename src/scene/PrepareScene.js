/**
 * Created by kale on 2016/12/23.
 */
var PrepareScene = cc.Scene.extend({
    _bg1:null,
    _prepare:null,
    _create:null,
    _head_up:null,
    _head_down:null,
    _head_left:null,
    _head_right:null,
    _back:null,
    _head_up_connfirm:null,
    _recorder:null,
    _players:[],

    ctor:function () {
        this._super();

        this._bg1 = new cc.Sprite(res.back_1_jpg);
        this._bg1.x = cc.winSize.width / 2;
        this._bg1.y = cc.winSize.height / 2;
        this.addChild(this._bg1);

        this._prepare=new cc.Sprite(res.icon_prepare_png);
        this.addChild(this._prepare);
        this._prepare.setPosition(cc.p(800,150));

        this._create=new cc.Sprite(res.icon_create_png);
        this.addChild(this._create);
        this._create.setPosition(cc.p(1100,150));

        this._head_up=new cc.Sprite(res.icon_head_png);
        this.addChild(this._head_up);
        this._head_up.setPosition(cc.p(650,600));

        this._head_down=new cc.Sprite(res.icon_head_png);
        this.addChild(this._head_down);
        this._head_down.setPosition(cc.p(650,150));

        this._head_left=new cc.Sprite(res.icon_head_png);
        this.addChild(this._head_left);
        this._head_left.setPosition(cc.p(300,360));

        this._head_right=new cc.Sprite(res.icon_head_png);
        this.addChild(this._head_right);
        this._head_right.setPosition(cc.p(1000,360));

        this._back=new cc.Sprite(res.icon_back_png);
        this.addChild(this._back);
        this._back.setPosition(cc.p(80,650));

        this._head_up_connfirm=new cc.Sprite(res.icon_confirm_png);
        this.addChild(this._head_up_connfirm);
        this._head_up_connfirm.x=this._head_up.x+this._head_up.width/2;
        this._head_up_connfirm.y=this._head_up.y+this._head_up.height/2;

        this._recorder=new cc.Sprite(res.icon_recorder_png);
        this.addChild(this._recorder);
        this._recorder.setPosition(cc.p(1200,300));
    },
    onEnter:function () {
        this._super();

        Game.op.bindPrepareScene(this);
    },
    onExit: function () {
        Game.op.unbindPrepareRoom();
        this._super();
    },

    intoRoom:function (data) {
        this._players=[];

        var players=data.player;
        for(var i=0;i<players.length;i++) {
            var image = new cc.Sprite(res.fate_019_png);
            this.addChild(image);

            switch (DIRECTION.positionToDirection(players[i].position || DIRECTION.DOWN)) {
                case DIRECTION.UP:
                    //上
                    image.setPosition(this._head_up.getPosition());
                    break;
                case DIRECTION.DOWN:
                    //下
                    image.setPosition(this._head_down.getPosition());
                    break;
                case DIRECTION.LEFT:
                    //左
                    image.setPosition(this._head_left.getPosition());
                    break;
                case DIRECTION.RIGHT:
                    //右
                    image.setPosition(this._head_right.getPosition());
                    break;
            }
            this._players.push(image);
        }
    },

    readyRoom:function () {

    },
})