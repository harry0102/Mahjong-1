/**
 * Created by Administrator on 2017/1/13 0013.
 */
var MyNode = cc.Sprite.extend({
    canMove: false,
    /**
     * @param parent 父节点
     * @param fileName 图片名称
     * @param callback 触发事件回调函数
     * @param callbackTarget 回调函数的this对象
     * @param rect 素材裁剪大小 一般不使用
     * @param rotated 素材旋转角度 一般不使用
     * */
    ctor: function (parent, fileName, callback, callbackTarget, rect, rotated) {
        this._super(fileName, rect, rotated);
        this.p = parent;
        parent.addChild(this);
        this.canMove = false;

        this.origColor = this.getColor();
        if (fileName && fileName.split("#").length >= 1) {
            this.normalName = this.hoverName = fileName.split("#")[1];
        }
        if (callbackTarget) {
            this.cbTarget = callbackTarget;
        } else {
            this.cbTarget = parent;
        }
        if (callback) {
            // 添加按钮事件
            this.callback = callback;
            MyNodeListener.register(this);
            this.enable = true;
        } else {
            this.enable = false;
        }
    },
    setRectByChild: /**
     * 点击范围 是否包括子节点范围 默认不包括
     *
     * @param bool
     */
        function (bool) {
        this.rectByChild = bool;
    },
    genBox: /**
     * 点击范围
     *
     * @returns
     */
        function () {
        if (this.rectByChild) {
            return this.getBoundingBoxToWorld();
        } else {
            var rect = cc.rect(0, 0, this.width, this.height);
            var trans = this.getNodeToWorldTransform();
            return cc.rectApplyAffineTransform(rect, trans);
        }
    },
    setTop: /**
     * 把节点放到最上面
     */
        function () {
        MyNodeListener.setTop(this);
    },
    setCanMove: function (bool) {
        this.canMove = bool;
    },
    isCanMove: function () {
        return this.canMove;
    },
    setSFrame: function (sFrame) {
        this.setSpriteFrame(sFrame);
        this.normalName = this.hoverName = sFrame;
    },
    setHoverName: function (fileName) {
        this.hoverName = fileName;
    },
    setEnable: function (enable) {
        this.enable = enable;
    },
    isEnable: /**是否可点击*/function () {
        return this.enable;
    },
    flash: /**节点闪烁，变色功能*/ function () {
        var seq = cc.sequence(cc.fadeTo(0.5, 50), cc.fadeTo(0.5, 255));
        var seq2 = cc.sequence(cc.tintTo(0.5, 17, 30, 55), cc.tintTo(0.5, 255, 0, 0));
        var spawn = cc.spawn(seq, seq2);
        var flash = cc.repeatForever(spawn);
        this.runAction(flash);
    },
    stop: function () {
        this.stopAllActions();
        this.setOpacity(255);
        this.setColor(this.origColor);
    },
    onExit: /**节点摧毁的时候，移除监听*/function () {
        MyNodeListener.logOff(this);
        this._super();
    }
});
var MY_NODE_LISTENER = {
    WAITING: 0,
    TRACKING_TOUCH: 1
};

/**
 * 点击监听辅助
 */
MyNodeListener = {
    regNode: [], //节点数组，所有存在监听的节点
    register: function (node) {
        this.regNode.push(node);
    },
    addListener: function (node) {
        gg = gg || {};
        // var listener = gg.nodeListener;
        if (gg.nodeListener) {
            cc.eventManager.removeListener(gg.nodeListener);
        }
        // if (!listener) {
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            enable: true,// 点击不能用
            enableRoot: [],// Root节点下不能用
            clickThrough: false,// 内部透击
            state: MY_NODE_LISTENER.WAITING,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,
            onTouchCancelled: this.onTouchEnded
        });
        gg.nodeListener = listener;
        // }
        listener.enable = true;
        listener.clickThrough = false;
        listener.state = MY_NODE_LISTENER.WAITING;
        listener.retain();
        /* 添加监听 */
        cc.eventManager.addListener(listener, node);
    },
    clickChose: /**
     * 是否点中
     *
     * @param node
     */
        function (node, pos) {
        return cc.rectContainsPoint(node.genBox(), pos);
    },
    isVisible: /**
     * 判断是否可见
     *
     * @param node
     */
        function (node) {
        if (!node.isVisible() || node.getOpacity() == 0) {
            return false;
        }
        for (var c = node; c != null; c = c.parent) {
            if (!c.isVisible() || c.getOpacity() == 0 && c.isCascadeOpacityEnabled()) {
                return false;
            }
        }
        return true;
    },
    setEnable: function (enable) {
        gg.nodeListener.enable = enable;
    },
    isEnable: function () {
        return gg.nodeListener.enable;
    },
    setTop: /**事件触发的优先级提到最高*/ function (node) {
        this.logOff(node);
        this.regNode.push(node);
    },
    logOff: /**移除监听事件*/ function (node) {
        for (var i = 0; i < this.regNode.length; i++) {
            if (this.regNode[i] == node) {
                this.regNode.splice(i, 1);
            }
        }
    },
    onTouchBegan: function (touch, event) {
        if (this.state != MY_NODE_LISTENER.WAITING
            || !this.enable) {
            return false;
        }
        var node = MyNodeListener.getTouchNode(touch);
        if (!node) {
            return false;
        }
        this.state = MY_NODE_LISTENER.TRACKING_TOUCH;
        /*被点击则，更换点击图片*/
        if (node.hoverName != node.normalName) {
            node.setSpriteFrame(node.hoverName);
        }
        var target = event.getCurrentTarget();
        target.touchNode = node;
        if (target.touchNode.isCanMove()
            && typeof target.touchNode.onTouchMoved == "function") {
            node.onTouchBegan(touch, event);
        }
        return true;
    },
    onTouchMoved: function (touch, event) {
        if (this.state != MY_NODE_LISTENER.TRACKING_TOUCH) {
            return;
        }
        var target = event.getCurrentTarget();
        if (target.touchNode.isCanMove()
            && typeof target.touchNode.onTouchMoved == "function") {
            target.touchNode.onTouchMoved(touch, event);
        } else {
            gg.nodeListener.onTouchEnded(touch, event);
        }
    },
    onTouchEnded: function (touch, event) {
        if (this.state != MY_NODE_LISTENER.TRACKING_TOUCH) {
            return;
        }
        this.state = MY_NODE_LISTENER.WAITING;
        var target = event.getCurrentTarget();
        var node = target.touchNode;
        if (node.moveing && typeof target.touchNode.onTouchEnded == "function") {
            node.onTouchEnded(touch, event);
            return;
        }
        /*点击结束，更换常态图片*/
        if (node.hoverName != node.normalName) {
            node.setSpriteFrame(node.normalName);
        }
        if (node.callback != null) {// 有回调函数，则调用回调函数
            node.callback.call(node.cbTarget, node, event);
        }
    },
    getTouchNode: /**获取被点击的对象*/function (touch) {
        if (this.regNode && this.regNode.length > 0) {
            for (var i = this.regNode.length - 1; i >= 0; i--) {
                var node = this.regNode[i];
                if (!this.isVisible(node)) {/*不可见，不回调*/
                    continue;
                }
                if (!node.isEnable() || !node.callback) {
                    continue;
                }
                var pos = touch.getLocation();
                if (!this.clickChose(node, pos)) {/*没点中，不回调*/
                    continue;
                }
                return node;
            }
        }
        return null;
    }
};
