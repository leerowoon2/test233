
var SettingsDef = require('../SettingsDef');


function Watermark () {
}

Watermark.prototype = {       
    rendering : function(page,mode){
        var wmText = "";
        var watermark = localStorage.getItem('kkwatermark');
        if(watermark == null){
            wmText = SettingsDef.fileinfo.watermark;
        }else{
            wmText = watermark;
        }

        if(wmText !== ""){
            var wmkWrap = '';
            var masterPageNode = $(".swiper-container .swiper-wrapper div[slide='"+page+"'] .pageWrap");

            if(mode == "scroll"){
                masterPageNode = $(".scroller-container .scroller-wrapper .page[page='"+page+"'] .canvasWrapper");
            }

            for(var i=0; i<12; i++){
                wmkWrap += '<div class="kk_watermark"><p class="watermarkText">'+wmText+'</p></div>';
            }
            
            var wmkWrapDom = '<div class="watermarkWrap"></div>';
            if(masterPageNode.find(".watermarkWrap").length > 0){
                masterPageNode.find(".watermarkWrap").html(wmkWrap);
            }else{
                masterPageNode.append(wmkWrapDom);
                masterPageNode.find(".watermarkWrap").html(wmkWrap);
            }
    
            
        }
    }

};



module.exports = Watermark;