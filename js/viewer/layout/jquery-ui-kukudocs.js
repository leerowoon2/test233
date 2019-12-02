(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {


    	// kkSelectBox
	$.widget("ui.kkSelectBox",{
		options:{
			id : "",
			label : "name2",
            defaultVal : "value2",
			currentVal : "value2",
            callback  : null,
			displayMode : "top",
			item: [
                {name: "100%", value: "1"},
                {name: "125%", value: "1.25"},
                {name: "150%", value: "1.5"},
                {name: "200%", value: "2"},
                {name: "300%", value: "3"},
                {name: "400%", value: "4"},
                {name: "500%", value: "5"}
            ],
            mode: "select"
		},

		_create:function(){
            var _this = this,
				lebel = "",
				strSelected = "",
                css = "",
                wrap = "";

            this.options.id = this.element.attr("u-id");
            this.options.mode = this.element.attr("mode");
            this.options.defaultVal = this.element.attr("val");
            this.options.currentVal = this.element.attr("val");
            //this.options.item = config[this.options.id] || [];


			var displayModeClass = "";
			if(this.options.displayMode == "bottom"){
				displayModeClass = " ui_bottom";
			}

            if(_this.options.mode == "select"){
                var iconClassType = "kk-icon-arrow_drop_down";

                wrap = '<div ui-type="'+ _this.options.id +'" ui-item-count="'+_this.options.item.length+'" class="ui_selectbox"><div class="arrow"><i class="' + iconClassType + '"></i></div>'+
                    '<ul class="ui_select_list '+displayModeClass+'">';
                $.each(_this.options.item,function() {
                    strSelected = "";
                    if(_this.options.defaultVal == this.value){
                        lebel = this.name;
                        strSelected = "selected";
                    }
					wrap += '<li val="'+this.value+'" '+strSelected+'>'+this.name+'</li>';
                });
                wrap += '</ul><label class="btnDropdown" ui-type="'+ this.options.type +'" >'+lebel+'</label></div>';
                this.element.html(wrap);
            } else {
                wrap = '<ul ui-type="'+ _this.options.id +'" ui-item-count="'+_this.options.item.length+'" class="'+ _this.options.id +' ui_combobox modeless'+displayModeClass+' '+ _this.options.id +'" >';
                $.each(_this.options.item,function() {
                    strSelected = "";
                    css = "";
                    if(this.css != ""){ css = 'class="'+this.css+'"'; }
                    if(_this.options.defaultVal == this.value){
                        label = this.name;
                        strSelected = "selected";
                    }

                    if(_this.options.id == "shapeBorderDash"){

						wrap += '<li val="'+this.value+'" '+css;
						if (this.type) {
							wrap += "type='" + this.type + "'";
						}
						wrap += strSelected + " ";

						if (this.key) { wrap += "key='" + this.key + "'"; }
						if (this.cmd) { wrap += "cmd='" + this.cmd + "'"; }

						var linetype = _this.getDashLineType(this.value);


						wrap += '>'+
								'<svg val="'+this.value+'"><polyline xmlns="http://www.w3.org/2000/svg" points="0,0 120,0" stroke-dasharray="'+linetype+'" stroke="#000000" stroke-width="10" value="'+this.value+'"></polyline></svg>'+
							'</li>';
					}else{
						wrap += '<li val="'+this.value+'" '+css;
						if (this.type) {
							wrap += "type='" + this.type + "'";
						}
						wrap += strSelected + " ";

						if (this.key) { wrap += "key='" + this.key + "'"; }
						if (this.cmd) { wrap += "cmd='" + this.cmd + "'"; }
						wrap += '>'+this.name+'<span val="'+this.value+'"></span></li>';
					}


                });
                wrap += '</ul>';
                this.element.append(wrap);
            }
            this.element.find("ul > li[type != 'label'], ul > li[type != 'label'] span").on("mousedown", function (e) {
                _this._toggle();
                _this.setValue(e, $(e.target).attr("val"));
                return false;
            });

            this._event();
			if( this.options.hidden ){
				this.element.hide();
			}
		},

		_init : function() {
		},

		disable : function(){
			var _this = this;
			_this._off(_this.element,"mousedown");
			_this.element.find(".ui_selectbox").removeClass("ui_active");
			_this.element.find("label").addClass("disable");
			$("#kk_dialog").css("overflow","auto");
			$(".modeless").hide();
		},

		enable : function(){
			var _this = this;

			_this.element.find("label").removeClass("disable");
		},

		_destroy: function() {
			this.element.remove();
		},

		_setOptions: function( options ) {
			var that = this;
			$.each( options, function( key, value ) {
				that._setOption( key, value );
			});
		},

		_setOption: function( key, value ) {
			this._super( key, value );
		},

        _event : function(){
            var _this = this;

            this._on( _this.element, {
                "click" : function(e) {
                    if ($(e.target).hasClass('f_list_ol') || $(e.target).hasClass('f_list_ul')){
                        _this.element.removeClass("ui_active")
                        $("#kk_dialog").css("overflow","visible");
                    }else{
                        _this._toggle();
						return false;
                    }
                }
            });

            if(_this.mode == "select"){
                var cH = (_this.options.item.length * 25);
                var pH  = ($(window).height() - ($("#toolBar").height() + $("#statusBar").height()));
                if(cH > pH){ _this.element.find("ul").css("height", pH+"px"); }
                $(window).resize(function () {
                    pH  = ($(window).height() - ($("#toolBar").height() + $("#statusBar").height()));
                    if(cH > pH){ _this.element.find("ul").css("height", pH+"px"); }
                });
            }
        },

		//Text Color Layer 실행
		_toggle : function(){
            var _this = this;
            if(_this.options.mode == "select"){
                if(_this.element.find(".ui_selectbox label").hasClass("disable")){

                }else{
                    if(_this.element.find(".ui_selectbox").hasClass("ui_active")){
                        _this.element.find(".ui_selectbox").removeClass("ui_active");
                        $("#kk_dialog").css("overflow","auto");
                        $(".modeless").hide();
                    }else{
                        $(".ui_active").removeClass("ui_active");
                        _this.element.find(".ui_selectbox").addClass("ui_active");
                        $("#kk_dialog").css("overflow","visible");
                        $(".modeless").hide();
                        _this.element.find(".ui_combobox").show();
                    }
                }
            } else {
                if(_this.element.hasClass("ui_active")){
                    _this.element.removeClass("ui_active")
                    $("#kk_dialog").css("overflow","visible");
                    $(".modeless").hide();
                }else{
                    $(".ui_active").removeClass("ui_active");
                    _this.element.addClass("ui_active");
                    $("#kk_dialog").css("overflow","auto");
                    $(".modeless").hide();
                    _this.element.find(".ui_combobox").show();
                }
            }
		},

		setValue : function (e, value){
            var _this = this;
			this.currentVal = value;
            this.element.find("li[selected]").removeAttr("selected");
			var text = this.element.find("li[val='"+value+"']").text();
			if (!text) { 
                text = Math.round(value*100) + "%"; 
            }
            this.element.find("label").html(text);
            this.element.find("li[val='"+value+"']").attr("selected","selected");
            this._trigger("callback", e, {id:_this.options.id, mode:_this.options.mode,label:text,val:value});
		}
	});

    // kkColorPicker
    $.widget("ui.kkColorPicker",{
        options: {
            type : "",
			displayMode: "top",
            defaultColor : "000000",
            currentColor : "000000",
            noAction : false,
            colorParent : null,

            label:{
                standard: "표준 색",
                thame: "테마 색",
                default: "기본 색"
            },
            pallete : {
                defaultColor  : "000000",
                noneColor  : "transparent",
                simpleColor   : ["ffffff", "000000", "eeece1", "1f497d", "4f81bd", "c0504d", "9bbb59", "8064a2", "4bacc6", "f79646"],
                standardColor : ["f2f2f2", "808080", "ddd9c3", "c6d9f1", "dce6f2", "f2dcdb", "ebf1de", "e6e0ec", "dbeee0", "fdeada",
                    "d9d9d9", "595959", "c4bd97", "8eb4e3", "b9cde5", "e6b9b8", "d7e4bd", "ccc1da", "b7dee8", "fcd5b5",
                    "bfbfbf", "404040", "948a54", "558ed5", "95b3d7", "d99694", "c3d69b", "b3a2c7", "93cddd", "fac090",
                    "a6a6a6", "262626", "4a452a", "17375e", "376092", "953735", "77933c", "604a7b", "31859c", "e46c0a",
                    "808080", "0d0d0d", "1e1c11", "10243f", "254061", "632523", "4f6228", "403152", "215968", "984807"],
                normalColor   : ["c00000", "ff0000", "ffc000", "ffff00", "92d050", "00b050", "00b0f0", "0070c0", "002060", "7030a0"]
            },
            callback  : null
        },

        _create: function() {

            this.options.id = this.element.attr("u-id");
            this.options.defaultColor = this.element.attr("color");
            this.options.currentColor = this.element.attr("color");

			var displayModeClass = "";
			if(this.options.displayMode == "bottom"){
				displayModeClass = " ui_bottom";
			}

            var wrap = '';
                wrap += '<div class="ui_colorpicker modeless'+displayModeClass+'"><div class="arrow"></div>';
                //wrap += '<ul class="ui_sub_default_color"><li color="'+this.options.pallete.noneColor+'"><span class="ui_default_color" style="background-color:rgba(0,0,0,0);"></span>투명색</li></ul>';
                wrap += '<div class="ui_standard_color_text">'+this.options.label.thame+'</div>';
                wrap += '<ul class="ui_default_color_palette">';
                $.each(this.options.pallete.simpleColor, function(i,v) {
                    wrap += '<li style="background-color:#'+v+'" color="'+v+'"></li>';
                });
                wrap += '</ul><ul class="ui_color_palette">';

                $.each(this.options.pallete.standardColor, function(i,v) {
                    wrap += '<li style="background-color:#'+v+'" color="'+v+'"></li>';
                });
                wrap += '</ul>'+
                    '<div class="ui_standard_color_text">'+this.options.label.standard+'</div>'+
                    '<ul class="ui_standard_color_palette">';
                $.each(this.options.pallete.normalColor, function(i,v) {
                    wrap += '<li style="background-color:#'+v+'" color="'+v+'"></li>';
                });
                wrap +='</ul>';
                wrap +='</div>';

            this.element.append(wrap);




            this._event();
        },

        _init : function(){
            var _this = this;
            _this.element.find("a span.selectdColor").css("background-color","#"+_this.options.currentColor);			    // 선택된 색상 설정
            _this.element.find("li > span.defaultColor").css("background-color","#"+_this.options.pallete.defaultColor);  	// 기본 색상 설정
			//_this.element.find("ul.ui_sub_default_color > li").attr("color", "#"+_this.options.pallete.defaultColor);		// default 색상 적용
        },

        _event : function(){
            var _this = this;

            this._on( _this.element, {
                "click" : function(e) {
                    _this._toggle();
					return false;
                }
            });
            this._setAction();
        },


        _destroy: function() {
            this.element.find(".uiColorPicker").remove();
        },

        _setOptions: function( options ) {
            var that = this;
            $.each( options, function( key, value ) {
                that._setOption( key, value );
            });

        },
        _setOption: function( key, value ) {
            this._super( key, value );
        },

        //Text Color Layer 실행
        _toggle : function(){
            if(this.element.find(".ui_colorpicker").is(':hidden')){
                $(".modeless").hide();
                this.element.find(".ui_colorpicker").show();
            }else{
                this.element.find(".ui_colorpicker").hide();
            }
        },

        //리소스 삽입
        _setAction : function(){
            var _this = this;
            this.element.find("ul > li").on("click", function (e) {
                var color = $(this).attr("color");
                _this.element.find(".btnCurrent").attr("value", color);

                _this._setValue(color);
                _this._toggle();
				_this._trigger("callback", e,{id:_this.options.id,color:color});
                return false;
            });
        },

        _setValue : function (color){
            var _this = this;
            _this.options.currentColor = color;
            this.element.find(".ui_semple").css("background-color","#"+color);
            this.element.find("ul > li[selected]").removeAttr("selected");
            this.element.find("ul > li[color='"+color+"']").attr("selected","selected");

        },

        //메뉴 아이템 현재값 가져오기
        getParentMenuItemValue : function(){
            return this.element.find("a  span.selectdColor").css("background-color");
        }
    });

}));
