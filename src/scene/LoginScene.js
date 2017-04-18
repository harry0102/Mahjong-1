/**
 * Created by foo on 2016/11/15.
 */



var LoginLayer = cc.Layer.extend({
    sprite: null,
    _wxBtn: null,
    _textFiled: null,
    _inputLayer: null,
    _loading: null,
    ctor: function () {
        this._super();

        var winSize = cc.director.getWinSize();
        this.sprite = new cc.Sprite(res.login_jpg);
        this.sprite.x = winSize.width / 2;
        this.sprite.y = winSize.height / 2;
        this.addChild(this.sprite);
        this.loadtest();
        // this.loadOverLayer();
        //加载音量设置层
        this._inputLayer = new ServerLayer();
        this.addChild(this._inputLayer);
        var gPosition = this.convertToNodeSpace(cc.p(1640, 1360));
        this._inputLayer.setPosition(gPosition);
        this._inputLayer.setVisible(false);
        this._inputLayer.retain();

        this._wxBtn = new cc.MenuItemImage(res.about_hsharmaLogo_png, res.about_hsharmaLogo_png, this._wxLogin);
        // this._wxBtn1 = new cc.MenuItemImage("#btn_green2.png","#btn_green2.png",this._clickBack);

        var btns = [], btns2 = [];

        btns.push(this._wxBtn);


        // btns.push(this._wxBtn1);


        // new MyNode(this,res.about_hsharmaLogo_png,function (da) {
        //    cc.log(da);
        // });


        var menu = new cc.Menu(btns);
        menu.y = 150;
        this.addChild(menu);


        var btn = new cc.Sprite("#btn_orange2.png");
        btn.x = winSize.width * 3 / 4;
        btn.y = winSize.height * 3 / 4;
        this.addChild(btn);

        var _btnListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.width);
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }
                cc.log("press button");


                console.log("began action" + target.y);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                this._inputLayer.setVisible(true);
                console.log("touch Ended");
                var scaleBy1 = cc.scaleTo(0.1, 0.95);
                var scaleBy2 = cc.scaleTo(0.1, 1.0);
                var scaleBy3 = cc.scaleTo(0.1, 0.98);
                var scaleBy4 = cc.scaleTo(0.1, 1);
                var scaleBySeq1 = cc.sequence(scaleBy1, scaleBy2, scaleBy3, scaleBy4);

                btn.runAction(scaleBySeq1);
            }.bind(this)
        });

        //加载设置按钮事件
        cc.eventManager.addListener(_btnListener, btn);

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


        // var headNode = gg.headNode = new HeadNode(this, "#icon_wait.png");
        // headNode.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        // this.addChild(headNode);


        gg.layer = this;
        return true;
    },
    loadtest: function () {

        // var dd= cc.ParticleExplosion.create();
        // this.addChild(dd);
        // dd.setPosition(cc.p(300,400));

        // var emitter = new cc.ParticleSystem("res/particle.plist");
        // this.addChild(emitter);

        // this.gun = new cc.Sprite(res.gun_png);
        // this.addChild(this.gun);
        // this.gun.setAnchorPoint(1, 0);
        // this.gun.setPosition(cc.p(300, 400));
        // this.gun.setScale(3);
        // this.gun.setRotation(15);

        // var rotate = new cc.rotateTo(0.5, 45);
        // var elasticIn=rotate.easing(cc.easeExponentialOut());
        // var action = cc.sequence(cc.callFunc(function () {
        //     this.gun.setRotation(15);
        //     this.addBullet();
        // }.bind(this)),cc.fadeIn(0.2),elasticIn, cc.fadeOut(0.3));
        // var action1 = action.repeatForever();
        // this.gun.runAction(action1);

        // this.schedule(this.addBullet, 1);

        var rainParticle = new cc.ParticleFire();
        rainParticle.texture = cc.textureCache.addImage(res.gun_png);
        this.addChild(rainParticle);

        // var ff=new cc.ParticleSystem("res/plist/bao.plist");
        // ff.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        // this.addChild(ff);
        // ff.setPosition(cc.p(900,400));
        // var dd = new DownCard(this, 17, Card.TYPE.ORIGIN_DOWN_HAND, this.onTouchBegan, this);
        // var dd = new DeskCard(this, 17, 2);
        // dd.setPosition(100, 500);
        // dd.setColor(cc.color(237, 209, 10));

        // var ss = new cc.Sprite("#ting1.png");
        // this.addChild(ss);
        // ss.setScale(0.3);
        // ss.setPosition(100, 500);
        //
        // var scale = cc.scaleTo(2, 1);
        // var elasticInMoveTo = scale.easing(cc.easeBackInOut());
        // var action = cc.sequence(elasticInMoveTo, cc.delayTime(1), cc.fadeOut(1));
        // ss.runAction(action);


        // this._maikefeng = new cc.Sprite();
        // this._maikefeng.setPosition(650, 300);
        // this.addChild(this._maikefeng, 1);
        //
        // var allFrame = [];
        // for (var i = 1; i < 4; i++) {
        //     var str = "speak" + i + ".png";
        //     var allf = cc.spriteFrameCache.getSpriteFrame(str);//new cc.SpriteFrame()
        //
        //     if (!allf) {
        //         cc.log("@@@@@@@");
        //     }
        //
        //     allFrame.push(allf);
        // }
        // var animation = new cc.Animation(allFrame, 0.5);
        // var animate = new cc.animate(animation);
        // var action = animate.repeatForever();
        // this._maikefeng.runAction(action);


        this.sp = new cc.Sprite();
        this.sp.setTag(1000);
        this.sp.setPosition(500, 400);
        this.addChild(this.sp, 1);

        //定义一个数组 后面加中括号
        var allFrame = [];
        //for语句载入5个动画图片
        for (var i = 0; i < 46; i++) {
            //加载针动画，rect四个参数，前两个X,Y的坐标，默认0就OK,
            //后面两个参数传图片的宽度和高度
            var str = "bao_" + i + ".png";
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
        var action = animate.repeatForever();//new cc.RepeatForever(animate)
        //用精灵来执行针动画，让针动画跑起来
        this.sp.runAction(action);

        // this.scheduleOnce(this.finishAction,3);


        this._loading = new ccui.LoadingBar();

        this._loading.setName("LoadingBar");
        this._loading.loadTexture(res.pic_input);//设置进度条的加载图片
        var count = 1;
        this._loading.setPercent(count);//开始的进度
        this._loading.x = cc.winSize.width / 2;
        this._loading.y = cc.winSize.height / 2 + this._loading.height / 4;
        this.addChild(this._loading);
        this.schedule(function () {
            count = count + 2;
            this._loading.setPercent(count);//开始的进度
        }, 0.1);
    },
    addBullet: function () {
        var gunPosition = this.gun.getPosition();
        var rotate = this.gun.getRotation();
        var duration = 1;
        var bullet = new cc.Sprite(res.bullet_png);
        this.addChild(bullet);
        bullet.setRotation(15);
        bullet.setPosition(cc.p(gunPosition.x - this.gun.width * Math.sin(Math.PI / 12) * 9, gunPosition.y + this.gun.width * Math.cos(Math.PI / 12) * 3));
        // var actionMove = new cc.MoveTo(duration,cc.p(gunPosition.x + (this.gun.width + 50) * Math.sin(rotate) / 2, gunPosition.y + (this.gun.width + 50) * Math.cos(rotate) / 2));
        // debugger;
        var actionMove1 = new cc.MoveBy(duration, cc.p(-100, 15));
        bullet.runAction(cc.sequence(actionMove1, cc.callFunc(function () {
            this.doneBullet();
            bullet.removeFromParent();
        }.bind(this))));
        // bullet.runAction(actionMove);
    },
    doneBullet: function () {
        // this.removeChild(bullet,true);
        cc.log("delete");
    },
    finishAction: function () {
        this.sp.removeFromParent();
    },
    onTouchBegan: function () {
        cc.log("function");
    },
    _wxLogin: function () {
        cc.log("login");
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            Cocos2dxBridge.login();

        } else {
            Utils.runScene(new MenuScene());
        }

    },
    _clickBack: function () {
        cc.log("click");
    }
});

var LoginScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
        // Cocos2dxBridge.getIMEI();
        //     setTimeout(function () {
        //         Dialog.show("提示", function () {
        //             cc.log("message callback");
        //         });
        //     },2000);
    },
    // onExit: function () {
    //     console.log("loginScene exit");
    //     this._super();
    // }

});