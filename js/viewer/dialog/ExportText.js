define(['jquery', 'jquery-ui', 'postSearch'], function ($) {
    var ZipCodeDialog = function(){
        var document_id = $("#lSideView .slideWrap.current").attr("document_id");
        this.sketch = null;
        this.element = null;
        this.zoom = 1;
        this.ww = 0;
        this.hh = 0;
        this.wrap = $("#kk_dialog");
        
        this.wrapHtml =
            '<div id="exportTextWrap"></div>';
        this.open = function(element,page){
            this.wrap.html("");
            this.element = element;
            this.load(page);

            this.wrap.dialog('option',"title","");
            this.wrap.dialog('open');
        };

        this.close = function(options){
            this.wrap.dialog('close');
        };

        this.load = function(pageId){
            var _this = this;
            var ratio = window.devicePixelRatio;
            var path = "";
            var winW = $(window).width() - 10;
            var winH = $(window).height() - 10;

            _this.wrap.html(_this.wrapHtml);
            
            _canvas = null;
        };

        this.apply = function(){

            var _this = this;
        };
    };

    return ZipCodeDialog;
});
