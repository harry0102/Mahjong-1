var gg = gg || {};
var Utils = {
    genBoundingBoxToWorld: /**
     * 生成相对整个的bound，
     * 区别于Node.genBoundingBoxToWorld，不涉及子节点
     *
     * @param obj
     * @returns
     */
        function (obj) {
        var rect = cc.rect(0, 0, obj.width, obj.height);
        var trans = obj.getNodeToWorldTransform();
        var bound = cc.rectApplyAffineTransform(rect, trans);
        return bound;
    },
    runScene: function (scene) {
        cc.director.runScene(new cc.TransitionFade(0.2, scene));
        MyNodeListener.addListener(scene);
        //ButtonScaleListener.regListener(scene);
    },
    runScene1: function (scene) {
        // cc.director.runScene(new cc.TransitionFade(0.2, scene));
        MyNodeListener.addListener(scene);
        //ButtonScaleListener.regListener(scene);
    },
    pushScene: function (scene) {
        cc.director.pushScene(new cc.TransitionFade(0.2, scene));
        MyNodeListener.addListener(scene);
        //ButtonScaleListener.regListener(scene);
    },
    up: function (standard, target, margin) {
        if (!margin) {
            margin = 0;
        }
        var sap = standard.getAnchorPoint();
        var ap = target.getAnchorPoint();
        // 标准物的y + 标准物的高度 * 缩放 * (1-锚点y) + 本身的高度 * 缩放 * 锚点y + 所需间隔
        var y = standard.y + standard.height * standard.getScaleY() * (1 - sap.y) + target.height * ap.y * target.getScaleY() + margin;
        target.setPosition(standard.x, y);
    },
    down: function (standard, target, margin) {
        if (!margin) {
            margin = 0;
        }
        var sap = standard.getAnchorPoint();
        var ap = target.getAnchorPoint();
        // 标准物的y - 标准物的高度 * 缩放 * 锚点y - 本身的高度 * 缩放 * (1-锚点y) - 所需间隔
        var y = standard.y - standard.height * standard.getScaleY() * sap.y - target.height * (1 - ap.y) * target.getScaleY() - margin;
        target.setPosition(standard.x, y);
    },
    left: function (standard, target, margin) {
        if (!margin) {
            margin = 0;
        }
        var sap = standard.getAnchorPoint();
        var ap = target.getAnchorPoint();
        // 标准物的x - 标准物的宽度 * 缩放 * 锚点 + 本身的宽度 * 缩放 * (1-锚点x) - 所需间隔
        var x = standard.x - standard.width * standard.getScaleX() * sap.x - target.width * (1 - ap.x) * target.getScaleX() - margin;
        target.setPosition(x, standard.y);
    },
    right: function (standard, target, margin) {
        if (!margin) {
            margin = 0;
        }
        var sap = standard.getAnchorPoint();
        var ap = target.getAnchorPoint();
        // 标准物的x + 标准物的宽度 * 缩放 * (1-锚点x) + 本身的宽度 * 缩放 * 锚点 + 需要间隔
        var x = standard.x + standard.width * standard.getScaleX() * (1 - sap.x) + target.width * ap.x * target.getScaleX() + margin;
        target.setPosition(x, standard.y);
    },
};


