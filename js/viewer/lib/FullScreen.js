define(["jquery","screenfull"], function ($) {
    return {
		request: function(){
			var _this = this;
			var xxx = $('.container')[0]; 
			if (screenfull.enabled) {


				var sAgent = window.navigator.userAgent;
				var Idx = sAgent.indexOf("MSIE");
				if (Idx > 0) {
					screenfull.request();					
				}else{
					screenfull.request(xxx);

				}
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
});