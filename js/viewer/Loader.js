require('./lib/jquery-ui-touch-punch');
require('./layout/jquery-ui-kukudocs');

require('./lib/current-device');

require('./lib/jquery-scrollspy');
require('./lib/tree.jquery');
require('./lib/turnjs4/lib/turn');

require('./lib/pdf');
require('./lib/compatibility');

var SettingsDef = require('./SettingsDef');
var Mustache    = require('./lib/mustache');
var Menu        = require('./layout/Menu');
var Layout      = require('./layout/Layout');

var TextLayerBuilder = require('./lib/text_layer_builder');
var IScroll     = require('./lib/iscroll-zoom');
var PinchZoom   = require('./lib/pinch-zoom');
var Swiper      = require('./lib/swiper');
var Drawing     = require('./extension/Drawing');
var FullScreen  = require('./extension/FullScreen');
var Print       = require('./extension/Print');
var Watermark   = require('./extension/Watermark');

function Loader() {

	this.documentId = 0;
	this.current = 1;
	this.currentFile = 0;
	this.totalSlide = [];
	this.isIE = false;
	this.isMobile = false;

	this.menuSwiper = null;
	this.menu = null;
	this.mobileZoom = 1;
	this.zoomSpac = [1,1.25,1.5,2,3,4,5];
	this.db = null;

	this.ratio = 1;
	this.scale = 1;
	this.zoom  = 1;
	this.comp  = 1;

	this.pz = [];
	this.sl = [];
	this.tts = [];

	this.history = [];
	this.history_id = 0;

	this.sketch = [];
	this.drawing = null;

	this.isSlideView = false;
	this.isEbookView = false;

	this.searchfull = [];
	this.searchCurrent = 0;
	this.thumbComp = 1;
	this.pdfDocument = [];
	this.pdfDocumentPath = [];

	this.viewportTemp = 1;

	window.SettingsDef = SettingsDef;

	this.viewmode = SettingsDef.loading.viewmode;
	this.sidePadding = 10;
	this.swiper = null;
	this.myScroll = null;
	this.iScroll = null;
	this.pinchZoom = null;
	this.watermark = null;

	this.isUseTextDom = SettingsDef.loading.isUseTextDom;
	this.cashPageIndex = {};
	this.cashPageKey = {};
	this.print = null;

	PDFJS.disableWorker = false;
	PDFJS.disableStream = false;
	PDFJS.disableWebGL = true;
	PDFJS.workerSrc =  SettingsDef.loading.basePath+'/'+ SettingsDef.loading.workerPathName;
	PDFJS.cMapUrl =  SettingsDef.loading.basePath+'/cmaps/';
	PDFJS.cMapPacked = true;

	
/*
	PDFJS.GlobalWorkerOptions.workerSrc = SettingsDef.loading.basePath+'/worker.js';
	PDFJS.GlobalWorkerOptions.disableWorker = false;
	PDFJS.GlobalWorkerOptions.disableStream = false;
	PDFJS.GlobalWorkerOptions.disableAutoFetch = true;
	//PDFJS.disableWebGL = false;
	PDFJS.GlobalWorkerOptions.cMapUrl = SettingsDef.loading.basePath+'/cmaps/';
	PDFJS.GlobalWorkerOptions.cMapPacked = true;
*/	


}

Loader.prototype = {
	init : function (SettingsDef) {
		var _this = this;
		_this.documentId = SettingsDef.loading.filename;
		_this.mode = $("body").attr("mode");
		_this.expired();
		this.watermark = new Watermark(SettingsDef);
		var layout = new Layout(SettingsDef);
		layout.create(function(){
			if(window.location.hash) {
				_this.current = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
			}
			//$('html, body').css({'overflow': 'hidden', 'height': '100%'});
			if(SettingsDef.fileinfo.multi){

				if(device.type == "desktop") {
					$(".tabbar").hide();
				}else{
					$(".tabbar .tab").on("click",function(){
						$(".tabbar .tab").removeClass("active");
						$(this).addClass("active");
						var doc = $(this).attr("doc");
						_this.changDoc(doc);
						return false;
					});
				}
			}

			if($(".btnAction .btnBox").length < 4){
				$(".wrapBtnAction").css("height","130px");
			}
		});

		_this.drawing = new Drawing();
		_this.menu = new Menu();
        _this.menu.init(SettingsDef,_this);

		if(SettingsDef.loading.opendb){
			_this.db = openDatabase('kukudocs', '1.0', 'pdfviewer', 2 * 1024 * 1024);
			_this.db.transaction(function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS bookmark (id INTEGER PRIMARY KEY AUTOINCREMENT, mode TEXT, doc_id TEXT, page INTEGER, position TEXT, title TEXT, summary TEXT, adddate TEXT)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS sketch (id INTEGER PRIMARY KEY AUTOINCREMENT, doc_id TEXT, page INTEGER, path TEXT, adddate TEXT)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS fulltext (id INTEGER PRIMARY KEY AUTOINCREMENT, doc_id TEXT, page INTEGER, content TEXT, summary TEXT, adddate TEXT)');
			});
		}

		if(SettingsDef.loading.autoDownload){
			var wrap = '';
			wrap = '' +
			'<div class="authView"><div class="editView">' +
				'<p>고객님! <br>가입하신 상품의 약관을 다운로드 해주세요.</p>'+
				'<div class="singlelinetext" style="margin-top:50px; margin-right:20px;">' +
					'<a class="btn download" mode="download" href="#">약관 다운로드</a>' +
					'<a class="btn download cancel" mode="cancel" href="#">뷰어로 보기</a>' +
				'</div>'+
			'</div></div>';
			$("#kk_dialog").html(wrap);
			$("#kk_dialog").find(".cancel").on("click", function (e) {
				$("#kk_dialog").dialog("close");
				return false;
			});

			var ww = $(window).width() - 40;

			if(ww > 450){ ww = 450;}
			var wh = 250;
			if(device.type == "desktop"){
				ww = 450;
				wh = 250;
			}

			$("#kk_dialog").dialog({
				title:null,
				width:ww,
				height:wh,
				autoOpen:false,
				modal: true,
				resizable:false,
				open: function( event, ui ) {

				},
				buttons: {
				}
			});
		}

        if(device.type == "desktop") {
            $(".toolbar .status input").on('keydown', function(e) {
                if(e.which == 13){
                    var val = Number($(this).val());
                    if(val>0 && val <=_this.totalSlide[_this.currentFile]){
                        val = val;
                    }else if(val > _this.totalSlide[_this.currentFile]){
                        val = _this.totalSlide[_this.currentFile];
                    }else{
                        val = 1;
                    }
                    $("#kkCurrentPageNumber").val(val);
                    _this.slideTo(val);
                }
			});

			$("#document_view").on("dblclick",function(){
				_this.zoom = 1;
				$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
			});

			_this.windowResizeEnd(function(){
				_this.slider(true);
			});

		}else{
            $(".btnAction").on("click", function (e) {
                $(".btnAction").hide();
                $(".btnToolbar").show();
                return false;
            });

			$(".wrapBtnAction").on("click", function (e) {
				return false;
			});
		}

        $(".btn").on("click", function (e) {
            var mode = $(this).attr("mode");
            var url = $(this).attr("href");
            if($(this).hasClass("disable")){
            }else{
                if(!e.clientX && !e.clientY){
                    return false;
				}

				if(mode == "btnToolbar"){
					
					var _outline = $("body").attr("outline");
					if(_outline == "no"){
						$(".btnAction a[mode='outlineview']").parents(".btnBox").hide();
					}
				

					$(".btnAction").show();
					$(".btnToolbar").hide();

					if(SettingsDef.loading.ttsType == "page"){

						
						//_this.current = Number(_this.current);

						console.log(_this.current);
						console.log(_this.tts);
						if(typeof(_this.tts[_this.current]) !== "undefined"){
							$(".btnBox[action='tts']").show();
						}else{
							$(".btnBox[action='tts']").hide();
						}
					}



					if($(".btnAction .swiper-slide").length > 1){
						if(_this.menuSwiper == null){
							_this.menuSwiper = new Swiper('.wrapBtnAction', {
								pagination: {
									el: '.swiper-pagination',
								}
							});
						}
					}
				}else{
					_this.menu.menuSwitch({id:mode, url:url});
				}
            }
        });

        $(".searchbar .searchtext").on('keydown', function(e) {
            if(e.which == 13){
                _this.menu.menuSwitch({id:"searchtext"});
            }
        });

        $(".kk_colorpicker").kkColorPicker({
            callback: function(e,data){
                if(data.id == "sketchBorderColor"){
                    var color  = "";
                    if(data.color == "transparent"){
                        color  = "transparent";
                    }else{
                        color  = "#"+data.color;
                    }
                    _this.drawing.borderColor(color);
                }
            }
        });

        $(".kk_selectbox").kkSelectBox({
            displayMode: "top",
            callback: function(e,data){
                if(data.id == "sketchBorderWeight"){
                    _this.drawing.lineWidth(data.val);
                }else if(data.id == "sketchBorderOpacity"){
                    _this.drawing.globalAlpha(data.val);
                }
            }
        });

        //----------- post Message ------------------------------------------------------

			function displayMessage (evt) {
				var pram = null;
				pram = evt.data;
				if (typeof(pram.pageTo) != "undefined"){
					var val = pram.pageTo;
					//$("#kkCurrentPageNumber").val(val);
					_this.slideTo(val);
				}else{
					var m = {id:pram};
					_this.menu.menuSwitch(m);
				}
			}

			if (window.addEventListener) {
				window.addEventListener("message", displayMessage, false);
			} else {
				window.attachEvent("onmessage", displayMessage);
			}

        //----------- event -------------------------------------------------------------

			$("#lSideView .lSearchToolBarWrap input").on('keydown', function(e) {
				if(e.which == 13){
					_this.pdfDocument[_this.currentFile].then(function (info) {
						_this.searchText(info,1);
					});
				}
			});

			if(device.type == "desktop"){
				_this.ratio = 2;
				$("#zoom_rate").kkSelectBox({
					callback : function(e,date){
						_this.zoom = date.val;
						_this.zooming();
					}
				});
			}else{
				_this.ratio = _this.getDPR();
				$("body").addClass("mobile");
				$(".deskView .editView").css("top","0");
			}

			$(".toolbar .status input").on('focusout', function(e) {
				var val = Number($(this).val());
				if(val>0 && val <=_this.totalSlide[_this.currentFile]){
					val = val;
				}else if(val > _this.totalSlide[_this.currentFile]){
					val = _this.totalSlide[_this.currentFile];
				}else{
					val = 1;
				}
				$("#kkCurrentPageNumber").val(val);
				if(_this.viewmode == "ebook"){
					$(".flipbook").turn("page",val);
				}else{
					_this.slideTo(val);
				}
			});

			var files = SettingsDef.fileinfo.file;
			var filepath = SettingsDef.fileinfo.filepath;
			if(SettingsDef.fileinfo.multi){
				$.each(files, function(i,v){
					_this.pdfDocument[i] = PDFJS.getDocument(v.path);
					_this.pdfDocumentPath[i] = v.path;
				});
				if(_this.pdfDocument.length == 1){
					$(".tabbar").css("display","none");
				}
			}else{
				if(SettingsDef.loading.errorfilepath !== ""){
					var xhr = new XMLHttpRequest();
					xhr.open('HEAD', filepath, false);
					xhr.send();
					if (xhr.status == "404") {
						_this.pdfDocument[_this.currentFile] = PDFJS.getDocument(SettingsDef.loading.errorfilepath);
						_this.pdfDocumentPath[_this.currentFile] = SettingsDef.loading.errorfilepath;
					} else {
						_this.pdfDocument[_this.currentFile] = PDFJS.getDocument(filepath);
						_this.pdfDocumentPath[_this.currentFile] = filepath;
					}
				}else{
					_this.pdfDocument[_this.currentFile] = PDFJS.getDocument(filepath);
					_this.pdfDocumentPath[_this.currentFile] = filepath;
				}

				$(".tabbar").css("display","none");
			}

			_this.pdfDocument[_this.currentFile].then(function (info) {
				info.getDestinations().then(function(destination) {
					$.each(destination,function(k,v){
						info.getPageIndex(v[0]).then(function(pageIndex) {
							var _cash = [];
							var pageNum = pageIndex + 1;
							var cacheKey = v[0].num + '-' + v[0].gen + '-R';
							_this.cashPageIndex[escape(k)] = pageNum;
							_this.cashPageKey[cacheKey] = pageNum;
						}).catch(function (e) {
							// console.log('e1 : ', e)
						});
					});
				}).catch(function (e) {
				});


				info.getOutline().then(function(outline) {
					if(outline == null){
						$("body").attr("outline","no");
					}
				});



				_this.countChecker("read");
				$("#kk_pw_dialog").hide();
				$("body").attr("fingerprint",info.fingerprint);
				_this.totalSlide[_this.currentFile] = Number(info.pdfInfo.numPages);

				info.getPage(_this.current).then(function (pageInfo1) {
					_this.viewportTemp = pageInfo1.getViewport(_this.ratio);
					if(device.type == "desktop"){
						if(_this.viewmode == "ebook"){
							_this.ebook();
							$(".btn[mode='slideview']").show();
							$(".btn[mode='ebookview']").hide();
						}else{
							_this.slider();
							$(".btn[mode='slideview']").hide();
							$(".btn[mode='ebookview']").show();
						}
					}else{
						if(window.orientation == 90 || window.orientation == -90){
							_this.scroller();
						}else{
							_this.slider();
						}
					}
					_this.print = new Print(SettingsDef);
					_this.print.init(info, _this.viewportTemp, $("#printContainer")[0], _this.totalSlide[_this.currentFile]);
				});
			});

			window.addEventListener("orientationchange", function() {
				_this.orientationChanged().then(function(){
					$('.loading').removeClass("off").addClass("on");
					_this.redraw();
				});
			});


		//----------- on Password -------------------------------------------------------
			_this.pdfDocument[_this.currentFile].onPassword = function passwordNeeded(updatePassword, reason) {
				if (reason !== 1) {
					_this.countChecker("fail");
					alert("본인인증에 실패 하셨습니다. \n생년월일을 확인해 주세요.");
				}else{

				}

				var wrap = '';
				var ww = Number($(window).width() - 20);
				var wh = Number($(window).height() - 10);

				if(SettingsDef.loading.passwordNeed !== ""){
					wrap =  $("#"+SettingsDef.loading.passwordNeed).html();
				}else{
					wrap =  '<div class="authView"><div class="editView">' +
						'<div class="logo">' +
							'<img src="'+SettingsDef.company.logo+'" style="width:150px;"/>' +
						'</div>' +
						'<p>고객님의 소중한 개인정보 보호를 위해 본인확인이 필요합니다.</p>'+
						'<div class="form singlelinetext" id="phoneAuth">' +
							'<input placeholder="비밀번호입력" name="password" value="" type="password" class="auth password btned" maxlength="10"  />' +
							'<a href="#" class="btn authPswBtn" style="width:80px;">확인</a>' +
						'</div>'+
						'<div class="summaryView" style="display:block;position:relative;top:auto;left:auto;right:auto;bottom:auto; margin-left:20px;">' +
							'<ul>' +
								'<li><span style="color:#000;">생년월일 6자리</span></li>' +
							'</ul>' +
							'<br><br><ul>' +
								'<li>'+SettingsDef.company.copy+'</li>' +
							'</ul>' +
						'</div>' +
					'</div></div>';
					ww = Number($(window).width() - 20);
					wh = 400;
					if(ww > 400) { ww = 400; }
				}

				$("#kk_pw_dialog").html(wrap).show();


				$("#kk_pw_dialog input.password").on('keydown', function (e) {
					if (e.which == 13) {
						var psw = $("#kk_pw_dialog input.password").val();
						if(psw != ""){
							updatePassword(psw);

						}
					}
				});

				$("#kk_pw_dialog .authPswBtn").on("click",function(){
					var psw = $("#kk_pw_dialog input.password").val();
					if(psw != ""){
						updatePassword(psw);

					}
				});
			};
	},

	reinit : function () {
		var _this = this;
		$('.loading').removeClass("off").addClass("on");
		_this.documentId = $("body").attr("documentid");
		if(_this.isMobile == false){
			_this.ratio = _this.getDPR()*2;
			$("#zoom_rate").kkSelectBox({
				callback : function(e,date){
					_this.zoom = date.val;
					_this.zooming();
				}
			});
		}else{
			_this.ratio = _this.getDPR();
			$("body").addClass("mobile");
			$(".deskView .editView").css("top","0");
			$(".help").removeClass("on").addClass("off");
		}

		if(window.location.hash) {
			_this.current = window.location.hash.substring(1);
		}
		/*
		_this.getPdfInfo(_this.current).then(function(response) {
			_this.pdfInfo = response;
			$("body").attr("totalslide",_this.totalSlide[_this.currentFile]);
			$("#kkTotalPageNumber").html(_this.totalSlide[_this.currentFile]);
			$("#pInfo_totalPage").html(_this.totalSlide[_this.currentFile]);

			if(_this.viewmode == "ebook"){
				$(".swiper-container").hide();
				$(".flipbook-viewport").show();
				_this.ebook();

			}else{

				$(".swiper-container").show();
				$(".flipbook-viewport").hide();
				_this.slider();


			}

			if(_this.isMobile == false){
				$(".toolbar").css("display","block");
			}

			//_this.resizeLayout();
		});
		*/

		_this.pdfDocument[_this.currentFile].then(function (info) {
			//_this.countChecker("read");
			//$("#kk_pw_dialog").hide();
			//$("body").attr("fingerprint",info.fingerprint);
			_this.totalSlide[_this.currentFile] = Number(info.pdfInfo.numPages);
			info.getPage(_this.current).then(function (pageInfo1) {
				_this.viewportTemp = pageInfo1.getViewport(_this.ratio);
				if(device.type == "desktop"){
					if(_this.viewmode == "ebook"){
						_this.ebook();
						$(".btn[mode='slideview']").show();
						$(".btn[mode='ebookview']").hide();
					}else{
						_this.slider();
						$(".btn[mode='slideview']").hide();
						$(".btn[mode='ebookview']").show();
					}
				}else{
					if(window.orientation == 90 || window.orientation == -90){
						_this.scroller();
					}else{
						_this.slider();
					}
				}

			});
		});
	},

	changDoc : function (doc) {
		var _this = this;
		if(doc == _this.currentFile){ return false; }
		_this.currentFile = doc;
		_this.current = 1;

		_this.pdfDocument[_this.currentFile].then(function (info) {
			_this.countChecker("read");
			$("#kk_pw_dialog").hide();
			$("body").attr("fingerprint",info.fingerprint);
			$("#kkCurrentPageNumber").val(_this.current);
			_this.totalSlide[_this.currentFile] = Number(info.pdfInfo.numPages);
			info.getPage(_this.current).then(function (pageInfo1) {
				_this.viewportTemp = pageInfo1.getViewport(_this.ratio);
				if(device.type == "desktop"){
					if(_this.viewmode == "ebook"){
						_this.ebook();
						$(".btn[mode='slideview']").show();
						$(".btn[mode='ebookview']").hide();
					}else{
						_this.slider(true);
						$(".btn[mode='slideview']").hide();
						$(".btn[mode='ebookview']").show();
					}
				}else{
					if(window.orientation == 90 || window.orientation == -90){
						_this.scroller();
					}else{
						_this.slider(true);
					}
				}
			});
		});


		//_this.slideTo(1);
	},

	getDPR : function () {
		var mediaQuery;
		// Fix fake window.devicePixelRatio on mobile Firefox
		var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
		if (window.devicePixelRatio !== undefined && !is_firefox) {
			return window.devicePixelRatio;
		} else if (window.matchMedia) {
			mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)";
			if (window.matchMedia(mediaQuery).matches){
			return 1.5;
			}
			mediaQuery = "(-webkit-min-device-pixel-ratio: 2),(min--moz-device-pixel-ratio: 2),(-o-min-device-pixel-ratio: 2/1),(min-resolution: 2dppx)";
			if (window.matchMedia(mediaQuery).matches){
			return 2;
			}
			mediaQuery = "(-webkit-min-device-pixel-ratio: 0.75),(min--moz-device-pixel-ratio: 0.75),(-o-min-device-pixel-ratio: 3/4),(min-resolution: 0.75dppx)";
			if (window.matchMedia(mediaQuery).matches)
			return 0.7;
		} else {
			return 1;
		}
	},

	/*
    getPdfInfo : function (showPageIndex) {
		var _this = this;
		return _this.pdfDocument[_this.currentFile].then(function (info) {
			$("#kk_pw_dialog").hide();
			if(SettingsDef.loading.autoDownload){
				$("#kk_dialog").dialog("open");
			}

			$("body").attr("fingerprint",info.fingerprint);


			info.getDestinations().then(function(destination) {
				$.each(destination,function(k,v){
					info.getPageIndex(v[0]).then(function(pageIndex) {
						var _cash = [];
						var pageNum = pageIndex + 1;
						var cacheKey = v[0].num + '-' + v[0].gen + '-R';
						_this.cashPageIndex[escape(k)] = pageNum;
						_this.cashPageKey[cacheKey] = pageNum;
					}).catch(function (e) {
						// console.log('e1 : ', e)
					});
				});

				// 삼성생명 추가 부분 pdf문서 오픈시 api 호출

				if(SettingsDef.samsung_life && SettingsDef.samsung_life.is_samsung && SettingsDef.samsung_life.pdfInit && SettingsDef.samsung_life.pdfkey){
					$.ajax({
						type: "POST",
						url: SettingsDef.samsung_life.pdfInit,
						data: {
							"error": 0,
							"ckey": SettingsDef.samsung_life.pdfkey
						},
						dataType: "json",
						success: function (data) {
							// 비밀번호 오류 초기화 성공
						},
						fail: function (err) {
							// 비밀번호 오류 초기화 실패
						}
					});
				}

			}).catch(function (e) {
			});


			var pdfInfo = {
				totalSlide: Number(info.pdfInfo.numPages),
				showPage: showPageIndex ? Number(showPageIndex) : 1
			};
			_this.totalSlide[_this.currentFile] = Number(info.pdfInfo.numPages);
			return info.getPage(pdfInfo.showPage).then(function (pageInfo1) {
				pdfInfo.viewportTemp = pageInfo1.getViewport(_this.ratio);
				//_this.print = new Print(SettingsDef);
				//_this.print.init(info, pdfInfo.viewportTemp, $("#printContainer")[0], _this.totalSlide[_this.currentFile]);
				return pdfInfo;
			});
		});
	},
	*/

	loadThumbView : function(){
		var _this = this;
		_this.loadViewManager("thumbview");
		if(($("#lSideView .lSideViewWrap").attr("loaded") !== "true") || ($("#lSideView .lSideViewWrap").attr("doc") !== _this.currentFile)){
			_this.pdfDocument[_this.currentFile].then(function (info) {

				info.getPage(1).then(function (pageInfo) {
					var _w = 100;
					var viewport = pageInfo.getViewport(_this.thumbComp);
					var _o = (_w/viewport.width);
					_h = Math.floor(viewport.height*_o);
					var wrap = "";

					if(device.type == "desktop"){
						for (var i =1; i <= _this.totalSlide[_this.currentFile] ; i++){
							wrap += '<div id="pageWrap_'+i+'" loaded="loading" page="'+i+'" class="slideWrap" style="width:'+(_w)+'px;height:'+(_h+10)+'px;">'+
								'<div class="thumbWrap">'+
									'<div class="thumb"><div class="thumbZoom"></div></div>'+
								'</div>'+
								'<div class="spinner"></div>'+
							'</div>';
						}
					}else{
						for (var i =1; i <= _this.totalSlide[_this.currentFile] ; i++){
							wrap += '<div id="pageWrap_'+i+'" loaded="loading" page="'+i+'" class="slideWrap">'+
								'<div class="thumbWrap" style="width:'+(_w)+'px;height:'+(_h+10)+'px;">'+
									'<div class="thumb"><div class="thumbZoom"></div></div>'+
								'</div>'+
								'<div class="spinner"></div>'+
							'</div>';
						}
					}

					$("#lSideView .lSideViewWrap .lSideViewWrapSCroll").html(wrap);
					var scrollH = ($(window).height() - $(".toolbar").height());
					_this.loadThumbs(info,1);
					$('#lSideView .lSideViewWrap .lSideViewWrapSCroll .slideWrap').each(function(i) {
						var position = $(this).position();
						var page = Number($(this).attr("page"));
						$(this).scrollspy({
							min:position.top - scrollH,
							max:position.top,
							container: $('#lSideView .lSideViewWrap'),
							onEnter: function(element, position) {
								_this.loadThumbs(info,page);
							},
							onLeave: function(element, position) {
								_this.loadThumbs(info,page);
							}
						});
					});

					$('#lSideView .slideWrap').on("click", function (e) {
						var rid = $(this).attr("page");
						if(Number($(".editView").attr("kk_zoom")) > 1){
							_this.zoom = 1;
							if(device.type == "desktop"){
								$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
							}
							_this.slideTo(rid);
						}else{
							_this.slideTo(rid);
						}

						if(device.type == "desktop"){
						}else{


							$("#lSideView").hide();
							$(".btnAction").hide();
							$(".btnToolbar").show();
						}

						$("#lSideView .lSideViewWrap .lSideViewWrapSCroll .slideWrap").removeClass("current");
						$("#lSideView .lSideViewWrap .lSideViewWrapSCroll .slideWrap[page='"+_this.current+"']").addClass("current");
						return false;
					});
					$("#lSideView .lSideViewWrap").attr("loaded","true");

				});

			});

			$("#lSideView .lSideViewWrap .lSideViewWrapSCroll .slideWrap").removeClass("current");
			$("#lSideView .lSideViewWrap .lSideViewWrapSCroll .slideWrap[page='"+_this.current+"']").addClass("current");
		}
	},

	loadOutlineView2 : function(){
		var _this = this;
		_this.loadViewManager("outlineview");
		if($("#lSideView .lOutlineViewWrap").attr("loaded") !== "true"){
			$("#lSideView .lOutlineViewWrap").attr("loaded","true");

		};
	},

	loadOutlineView : function(){
		var _this = this;
		_this.loadViewManager("outlineview");
		if($("#lSideView .lOutlineViewWrap").attr("loaded") !== "true"){
			$("#lSideView .lOutlineViewWrap").attr("loaded","true");
			if(SettingsDef.fileinfo.multi){
				$("#lSideView .lOutlineViewWrap").addClass("multi");
				var files = [];
				$.each(SettingsDef.fileinfo.file,function(i, v){
					var fileinfo = {
						"name" : v.title,
						"pages" : v.page,
						"doc" : i,
						"children" : []
					};

					files.push(fileinfo);
					_this.pdfDocument[_this.currentFile].then(function (info) {
						info.getOutline().then(function(outline) {
							var getItemWrap = function(obj) {
								var pageNum = 0;
								if (typeof obj.dest === 'object') {
									if(obj.dest[0] !== null){
										pageNum = obj.dest[0].num + '-' + obj.dest[0].gen + '-R';
										info.getPageIndex(obj.dest[0]).then(function(pageIndex) {
											var _cash = [];
											var page = pageIndex + 1;
											var cacheKey = obj.dest[0].num + '-' + obj.dest[0].gen + '-R';
											_this.cashPageKey[cacheKey] = page;
										});
									}
								}else{
									pageNum = _this.cashPageIndex[obj.dest];
								}
								var item = {
									"name" : obj.title,
									"page" : pageNum,
									"children" : []
								};


								if(obj.items.length > 0){
									$.each(obj.items,function(j){
										item.children.push(getItemWrap(this));
									});
								}

								return item;
							};

							var wrap = [];
							var wwrap = [];
							if(outline !== null){
								if(outline.length > 0){
									$.each(outline,function(j){
										wrap.push(getItemWrap(this));
										if(this.title == SettingsDef.fileinfo.outline){
											wwrap.push(getItemWrap(this));
										}
									});



									$("#lSideView .lOutlineViewWrap .lOutlineViewWrapSCroll").tree({
										data: wrap,
										autoOpen: false,
										closedIcon: '+',
										openedIcon: '-'
									});

									$("#lSideView .lOutlineViewWrap .lOutlineViewWrapSCroll").on(
										'tree.click',
										function(event) {
											// The clicked node is 'event.node'
											var node = event.node;
											var rid = node.page;
											console.log(rid);

											if(Number.isInteger(rid)){

											}else{
												if (rid.indexOf("-R") !== -1) {
													rid = _this.cashPageKey[rid];
												}
											}

												//console.log(rid);
												rid = Number(rid);
												_this.slideTo(rid);

											if(device.type == "desktop"){

											}else{
												$("#lSideView").hide();
												$(".btnAction").hide();
												$(".btnToolbar").show();
											}
										}
									);
								}
							}
						});
					});
				});

				$("#lSideView .lOutlineViewWrap .lOutlineViewWrapSCroll").tree({
					data: files,
					autoOpen: false,
					closedIcon: '+',
					openedIcon: '-'
				});

				$("#lSideView .lOutlineViewWrap .lOutlineViewWrapSCroll").on(
					'tree.click',
					function(event) {
						// The clicked node is 'event.node'
						var node = event.node;
						var did = node.doc;
						did = Number(did);
						_this.changDoc(did);
						if(device.type == "desktop"){

						}else{
							$("#lSideView").hide();
							$(".btnAction").hide();
							$(".btnToolbar").show();
						}
					}
				);
			}else{
				_this.pdfDocument[_this.currentFile].then(function (info) {
					info.getOutline().then(function(outline) {
						var getItemWrap = function(obj) {
							var pageNum = 0;
							if (typeof obj.dest === 'object') {
								if(obj.dest[0] !== null){
									pageNum = obj.dest[0].num + '-' + obj.dest[0].gen + '-R';
									info.getPageIndex(obj.dest[0]).then(function(pageIndex) {
										var _cash = [];
										var page = pageIndex + 1;
										var cacheKey = obj.dest[0].num + '-' + obj.dest[0].gen + '-R';
										_this.cashPageKey[cacheKey] = page;
									});
								}
							}else{
								pageNum = _this.cashPageIndex[obj.dest];
							}
							var item = {
								"name" : obj.title,
								"page" : pageNum,
								"children" : []
							};
							if(obj.items.length > 0){
								$.each(obj.items,function(j){
									item.children.push(getItemWrap(this));
								});
							}
							return item;
						};

						var wrap = [];
						var wwrap = [];
						if(outline !== null){
							if(outline.length > 0){
								$.each(outline,function(j){
									wrap.push(getItemWrap(this));
									if(this.title == SettingsDef.fileinfo.outline){
										wwrap.push(getItemWrap(this));
									}
								});
							}
						}

						$("#lSideView .lOutlineViewWrap .lOutlineViewWrapSCroll").tree({
							data: wrap,
							autoOpen: false,
							closedIcon: '+',
							openedIcon: '-'
						});

						$("#lSideView .lOutlineViewWrap .lOutlineViewWrapSCroll").on(
							'tree.click',
							function(event) {
								// The clicked node is 'event.node'
								var node = event.node;
								var rid = node.page;
								//console.log(rid);
								if(Number.isInteger(rid)){

								}else{
									if (rid.indexOf("-R") !== -1) {
										rid = _this.cashPageKey[rid];
									}
								}
								//console.log(rid);
								rid = Number(rid);
								_this.slideTo(rid);
								if(device.type == "desktop"){

								}else{
									$("#lSideView").hide();
									$(".btnAction").hide();
									$(".btnToolbar").show();
								}
							}
						);
					});
				});
			}
		};
	},

	loadContentView : function(){
		var _this = this;
		_this.loadViewManager("contentview");
		if($("#lSideView .lContentViewWrap").attr("loaded") !== "true"){
			$("#lSideView .lContentViewWrap").attr("loaded","true");
			_this.pdfDocument[_this.currentFile].then(function (info) {
				info.getOutline().then(function(outline) {
					var getItemWrap = function(obj) {
						var pageNum = 0;
						if (typeof obj.dest === 'object') {
							if(obj.dest[0] !== null){
								pageNum = obj.dest[0].num + '-' + obj.dest[0].gen + '-R';
								info.getPageIndex(obj.dest[0]).then(function(pageIndex) {
									var _cash = [];
									var page = pageIndex + 1;
									var cacheKey = obj.dest[0].num + '-' + obj.dest[0].gen + '-R';
									_this.cashPageKey[cacheKey] = page;
								});
							}
						}else{
							pageNum = _this.cashPageIndex[obj.dest];
						}
						var item = {
							"name" : obj.title,
							"page" : pageNum,
							"children" : []
						};


						if(obj.items.length > 0){
							$.each(obj.items,function(j){
								item.children.push(getItemWrap(this));
							});
						}

						return item;
					};

					var wrap = [];

					if(outline !== null){
						if(outline.length > 0){
							$.each(outline,function(j){

								if(this.title == SettingsDef.fileinfo.outline){
									wrap.push(getItemWrap(this));
								}
							});
						}
					}


					$("#lSideView .lContentViewWrap .lContentViewWrapSCroll").tree({
						data: wrap,
						autoOpen: true,
						closedIcon: '+',
						openedIcon: '-'
					});

					$("#lSideView .lContentViewWrap .lContentViewWrapSCroll").on(
						'tree.click',
						function(event) {
							// The clicked node is 'event.node'
							var node = event.node;
							var rid = node.page;
							console.log(rid);

							if(Number.isInteger(rid)){

							}else{
								if (rid.indexOf("-R") !== -1) {
									rid = _this.cashPageKey[rid];
								}
							}

								//console.log(rid);
								rid = Number(rid);
								_this.slideTo(rid);

							if(device.type == "desktop"){
							}else{
								$("#lSideView").hide();
								$(".btnAction").hide();
								$(".btnToolbar").show();
							}
						}
					);

				});
			});
		};
	},

	loadSearchView : function(keyword){
		var _this = this;

		_this.loadViewManager("searchview");
		if($("#lSideView .lSearchViewWrap").attr("loaded") !== "true"){

			$("#lSideView .lSearchViewWrap").attr("loaded","true");
			$("#lSideView .lSearchViewWrap").find("input").focus();

			if($("#lSideView .lSearchViewWrapSCroll").is(':empty')){
				$("#lSideView .lSearchViewWrap .searchLoading").addClass("off").removeClass("on");
			}

		};
	},

	loadBookmarkView : function(){
		var _this = this;
		_this.loadViewManager("bookmarkview");

		if(SettingsDef.loading.opendb){
			_this.db.transaction(function (tx) {
				var doc_id = SettingsDef.fileinfo.doc_id;
				var sql = 'SELECT * FROM bookmark WHERE doc_id = "'+doc_id+'" ORDER BY page ASC';
				tx.executeSql(sql, [], function (tx, results) {
					var len = results.rows.length, i;
					var wrap = "";

					var t_page = 0;

					for (i = 0; i < len; i++){

						if(results.rows.item(i).page !== t_page){
							t_page = results.rows.item(i).page;
							wrap +=
							'<div class="pageWrap" page="'+ results.rows.item(i).page +'">' +
								'<div class="summary">'+t_page+' page</div>' +
							'</div>';
						}
						if(results.rows.item(i).mode == "bookmark"){
							wrap +=
							'<div class="linkWrap" page="'+ results.rows.item(i).page +'">' +
								'<div class="icon"><i class="kk-icon-turned_in_not"></i></div>' +
								'<div class="summary">'+ results.rows.item(i).title +'...</div>' +
							'</div>';
						}else if(results.rows.item(i).mode == "highlight"){
							wrap +=
							'<div class="linkWrap" page="'+ results.rows.item(i).page +'">' +
								'<div class="icon"><i class="kk-icon-label_outline"></i></div>' +
								'<div class="summary">'+ results.rows.item(i).summary +'...</div>' +
							'</div>';
						}else if(results.rows.item(i).mode == "memo"){

							wrap +=
							'<div class="linkWrap" page="'+ results.rows.item(i).page +'">' +
								'<div class="icon"><i class="kk-icon-chat"></i></div>' +
								'<div class="summary">'+ results.rows.item(i).title +'...</div>' +
							'</div>';
						}
					}
					$("#lSideView .lBookmarkViewWrap .lBookmarkViewWrapSCroll").html(wrap);
					$('#lSideView .lBookmarkViewWrap .lBookmarkViewWrapSCroll .linkWrap').on("click", function (e) {
						var page = $(this).attr("page");
						_this.slideTo(page);
						if(device.type == "desktop"){

						}else{

							$("#lSideView").hide();
							$(".btnAction").hide();
							$(".btnToolbar").show();


						}
						return false;
					});

				}, null);
			});
		}
	},

	loadPagejumpView : function(){
		var _this = this;
		_this.loadViewManager("pagejumpview");
		$(".btnAction").hide();
		$(".btnToolbar").hide();
		$(".toolbar").show();
		$("#pageslider").slider("value",_this.current);
	},

	loadViewManager : function(mode){
		var _this = this;
		if(device.type == "desktop"){
			_this.resizeLayout();
		}else{
			$(".btnAction").hide();
			$(".btnToolbar").hide();
		}
		//$(".modalview").show();

		$("#lSideView .lSideViewBtn a").removeClass("active");
		$("#lSideView .sildeview").hide();

		if(mode == "thumbview"){
			$("#lSideView .lSideViewWrap").show();
			$("#lSideView .lSideViewBtn a.btn[mode='"+mode+"']").addClass("active");

		}else if(mode == "outlineview"){
			$("#lSideView .lOutlineViewWrap").show();
			$("#lSideView .lSideViewBtn a.btn[mode='"+mode+"']").addClass("active");

		}else if(mode == "contentview"){
			$("#lSideView .lContentViewWrap").show();
			$("#lSideView .lSideViewBtn a.btn[mode='"+mode+"']").addClass("active");

		}else if(mode == "searchview"){
			$("#lSideView .lSearchViewWrap").show();
			$("#lSideView .lSideViewBtn a.btn[mode='"+mode+"']").addClass("active");

		}else if(mode == "bookmarkview"){
			$("#lSideView .lBookmarkViewWrap").show();
			$("#lSideView .lSideViewBtn a.btn[mode='"+mode+"']").addClass("active");

		}else if(mode == "pagejumpview"){
			$("#lSideView").hide();
			$("#lSideView .lSideViewBtn a.btn[mode='"+mode+"']").addClass("active");
		}
	},

	countChecker : function(mode){
		var url = window.location.protocol + "//" + window.location.host;
		var ckey = window.location.pathname.replace("/v/","").replace("/","").replace("#","");
		var goUrl = "";

		if(SettingsDef.mode !== "test"){	
			if(mode == "read"){
				goUrl = url+"/api/tckPaswdS/"+ckey;
			}else if(mode == "fail"){
				goUrl = url+"/api/tckPaswdF/"+ckey;
			}else if(mode == "download"){
				goUrl = url+"/api/tckDownload/"+ckey;
			}else{
				goUrl = url+"/api/tckPaswdS/"+ckey;
			}
			if(SettingsDef.loading.countChecker){
				$.ajax({
					type: "GET",
					url: goUrl,
					async: false,
					data: {
						"ckey" : ckey
					},
					dataType: "html",
					success: function (data) {
					},
					fail: function (err) {

					}
				});
			}
		}
	},

	//-------------------------------------------------------------------

	searchText : function(info,page){
		var _this = this;
		if(page == 1){
			$("#lSideView .lSearchViewWrap .searchLoading").addClass("on").removeClass("off");
			$("#lSideView .lSearchViewWrap .lSearchViewWrapSCroll").html("");
		}
		var keyword = $("#lSideView .lSearchViewWrap").find("input").val();
		if($.trim(keyword).length  > 0){
			if(typeof(info) !== "undefined"){
				var maxPages = info.pdfInfo.numPages;
				var countPromises = []; // collecting all page promises
				if(page > maxPages){
					$("#lSideView .lSearchViewWrap .searchLoading").addClass("off").removeClass("on");
					return;
				}else{
						//console.log(info);
						//var text = _this.getPdfTotext(info);
						//console.log(text);
						/*
						for (let j = 1; j <= maxPages; j++) {
							let page = pdf.getPage(j);

							let txt = "";
							countPromises.push(page.then(function(page) { // add page promise
							let textContent = page.getTextContent();
							return textContent.then(function(text){ // return content promise
								return text.items.map(function (s) { return s.str; }).join(''); // value page text
							});
							}));
						}
						// Wait for all pages and join text
						return Promise.all(countPromises).then(function (texts) {
							return texts.join(" ");
						});
						*/



						info.getPage(page).then(function(pageInfo) { // add page promise
							var text = 	pageInfo.getTextContent();
							//console.log(text);

							pageInfo.getTextContent().then(function(text){ // return content promise
								//console.log(pageInfo);
								//console.log(text);

								var viewport = pageInfo.getViewport(_this.ratio);
								var pageSize = _this.getPageSize(viewport);
								var view = pageInfo.view;
								var swrap = "";
								var _top = 0;
								var tag = "";

								var str = "";
								var itm = {};
								var sch = [];
								$.each(text.items,function(i,v){
									if(v.transform[5] == _top){
										str += v.str;
										itm.transform = v.transform;
										itm.width = v.width;
										itm.height = v.height;
									}else{
										itm.str = str;
										sch.push(itm);
									}
									_top = v.transform[5];
								});

								$.each(text.items,function(i,v){
									var s = v.str.indexOf(keyword);
									if(s !== -1){
										if($.trim(v.str) !== ""){
											var stext = _this.highlight(v.str,keyword);
											var rect = this.transform;
											console.log(page);
											swrap += '<a page="'+(pageInfo.pageIndex + 1)+'" title="'+(pageInfo.pageIndex + 1)+'P" idx="'+i+'" z="'+pageSize.mobileZoom+'" w="'+v.width+'" h="'+(rect[3] - rect[1])+'" l="'+(v.transform[4] - view[1])+'" t="'+(v.transform[5] - view[0])+'">'+stext+'..('+(pageInfo.pageIndex + 1)+'p)</a>';
											$(".lSideView .lSearchViewWrap .searchLoading").removeClass("on").addClass("off");
										}
									}
									_top = v.transform[5];
								});

								if(device.type == "desktop"){
									$("#lSideView .lSearchViewWrap .lSearchViewWrapSCroll").append(swrap);
									$("#lSideView .lSearchViewWrap .lSearchViewWrapSCroll a[page='"+(pageInfo.pageIndex + 1)+"']").on("click",function(i){
										$("#lSideView .lSearchViewWrap .lSearchViewWrapSCroll a").removeClass("active");
										$(this).addClass("active");
										var p = $(this).attr("page");
										var w = $(this).attr("w");
										var l = $(this).attr("l");
										var t = $(this).attr("t");
										var _z = $(this).attr("z");
										var h = $(this).attr("h");
										$("#document_view div[slide='"+p+"'] .pageWrap .marker").remove();
										_this.slideTo(p,function(){
											$("#document_view div[slide='"+p+"'] .pageWrap").append('<div class="marker" style="bottom:'+(t*_z)+'px;left:'+(l*_z)+'px;width:'+(w*_z)+'px;height:'+(h*_z)+'px;"></div>');
										});
									});
								}else{
									$("#lSideView .lSearchViewWrap .lSearchViewWrapSCroll").append(swrap);
									$("#lSideView .lSearchViewWrap .lSearchViewWrapSCroll a[page='"+(pageInfo.pageIndex + 1)+"']").on("click",function(i){
										$("#lSideView .lSearchViewWrap .lSearchViewWrapSCroll a").removeClass("active");
										$(this).addClass("active");
										var p = $(this).attr("page");
										var w = $(this).attr("w");
										var l = $(this).attr("l");
										var t = $(this).attr("t");
										var _z = $(this).attr("z");
										var h = $(this).attr("h");

										var idx = $(this).attr("idx");

										$("#document_view div[slide='"+p+"'] .pageWrap .marker").remove();

										_this.slideTo(p,function(){
											$("#document_view div[slide='"+p+"'] .pageWrap").append('<div class="marker" style="bottom:'+(t*_z)+'px;left:'+(l*_z)+'px;width:'+(w*_z)+'px;height:'+(h*_z)+'px;"></div>');
										});


										$("#lSideView").hide();
										$("#lSideView .lSideViewWrap").hide();
										$("#lSideView .lOutlineViewWrap").hide();
										$("#lSideView .lSearchViewWrap").hide();


										$("#lSideView").hide();
										$(".btnAction").hide();
										$(".btnToolbar").show();
										$(".toolbar").hide();
									});
								}

								var next = page + 1;
								_this.searchText(info,next);
							});

						});

				}
			}
		}else{
			var wrap = '<div class="init_message_box">'+
				'<h3>검색어를 입력하세요.</h3>'+
			'</div>';
			$("#lSideView .lSearchViewWrap .lSearchViewWrapSCroll").html(wrap);
			$("#lSideView .lSearchViewWrap .searchLoading").addClass("off").removeClass("on");
		}

	},

	getPdfTotext : function(info){

		  var maxPages = info.pdfInfo.numPages;
		  var countPromises = []; // collecting all page promises
		  for (var j = 1; j <= maxPages; j++) {
			var page = info.getPage(j);

			var txt = "";
			countPromises.push(page.then(function(page) { // add page promise
				var textContent = page.getTextContent();
			  return textContent.then(function(text){ // return content promise
				return text.items.map(function (s) { return s.str; }).join(''); // value page text
			  });
			}));
		  }
		  // Wait for all pages and join text
		  return Promise.all(countPromises).then(function (texts) {
			return texts.join(" ");
		  });

	},

	//---------------------------------------------------------------------

	exportTextToHwpx : function(){
		var _this = this;
		_this.pdfDocument.then(function (info) {
			var maxPages = info.pdfInfo.numPages;
			var str = "";


			//var fontsizeList = [];

			//$("#kk_dialog").html('<div class="content"></div>');
			for (var j = 1; j <= maxPages; j++) {
				info.getPage(j).then(function(pageInfo) {
					pageInfo.getTextContent().then(function(text){
						var tag = "";
						var _top = 0;

						tag += '<p class="parapr_0" kklinebreak="0" depth="0" textpos="0" kk_vs="1000" kk_bl="850" kk_sc="200" kk_hs="42520">';
						$.each(text.items,function(i,v){
							//if(v.transform[5] <= 200 && v.height <= 10){
							//} else if(v.transform[5] >= 750 && v.height <= 11){
							//} else {
								if(v.transform[5] == _top){

								} else {
									tag += '</p>';
									tag += '<p class="parapr_0" kklinebreak="0" depth="'+i+'" textpos="0" kk_vs="1000" kk_bl="850" kk_sc="200" kk_hs="42520">';
								}

								var _h = Math.round(v.height)-2;
								$("#kk_dialog").find(".fontsize").append(_h+"|");

								tag += '<span class="charpr_'+_h+'">'+v.str+'</span>';


								if(v.transform[5] == _top){

								} else {

								}

							//}
							_top = v.transform[5];
						});

						tag += '</p>';
						$("#kk_dialog").find(".content").append(tag);
						//console.log(fontsizeList);
					});
				});
			}
			var fontsizeList = $("#kk_dialog").find(".fontsize").text().split("|");

			var uniquefontsizeList = fontsizeList.filter(onlyUnique).join("|");
			//console.log(fontsizeList);

			function onlyUnique(value, index, self) {
				return self.indexOf(value) === index;
			}



			var documentid = $("body").attr("documentid");
			var content = $("#kk_dialog .content").html();
			$.ajax({
				type: "POST",
				url: "_saveHwpx.php",
				data: {

					"id" : documentid,
					"fontsize" : uniquefontsizeList,
					"content" : content

				},
				dataType: "html",
				success: function (data) {
					//_this.highlight(rs);
				},
				complete: function () {

				}
			});
		});
	},

	openTTS : function(page){

		var _this = this;


		var ww = $(window).width() - 40;
		var wH = $(window).height() - 100;

		if(device.type == "desktop"){
			ww = 500;
			wH = 500;
		}

		var wrap =  '<div id="audio" class="audioWrap" style="height:'+(wH - 230)+'px;" ></div>'+
					'<div class="audioBar">' +
						'<a action="pause" class="audioBtn" href="#"><i class="kk-icon-pause"></i></a>'+
						'<a action="resume" class="audioBtn" href="#"><i class="kk-icon-play"></i></a>'+
						'<a action="play" class="audioBtn" href="#"><i class="kk-icon-play"></i></a>'+

					'</div>';

		$("#kk_dialog").html(wrap);
		$("#kk_dialog").addClass("tts");
		
		if(SettingsDef.loading.tts == "speechSynthesis"){
			_this.exportText(page);
			$("#kk_dialog").dialog({
				title:'음성듣기',
				width:ww,
				height:wH,
				modal:true,
				autoOpen:false,
				resizable:false,
				open: function( event, ui ) {
					$("#kk_dialog .audioBar > a[action='play']").show();
					$("#kk_dialog .audioBar > a[action='resume']").hide();
					$("#kk_dialog .audioBar > a[action='pause']").hide();
				},
				close: function( event, ui ) {
				},
				buttons: {
					"닫기" : function(){
						synth.pause();
						synth.cancel();
						$(this).dialog('close');
					}
				}
			});
			$("#kk_dialog").dialog('open');
			var msg = new SpeechSynthesisUtterance();
			var synth = window.speechSynthesis;		
			$("#kk_dialog .audioBar > a").on("click",function(){
				var txt = $("#kk_dialog").find(".audioWrap").text();

				var voices = window.speechSynthesis.getVoices();
				msg.voice = voices[10]; // Note: some voices don't support altering params
				msg.text = txt;
				msg.rate = 1;
				msg.pitch = 1;
				msg.lang = 'ko-KR';
				//msg.lang = 'en-US';
				msg.volume = 1; // 0 to 1
				var vselVoices = [];
				var selVoices = [];
				speechSynthesis.getVoices().forEach(function(voice) {
					if(voice.lang == 'ko-KR'){
						if(voice.localService == true){
							selVoices.push(voice);
						}else{
							vselVoices.push(voice);
						}
					}
				});
	
				if(selVoices.length > 0){
					msg.voice = selVoices[0];
					msg.voiceURI = selVoices[0].voiceURI;
				}else if(vselVoices.length > 0){
					msg.voice = vselVoices[0];
					msg.voiceURI = vselVoices[0].voiceURI;
				}else{
					msg.voice = voices[10];
					msg.voiceURI = "native";
				}
		
				var mode = $(this).attr("action");
				switch(mode){
					case "backward" :
						break;
					case "play" :
							$("#kk_dialog .audioBar > a[action='play']").hide();
							$("#kk_dialog .audioBar > a[action='resume']").hide();
							$("#kk_dialog .audioBar > a[action='pause']").show();	
							synth.cancel();
							synth.speak(msg);
						break;
					case "pause" :
							synth.pause();
							synth.cancel();
							$("#kk_dialog .audioBar > a[action='play']").hide();
							$("#kk_dialog .audioBar > a[action='resume']").show();
							$("#kk_dialog .audioBar > a[action='pause']").hide();
						break;
					case "resume" :
							synth.pause();
							synth.resume();
							synth.speak(msg);	
							$("#kk_dialog .audioBar > a[action='play']").hide();
							$("#kk_dialog .audioBar > a[action='resume']").hide();
							$("#kk_dialog .audioBar > a[action='pause']").show();
						break;
					case "forward" :
						break;
					default :
						break;
				}
				return false;
			});
		}else if(SettingsDef.loading.tts == "responsiveVoice"){
            _this.pdfDocument[_this.currentFile].then(function (info) {
				var maxPages = info.pdfInfo.numPages;

				var text = "";
			
				_this.exportText(page);
				

				$("#kk_dialog").dialog({
					title:'음성듣기',
					width:ww,
					height:wH,
					modal:true,
					autoOpen:false,
					resizable:false,
					open: function( event, ui ) {
						$("#kk_dialog .audioBar > a[action='play']").show();
						$("#kk_dialog .audioBar > a[action='resume']").hide();
						$("#kk_dialog .audioBar > a[action='pause']").hide();

						//$("#kk_dialog .audioBar > a[action='play']").hide();
						//$("#kk_dialog .audioBar > a[action='resume']").hide();
						//$("#kk_dialog .audioBar > a[action='pause']").show();

						//var txt = $("#kk_dialog").find(".audioWrap").text();

						//responsiveVoice.cancel();
						//responsiveVoice.setDefaultVoice("Korean Female");
						//responsiveVoice.speak(txt);

					},
					close: function( event, ui ) {
					},
					buttons: {
						"닫기" : function(){
							responsiveVoice.cancel();
							$(this).dialog('close');
						}
					}
				});
				$("#kk_dialog").dialog('open');
				$("#kk_dialog .audioBar > a").on("click",function(){
					var txt = $("#kk_dialog").find(".audioWrap").text();				
					var mode = $(this).attr("action");
					switch(mode){
						case "backward" :
							break;
						case "play" :
								$("#kk_dialog .audioBar > a[action='play']").hide();
								$("#kk_dialog .audioBar > a[action='resume']").hide();
								$("#kk_dialog .audioBar > a[action='pause']").show();
								responsiveVoice.cancel();
								responsiveVoice.setDefaultVoice("Korean Female");
								responsiveVoice.speak(txt);
							break;
						case "pause" :
								//responsiveVoice.pause();
								responsiveVoice.cancel();
								$("#kk_dialog .audioBar > a[action='play']").show();
								$("#kk_dialog .audioBar > a[action='resume']").hide();
								$("#kk_dialog .audioBar > a[action='pause']").hide();
							break;
						case "resume" :
								responsiveVoice.resume();
								$("#kk_dialog .audioBar > a[action='play']").hide();
								$("#kk_dialog .audioBar > a[action='resume']").hide();
								$("#kk_dialog .audioBar > a[action='pause']").hide();
							break;
						case "forward" :
							break;
						default :
							break;
					}
					return false;
				});

		    });
		}else if(SettingsDef.loading.tts == "google"){
			_this.exportText(page);
			var audio = new Audio();
			var txt = $("#kk_dialog").find(".audioWrap").text();
			audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=en&q='+txt;
			

			$("#kk_dialog").on( "dialogclose", function( event, ui ) {
				
			});

			$("#kk_dialog .audioBar > a").on("click",function(){
				var mode = $(this).attr("action");
				switch(mode){
					case "play" :
							$("#kk_dialog .audioBar > a[action='play']").hide();
							$("#kk_dialog .audioBar > a[action='resume']").hide();
							$("#kk_dialog .audioBar > a[action='pause']").show();
							audio.play();
						break;
					case "pause" :
							audio.pause();
							$("#kk_dialog .audioBar > a[action='play']").show();
							$("#kk_dialog .audioBar > a[action='resume']").hide();
							$("#kk_dialog .audioBar > a[action='pause']").hide();
						break;
					default :
						break;
				}
				return false;
			});
		}

		//alert("표는 정확히 읽혀지지 않을 수 있습니다. \n휴대폰 기종에 따라 지원 되지 않을 수 있습니다.");
	},

	exportText : function(page){
		var _this = this;
		_this.pdfDocument[_this.currentFile].then(function (info) {
			var maxPages = info.pdfInfo.numPages;
			$("#kk_dialog").find(".audioWrap").html("");
			if(SettingsDef.loading.ttsType == "tag"){
				if(typeof(_this.tts[page]) !== "undefined"){
					var text = decodeURI(_this.tts[1]);
					$("#kk_dialog").find(".audioWrap").html(text);
				}
				$("#kk_dialog").find(".audioPageWrap").html(1 + " / "+ maxPages);
			}else if(SettingsDef.loading.ttsType == "page"){
				console.log(_this.tts[page]);

				if(typeof(_this.tts[page]) !== "undefined"){
					var text = decodeURI(_this.tts[page]);

					console.log(text);

					console.log(page);
					$("#kk_dialog").find(".audioWrap").html(text);				
				}
				$("#kk_dialog").find(".audioPageWrap").html(page + " / "+ maxPages);
			}else if(SettingsDef.loading.ttsType == "pagetext"){
				info.getPage(page).then(function(pageInfo) {
					pageInfo.getTextContent().then(function(text){
						var tag = "";
						var _top = 0;

						console.log(text);
						$.each(text.items,function(i,v){
							if(v.transform[5] == _top){
							} else {
								tag += '<br>';
							}
							var _h = Math.round(v.height)-2;
							tag += v.str;
							if(v.transform[5] == _top){
							} else {
							}
							_top = v.transform[5];
						});
						$("#kk_dialog").find(".audioWrap").html(tag);
					});
				});	
				$("#kk_dialog").find(".audioPageWrap").html(page + " / "+ maxPages);
			}else if(SettingsDef.loading.ttsType == "getAttachments"){
				info.getAttachments().then(function(attach) {

					if(attach !== null){
						var xml = new TextDecoder("utf-8").decode(attach['tts.xml'].content);
						var oParser = new DOMParser();
						var oDOM = oParser.parseFromString(xml, "text/xml");
						var json = _this.xmlToJson(oDOM);
						if(typeof(json.tts.page[(page+1)]) !== "undefined"){
							var text = json.tts.page[(page+1)].content["#text"].replace(/\n/g, "<br />");
							$("#kk_dialog").find(".audioWrap").html(text);
						}else{
							_this.exportTextFromPage(info,page);
						}
					}else{
						_this.exportTextFromPage(info,page);
					}
				});

			}
		});
	},

	exportTextFromPage : function(info,page){
		info.getPage(page).then(function(pageInfo) {
			pageInfo.getTextContent().then(function(text){
				var tag = "";
				var _top = 0;
				$.each(text.items,function(i,v){
					if(v.transform[5] == _top){
					} else {
						tag += '<br>';
					}

					var _h = Math.round(v.height)-2;
					tag += v.str;
					if(v.transform[5] == _top){
					} else {
					}
					_top = v.transform[5];
				});
				$("#kk_dialog").find(".audioWrap").html(tag);
			});
		});
	},

	xmlToJson : function (xml) {
		var _this = this;

		// Create the return object
		var obj = {};

		if (xml.nodeType == 1) { // element
			// do attributes
			if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		} else if (xml.nodeType == 3) { // text
			obj = xml.nodeValue;
		}

		// do children
		if (xml.hasChildNodes()) {
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = _this.xmlToJson(item);
				} else {
					if (typeof(obj[nodeName].push) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(_this.xmlToJson(item));
				}
			}
		}
		return obj;
	},

	highlight : function(input, search){
		var index = input.indexOf(search);
		var res = "";
		if ( index >= 0 ) {
			res = input.substring(0,index) + "<span class='highlight'>" + input.substring(index,index+search.length) + "</span>" + input.substring(index + search.length);
		}else{
			res = input;
		}
		return res;
	},

	loadThumbs : function(info,page){
		var _this = this;
		var totalSlide = Number(_this.totalSlide[_this.currentFile]);
		var _w = 100;
		var _h = 100;
		if($("#pageWrap_"+page).attr("loaded") !== "true"){
			$("#pageWrap_"+page).attr("loaded","true");
			info.getPage(page).then(function (pageInfo) {
				var viewport = pageInfo.getViewport(_this.thumbComp);
				var canvas = document.createElement('canvas');
				var pageSize = _this.getPageSize(viewport);
				//$("#pageWrap_"+page+" .thumbWrap .thumb .thumbZoom").html(canvas);
				$("#pageWrap_"+page).attr({
					"w" : pageSize.width,
					"h" : pageSize.height
				});

				var context = canvas.getContext('2d');
				var _o = (_w/viewport.width);
				_h = Math.floor(viewport.height*_o);
				$("#pageWrap_"+page+" .thumbWrap").css("height",_h+"px");
				$("#pageWrap_"+page).css("height",(_h+10)+"px");
				var thumbViewport = pageInfo.getViewport((_o*_this.thumbComp));
				var pageSize = _this.getPageSize(thumbViewport);
				canvas.width  = thumbViewport.width;
				canvas.height = thumbViewport.height;
				canvas.style.width = _w + 'px';
				canvas.style.height = _h + 'px';

				pageInfo.render({
					canvasContext: context,
					viewport: thumbViewport
				}).then(function(){

					var image = document.createElement('img');
					image.src = canvas.toDataURL();
					image.style.width = _w + 'px';
					image.style.height = _h + 'px';
					$("#pageWrap_"+page+" .thumbWrap .thumb .thumbZoom").prepend(image);
					$("#pageWrap_"+page).find(".spinner").remove();
					canvas = null;
					var contentH = Number($(window).height());
					var pos = $("#lSideView .slideWrap[page='"+page+"']").position();


					var stop = $("#lSideViewWrap").scrollTop();
					if(pos.top < contentH){
						var npage = Number($("#lSideView .slideWrap[page='"+page+"']").next().attr("page"));
						if($("#pageWrap_"+npage).length  > 0 ) {
							_this.loadThumbs(info,npage);
						}
					}

				});
			});
		}
	},


	//---------------------------------------------------------------------
	slider : function(isReset) {
		var _this = this;

		$(".scroller-container").hide();
		$(".flipbook-viewport").hide();
		$(".contentView").show();

		if(isReset){
			if(_this.swiper){
				_this.swiper.removeAllSlides();
				_this.swiper.destroy(false,true);
			}
			$("#document_view").html("");
			//$("#pageslider").slider( "destroy" );
			//_this.menuSwiper.destroy(false,true);
			//_this.menuSwiper = null;
		}

		var wW = Number($(".editView").width());
		var wH = Number($(".editView").height());



		var pageSize = _this.getPageSize(_this.viewportTemp);
		$("body").attr("totalslide",_this.totalSlide[_this.currentFile]);
		$("#kkTotalPageNumber").html(_this.totalSlide[_this.currentFile]);
		$("#pInfo_totalPage").html(_this.totalSlide[_this.currentFile]);

		if(device.type == "desktop"){
			$(".toolbar").css("display","block");
			_this.swiper = new Swiper('.contentView', {
				scrollbarHide: true,
				observer:false,
				slidesPerView: 1,
				centeredSlides: true,
				autoHeight: false,
				initialSlide: _this.current-1,
				hashnav:false,
				spaceBetween: wW,
				simulateTouch: false,
				zoom:false,
				mousewheelControl:true,
				virtual: {
					cache :false,
					slides: (function () {
						var slides = [];
						var total = Number(_this.totalSlide[_this.currentFile]);
						for (var i = 0; i < total; i += 1) {
							var page = i + 1;
							slides.push(
								page
							);

						}
						return slides;
					}()),

					renderSlide: function (s,i){
						var page = i + 1;
						_this.loadPage(page,function(){

							$("#document_view div[slide='"+page+"']").find(".spinner").remove();
						});

						var wrap = '';
						wrap = '<div class="swiper-slide" index="'+i+'" style="width:'+wW+'px;height:'+wH+'px;">'+
							'<div slide="'+page+'" data-hash="'+page+'" class="slide_wrap" style="width:'+wW+'px;height:'+wH+'px;" >'+
								'<div class="pageWrap" style="width:'+pageSize.width+'px;height:'+pageSize.height+'px;">'+
									'<div class="spinner"></div>'+
								'</div>'+
							'</div>'+
						'</div>';
						return wrap;
					},
				},


				mousewheel : {
					releaseOnEdges : false
				},
				on:{
					init : function(){
						var page = _this.current;
						_this.isSlideView = true;
						_this.bindFullScreenEvent();
						$('.loading').removeClass("on").addClass("off");
						_this.scroll();
					},
					slideChangeTransitionEnd: function () {
						var page = this.activeIndex+1;
						_this.current = page;
						$("#kkCurrentPageNumber").val(_this.current);
						//_this.history.push(page);
						//console.log(_this.history);
					}
				}
			});
			/*
			$(".editView").on('mousewheel DOMMouseScroll', function(e2){
				if((e2.ctrlKey || e2.metaKey)){
					if(e2.originalEvent.wheelDelta < 0) {
						_this.zoom = Number(_this.zoom) - 0.1;
						if(_this.zoom >= 1){
							$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
						}else{
							_this.zoom = 1;
						}
					} else {
						_this.zoom = _this.zoom + 0.1;
						if(_this.zoom <= 5){
							$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
						}else{
							_this.zoom = 5;
						}
					}
				}
				return false;
			});
			*/

			if(SettingsDef.sidebar.load == "on"){
				$(".deskView").addClass("thumbView");
				$(".viewmode .btn[mode='thumbtoggle']").addClass("active");
				if(SettingsDef.sidebar.mode == "outline"){
					_this.loadOutlineView();
				}else if(SettingsDef.sidebar.mode == "search"){
					_this.loadSearchView();
				}else {
					_this.loadThumbView();
				}
			}

			$("#lSideView .lSideViewBtn a[mode='bookmarkview']").addClass("disable").hide();
		}else{
			$(".kk-prev-page").show();
			$(".kk-next-page").show();
			//$(".swiper-container").show();
			$("#pageslider").slider({
				min: 1,
				max: _this.totalSlide[_this.currentFile],
				value: _this.current,
				create: function( event, ui ){
					$(".ui-slider-handle").html('<div class="pagetip"></div>');
				},
				slide: function( event, ui ) {
					$(".ui-slider-handle > .pagetip").html(ui.value).show();
				},
				change: function( event, ui ) {
					$(".ui-slider-handle > .pagetip").html(ui.value).show();
					_this.slideTo(ui.value);
				}
			});



			_this.swiper = new Swiper('.contentView', {
				scrollbarHide: true,
				observer:false,
				slidesPerView: 1,
				centeredSlides: true,
				autoHeight: false,
				initialSlide: _this.current-1,
				hashnav:false,
				spaceBetween: wW,
				//simulateTouch: false,
				mousewheelControl:false,
				//zoom:true,

				virtual: {
					cache :true,
					slides: (function () {
						var slides = [];
						var total = _this.totalSlide[_this.currentFile];
						for (var i = 0; i < total; i += 1) {
							var page = i + 1;
							slides.push(
								page
							);
						}
						return slides;
					}()),

					renderSlide: function (s,i){
						var page = i + 1;
						var wW = screen.width;
						var wH = screen.height;

						var wrap = '';

							wrap = '<div class="swiper-slide" index="'+i+'" style="width:'+wW+'px;height:'+wH+'px;">'+
								'<div class="pinch-zoom-container">'+
									'<div slide="'+page+'" data-hash="'+page+'" class="slide_wrap" style="width:'+wW+'px;height:'+wH+'px;" >'+
										'<div class="pageWrap" style="width:'+wW+'px;height:'+wH+'px;">'+
											'<div class="spinner"></div>'+
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>';
							_this.loadPage(page,function(){
								_this.pz[page] = new PinchZoom.default(document.querySelector("#document_view div[slide='"+page+"']"),{
									lockDragAxis: true,
									draggableUnzoomed :  false
								});
								$("#document_view div[slide='"+page+"']").find(".spinner").remove();
								if(page == 1){
									if(SettingsDef.loading.ttsType == "page"){
										if(typeof(_this.tts[1]) !== "undefined"){
											$(".btnBox[action='tts']").show();
										}else{
											$(".btnBox[action='tts']").hide();
										}
									}
								}
							});
						return wrap;
					},
				},

				on:{
					init: function () {
						var page = this.activeIndex+1;
						_this.current = page;

						if(_this.current === 1){
							$(".kk-prev-page").hide();
						}else{
							if(_this.totalSlide[_this.currentFile] > 1){
								$(".kk-prev-page").show();
							}else{
								$(".kk-prev-page").hide();
							}
						}

						if(SettingsDef.loading.submenubar){
							if(window.orientation == 90){
								$(".submenubar").hide();
							}else{
								$(".submenubar").show();
							}
						}

						$("#kkCurrentPageWrap").html(_this.current);

						/*
						window.addEventListener("orientationchange", function() {
							_this.orientationChanged().then(function(){
								_this.redraw(_this.pdfInfo);
								if(window.orientation == 90){
									//$(".tabletbar").hide();
								}else{
									//$(".tabletbar").show();
								}
								//_this.pz[_this.current].update();
							});
						});
						*/


						/*
						window.addEventListener("orientationchange", function() {
							_this.orientationChanged().then(function(){
								_this.redraw(_this.pdfInfo);

								var imh_w = $("#document_view > div[index='"+(page - 1)+"']").find(".slide_wrap img").width();
								if(window.orientation == 90){
									var iW = imh_w;
									var lW = wH;
									if(wW > wH){
										lW = wW;
									}

									var _o = lW/iW;
									console.log(lW+"##"+_o+"--------------"+wW+"----"+wH);
									var _sw = ((lW/2)*_o);
									console.log(_sw);

									_this.pz[_this.current].scaleTo(_o,{x:_sw,y:0});
									_this.pz[_this.current].update();
								}else{

									var lW = wH;

									if(wW > wH){
										lW = wW;
									}

									_this.pz[_this.current].scaleTo(1,{x:0,y:0});
									_this.pz[_this.current].update();

								}
							});
						});
						*/


						$('.loading').removeClass("on").addClass("off");
					},

					slideChange: function () {
						var page = this.activeIndex+1;
						_this.current = page;
						$("#kkCurrentPageWrap").html(_this.current);
						if(_this.current === 1){
							$(".kk-prev-page").hide();
						}else{
							if(_this.totalSlide[_this.currentFile] > 1){
								$(".kk-prev-page").show();
							}else{
								$(".kk-prev-page").hide();
							}
						}


						var total = Number($("body").attr("totalslide"));

						if(_this.current == total){
							$(".kk-next-page").hide();
						}else{
							$(".kk-next-page").show();
						}

						var _page = $("#pageslider").slider("value");
						if(_page !== page){
							$("#pageslider").slider("value",page);
						}
						_this.resizeLayout();
					},

					tap: function (swiper, event){

						if($(".toolbar").css("display") !== "none"){
							$(".toolbar").hide();
							$("a[mode='btnToolbar']").show();
						}
						return false;
					}
				}
			});
		}
	},

	ebook : function() {
		var _this = this;
		$(".scroller-container").hide();
		$(".flipbook-viewport").show();
		$(".contentView").hide();

			_this.isEbookView = true;
			$(".flipbook-container").attr("kk_zoom",_this.mobileZoom);
			var pageSize = _this.getPageSize(_this.viewportTemp);

			$("body").attr("totalslide",_this.totalSlide[_this.currentFile]);
			$("#kkTotalPageNumber").html(_this.totalSlide[_this.currentFile]);
			$("#pInfo_totalPage").html(_this.totalSlide[_this.currentFile]);


			$(".toolbar").css("display","block");
			var wrap = "";

			for (var i = 1; i <= _this.totalSlide[_this.currentFile] ; i++){
				if(i == 1){
					wrap += '<div slide="'+i+'" data-hash="'+i+'" class="page" ><div id="pageWrap_'+i+'" class="pageWrap slide_wrap"></div></div>';
				}else{
					wrap += '<div slide="'+i+'" data-hash="'+i+'" class="page" ><div id="pageWrap_'+i+'" class="pageWrap slide_wrap"></div><div class="gradient"></div></div>';
				}
			}

			$(".flipbook").html(wrap).show();
			$(".flipbook-container").css({"width":pageSize.width,"height":pageSize.height});
			$(".flipbook").turn({
				width: pageSize.width*2,
				height: _this.viewportTemp.height,
				duration: 600,

				elevation: 50,

				gradients: true,

				autoCenter: true,
				page: _this.current,
				pages: _this.totalSlide[_this.currentFile],
				when: {
					turning: function(event, page, view) {
					},

					turned: function(event, page, view) {
						$(this).turn('center');

						if(page%2 == 1){
							_this.loadPageEbook(page-1);
						}else{
							_this.loadPageEbook(page+1);
						}
						_this.loadPageEbook(page);

						if(_this.isMobile == true){
							$("#kkCurrentPageWrap").html(page);
						}else{
							$("#kkCurrentPageNumber").val(page);
						}
						document.location.hash = page;

					},

					missing: function (event, pages) {
					},

					first: function (e) {

						_this.scroll();

					}
				}
			});


			$(".editView").on('mousewheel DOMMouseScroll', function(e2){
				if((e2.ctrlKey || e2.metaKey)){
					if(e2.originalEvent.wheelDelta < 0) {
						_this.zoom = Number(_this.zoom) - 0.1;
						if(_this.zoom >= 1){
							$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
						}else{
							_this.zoom = 1;
						}
					} else {
						_this.zoom = _this.zoom + 0.1;
						if(_this.zoom <= 5){
							$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
						}else{
							_this.zoom = 5;
						}
					}
				}
				return false;
			});

			if(SettingsDef.sidebar.load == "on"){
				$(".deskView").addClass("thumbView");
				$(".viewmode .btn[mode='thumbtoggle']").addClass("active");
				if(SettingsDef.sidebar.mode == "outline"){
					_this.loadOutlineView();
				}else if(SettingsDef.sidebar.mode == "search"){
					_this.loadSearchView();
				}else {
					_this.loadThumbView();
				}
			}
			_this.bindFullScreenEvent();
			_this.resizeLayout();
			$('.loading').removeClass("on").addClass("off");

	},

	scroller : function() {
		var _this = this;
		$(".scroller-container").show();
		$(".flipbook-viewport").hide();
		$(".contentView").hide();
		var wW = Number($(".editView").width());
		var wH = Number($(".editView").height());
		var pageSize = _this.getPageSizeIscroll(_this.viewportTemp);
		$("body").attr("totalslide",_this.totalSlide[_this.currentFile]);
		$("#kkTotalPageNumber").html(_this.totalSlide[_this.currentFile]);
		$("#pInfo_totalPage").html(_this.totalSlide[_this.currentFile]);

		if(device.type == "desktop"){
		}else{
			$(".kk-prev-page").hide();
			$(".kk-next-page").hide();
		}

		var wrap = "";
		for (var i = 1; i <= _this.totalSlide[_this.currentFile] ; i++){
			wrap += '<div loaded="loading" page="'+i+'" class="page" style="width:'+(pageSize.ww)+'px;height:'+(pageSize.hh)+'px;">'+
			'<div class="pinch-zoom-container">'+
				'<div class="canvasWrapper" style="width:'+(pageSize.ww)+'px;height:'+(pageSize.hh)+'px;"></div>'+
				'<div class="spinner"></div>'+
			'</div>'+
			'</div>';
		}

		$(".scroller-container .scroller-wrapper").html(wrap);

		var mh = $(".editView").height();
		$(".scroller-container").css("height",mh+"px");


		var scrollH = $(window).height();
		$('.scroller-container .scroller-wrapper .page').each(function(i) {
			var position = $(this).position();
			var page = Number($(this).attr("page"));
			$(this).scrollspy({
				min:position.top - scrollH,
				max:position.top,
				container: $('.scroller-container'),
				onEnter: function(element, position) {
					_this.loadPageScroll(page,function(){
						_this.pz[page] = new PinchZoom.default(document.querySelector(".scroller-container .scroller-wrapper .page[page='"+page+"'] .canvasWrapper"),{
							lockDragAxis: true,
							draggableUnzoomed :  false
						});

						
					});
				},
				onLeave: function(element, position) {
					_this.loadPageScroll(page,function(){
						_this.pz[page] = new PinchZoom.default(document.querySelector(".scroller-container .scroller-wrapper .page[page='"+page+"'] .canvasWrapper"),{
							lockDragAxis: true,
							draggableUnzoomed :  false
						});

						
					});
				}
			});
		});

		_this.loadPageScroll(1,function(){
			_this.pz[1] = new PinchZoom.default(document.querySelector(".scroller-container .scroller-wrapper .page[page='1'] .canvasWrapper"),{
				lockDragAxis: true,
				draggableUnzoomed :  false
			});
			
			
		});



		/*
		_this.loadPageScroll(1,function(){
			_this.pz[1] = new PinchZoom.default(document.querySelector(".scroller-container .scroller-wrapper .page[page='1'] .canvasWrapper"),{
				lockDragAxis: true,
				draggableUnzoomed :  false
			});
		});

		$(".scroller-container").scroll(function() {
			$('.scroller-container .scroller-wrapper .page').each(function(){
				if( $(this).offset().top = $(".scroller-container").scrollTop() < 20){
					var page = $(this).attr("page");
					_this.loadPageScroll(page,function(){
						_this.pz[page] = new PinchZoom.default(document.querySelector(".scroller-container .scroller-wrapper .page[page='"+page+"'] .canvasWrapper"),{
							lockDragAxis: true,
							draggableUnzoomed :  false
						});
					});
				}
			});
		});
		*/
	},

	orientationChanged : function() {
		var timeout = 500;
		return new window.Promise(function(resolve) {
			var go = function (i, height0){
			window.innerHeight != height0 || i >= timeout ?
				resolve() :
				window.requestAnimationFrame(function(){
				go(i + 1, height0);

				});
			};
			go(0, window.innerHeight);
		});
	},

	scroll : function() {
		var _this = this;
		_this.myScroll = new IScroll('.editView', {
			zoom: true,
			scrollX: true,
			scrollY: true,
			tap: true,
			click: true,
			wheelAction: 'zoom',
			zoomMin: 1,
			preventDefault: false
		});
		_this.myScroll.on('zoomStart', function(){
				_this.swiper.detachEvents();

		});
		_this.myScroll.on('zoomEnd', function(){

			if(this.scale > 1){
				$(".kk-prev-page").css("display","block");
				$(".kk-next-page").css("display","block");
				_this.swiper.detachEvents();
			} else {
				$(".kk-prev-page").css("display","none");
				$(".kk-next-page").css("display","none");
				_this.swiper.attachEvents();
			}
		});
	},

	loadPage : function (page, callback) {
		var _this = this;
		page = Number(page);
		if(page < 0){ return; }
		if(page > _this.totalSlide[_this.currentFile]){ return; }
		_this.pdfDocument[_this.currentFile].then(function (info) {
			info.getPage(page).then(function (pageInfo) {
				var wmkWrap = '';

				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				var aratio = [];
				if(typeof(SettingsDef.fileinfo.ratio_page) != "undefined"){
					aratio = SettingsDef.fileinfo.ratio_page.split("x");
				}

				var ratio = _this.ratio;
				var spage = page.toString();
				if($.inArray(spage,aratio) > -1){
					ratio = _this.ratio*2;
				}

				var viewport = pageInfo.getViewport(ratio);
				var pageSize = _this.getPageSize(viewport);
				var masterPageNode = $("#document_view div[slide='"+page+"'] .pageWrap");

				canvas.width  = viewport.width;
				canvas.height = viewport.height;
				canvas.style.width = pageSize.width + 'px';
				canvas.style.height = pageSize.height  + 'px';

				_this.watermark.rendering(page,"swiper");
				
				$("#document_view div[slide='"+page+"'] .pageWrap").css({'width':canvas.style.width,'height':canvas.style.height});

				if (_this.isUseTextDom) {
					var textLayer = null;
					var textLayerWrap = $('<div class="text_layer"></div>')[0];
					masterPageNode.append(textLayerWrap);
					var text_viewport = pageInfo.getViewport(pageSize.mobileZoom);
					textLayerWrap.style.width = pageSize.width + 'px';
					textLayerWrap.style.height = pageSize.height  + 'px';

					pageInfo.getTextContent().then(function (textContent) {
						textLayer = new TextLayerBuilder({
							textLayerDiv:  $("#document_view  div[slide='"+page+"'] .pageWrap").find('.text_layer')[0],
							viewport: text_viewport
						});
						textLayer.setTextContent(textContent);
						textLayer.render();
					});

					pageInfo.render({
						canvasContext: context,
						viewport: viewport,
						textLayer: textLayer
					}).then(function(){
						$("#document_view div[slide='"+page+"']").attr("loaded","true");
						pageInfo.getAnnotations().then(function(data) {
							$.each(data,function(i){
								var rect = this.rect;
								var view = pageInfo.view;
								var rect1 = PDFJS.Util.normalizeRect([
									(rect[0]- view[0]),
									(view[3] - rect[1]),
									(rect[2]),
									(view[3] - rect[3])
								]);

								var _o = pageSize.mobileZoom;
								if(typeof(this.dest) !== "undefined"){
									if (typeof this.dest === 'object') {
										info.getPageIndex(this.dest[0]).then(function(pageIndex) {
											var pageNum = pageIndex + 1;
											$("#document_view div[slide='"+page+"']").append('<a ref="'+pageNum+'" class="bookmarklink" style="top:'+(rect1[1]*_o)+'px;left:'+(rect1[0]*_o)+'px;width:'+(rect[2] - rect[0])*_o+'px;height:'+(rect[3] - rect[1])*_o+'px;"></a>');
											$("#document_view div[slide='"+page+"'] .bookmarklink[ref='"+pageNum+"']").on("click", function (e) {
												var rid = Number($(this).attr("ref"));
												_this.slideTo(rid);
												return false;
											});
										});
									}else{
										var _dest = escape(this.dest);
										var refPage = _this.cashPageIndex[_dest];
										$("#document_view div[slide='"+page+"']").append('<a ref="'+refPage+'" class="bookmarklink" style="top:'+(rect1[1]*_o)+'px;left:'+(rect1[0]*_o)+'px;width:'+(rect[2] - rect[0])*_o+'px;height:'+(rect[3] - rect[1])*_o+'px;"></a>');
										$("#document_view div[slide='"+page+"'] .bookmarklink[ref='"+refPage+"']").on("click", function (e) {
											var rid = Number($(this).attr("ref"));
											_this.slideTo(rid);
											return false;
										});
									}

								}else{
									var link = this.unsafeUrl.split(':');
									if(link[0] == "TTS"){

										_this.tts[page] = link[1];

										
									}else{
										$("#document_view div[slide='"+page+"'] .pageWrap").append('<a href="'+this.unsafeUrl+'" target="_blank" class="bookmarklink" style="top:'+(rect1[1]*_o)+'px;left:'+(rect1[0]*_o)+'px;width:'+(rect[2] - rect[0])*_o+'px;height:'+(rect[3] - rect[1])*_o+'px;"></a>');
									}
								}
							});
						});

						var doc_id  = SettingsDef.fileinfo.doc_id;
						if(SettingsDef.loading.opendb){
							_this.db.transaction(function (tx) {
								var sql = 'SELECT * FROM bookmark WHERE mode = "highlight" AND doc_id = "'+doc_id+'" AND page = "'+page+'"';
								tx.executeSql(sql, [], function (tx, results) {
									var len = results.rows.length;
									if(len > 0){
										var item = results.rows.item(0).title.split("|");
										$.each(item,function(i,v){
											var n = Number(v);
											$("#document_view div[slide='"+page+"'] .pageWrap .text_layer").find("div").eq(v).addClass("mk_ypan_0");
										});
									}
								}, null);
							});
						}

						if(device.type == "desktop"){
							masterPageNode.append(canvas);
							if ($.isFunction(callback)){ callback(); }
							_this.resizeLayout();
						}else{

							var image = document.createElement('img');
							image.src = canvas.toDataURL('image/jpeg');
							image.style.width = pageSize.width + 'px';
							image.style.height = pageSize.height + 'px';
							masterPageNode.append(image);
							canvas = null;

							image.onload = function () {
								if ($.isFunction(callback)){ callback(); }
								_this.resizeLayout();
							}
						}
					});
				}else{
					pageInfo.render({
						canvasContext: context,
						viewport: viewport
					}).then(function(){
						$("#document_view div[slide='"+page+"']").attr("loaded","true");



						pageInfo.getAnnotations().then(function(data) {
							$.each(data,function(i){
								var rect = this.rect;
								var view = pageInfo.view;
								var rect1 = PDFJS.Util.normalizeRect([
									(rect[0]- view[0]),
									(view[3] - rect[1]),
									(rect[2]),
									(view[3] - rect[3])
								]);
								//console.log(rect);


								var _o = pageSize.mobileZoom;

								if(typeof(this.dest) !== "undefined"){

									if (typeof this.dest === 'object') {
										info.getPageIndex(this.dest[0]).then(function(pageIndex) {
											var pageNum = pageIndex + 1;
											$("#document_view div[slide='"+page+"'] .pageWrap").append('<a ref="'+pageNum+'" class="bookmarklink" style="top:'+(rect1[1]*_o)+'px;left:'+(rect1[0]*_o)+'px;width:'+(rect[2] - rect[0])*_o+'px;height:'+(rect[3] - rect[1])*_o+'px;"></a>');
											$("#document_view div[slide='"+page+"'] .pageWrap .bookmarklink[ref='"+pageNum+"']").on("click", function (e) {
												var rid = Number($(this).attr("ref"));
												_this.slideTo(rid);
												return false;
											});
										});
									}else{
										var _dest = escape(this.dest);
										var refPage = _this.cashPageIndex[_dest];
										$("#document_view div[slide='"+page+"'] .pageWrap").append('<a ref="'+refPage+'" class="bookmarklink" style="top:'+(rect1[1]*_o)+'px;left:'+(rect1[0]*_o)+'px;width:'+(rect[2] - rect[0])*_o+'px;height:'+(rect[3] - rect[1])*_o+'px;"></a>');
										$("#document_view div[slide='"+page+"'] .pageWrap .bookmarklink[ref='"+refPage+"']").on("click", function (e) {
											var rid = Number($(this).attr("ref"));
											_this.slideTo(rid);
											return false;
										});
									}
								}else{
									var link = this.unsafeUrl.split(':');

									
									if(link[0] == "TTS"){
										page = Number(page);
										console.log(page);
										_this.tts[page] = link[1];
									}else{
										$("#document_view div[slide='"+page+"'] .pageWrap").append('<a href="'+this.unsafeUrl+'" target="_blank" class="bookmarklink" style="top:'+(rect1[1]*_o)+'px;left:'+(rect1[0]*_o)+'px;width:'+(rect[2] - rect[0])*_o+'px;height:'+(rect[3] - rect[1])*_o+'px;"></a>');
									}
								}
							});
						});

						if(device.type == "desktop"){
							masterPageNode.append(canvas);
							_this.resizeLayout();
							if ($.isFunction(callback)){ callback(); }

						}else{
							var image = document.createElement('img');
							image.src = canvas.toDataURL('image/jpeg');
							image.style.width = pageSize.width + 'px';
							image.style.height = pageSize.height + 'px';
							masterPageNode.append(image);
							canvas = null;
							image.onload = function () {
								_this.resizeLayout();
								if ($.isFunction(callback)){ callback(); }

							}
						}
					});
				}
				if(typeof(SettingsDef.footer) !== "undefined"){
					var footer = Mustache.render(SettingsDef.footer.content, SettingsDef.footer);
					masterPageNode.append('<div class="footer">'+ footer +'</div>');
				}
			});
		});
	},

	loadPageEbook : function (pageId, preload) {
		var _this = this;
		if(pageId <= 0){ return; }
		if(pageId > _this.totalSlide[_this.currentFile]){ return; }
		if(preload != true){
			_this.current = pageId;
		}

		var masterPageNode = $(".flipbook div[slide='"+pageId+"'] > .pageWrap");
		if(masterPageNode.attr("loaded") !== "true"){
			_this.pdfDocument[_this.currentFile].then(function (info) {
				info.getPage(pageId).then(function (pageInfo) {

					var canvas = document.createElement('canvas');
					//masterPageNode.html(canvas);
					//masterPageNode.append('<div class="square"><div class="spin"></div></div>');

					if (_this.isUseTextDom) {
						var textLayerWrap = $('<div class="text_layer" style=""></div>')[0]
						masterPageNode.append(textLayerWrap);
					}

					var context = canvas.getContext('2d');
					var viewport = pageInfo.getViewport(_this.ratio);
					var pageSize = _this.getPageSize(_this.viewportTemp);
					//var zoom = $(window).width() / (pageSize.width*2);
					canvas.width  = viewport.width;
					canvas.height = viewport.height;
					//canvas.style.width = (pageSize.width *zoom) + 'px';
					//canvas.style.height = (pageSize.height *zoom)  + 'px';
					canvas.style.width = '100%';
					canvas.style.height = '100%';
					//canvas.style.width = pageSize.width + 'px';
					//canvas.style.height = pageSize.height  + 'px';

					if(preload != true){
						$("#lSideView .lSideViewWrap .lSideViewWrapSCroll .slideWrap").removeClass("current");
						$("#lSideView .lSideViewWrap .lSideViewWrapSCroll .slideWrap[page='"+_this.current+"']").addClass("current");
					}

					var textLayer = null;
					if (_this.isUseTextDom) {
						var text_viewport = pageInfo.getViewport(1);
						textLayerWrap.style.width = pageSize.width + 'px';
						textLayerWrap.style.height = pageSize.height  + 'px';
						pageInfo.getTextContent().then(function (textContent) {
							textLayer = new TextLayerBuilder({
								textLayerDiv: $(".flipbook div[slide='"+pageId+"'] .pageWrap").find('.text_layer')[0],
								viewport: text_viewport
							});
							textLayer.setTextContent(textContent);
							textLayer.render();
						});
						pageInfo.render({
							canvasContext: context,
							viewport: viewport,
							textLayer: textLayer
						});

						$(".flipbook div[slide='"+pageId+"']").attr("loaded","true");
					} else {

						pageInfo.render({
							canvasContext: context,
							viewport: viewport
						}).then(function(){

							$(".flipbook div[slide='"+pageId+"']").attr("loaded","true");
							var image = document.createElement('img');
							image.src = canvas.toDataURL('image/jpeg');
							//image.style.width = pageSize.width + 'px';
							image.style.width = '100%';
							//image.style.height = pageSize.height + 'px';
							masterPageNode.append(image);
							canvas = null;
							image.onload = function () {
								//if ($.isFunction(callback)){ callback(); }
								_this.resizeLayout();
							}
						});
					}
					$('.loading').removeClass("on").addClass("off");
					pageInfo.getAnnotations().then(function(data) {

						var awrap = "";
						$.each(data,function(i){

							var rect = this.rect;
							var view = pageInfo.view;
							var rect1 = PDFJS.Util.normalizeRect([
								(rect[0]),
								(view[3] - rect[1] + view[1]),
								(rect[2]),
								(view[3] - rect[3] + view[1])
							]);

							if(typeof(this.dest) !== "undefined"){

								if (typeof this.dest === 'object') {
									info.getPageIndex(this.dest[0]).then(function(pageIndex) {
										var _cash = [];
										var pageNum = pageIndex + 1;

										$(".flipbook div[slide='"+pageId+"'] .pageWrap").append('<a ref="'+pageNum+'" class="bookmarklink" style="top:'+(rect1[1]*_this.comp)+'px;left:'+(rect1[0]*_this.comp)+'px;width:'+(rect[2] - rect[0])*_this.comp+'px;height:'+(rect[3] - rect[1])*_this.comp+'px;"></a>');
										refPage = pageNum;

										$(".flipbook div[slide='"+pageId+"'] .pageWrap .bookmarklink[ref='"+pageNum+"']").on("click", function (e) {
											var rid = Number($(this).attr("ref"));
											_this.slideTo(rid);
										});
									});
								}else{
									var refPage = _this.cashPageIndex[this.dest];
									awrap = '<a ref="'+refPage+'" class="bookmarklink" style="top:'+(rect1[1]*_this.comp)+'px;left:'+(rect1[0]*_this.comp)+'px;width:'+(rect[2] - rect[0])*_this.comp+'px;height:'+(rect[3] - rect[1])*_this.comp+'px;"></a>';
								}
								//console.log(this.dest);
								//$(".swiper-slide-active .pageWrap").append('<a href="#'+this.dest+'" target="_blank" class="bookmarklink" style="top:'+(rect1[1]*_this.comp)+'px;left:'+(rect1[0]*_this.comp)+'px;width:'+(rect[2] - rect[0])*_this.comp+'px;height:'+(rect[3] - rect[1])*_this.comp+'px;"></a>');
							}

							if(typeof(this.url) !== "undefined"){
								$(".flipbook div[slide='"+pageId+"'] .pageWrap").append('<a href="'+this.url+'" target="_blank" class="annotationlink" style="top:'+(rect1[1]*_this.comp)+'px;left:'+(rect1[0]*_this.comp)+'px;width:'+(rect[2] - rect[0])*_this.comp+'px;height:'+(rect[3] - rect[1])*_this.comp+'px;"></a>');
							}
						});
					});
					if(typeof(SettingsDef.footer) !== "undefined"){
						var footer = Mustache.render(SettingsDef.footer.content, SettingsDef.footer);
						masterPageNode.append('<div class="footer">'+ footer +'</div>');
					}
				});
			});
		}
	},

	loadPageScroll : function (page, callback) {
		var _this = this;
		page = Number(page);
		if(page < 0){ return; }
		if(page > _this.totalSlide[_this.currentFile]){ return; }

		var masterPageNode = $(".scroller-container .scroller-wrapper .page[page='"+page+"'] .canvasWrapper");

		if($(".scroller-container .scroller-wrapper .page[page='"+page+"']").attr("loaded") !== "true"){
			_this.pdfDocument[_this.currentFile].then(function (info) {
				info.getPage(page).then(function (pageInfo) {

					var canvas = document.createElement('canvas');
					var context = canvas.getContext('2d');
					var aratio = [];
					if(typeof(SettingsDef.fileinfo.ratio_page) != "undefined"){
						aratio = SettingsDef.fileinfo.ratio_page.split("x");
					}

					var ratio = _this.ratio;
					var spage = page.toString();
					if($.inArray(spage,aratio) > -1){
						ratio = _this.ratio*2;
					}

					var viewport = pageInfo.getViewport(ratio);
					var pageSize = _this.getPageSizeIscroll(viewport);


					canvas.width  = viewport.width;
					canvas.height = viewport.height;
					canvas.style.width = pageSize.width + 'px';
					canvas.style.height = pageSize.height  + 'px';

			

					$(".scroller-container .scroller-wrapper .page[page='"+page+"'] .canvasWrapper").css({'width':canvas.style.width,'height':canvas.style.height});

					pageInfo.render({
						canvasContext: context,
						viewport: viewport
					}).then(function(){
						$(".scroller-container .scroller-wrapper .page[page='"+page+"']").attr("loaded","true");
						_this.watermark.rendering(page,"scroll");

						pageInfo.getAnnotations().then(function(data) {
							$.each(data,function(i){

								var rect = this.rect;
								var view = pageInfo.view;
								var rect1 = PDFJS.Util.normalizeRect([
									(rect[0]- view[0]),
									(view[3] - rect[1]),
									(rect[2]),
									(view[3] - rect[3])
								]);
								//console.log(rect);


								var _o = pageSize.mobileZoom;

								if(typeof(this.dest) !== "undefined"){

									if (typeof this.dest === 'object') {
										info.getPageIndex(this.dest[0]).then(function(pageIndex) {
											var pageNum = pageIndex + 1;
											$(".scroller-container .scroller-wrapper .page[page='"+page+"'] .canvasWrapper").append('<a ref="'+pageNum+'" class="bookmarklink" style="top:'+(rect1[1]*_o)+'px;left:'+(rect1[0]*_o)+'px;width:'+(rect[2] - rect[0])*_o+'px;height:'+(rect[3] - rect[1])*_o+'px;"></a>');
											$(".scroller-container .scroller-wrapper .page[page='"+page+"'] .canvasWrapper .bookmarklink[ref='"+pageNum+"']").on("click", function (e) {
												var rid = Number($(this).attr("ref"));
												_this.slideTo(rid);
												return false;
											});
										});
									}else{
										var _dest = escape(this.dest);
										var refPage = _this.cashPageIndex[_dest];
										$(".scroller-container .scroller-wrapper .page[page='"+page+"'] .canvasWrapper").append('<a ref="'+refPage+'" class="bookmarklink" style="top:'+(rect1[1]*_o)+'px;left:'+(rect1[0]*_o)+'px;width:'+(rect[2] - rect[0])*_o+'px;height:'+(rect[3] - rect[1])*_o+'px;"></a>');
										$(".scroller-container .scroller-wrapper .page[page='"+page+"'] .canvasWrapper .bookmarklink[ref='"+refPage+"']").on("click", function (e) {
											var rid = Number($(this).attr("ref"));
											_this.slideTo(rid);
											return false;
										});
									}
								}else{
									var link = this.unsafeUrl.split(':');
									if(link[0] == "TTS"){
										_this.tts[page] = link[1];
									}else{
										$(".scroller-container .scroller-wrapper .page[page='"+page+"'] .canvasWrapper").append('<a href="'+this.unsafeUrl+'" target="_blank" class="bookmarklink" style="top:'+(rect1[1]*_o)+'px;left:'+(rect1[0]*_o)+'px;width:'+(rect[2] - rect[0])*_o+'px;height:'+(rect[3] - rect[1])*_o+'px;"></a>');
									}
								}
							});
						});


						var image = document.createElement('img');
						image.src = canvas.toDataURL('image/jpeg');
						image.style.width = pageSize.width + 'px';
						image.style.height = pageSize.height + 'px';
						masterPageNode.html(image);
						canvas = null;
						image.onload = function () {
							_this.resizeLayout();



							$('.loading').removeClass("on").addClass("off");
							if ($.isFunction(callback)){ callback(); }
						}
					});
				});
			});
		}
	},

	getPageSize : function(viewport) {
		var _this = this;

		var resultPageSize = {
			mobileZoom : '',
			width : '',
			height : ''
		};

		if(device.type == "desktop"){
			var originPageWidth = (viewport.width / _this.ratio);
			var originPageHeight = (viewport.height/ _this.ratio);
			var lbarWidth = Number($("#lSideView").width());
			var windowWidth = $(window).width() - 20 - lbarWidth;
			var windowHeight = $(window).height() - $(".toolbar").height() - 20;
			/*
			if(screenfull.isFullscreen){
				windowHeight = $(window).height();
			}*/
		}else{
			var originPageWidth = (viewport.width / _this.ratio),
			originPageHeight = (viewport.height/ _this.ratio);

			var windowWidth = 0;
			var windowHeight = 0;

			if(SettingsDef.loading.pageWrapFit == "window"){
				windowWidth = $(window).width();
				windowHeight = $(window).height();
			}else if(SettingsDef.loading.pageWrapFit == "screen"){
				windowWidth = screen.width;
				windowHeight = screen.height;
			}else if(SettingsDef.loading.pageWrapFit == "dom"){
				windowWidth = $(".editView").width();
				windowHeight = $(".editView").height();
			}else{
				windowWidth = screen.width;
				windowHeight = screen.height;
			}

			if(device.os == "ios"){
				if(window.orientation == 90 || window.orientation == -90){
					windowWidth = screen.height;
					windowHeight = screen.width;
				}
			} else if(device.os == "android"){
				if(window.orientation == 90 || window.orientation == -90){
					//windowWidth = screen.height;
					//windowHeight = screen.width;
				}
			}

			//alert(window.orientation + "###"+originPageHeight+"----" + windowWidth + "===========" + windowHeight);

		}
		if(_this.isUseTextDom) {
			var textLayerWidth = parseInt($('.text_layer').css('width'));
			var textLayerHeight = parseInt($('.text_layer').css('height'));
		}

		if((originPageWidth / originPageHeight) >= (windowWidth / windowHeight)){
			resultPageSize.mobileZoom = windowWidth / originPageWidth;
			resultPageSize.width = Math.round(windowWidth);
			resultPageSize.height = Math.round(originPageHeight * resultPageSize.mobileZoom);

			if(_this.isUseTextDom) {
				resultPageSize.textLayerScale = resultPageSize.width / textLayerWidth;
				resultPageSize.textLayerTransform = 'translate('+ (resultPageSize.width - textLayerWidth)/2 + 'px, ' + (resultPageSize.height - textLayerHeight)/2 + 'px) scale(' + resultPageSize.textLayerScale + ')';
			}
		}else{
			resultPageSize.mobileZoom = windowHeight / originPageHeight;
			resultPageSize.width = Math.round(originPageWidth * resultPageSize.mobileZoom);
			resultPageSize.height = Math.round(windowHeight);
			if(_this.isUseTextDom) {
				resultPageSize.textLayerScale = resultPageSize.height / textLayerHeight;
				resultPageSize.textLayerTransform = 'translate('+ (resultPageSize.width - textLayerWidth)/2 + 'px, ' + (resultPageSize.height - textLayerHeight)/2 + 'px) scale(' + resultPageSize.textLayerScale + ')';
			}
		}

		resultPageSize.ww =  Math.round(originPageWidth * resultPageSize.mobileZoom);
		resultPageSize.hh =  Math.round(originPageHeight * resultPageSize.mobileZoom);

		_this.viewportTemp = viewport;
		return resultPageSize;
	},

	getPageSizeIscroll : function(viewport) {
		var _this = this;

		var resultPageSize = {
			mobileZoom : '',
			width : '',
			height : ''
		};

		if(device.type == "desktop"){
			var originPageWidth = (viewport.width / _this.ratio),
			originPageHeight = (viewport.height/ _this.ratio),
			windowWidth = $(window).width()-20,
			windowHeight = $(window).height() - $(".toolbar").height() - 20;

			/*
			if(screenfull.isFullscreen){
				windowHeight = $(window).height();
			}*/
		}else{
			var originPageWidth = (viewport.width / _this.ratio),
			originPageHeight = (viewport.height/ _this.ratio);

			var windowWidth = screen.width;
			var windowHeight = screen.height;

			if(device.os == "ios"){
				if(window.orientation == 90 || window.orientation == -90){
					windowWidth = screen.height;
					windowHeight = screen.width;
				}
			} else if(device.os == "android"){
				if(window.orientation == 90 || window.orientation == -90){
					//windowWidth = screen.height;
					//windowHeight = screen.width;
				}
			}

			//alert(window.orientation + "###"+originPageHeight+"----" + windowWidth + "===========" + windowHeight);

		}
		if(_this.isUseTextDom) {
			var textLayerWidth = parseInt($('.text_layer').css('width'));
			var textLayerHeight = parseInt($('.text_layer').css('height'));
		}


		resultPageSize.mobileZoom = windowWidth / originPageWidth;
		resultPageSize.width = Math.round(windowWidth);
		resultPageSize.height = Math.round(originPageHeight * resultPageSize.mobileZoom);



		resultPageSize.ww =  Math.round(originPageWidth * resultPageSize.mobileZoom);
		resultPageSize.hh =  Math.round(originPageHeight * resultPageSize.mobileZoom);

		_this.viewportTemp = viewport;
		return resultPageSize;
	},

	redraw : function(){
		var _this = this;
		if(device.type == "desktop"){
			_this.slider(true);
		}else{
			if(window.orientation == 90 || window.orientation == -90){
				_this.scroller(true);
				$(".submenubar").hide();
			} else {
				_this.slider(true);
				$(".submenubar").show();
			}
		}
	},


	resizeLayout : function() {
		var _this = this;
		if(_this.viewmode == "ebook"){
			var windowWidth = $(window).width()- $("#lSideView").width(),
			windowHeight = $(window).height() - $(".toolbar").height();

			/*
			if(screenfull.isFullscreen){
				windowHeight = $(screen).height();
			}
			*/

			$(".flipbook-viewport").css({"width":windowWidth,"height":windowHeight});

			var pageSize = _this.getPageSize(_this.viewportTemp);
			var zoom = windowWidth / ((pageSize.width*2) + 20);
			var zoomX = windowWidth / ((pageSize.width*2) + 20);
			var zoomY = windowHeight / (pageSize.height +20);
			if(zoomX < zoomY){
				$(".flipbook-container").css({"width":pageSize.width*zoom*2,"height":pageSize.height*zoom});
				$(".flipbook").turn("size", pageSize.width*zoom*2, pageSize.height*zoom);
			}else{
				var zoom = windowHeight / (pageSize.height +20);;
				$(".flipbook-container").css({"width":pageSize.width*zoom*2,"height":pageSize.height*zoom});
				$(".flipbook").turn("size", pageSize.width*zoom*2, pageSize.height*zoom);
			}
		}else{

			if(device.type == "desktop"){
				var mw = $(".editView").width();
				var mh = $(".editView").height();
				$("#document_view").css("height",mh+"px");
				$('#document_view > .swiper-slide-active').css({"width":mw+"px","height":mh+"px"});
				$('#document_view > .swiper-slide-active .slide_wrap').css({"width":mw+"px","height":mh+"px"});
				if(_this.swiper !== null){
					_this.swiper.update();
				}

			}else{
				var mw = $(".editView").width();
				var mh = $(".editView").height();


				$(".editView .container").css("height",mh+"px");
				$('#document_view > .swiper-slide-active').css({"width":mw+"px","height":mh+"px"});
				$('#document_view > .swiper-slide-active .slide_wrap').css({"width":mw+"px","height":mh+"px"});
				if(_this.swiper !== null){
					_this.swiper.update();
				}
			}
		}
	},

	bindFullScreenEvent : function() {
		var _this = this;

		FullScreen.change(function(){


			setTimeout(function(){
				var pageSize = _this.getPageSize(_this.viewportTemp);
				//_this.zoom = 1;

				//$(".contentView").css({"transform":"scale("+(H/slideH)+")","transform-origin":"50% 50%"});
				$(".deskView").removeClass("thumbView");
				$(".viewmode .btn[mode='thumbtoggle']").removeClass("active");


				$("#zoomin").hide();
				$("#zoomout").hide();
				$("#zoom_rate").hide();
				$("#rotateL").hide();
				$("#rotateR").hide();



				$("#document_view .swiper-slide .slide_wrap .pageWrap").css({"width":pageSize.width+"px", "height":pageSize.height+"px"});
				$("#document_view .swiper-slide .slide_wrap .pageWrap canvas").css({"width":pageSize.width+"px", "height":pageSize.height+"px"});
				_this.resizeLayout();
			}, 300);

			$(".toolbar .btn[mode='fullscreen']").hide();
			$(".toolbar .btn[mode='unfullscreen']").show();
		},function(){
			setTimeout(function(){
				var pageSize = _this.getPageSize(_this.viewportTemp);
				//console.log(pageSize.width+"!!!!!!!!!!!!!!!!!!!!!!!!!"+pageSize.height);


				$("#zoomin").show();
				$("#zoomout").show();
				$("#zoom_rate").show();
				$("#rotateL").show();
				$("#rotateR").show();
				console.log("######222#################");

				//$(".flipbook-viewport").css({"height":H+"px"});

				//$(".deskView").css("height","");
				/*
				_this.loadPage(_this.current,function(){
					$("#document_view div[slide='"+_this.current+"']").find(".spinner").remove();
				});
				*/
				_this.resizeLayout();
				$("#document_view .swiper-slide .slide_wrap .pageWrap").css({"width":pageSize.width+"px", "height":pageSize.height+"px"});
				$("#document_view .swiper-slide .slide_wrap .pageWrap canvas").css({"width":pageSize.width+"px", "height":pageSize.height+"px"});

			}, 300);

			$(".toolbar .btn[mode='fullscreen']").show();
			$(".toolbar .btn[mode='unfullscreen']").hide();
		});
	},

	//--------------------------------------------------------------------------------

	viewmodechange : function(viewmode) {
		var _this = this;
		_this.viewmode = viewmode;
		if(_this.viewmode == "ebook"){
			$(".flipbook-viewport").show();
			$(".swiper-container").hide();
			$(".btn[mode='slideview']").show();
			$(".btn[mode='ebookview']").hide();

			if(_this.isEbookView == false){
				_this.reinit();
			}

			//$(".btn[mode='slideview']").removeClass("active").hide();
			//$(".btn[mode='ebookview']").addClass("active").hide();
			//$(".btn[mode='cardview']").removeClass("active").hide();

		}else{
			$(".flipbook-viewport").hide();
			$(".swiper-container").show();
			$(".btn[mode='slideview']").hide();
			$(".btn[mode='ebookview']").show();

			if(_this.isSlideView == false){
				_this.reinit();
			}


			//$(".btn[mode='slideview']").hide();
			//$(".btn[mode='ebookview']").removeClass("active").hide();
			//$(".btn[mode='cardview']").show();
		}
	},

	pageCheck : function(page) {
		var _this = this;
		if(page == 1){
			$(".toolbar .btn[mode='prev']").addClass("disabled");
			$(".toolbar .btn[mode='start']").addClass("disabled");
			$(".toolbar .btn[mode='next']").removeClass("disabled");
			$(".toolbar .btn[mode='end']").removeClass("disabled");
		}else if(page == _this.totalSlide[_this.currentFile]){
			$(".toolbar .btn[mode='start']").removeClass("disabled");
			$(".toolbar .btn[mode='next']").addClass("disabled");
			$(".toolbar .btn[mode='prev']").removeClass("disabled");
			$(".toolbar .btn[mode='end']").addClass("disabled");
		}else{
			$(".toolbar .btn[mode='start']").removeClass("disabled");
			$(".toolbar .btn[mode='prev']").removeClass("disabled");
			$(".toolbar .btn[mode='next']").removeClass("disabled");
			$(".toolbar .btn[mode='end']").removeClass("disabled");
		}
	},

	clearSlide : function (pageId) {

		var _this = this;
		if($("#document_view > div[slide='"+pageId+"']").length > 0){
			$("#document_view > div[slide='"+pageId+"']").remove();
			_this.swiper.update();
		}
	},

	windowResizeEnd : function(callback){
		var rtime;
		var timeout = false;
		var delta = 200;
		$(window).resize(function() {
			rtime = new Date();
			if (timeout === false) {
				timeout = true;
				setTimeout(resizeend, delta);
			}
		});
		function resizeend() {
			if (new Date() - rtime < delta) {
				setTimeout(resizeend, delta);
			} else {
				timeout = false;
				if ($.isFunction(callback)){ callback(); }
			}
		}
	},

	//-- nav ------------------------------------------------------------------------------------------------------
	prevSlide : function(){
		var _this = this;
		var page = Number(_this.current - 1);
		if(page <= 0){ return; }
		if(page > _this.totalSlide[_this.currentFile]){ return; }

		_this.zoom = 1;


		if(device.type == "desktop"){
			$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
		}


		console.log("@@@@@@@@@@@");
		if(device.type == "desktop"){
			if(_this.viewmode == "ebook"){
				$(".flipbook").turn("previous");
			}else if(_this.viewmode == "slide"){
				_this.swiper.slidePrev();
			}else if(_this.viewmode == "card"){
				_this.swiper.slidePrev();
			}else{
				_this.swiper.slidePrev();
			}

		}else{
			if(_this.viewmode == "slide"){
				_this.swiper.slidePrev();
			}else if(_this.viewmode == "card"){
				_this.swiper.slidePrev();
			}else{
				_this.swiper.slidePrev();
			}

		}

	},

	nextSlide : function(){
		var _this = this;


		var page = Number(_this.current + 1);
		if(page <= 0){ return; }
		if(page > _this.totalSlide[_this.currentFile]){ return; }

		_this.zoom = 1;
		if(device.type == "desktop"){
			$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
		}

		if(device.type == "desktop"){
			if(_this.viewmode == "ebook"){
				$(".flipbook").turn("next");
			}else {
				_this.swiper.slideNext();
			}
		}else{
			if(_this.viewmode == "slide"){
				_this.swiper.slideNext();
			}else if(_this.viewmode == "card"){
				_this.swiper.slideNext();
			}else if(_this.viewmode == "scroller"){

			}
		}
	},

	startSlide : function(){
		var _this = this;
		var page = 1;
		if(_this.viewmode == "slide"){
			page = 1;
			_this.slideTo(page);
		}else if(_this.viewmode == "card"){
			page = 1;
			_this.slideTo(page);
		}else{
			//_this.swiper.slideTo(page);
			$(".flipbook").turn("page",page);
		}
	},

	endSlide : function(){
		var _this = this;
		var page = _this.totalSlide[_this.currentFile];
		if(_this.viewmode == "slide"){
			_this.zoom = 1;
			$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
			_this.swiper.slideTo(page);
		}else if(_this.viewmode == "card"){
			_this.zoom = 1;
			$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
			_this.swiper.slideTo(page);
		}else{
			//_this.swiper.slideTo(page);
			_this.zoom = 1;
			$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
			$(".flipbook").turn("page",page);
		}
	},

	slideTo : function(page,callback){
		var _this = this;
		page = Number(page);
		_this.current = page;


		if(device.type == "desktop"){
			if(_this.viewmode == "ebook"){
				$(".flipbook").turn("page",page);
			}else {
				var go = (page-1);
				if(go < 1){ go = 0;}
				_this.swiper.slideTo(go,300);
				_this.swiper.update();
			}
		}else{

			if(window.orientation == 90 || window.orientation == -90){
				$(".scroller-container").animate({
					scrollTop: $(".page[page='"+page+"']").offset().top
				}, 500);
			}else{

				var go = (page-1);
				if(go < 1){ go = 0;}
				_this.swiper.slideTo(go,300);
				_this.swiper.update();
			}

		}

		if ($.isFunction(callback)){ callback(); }
	},

	zoomin : function() {
		var _this = this;
		var z = Number(_this.zoom);
		var inx  = this.zoomSpac.indexOf(z);
		var leng = this.zoomSpac.length;
		inx = inx+1;
		if(this.zoomSpac[inx] == undefined){
			_this.zoom = this.zoomSpac[leng-1];
		}else{
			_this.zoom = this.zoomSpac[inx];
		}

		//$('#zoom_rate').val(_this.zoom); // Select the option with a value of '1'
		//$('#zoom_rate').trigger('change');
		$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
		//_this.zooming();
	},

	zoomout : function() {
		var _this = this;
		var z = Number(_this.zoom);
		//console.log(z);
		var inx  = this.zoomSpac.indexOf(z);
		var leng = this.zoomSpac.length;
		inx = inx-1;
		if(this.zoomSpac[inx] == undefined){
			_this.zoom = this.zoomSpac[0];
		}else{
			_this.zoom = this.zoomSpac[inx];
		}

		//$('#zoom_rate').val(_this.zoom); // Select the option with a value of '1'
		//$('#zoom_rate').trigger('change');
		$("#zoom_rate").kkSelectBox("setValue",null,_this.zoom);
		//_this.zooming();
	},

	zooming : function() {
		var _this = this;
		var zoom_rate = Math.round(_this.zoom*10)/10;
		if(_this.viewmode == "slide"){
			$(".editView").attr("kk_zoom",zoom_rate);
		}else if(_this.viewmode == "card"){
			$(".editView").attr("kk_zoom",zoom_rate);
		}else{
			$(".editView").attr("kk_zoom",zoom_rate);
		}
		if(_this.myScroll !== null) {
			_this.myScroll.zoom(_this.zoom);
		}
		$("#kkCurrentPageNumber").blur();
	},

	expired : function(){

		if(SettingsDef.lock.expired == "date"){
			var today = new Date();
			today = Date.parse(today);
			var end = Date.parse(window.atob(SettingsDef.lock.enddate));
			if(today > end){
				alert(window.atob("WW91ciBzdWJzY3JpcHRpb24gaGFzIGV4cGlyZWQu"));
			}
		}else if(SettingsDef.lock.expired == "domain"){
			var host = window.location.hostname;
			var domains = SettingsDef.lock.domain;
			var check = false;
			$.each(domains,function(i,v){
				if(host.indexOf(v) !== -1){
					check = true;
				}
			});
			if(!check){
				alert(window.atob("WW91ciBzdWJzY3JpcHRpb24gaGFzIGV4cGlyZWQu"));
			}

		}else if(SettingsDef.lock.expired == "datedomain"){
			var today = new Date();
			today = Date.parse(today);
			var end = Date.parse(window.atob(SettingsDef.lock.enddate));
			if(today > end){
				alert(window.atob("WW91ciBzdWJzY3JpcHRpb24gaGFzIGV4cGlyZWQu"));
			}
			var host = window.location.hostname;
			var domains = SettingsDef.lock.domain;

			var check = false;
			$.each(domains,function(i,v){
				if(host.indexOF(v) !== -1){
					check = true;
				}
			});

			if(!check){
				alert(window.atob("WW91ciBzdWJzY3JpcHRpb24gaGFzIGV4cGlyZWQu"));
			}

		}

	},

	makeKey : function() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

};

module.exports = Loader;
