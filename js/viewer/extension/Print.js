var Lang = require('../lang/Lang');
var SettingsDef = require('../SettingsDef');
var Mustache = require('../lib/mustache');
function Print() {
    this.info = null;
    this.pagesOverview = null;
    this.scratchCanvas = null;
    this.printContainer = null;
    this.progressbar = null;
    this.totalPage = 0;
    this.currentPage = -1;
    this.pstart = 0;
    this.pend = 0;
    this.count = -1;
    this.draw = false;
    this.active = true;
    this.activeService = false;
}

Print.prototype = {
    
    init : function(info, pagesOverview, printContainer, totalPage){
        var print = window.print;
        var _this = this;
        this.info = info; 
        this.pagesOverview = pagesOverview;
        this.printContainer = printContainer;
        this.totalPage = totalPage;       
        window.addEventListener('keydown', function(event) {
            // Intercept Cmd/Ctrl + P in all browsers.
            // Also intercept Cmd/Ctrl + Shift + P in Chrome and Opera
            if (event.keyCode === 80 && (event.ctrlKey || event.metaKey) && !event.altKey && (!event.shiftKey || window.chrome || window.opera)) {
                _this.renderPages();
                event.preventDefault();
                if (event.stopImmediatePropagation) {
                    event.stopImmediatePropagation();
                } else {
                    event.stopPropagation();
                }
                return;
            }
        }, true);

        $(window).on('beforeprint', function (event) { 
            if (_this.activeService == false) {
                //alert("브라우저 프린터는 지원하지 않습니다.");
                event.preventDefault();
                if (event.stopImmediatePropagation) {
                    event.stopImmediatePropagation();
                } else {
                    event.stopPropagation();
                }
                return false;
            }else{
            }

        });
         
        $(window).on('afterprint', function () {
            //console.log('afterprint');
            $("#printContainer .printWrap").html("");
            if ($("head").find("#pageStyleSheet").length > 0) {
                $("head").find("#pageStyleSheet").remove();
            }
            $("body").removeAttr('data-pdfjsprinting');
            _this.currentPage = -1;
            _this.activeService = true;
            _this.dialogClose();
         });
    },
    dialog : function(){
        var _this = this;
        this.wrap = $("#kk_dialog");
        var _lang = Lang[SettingsDef.lang];
        var wrapHtml = 
            '<div class="ui-tabs-panel tabLink lang_'+SettingsDef.lang+'">' +
                '<dl class="dl-horizontal">' +
                    '<dt>' +
                        '<span>'+_lang.print.range+'</span>' +
                    '</dt>' +
                    '<dd>' +
                        '<label><input type="radio" class="" name="printmode" value="one" checked="checked"/>'+_lang.print.pageOne+'</label>' +
                        '<label><input type="radio" class="" name="printmode" value="end"/>'+_lang.print.pageEnd+'</label>' +
                        '<label><input type="radio" class="" name="printmode" value="start"/>'+_lang.print.pageStart+'</label>' +
                        '<label><input type="radio" class="" name="printmode" value="all"/>'+_lang.print.pageAll+'</label>' +
                    '</dd>' +
                '</dl>' +
                '<dl class="dl-horizontal">' +
                    '<dt>' +
                    '</dt>' +
                    '<dd>' +
                        '<label><input type="radio" class="" name="printmode" value="part"/>'+_lang.print.pagePart+'</label>' +
                        '<input type="text" class="subject" name="printsubmode"  style="width:330px;" placeholder="'+_lang.print.pagePartPlaceholder+'" disabled="disabled"/>'+
                    '</dd>' +
                '</dl>' +   
            '</div>'+
            '<div id="progressbar"></div>'+
            '<div id="progresslabel" class="progress-label">Starting Print...</div>';
        $("#kk_dialog").dialog({
            title: _lang.print.title,
            width:"600",
            height:"auto",
            autoOpen:false,
            draggable:true,
            modal: true,
            resizable:false,
            open: function(event, ui) {
            },
            close : function(event, ui) {
            },
            buttons: [
                {
                    text : _lang.print.btnPrint,
                    click : function(){
                        var val = _this.wrap.find("input[name='printmode']:checked").val();

                        var current = Number($("#kkCurrentPageNumber").val()) - 2;

                        if(val == "all"){
                            _this.pstart = -1;
                            _this.pend = _this.totalPage;
                            
                        }else if(val == "one"){
                            _this.pstart = current;
                            _this.pend = current + 2;
                            
                        }else if(val == "end"){
                            _this.pstart = -1;
                            _this.pend = current + 2;
                            

                        }else if(val == "start"){
                            _this.pstart = current;
                            _this.pend = _this.totalPage;

                        }else if(val == "part"){
                            var part = _this.wrap.find("input[name='printsubmode']").val();
                            var _pp = part.split("-");

                            if(_pp[1] == null){
                                _this.pstart = _pp[0] -2;
                                _this.pend = _pp[0];
                            }else if(_pp[1] != null){
                                _this.pstart = _pp[0] - 2;
                                _this.pend = _pp[1];
                            }
                        }
                        _this.renderPages();
                    }
                },
                {
                    text : _lang.print.btnCancel,
                    click : function(){
                        $( this ).dialog( "close" );
                    }
                }
               
            ]
        });
        this.wrap.html("");
        this.wrap.html(wrapHtml);
        this.wrap.dialog('open');
        this.wrap.find("input[name='printmode']:radio").change(function () {
            var val = $(this).val();
            if(val == "part"){
                _this.wrap.find("input[name='printsubmode']").removeAttr("disabled").focus();
            }else{
                _this.wrap.find("input[name='printsubmode']").attr("disabled","disabled");
            }

        });


        _this.progressbar = $("#progressbar");
        _this.progressbar.progressbar({
            value: false,
            max : _this.totalPage,
           
            change: function() {
                
                $(".progress-label").text( _this.progressbar.progressbar( "value" ) + " / " + $(this).attr("aria-valuemax")  );
            },
            complete: function() {
                //$(".progress-label").text( "Complete!" );
            }
        });

        $("#progressbar").hide();
        $("#progresslabel").hide();
    },

    dialogClose : function(){     
        this.count = 0;
        this.progressbar.progressbar( "option", "value", 0);
        this.progressbar.progressbar( "destroy" );
        this.wrap.dialog('close');
    },

    renderPage : function (info, pageNumber, size) {
        var _this = this;
        var width = Math.floor(size.width);
        var height = Math.floor(size.height);

        _this.scratchCanvas = document.createElement('canvas');




        return info.getPage(pageNumber).then(function(pdfPage) {
            var viewport = pdfPage.getViewport(2);
            var width = Math.floor(viewport.width);
            var height = Math.floor(viewport.height);

            if(pageNumber == 1){
                _this.pageStyleSheet = '<style id="pageStyleSheet">' +
                '@page { size:'+width+'px '+height+'px; margin:0; padding:0;}' +
                '#printContainer .printWrap .ppage { width:'+width+'px; height:'+height+'px; }' +
                '</style>';
                $("head").append(_this.pageStyleSheet);
            }
    
            _this.scratchCanvas.width = width;
            _this.scratchCanvas.height = height;
            _this.scratchCanvas.style.width = width + 'px';
            _this.scratchCanvas.style.height = height + 'px';
          
            var ctx = _this.scratchCanvas.getContext('2d');
            ctx.save();
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect(0, 0, width, height);
            ctx.restore();

            var renderContext = {
                canvasContext: ctx,
                viewport: viewport,
                intent: 'print'
            };
            return pdfPage.render(renderContext).promise;
        }).then(function() {
            return {
                width:width,
                height:height
            };
        });
    },

    openPrintDialog : function() {
        var _this = this;
        _this.dialog();
    },
    
    renderPages : function() {
        var _this = this;
        var total = _this.pend - _this.pstart - 1;
        
        _this.progressbar.progressbar( "option", "max", total );
        $("#progressbar").show();
        $("#progresslabel").show();
        _this.renderNextPage();
    },

    renderNextPage : function(){
        var _this = this;
        _this.count++
        _this.pstart++;
        if (_this.pstart >= _this.pend) {
            _this.progressbar.progressbar( "option", "value", _this.count );
            _this.activeService = true;
            window.print();
            _this.draw = true;
            _this.active = false;
            return;
        };
        _this.progressbar.progressbar( "option", "value", _this.count );
        _this.renderPage(_this.info, _this.pstart + 1, this.pagesOverview).then(_this.useRenderedPage.bind(this));
    },

    useRenderedPage : function(printItem)  {
        var _this = this;
        var img = document.createElement('img');
        img.style.width = printItem.width;
        img.style.height = printItem.height;
        if (('toBlob' in _this.scratchCanvas) && !this.disableCreateObjectURL) {
            _this.scratchCanvas.toBlob(function(blob) {
            img.src = URL.createObjectURL(blob);
            });
        } else {
            img.src = _this.scratchCanvas.toDataURL();
        }
        var wrapper = document.createElement('div');
        if(typeof(SettingsDef.footer) !== "undefined"){

            var footer = Mustache.render(SettingsDef.footer.content, SettingsDef.footer);
            $(wrapper).append('<div class="footer">'+ footer +'</div>');
        }

        $(wrapper).append(img);
        $(wrapper).addClass("ppage");
        

        $(_this.printContainer).find(".printWrap").append(wrapper);



        img.onload = function() {
            _this.renderNextPage();
        };
    },

    actionPrint : function() {
        var _this = this;
        _this.openPrintDialog();
    }
};

module.exports = Print;