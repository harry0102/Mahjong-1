/**
 * Created by Administrator on 2017/1/13 0013.
 */
var MyLayer = cc.Layer.extend({
    canMove: false,
    /**
     * @param parent 父节点
     * @param fileName 图片名称
     * @param callback 触发事件回调函数
     * @param callbackTarget 回调函数的this对象
     * @param rect 素材裁剪大小 一般不使用
     * @param rotated 素材旋转角度 一般不使用
     * */
    ctor: function (callback, callbackTarget) {
        this._super();
        // this.p = parent;
        // parent.addChild(this);
        this.canMove = false;

        this.origColor = this.getColor();
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
    setEnable: function (enable) {
        this.enable = enable;
    },
    isEnable: /**是否可点击*/function () {
        return this.enable;
    },
    // flash: /**节点闪烁，变色功能*/ function () {
    //     var seq = cc.sequence(cc.fadeTo(0.5, 50), cc.fadeTo(0.5, 255));
    //     var seq2 = cc.sequence(cc.tintTo(0.5, 17, 30, 55), cc.tintTo(0.5, 255, 0, 0));
    //     var spawn = cc.spawn(seq, seq2);
    //     var flash = cc.repeatForever(spawn);
    //     this.runAction(flash);
    // },
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
