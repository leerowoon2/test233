define(['jquery'], function($){

    var AbstractShape = function(){
    };

    var create = function(){
        var svg = $('<svg style="width:inherit;height:inherit;"><path></path></svg>');
        return svg;
    };

    var setD = function(){
        error("need override function !!!");
    };

    var setStroke = function(shape, color, opacity, width, type){
        var path = $(shape).find("path")[0];
		var dashLine = this.getDashLineType(type);
        path.setAttributeNS(null, "stroke", color);
        path.setAttributeNS(null, "stroke-width", width);
        path.setAttributeNS(null, "stroke-opacity", opacity);

		if(dashLine != ""){
			path.setAttributeNS(null, "stroke-dasharray", dashLine);
		}
    };

    var getDashLineType =  function(dash) {
        switch( dash ) {
            case "solid":
                return "";
                break;
            case "dot":
            case "sysDot":
                return '10,10';
                break;
            case "sysDash":
                return '20,10';
                break;
            case "dash":
                return '30,20';
                break;
            case "dashDot":
                return '10,10';
                break;
            case "lgDash":
                return '10,10';
                break;

            case "lgDashDot":
                return '10,10';
                break;
            case "lgDashDotDot":
                return '10,10';
                break;

            case "sysDashDot":
            case "sysDashDotDot":
                return '10,10';
                break;
            default:
                return "";
                break;
        }
    };

    var setFill = function(shape, color, opacity){
        var path = $(shape).find("path")[0];
        path.setAttributeNS(null, "fill", color);
        path.setAttributeNS(null, "fill-opacity", opacity);
    };

    var sqrt = function(number){
        if(number < 0){
            number = number * -1;
            return Math.sqrt(number) * -1;
        }
        return Math.sqrt(number);
    };

    AbstractShape.prototype = {
        xmlns : "http://www.w3.org/2000/svg",
        defaultValue : { width : 95.8, height : 95.8 }, //OOXML의 Default 값(914400)을 px 로 변경한 값.
        create : create,
        setD : setD,
        setStroke : setStroke,
		getDashLineType : getDashLineType,
        setFill : setFill,
        sqrt : sqrt
    };

    return AbstractShape;

});
