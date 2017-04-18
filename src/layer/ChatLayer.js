/**
 * Created by kale on 2016/12/1.
 */

var ChatLayer = cc.Layer.extend({
    _listView: null,
    _backGroud: null,
    _label1: null,
    _label2: null,
    _pageView: null,
    _textFiled: null,
    _sendBtn: null,
    _voiceBtn: null,
    _onExit: null,

    ctor: function (p) {
        this._super();
        this.p = p;
        cc.spriteFrameCache.addSpriteFrames(res.expression_plist);

        var dd=new MyLayer(function(){
            this.setPosition(9000, 390);
            return false;
        },this);
        this.addChild(dd);
        dd.setPosition(-900,-390);
        //加载聊天界面背景
        this.loadBackground();
        // 遮罩
        var dn = new cc.DrawNode();
        dn.drawRect(cc.p(-230, -230), cc.p(150, 150), cc.color(0, 0, 0, 0), 1, cc.color(0, 0, 0, 0));
        var clip = this.clip = new cc.ClippingNode(dn);
        this.addChild(clip, 10);

        var eb = this.eb = new cc.EditBox(cc.size(287, 57), new cc.Scale9Sprite(res.pic_input));
        eb.setPosition(-85, 200);
        eb.setFontSize(30);
        this.addChild(eb, 2);
        //加载发送按钮
        this._sendBtn = new MyNode(this, "#btn_send.png", this.cb, this);
        this._sendBtn.setPosition(99, 200);
        this._sendBtn.setScale(0.9);
        this.loadRight();
        this.addListener();
        this.loadFace();
        this.loadText();

        // this.setVisible(false);
    },
    onTouchEndEvent: function (target) {
        cc.log("onTouchEndEvent" + target);
        this.setPosition(9000, 390);
        return false;
    },
    loadRight: function () {
        /*加载右边按钮*/
        var r1 = this.right1 = new MyNode(this, "#pic1.png", this.cb, this);//
        var r2 = this.right2 = new MyNode(this, "#pic0_0.png", this.cb, this);//
        r1.setPosition(200, 123);
        r2.setPosition(200, -121);
    },
    loadFace: function () {
        /*添加表情*/
        var node = this.face = new cc.Node();
        node.setPosition(-180, 100);
        this.face.miny = 100;
        this.clip.addChild(node);
        var prev = null, prevFirst = null;
        for (var i = 0; i < 16; i++) {
            var bq = new MyNode(node, "#exp_" + i + ".png", this.faceback, this);
            bq.id=i;
            if (prev) {
                if (i % 4 == 0) {
                    Utils.down(prevFirst, bq, 10);
                    prevFirst = bq;
                } else {
                    Utils.right(prev, bq, 10);
                }
            } else {
                prevFirst = bq;
                bq.setPosition(0, 0);
            }
            prev = bq;
        }
        this.face.maxy = 100 + ((i % 4) + 1) * prev.height + (i % 4) * 10;
    },
    loadText: function () {
        var node = this.text = new cc.Node();
        node.setPosition(-225, 100);
        this.text.setVisible(false);
        this.text.miny = 100;
        this.text.maxy = 100 - 360;// 为了文字不被拉离底部
        this.clip.addChild(node);
        this.addText("快点吧，我等的花儿都谢了");
        this.addText("快点吧快点吧快点吧快点吧");
        this.addText("快点吧，我等的花儿都谢了");
        this.addText("快点吧，我等的花儿都谢了");
        this.addText("快点吧，我等的花儿都谢了");
        this.addText("快点吧，我等的花儿都谢了3");
        this.addText("快点吧，我等的花儿都谢了2");
        this.addText("快点吧，我等的花儿都谢了1", true);
        if (this.text.maxy < this.text.miny) {
            this.text.maxy = this.text.miny;
        }
    },
    addText: function (str, last) {
        /*添加文字*/
        var node = new MyNode(this.text, res.node_png, this.textback, this);
        node.setRectByChild(true);
        var label = new cc.LabelTTF(str, "", 30);
        label.setAnchorPoint(0, 0.5);
        node.addChild(label);
        if (this.text.prev) {
            Utils.down(this.text.prev, node, 20);
            this.text.maxy += 20;
        } else {
            label.setPosition(0, 0);
        }
        this.text.maxy += label.height;
        /*添加线*/
        var line = new cc.Sprite("#line_2.png");
        line.setAnchorPoint(0, 0.5);
        this.text.addChild(line);
        this.text.maxy += line.height;
        Utils.down(node, line, 20 + 20);// node的高度有問題，補充高度
        this.text.maxy += 20;
        if (last) {
            line.setVisible(false);
        }
        this.text.prev = line;
    },
    addListener: function () {
        this.moving = false;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
            onTouchCancelled: this.onTouchEnded.bind(this)
        });
        cc.eventManager.addListener(listener, this);
    },
    cb: function (p) {
        switch (p) {
            case this._sendBtn:
                var str = this.eb.getString();
                Game.op._roomScene._UILayer.showMessage(str);
                Cocos2dxBridge.sendTextMessage("#"+str,Game.roomNum);
                this.setPosition(cc.p(9000, 390));
                this.eb.setString("");
                // this.p.showMessage(str);
                break;
            case this.right1:
                this.right1.setSpriteFrame("pic1.png");
                this.right2.setSpriteFrame("pic0_0.png");
                this.face.setVisible(true);
                this.text.setVisible(false);
                break;
            case this.right2:
                this.right1.setSpriteFrame("pic1_0.png");
                this.right2.setSpriteFrame("pic0.png");
                this.face.setVisible(false);
                this.text.setVisible(true);
                break;
        }
    },
    faceback: function (p) {

        this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
            if (!this.moving) {
                var sp = p.getSpriteFrame();
                // Game.op._roomScene._UILayer.showFace(sp);
                Game.op._roomScene._UILayer.showFace(p);
                Cocos2dxBridge.sendTextMessage("/"+p.id,Game.roomNum);
                // this.p.showFace(sp);
            }
        }.bind(this))));

        // this.scheduleOnce(function () {
        //     if (!this.moving) {
        //         var sp = p.getSpriteFrame();
        //         // Game.op._roomScene._UILayer.showFace(sp);
        //         Game.op._roomScene._UILayer.showFace(p);
        //         Cocos2dxBridge.sendTextMessage("/"+p.id,Game.roomNum);
        //         // this.p.showFace(sp);
        //     }
        // }.bind(this), 0.1);
        //让框消失
        this.x=9000;
    },
    textback: function (p) {
        this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
            if (!this.moving) {
                var str = p.getChildren()[0].getString();
                Game.op._roomScene._UILayer.showMessage(str);
                Cocos2dxBridge.sendTextMessage("#"+str,Game.roomNum);
                // this.p.showMessage(str);
            }
        }.bind(this))));
        // this.scheduleOnce(function () {
        //     if (!this.moving) {
        //         var str = p.getChildren()[0].getString();
        //         Game.op._roomScene._UILayer.showMessage(str);
        //         Cocos2dxBridge.sendTextMessage("#"+str,Game.roomNum);
        //         // this.p.showMessage(str);
        //     }
        // }.bind(this), 0.1);
    },
    onTouchBegan: function (touch, event) {
        var pos = touch.getLocation();
        var p = this.getPosition();
        var rect = null;
        if (this.face.isVisible()) {
            this.curNode = this.face;
            rect = cc.rect(p.x - 180, p.y - 180, 150 + 180, 150 + 180);
        } else if (this.text.isVisible()) {
            this.curNode = this.text;
            rect = cc.rect(p.x - 225, p.y - 225, 150 + 225, 150 + 225);
        }
        this.moving = false;
        return cc.rectContainsPoint(rect, pos);
    },
    onTouchMoved: function (touch, event) {
        this.moving = true;
        if (this.curNode.y > this.curNode.maxy + 100) {
        } else if (this.curNode.y < this.curNode.miny - 100) {
        } else {
            var pos = touch.getDelta();
            this.curNode.y += pos.y;
        }
    },
    onTouchEnded: function (touch, event) {
        this.moving = false;
        if (this.curNode.y > this.curNode.maxy) {
            this.curNode.y = this.curNode.maxy;
        } else if (this.curNode.y < this.curNode.miny) {
            this.curNode.y = this.curNode.miny;
        } else {
            var pos = touch.getDelta();
            this.curNode.y += pos.y;
        }
    },
    loadBackground: function () {
        // this._backGroud = new ccui.ImageView(res.bg_chat_png);
        // this.addChild(this._backGroud);

        this._backGroud=new MyNode(this,res.bg_chat_png,function () {
            return false;
        });
        // this._backGroud.setPosition(900,390);
    },
    loadMessage: function (message) {
        var kk = this.getParent();
        kk.loadMessage(message);
    }
});
