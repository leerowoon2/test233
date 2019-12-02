
module.exports = {

	
	"mode" : "dev",

	"ver" : "1.2.10",
	
	"lang" : "ko",
	
	"wrap" : "html5viewer",

	"company" :{
		"display" : true,
		"logo" : "../images/kuku_Logo.png",
		"title" : "kukudocs"
	},

	"button" : {
		"download" : true,
		"outline" : true,
		"search" : true,
		"pagejump" : true
	},

	
	"annotation" : {
		"fontFamily" : "Gulim",
		"fontSize" : "30",
		"fontColor" : "rgb(0,0,0)",
		"bgColor" : "rgb(91, 155, 213)"
	},

	"toolbar" : {

		"desktop" : [
			/*"download", "print", "fullscreen", "tts", "pagejump", "helpcall", "memo", "highlight", "bookmark", "tel"*/
		],
		"mobile" : [
			/*"download", "print", "fullscreen", "tts", "pagejump", "helpcall", "memo", "highlight", "bookmark", "tel"*/
		],
		"tablet" : [
			/*"download", "print", "fullscreen", "tts", "pagejump", "helpcall", "memo", "highlight", "bookmark", "tel"*/
		],
		"olist" : {
			"bar"        : {"type":"bar"},
			"download"   : {"id":"download", "title":"다운로드", "icon":"kk-icon-get_app", "style":"", "type":"btn", "device":"all"},
			"bookmark"   : {"id":"bookmark", "title":"책갈피", "icon":"kk-icon-star_border", "style":"", "type":"btn", "device":"all"},
			"fullscreen" : {"id":"fullscreen", "title":"전체화면", "icon":"kk-icon-zoom_out_map", "style":"", "type":"btn", "device":"desktop"},
			"print"      : {"id":"print", "title":"인쇄",  "icon":"kk-icon-print", "style":"", "type":"btn", "device":"desktop"},
			"tts"        : {"id":"tts", "title":"음성듣기", "icon":"kk-icon-volume_up", "style":"", "type":"btn", "device":"all"},
			"memo"       : {"id":"memo", "title":"메모", "icon":"kk-icon-event_note", "style":"", "type":"btn", "device":"all"},
			"highlight"  : {"id":"highlight", "title":"하일라이트", "icon":"kk-icon-border_color", "style":"font-size:20px;", "type":"btn", "device":"all"},
		
			"sketch"  : {"id":"sketch", "title":"스케치", "icon":"kk-icon-mode_edit", "style":"font-size:20px;", "type":"btn", "device":"all"},
			"pagejumpview": {"id":"pagejumpview", "title":"페이지이동", "icon":"kk-icon-settings_ethernet", "style":"", "type":"btn", "device":"mobile"},
			"pagejump"   : {"id":"pagejump", "title":"페이지이동", "icon":"kk-icon-settings_ethernet", "style":"", "type":"btn", "device":"mobile"},
			"helpcall"   : {"id":"helpcall", "title":"상담톡", "icon":"kk-icon-commenting-o", "style":"", "type":"btn", "device":"mobile"},
			"tel"        : {"id":"tel", "title":"콜센터", "icon":"kk-icon-phone", "style":"", "type":"btn", "device":"mobile"},

			"ebookview"   : {"id":"ebookview", "title":"이북보기", "icon":"kk-icon-import_contacts", "style":"", "type":"btn","device":"desktop"},
			"slideview"   : {"id":"slideview", "title":"슬라이드", "icon":"kk-icon-view_carousel", "style":"", "type":"btn","device":"desktop"},
	

			"thumbview"   : {"id":"thumbview", "title":"썸네일보기", "icon":"kk-icon-apps", "style":"", "type":"btn", "device":"mobile"},
			
			"outlineview"  : {"id":"outlineview", "title":"목차", "icon":"kk-icon-format_list_bulleted", "style":"", "type":"btn", "device":"mobile"},
			"searchview" : {"id":"searchview", "title":"검색", "icon":"kk-icon-search", "style":"", "type":"btn", "device":"mobile"},
			
			"bookmarkview"   : {"id":"bookmarkview", "title":"북마크", "icon":"kk-icon-folder_special", "style":"", "type":"btn", "device":"mobile"},
		}
	},

	"sidebar" : {
		"load" : "off",
		"mode" : "thumb",
		"list" : ["thumbview","outlineview","searchview","bookmarkview"]
	},

	"fileinfo" : {
		"doc_id" : "12345",
		//"filepath" : "../data/test.pdf",
		"title" : "test",
		"watermark" : "",
	},
	
	"loading" : {
		"passwordNeed" : "",
		"isUseTextDom" : true,
		"submenubar" : false,
		"filepath" : "",
		"errorfilepath" : "",
		"basePath" : '../js/build/lib',
		"workerPathName" : "worker.js",
		"viewmode": "slide",
		"countChecker" : false,
		"ttsType" : "tag",   //tag, page, pagetext, file
		"tts" : "speechSynthesis"
	},
	
	"lock" : {
		"expired" : "date",
		//"enddate":"MjAyMC0wMi0zMCAxMzo1MTo1MCBHTVQ=",
		"enddate":"MjAyNS0wOC0xNSAxMzo1MTo1MCBHTVQ=",
		//"enddate":window.btoa("2020-02-30 13:51:50 GMT"),
		//"enddate":window.btoa("2025-08-15 13:51:50 GMT"),
		"domain":[
			"127.0.0.1",
			"localhost",
			//"hanwhawm.com",
			//"smartcma.co.kr"
		]
	}
};