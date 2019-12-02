


var FullScreen = require('../extension/FullScreen');

//var BookmarkDialog = require('../dialog/BookmarkDialog');
//var Print = require('../extension/Print');
function Menu() {
    this.alreadySaved = true;
    this.isFirstLoaded = true;
    this.kkSelectable = false;
    this.ratio = 1;
    this.bright = 0;
    this.menuSwiper = null;
};

Menu.prototype = {

    init : function (SettingsDef,Loader){
        var _this = this;
        $(".toolbar").hide();

        _this.loader = Loader;
		$(document).on('keydown', function(e) {
            if(e.which == 40 || e.which == 39) {
                _this.loader.nextSlide();
                return false;
            }
            if(e.which == 38 || e.which == 37) {
                _this.loader.prevSlide();
                return false;
            }
            if(e.which == 36) {
                _this.loader.startSlide();
                return false;
            }
            if(e.which == 35) {
                _this.loader.endSlide();
                return false;
            }
        });

        $(".btnAction").on("click", function (e) {
            $(".btnAction").hide();
            $(".btnToolbar").show();
            return false;
        });

    },

    menuSwitch : function(menu) {
        var _this = this;
        switch(menu.id){
        /*-- Annotation -------------------------------------------------------------------------------*/
            case "save" :
                _this.loader.save();
                break;
            case "saveImg" :
                _this.loader.saveImg();
                break;			
            
            case "pdfPageReset" :
                var current = $(".lSideViewWrapSCroll > .current").attr("page");
                _this.loader.currentPage(current,"y");
                $("#currentSlide").attr("imgupdate","n");
                break;

            case "fullscreen" :
                if (FullScreen.isEnabled()) {
                    FullScreen.request();
                } else {
                    // Ignore or do something else
                }
                break;    
                
            case "unfullscreen" :
                    FullScreen.exit();
                break;  
            case "prev" :
                    _this.loader.prevSlide();
                break;  
            case "next" :
                    _this.loader.nextSlide();
                break;  
            
            case "start" :
                    _this.loader.startSlide();
                break;  
            
            case "end" :
                    _this.loader.endSlide();
                break;  
            
            case "zoomin" :
                    _this.loader.zoomin();
                break;  
            
            case "zoomout" :
                    _this.loader.zoomout();
                break;

            case "ebookview" :
                    _this.loader.viewmodechange("ebook");
                break;
            
            case "slideview" :
                    _this.loader.viewmodechange("slide");
                break;
            case "cardview" :
                    _this.loader.viewmodechange("card");
                break;
                            
            case "outlineCloseMobile" :
                    $("#lSideView").hide();
                    if(device.type == "desktop"){
                    }else{
                        $(".btnToolbar").show();
                    }
                break;
            case "thumbtoggle" :
                    if($(".deskView").hasClass("thumbView")){
                        $(".deskView").removeClass("thumbView");
                        $(".viewmode .btn[mode='thumbtoggle']").removeClass("active");
                    }else{
                        $(".deskView").addClass("thumbView");
                        $(".viewmode .btn[mode='thumbtoggle']").addClass("active");
                        if($(".lSideViewBtn a.active").length < 1 ){
                            _this.loader.loadThumbView();
                        }
                    }
                    _this.loader.redraw();
                break;
            case "closehelp" :
                    $(".help").removeClass("on").addClass("off");
                break;
                
            case "closehelprepeat" :
                    $(".help").removeClass("on").addClass("off");
                    localStorage.setItem("help", "off");
                break;

            case "btnSearch" :
                    $("#lSideView").show();
                    $("#lSideView .lSideViewWrap").hide();
                    $("#lSideView .lOutlineViewWrap").hide();
                    $("#lSideView .lSearchViewWrap").show();
                    $("#lSideView .lSideViewBtn a.btn[mode='thumbview']").removeClass("active");
                    $("#lSideView .lSideViewBtn a.btn[mode='searchview']").addClass("active");
                    $("#lSideView .lSideViewBtn a.btn[mode='outlineview']").removeClass("active");
                    $("#lSideView .lSearchViewWrap").find("input").focus();
                break;

            case "exportText" :
                    _this.loader.exportText();
                break;
            case "download" :    
            case "btnDownload" :
                    if(SettingsDef.fileinfo.multi){
                        var path = _this.loader.pdfDocumentPath[ _this.loader.currentFile];
                        window.open(path);

                        /*
                        var path = SettingsDef.fileinfo.file[_this.loader.currentFile].path;

                        var slast = path.lastIndexOf("/") + 1;
                        var elast = path.lastIndexOf("#");
                        var ckey = path.substring(slast);
                        if(elast > 0 ){
                            ckey = path.substring(slast, elast);
                        }
                        
                        console.log(ckey);
                        $.ajax({
                            type: "POST",
                            url: SettingsDef.loading.downloadURL,
                            data: {
                                "ckey":ckey
                            }, 
                            dataType: "html",
                            success: function (data) {
                            },
                            fail: function (err) {
                            }
                        });
                        */
                    
                    }else{
                        window.open(SettingsDef.loading.downloadURL);
                        _this.loader.countChecker("download");
                    }


                    //
                    // 메리츠 추가부분
                    /*
                    var query = location.search.substr(1);
                    var result = [];

                    query.split("&").forEach(function(part) {
                        var item = part.split("=");
                        result.push(item[1]);
                    });

                    if(result.length > 0){
                        $.ajax({
                            type: "GET",
                            url: '/getDownload/'+result[0]+'/',
                            dataType: "json",
                            success: function (data) {
                                console.log('success : ', data);
                            },
                            error: function (request, status, error) {
                                console.log('error : ', error, request);
                            },
                            complete: function () {
                                console.log('complete');
                            }
                        });
                    }
                    */
                break;
            case "pagejump" :
                    if($(".toolbar").css("display") !== "none"){
                        $(".toolbar").css("display","none");
                        $("a[mode='btnToolbar']").hide();
                        $(".tabletbar a.btn[mode='pagejump']").removeClass("active");
                    }else{
                        $(".btnAction").hide();
                        $(".btnToolbar").hide();
                        $(".toolbar").show();
                        //$("#pageslider").slider("value",1);
                        $(".tabletbar a.btn[mode='pagejump']").addClass("active");
                    }
                break;
            case "btnToolbar" :
                   
                break;

            case "btnClose" :
                    $(".btnAction").hide();
                    $(".btnToolbar").show();
                break;
            case "btnToolbarClose" :
                    $(".toolbar").hide();
                    $("a[mode='btnToolbar']").show();
                break;

            case "tts" :
                    var current = _this.loader.current;
                    _this.loader.openTTS(current);

                break;
            case "print" :
                    _this.loader.print.actionPrint();
                break;

            case "thumbview" :
                    $("#lSideView").show();
                    _this.loader.loadThumbView();
                break;

            case "outlineview":
                    $("#lSideView").show();
                    _this.loader.loadOutlineView();
                break;


            case "contentview":
                    $("#lSideView").show();
                    _this.loader.loadContentView();
                break;

            case "searchview" :
                    $("#lSideView").show();
                    _this.loader.loadSearchView();

                    //$(".searchbar").show();
                    //$(".searchbar input").focus();
                break;

            case "closesearch" :
                    $(".searchbar").hide();
                break;
            case "searchtext" :
                _this.loader.pdfDocument[_this.loader.currentFile].then(function (info) {
                    _this.loader.searchText(info,1);
                });	
                break;
            case "nextsearch":
                    var page = 0;
                    _this.loader.searchPositionNext();

                break;
            case "prevsearch":
                var page = 0;
                _this.loader.searchPositionPrev();

                break;
            case "bookmarkview":
                    $("#lSideView").show();
                    _this.loader.loadBookmarkView();
                break;

            case "pagejumpview" :
                    _this.loader.loadPagejumpView();
                break;

            case "thumbtoggle":
                if($(".deskView").hasClass("thumbView")){
                    $(".deskView").removeClass("thumbView");
                    $(".viewmode .btn[mode='thumbtoggle']").removeClass("active");
                }else{
                    $(".deskView").addClass("thumbView");
                    $(".viewmode .btn[mode='thumbtoggle']").addClass("active");
                    
                    _this.loader.loadThumbView();
                }
                _this.resizeLayout();
                //_this.loader.swiper.update();
                break;
            case "closehelp":
                $(".help").removeClass("on").addClass("off");
                break;
            case "closehelprepeat":
                $(".help").removeClass("on").addClass("off");
                localStorage.setItem("help", "off");
                break;
            case "highlight2" :
                var range2 = localStorage.getItem('range');
                console.log(range2);
                var rs2 = rangy.deserializeRange(range2);
                console.log(rs2);
                break;
            case "rotateR" :

                var kkRotate = $(".swiper-slide-active").attr("kk_rotate");
                if(typeof(kkRotate) == "undefined" || isNaN(kkRotate) ){
                    kkRotate = 0;
                }else{
                    kkRotate = Number(kkRotate);
                }
                if(kkRotate >= 270){
                    kkRotate = 0;
                }else{
                    kkRotate = kkRotate + 90;
                }

                $(".swiper-slide-active").attr("kk_rotate",kkRotate);
                $(".swiper-slide-active").css("transform","rotate("+ kkRotate +"deg)");
                $(".swiper-slide-active").css("transform-origin","50% 50%");
                break;
            case "rotateL" :

                var kkRotate = $(".swiper-slide-active").attr("kk_rotate");
                if(typeof(kkRotate) == "undefined" || isNaN(kkRotate) ){
                    kkRotate = 0;
                }else{
                    kkRotate = Number(kkRotate);
                }
                
                kkRotate = kkRotate - 90;

                if(kkRotate ==  -90){
                    kkRotate = 270;
                } else if(kkRotate ==  -180){
                    kkRotate = 180;
                } else if(kkRotate ==  -270){
                    kkRotate = 90;
                }


                $(".swiper-slide-active").attr("kk_rotate",kkRotate);
                $(".swiper-slide-active").css("transform","rotate("+ kkRotate +"deg)");
                $(".swiper-slide-active").css("transform-origin","50% 50%");
                break;
            case "bookmark" :
                var doc_id  = SettingsDef.fileinfo.doc_id;
                var bookmark = new BookmarkDialog();
                bookmark.open(_this.loader.db, doc_id);
                break;
            case "highlight" :
                $(".tabletbar a").addClass("disable");
                $(".tabletbar a[mode='highlightSave']").show().addClass("active").removeClass("disable");
                $(".tabletbar a[mode='highlight']").hide();
                _this.loader.swiper.detachEvents();
                $(".swiper-slide-active .text_layer").show().css("z-index","10000");
                $(".swiper-slide-active .text_layer").selectable({
                    selected: function( event, ui ) {
                        $(ui.selected).addClass("mk_ypan_0");
                    },
                    unselected: function( event, ui ) {
                        $(this).find("> div").removeClass("mk_ypan_0");

                    }

                });

                break;
            case "highlightSave" :
                _this.loader.swiper.attachEvents();
                $(".tabletbar a[mode='highlightSave']").hide();
                $(".tabletbar a[mode='highlight']").show();
                var doc_id  = SettingsDef.fileinfo.doc_id;
                var page = Number($(".swiper-slide-active").attr("index")) + 1;
                var date = new Date();
                var timestamp = date.getTime();
                var wrap = [];
                var summary = "";
                $(".swiper-slide-active .text_layer > div").each(function(i){
                    if($(this).hasClass("mk_ypan_0")){
                        wrap.push(i);
                        summary += $(this).text();
                    }
                });
                $(".swiper-slide-active .text_layer").selectable( "destroy" );

                var item = wrap.join("|");
                _this.loader.db.transaction(function (tx) { 
                    var sql = 'SELECT * FROM bookmark WHERE mode = "highlight" AND doc_id = "'+doc_id+'" AND page = "'+page+'"';
                    tx.executeSql(sql, [], function (tx, results) {
                        var len = results.rows.length;
                        if(len > 0){
                            var sql = 'UPDATE bookmark SET title = "'+item+'",  WHERE id="'+ results.rows.item(0).id +'"';
                        }else{
                            var sql = 'INSERT INTO bookmark (mode, doc_id, page, position, title, summary, adddate) VALUES ("highlight","'+doc_id+'","'+page+'", "", "'+item+'", "'+summary+'", "'+timestamp+'")';
                        }
                        tx.executeSql(sql); 

                        $(".tabletbar a").removeClass("disable");
    
                    }, null);
                });
                break;
            case "link" :
                    window.open(menu.url);
                break;

            case "memo" :
                _this.loader.swiper.detachEvents();
                $(".swiper-slide-active .pageWrap").show().css("z-index","10000");
                $(".swiper-slide-active .pageWrap").kkSelectableObject({

                    callback : function(pos){
                            var mode = "memo";
                            var spos = $(".swiper-slide-active .pageWrap").offset();
                            var i_z = $("#currentSlide").attr("kk_zoom");
                            var i_y = 0;
                            var i_x = 0;
                            var lw = $("#lSideView").width();
                            var th = $("#toolBar").height();
                            if(lw < 0){ lw = 0;}
                            if(th < 0){ th = 0;}

                            var pos_l = i_z*pos.l+spos.left-lw;
                            var pos_t = i_z*pos.t+spos.top-th;
                            
                            var pos_w = i_z*(pos.w);
                            var pos_h = i_z*(pos.h);

                            
                            if($(".kk_selected_space").length == 0){
                                $(".editView").append('<div class="kk_selected_space"></div>');
                            }


                            $(".kk_selected_space").css({"top":pos_t+"px","left":pos_l+"px","width":pos_w+"px","height":pos_h+"px"}).show();


                            npos = {t:0, l:0, w:pos_w, h:pos_h, stroke_width:1, stroke_color:"rgb(61,103,142)",	fill_color:"#5B9BD5"};
                            var shapeName = "memo";
                                mode = "memo";
                            

                            ShapeUtil.createShapeMobile("rect",shapeName,npos, function(wrap){
                                var spid = $(wrap).attr("spid");
                                var key = $(wrap).attr("key");
                                if(typeof key == "undefined"){ key = 0; }
                                if($(wrap).hasClass("memo")){
                                    $("#editView .memo[spid='"+spid+"']").addClass("kk-mobile-shape-selectabled");
                                }else{
                                    $("#editView .shape[spid='"+spid+"']").addClass("kk-mobile-shape-selectabled");
                                }
                                //$("#kk_shape").kkSelectableObject("destroy");
                            });

                            $(".kk_selected_space").kkShapeSelectable({
                                mode: "memo",
                                
                                shapeUtil : ShapeUtil,
                                callback: function(element){
                                    _this.boxWrap.applyCallback(element);
                                    _this.boxWrap.callbackReset();
                                },
                                delCallback: function(element){
                                    _this.boxWrap.deleteCallback(element);
                                    $(".kk_selected_space").kkShapeSelectable("destroy");
                                    _this.boxWrap.callbackReset();
                                },
                                resizeCallback: function(pos){
                                }
                            });

                            $("#kk_shape").kkSelectableObject().kkSelectableObject("destroy");
                        }
                    });
                break;
            case "sketch":
                _this.loader.drawing.create(function(){
                    //_this.loader.swiper.detachEvents();
                    console.log("@@@@@");
                });
                break;
            case "sketchEraser" :
                    _this.loader.drawing.eraser();
                break;
            case "sketchClear":
                    _this.loader.drawing.clearRecording();
                break;
            case "sketchCancel":
                    _this.loader.drawing.apply();
                break;
            case "historyBack" :
                    if(_this.loader.history_id < 1){
                        _this.loader.history_id = 0;
                    }else{
                        _this.loader.history_id = _this.loader.history_id - 1;
                    }
                    console.log(_this.loader.history_id);
                    var page = _this.loader.history[_this.loader.history_id];
                    _this.loader.slideTo(page);
                break;
            case "historyFoword" :

                break;
            default :
                break;
        }
    }
};
    
module.exports = Menu;