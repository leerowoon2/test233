

//require("./lib/jquery-ui");
require("./lib/jquery-ui-kukudocs");


function UiShapeEditor(){
	$.widget("ui.kkSelectableObject",{
		options: {
            rid : "",
			mode : "normal",
			selection : false,
            item : 0,
			maxAnno : 64,
			distance : 0, 
			callback : null
		},

		_create: function() {
            var _this = this;
			_this._event();
        },

        _init : function(){
            var _this = this;
        },

		_destroy: function() {
            var _this = this;
			_this.element.selectable("destroy");
		},

        _event : function(){
            var _this = this;
			var offset = $("#currentSlide .pWrap").offset();
			var pos = {
					t:0,
					l:0,
					w:0,
					h:0,
					st:0,
					sl:0,
					et:0,
					el:0
				};

			_this.element.selectable({
				distance: _this.options.distance,
                create: function( e, ui ) {


				},
				start: function( e, ui ) {
					pos['st'] = e.clientY;
					pos['sl'] = e.clientX;
                    return false;
				},
                stop: function( e, ui ) {
					var offset = $(".swiper-slide-active .pageWrap").offset();
					var zoom = Number($("#currentSlide").attr("kk_zoom"));
                    //var zoom = 1;
					var th = offset.top;
					var tl = offset.left;
					var i_y = $(".editView").scrollTop();
					var i_x = $(".editView").scrollLeft();

					pos['et'] = e.clientY;
					pos['el'] = e.clientX;


					pos['w'] = Math.abs(pos['el'] - pos['sl'])/zoom;
					pos['h'] = Math.abs(pos['et'] - pos['st'])/zoom;

                    if(pos['st'] < pos['et']){
						pos['t'] = (pos['st'] - th + i_y)/zoom;
					}else{
						pos['t'] = (pos['et'] - th + i_y)/zoom;
					}

                    if(pos['sl'] < pos['el']){
						pos['l'] = (pos['sl'] - tl + i_x)/zoom;
					}else{
						pos['l'] = (pos['el'] - tl + i_x)/zoom;
					}

					var callback = _this.options.callback;
					if ($.isFunction(callback)){ callback(pos); }
					return false;
				}
			});


		},
		_setOptions: function( options ) {
            var _this = this;
            $.each( options, function( key, value ) {
                _this._setOption( key, value );
            });
        },

        _setOption: function( key, value ) {
            this._super( key, value );
        }
	});
};
module.exports = window.UiShapeEditor = UiShapeEditor;