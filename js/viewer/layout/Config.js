
function Config () {
    return {

        fontFamily: [
            {name: "나눔고딕", value: "나눔고딕"},
            {name: "굴림", value: "굴림"},
            {name: "돋움", value: "돋움"},
            {name: "바탕", value: "바탕"},
            {name: "궁서", value: "궁서"},
            {name: "맑은 고딕", value: "맑은 고딕"},
            {name: "Arial", value: "Arial"},
            {name: "Courier New", value: "Courier New"},
            {name: "Georgia", value: "Geirgia"},
            {name: "Tahoma", value: "Tahoma"},
            {name: "Times New Roman", value: "Times New Roman"},
            {name: "Verdana", value: "Verdana"}
        ],

        fontSize: [
            {name: "1", value: 1},
            {name: "2", value: 2},
            {name: "3", value: 3},
            {name: "4", value: 4},
            {name: "5", value: 5},
            {name: "6", value: 6},
            {name: "7", value: 7}
        ],

        zoomRate: [
            {name: "10%", value: "0.1"},
            {name: "25%", value: "0.25"},
            {name: "50%", value: "0.5"},
            {name: "75%", value: "0.75"},
            {name: "100%", value: "1"},
            {name: "125%", value: "1.25"},
            {name: "150%", value: "1.5"},
            {name: "200%", value: "2"},
            {name: "400%", value: "4"},
            {name: "500%", value: "5"}
        ],


        sketchBorderWeight : [
            {name:"",   value:"1",  css:"line_1"},
            {name:"",	value:"2",  css:"line_2"},
            {name:"",	value:"4",  css:"line_3"},
            {name:"", 	value:"8",  css:"line_4"},
            {name:"",	value:"16",  css:"line_5"},
            {name:"",	value:"24",  css:"line_6"},
            {name:"",	value:"32",  css:"line_7"}
        ],

		sketchBorderOpacity : [
            {name:"100%",	    value:"1"},
            {name:"90%",	    value:"0.9"},
            {name:"80%",	    value:"0.8"},
            {name:"70%",     	value:"0.7"},
            {name:"60%",	    value:"0.6"},
            {name:"50%",	    value:"0.5"},
            {name:"40%",	    value:"0.4"},
            {name:"30%",	    value:"0.3"},
            {name:"20%",	    value:"0.2"},
            {name:"10%",	    value:"0.1"},
            {name:"0%",	        value:"0"}
        ],

        sketchBorderDash : [
            {name:"윤각선 없음", value:"none"},
            {name:"Solid",	value:"solid"},
            {name:"dot",	value:"dot"},
            {name:"sysDash",	value:"sysDash"},
            {name:"dash",	value:"dash"},
            {name:"lgDash",	value:"lgDash"},
            {name:"lgDashDot",	value:"lgDashDot"}
        ],

        imageOutline: [
            {name:"", 	value:"simple|none", 	css:"imageOutlineNone",  type : "image", key : "borderStyleCompound|borderStyleDashed"},
            {name:"", 	value:"simple|solid", 	css:"imageOutlineSolid", type : "image", key : "borderStyleCompound|borderStyleDashed"},
            {name:"", 	value:"simple|dashed", 	css:"imageOutlineDash",	 type : "image", key : "borderStyleCompound|borderStyleDashed"},
            {name:"", 	value:"simple|dotted", 	css:"imageOutlineDot", 	 type : "image", key : "borderStyleCompound|borderStyleDashed"},
            {name:"", 	value:"double|double", 	css:"imageOutlineDouble",type : "image", key : "borderStyleCompound|borderStyleDashed"}
        ],

        imageLinewidth: [
            {name:"1px", value:"1", css:"", type : "image", key : "borderWidth"},
            {name:"2px", value:"2", css:"", type : "image", key : "borderWidth"},
            {name:"3px", value:"3", css:"", type : "image", key : "borderWidth"},
            {name:"4px", value:"4", css:"", type : "image", key : "borderWidth"},
            {name:"5px", value:"5", css:"", type : "image", key : "borderWidth"},
            {name:"6px", value:"6", css:"", type : "image", key : "borderWidth"}
        ],

		column: [
		    {name:"하나", value:"1", css:"column", type:"column"},
            {name:"둘", value:"2", css:"column", type:"column"},
            {name:"셋", value:"3", css:"column", type:"column"},
            {name:"왼쪽", value:"4", css:"column", type:"column"},
            {name:"오른쪽", value:"5", css:"column", type:"column"}
		],

        formetStyle : [
            {name:"Normal", styleId:"a", type:"paragraph" },
            {name:"Default Paragraph Font", styleId:"a0", type:"character" },
            {name:"Hyperlink", styleId:"a3", type:"character" },
            {name:"header", styleId:"a4", type:"paragraph" },
            {name:"머리글 Char", styleId:"Char", type:"character" },
            {name:"footer", styleId:"a5", type:"paragraph" },
            {name:"바닥글 Char", styleId:"Char0", type:"character" }
        ],

        shape_stroke_width : [
            {name:"0pt",	  value:"0"},
            //{name:"0.25pt",	  value:"0.25"},
            {name:"0.5pt",	  value:"0.5"},
            //{name:"0.75pt",   value:"0.75"},
            {name:"1pt",	  value:"1"},
            {name:"1.5pt",	  value:"1.5"},
            {name:"2.25pt",	  value:"2.25"},
			{name:"3pt",	  value:"3"},
			{name:"4.5pt",	  value:"4.5"},
			{name:"6pt",	  value:"6"}
        ],

        shape_stroke_style : [
            {name:"테두리 없음", value:"none"},
            {name:"Solid",	 value:"solid"},
            {name:"Dot",  value:"dot"},
            {name:"sysDash", value:"sysDash"},
            {name:"dash", value:"dash"},
			{name:"dashDot", value:"dashDot"},
			{name:"Long Dash", value:"lgDash"},
			{name:"Long Dash Dot", value:"lgDashDot"},
			{name:"Long Dash Dot Dot", value:"lgDashDotDot"}
        ],

        stemp : {
            "check" :'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M30,76q6-14,13-26q6-12,14-23q8-12,13-17q3-4,6-6q1-1,5-2q8-1,12-1q1,0,1,1q0,1-1,2q-13,11-27,33q-14,21-24,44q-4,9-5,11q-1,2-9,2q-5,0-6-1q-1-1-5-6q-5-8-12-15q-3-4-3-6q0-2,4-5q3-2,6-2q3,0,8,3q5,4,10,14z" fill="#ff0000" /></svg>',

            "disagree" :'<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 50 400 400"><path d="M 413.11811,376.40073 C 390.60415,376.83813 340.04273,353.66785 311.40455,329.78977 C 278.25893,302.15296 275.14781,302.5754 265.06948,336.07814 C 261.95306,346.43796 258.85274,350.61056 255.22685,349.32396 C 251.19399,347.89357 250.81372,348.59878 253.62945,352.28388 C 258.41573,358.54756 235.86697,382.44849 227.92587,379.52873 C 223.67084,377.96425 223.3443,379.27415 226.36243,385.80219 C 228.46041,390.3397 228.34911,396.14183 226.11556,398.69487 C 223.88141,401.24832 223.5195,405.20713 225.31086,407.49221 C 231.32632,415.16532 225.84294,419.75952 217.96334,413.64775 C 210.63149,407.96166 210.4828,408.12236 214.67725,417.19474 C 217.32172,422.91457 217.05686,428.84607 214.01126,432.09754 C 211.22906,435.06791 206.61763,441.17426 203.7631,445.66781 C 200.90924,450.16116 196.24433,452.98102 193.39697,451.93411 C 185.82998,449.1519 179.47037,433.16122 183.912,428.08443 C 186.01257,425.68329 185.3303,421.61767 182.39546,419.05038 C 178.10324,415.29492 179.02942,410.35724 187.13187,393.80348 C 193.92351,379.92834 195.90211,372.18478 193.20663,370.03105 C 190.48492,367.85708 195.23481,349.86467 208.08767,313.66002 C 218.47086,284.41259 227.58916,258.1486 228.34999,255.29622 C 229.11093,252.44412 225.62835,246.20118 220.61059,241.42372 C 215.59259,236.64639 197.98494,214.6421 181.48212,192.52618 C 164.97919,170.40982 147.92243,147.93746 143.5783,142.587 C 114.97153,107.35596 110.17859,100.13231 109.50884,91.242727 C 109.09736,85.781385 111.15172,77.878208 114.074,73.68046 C 119.80049,65.453989 145.12296,62.427974 160.60265,68.11951 C 177.07853,74.177323 229.84409,131.97895 240.21101,155.32575 C 253.99562,186.36967 257.71816,185.99008 270.58125,152.22658 C 287.76873,107.11057 302.95556,75.180932 310.36173,68.592332 C 321.03421,59.097845 344.0643,56.248587 356.30997,62.907583 C 362.31523,66.173078 370.03092,75.264151 373.45628,83.109584 C 379.60131,97.185386 379.50976,97.605725 366.54647,114.83292 C 358.01888,126.16542 345.72325,152.254 331.50466,189.18341 L 309.59989,246.075 L 339.1492,277.09506 C 375.86212,315.63541 391.45073,330.35167 404.74023,339.0159 C 417.42813,347.28786 423.89484,360.11055 417.79228,364.89515 C 415.08383,367.01812 415.37886,368.0086 418.52783,367.3662 C 421.4188,366.7765 424.23662,368.5127 424.78934,371.22436 C 425.34264,373.93606 420.0904,376.2654 413.11811,376.40073 z"  fill="#ff0000"/></svg>',

            "electric" :'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><g><path d="M315.232,9.015C311.883,3.276,305.681,0,298.244,0h-91.308c-10.9,0-22.224,7.113-26.93,16.924 L83.17,218.041c-3.162,6.56-2.967,13.518,0.471,19.037c3.463,5.568,9.592,8.811,16.859,8.966l71.662,0.902l-51.877,129.675 c-1.276,3.235-3.959,10.014,0.821,16.981c2.089,3.056,5.674,4.926,9.364,4.926h0.837c6.999,0,11.217-5.308,13.241-7.868 L312.176,180.17c7.153-8.966,4.202-17.013,3.121-19.354c-1.122-2.243-5.625-9.592-17.046-9.592h-53.34l69.8-122.985 C318.37,21.752,318.573,14.729,315.232,9.015z"  fill="#ff0000"/></g></svg>',

            "attention" : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612"><g><path d="M605.217,501.568l-255-442C341.394,44.302,324.887,34,306,34c-18.887,0-35.394,10.302-44.217,25.568l-255,442 C2.482,509.048,0,517.735,0,527c0,28.152,22.848,51,51,51h510c28.152,0,51-22.848,51-51 C612,517.735,609.535,509.048,605.217,501.568z M50.966,527.051L305.949,85H306l0.034,0.051L561,527L50.966,527.051z M306,408 c-18.768,0-34,15.232-34,34c0,18.785,15.215,34,34,34s34-15.232,34-34S324.785,408,306,408z M272,255 c0,1.938,0.17,3.859,0.476,5.712l16.745,99.145C290.598,367.897,297.585,374,306,374s15.402-6.103,16.762-14.144l16.745-99.145 C339.83,258.859,340,256.938,340,255c0-18.768-15.215-34-34-34C287.232,221,272,236.232,272,255z" fill="#ff0000"/></g></svg>',

            "cancel" : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><path d="M13,0C9.4,0,6.2,1.5,3.8,3.8C1.4,6.2,0,9.4,0,13s1.5,6.8,3.8,9.2C6.2,24.6,9.4,26,13,26s6.8-1.5,9.2-3.8  c2.4-2.4,3.8-5.6,3.8-9.2s-1.5-6.8-3.8-9.2C19.8,1.5,16.6,0,13,0z M17.3,20.1c0.2,0.2,0.2,0.5,0,0.7l-0.1,0.1  C15.9,21.6,14.5,22,13,22c-2.5,0-4.7-1-6.4-2.6C5,17.8,4,15.5,4,13c0-1.5,0.4-2.9,1.1-4.2l0.1-0.1c0.2-0.2,0.5-0.2,0.7,0l5.7,5.7  L17.3,20.1z M22,13c0,1.5-0.4,2.9-1.1,4.2l-0.1,0.1c-0.2,0.2-0.5,0.2-0.7,0l-5.7-5.7L8.7,5.9c-0.2-0.2-0.2-0.5,0-0.7l0.1-0.1  C10.1,4.4,11.5,4,13,4c2.5,0,4.7,1,6.4,2.6C21,8.3,22,10.5,22,13z" fill="#ff0000"/></svg>',

            "arroba" : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124"><g><path d="M18.25,106.7c5.6,5.399,12.3,9.8,20.1,12.8c7.8,3,16.5,4.6,25.9,4.6c10.5,0,20.2-1.6,28.9-4.899 c7.9-2.9,1.1-17.601-4.7-15.2c-6.399,2.7-14.2,4.1-23.101,4.1c-7,0-13.399-1.1-19-3.199c-5.6-2.101-10.5-5.101-14.5-9 c-4-3.9-7.2-8.7-9.4-14.2c-2.3-5.601-3.4-12-3.4-19c0-6.6,1.1-12.9,3.3-18.5c2.2-5.6,5.2-10.6,9.2-14.6c3.9-4.1,8.7-7.4,14.2-9.7 c5.5-2.3,11.7-3.5,18.5-3.5c6.301,0,12.1,0.9,17.301,2.5c5.1,1.6,9.5,4.1,13.199,7.4c3.7,3.3,6.6,7.3,8.7,12.1 c2.101,4.8,3.101,10.4,3.101,16.8c0,3.7-0.4,7.2-1.201,10.5c-0.799,3.1-1.799,5.899-3.199,8.1c-1.301,2.101-2.801,3.8-4.6,5 c-2.101,1.4-5.201,2.2-7.601, 1.4c-3-1-2.399-5.2-2.2-7.7c0.301-3.4,1.2-6.6,1.9-9.9c1.1-5.4,2.3-10.7,3.4-16 c0.6-2.9,1.299-5.9,1.899-8.8c0.8-3.7-2-7.3-5.899-7.3h-4.4c-2.7,0-5.1,1.8-5.801,4.4c-0.299,1.2-0.6,2.2-0.6,2.2 c-2.199-6.8-10.3-8.7-16.7-8.6c-8.4,0.1-16.1,4.4-21.7,10.5c-0.5,0.6-1.1,1.2-1.6,1.8c-2.9,3.5-5.1,7.6-6.6,11.9 c-1.6,4.6-2.4,9.3-2.4,14.1c0,4.101,0.6,8,1.7,11.5c1.2,3.601,2.9,6.7,5.1,9.3c2.2,2.601,5,4.7,8.3,6.2c3.3,1.5,7,2.3,11,2.3 c3,0,5.8-0.5,8.3-1.399c2.4-0.9,4.6-2,6.5-3.3c1.5-1,2.9-2.2,4-3.301c0.699,1.301,1.5,2.4,2.6,3.5c2.801,3,7.1,4.5,12.801,4.5 c4.5,0,8.899-0.899,13-2.699c4.1-1.801,7.799-4.601,10.899-8.2c3-3.601,5.5-8,7.3-13.2c1.801-5.2,2.7-11.2,2.7-17.8 		c0-9-1.7-17-5-23.7s-7.8-12.4-13.399-16.9c-5.5-4.5-11.9-7.8-19-10.1C79.05,1.1,71.75,0,64.25,0c-8.7,0-17,1.6-24.7,4.7 c-7.7,3.2-14.5,7.6-20.2,13.1c-5.8,5.5-10.4,12.2-13.7,19.7c-3.3,7.5-5,15.9-5,24.7c0,8.899,1.5,17.3,4.6,24.8 C8.25,94.6,12.65,101.2,18.25,106.7z M72.349,64.7c-0.699,2.7-1.699,5.3-3.1,7.7c-1.4,2.3-3.1,4.199-5.3,5.699 c-2,1.4-4.4,2.101-7.4,2.101c-1.9,0-3.4-0.4-4.5-1.101c-1.2-0.8-2.2-1.8-2.9-3.1c-0.8-1.4-1.3-2.9-1.6-4.4 c-0.3-1.6-0.5-3.1-0.5-4.399c0-2.8,0.4-5.6,1.2-8.5c0.8-2.8,1.9-5.4,3.4-7.6c1.5-2.2,3.2-4,5.3-5.4c1.9-1.3,4-1.9,6.5-1.9 c2,0,3.601,0.3,4.8,1c1.2,0.7,2.2,1.6,2.9,2.7c0.8,1.2,1.3,2.6,1.699,4.1c0.4,1.7,0.601,3.5,0.601,5.2 C73.349,59.3,73.05,61.9,72.349,64.7z" fill="#ff0000"/></g></svg>',

            "star" : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 474 474"><polygon points="473.486,182.079 310.615,157.952 235.904,11.23 162.628,158.675 0,184.389 117.584,299.641 91.786,462.257 237.732,386.042 384.416,460.829 357.032,298.473 " fill="#ff0000"/></svg>',

            "telephone" : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 402 402"><g><path d="M401.129,311.475c-1.137-3.426-8.371-8.473-21.697-15.129c-3.61-2.098-8.754-4.949-15.41-8.566 c-6.662-3.617-12.709-6.95-18.13-9.996c-5.432-3.045-10.521-5.995-15.276-8.846c-0.76-0.571-3.139-2.234-7.136-5 c-4.001-2.758-7.375-4.805-10.14-6.14c-2.759-1.327-5.473-1.995-8.138-1.995c-3.806,0-8.56,2.714-14.268,8.135 c-5.708,5.428-10.944,11.324-15.7,17.706c-4.757,6.379-9.802,12.275-15.126,17.7c-5.332,5.427-9.713,8.138-13.135,8.138 c-1.718,0-3.86-0.479-6.427-1.424c-2.566-0.951-4.518-1.766-5.858-2.423c-1.328-0.671-3.607-1.999-6.845-4.004 c-3.244-1.999-5.048-3.094-5.428-3.285c-26.075-14.469-48.438-31.029-67.093-49.676c-18.649-18.658-35.211-41.019-49.676-67.097 c-0.19-0.381-1.287-2.19-3.284-5.424c-2-3.237-3.333-5.518-3.999-6.854c-0.666-1.331-1.475-3.283-2.425-5.852 		s-1.427-4.709-1.427-6.424c0-3.424,2.713-7.804,8.138-13.134c5.424-5.327,11.326-10.373,17.7-15.128 c6.379-4.755,12.275-9.991,17.701-15.699c5.424-5.711,8.136-10.467,8.136-14.273c0-2.663-0.666-5.378-1.997-8.137 c-1.332-2.765-3.378-6.139-6.139-10.138c-2.762-3.997-4.427-6.374-4.999-7.139c-2.852-4.755-5.799-9.846-8.848-15.271 c-3.049-5.424-6.377-11.47-9.995-18.131c-3.615-6.658-6.468-11.799-8.564-15.415C98.986,9.233,93.943,1.997,90.516,0.859 C89.183,0.288,87.183,0,84.521,0c-5.142,0-11.85,0.95-20.129,2.856c-8.282,1.903-14.799,3.899-19.558,5.996 c-9.517,3.995-19.604,15.605-30.264,34.826C4.863,61.566,0.01,79.271,0.01,96.78c0,5.135,0.333,10.131,0.999,14.989 c0.666,4.853,1.856,10.326,3.571,16.418c1.712,6.09,3.093,10.614,4.137,13.56c1.045,2.948,2.996,8.229,5.852,15.845 c2.852,7.614,4.567,12.275,5.138,13.988c6.661,18.654,14.56,35.307,23.695,49.964c15.03,24.362,35.541,49.539,61.521,75.521 c25.981,25.98,51.153,46.49,75.517,61.526c14.655,9.134,31.314,17.032,49.965,23.698c1.714,0.568,6.375,2.279,13.986,5.141 c7.614,2.854,12.897,4.805,15.845,5.852c2.949,1.048,7.474,2.43,13.559,4.145c6.098,1.715,11.566,2.905,16.419,3.576 c4.856,0.657,9.853,0.996,14.989,0.996c17.508,0,35.214-4.856,53.105-14.562c19.219-10.656,30.826-20.745,34.823-30.269 c2.102-4.754,4.093-11.273,5.996-19.555c1.909-8.278,2.857-14.985,2.857-20.126C401.99,314.814,401.703,312.819,401.129,311.475z" fill="#ff0000"/></g></svg>'
        },

		noimage : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAxkAAARjCAYAAAF0+tlAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAGDNJREFUeNrs0TEBAAAIwzDAv+dhY0cqodkko57OAiACAkRAgAgIEAEBIiACAkRAgAgIEAEBIiACAkRAgAgIEAEBIiACAkRAgAgIEAEBIiACAkRAgAgIEAEBIiACAkRAgAgIEAEBIiACAkRAgAgIEAEBIiACAkRAgAgIEAEBIiACAkRAgAgIEAEBIiACAkRAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAansB2KcDGgAAGIRhuX/RuxA6CTRcZQXvEAwYggFDMGAIBgzBgCEYMARDMGAIBgzBgCEYMAQDhmDAEAzBgCEYMAQDhmDAEAwYggHDBDAEA4ZgwBAMGIIBQzBgCIZgwBAMGIIBQzBgCAYMwYAhGIIBQzBgCAYMwYAhGDAEA4ZgCAYMwYAhGDAEA4ZgwBAMGIIhGDAEA4ZgwBAMGIIBQzBgCIZgwBAMGIIBQzBgCAYMwYAhGIIBQzBgCAYMwYAhGDAEA4ZgCAYMwYAhGDAEA4ZgwBCMyV4AAdipYxoAABiGYRp/0BmMPjaESulVVgBPBeIAcYA4QBwgDhAHiAPEAeIAcQDiAHGAOEAcIA4QB4gDxAHiAHGAOABxgDhAHCAOEAeIA8QB4gBxgDhAHIA4QBwgDhAHiAPEAeIAcYA4QBwgDhCHCUAcIA4QB4gDxAHiAHGAOEAcIA4QByAOEAeIA8QB4gBxgDhAHCAOEAeIAxAHiAPEAeIAcYA4QBwgDhAHiAPEAYgDxAHiAHGAOEAcIA4QB4gDxAHiAMQB4gBxgDhAHCAOEAeIA8QB4gBxgDgAcYA4QBwgDhAHiAPEAeIAcYA4QByAOEAcIA4QB4gDxAHiAHGAOEAcIA5AHCAOEAeIA8QB4gBxgDhAHCAOEAcgDhAHiAPEAeKAlReAvTogAQCAYRjG/YvudQwSCYOyq6wAXgOEAcIAYYAwQBggDBAGCAOEAcIAYYAwAGGAMEAYIAwQBggDhAHCAGGAMEAYIAwQBggDEAYIA4QBwgBhgDBAGCAMEAYIA4QBwgBhAMIAYYAwQBggDBAGCAOEAcIAYYAwQBggDBAGIAwQBggDhAHCAGGAMEAYIAwQBggDhAHCAGEAwgBhgDBAGCAMEAYIA4QBwgBhgDBAGCAMQBggDBAGCAOEAcIAYYAwQBggDBAGCAOEAcIAhAHCAGGAMEAYIAwQBggDhAHCAGGAMEAYgDBAGCAMEAYIA4QBwgBhgDBAGCAMEAYIA4QBCAOEAcIAYYAwQBggDBAGCAOEAcIAYYAwAGGAMEAYIAwQBggDhAHCAGGAMEAYIAwQBggDEAYIA4QBwgBhgDBAGCAMEAYIA4QBwgBhgDAAYYAwQBggDBAGCAOEAcIAYYAwQBggDBAGIAwQBggDhAHCAGGAMEAYIAwQBggDhAHCAGEAwgBhgDBAGCAMEAYIA4QBwgBhgDBAGCAMQBggDBAGCAOEAcIAYYAwQBggDBAGCAOEAcIAhAHCAGGAMEAYIAwQBggDhAHCAGGAMEAYIAwTgDBAGCAMEAYIA4QBwgBhgDBAGCAMEAYIAxAGCAOEAcIAYYAwQBggDBAGCAOEAcIAYYAwAGGAMEAYIAwQBggDhAHCAGGAMEAYIAwQBiAMEAYIA4QBwgBhgDBAGCAMGPMCsFvHNAAAMAzDNP6gMxyVbAh90qusAIA3BYBoACAaAIgGAKIBgGgAgGgAIBoAiAYAogGAaAAgGgAgGgCIBgCiAYBoACAaAIgGAIgGAKIBgGgAIBoAiAYAogGAaACAaAAgGgCIBgCiAYBoACAaACAaAIgGAKIBgGgAIBoAiAYAiAYAogGAaAAgGgCIBgCiAYBoAIBoACAaAIgGAKIBgGgAIBoAIBoAiAYAogGAaAAgGgCIBgCIBgCiAYBoACAaAIgGAKIBgGiYAADRAEA0ABANAEQDANEAQDQAQDQAEA0ARAMA0QBANAAQDQAQDQBEAwDRAEA0ABANAEQDAEQDANEAQDQAEA0ARAMA0QBANABANAAQDQBEAwDRAEA0ABANABANAEQDANEAQDQAEA0ARAMARAMA0QBANAAQDQBEAwDRAEA0AEA0ABANAEQDANEAQDQAEA0AEA0ARAMA0QBANAAQDQBEAwBEAwDRAEA0ABANAEQDANEAANEAQDQAEA0ARAMA0QBANAAQDQAQDQBEAwDRAEA0ABANAEQDAEQDANEAQDQAEA0ARAMA0QAA0QBANAAQDQBEAwDRAEA0ABANABANAEQDANEAQDQAEA0ARAMARAMA0QBANAAQDQBEAwDRAADRAEA0ABANAEQDANEAQDQAQDQAEA0ARAMA0QBANAAQDQBEAwBEAwDRAEA0ABANAEQDANEAANEAQDQAEA0ARAMA0QBANABANAAQDQBEAwDRAEA0ABANAEQDAEQDANEAQDQAEA0ARAMA0QAA0QBANAAQDQBEAwDRAEA0AEA0ABANAEQDANEAQDQAEA0ARAMARAMA0QBANAAQDQBEAwDRAADRAEA0ABANAEQDANEAQDQAQDQAEA0ARAMA0QBANAAQDQAQDQBEAwDRAEA0ABANAEQDANEAANEAQDQAEA0ARAMA0QBANABANAAQDQBEAwDRAEA0ABANABANAEQDANEAQDQAEA0ARAMA0QAA0QBANAAQDQBEAwDRAEA0AEA0ABANAEQDANEAQDQAEA0AEA0ARAMA0QBANAAQDQBEAwBEAwDRAEA0ABANACa8AOzXMQ0AAAzDMI0/6IxGDxtCn6hXWQEALwMAwQBAMAAQDAAEAwDBAEAwAEAwABAMAAQDAMEAQDAAEAwABAMABAMAwQBAMAAQDAAEAwDBAEAwTACAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYACAYAAgGAIIBgGAAIBgACAYAggEAggGAYAAgGAAIBgCCAYBgACAYJgBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMABAMAAQDAMEAQDAAEAwABAMAwQAAwQBAMAAQDAAEAwDBAEAwABAMEwAgGAAIBgCCAYBgACAYAAgGAAgGAIIBgGAAIBgACAYAggGAYACAYAAgGAAIBgCCAYBgACAYAAgGAAgGAIIBgGAAIBgAbHoB2rFjIgAAEAZih3/RjwQWxkRCt+9UVgAAAN54pQAAAJEBAACIDAAAQGQAAACIDAAAQGQAAAAiAwAAQGQAAAAiAwAAEBkAAIDIAAAAEBkAAIDIAAAARAYAAIDIAAAARAYAACAyAAAARAYAACAyAAAAkQEAAIgMAAAAkQEAAIgMAABAZAAAAIgMAABAZAAAACIDAABAZAAAACIDAAAQGQAAgMgAAAAQGQAAgMgAAABEBgAAgMgAAABEBgAAIDIAAABEBgAAIDIAAACRAQAAiAwAAACRAQAAiAwAAEBkAAAAiAwAAEBkAAAAIgMAAEBkAAAAIgMAABAZAACAyAAAABAZAACAyAAAAEQGAACAyAAAAEQGAAAgMgAAAEQGAAAgMgAAAJEBAACIDAAAAJEBAACIDAAAQGQAAACIDAAAQGQAAAAiAwAAEBkmAAAARAYAACAyAAAAkQEAACAyAAAAkQEAAIgMAAAAkQEAAIgMAABAZAAAACIDAABAZAAAACIDAAAQGQAAACIDAAAQGQAAgMgAAAAQGQAAgMgAAABEBgAAIDIAAABEBgAAIDIAAACRAQAAIDIAAACRAQAAiAwAAACRAQAAiAwAAEBkAAAAIgMAAEBkAAAAIgMAABAZAAAAIgMAABAZAACAyAAAABAZAACAyAAAAEQGAAAgMgAAAEQGAAAgMgAAAJEBAAAgMgAAAJEBAACIDAAAAJEBAACIDAAAQGQAAAAiAwAAQGQAAAAiAwAAEBkAAAAiAwAAEBkAAIDIAAAAEBkAAIDIAAAARAYAACAyAAAARAYAACAyAAAAkQEAACAyAAAAkQEAAIgMAABAZAAAAIgMAABAZAAAACIDAABAZAAAACIDAAAQGQAAACIDAAAQGQAAgMgAAABEBgAAgMgAAABEBgAAIDIAAABEBgAAIDIAAACRAQAAIDIAAACRAQAAiAwAAEBkAAAAiAwAAEBkAAAAIgMAAEBkAAAAIgMAABAZAAAAIgMAABAZAACAyAAAAEQGAACAyAAAAEQGAAAgMgAAAEQGAAAgMgAAAJEBAAAgMgAAAJEBAACIDAAAQGQAAACIDAAAQGQAAAAiAwAAQGQAAAAiAwAAEBkAAAAiAwAAEBkAAIDIAAAARAYAAIDIAAAARAYAACAyAAAARAYAACAyAAAAkQEAACAyAAAAkQEAAIgMAABAZAAAAIgMAABAZAAAACIDAABAZAAAACIDAAAQGQAAgMgAAAAQGQAAgMgAAABEBgAAgMgAAABEBgAAIDIAAABEBgAAIDIAAACRAQAAiAwAAACRAQAAiAwAAEBkAAAAiAwAAEBkAAAAIgMAAEBkAAAAIgMAABAZAACAyAAAABAZAACAyAAAAEQGAACAyAAAAEQGAAAgMgAAAEQGAAAgMgAAAJEBAACIDAAAAJEBAACIDAAAQGQAAACIDAAAQGQAAAAiAwAAQGQAAAAiAwAAEBkAAIDIAAAAEBkAAIDIAAAARAYAAIDIAAAARAYAACAyAAAARAYAACAyAAAAkQEAAIgMAAAAkQEAAIgMAABAZAAAAIgMAABAZAAAACIDAABAZAAAACIDAAAQGQAAgMgAAAAQGQAAgMgAAABEBgAAgMgAAABEBgAAIDIAAACRAQAAIDIAAACRAQAAiAwAAACRAQAAiAwAAEBkAAAAiAwAAEBkAAAAIgMAABAZAAAAIgMAABAZAACAyAAAABAZAACAyAAAAEQGAACAyAAAAEQGAAAgMgAAAJEBAAAgMgAAAJEBAACIDAAAAJEBAACIDAAAQGQAAACIDAAAQGQAAAAiAwAAEBkAAAAiAwAAEBkAAIDIAAAAEBkAAIDIAAAARAYAAIDIAAAARAYAACAyAAAAkQEAACAyAAAAkQEAAIgMAAAAkQEAAIgMAABAZAAAAIgMAABAZAAAACIDAAAQGQAAACIDAAAQGQAAgMgAAAAQGQAAgMgAAABEBgAAIDJMAAAAiAwAAEBkAAAAIgMAAEBkAAAAIgMAABAZAAAAIgMAABAZAACAyAAAAEQGAACAyAAAAEQGAAAgMgAAAEQGAAAgMgAAAJEBAAAgMgAAAJEBAACIDAAAQGQAAACIDAAAQGQAAAAiAwAAQGQAAAAiAwAAEBkAAAAiAwAAEBkAAIDIAAAARAYAAIDIAAAARAYAACAyAAAARAYAACAyAAAAkQEAACAyAAAAkQEAAIgMAABAZAAAAIgMAABAZAAAACIDAABAZAAAACIDAAAQGQAAACIDAAAQGQAAgMgAAABEBgAAgMgAAABEBgAAIDIAAABEBgAAIDIAAACRAQAAIDIAAACRAQAAiAwAAEBkAAAAiAwAAEBkAAAAIgMAAEBkAAAAIgMAABAZAACAyAAAABAZAACAyAAAAEQGAACAyAAAAEQGAAAgMgAAAEQGAAAgMgAAAJEBAACIDAAAAJEBAACIDAAAQGQAAACIDAAAQGQAAAAiAwAAQGQAAAAiAwAAEBkAAIDIAAAAEBkAAIDIAAAARAYAAIDIAAAARAYAACAyAAAARAYAACAyAAAAkQEAAIgMAAAAkQEAAIgMAABAZAAAAIgMAABAZAAAACIDAABAZAAAACIDAAAQGQAAgMgAAAAQGQAAgMgAAABEBgAAgMgAAABEBgAAIDIAAABEBgAAIDIAAACRAQAAiAwAAACRAQAAiAwAAEBkAAAAiAwAAEBkAAAAIgMAAEBkAAAAIgMAABAZAACAyAAAABAZAACAyAAAAEQGAACAyAAAAEQGAAAgMgAAAJEBAAAgMgAAAJEBAACIDAAAAJEBAACIDAAAQGQAAACIDAAAQGQAAAAiAwAAEBkAAAAiAwAAEBkAAIDIAAAAEBkAAIDIAAAARAYAAIDIAAAARAYAACAyAAAAkQEAACAyAAAAkQEAAIgMAAAAkQEAAIgMAABAZAAAAIgMAABAZAAAACIDAAAQGQAAACIDAAAQGQAAgMgAAAAQGQAAgMgAAABEBgAAgMgAAABEBgAAIDIAAACRAQAAIDIAAACRAQAAiAwAAACRAQAAiAwAAEBkAAAAiAwAAEBkAAAAIgMAABAZAAAAIgMAABAZAACAyAAAABAZAACAyAAAAEQGAACAyAAAAEQGAAAgMgAAAJEBAAAgMgAAAJEBAACIDAAAAJEBAACIDAAAQGQAAAAiAwAAQGQAAAAiAwAAEBkAAAAiAwAAEBkAAIDIAAAAEBkAAIDIAAAARAYAACAyAAAARAYAACAyAAAAkQEAACAyAAAAkQEAAIgMAAAAkQEAAIgMAABAZAAAACIDAABAZAAAACIDAAAQGQAAACIDAAAQGQAAgMgAAAAQGQAAgMgAAABEBgAAIDIAAABEBgAAIDIAAACRAQAAcFv6TyVb9cHikAAAAABJRU5ErkJggg=="
	}

}


module.exports = Config;

