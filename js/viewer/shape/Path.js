define(['jquery', "shape/AbstractShape"], function($, AbstractShape){


    var line = function(){
        this.setD = function(shape, _w, _h){
            var path = $(shape).find("path")[0];
            var d = "M0,0 "+_w+","+_h+"";
            path.setAttributeNS(null, "d", d);
        };
    };

    var line2 = function(){

    };

    var memo = function(){
        this.setD = function(shape, _w, _h){
        };
    };

    var rect = function(){
        this.setD = function(shape, _w, _h){
            var path = $(shape).find("path")[0];
            var d = "M0 0 L0 "+_h+" L"+_w+" "+_h+" L"+_w+" 0 L0 0 Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var alpharect = function(){
        this.setD = function(shape, _w, _h){
            var path = $(shape).find("path")[0];
            var d = "M0 0 L0 "+_h+" L"+_w+" "+_h+" L"+_w+" 0 L0 0 Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var roundRect = function(){
        this.setD = function(shape, width, height, adj){ /*adj : percentage (0~100)*/

            if(adj[0]== null){ adj[0] = 0.16; }else{ adj[0] = adj[0]/100; }

            var path = $(shape).find("path")[0];
            var adjVal1 = 0;
            var adjVal2 = 0;
            var adjVal3 = 0;
            if(width >= height){
                adjVal1 = adj[0]*height;
                adjVal2 = width-(adj[0]*height);
                adjVal3 = height-(adj[0]*height);
            }else{
                adjVal1 = adj[0]*width;
                adjVal2 = width-(adj[0]*width);
                adjVal3 = height-(adj[0]*width);
            }
            var d = "";
            d += "M 0,"+adjVal1+" Q0,0 "+adjVal1+",0 L"+adjVal2+",0 Q"+width+",0 "+width+","+adjVal1+" L"+width+","+adjVal3+" Q"+width+","+height+" "+adjVal2+","+height+" L"+adjVal1+","+height+" Q0,"+height+" 0,"+adjVal3+" L0,"+adjVal1+"   Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var snip1Rect = function(){
        this.setD = function(shape, width, height, adj){ /*adj : percentage (0~100)*/
            if(adj[0] == null){ adj[0] = 0.16; }else{ adj[0] = adj[0]/100; }

            var target = (width  < height)? width : height;
            var adjValue = target * adj[0];
            var path = $(shape).find("path")[0];

            var d = "";
            d += "M0 0 ";
            d += "L0 " + (height) +" ";
            d += "L" + (width) +" "+ (height) +" ";
            d += "L" + (width) +" "+ (adjValue) +" ";
            d += "L" + (width-adjValue) +" 0 ";
            d += "L0 0 Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var snip2SameRect = function(){
        this.setD = function(shape, width, height, adj){ /*adj1 : percentage (0~100) - top , adj : percentage (0~100) - bottom */
            if(adj[0]== null){ adj[0] = 0.16; }else{ adj[0] = adj[0]/100; }
            if(adj[1]== null){ adj[1] = 0; }else{ adj[1] = adj[1]/100; }

            var target = (width  < height)? width:height;
            var adjValue1 = target * adj[0];
            var adjValue2 = target * adj[1];
            var path = $(shape).find("path")[0];

            var d = "";
            d += "M" + adjValue1 + " " + 0 +" ";
            d += "L" + (width - adjValue1) + " " + 0 +" ";
            d += "L" + width +" "+ adjValue1 +" ";
            d += "L" + width +" "+ (height-adjValue2) +" ";
            d += "L" + (width-adjValue2) +" "+ height +" ";
            d += "L" + adjValue2 +" "+ height +" ";
            d += "L" + 0 +" "+ (height-adjValue2) +" ";
            d += "L" + 0 +" "+ adjValue1 +" ";
            d += "L" + adjValue1 + " " + 0 +" Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var snip2DiagRect = function(){
        this.setD = function(shape, width, height, adj){ /*adj1 : percentage (0~100) - left , adj : percentage (0~100) - right */

            if(adj[0]== null){ adj[0] = 0; }else{ adj[0] = adj[0]/100; }
            if(adj[1]== null){ adj[1] = 0.2; }else{ adj[1] = adj[1]/100; }

            var target = (width  < height)? width:height;
            var adjValue1 = target * adj[0];
            var adjValue2 = target * adj[1];
            var path = $(shape).find("path")[0];

            var d = "";
            d += "M" + adjValue1 + " " + 0 +" ";
            d += "L" + 0 +" " + adjValue1 + " ";
            d += "L" + 0 +" " + (height-adjValue2) + " ";
            d += "L" + adjValue2 +" " + height + " ";
            d += "L" + (width - adjValue1) +" " + height + " ";
            d += "L" + width +" " + (height - adjValue1) + " ";
            d += "L" + width +" " + adjValue2 + " ";
            d += "L" + (width - adjValue2) +" " + 0 + " ";
            d += "L" + adjValue1 + " " + 0 +" Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var snipRoundRect = function(){
        this.setD = function(shape, width, height, adj){ /*adj1 : percentage (0~100) - left , adj : percentage (0~100) - right */
            if(adj[0]== null){ adj[0] = 0.16; }else{ adj[0] = adj[0]/100; }
            if(adj[1]== null){ adj[1] = 0.16; }else{ adj[1] = adj[1]/100; }
            var target = (width  < height)? width:height;
            var adjValue1 = target * adj[0];
            var adjValue2 = target * adj[1];
            var path = $(shape).find("path")[0];

            var d = "";
            d += "M" + adjValue1 +" "+ 0 +" ";
            d += "A" + adjValue1 + " " + adjValue1 + " " + "0 0 0 " + 0 + " " + adjValue1 + " ";
            d += "L0 " + height +" ";
            d += "L" + width +" "+ height +" ";
            d += "L" + width +" "+ adjValue2 +" ";
            d += "L" + (width - adjValue2) +" "+ 0 +" ";
            d += "L" + adjValue1 +" "+ 0 +" Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var round1Rect = function(){
        this.setD = function(shape, width, height, adj){ /*adj1 : percentage (0~100) */
            if(adj[0]== null){ adj[0] = 0.16; }else{ adj[0] = adj[0]/100; }
            var target = (width  < height)? width:height;
            var adjValue = target * adj[0];
            var path = $(shape).find("path")[0];

            var d = "";
            d += "M0 0 ";
            d += "L0 " + height +" ";
            d += "L" + width +" "+ height +" ";
            d += "L" + width +" "+ adjValue +" ";
            d += "A" + adjValue + " " + adjValue + " " + "0 0 0 " + (width - adjValue) + " " + 0 + " ";
            d += "L0 0 Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var round2SameRect = function(){
        this.setD = function(shape, width, height, adj){ /*adj1 : percentage (0~100) - top , adj : percentage (0~100) - bottom */
            if(adj[0]== null){ adj[0] = 0.16; }else{ adj[0] = adj[0]/100; }
            if(adj[1]== null){ adj[1] = 0; }else{ adj[1] = adj[1]/100; }

            var target = (width  < height)? width:height;
            var adjValue1 = target * adj[0];
            var adjValue2 = target * adj[1];
            var path = $(shape).find("path")[0];

            var d = "";
            d += "M" + adjValue1 + " " + 0 +" ";
            d += "A" + adjValue1 + " " + adjValue1 + " " + "0 0 0 " + 0 + " " + adjValue1+ " ";
            d += "L" + 0 + " " + (height - adjValue2) + " ";
            d += "A" + adjValue2 + " " + adjValue2 + " " + "0 0 0 " + adjValue2 + " " + height + " ";
            d += "L" + (width - adjValue2) + " " + height + " ";
            d += "A" + adjValue2 + " " + adjValue2 + " " + "0 0 0 " + width + " " + (height-adjValue2) + " ";
            d += "L" + width + " " + adjValue1 + " ";
            d += "A" + adjValue1 + " " + adjValue1 + " " + "0 0 0 " + (width-adjValue1) + " " + 0 + " ";
            d += "L" + adjValue1 + " " + 0 + " Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var round2DiagRect = function(){
        this.setD = function(shape, width, height, adj){ /*adj1 : percentage (0~100) - left , adj : percentage (0~100) - right */
            if(adj[0]== null){ adj[0] = 0.16; }else{ adj[0] = adj[0]/100; }
            if(adj[1]== null){ adj[1] = 0; }else{ adj[1] = adj[1]/100; }
            var target = (width  < height)? width:height;
            var adjValue1 = target * adj[0];
            var adjValue2 = target * adj[1];
            var g = $(shape).find("g")[0];
            var path = $(shape).find("path")[0];

            var d = "";
            d += "M" + adjValue1 + " " + 0 +" ";
            d += "A" + adjValue1 + " " + adjValue1 + " " + "0 0 0 " + 0 + " " + adjValue1+ " ";
            d += "L" + 0 + " " + (height - adjValue2) + " ";
            d += "A" + adjValue2 + " " + adjValue2 + " " + "0 0 0 " + adjValue2 + " " + height + " ";
            d += "L" + (width - adjValue1) + " " + height + " ";
            d += "A" + adjValue1 + " " + adjValue1 + " " + "0 0 0 " + width + " " + (height-adjValue1) + " ";
            d += "L" + width + " " + adjValue1 + " ";
            d += "A" + adjValue2 + " " + adjValue2 + " " + "0 0 0 " + (width-adjValue2) + " " + 0 + " ";
            d += "L" + adjValue1 + " " + 0 + " Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var ellipse = function(){
        this.setD = function(shape, width, height, adj){
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + (width*0.5) + " 0 ";
            d += "A" + (width*0.5) + " " + (height*0.5) + " 0 0 0 " + (width*0.5) + " " + height+ " ";
            d += "A" + (width*0.5) + " " + (height*0.5) + " 0 0 0 " + (width*0.5) + " 0 Z";

            path.setAttributeNS(null, "d", d);
        };
    };


    var alphaellipse = function(){
        this.setD = function(shape, width, height, adj){
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + (width*0.5) + " 0 ";
            d += "A" + (width*0.5) + " " + (height*0.5) + " 0 0 0 " + (width*0.5) + " " + height+ " ";
            d += "A" + (width*0.5) + " " + (height*0.5) + " 0 0 0 " + (width*0.5) + " 0 Z";

            path.setAttributeNS(null, "d", d);
        };
    };



    var triangle = function(){
        this.setD = function(shape, width, height, adj){
            if(adj[0]== null){ adj[0] = 0.5; }else{ adj[0] = adj[0]/100; }
            var adjValue = width * adj[0];
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + (0 + adjValue) + " " + 0 +" ";
            d += "L" + 0 + " " + height +" ";
            d += "L" + width + " " + height +" ";
            d += "L" +  (0 + adjValue) + " " + 0 +" Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var rtTriangle = function(){
        this.setD = function(shape, width, height, adj){
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0 0 ";
            d += "L" + 0 + " " + height +" ";
            d += "L" + width + " " + height +" ";
            d += "L0 0 Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var parallelogram = function(){
        this.setD = function(shape, width, height, adj){
            if(adj[0]== null){ adj[0] = 0.25; }else{ adj[0] = adj[0]/100; }
            var target = (width  < height)? width:height;
            var adjValue = target * adj[0];
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + (0 + adjValue) + " " + 0 +" ";
            d += "L" + 0 + " " + height +" ";
            d += "L" + (width - adjValue) + " " + height +" ";
            d += "L" +  width + " " + 0 +" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var trapezoid = function(){
        this.setD = function(shape, width, height, adj){
            if(adj[0]== null){ adj[0] = 0.25; }else{ adj[0] = adj[0]/100; }
            var target = (width  < height)? width:height;
            var adjValue = target * adj[0];
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + (0 + adjValue) + " " + 0 +" ";
            d += "L" + 0 + " " + height +" ";
            d += "L" + width + " " + height +" ";
            d += "L" + (width-adjValue) + " " + 0 +" Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var diamond = function(){
        this.setD = function(shape, width, height, adj){
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + (width/2) + " " + 0 +" ";
            d += "L" + 0 + " " + (height/2) +" ";
            d += "L" + (width/2) + " " + height +" ";
            d += "L" + width + " " + (height/2) +" ";
            d += "L" +  (width/2) + " " + 0 +" Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var pentagon = function(){
        this.setD = function(shape, width, height, adj){
            var path = $(shape).find("path")[0];

            var cx = width/2;
            var cy = height/2;
            var rx = cx;
            var ry = cy;

            var pList = [];
            var pointCnt = 5;
            var d = 360/pointCnt;

            var startD = 270;
            for(var i=0; i<pointCnt; i++){
                var r = startD*(Math.PI/180);
                var x = Math.round(Math.cos(r)*rx) + cx;
                var y = Math.round(Math.sin(r)*ry) + cy;

                startD = startD+d;
                pList.push({x:x , y:y});
            }

            var d = "";
            d += "M" + pList[0].x + " " + pList[0].y +" ";
            for(var i=1; i<pointCnt; i++){
                d += "L" + pList[i].x + " " + pList[i].y +" ";
                if(i==(pointCnt-1)){
                    d +="Z"
                }
            }
            path.setAttributeNS(null, "d", d);
        };
    };

    var hexagon = function(){
        //this.defaultValue = { width : 111.2, height : 95.8 };
        this.setD = function(shape, width, height, adj){

            if(adj[0]== null){ adj[0] = 0.25; }else{ adj[0] = adj[0]/100; }
            var target = (width  < height)? width:height;
            var adjValue = target * adj[0];
            var path = $(shape).find("path")[0];
            var cx = width/2;
            var cy = height/2;
            var d = "";
            d += "M" + width + " " + cy +" ";
            d += "L" + (width-adjValue) + " " + height +" ";
            d += "L" + (adjValue) + " " + height +" ";
            d += "L" + 0 + " " + cy +" ";
            d += "L" + (adjValue) + " " + 0 +" ";
            d += "L" + (width-adjValue) + " " + 0 +" ";
            d += "L" + width + " " + cy +"Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var heptagon = function(){
        this.setD = function(shape, width, height, adj){
            var path = $(shape).find("path")[0];

            var cx = width/2;
            var cy = height/2;
            var rx = cx;
            var ry = cy;

            var pList = [];
            var pointCnt = 7;
            var d = 360/pointCnt;

            var startD = 270;
            for(var i=0; i<pointCnt; i++){
                var r = startD*(Math.PI/180);
                var x = Math.round(Math.cos(r)*rx) + cx;
                var y = Math.round(Math.sin(r)*ry) + cy;

                startD = startD+d;
                pList.push({x:x , y:y});
            }

            var d = "";
            d += "M" + pList[0].x + " " + pList[0].y +" ";
            for(var i=1; i<pointCnt; i++){
                d += "L" + pList[i].x + " " + pList[i].y +" ";
                if(i==(pointCnt-1)){
                    d +="Z"
                }
            }
            path.setAttributeNS(null, "d", d);
        };
    };

    var octagon = function(){
        this.setD = function(shape, width, height, adj){
            if(adj[0]== null){ adj[0] = 0.25; }else{ adj[0] = adj[0]/100; }
            var target = (width  < height)? width:height;
            var adjValue = target * adj[0];
            var path = $(shape).find("path")[0];

            var d = "";
            d += "M" + adjValue + " " + 0 +" ";
            d += "L" + 0 + " " + adjValue +" ";
            d += "L" + 0 + " " + (height-adjValue) +" ";
            d += "L" + adjValue + " " + height +" ";
            d += "L" + (width-adjValue) + " " + height +" ";
            d += "L" + width + " " + (height-adjValue) +" ";
            d += "L" + width + " " + adjValue +" ";
            d += "L" + (width-adjValue) + " " + 0 +" ";
            d += "L" + adjValue + " " + 0 +" Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var decagon = function(){
        this.setD = function(shape, width, height){
            var path = $(shape).find("path")[0];

            var cx = width/2;
            var cy = height/2;
            var rx = cx;
            var ry = cy;

            var pList = [];
            var pointCnt = 10;
            var d = 360/pointCnt;

            var startD = 270;
            for(var i=0; i<pointCnt; i++){
                var r = startD*(Math.PI/180);
                var x = Math.round(Math.cos(r)*rx) + cx;
                var y = Math.round(Math.sin(r)*ry) + cy;

                startD = startD+d;
                pList.push({x:x , y:y});
            }

            var d = "";
            d += "M" + pList[0].x + " " + pList[0].y +" ";
            for(var i=1; i<pointCnt; i++){
                d += "L" + pList[i].x + " " + pList[i].y +" ";
                if(i==(pointCnt-1)){
                    d +="Z"
                }
            }
            path.setAttributeNS(null, "d", d);
        };
    };

    var dodecagon = function(){
        this.setD = function(shape, width, height){
            var path = $(shape).find("path")[0];

            var cx = width/2;
            var cy = height/2;
            var rx = cx;
            var ry = cy;

            var pList = [];
            var pointCnt = 12;
            var d = 360/pointCnt;

            var startD = 270;
            for(var i=0; i<pointCnt; i++){
                var r = startD*(Math.PI/180);
                var x = Math.round(Math.cos(r)*rx) + cx;
                var y = Math.round(Math.sin(r)*ry) + cy;

                startD = startD+d;
                pList.push({x:x , y:y});
            }

            var d = "";
            d += "M" + pList[0].x + " " + pList[0].y +" ";
            for(var i=1; i<pointCnt; i++){
                d += "L" + pList[i].x + " " + pList[i].y +" ";
                if(i==(pointCnt-1)){
                    d +="Z"
                }
            }
            path.setAttributeNS(null, "d", d);
        };
    };

    var pie = function(){
        this.setD = function(shape, width , height, adj){
            //adj1 , adj2 �� degree
            if(adj[0] == null){ adj[0] = 0; }else{ adj[0] = adj[0]; }
            if(adj[1] == null){ adj[0] = 270; }else{ adj[1] = adj[1]; }
            var adjValue1 = adj[0]*(Math.PI/180);
            var adjValue2 = adj[1]*(Math.PI/180);
            var path = $(shape).find("path")[0];

            var cx = width/2;
            var cy = height/2;
            var rx = cx;
            var ry = cy;
            var x1 = Math.round(Math.cos(adjValue1)*rx) + cx;
            var y1 = Math.round(Math.sin(adjValue1)*ry) + cy;

            var x2 = Math.round(Math.cos(adjValue2)*rx) + cx;
            var y2 = Math.round(Math.sin(adjValue2)*ry) + cy;

            var d = "";
            d += "M" + x1 + " " + y1 +" ";
            d += "A" + cx + " " + cy + " " + "0 1 1 " + x2 + " " + y2+ " ";
            d += "L" + cx + " " + cy +" ";
            d += "L" + x1 + " " + y1 +"Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var chord = function(){
        this.setD = function(shape, width , height, adj){
            //adj1 , adj2 �� degree
            if(adj[0] == null){ adj[0] = 45; }else{ adj[0] = adj[0]; }
            if(adj[1] == null){ adj[0] = 270; }else{ adj[1] = adj[1]; }
            var adjValue1 = adj[0]*(Math.PI/180);
            var adjValue2 = adj[1]*(Math.PI/180);
            var path = $(shape).find("path")[0];
            var cx = width/2;
            var cy = height/2;
            var rx = cx;
            var ry = cy;
            var x1 = Math.round(Math.cos(adjValue1)*rx) + cx;
            var y1 = Math.round(Math.sin(adjValue1)*ry) + cy;

            var x2 = Math.round(Math.cos(adjValue2)*rx) + cx;
            var y2 = Math.round(Math.sin(adjValue2)*ry) + cy;

            var d = "";
            d += "M" + x1 + " " + y1 +" ";
            d += "A" + cx + " " + cy + " " + "0 1 1 " + x2 + " " + y2+ " ";
            d += "L" + x1 + " " + y1 +"Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var teardrop = function(){
        this.setD = function(shape, width , height, adj){

            if(adj[0] == null){ adj[0] = 1; }else{ adj[0] = adj[0]/100; }
            var adjValue1 = width * adj[0];
            var adjValue2 = height * adj[0];
            var path = $(shape).find("path")[0];
            var cx = width/2;
            var cy = height/2;
            var d = "";
            d += "M" + 0 + " " + cy +" ";
            d += "A" + cx + " " + cy +" " + "0 0 1 " + cx + " " + 0 +" ";
            d += "Q" + adjValue1 + " " + 0 + " " + adjValue1 + " " + (height-adjValue2) +" ";
            d += "Q" + width + " " + (height-adjValue2) + " " + width + " " + cy +" ";
            d += "A" + cx + " " + cy +" " + "0 0 1 " + cx + " " + height +" ";
            d += "A" + cx + " " + cy +" " + "0 0 1 " + 0 + " " + cy +"Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var frame = function(){
        this.create = function(){
            var svg = this.createSvg();
            var g = document.createElementNS ( this.xmlns, "g");
            var path = document.createElementNS ( this.xmlns, "path");
            path.setAttributeNS(null, "fill-rule", "evenodd");

            g.appendChild(path);
            svg.appendChild (g);

            return svg;
        };

        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.5; }else{ adj[0] = adj[0]/100; }
            var target = (width  < height)? width:height;
            var adjValue = target * adj[0];
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + 0 + " " + 0 +" ";
            d += "L" + 0 + " " + height +" ";
            d += "L" + width + " " + height +" ";
            d += "L" + width + " " + 0 +"";
            d += "L" + 0 + " " + 0 +"";

            d += "M" + adjValue + " " + adjValue +" ";
            d += "L" + adjValue + " " + (height-adjValue) +" ";
            d += "L" + (width-adjValue) + " " + (height-adjValue) +" ";
            d += "L" + (width-adjValue) + " " + adjValue +"Z";


            path.setAttributeNS(null, "d", d);
        };
    };

    var halfFrame = function(){
        this.setD = function(shape, width , height, adj1, adj2){ //adj1 - left , adj2 - top
            if(adj[0] == null){ adj[0] = 0.933; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.333; }else{ adj[1] = adj[1]/100; }

            var target = (width  < height)? width:height;
            var adjValue1 = target * adj[0];
            var adjValue2 = target * adj[1];
            var slope =  height/width;
            var interceptY = height-(slope * width);
            var y = (height-((slope * adjValue2) + interceptY));
            var x = (width -((adjValue1 - interceptY)/slope));

            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + 0 + " " + 0 +" ";
            d += "L" + 0 + " " + height +" ";
            d += "L" + adjValue2 + " " + y +" ";

            var px = adjValue2;
            var py = adjValue1;

            if(!((adjValue2 > x) || (adjValue1 > y))){
                d += "L" + px + " " + py +" ";
            }

            d += "L" + x + " " + adjValue1 +" ";
            d += "L" + width + " " + 0 +" ";
            d += "L" + 0 + " " + 0 +"Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var corner = function(){
        this.setD = function(shape, width , height, adj){ //adj1 - left , adj2 - top

            if(adj[0] == null){ adj[0] = 0.5; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.5; }else{ adj[1] = adj[1]/100; }

            var target = (width  < height)? width:height;
            var adjValue1 = target * adj[0];
            var adjValue2 = target * adj[1];

            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + 0 + " " + 0 +" ";
            d += "L" + 0 + " " + height +" ";
            d += "L" + width + " " + height +" ";
            d += "L" + width + " " + (height-adjValue1) +" ";
            d += "L" + adjValue2 + " " + (height-adjValue1) +" ";
            d += "L" + adjValue2 + " " + 0 +" ";
            d += "L" + 0 + " " + 0 +"Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var diagStripe = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.2; }else{ adj[0] = adj[0]/100; }
            var adjValue1 = width * adj[0];
            var adjValue2 = height * adj[0];
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + adjValue1 + " " + 0 +" ";
            d += "L" + 0 + " " + adjValue2 +" ";
            d += "L" + 0 + " " + height +" ";
            d += "L" + width + " " + 0 +" ";
            d += "L" + adjValue1 + " " + 0 +"Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var plus = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.5; }else{ adj[0] = adj[0]/100; }

            adj[0] = 0.25;
            var target = (width  < height)? width:height;
            var adjValue = target * adj[0];
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + adjValue + " " + 0 +" ";
            d += "L" + adjValue + " " + adjValue +" ";
            d += "L" + 0 + " " + adjValue +" ";
            d += "L" + 0 + " " + (height-adjValue) +" ";
            d += "L" + adjValue + " " + (height-adjValue) +" ";
            d += "L" + adjValue + " " + height +" ";
            d += "L" + (width-adjValue) + " " + height +" ";
            d += "L" + (width-adjValue) + " " + (height-adjValue) +" ";
            d += "L" + width + " " + (height-adjValue) +" ";
            d += "L" + width + " " + adjValue +" ";
            d += "L" + (width-adjValue) + " " + adjValue +" ";
            d += "L" + (width-adjValue) + " " + 0 +" ";
            d += "L" + adjValue + " " + 0 +"Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var plaque = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.15; }else{ adj[0] = adj[0]/100; }
            adj[0] = 0.15;
            var target = (width  < height)? width:height;
            var adjValue = target * adj[0];
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + adjValue + " " + 0 +" ";
            d += "A" + adjValue + " " + adjValue +" " + "0 0 1" + " " + + 0 + " " + adjValue + " ";
            d += "L" + 0 + " " + (height - adjValue) + " ";
            d += "A" + adjValue + " " + adjValue +" " + "0 0 1"+ " " + + adjValue + " " + height + " ";
            d += "L" + (width-adjValue) + " " + height + " ";
            d += "A" + adjValue + " " + adjValue +" " + "0 0 1"+ " " + + width + " " + (height-adjValue) + " ";
            d += "L" + width + " " + adjValue + " ";
            d += "A" + adjValue + " " + adjValue +" " + "0 0 1"+ " " + + (width-adjValue) + " " + 0 + " ";
            d += "L" + adjValue + " " + 0 +"Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var rightArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.5; }else{ adj[0] = adj[0]/100; }
			var _m = 0;
            var path = $(shape).find("path")[0];
			if(adj[1] === null){
				if(height < width){
					adj[1] = 0.5;
					_m = height;
				}else{
					adj[1] = 0.5;
					_m = width;
				}
			}


            var d = "";
            d += "M 0,"+((0.5*(1-adj[0]))*height)+" "+(width - adj[1]*_m)+","+((0.5*(1-adj[0]))*height)+" "+(width-adj[1]*_m)+",0 "+width+","+(0.5*height)+" "+(width - adj[1]*_m)+","+height+" "+(width - adj[1]*_m)+","+((0.5*(1+adj[0]))*height)+" 0, "+((0.5*(1+adj[0]))*height)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var leftArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.5; }else{ adj[0] = adj[0]/100; }
			var _m = 0;
            var path = $(shape).find("path")[0];
			if(adj[1] === null){
				if(height < width){
					adj[1] = 0.5;
					_m = height;
				}else{
					adj[1] = 0.5;
					_m = width;
				}
			}
            var d = "";
            d += "M 0,"+(0.5*height)+" "+(adj[1]*_m)+",0 "+(adj[1]*_m)+","+((0.5*(1-adj[0]))*height)+" "+width+","+((0.5*(1-adj[0]))*height)+" "+width+","+((0.5*(1+adj[0]))*height)+" "+(adj[1]*_m)+","+((0.5*(1+adj[0]))*height)+" "+(adj[1]*_m)+","+height+" 0, "+(0.5*height)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var downArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.5; }else{ adj[0] = adj[0]/100; }
			var _m = 0;
            var path = $(shape).find("path")[0];
			if(adj[1] === null){
				if(height < width){
					adj[1] = 0.5;
					_m = height;
				}else{
					adj[1] = 0.5;
					_m = width;
				}
			}
            var d = "";
            d += "M 0,"+(height-adj[1]*_m)+" "+(0.5*(1-adj[0])*width)+","+(height-adj[1]*_m)+" "+(0.5*(1-adj[0])*width)+",0 "+(0.5*(1+adj[0])*width)+",0 "+(0.5*(1+adj[0])*width)+","+(height-adj[1]*_m)+" "+width+","+(height-adj[1]*_m)+" "+(0.5*width)+","+height+" 0,"+(height-adj[1]*_m)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var upArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.5; }else{ adj[0] = adj[0]/100; }
			var _m = 0;
            var path = $(shape).find("path")[0];
			if(adj[1] === null){
				if(height < width){
					adj[1] = 0.5;
					_m = height;
				}else{
					adj[1] = 0.5;
					_m = width;
				}
			}
            var d = "";
            d += "M 0,"+((adj[1])*_m)+" "+(0.5*width)+",0 "+width+","+(adj[1]*_m)+" "+(0.5*(1+adj[0])*width)+","+((adj[1])*_m)+" "+(0.5*(1+adj[0])*width)+","+height+" "+(0.5*(1-adj[0])*width)+","+height+" "+(0.5*(1-adj[0])*width)+","+(adj[1]*_m)+" 0,"+(adj[1]*_m)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var leftRightArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.5; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.33; }else{ adj[1] = adj[1]/100; }
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,"+(0.5*height)+" "+(adj[1]*width)+",0 "+(adj[1]*width)+","+((0.5*(1-adj[0]))*height)+" "+((1-adj[1])*width)+","+((0.5*(1-adj[0]))*height)+" "+((1-adj[1])*width)+",0 "+width+","+(0.5*height)+" "+((1-adj[1])*width)+","+height+" "+((1-adj[1])*width)+","+((0.5*(1+adj[0]))*height)+" "+(adj[1]*width)+","+((0.5*(1+adj[0]))*height)+" "+(adj[1]*width)+","+height+" 0, "+(0.5*height)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var upDownArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.5; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.33; }else{ adj[1] = adj[1]/100; }
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,"+((adj[1])*height)+" "+(0.5*width)+",0 "+width+","+(adj[1]*height)+" "+(0.5*(1+adj[0])*width)+","+(adj[1]*height)+" "+(0.5*(1+adj[0])*width)+","+((1-adj[1])*height)+" "+width+","+((1-adj[1])*height)+" "+(0.5*width)+","+height+" 0,"+((1-adj[1])*height)+" "+(0.5*(1-adj[0])*width)+","+((1-adj[1])*height)+" "+(0.5*(1-adj[0])*width)+","+(adj[1]*height)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var leftRightUpArrow = function(){
        this.setD = function(shape, width , height, adj){

			if(height < width){
				_m = height;
			}else{
				_m = width;
			}

            if(adj[0] == null){ adj[0] = 0.25; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.25; }else{ adj[1] = adj[1]/100; }
            if(adj[2] == null){ adj[2] = 0.2; }else{ adj[2] = adj[2]/100; }

            var path = $(shape).find("path")[0];
            var d = "";
            d += "M "+(0.5*width)+",0 "+((0.5+adj[1])*width)+","+(adj[2]*height)+" "+((0.5*(1+adj[0]))*width)+","+(adj[2]*height)+" "+((0.5*(1+adj[0]))*width)+","+((1-(2*adj[1])+adj[0])*height)+" "+((1-adj[2])*width)+","+((1-(2*adj[1])+adj[0])*height)+" "+((1-adj[2])*width)+","+((1-2*adj[1])*height)+" "+width+","+((1-adj[1])*height)+"  "+((1-adj[2])*width)+","+height+" "+((1-adj[2])*width)+","+((1-adj[0])*height)+" 	"+(adj[2]*width)+","+((1-adj[0])*height)+" "+(adj[2]*width)+","+height+" 0,"+((1-adj[1])*height)+" "+(adj[2]*width)+","+((1-2*adj[1])*height)+" "+(adj[2]*width)+","+((1-(2*adj[1])+adj[0])*height)+" "+(0.5*(1-adj[0])*width)+","+((1-(2*adj[1])+adj[0])*height)+" "+(0.5*(1-adj[0])*width)+","+(adj[2]*height)+" "+((0.5-adj[1])*width)+","+(adj[2]*height)+" ";
            d += " Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var quadArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.25; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.25; }else{ adj[1] = adj[1]/100; }
            if(adj[2] == null){ adj[2] = 0.2; }else{ adj[2] = adj[2]/100; }
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,"+(0.5*height)+" "+(adj[2]*width)+","+((0.5-adj[1])*height)+" "+(adj[2]*width)+","+(0.5*(1-adj[0])*height)+" "+(0.5*(1-adj[0])*width)+","+(0.5*(1-adj[0])*height)+"  "+(0.5*(1-adj[0])*width)+","+(adj[2]*height)+" "+((0.5-adj[1])*width)+","+(adj[2]*height)+" "+(0.5*width)+",0 "+((0.5+adj[1])*width)+","+(adj[2]*height)+"  "+(0.5*(1+adj[0])*width)+","+(adj[2]*height)+" "+(0.5*(1+adj[0])*width)+","+(0.5*(1-adj[0])*height)+" "+((1-adj[2])*width)+","+(0.5*(1-adj[0])*height)+" "+((1-adj[2])*width)+","+((0.5-adj[1])*height)+" "+width+","+(0.5*height)+" "+((1-adj[2])*width)+","+((0.5+adj[1])*height)+" "+((1-adj[2])*width)+","+(0.5*(1+adj[0])*height)+"  "+(0.5*(1+adj[0])*width)+","+(0.5*(1+adj[0])*height)+" "+(0.5*(1+adj[0])*width)+","+((1-adj[2])*height)+" "+((0.5+adj[1])*width)+","+((1-adj[2])*height)+" "+(0.5*width)+","+height+" "+((0.5-adj[1])*width)+","+((1-adj[2])*height)+" "+(0.5*(1-adj[0])*width)+","+((1-adj[2])*height)+" "+(0.5*(1-adj[0])*width)+","+(0.5*(1+adj[0])*height)+" "+(adj[2]*width)+","+(0.5*(1+adj[0])*height)+" "+(adj[2]*width)+","+((0.5+adj[1])*height)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var bentArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.2; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.2; }else{ adj[1] = adj[1]/100; }
            if(adj[2] == null){ adj[2] = 0.33; }else{ adj[2] = adj[2]/100; }
            if(adj[3] == null){ adj[3] = 0.33; }else{ adj[3] = adj[3]/100; }

            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,"+height+" 0,"+((adj[3]+(adj[1]-(0.5*adj[0])))*height)+" Q0,"+((adj[1]-(0.5*adj[0]))*height)+" "+(adj[3]*width)+","+((adj[1]-(0.5*adj[0]))*height)+" L "+((1-adj[2])*width)+","+((adj[1]-(0.5*adj[0]))*height)+" "+((1-adj[2])*width)+",0 "+width+","+(adj[1]*height)+" "+((1-adj[2])*width)+","+(2*adj[1]*height)+" "+((1-adj[2])*width)+","+((adj[1]+(0.5*adj[0]))*height)+" "+(adj[3]*width)+","+((adj[1]+(0.5*adj[0]))*height)+" Q"+(adj[0]*width)+","+((adj[1]+(0.5*adj[0]))*height)+" "+(adj[0]*width)+","+((adj[3]+(adj[1]-(0.5*adj[0])))*height)+" L"+(adj[0]*width)+","+((adj[3]+(adj[1]-(0.5*adj[0])))*height)+" "+(adj[0]*width)+","+height+" 0,"+height+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var uTurnArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.2; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.25; }else{ adj[1] = adj[1]/100; }
            if(adj[2] == null){ adj[2] = 0.25; }else{ adj[2] = adj[2]/100; }
            if(adj[3] == null){ adj[3] = 0.40; }else{ adj[3] = adj[3]/100; }
            if(adj[4] == null){ adj[4] = 0.80; }else{ adj[4] = adj[4]/100; }

            var path = $(shape).find("path")[0];
            var d = "";
            d += "M0,"+height+" 0,"+(adj[3]*height)+" Q0,0 "+(adj[3]*width)+",0 L"+(1-adj[3]-adj[1]+(0.5*adj[0]))*width+",0 Q"+(1+0.5*adj[0]-adj[1])*width+",0 "+(1+0.5*adj[0]-adj[1])*width+","+(adj[3]*height)+" L "+(1+0.5*adj[0]-adj[1])*width+","+((adj[4]-adj[2])*height)+" "+width+","+((adj[4]-adj[2])*height)+" "+(1-adj[1])*width+","+(adj[4]*height)+" "+(1-2*adj[1])*width+","+((adj[4]-adj[2])*height)+" "+(1-adj[1]-0.5*adj[0])*width+","+((adj[4]-adj[2])*height)+" "+(1-adj[1]-0.5*adj[0])*width+","+(adj[3]*height)+" Q"+(1-adj[1]-0.5*adj[0])*width+","+(adj[0]*height)+" "+(1-adj[3]-adj[1]+(0.5*adj[0]))*width+","+(adj[0]*height)+" L"+(adj[3]*width)+","+(adj[0]*height)+" Q"+(adj[0]*width)+","+(adj[0]*height)+" "+(adj[0]*width)+","+(adj[3]*height)+" L"+(adj[0]*width)+","+height+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var leftUpArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.2; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.25; }else{ adj[1] = adj[1]/100; }
            if(adj[2] == null){ adj[2] = 0.25; }else{ adj[2] = adj[2]/100; }

            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,"+(1-adj[1])*height+" "+(adj[2])*width+","+(1-2*adj[1])*height+" "+(adj[2])*width+","+(1-adj[1]-(0.5*adj[0]))*height+" "+(1-adj[1]-(0.5*adj[0]))*width+","+(1-adj[1]-(0.5*adj[0]))*height+" "+(1-adj[1]-(0.5*adj[0]))*width+","+adj[2]*height+" "+(1-2*adj[1])*width+","+adj[2]*height+"  "+(1-adj[1])*width+",0 "+width+","+adj[2]*height+" "+(1-(adj[1]-(0.5*adj[0])))*width+","+adj[2]*height+" "+(1-(adj[1]-(0.5*adj[0])))*width+","+(1-(adj[1]-(0.5*adj[0])))*height+" "+adj[2]*width+","+(1-(adj[1]-(0.5*adj[0])))*height+" "+adj[2]*width+","+height+"Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var bentUpArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.25; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.25; }else{ adj[1] = adj[1]/100; }
            if(adj[2] == null){ adj[2] = 0.25; }else{ adj[2] = adj[2]/100; }

            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,"+(1-adj[0])*height+" "+(1-adj[1]-(0.5*adj[0]))*width+","+(1-adj[0])*height+" "+(1-adj[1]-(0.5*adj[0]))*width+","+adj[2]*height+" "+(1-2*adj[1])*width+","+adj[2]*height+"  "+(1-adj[1])*width+",0 "+width+","+adj[2]*height+" "+(1-(adj[1]-(0.5*adj[0])))*width+","+adj[2]*height+" "+(1-(adj[1]-(0.5*adj[0])))*width+","+height+" 0,"+height+"Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var notChedRightArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.25; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.33; }else{ adj[1] = adj[1]/100; }
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,"+((0.5*(1-adj[0]))*height)+" "+Math.abs(1-adj[1])*width+","+((0.5*(1-adj[0]))*height)+" "+Math.abs(1-adj[1])*width+",0 "+width+","+(0.5*height)+" "+Math.abs(1-adj[1])*width+","+height+" "+Math.abs(1-adj[1])*width+","+((0.5*(1+adj[0]))*height)+" 0,"+((0.5*(1+adj[0]))*height)+" "+(adj[0])*width+","+(0.5*height)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var homeplate = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.25; }else{ adj[0] = adj[0]/100; }
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,0 "+((1-adj[0])*width)+",0 "+width+","+(0.5*height)+" "+((1-adj[0])*width)+","+height+" 0,"+height+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var chevron = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.25; }else{ adj[0] = adj[0]/100; }
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,0 "+((1-adj[0])*width)+",0 "+width+","+(0.5*height)+" "+((1-adj[0])*width)+","+height+" 0,"+height+" "+adj[0]*width+","+(0.5*height)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var stripedRightArrow = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.5; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.5; }else{ adj[1] = adj[1]/100; }
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,"+((0.5*(1-adj[0]))*height)+" "+((1-adj[1])*width)+","+((0.5*(1-adj[0]))*height)+" "+((1-adj[1])*width)+",0 "+width+","+(0.5*height)+" "+((1-adj[1])*width)+","+height+" "+((1-adj[1])*width)+","+((0.5*(1+adj[0]))*height)+" 0, "+((0.5*(1+adj[0]))*height)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var rightArrowCallout = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.3; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.25; }else{ adj[1] = adj[1]/100; }
            if(adj[2] == null){ adj[2] = 0.25; }else{ adj[2] = adj[2]/100; }
            if(adj[3] == null){ adj[3] = 0.6; }else{ adj[3] = adj[3]/100; }
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,0 "+(adj[3]*width)+",0 "+(adj[3]*width)+","+(0.5*(1-adj[0])*height)+" "+((1-adj[2])*width)+","+(0.5*(1-adj[0])*height)+" "+((1-adj[2])*width)+","+((0.5*adj[1])*height)+" "+width+","+(0.5*height)+" "+((1-adj[2])*width)+","+((1-0.5*adj[1])*height)+" "+((1-adj[2])*width)+","+(0.5*(1+adj[0])*height)+" "+(adj[3]*width)+","+(0.5*(1+adj[0])*height)+" "+(adj[3]*width)+","+height+" 0,"+height+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var downArrowCallout = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.3; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.25; }else{ adj[1] = adj[1]/100; }
            if(adj[2] == null){ adj[2] = 0.25; }else{ adj[2] = adj[2]/100; }
            if(adj[3] == null){ adj[3] = 0.6; }else{ adj[3] = adj[3]/100; }
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,0 "+width+",0 "+width+","+(adj[3]*height)+" "+(0.5*(1+adj[0])*width)+","+(adj[3]*height)+" "+(0.5*(1+adj[0])*width)+","+((1-adj[2])*height)+" "+((1-adj[1])*width)+","+((1-adj[2])*height)+" "+(0.5*width)+","+height+" "+(adj[1]*width)+","+((1-adj[2])*height)+" "+(0.5*(1-adj[0])*width)+","+((1-adj[2])*height)+" "+(0.5*(1-adj[0])*width)+","+(adj[3]*height)+" 0,"+(adj[3]*height)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var leftArrowCallout = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.3; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.25; }else{ adj[1] = adj[1]/100; }
            if(adj[2] == null){ adj[2] = 0.25; }else{ adj[2] = adj[2]/100; }
            if(adj[3] == null){ adj[3] = 0.6; }else{ adj[3] = adj[3]/100; }
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,"+(0.5*height)+" "+(adj[2]*width)+","+((0.5-adj[1])*height)+" "+(adj[2]*width)+","+(0.5*(1-adj[0])*height)+" "+((1-adj[3])*width)+","+(0.5*(1-adj[0])*height)+" "+((1-adj[3])*width)+",0 "+width+",0 "+width+","+height+" "+((1-adj[3])*width)+","+height+" "+((1-adj[3])*width)+","+(0.5*(1+adj[0])*height)+" "+(adj[2]*width)+","+(0.5*(1+adj[0])*height)+" "+(adj[2]*width)+","+((0.5+adj[1])*height)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var upArrowCallout = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.3; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.25; }else{ adj[1] = adj[1]/100; }
            if(adj[2] == null){ adj[2] = 0.25; }else{ adj[2] = adj[2]/100; }
            if(adj[3] == null){ adj[3] = 0.6; }else{ adj[3] = adj[3]/100; }

            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,"+((1-adj[3])*height)+" "+(0.5*(1-adj[0])*width)+","+((1-adj[3])*height)+" "+(0.5*(1-adj[0])*width)+","+(adj[2]*height)+" "+((0.5-adj[1])*width)+","+(adj[2]*height)+" "+(0.5*width)+",0 "+((0.5+adj[1])*width)+","+(adj[2]*height)+" "+(0.5*(1+adj[0])*width)+","+(adj[2]*height)+" "+(0.5*(1+adj[0])*width)+","+((1-adj[3])*height)+" "+width+","+((1-adj[3])*height)+" "+width+","+height+" 0,"+height+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var leftRightArrowCallout = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.3; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.25; }else{ adj[1] = adj[1]/100; }
            if(adj[2] == null){ adj[2] = 0.15; }else{ adj[2] = adj[2]/100; }
            if(adj[3] == null){ adj[3] = 0.25; }else{ adj[3] = adj[3]/100; }
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,"+(0.5*height)+" "+((0.5*adj[2])*width)+","+((0.5-adj[1])*height)+" "+((0.5*adj[2])*width)+","+(0.5*(1-adj[0])*height)+" "+((0.5*(1-adj[3]))*width)+","+(0.5*(1-adj[0])*height)+" "+((0.5*(1-adj[3]))*width)+",0 "+((0.5*(1+adj[3]))*width)+",0 "+((0.5*(1+adj[3]))*width)+","+(0.5*(1-adj[0])*height)+" "+((1-(0.5*adj[2]))*width)+","+(0.5*(1-adj[0])*height)+" "+((1-(0.5*adj[2]))*width)+","+((0.5-adj[1])*height)+" "+width+","+(0.5*height)+" "+((1-(0.5*adj[2]))*width)+","+((0.5+adj[1])*height)+" "+((1-(0.5*adj[2]))*width)+","+(0.5*(1+adj[0])*height)+" "+((0.5*(1+adj[3]))*width)+","+(0.5*(1+adj[0])*height)+" "+((0.5*(1+adj[3]))*width)+","+height+" "+((0.5*(1-adj[3]))*width)+","+height+" "+((0.5*(1-adj[3]))*width)+","+(0.5*(1+adj[0])*height)+" "+((0.5*adj[2])*width)+","+(0.5*(1+adj[0])*height)+" "+((0.5*adj[2])*width)+","+((0.5+adj[1])*height)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var quadArrowCallout = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.25; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.25; }else{ adj[1] = adj[1]/100; }
            if(adj[2] == null){ adj[2] = 0.15; }else{ adj[2] = adj[2]/100; }
            if(adj[3] == null){ adj[3] = 0.25; }else{ adj[3] = adj[3]/100; }
            var path = $(shape).find("path")[0];
            var d = "";
            d += "M 0,"+(0.5*height)+" "+(adj[2]*width)+","+((0.5-adj[1])*height)+" "+(adj[2]*width)+","+(0.5*(1-adj[0])*height)+" "+((0.5-(0.5*adj[3]))*width)+","+(0.5*(1-adj[0])*height)+" "+((0.5-(0.5*adj[3]))*width)+","+((0.5-(0.5*adj[3]))*height)+" "+(0.5*(1-adj[0])*width)+","+((0.5-(0.5*adj[3]))*height)+" "+(0.5*(1-adj[0])*width)+","+(adj[2]*height)+" "+((0.5-adj[1])*width)+","+(adj[2]*height)+" "+(0.5*width)+",0 "+((0.5+adj[1])*width)+","+(adj[2]*height)+" "+(0.5*(1+adj[0])*width)+","+(adj[2]*height)+" "+(0.5*(1+adj[0])*width)+","+((0.5-(0.5*adj[3]))*height)+" "+((0.5+(0.5*adj[3]))*width)+","+((0.5-(0.5*adj[3]))*height)+" "+((0.5+(0.5*adj[3]))*width)+","+(0.5*(1-adj[0])*height)+" "+((1-adj[2])*width)+","+(0.5*(1-adj[0])*height)+" "+((1-adj[2])*width)+","+((0.5-adj[1])*height)+" "+width+","+(0.5*height)+" "+((1-adj[2])*width)+","+((0.5+adj[1])*height)+" "+((1-adj[2])*width)+","+(0.5*(1+adj[0])*height)+" "+((0.5+(0.5*adj[3]))*width)+","+(0.5*(1+adj[0])*height)+" "+((0.5+(0.5*adj[3]))*width)+","+((0.5+(0.5*adj[3]))*height)+" "+(0.5*(1+adj[0])*width)+","+((0.5+(0.5*adj[3]))*height)+" "+(0.5*(1+adj[0])*width)+","+((1-adj[2])*height)+" "+((0.5+adj[1])*width)+","+((1-adj[2])*height)+" "+(0.5*width)+","+height+" "+((0.5-adj[1])*width)+","+((1-adj[2])*height)+" "+(0.5*(1-adj[0])*width)+","+((1-adj[2])*height)+" "+(0.5*(1-adj[0])*width)+","+((0.5+(0.5*adj[3]))*height)+" "+((0.5-(0.5*adj[3]))*width)+","+((0.5+(0.5*adj[3]))*height)+" "+((0.5-(0.5*adj[3]))*width)+","+(0.5*(1+adj[0])*height)+" "+(adj[2]*width)+","+(0.5*(1+adj[0])*height)+" "+(adj[2]*width)+","+((0.5+adj[1])*height)+" Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var mathPlus = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.2; }else{ adj[0] = adj[0]/100; }
            var path = $(shape).find("path")[0];
            var m = 0.15;
            var d = "";
            d += "M "+m*width+","+(0.5*(1-adj[0])*height)+" "+(0.5*(1-adj[0])*width)+","+(0.5*(1-adj[0])*height)+" "+(0.5*(1-adj[0])*width)+","+m*height+" "+(0.5*(1+adj[0])*width)+","+m*height+" "+(0.5*(1+adj[0])*width)+","+(0.5*(1-adj[0])*height)+" "+(1-m)*width+","+(0.5*(1-adj[0])*height)+" "+(1-m)*width+","+(0.5*(1+adj[0])*height)+" "+(0.5*(1+adj[0])*width)+","+(0.5*(1+adj[0])*height)+" "+(0.5*(1+adj[0])*width)+","+(1-m)*height+" "+(0.5*(1-adj[0])*width)+","+(1-m)*height+" "+(0.5*(1-adj[0])*width)+","+(0.5*(1+adj[0])*height)+" "+m*width+","+(0.5*(1+adj[0])*height)+"Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var mathMinus = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.2; }else{ adj[0] = adj[0]/100; }
            var path = $(shape).find("path")[0];
            var m = 0.15;
            var d = "";
            d += "M "+m*width+","+(0.5*(1-adj[0])*height)+" "+(1-m)*width+","+(0.5*(1-adj[0])*height)+" "+(1-m)*width+","+(0.5*(1+adj[0])*height)+" "+m*width+","+(0.5*(1+adj[0])*height)+"Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var mathEqual = function(){
        this.setD = function(shape, width , height, adj){
            if(adj[0] == null){ adj[0] = 0.2; }else{ adj[0] = adj[0]/100; }
            if(adj[1] == null){ adj[1] = 0.05; }else{ adj[1] = adj[1]/100; }
            var path = $(shape).find("path")[0];
            var m = 0.15;
            var d = "";
            d += "M "+m*width+","+((0.5-(adj[0]+0.5*adj[1]))*height)+" "+(1-m)*width+","+((0.5-(adj[0]+0.5*adj[1]))*height)+" "+(1-m)*width+","+((0.5-(0.5*adj[1]))*height)+" "+m*width+","+((0.5-(0.5*adj[1]))*height)+"Z";
            d += "M "+m*width+","+((0.5+(adj[0]+0.5*adj[1]))*height)+" "+(1-m)*width+","+((0.5+(adj[0]+0.5*adj[1]))*height)+" "+(1-m)*width+","+((0.5+(0.5*adj[1]))*height)+" "+m*width+","+((0.5+(0.5*adj[1]))*height)+"Z";
            path.setAttributeNS(null, "d", d);
        };
    };

    var can = function(){
        this.defaultValue = { width : 95.8, height : 127.5 };
        this.create = function(){
            var svg = this.createSvg();
            var g = document.createElementNS ( this.xmlns, "g");
            var topPath = document.createElementNS ( this.xmlns, "path");
            var bodyPath = document.createElementNS ( this.xmlns, "path");

            topPath.setAttribute("shape-path-type","top");
            bodyPath.setAttribute("shape-path-type","body");

            g.appendChild(bodyPath);
            g.appendChild(topPath);

            svg.appendChild (g);

            return svg;
        };

        this.setD = function(shape, width , height, adj){
            if(adj == null){
                adj = 25;
            }
            var cx = width/2;
            var target = (width  < height)? width:height;
            var adjValue = (target * (adj / 100)) / 2;


            var $paths = $(shape).find("path");
            $paths.each(function(){
                var type = this.getAttribute("shape-path-type");
                var d="";
                if(type == "top"){
                    d += "M" + 0 + " " + adjValue +" ";
                    d += "A" + cx + " " + adjValue + " " + "0 0 0 " + width + " " + adjValue+ " ";
                    d += "A" + cx + " " + adjValue + " " + "0 0 0 " + 0 + " " + adjValue + "Z";
                    this.setAttributeNS(null, "d", d);
                }else if(type == "body"){
                    d += "M" + 0 + " " + adjValue +" ";
                    d += "L" + 0 + " " + (height-adjValue) + " ";
                    d += "A" + cx + " " + adjValue + " " + "0 0 0 " + width + " " + (height-adjValue) + " ";
                    d += "L" + width + " " + adjValue + " ";
                    d += "A" + cx + " " + adjValue + " " + "0 0 0 " + 0 + " " + adjValue + "Z";

                    this.setAttributeNS(null, "d", d);
                }
            });
        };

        this.setStroke = function(shape, color, opacity, width){
            $(shape).find("path").each(function(){
                var type = this.getAttribute("shape-path-type");
                if(type == "top"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                }else if(type == "body"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                }
            });
            var g = $(shape).find("g")[0];
            g.setAttributeNS(null, "transform", "translate("+width+","+width+")");

            shape.style.width = shape.style.width.split("px")[0] + (width*2) + "px"
            shape.style.height = shape.style.height.split("px")[0] + (width*2) + "px"
        };

        this.setFill = function(shape, color, opacity){
            $(shape).find("path").each(function(){
                var type = this.getAttribute("shape-path-type");
                if(type == "top"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                }else if(type == "body"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                }
            });
        };
    };

    var cube = function(){
        this.defaultValue = { width : 127.5, height : 127.5 };
        this.create = function(){
            var svg = this.createSvg();
            var g = document.createElementNS ( this.xmlns, "g");
            var topPath = document.createElementNS ( this.xmlns, "path");
            var frontPath = document.createElementNS ( this.xmlns, "path");
            var sidePath = document.createElementNS ( this.xmlns, "path");

            topPath.setAttribute("shape-path-type","top");
            frontPath.setAttribute("shape-path-type","front");
            sidePath.setAttribute("shape-path-type","side");

            g.appendChild(frontPath);
            g.appendChild(sidePath);
            g.appendChild(topPath);

            svg.appendChild (g);

            return svg;
        };

        this.setD = function(shape, width , height, adj){
            if(adj == null){
                adj = 25;
            }
            var target = (width  < height)? width:height;
            var adjValue = target * (adj / 100);


            var $paths = $(shape).find("path");
            $paths.each(function(){
                var type = this.getAttribute("shape-path-type");
                var d="";
                if(type == "top"){
                    d += "M" + adjValue + " " + 0 +" ";
                    d += "L" + 0 + " " + adjValue + " ";
                    d += "L" + (width-adjValue) + " " + adjValue + " ";
                    d += "L" + width + " " + 0 + " ";
                    d += "L" + adjValue + " " + 0 + "Z";
                    this.setAttributeNS(null, "d", d);
                } else if(type == "front"){
                    d += "M" + 0 + " " + adjValue + " ";
                    d += "L" + 0 + " " + height + " ";
                    d += "L" + (width-adjValue) + " " + height + " ";
                    d += "L" + (width-adjValue) + " " + adjValue + " ";
                    d += "M" + adjValue + " " + 0 +"Z";

                    this.setAttributeNS(null, "d", d);
                } else if(type == "side"){
                    d += "M" + width + " " + 0 + " ";
                    d += "L" + width + " " + (height-adjValue) + " ";
                    d += "L" + (width-adjValue) + " " + height  + " ";
                    d += "L" + (width-adjValue) + " " + adjValue  + " ";
                    d += "M" + width + " " + 0 + "Z";

                    this.setAttributeNS(null, "d", d);
                }
            });
        };

        this.setStroke = function(shape, color, opacity, width){
            $(shape).find("path").each(function(){
                var type = this.getAttribute("shape-path-type");
                if(type == "top"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                } else if(type == "front"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                } else if(type == "side"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                }
            });
            var g = $(shape).find("g")[0];
            g.setAttributeNS(null, "transform", "translate("+width+","+width+")");

            shape.style.width = shape.style.width.split("px")[0] + (width*2) + "px"
            shape.style.height = shape.style.height.split("px")[0] + (width*2) + "px"
        };

        this.setFill = function(shape, color, opacity){
            $(shape).find("path").each(function(){
                var type = this.getAttribute("shape-path-type");
                if(type == "top"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                } else if(type == "front"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                } else if(type == "side"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                }
            });
        };
    };

    var bevel = function(){
        this.defaultValue = { width : 109.3, height : 109.3 };
        this.create = function(){
            var svg = this.createSvg();
            var g = document.createElementNS ( this.xmlns, "g");
            var topPath = document.createElementNS ( this.xmlns, "path");
            var bottomPath = document.createElementNS ( this.xmlns, "path");
            var leftPath = document.createElementNS ( this.xmlns, "path");
            var rightPath = document.createElementNS ( this.xmlns, "path");
            var frontPath = document.createElementNS ( this.xmlns, "path");

            topPath.setAttribute("shape-path-type","top");
            bottomPath.setAttribute("shape-path-type","bottom");
            leftPath.setAttribute("shape-path-type","left");
            rightPath.setAttribute("shape-path-type","right");
            frontPath.setAttribute("shape-path-type","front");

            g.appendChild(topPath);
            g.appendChild(bottomPath);
            g.appendChild(leftPath);
            g.appendChild(rightPath);
            g.appendChild(frontPath);

            svg.appendChild (g);
            return svg;
        };

        this.setD = function(shape, width , height, adj){
            if(adj == null){
                adj = 12.5;
            }
            var target = (width  < height)? width:height;
            var adjValue = target * (adj / 100);


            var $paths = $(shape).find("path");
            $paths.each(function(){
                var type = this.getAttribute("shape-path-type");
                var d="";
                if(type == "top"){
                    d += "M" + 0 + " " + 0 +" ";
                    d += "L" + adjValue + " " + adjValue + " ";
                    d += "L" + (width-adjValue) + " " + adjValue + " ";
                    d += "L" + width + " " + 0 + " ";
                    d += "L" + 0 + " " + 0 + "Z";

                    this.setAttributeNS(null, "d", d);
                } else if(type == "left"){
                    d += "M" + 0 + " " + 0 + " ";
                    d += "L" + 0 + " " + height + " ";
                    d += "L" + adjValue + " " + (height-adjValue) + " ";
                    d += "L" + adjValue + " " + adjValue + " ";
                    d += "L" + 0 + " " + 0 + "Z";

                    this.setAttributeNS(null, "d", d);
                } else if(type == "bottom"){
                    d += "M" + 0 + " " + height + " ";
                    d += "L" + width + " " + height + " ";
                    d += "L" + (width-adjValue) + " " + (height-adjValue) + " ";
                    d += "L" + adjValue + " " + (height-adjValue) + " ";
                    d += "L" + 0 + " " + height + "Z";

                    this.setAttributeNS(null, "d", d);
                } else if(type == "right"){
                    d += "M" + width + " " + 0 + " ";
                    d += "L" + width + " " + height + " ";
                    d += "L" + (width-adjValue) + " " + (height-adjValue) + " ";
                    d += "L" + (width-adjValue) + " " + adjValue + " ";
                    d += "L" + width + " " + 0 + "Z";

                    this.setAttributeNS(null, "d", d);
                } else if(type == "front"){
                    d += "M" + adjValue + " " + adjValue + " ";
                    d += "L" + adjValue + " " + (height-adjValue) + " ";
                    d += "L" + (width-adjValue) + " " + (height-adjValue)  + " ";
                    d += "L" + (width-adjValue) + " " + adjValue  + " ";
                    d += "L" + adjValue + " " + adjValue  + "Z";

                    this.setAttributeNS(null, "d", d);
                }
            });
        };

        this.setStroke = function(shape, color, opacity, width){
            $(shape).find("path").each(function(){
                var type = this.getAttribute("shape-path-type");
                if(type == "top"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                } else if(type == "left"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                } else if(type == "bottom"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                } else if(type == "right"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                } else if(type == "front"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                }
            });
            var g = $(shape).find("g")[0];
            g.setAttributeNS(null, "transform", "translate("+width+","+width+")");

            shape.style.width = shape.style.width.split("px")[0] + (width*2) + "px"
            shape.style.height = shape.style.height.split("px")[0] + (width*2) + "px"
        };

        this.setFill = function(shape, color, opacity){
            $(shape).find("path").each(function(){
                var type = this.getAttribute("shape-path-type");
                if(type == "top"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                } else if(type == "left"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                } else if(type == "bottom"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                } else if(type == "right"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                } else if(type == "front"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                }
            });
        };
    };

    var donut = function(){
        this.create = function(){
            var svg = this.createSvg();
            var g = document.createElementNS ( this.xmlns, "g");
            var path = document.createElementNS ( this.xmlns, "path");
            path.setAttributeNS(null, "fill-rule", "evenodd");

            g.appendChild(path);
            svg.appendChild (g);

            return svg;
        };

        this.setD = function(shape, width , height, adj){
            if(adj == null){
                adj = 25;
            }

            var cx = width/2;
            var cy = height/2;
            var target = (width  < height)? width:height;
            var adjValue = target * (adj / 100);

            var path = $(shape).find("path")[0];
            var d = "";
            //outer
            d += "M" + cx + " " + 0 +" ";
            d += "A" + cx + " " + cy + " " + "0 0 0 " + cx + " " + height+ " ";
            d += "A" + cx + " " + cy + " " + "0 0 0 " + cx + " " + 0 + "Z";
            //inner
            d += "M" + cx + " " + adjValue +" ";
            d += "A" + (cx-adjValue) + " " + (cy-adjValue) + " " + "0 0 0 " + cx + " " + (height-adjValue)+ " ";
            d += "A" + (cx-adjValue) + " " + (cy-adjValue) + " " + "0 0 0 " + cx + " " + adjValue + "Z";


            path.setAttributeNS(null, "d", d);
        };
    };

    var noSmoking = function(){
        this.create = function(){
            var svg = this.createSvg();
            var g = document.createElementNS ( this.xmlns, "g");
            var path = document.createElementNS ( this.xmlns, "path");
            path.setAttributeNS(null, "fill-rule", "evenodd");

            g.appendChild(path);
            svg.appendChild (g);

            return svg;
        };

        this.getIntersection = function(cx, cy, a, b , c, m){

            var fa = 1 / Math.pow(a,2) + Math.pow(m,2) / Math.pow(b,2);
            var fb = - 2 * (c * Math.pow(m,2)) / Math.pow(b,2);
            var fc = (Math.pow(m,2) * Math.pow(c,2)) / Math.pow(b,2) -1;

            return {
                p1 : {
                    x : (( -fb + Math.sqrt(Math.pow(fb ,2) - 4 * fa * fc) ) / (2 * fa)),
                    y : (( -fb + Math.sqrt(Math.pow(fb, 2) - 4 * fa * fc) ) / (2 * fa))
                },
                p2 : {
                    x : (( -fb - Math.sqrt(Math.pow(fb, 2) - 4 * fa * fc) ) / (2 * fa)),
                    y : (( -fb - Math.sqrt(Math.pow(fb, 2) - 4 * fa * fc) ) / (2 * fa))
                }
            };
        };

        this.setD = function(shape, width , height, adj){
            if(adj == null){
                adj = 25;
            }

            var cx = width/2;
            var cy = height/2;
            var target = (width  < height)? width:height;
            var adjValue = target * (adj / 100);

            var path = $(shape).find("path")[0];
            var d = "";
            //outer
            d += "M" + cx + " " + 0 +" ";
            d += "A" + cx + " " + cy + " " + "0 0 0 " + cx + " " + height+ " ";
            d += "A" + cx + " " + cy + " " + "0 0 0 " + cx + " " + 0 + " Z ";
            var a = (cx-adjValue);
            var b = (cy-adjValue);
            var c = adjValue/2;
            var m = 1;

            var isLargeWidth = (width  < height)? false:true;

            var points = this.getIntersection(cx, cy, a, b, c, m);
            if(isLargeWidth){
                d += "M" + (cx + points.p1.x) + " " + (b + points.p1.y+c) +" ";
                d += "A" + (cx-adjValue) + " " + (adjValue) + " " + "1 0 0 " + (cx + points.p2.x) + " " + (b + points.p2.y+c) + " Z ";

                var c = -1 * (adjValue/2);
                points = this.getIntersection(cx, cy, a, b, c, m);
                d += "M" + (cx + points.p1.x) + " " + ((height-adjValue) + points.p1.y+c) +" ";
                d += "A" + (cx-adjValue) + " " + (adjValue) + " " + "1 0 1 " + (cx + points.p2.x) + " " + ((height-adjValue) + points.p2.y+c) + " Z "
            }else{
                d += "M" + (cx + points.p1.x) + " " + (b + points.p1.y+c) +" ";
                d += "A" + (adjValue) + " " + (cy-adjValue) + " " + "1 0 0 " + (cx + points.p2.x) + " " + (b + points.p2.y+c) + " Z ";

                var c = -1 * (adjValue/2);
                points = this.getIntersection(cx, cy, a, b, c, m);
                d += "M" + (cx + points.p1.x) + " " + (cy + points.p1.y-c) +" ";
                d += "A" + (adjValue) + " " + (cy-adjValue) + " " + "1 0 1 " + (cx + points.p2.x) + " " + (cy + points.p2.y-c) + " Z ";
            }
            path.setAttributeNS(null, "d", d);
        };
    };

    var foldedCorner = function(){
        this.create = function(){
            var svg = this.createSvg();
            var g = document.createElementNS ( this.xmlns, "g");
            var mainPath = document.createElementNS ( this.xmlns, "path");
            var cornerPath = document.createElementNS ( this.xmlns, "path");

            mainPath.setAttribute("shape-path-type","main");
            cornerPath.setAttribute("shape-path-type","corner");

            g.appendChild(mainPath);
            g.appendChild(cornerPath);

            svg.appendChild (g);
            return svg;
        };

        this.setD = function(shape, width , height, adj){
            if(adj == null){
                adj = 18;
            }
            var target = (width  < height)? width:height;
            var adjValue = target * (adj / 100);

            var p1 = {x : width-adjValue, y:height};
            var p2 = {x : width, y:height-adjValue};

            var r = (p2.x - p1.x)/2;
            var cx = p1.x + ((p2.x - p1.x)/2);
            var cy = p1.y - ((p2.x - p1.x)/2);


            var degree = (180+45)*(Math.PI/180);
            var p3 = {x: Math.round(Math.cos(degree)*r)+cx, y:Math.round(Math.sin(degree)*r)+cy };


            var $paths = $(shape).find("path");
            var d = "";
            $paths.each(function(){
                var type = this.getAttribute("shape-path-type");
                var d="";
                if(type == "main"){
                    d += "M" + 0 + " " + 0 +" ";
                    d += "L" + 0 + " " + height + " ";
                    d += "L" + p1.x + " " + p1.y + " ";
                    d += "L" + p2.x + " " + p2.y + " ";
                    d += "L" + width + " " + 0 + " ";
                    d += "L" + 0 + " " + 0 + " ";

                    this.setAttributeNS(null, "d", d);
                } else if(type == "corner"){
                    d += "M" + p1.x + " " + p1.y + " ";
                    d += "L" + p2.x + " " + p2.y + " ";
                    d += "L" + p3.x + " " + p3.y + " ";
                    d += "L" + p1.x + " " + p1.y + "Z";

                    this.setAttributeNS(null, "d", d);
                }
            });
        };

        this.setStroke = function(shape, color, opacity, width){
            $(shape).find("path").each(function(){
                var type = this.getAttribute("shape-path-type");
                if(type == "main"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                } else if(type == "corner"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                }
            });
            var g = $(shape).find("g")[0];
            g.setAttributeNS(null, "transform", "translate("+width+","+width+")");

            shape.style.width = shape.style.width.split("px")[0] + (width*2) + "px"
            shape.style.height = shape.style.height.split("px")[0] + (width*2) + "px"
        };

        this.setFill = function(shape, color, opacity){
            $(shape).find("path").each(function(){
                var type = this.getAttribute("shape-path-type");
                if(type == "main"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                } else if(type == "corner"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                }
            });
        };
    };

    var smileyFace = function(){
        this.create = function(){
            var svg = this.createSvg();
            var g = document.createElementNS ( this.xmlns, "g");
            var facePath = document.createElementNS ( this.xmlns, "path");
            var eyesPath = document.createElementNS ( this.xmlns, "path");
            var mousePath = document.createElementNS ( this.xmlns, "path");

            facePath.setAttribute("shape-path-type","face");
            eyesPath.setAttribute("shape-path-type","eyes");
            mousePath.setAttribute("shape-path-type","mouse");

            g.appendChild(facePath);
            g.appendChild(eyesPath);
            g.appendChild(mousePath);

            svg.appendChild (g);
            return svg;
        };

        this.setD = function(shape, width , height, adj){
            if(adj == null){
                adj = 4.650;
            }

            var cx = width/2;
            var cy = height/2;
            var $paths = $(shape).find("path");
            var d = "";
            $paths.each(function(){
                var type = this.getAttribute("shape-path-type");
                var d="";
                if(type == "face"){
                    d += "M" + (width/2) + " " + 0 +" ";
                    d += "A" + (width/2) + " " + (height/2) + " " + "0 0 0 " + (width/2) + " " + height+ " ";
                    d += "A" + (width/2) + " " + (height/2) + " " + "0 0 0 " + (width/2) + " " + 0 + " Z";

                    this.setAttributeNS(null, "d", d);
                } else if(type == "eyes"){
                    var sizeW = width * (12.5 / 100);
                    var sizeH = height * (12.5 / 100);
                    var distW = width * (10 / 100);
                    var distH = height * (10 / 100);

                    d += "M" + (cx-distW) + " " + (cy- distH - (sizeH/2)) + " ";
                    d += "A" + (sizeW/2) + " " + (sizeH/2) + " " + "0 0 0 " + (cx-distW-sizeW) + " " +  (cy- distH - (sizeH/2))+ " ";
                    d += "A" + (sizeW/2) + " " + (sizeH/2) + " " + "0 0 0 " + (cx-distW) + " " +  (cy- distH - (sizeH/2)) + " Z";

                    d += "M" + (cx+distW) + " " + (cy- distH - (sizeH/2)) + " ";
                    d += "A" + (sizeW/2) + " " + (sizeH/2) + " " + "0 0 0 " + (cx+distW+sizeW) + " " +  (cy- distH - (sizeH/2))+ " ";
                    d += "A" + (sizeW/2) + " " + (sizeH/2) + " " + "0 0 0 " + (cx+distW) + " " +  (cy- distH - (sizeH/2)) + " Z";

                    this.setAttributeNS(null, "d", d);
                } else if(type == "mouse"){
                    var distW = width * (25 / 100);
                    var distH = height * (25 / 100);

                    var adjH = height-(distH - (8*adj)); //8 �� �ӽ������� �־� ũ�� ���� ��. ���� ��Ȯ�� �� ������ ����

                    d += "M" + (distW) + " " + (height-distH) +" ";
                    d += "Q" + (cx) + " " + adjH + " " + (width-distW) + " " + (height-distH)+ " ";

                    this.setAttributeNS(null, "d", d);
                }
            });
        };

        this.setStroke = function(shape, color, opacity, width){
            $(shape).find("path").each(function(){
                var type = this.getAttribute("shape-path-type");
                if(type == "face"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                } else if(type == "eyes"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                } else if(type == "mouse"){
                    this.setAttributeNS(null, "stroke", color);
                    this.setAttributeNS(null, "stroke-width", width);
                    this.setAttributeNS(null, "stroke-opacity", opacity);
                }
            });
            var g = $(shape).find("g")[0];
            g.setAttributeNS(null, "transform", "translate("+width+","+width+")");

            shape.style.width = shape.style.width.split("px")[0] + (width*2) + "px"
            shape.style.height = shape.style.height.split("px")[0] + (width*2) + "px"
        };

        this.setFill = function(shape, color, opacity){
            $(shape).find("path").each(function(){
                var type = this.getAttribute("shape-path-type");
                if(type == "face"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                } else if(type == "eyes"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", opacity);
                } else if(type == "mouse"){
                    this.setAttributeNS(null, "fill", color);
                    this.setAttributeNS(null, "fill-opacity", 0);
                }
            });
        };
    };

    var heart = function(){
        this.setD = function(shape, width , height, adj){
            var cx = width/2;
            var cy = height/2;

            var pW = width/4;
            var pH = height/4;

            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + cx + " " + pH +" ";
            d += "C" + (cx+pW) + " " + (0-pH/2) + " " + (width+pW) + " " + pH + " " +  cx + " " + height+ " ";
            d += "C" + (0-pW) + " " + pH + " " + (cx-pW) + " " +  (0-pH/2) + " " + cx + " " + pH + "Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var arc = function(){
        this.create = function(){
            var svg = this.createSvg();
            var g = document.createElementNS ( this.xmlns, "g");
            var path = document.createElementNS ( this.xmlns, "path");
            path.setAttributeNS(null, "fill-rule", "evenodd");

            g.appendChild(path);
            svg.appendChild (g);

            return svg;
        };

        this.setD = function(shape, width , height, adj1, adj2, adj3){  //adj1 - left degree , adj2 - right degree, adj3 - width
            if(adj1 == null){
                adj1 = 180;
            }
            if(adj2 == null){
                adj2 = 360;
            }
            adj1= (adj1 == 0) ? 360 : adj1;
            adj2= (adj2 == 0) ? 360 : adj2;

            if(adj3 == null){
                adj3 = 25;
            }

            var adjValue1 = adj1*(Math.PI/180);
            var adjValue2 = adj2*(Math.PI/180);
            var target = (width  < height)? width:height;
            var adjValue3 = target * (adj3 / 100);

            var largeArcFlag = ((adjValue2 - adjValue1) >= 180) ? 1 : 0;

            var cx = width/2;
            var cy = height/2;
            var rx = cx;
            var ry = cy;
            var x1 = Math.round(Math.cos(adjValue1)*rx) + cx;
            var y1 = Math.round(Math.sin(adjValue1)*ry) + cy;

            var x2 = Math.round(Math.cos(adjValue2)*rx) + cx;
            var y2 = Math.round(Math.sin(adjValue2)*ry) + cy;

            var x3 = Math.round(Math.cos(adjValue1)*(rx-adjValue3)) + cx;
            var y3 = Math.round(Math.sin(adjValue1)*(ry-adjValue3)) + cy;

            var x4 = Math.round(Math.cos(adjValue2)*(rx-adjValue3)) + cx;
            var y4 = Math.round(Math.sin(adjValue2)*(ry-adjValue3)) + cy;

            var path = $(shape).find("path")[0];
            var d = "";
            d += "M" + x1 + " " + y1 +" ";
            d += "A" + cx + " " + cy + " " + "0 "+largeArcFlag+" 1 " + x2 + " " + y2+ " ";

            d += "L" + x4 + " " + y4 +" ";
            d += "A" + (rx-adjValue3) + " " + (ry-adjValue3)+ " " + "0 "+(largeArcFlag)+" 0 " + x3 + " " + y3+ " ";
            d += "L" + x1 + " " + y1 +" Z";

            path.setAttributeNS(null, "d", d);
        };
    };

    var lightningBolt = function(){
        this.setD = function(shape, width , height){
            var cx = width/2;
            var cy = height/2;

            var pW = width/4;
            var pH = height/4;

            var path = $(shape).find("path")[0];

            var p1 ={x : 0 , y : height * (18.75 / 100)};
            var p2 ={x: width * (35 / 100) , y : height * (39.06 / 100)};
            var p3 ={x: width * (24.5 / 100) , y : height * (45.31 / 100)};
            var p4 ={x: width * (54.5 / 100) , y : height * (65.62 / 100)};
            var p5 ={x: width * (45 / 100) , y : height * (68.75 / 100)};
            var p6 ={x: width , y : height};
            var p7 ={x: width * (69 / 100) , y : height * (59.37 / 100)};
            var p8 ={x: width * (75.5 / 100) , y : height * (56.25 / 100)};;
            var p9 ={x: width * (50 / 100) , y : height * (31.25 / 100)};
            var p10 ={x: width * (60 / 100) , y : height * (28.125 / 100)};
            var p11 ={x: width * (40 / 100) , y : 0};

            var d = "";
            d += "M" + p1.x + " " + p1.y +" ";
            d += "L" + p2.x + " " + p2.y +" ";
            d += "L" + p3.x + " " + p3.y +" ";
            d += "L" + p4.x + " " + p4.y +" ";
            d += "L" + p5.x + " " + p5.y +" ";
            d += "L" + p6.x + " " + p6.y +" ";
            d += "L" + p7.x + " " + p7.y +" ";
            d += "L" + p8.x + " " + p8.y +" ";
            d += "L" + p9.x + " " + p9.y +" ";
            d += "L" + p10.x + " " + p10.y +" ";
            d += "L" + p11.x + " " + p11.y +" ";
            d += "L" + p1.x + " " + p1.y +" Z";


            path.setAttributeNS(null, "d", d);
        };
    };

    var sun = function(){
        this.setD = function(shape, width , height, adj){
            if(adj == null){
                adj = 25;
            }

            var cx = width/2;
            var cy = height/2;
            var adjValueW = width * (adj / 100);
            var adjValueH = height * (adj / 100);

            var path = $(shape).find("path")[0];

            var d = "";
            d += "M" + (adjValueW) + " " + cy +" ";
            d += "A" + (adjValueW) + " " + (adjValueH) + " " + "0 0 0 " + (width-adjValueW) + " " + cy+ " ";
            d += "A" + (adjValueW) + " " + (adjValueH) + " " + "0 0 0 " + (adjValueW) + " " + cy + " Z";





            var rx = cx;
            var ry = cy;

            var pList = [];
            var pointCnt = 8;
            var degree = 360/pointCnt;


            var startD = 270;
            for(var i=0; i<pointCnt; i++){
                var r = startD*(Math.PI/180);
                var x = Math.round(Math.cos(r)*rx) + cx;
                var y = Math.round(Math.sin(r)*ry) + cy;


                startD = startD+degree;
                pList.push({x:x , y:y});
            }


            console.log(pList);

            var valueW = width * (13.635 / 100);
            var valueH = height * (13.635 / 100);

            d += "M" + pList[0].x + " " + pList[0].y +" ";
            d += "L" + ( pList[0].x + valueW) + " " + pList[0].y +" ";
            d += "L" + ( pList[0].x - valueW) + " " + pList[0].y +"Z";

            path.setAttributeNS(null, "d", d);

        };
    };

    var cloud = function(){
        this.setD = function(shape, width , height){
            var cx = width/2;
            var cy = height/2;

            var pW = width/4;
            var pH = height/4;

            var path = $(shape).find("path")[0];

            var p1 ={x : width * (88.9 / 100) , y : height * (12.5 / 100)};
            var p2 ={x: width * (96.3 / 100) , y : height * (35 / 100)};
            var p3 ={x: width * (86.1 / 100) , y : height * (70 / 100)};
            var p4 ={x: width * (66.7 / 100) , y : height * (85 / 100)};
            var p5 ={x: width * (38.9 / 100) , y : height * (90.83 / 100)};
            var p6 ={x: width * (13.9 / 100) , y : height * (82 / 100)};
            var p7 ={x: width * (5.6 / 100) , y : height * (58.89 / 100)};
            var p8 ={x: width * (9.5 / 100) , y : height * (33.33 / 100)};;
            var p9 ={x: width * (31.9 / 100) , y : height * (12.22 / 100)};
            var p10 ={x: width * (51.9 / 100) , y : height * (7.77 / 100)};
            var p11 ={x: width * (69.1 / 100) , y : height * ( 6.25 / 100)};

            var d = "";


            d += "M" + p1.x + " " + p1.y +" ";
            d += "A" + ((width-p1.x)) + " " + (p1.y) + " " + "0 0 1 " + p1.x + " " + p1.y+ " ";

            /*  d += "A" + ((p10.x-p11.x)/2) + " " + (p11.y) + " " + "0 0 0 " + p10.x + " " + p10.y+ " ";
             d += "A" + ((p9.x-p10.x)/2) + " " + (p10.y) + " " + "0 0 0 " + p9.x + " " + p9.y+ " ";
             d += "A" + ((p8.x-p9.x)/2) + " " + (p9.y) + " " + "0 0 0 " + p8.x + " " + p8.y+ " ";
             d += "A" + ((p7.x-p8.x)) + " " + ((p7.y-p8.y)/2) + " " + "0 0 0 " + p7.x + " " + p7.y+ " ";
             d += "A" + ((p6.x-p7.x)) + " " + ((p7.y-p8.y)/2) + " " + "0 0 0 " + p6.x + " " + p6.y+ " ";*/
            /*
             d += "A" + ((p5.x-p6.x)/2) + " " + ((p5.y-p6.y)/2) + " " + "0 0 1 " + p6.x + " " + p6.y+ " ";
             d += "A" + ((p6.x-p7.x)/2) + " " + ((p6.y-p7.y)/2) + " " + "0 0 1 " + p7.x + " " + p7.y+ " ";
             d += "A" + ((p8.x-p7.x)/2) + " " + ((p7.y-p8.y)/2) + " " + "0 0 1 " + p8.x + " " + p8.y+ " ";
             d += "A" + ((p9.x-p8.x)/2) + " " + ((p8.y-p9.y)/2) + " " + "0 0 1 " + p9.x + " " + p9.y+ " ";
             d += "A" + ((p10.x-p9.x)/2) + " " + ((p9.y-p10.y)/2) + " " + "0 0 1 " + p10.x + " " + p10.y+ " ";
             d += "A" + ((p11.x-p10.x)/2) + " " + ((p10.y-p11.y)/2) + " " + "0 0 1 " + p11.x + " " + p11.y+ " ";
             d += "A" + ((p1.x-p11.x)/2) + " " + ((p1.y-p11.y)/2) + " " + "0 0 1 " + p1.x + " " + p1.y+ "Z";*/

            path.setAttributeNS(null, "d", d);
        };
    };

    var check = function(){
        this.setD = function(shape, width , height){

			var path = $(shape).find("path")[0];
			var d="M30,76q6-14,13-26q6-12,14-23q8-12,13-17q3-4,6-6q1-1,5-2q8-1,12-1q1,0,1,1q0,1-1,2q-13,11-27,33q-14,21-24,44q-4,9-5,11q-1,2-9,2q-5,0-6-1q-1-1-5-6q-5-8-12-15q-3-4-3-6q0-2,4-5q3-2,6-2q3,0,8,3q5,4,10,14z";
			path.setAttributeNS(null, "d", d);
		};
	};

    var factories = {
        memo : memo,
        line : line,
        line2 : line2,

        rect : rect,
        alpharect : alpharect,
        roundRect : roundRect,
        snip1Rect : snip1Rect,
        snip2SameRect : snip2SameRect,
        snip2DiagRect : snip2DiagRect,
        snipRoundRect : snipRoundRect,
        round1Rect : round1Rect,
        round2SameRect : round2SameRect,
        round2DiagRect : round2DiagRect,
        ellipse : ellipse,
        alphaellipse:alphaellipse,
        triangle : triangle,
        rtTriangle : rtTriangle,
        parallelogram : parallelogram,
        trapezoid : trapezoid,
        diamond : diamond,
        pentagon : pentagon,
        hexagon : hexagon,
        heptagon : heptagon,
        octagon : octagon,

        decagon : decagon,
        dodecagon : dodecagon,
        pie : pie,
        chord : chord,
        teardrop : teardrop,
        frame : frame,
        halfFrame : halfFrame,
        corner : corner,
        diagStripe : diagStripe,
        plus : plus,
        plaque : plaque,


		rightArrow : rightArrow,
        leftArrow : leftArrow,
        downArrow : downArrow,
        upArrow : upArrow,
        leftRightArrow : leftRightArrow,
        upDownArrow : upDownArrow,
        leftRightUpArrow : leftRightUpArrow,
        quadArrow : quadArrow,
        bentArrow : bentArrow,
        uTurnArrow : uTurnArrow,
        leftUpArrow : leftUpArrow,
        bentUpArrow : bentUpArrow,
        notChedRightArrow : notChedRightArrow,
        homeplate : homeplate,
		chevron : chevron,
		stripedRightArrow : stripedRightArrow,

		rightArrowCallout : rightArrowCallout,
		downArrowCallout : downArrowCallout,
		leftArrowCallout : leftArrowCallout,
		upArrowCallout : upArrowCallout,
		leftRightArrowCallout : leftRightArrowCallout,
		quadArrowCallout : quadArrowCallout,

		mathPlus : mathPlus,
		mathMinus : mathMinus,
		mathEqual : mathEqual,

		can : can,
        cube : cube,
        bevel : bevel,
        donut : donut,
        noSmoking : noSmoking,
        foldedCorner : foldedCorner,
        smileyFace : smileyFace,
        heart : heart,
        arc : arc,
        lightningBolt : lightningBolt,
        sun : sun,
        cloud : cloud,
		check : check
	};

    $.each(factories, function(name){
        factories[name].prototype = AbstractShape.prototype;
    });

    return factories;
});
