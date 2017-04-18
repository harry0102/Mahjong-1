/**
 * Created by Wasu on 16/12/13.
 */


var UserInfoLayer=ccui.Layout.extend({
    _backGround:null,
    _backGround2:null,
    _icon:null,
    _close:null,
    _name:null,
    _id:null,
    _sex:null,
    _ip:null,
    _gold:null,
    _roomCardNum:null,

    ctor:function () {
        this._super();
        //加载背景
        this.loadBackground();
        //加载信息
        this.loadText("a23434","001","女","192.168.0.1","0","10");
        this._name.setPosition(cc.p(-50,50));
        this._id.setPosition(cc.p(140,50));
        this._sex.setPosition(cc.p(-70,0));
        this._ip.setPosition(cc.p(200,0));
        this._gold.setPosition(cc.p(-75,-50));
        this._roomCardNum.setPosition(cc.p(145,-50));
        //加载关闭符号
        this.loadButton(res.button_close_png,this.onButtonTouchEvent);
        this._close.setPosition(cc.p(300,90));
        //加载用户头像
        this.loadImage()
    },

    loadBackground:function () {
        this._backGround=new ccui.ImageView(res.background_userInfo);
        this.addChild(this._backGround);
    },
    loadButton:function (texture,event) {
        this._close=new ccui.Button();
        this.addChild(this._close)
        this._close.setScale(0.5);
        this._close.loadTextures(texture,texture,"");
        this._close.setTouchEnabled(true);
        this._close.addTouchEventListener(event,this);
    },
    onButtonTouchEvent:function (sender, type) {
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("关闭当前层");
                //this.removeFromParent();
                this.setVisible(false);
                break;
            case ccui.Widget.TOUCH_MOVED:
                cc.log("touch move");
                break;
            case ccui.Widget.TOUCH_ENDED:
                cc.log("touch up");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                cc.log("touch cancel");
                break;
            default:
                break;
        }

    },
    loadImage:function () {
      this._icon=new cc.Sprite(res.fate_019_png);
      this._icon.setPosition(cc.p(-210,0));
      this.addChild(this._icon);
    },
    setText:function (name,id,sex,ip,gold,roomCard,url) {
      this._name.setString("昵称："+name);
      this._id.setString("ID："+id);
      this._sex.setString("性别："+sex);
      this._ip.setString("IP："+ip);
      this._gold.setString("金币："+gold);
      this._roomCardNum.setString("房卡："+roomCard);
      this.getParent().loadImgFromUrl(this,url,this._icon);
    },

    setInfo:function () {
        this._name.setString("昵称："+name);
        this._id.setString("ID："+id);
        this._ip.setString("IP："+ip);
    },

    loadText:function (name,id,sex,ip,gold,roomCardNum) {

        this._name=new cc.LabelTTF("昵称："+name,"Arial",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._name);

        this._id=new cc.LabelTTF("ID： "+id,"Arial",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._id);

        this._sex=new cc.LabelTTF("性别："+sex,"Arial",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._sex);

        this._ip=new cc.LabelTTF("IP： "+ip,"Arial",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._ip);

        this._gold=new cc.LabelTTF("金币："+gold,"Arial",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._gold);

        this._roomCardNum=new cc.LabelTTF("房卡："+roomCardNum,"Arial",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._roomCardNum);

    },

})