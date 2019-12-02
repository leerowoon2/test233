
var SettingsDef = require('../SettingsDef');
var Lang = require('../lang/Lang');

function Layout () {
}

Layout.prototype = {
    create : function (callback) {
        var _this = this;
        var _lang = Lang[SettingsDef.lang];

        var mainWrap = '';
            mainWrap += 
            '<div class="btnAction">'+
                '<div class="swiper-container wrapBtnAction menu-container">'+
                    '<div class="swiper-pagination"></div>' +
                    '<div class="swiper-wrapper actionPage">';
                        mainWrap += _this.createMenu("mobile");
                    mainWrap += '</div>'+

                '</div>'+
            '</div>'+
            '<a mode="btnToolbar" class="btn btnToolbar"><i class="kk-icon-view_headline"></i></a>'+
            '<div class="toolbar" style="display:none;">'+
                '<a class="btn" mode="thumbtoggle" title="'+_lang.toolbar.menu+'"><i class="kk-icon-menu"></i></a>';
                if(SettingsDef.company.display == true){
                    mainWrap += '<div class="logo"><img src="'+SettingsDef.company.logo+'"></div>';
                }
                mainWrap += '<div class="navigationbar">'+
                        '<a class="btn" mode="start" title="'+_lang.toolbar.start+'"><i class="kk-icon-first_page"></i></a>'+
                        '<a class="btn" mode="prev" id="prev" title="'+_lang.toolbar.prev+'"><i class="kk-icon-keyboard_arrow_left"></i></a>'+
                        '<div class="status">'+
                            '<span id="kkCurrentPageWrap"><input type="text" value="1" id="kkCurrentPageNumber"/></span>'+
                            '<span class="gap">/</span>'+
                            '<span id="kkTotalPageNumber"></span>'+
                        '</div>'+
                        '<a class="btn" mode="next" id="next" title="'+_lang.toolbar.next+'"><i class="kk-icon-keyboard_arrow_right"></i></a>'+
                        '<a class="btn" mode="end" title="'+_lang.toolbar.end+'"><i class="kk-icon-last_page"></i></a>'+
                        '<a class="btn zoombtn" mode="zoomin" id="zoomin" title="'+_lang.toolbar.zoomin+'"><i class="kk-icon-add"></i></a>'+
                        '<div class="state zoombtn" u-id="" id="zoom_rate" val="1" mode="select" style="over"></div>'+
                        '<a class="btn zoombtn" mode="zoomout" id="zoomout" title="'+_lang.toolbar.zoomout+'"><i class="kk-icon-remove"></i></a>'+
                    '<div id="pageslider" class="pageslider"></div>'+
                '</div>'+
                '<div class="viewmode" >';

                    mainWrap += _this.createMenu("desktop");

                mainWrap += '</div>'+
            '</div>';
            if(SettingsDef.fileinfo.multi){
                mainWrap += '<div class="tabbar"><div class="tabbarWrap">';
                $.each(SettingsDef.fileinfo.file,function(i, v){
                    if(i == 0){
                        mainWrap += '<div class="tab active" doc="'+i+'">'+v.title+'</div>';
                    }else{
                        mainWrap += '<div class="tab" doc="'+i+'">'+v.title+'</div>';
                    }

                });
                mainWrap += '</div></div>';
            }

            mainWrap += '<div class="submenubar">' + 
                '<div class="btnBox" action="thumbview"><a u-id="thumbview" mode="thumbview" label="'+_lang.toolbar.thumbview+'" class="btn" style="font-size:20px;"><i class="kk-icon-apps"></i></a></div>'+
                '<div class="btnBox" action="tts"><a u-id="tts" mode="tts" label="'+_lang.toolbar.tts+'" class="btn" style="font-size:20px;"><i class="kk-icon-volume_up"></i></a></div>'+
                '<div class="btnBox" action="download"><a u-id="download" mode="download" label="'+_lang.toolbar.download+'" class="btn" style="font-size:20px;"><i class="kk-icon-get_app"></i></a></div>'+   
            '</div>';

            mainWrap += '<div class="drawbar">' + 
                '<div class="btnBox"><a u-id="sketchBorderColor" mode="sketchBorderColor" label="'+_lang.toolbar.sketchBorderColor+'" class="kk_colorpicker" style="font-size:20px;"><i class="kk-icon-palette"></i></a></div>'+
                '<div class="btnBox"><a u-id="sketchBorderWeight" mode="sketchBorderWeight" label="'+_lang.toolbar.sketchBorderWeight+'" class="kk_selectbox" style="font-size:20px;"><i class="kk-icon-line_weight"></i></a></div>'+
                '<div class="btnBox"><a u-id="sketchBorderOpacity" mode="sketchBorderOpacity" label="'+_lang.toolbar.sketchBorderOpacity+'" class="kk_selectbox" style="font-size:20px;"><i class="kk-icon-opacity"></i></a></div>'+
                '<div class="btnBox"><a mode="sketchEraser" label="'+_lang.toolbar.sketchEraser+'" class="btn" style="font-size:20px;"><i class="kk-icon-location_searching2"></i></a></div>'+
                '<div class="btnBox"><a mode="sketchClear" label="'+_lang.toolbar.sketchClear+'" class="btn" style="font-size:20px;"><i class="kk-icon-layers_clear"></i></a></div>'+   
                '<div class="btnBox"><a mode="sketchCancel" label="'+_lang.toolbar.sketchCancel+'" class="btn" style="font-size:20px;"><i class="kk-icon-done"></i></a></div>'+               
            '</div>'+

            '<div class="deskView">'+
                '<div id="lSideView" class="lSideView" totalslide="1">'+
                    '<div class="lSideViewBtn">'+
                    '<a mode="outlineview" class="btn" title="'+_lang.toolbar.outlineview+'" ><i class="kk-icon-format_list_bulleted"></i></a>'+
                        '<a mode="thumbview" class="btn"  title="'+_lang.toolbar.thumbview+'"><i class="kk-icon-apps"></i></a>'+
                        '<a mode="searchview" class="btn" title="'+_lang.toolbar.searchview+'" ><i class="kk-icon-search"></i></a>'+
                        '<a mode="bookmarkview" class="btn" title="'+_lang.toolbar.bookmarkview+'" ><i class="kk-icon-turned_in"></i></a>'+
                    '</div>'+

                    '<div class="sildeview lSideViewWrap">'+
                        '<div class="lSideViewWrapSCroll"></div>'+
                        '<a mode="outlineCloseMobile" class="btn"><i class="kk-icon-close"></i></a>'+
                    '</div>'+
                    '<div class="sildeview lOutlineViewWrap">'+
                        '<div class="lOutlineViewWrapSCroll"></div>'+
                        '<a mode="outlineCloseMobile" class="btn"><i class="kk-icon-close"></i></a>'+
                    '</div>'+
                    '<div class="sildeview lContentViewWrap">'+
                        '<div class="lContentViewWrapSCroll"></div>'+
                        '<a mode="contentCloseMobile" class="btn"><i class="kk-icon-close"></i></a>'+
                    '</div>'+
                    '<div class="sildeview lSearchViewWrap">'+
                        '<div class="lSearchToolBarWrap">'+
                            '<input type="search" class="search" value="" />'+
                            '<a href="#" mode="searchtext" class="btn">'+_lang.toolbar.searchbtn+'</a>'+
                        '</div>'+
                        '<div class="lSearchViewWrapSCroll"></div>'+
                        '<div class="searchLoading off">'+
                           '<div class="square"><div class="spin"></div><br/>Now Searching...</div>'+
                        '</div>'+
                        '<a mode="outlineCloseMobile" class="btn"><i class="kk-icon-close"></i></a>'+
                    '</div>'+
                    '<div class="sildeview lBookmarkViewWrap">'+
                        '<div class="lBookmarkViewWrapSCroll"></div>'+
                        '<a mode="bookmarkCloseMobile" class="btn"><i class="kk-icon-close"></i></a>'+
                    '</div>'+
                '</div>'+
                '<div class="editView">'+
                    '<div class="container">'+

                        '<div class="scroller-container">'+
                            //'<div kk_zoom="1" class="scroller-scroll-wrapper">'+
                                '<div class="scroller-wrapper"></div>' +
                            //'</div>' +
                        '</div>'+

                        '<div class="swiper-container contentView">'+
                            '<div id="document_view" kk_zoom="1" class="wrapper swiper-wrapper">'+
                            '</div>' +
                            '<div class="swiper-pagination"></div>'+
                        '</div>'+
                        '<div class="flipbook-viewport">'+
                            '<div class="flipbook-container">'+
                                '<div class="flipbook" style="display:none;"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="searchbar"><input type="text" class="searchtext" value="" /><a href="#" mode="searchtext" class="btn">검색</a><a href="#" mode="prevsearch" class="btn"><i class="kk-icon-keyboard_arrow_left"></i></a><a href="#" mode="nextsearch" class="btn"><i class="kk-icon-keyboard_arrow_right"></i></a><a href="#" mode="closesearch" class="btn"><i class="kk-icon-close"></i></a><div class="searchinfo"></div></div>'+
                    '<div class="modalview"></div>'+
                    '<a mode="prev" class="btn ui_icon kk-prev-page"><i class="kk-icon-arrow_back"></i></a>'+
                    '<a mode="next" class="btn ui_icon kk-next-page"><i class="kk-icon-arrow_forward"></i></a>'+
                '</div>'+
            '</div>'+

            '<div id="printContainer"><div class="printWrap"></div></div>'+

            '<div id="kk_dialog" class="kk_dialog"><div class="content"></div><div class="fontsize"></div></div>'+
            '<div id="kk_pw_dialog" class="kk_pw_dialog"><div class="content"></div><div class="fontsize"></div></div>';

            

        $("#"+SettingsDef.wrap).html(mainWrap);
        if ($.isFunction(callback)){ callback(); }
    },

    createMenu : function (mode) {
        var _lang = Lang[SettingsDef.lang];
        var mainWrap = "";
        if(mode == "desktop"){
            $.each(SettingsDef.toolbar.desktop,function(i,v){
                var menu = SettingsDef.toolbar.olist[v];
                if(typeof(menu) !== "undefined"){
                    if(menu.device == "all" || menu.device == "desktop"){
                        if(menu.type == "btn"){
                            mainWrap += '<a class="btn" mode="'+menu.id+'" title="'+_lang.olist[menu.id]+'" label="'+_lang.olist[menu.id]+'" style="'+menu.style+'"><i class="'+menu.icon+'"></i></a>';
                        }
                    }
                }
            });
        }else if(mode == "tablet"){
            $.each(SettingsDef.toolbar.tablet,function(i,v){
                var menu = SettingsDef.toolbar.olist[v];
                if(typeof(menu) !== "undefined"){
                    if(menu.device == "all" || menu.device == "mobile" || menu.device == "tablet"){
                        if(menu.type == "btn"){
                            if(menu.id == "tel"){
                                mainWrap += '<div class="btnBox"><a mode="link" href="'+SettingsDef.company.tel+'" label="'+_lang.olist[menu.id]+'" class="btn " style="'+menu.style+'"><i class="'+menu.icon+'"></i></a></div>';
                            }else if(menu.id == "helpcall"){
                                mainWrap += '<div class="btnBox"><a mode="link" href="'+SettingsDef.company.kakao+'" label="'+_lang.olist[menu.id]+'" class="btn " style="'+menu.style+'"><i class="'+menu.icon+'"></i></a></div>';
                            }else {
                                mainWrap += '<div class="btnBox"><a mode="'+menu.id+'" label="'+_lang.olist[menu.id]+'" class="btn" style="'+menu.style+'"><i class="'+menu.icon+'"></i></a></div>';
                            }
                        }
                    }
                }
            });
        }else{
            mainWrap += '<div class="swiper-slide">';
            
            $.each(SettingsDef.toolbar.mobile,function(i,v){
                var menu = SettingsDef.toolbar.olist[v];
                if(typeof(menu) !== "undefined"){
                    if(menu.device == "all" || menu.device == "mobile" || menu.device == "tablet"){
                        if(menu.type == "btn"){
                            if( ((i+1)%6 == 1) && i >1 ){
                                mainWrap += '</div><div class="swiper-slide">';
                            }
                            if(menu.id == "tel"){
                                mainWrap += '<div class="btnBox" action="'+menu.id+'"><a mode="link" href="'+SettingsDef.company.tel+'" label="'+_lang.olist[menu.id]+'" class="btn " style="'+menu.style+'"><i class="'+menu.icon+'"></i></a></div>';
                            }else if(menu.id == "helpcall"){
                                mainWrap += '<div class="btnBox" action="'+menu.id+'"><a mode="link" href="'+SettingsDef.company.kakao+'" label="'+_lang.olist[menu.id]+'" class="btn " style="'+menu.style+'"><i class="'+menu.icon+'"></i></a></div>';
                            }else {
                                mainWrap += '<div class="btnBox" action="'+menu.id+'"><a mode="'+menu.id+'" label="'+_lang.olist[menu.id]+'" class="btn" style="'+menu.style+'"><i class="'+menu.icon+'"></i></a></div>';
                            }
                        }
                    }
                }
            });
            mainWrap += '</div>';
         
        }
        //console.log(mainWrap);
        return mainWrap;
    },

    event : function () {
        var _this = this;
        var files = SettingsDef.loading.files;
        $(document).on("contextmenu", function(e) { return false; });
    },

    buttonResize : function () {
        var wW = $(window).width();
        var toolW = 700;
        var statusW = 640;
        //$("#toolBar .buttonBar .section").css({"left":"10px","right":"auto"});
        //$("#toolBar .buttonBar .section").width(toolW);
        if(wW < toolW){
            $("#toolBar a.next").show();
            $("#toolBar a.prev").hide();
        }else{
            $("#toolBar a.next").hide();
            $("#toolBar a.prev").hide();
        }
        //$("#statusBar .buttonBar .section").css({"left":"10px","right":"auto"});
        //$("#statusBar .buttonBar .section").width(statusW);
        if(wW < statusW){
            $("#statusBar a.next").show();
            $("#statusBar a.prev").hide();
        }else{
            $("#statusBar a.next").hide();
            $("#statusBar a.prev").hide();
        }
    }
};

module.exports = Layout;