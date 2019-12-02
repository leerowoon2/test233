define(['jquery'], function($){
    var DefaultShape = function(){
	

		this.createMemo = function (pos,box){
			var _this = this;
			var now = _this.getInfo();
            var spid = _this.getMaxSpid(box);
			var zindex = _this.getMaxZindex();
			
			var lock = "";
            if(pos.lock == "true"){
				lock = "lock";
			}

            var wrap = '<div kktype="mm" class="memo '+lock+'" spid="'+spid+'" style="position:absolute;top:'+pos.t+'px;left:'+pos.l+'px;width:'+pos.w+'px;height:'+pos.h+'px;z-index:'+zindex+';">' +
							'<div class="kk-memo-content"><div class="txFt" style="font-size:'+pos.fontSize+'px;color:'+pos.fontColor+';font-family:\''+pos.fontFamily+'\';"></div></div>' +
							'<div class="information" user="'+pos.user+'" adddate="'+pos.adddate+'" modifydate="'+pos.modifydate+'" psw="'+pos.password+'"></div>' +
                        '</div>';
			return wrap;
		};

		this.getPosition = function (iw,ih){
            var sw = $("#currentSlide").width();
            var sh = $("#currentSlide").height();
			var _w=0, _h=0, _t=0, _l=0;
			if(iw > ih){
				if(sw > sh){
					if(iw > sw){
						_h = (ih/iw)*sw;
						_w = sw;
						_t = ((sh/2)-(_h/2));
						_l = 0;
					} else {
						_h = ih;
						_w = iw;
						_t = ((sh/2) - (_h/2));
						_l = ((sw/2) - (_w/2));
					}
				}else{
					if(ih > sh){
						_h = sh;
						_w = (iw/ih)*sh;
						_t = 0;
						_l = ((sw/2)-(_w/2));
					} else {
						_h = ih;
						_w = iw;
						_t = ((sh/2) - (_h/2));
						_l = ((sw/2) - (_w/2));
					}
				}
			}else{
				//세로 큼
				if(sw > sh){
					//가로 큼
					if(ih > sh){
						_h = sh;
						_w = (iw/ih)*sh;
						_t = 0;
						_l = ((sw/2)-(_w/2));
					} else {
						_h = ih;
						_w = iw;
						_t = ((sh/2) - (_h/2));
						_l = ((sw/2) - (_w/2));
					}
				}else{
					if(iw > sw){
						_h = (ih/iw)*sw;
						_w = sw;
						_t = ((sh/2)-(_h/2));
						_l = 0;
					} else {
						_h = ih;
						_w = iw;
						_t = ((sh/2) - (_h/2));
						_l = ((sw/2) - (_w/2));
					}
				}
			}
			var res = {
				w:_w,
				h:_h,
				l:_l,
				t:_t
			};
			return res;
		};

        this.getMaxZindex = function(){
            var arrayZ = [];
			var res = 1;
            $("#currentSlide > div > .shape").each(function(i,v){
                arrayZ.push(Number($(this).css("z-index")));
            });

			if(arrayZ.length > 0 ){
				res = max(arrayZ) + 1;
			}else{
				res = 1;
			}
            return res;

            function max(arr){
                var max = arr[0];
                var maxIndex = 0;
                for (var i = 1; i < arr.length; i++) {
                    if (arr[i] > max) {
                        maxIndex = i;
                        max = arr[i];
                    }
                }
                return max;
            }
        }

        this.getMaxSpid = function(box){
            var arrayZ = [];
			var res = 1;
            if(typeof box === "undefined"){
				$("#kk_shape > div").each(function(i,v){
					var spid = $(this).attr("spid");
					if(spid === undefined){
						spid = 1;
					}
					arrayZ.push(Number(spid));
				});
			}else{
				box.find("> div").each(function(i,v){
					var spid = $(this).attr("spid");
					if(spid === undefined){
						spid = 1;
					}
					arrayZ.push(Number(spid));
				});
			}

			if(arrayZ.length > 0 ){
				res = max(arrayZ) + 1;
			}else{
				res = 10;
			}
            return res;

            function max(arr){
                var max = arr[0];
                var maxIndex = 0;
                for (var i = 1; i < arr.length; i++) {
                    if (arr[i] > max) {
                        maxIndex = i;
                        max = arr[i];
                    }
                }
                return max;
            }
		}
		
		this.getInfo = function(){
			function pad2(n) { return n < 10 ? '0' + n : n }
			var date = new Date();
			return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds() );
		}
    };
    return DefaultShape;
});
