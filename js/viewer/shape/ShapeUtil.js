define(['jquery', "shape/Path", "DefaultShape", "SettingsDef", "jquery-ui-shape-editor"], function($, PathShape, DefaultShape, SettingsDef){
    var shapeObjList = {};



    var createShapeMobile = function(pathType, prst, pos, callback){
        var _this = this;
        
        console.log(pathType);
        var shp = {
            "fontSize" :SettingsDef.annotation.fontSize,
            "fontColor" :SettingsDef.annotation.fontColor,
            "fontFamily" :SettingsDef.annotation.fontFamily,
            "w" :pos.w,
            "h" :pos.h,
            "stroke_color" :SettingsDef.annotation.bgColor,
            "stroke_width" :1,
            "fill_color" :SettingsDef.annotation.bgColor,
            "user" :SettingsDef.loading.userinfo
        };

       
        pos["stroke_width"] = 4;
       

		$.extend(true, pos, shp);

		var defaultShape = new DefaultShape();
        var wrap = "";
        
        wrap = defaultShape.createMemo(shp);
        
		var spid = $(wrap).attr("spid");
		$(".kk_selected_space").append(wrap);
		if ($.isFunction(callback)){ callback(wrap); }
    };

	var renderShapeMobile = function(pathType, shp, box, callback){
		var _this = this;
        var shpO = {
            "w" :shp.w,
			"h" :shp.h,
			"stroke_color" :shp['stroke_color'],
			"stroke_width" :shp['stroke_width'],
            "stroke_type" :shp['stroke_type'],
            "stroke_opacity":shp["stroke_opacity"],
            "fill_opacity":shp["fill_opacity"],
            "fill_color" :shp['fill'],
            "adddate":shp.adddate,
            "modifydate":shp.modifydate,
            "userinfo":shp.userinfo
		};

		var shapeSVG = null;
        if(pathType == "rect"){
		    shapeSVG = _this.getShapeSVGMobile(shp["prstgeom"],shpO);
        }else if(pathType == "line"){
            shapeSVG = _this.getLineSVGMobile(shp["prstgeom"],shp);
        }
		var defaultShape = new DefaultShape();


		var wrap = "";
        if(pathType == "memo"){
            wrap = defaultShape.createMemo(shp,box);
            var spid = $(wrap).attr("spid");
			box.append(wrap);
            var spobj = box.find(".memo[spid='"+spid+"']");
            spobj.css({"transform":"rotate("+shp.degree+"deg)","transform-origin":"0 0"});
            spobj.find(".txFt").html(shp.content.text).css(shp.content.style);
        } else if(pathType == "stamp"){
            //console.log(shp);
            wrap = defaultShape.createStamp(shp.prstgeom,shp,box);
            var spid = $(wrap).attr("spid");
			box.append(wrap);
            var spobj = box.find(".stamp[spid='"+spid+"']");
            //spobj.css({"transform":"rotate(0deg)","transform-origin":"0 0"});

        } else if(pathType == "line"){
			wrap = defaultShape.createShape(shp["prstgeom"],shp,shapeSVG,box);
            var spid = $(wrap).attr("spid");
            
			box.append(wrap);
		    var shaprot = Math.abs(shp.degree);
			var spobj = box.find(".line[spid='"+spid+"']");
			spobj.css({"left":shp['x']+"px","top":shp['y']+"px","width":shp['w']+"px","height":shp['h']+"px","transform":"rotate("+shp.degree+"deg)","transform-origin":"0 0" });
            spobj.attr("key",shp.key);

            spobj.attr("prot",shaprot);

			var targetWrap = spobj.find(".objectData");
            targetWrap.find("kkshape").attr("shape-fill-color",shp['fill']);
            targetWrap.find("kkshape").attr("shape-fill-opacity",shp['fill_opacity']);
            targetWrap.find("kkshape svg path").attr("fill",shp['fill']);
            targetWrap.find("kkshape svg > path").attr("fill-opacity",shp['fill_opacity']);

			targetWrap.find("kkshape").attr("shape-stroke-color",shp['stroke_color']);
            targetWrap.find("kkshape svg > path").attr("stroke",shp['stroke_color']).css("stroke",shp['stroke_color']);
            targetWrap.find("kkshape svg polyline").attr("stroke",shp['stroke_color']).css("stroke",shp['stroke_color']);
            targetWrap.find("kkshape svg > path").attr("stroke",shp['stroke_opacity']).css("stroke",shp['stroke_opacity']);  
            targetWrap.find("kkshape svg polyline").attr("stroke",shp['stroke_opacity']).css("stroke",shp['stroke_opacity']);     
            
			targetWrap.find("kkshape").attr("shape-stroke-width",shp['stroke_width']);
			targetWrap.find("kkshape svg > path").attr("stroke-width",shp['stroke_width']).css("stroke-width",shp['stroke_width']);
            targetWrap.find("kkshape svg polyline").attr("stroke-width",shp['stroke_width']).css("stroke-width",shp['stroke_width']);
            

           

			var dash = _this.getDashLineType(shp['stroke_type']);
			if(dash == ""){
				targetWrap.find("kkshape svg > path").removeAttr("stroke-dasharray");
				targetWrap.find("kkshape svg polyline").removeAttr("stroke-dasharray");
			}else if(dash == "none"){
				targetWrap.find("kkshape").attr("shape-stroke-type","none");
				targetWrap.find("kkshape svg > path").attr("stroke","none").css("stroke","none");
				targetWrap.find("kkshape svg polyline").attr("stroke","none").css("stroke","none");
			}else{
				targetWrap.find("kkshape").attr("shape-stroke-type",dash);
				targetWrap.find("kkshape svg > path").attr("stroke-dasharray",dash).css("stroke-dasharray",dash);
				targetWrap.find("kkshape svg polyline").attr("stroke-dasharray",dash).css("stroke-dasharray",dash);
            }

        } else {
			wrap = defaultShape.createShape(shp["prstgeom"],shp,shapeSVG,box);
			var spid = $(wrap).attr("spid");
			box.append(wrap);
		    var shaprot = shp.degree - (shp.rotate + shp.degree);
			var spobj = box.find(".shape[spid='"+spid+"']");
			spobj.css({"left":shp['x']+"px","top":shp['y']+"px","width":shp['w']+"px","height":shp['h']+"px","transform":"rotate("+shp.degree+"deg)","transform-origin":"0 0" });
			spobj.attr("key",shp.key);
			var targetWrap = spobj.find(".objectData");
            targetWrap.find("kkshape").attr("shape-fill-color",shp['fill']);
            targetWrap.find("kkshape").attr("shape-fill-opacity",shp['fill_opacity']);
            targetWrap.find("kkshape svg path").attr("fill",shp['fill']);
            targetWrap.find("kkshape svg > path").attr("fill-opacity",shp['fill_opacity']);
            
			targetWrap.find("kkshape").attr("shape-stroke-color",shp['stroke_color']);
			targetWrap.find("kkshape svg > path").attr("stroke",shp['stroke_color']).css("stroke",shp['stroke_color']);
            targetWrap.find("kkshape svg polyline").attr("stroke",shp['stroke_color']).css("stroke",shp['stroke_color']);
            targetWrap.find("kkshape svg > path").attr("stroke",shp['stroke_opacity']).css("stroke",shp['stroke_opacity']);  
			targetWrap.find("kkshape svg polyline").attr("stroke",shp['stroke_opacity']).css("stroke",shp['stroke_opacity']);                        
			targetWrap.find("kkshape").attr("shape-stroke-width",shp['stroke_width']);
			targetWrap.find("kkshape svg > path").attr("stroke-width",shp['stroke_width']).css("stroke-width",shp['stroke_width']);
			targetWrap.find("kkshape svg polyline").attr("stroke-width",shp['stroke_width']).css("stroke-width",shp['stroke_width']);

			var dash = _this.getDashLineType(shp['stroke_type']);
			if(dash == ""){
				targetWrap.find("kkshape svg > path").removeAttr("stroke-dasharray");
				targetWrap.find("kkshape svg polyline").removeAttr("stroke-dasharray");
			}else if(dash == "none"){
				targetWrap.find("kkshape").attr("shape-stroke-type","none");
				targetWrap.find("kkshape svg > path").attr("stroke","none").css("stroke","none");
				targetWrap.find("kkshape svg polyline").attr("stroke","none").css("stroke","none");
			}else{
				targetWrap.find("kkshape").attr("shape-stroke-type",dash);
				targetWrap.find("kkshape svg > path").attr("stroke-dasharray",dash).css("stroke-dasharray",dash);
				targetWrap.find("kkshape svg polyline").attr("stroke-dasharray",dash).css("stroke-dasharray",dash);
            }
            spobj.find(".txFt").html(shp.content.text).css(shp.content.style);
		}

		if ($.isFunction(callback)){ callback(spobj); }
    };

    var setPositionType = function(shapeGroupNode, type){
        if(type == "floating"){
            shapeGroupNode.style.position = "absolute";
            shapeGroupNode.style.display = "";
        }else if(type == "inline"){
            shapeGroupNode.style.position = "relative";
            shapeGroupNode.style.display = "inline-block";
        }
    };

    var setPosition = function(shapeGroupNode, left, top){
        if(left != null){
            shapeGroupNode.style.left = left+"px";
        }
        if(top != null){
            shapeGroupNode.style.top = top+"px";
        }
    };

    var setAdjustPosition = function(shapeGroupNode, adjLeft, adjTop){
        if(adjLeft != null){
            var left = shapeGroupNode.style.left;
            if(left){
                left = Number(left.split("px")[0]) + adjLeft;
            }else{
                left = adjLeft;
            }
            shapeGroupNode.style.left = left+"px";
        }
        if(adjTop != null){
            var top = shapeGroupNode.style.top;
            if(top){
                top = Number(top.split("px")[0]) + adjTop;
            }else{
                top = adjTop;
            }

            shapeGroupNode.style.top = top+"px";
        }
    };

    var setStroke = function(shapeGroupNode, color , width , opacity){
        var _this = this;
        $(shapeGroupNode).children().each(function(){
            var shapeNode = this;

            color = (color) ?  color : _this.defaultValue.STROKE_COLOR;
            width = (width) ?  width : _this.defaultValue.STROKE_WIDTH;
            opacity = (opacity) ?  opacity : _this.defaultValue.STROKE_OPACITY;

            var shapeName = shapeNode.getAttribute("kk-shape-name");
            var shapeObj = _this.getShapeObj(shapeName);

            if (! shapeObj){
                return false;
            }

            shapeNode.setAttribute("shape-stroke-width", width);
            shapeNode.setAttribute("shape-stroke-color", color);
            shapeNode.setAttribute("shape-stroke-opacity", opacity);

            shapeObj.setStroke(shapeNode, color, opacity, width);
        });
    };

    var setFill = function(shapeGroupNode, color , opacity){
        var _this = this;
        $(shapeGroupNode).children().each(function(){
            var shapeNode = this;

            color = (color) ?  color : _this.defaultValue.FILL_COLOR;
            opacity = (opacity) ?  opacity : _this.defaultValue.FILL_OPACITY;

            var shapeName = shapeNode.getAttribute("kk-shape-name");
            var shapeObj = _this.getShapeObj(shapeName);

            if (! shapeObj){
                return false;
            }

            shapeNode.setAttribute("shape-fill-color", color);
            shapeNode.setAttribute("shape-fill-opacity", opacity);
            shapeObj.setFill(shapeNode, color, opacity);
        });
    };

    var getStrokWidth = function(shapeGroupNode){
        var strokeW = 0;
        $(shapeGroupNode).children().each(function(){
            var _strokeW = this.getAttribute("shape-stroke-width");
            if(_strokeW && strokeW < _strokeW){
                strokeW = Number(_strokeW);
            }
        });

        return strokeW;
    };

	var getRotationDegrees = function (obj) {
		var matrix = obj.css("-webkit-transform") ||
		obj.css("-moz-transform")    ||
		obj.css("-ms-transform")     ||
		obj.css("-o-transform")      ||
		obj.css("transform");

        //console.log("--------------"+matrix);
		if(matrix !== 'none') {
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];
			var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		} else { var angle = 0; }
		(angle < 0) ? angle + 360 : angle;
		//var radians = angle*Math.PI/180;
        var radians = angle;
		return radians;
	};

	var getDashLineType = function(dash) {
		switch(dash) {
			case "solid":
				return "";
				break;
			case "dot":
			case "sysDot":
				return "5,5";
				break;
			case "sysDash":
				return "10,5";
				break;
			case "dash":
				return "15,10";
				break;
			case "dashDot":
			case "sysDashDot":
				return "15,10,5,10";
				break;
			case "lgDash":
				return "25,10";
				break;
			case "lgDashDot":
				return "25,10,5,10";
				break;
			case "lgDashDotDot":
			case "sysDashDotDot":
				return "25,10,5,10,5,10";
				break;
			default:
				return "none";
				break;
		};
	};

	var getMaxSpid = function(box){
		var arrayZ = [];
		var res = 1;
		if(typeof box === "undefined"){
			$("#currentSlide .shape").each(function(i,v){
				var spid = $(this).attr("spid");
				if(spid === undefined){
					spid = 1;
				}
				arrayZ.push(Number(spid));
			});
			$("#currentSlide .ln").each(function(i,v){
				var spid = $(this).attr("spid");
				if(spid === undefined){
					spid = 1;
				}
				arrayZ.push(Number(spid));
			});
		}else{
			box.find(".shape").each(function(i,v){
				var spid = $(this).attr("spid");
				if(spid === undefined){
					spid = 1;
				}
				arrayZ.push(Number(spid));
			});
			box.find(".ln").each(function(i,v){
				var spid = $(this).attr("spid");
				if(spid === undefined){
					spid = 1;
				}
				arrayZ.push(Number(spid));
			});

		}

		if(arrayZ.length > 0 ){
			res = max(arrayZ) + 1;
		} else {
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
    };
    
    var makeKey = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    return {
        shapeInstanceList : {},
        defaultValue : {
            STROKE_COLOR : "#5F678E",
            STROKE_WIDTH : "1",
            STROKE_OPACITY : "1",
            FILL_COLOR : "#5b9bd5",
            FILL_OPACITY : "1"
        },

        shapeObjList : shapeObjList,





		createShapeMobile : createShapeMobile,

		renderShapeMobile : renderShapeMobile,

		setPositionType : setPositionType,

        setPosition : setPosition,

        setAdjustPosition : setAdjustPosition,

        setStroke : setStroke,

        setFill : setFill,

        getStrokWidth : getStrokWidth,

		getRotationDegrees : getRotationDegrees,

		getDashLineType : getDashLineType,

        getMaxSpid:getMaxSpid,
        
        makeKey:makeKey
    };
});
