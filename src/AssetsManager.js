/**
 * Created by Wasu on 17/2/20.
 */
var failCount = 0;

var AssetsManagerLoaderScene = cc.Scene.extend({
    _am:null,
    _progress:null,
    _percent:0,
    _percentByFile:0,
    run:function(){
        if (!cc.sys.isNative) {
            this.loadGame();
            return;
        }

        var layer = new cc.Layer();
        this.addChild(layer);
        this._progress = new cc.LabelTTF.create("update 0%", "Arial", 38);
        this._progress.x = cc.winSize.width / 2;
        this._progress.y = cc.winSize.height / 2 + 50;
        layer.addChild(this._progress);

        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
        cc.log("storagePath is " + storagePath);
        this._am = new jsb.AssetsManager("res/project.manifest", storagePath);
        this._am.retain();

        if (!this._am.getLocalManifest().isLoaded())
        {
            cc.log("Fail to update assets, step skipped.");
            this.loadGame();
        }
        else
        {
            var that = this;
            var listener = new jsb.EventListenerAssetsManager(this._am, function(event) {
                switch (event.getEventCode()){
                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                        cc.log("enter  ERROR_NO_LOCAL_MANIFEST ..... ");
                        cc.log("No local manifest file found, skip assets update.");
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                        cc.log("enter  UPDATE_PROGRESSION ..... ");
                        that._percent = event.getPercent();
                        cc.log(that._percent + "%");
                        var msg = event.getMessage();
                        if (msg) {
                            cc.log(msg);
                        }
                        break;
                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                        cc.log("enter  ERROR_DOWNLOAD_MANIFEST ..... ");
                        cc.log("Fail to download manifest file, update skipped.");
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                        cc.log("enter  ERROR_PARSE_MANIFEST ..... ");
                        cc.log("Fail to download manifest file, update skipped.");
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                        cc.log("enter  ALREADY_UP_TO_DATE ..... ");
                        cc.log("ALREADY_UP_TO_DATE.");
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_FINISHED:
                        cc.log("enter  UPDATE_FINISHED ..... ");
                        cc.log("Update finished.");
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_FAILED:
                        cc.log("enter  UPDATE_FAILED ..... ");
                        cc.log("Update failed. " + event.getMessage());
                        failCount++;
                        if (failCount < 5)
                        {
                            that._am.downloadFailedAssets();
                        }
                        else
                        {
                            cc.log("Reach maximum fail count, exit update process");
                            failCount = 0;
                            that.loadGame();
                        }
                        break;
                    case jsb.EventAssetsManager.ERROR_UPDATING:
                        cc.log("enter  ERROR_UPDATING ..... ");
                        cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                        cc.log("enter  ERROR_DECOMPRESS ..... ");
                        cc.log(event.getMessage());
                        that.loadGame();
                        break;
                    default:
                        break;
                }
            });

            cc.eventManager.addListener(listener, 1);
            this._am.update();
            cc.director.runScene(this);
        }

        this.schedule(this.updateProgress, 0.5);
    },
    loadGame:function(){
        cc.loader.loadJs(["src/files.js"], function(err){
            cc.loader.loadJs(jsFiles, function(err){
                cc.loader.load(g_resources,function () {
                    cc.spriteFrameCache.addSpriteFrames(res.mjtt_plist);
                    cc.spriteFrameCache.addSpriteFrames(res.scene_plist,res.scene_png);
                    Utils.runScene(new LoginScene());
                });

            });
        });
    },
    updateProgress:function(dt){
        this._progress.string = "update " + this._percent + "%";
    },
    onExit:function(){
        cc.log("AssetsManager::onExit");

        this._am.release();
        this._super();
    }
});
