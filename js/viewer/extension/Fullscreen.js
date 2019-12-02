
var screenfull = require('../lib/screenfull');

module.exports = {
	request: function(){
		var _this = this;
		var xxx = $('body')[0]; 
		if (screenfull.enabled) {


			var sAgent = window.navigator.userAgent;
			var Idx = sAgent.indexOf("MSIE");
			if (Idx > 0) {
				screenfull.request();					
			}else{
				screenfull.request(xxx);
			}
			//$("body").addClass("fullscreen");
			
			// Ignore or do something else
		}
	},
	exit: function() {
		screenfull.exit();
	},
	isEnabled : function(){
		if (screenfull.enabled) {
			return true;
		} else {
			return false;
		}
	},

	isFullScreen : function(){
		if(screenfull.isFullscreen){
			//$("body").addClass("fullscreen");
			return true;
		} else {

			
			return false;
		}

	},

	resize : function(isFull){
	},

	change : function(callback1,callback2){
		var _this = this;
		if (this.isEnabled()) {
			document.addEventListener(screenfull.raw.fullscreenchange, function () {
				if(screenfull.isFullscreen){
					//$(".toolbar").hide();

					callback1();
					_this.resize(true);

				} else {
					_this.resize(false);
					callback2();
				};
			});
		}
	}
};
