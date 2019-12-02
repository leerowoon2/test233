var Sketch = require('../lib/sketchjs/Sketch');
var Event  = require('../lib/sketchjs/Event');


function Drawing(){
    this.doc_id = "";
    this.isMobile = false;
    this.sketch = null;
}

Drawing.prototype = {
	create : function(callback){
        var _this = this;
        $(".btnAction").hide();
        $(".btnToolbar").hide();
        $(".tabletbar").show();
        $(".kk-prev-page").hide();
        $(".kk-next-page").hide();
        var $activepage = $(".swiper-slide-active .slide_wrap .pageWrap");  
        var _zz = $("#document_view").attr("kk_zoom");
        var _ww = $activepage.width();
        var _hh = $activepage.height();

        var doc_id = $("body").attr("fingerprint");
        var page = Number($(".swiper-slide-active .slide_wrap").attr("slide"));
        var path = $.parseJSON(localStorage.getItem(doc_id+"_"+page));

        if(path == null){
            $activepage.append('<div class="sketch" kktype="dw"></div>');
            _this.sketch = new Sketch({
                element: $activepage.find(".sketch")[0],
                zoom: _zz
            });	
        }else{
            $activepage.find(".sketch img").remove();
            _this.sketch = new Sketch({
                element: $activepage.find(".sketch")[0],
                zoom: _zz,
                path:path
            });	
        }
        _this.sketch.resize(_ww, _hh);

            
            $('#html5viewer').on('scroll  touchmove mousewheel', function(event) {    
                //event.stopPropagation();
                event.preventDefault();
                //return false;
            });
            

        if ($.isFunction(callback)){ callback(); }
    },

	getPath : function(page){
        var _this = this;
        var $activepage = $(".swiper-slide .slide_wrap[slide='"+page+"'] .pageWrap");  
        var _zz = $("#document_view").attr("kk_zoom");
        var _ww = $activepage.width();
        var _hh = $activepage.height();
        var doc_id = $("body").attr("fingerprint");


        
        var path = localStorage.getItem(doc_id+"_"+page);
        if(path !== null){
            path = $.parseJSON(path);
            $activepage.append('<div class="sketch" kktype="dw"></div>');

            
            _this.sketch = new Sketch({
                element: $activepage.find(".sketch")[0],
                zoom: _zz,
                path:path
            });	
            _this.sketch.resize(_ww, _hh);
            var image = document.createElement('img');
            image.src = $activepage.find(".sketch .kk_sketch_overlay")[0].toDataURL('image/png');
            $(image).attr("oncontextmenu","return false");
            $(image).css("-webkit-touch-callout","none");
            $activepage.find(".sketch").append(image);
            image.onload = function () {
                _this.sketch.destroy();
            }        
        }
    },

    apply : function(){
        var _this = this;

        $(".btnAction").hide();
        $(".btnToolbar").show();
        $(".tabletbar").hide();
        $(".kk-prev-page").show();
        $(".kk-next-page").show();
    
        var $activepage = $(".swiper-slide-active .slide_wrap .pageWrap");
        var page = Number($(".swiper-slide-active .slide_wrap").attr("slide"));
        var path =_this.sketch.protoToString();
        var image = document.createElement('img');
        image.src = $activepage.find(".sketch .kk_sketch_overlay")[0].toDataURL('image/png');
                                        $(image).attr("oncontextmenu","return false");
                            $(image).css("-webkit-touch-callout","none");
        $activepage.find(".sketch").append(image);
        image.onload = function () {
            _this.sketch.destroy();
        }
        
        var  doc_id = $("body").attr("fingerprint");
        localStorage.setItem(doc_id+"_"+page,path);

        $('#html5viewer').off('scroll  touchmove mousewheel');  
    },
    
    globalAlpha : function(val){
        var _this = this;
		_this.sketch.style.globalAlpha = val;
	},

    borderColor : function(val){
        var _this = this;

        console.log(val);
        _this.sketch.style.strokeStyle = val;
        _this.sketch.setTool('brush');
	},
		
    lineWidth : function(val){
        var _this = this;
        _this.sketch.style.lineWidth = val;
    },

    clearRecording : function(){
        var _this = this;
        _this.sketch.clearRecording();
    },

    eraser : function(){
        var _this = this;
        _this.sketch.setTool('eraser');
    }
};

module.exports = Drawing;