/**
 * Created by Wasu on 16/12/23.
 */
var CheckBoxLayer=cc.Layer.extend({
    _rule:null,
    _checkBox:null,
    ctor:function (rule) {
        this._super();

        this._rule=new cc.LabelTTF(rule,"Arial",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._rule);

        this._checkBox=new ccui.CheckBox();
        this.addChild(this._checkBox);
        this._checkBox.loadTextures(res.checkbox_bg_png,res.checkbox_bg_png,res.checkbox_select_png,res.checkbox_bg_png,res.checkbox_select_png);
        this._checkBox.setPosition(-50,0);
        this._checkBox.setTouchEnabled(true);
        this._checkBox.addEventListener(this.onCheckBOxSelectedEvent,this);
    },
    onCheckBOxSelectedEvent:function (sender, type) {
        switch (type){
            case ccui.CheckBox.EVENT_SELECTED:
                cc.log("复选框选中"+sender.toString());

                break;
            case ccui.CheckBox.EVENT_UNSELECTED:
                cc.log("复选框没选中");
                break;
            default:
                break;
        }
    },
    _select:function (bool) {
      this._checkBox.setSelected(bool)
    }
});