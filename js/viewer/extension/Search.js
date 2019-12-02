function Search() {
    this.pdfDocument = null;
    this.pagesOverview = null;
    this.scratchCanvas = null;
    this.printContainer = null;
    this.progressbar = null;
    this.totalPage = 0;
    this.currentPage = -1;
    this.pstart = 0;
    this.pend = 0;
    this.count = -1;
    this.draw = false;
    this.active = true;
    this.activeService = false;
}

Search.prototype = {
	indexing : function(info, page){
		var _this = this;
		var doc_id  = SettingsDef.fileinfo.doc_id;
		var date = new Date();
		var timestamp = date.getTime();
		var maxPages = info._pdfInfo.numPages;

		if(page > maxPages){
			return;
		}else{
			info.getPage(page).then(function(pageInfo) {

				pageInfo.getTextContent().then(function(text){
					var tag = "";
					$.each(text.items,function(i,v){
						tag += v.str;
					});
					var next = page + 1;
					_this.indexing(info, next);
					_this.indexingDB(page,tag);
				});
			});
		}
	},

	indexingDB : function(page,tag){
		var _this = this;
		var doc_id  = SettingsDef.fileinfo.doc_id;
		var date = new Date();
		var timestamp = date.getTime();
		if(SettingsDef.loading.opendb){
			_this.db.transaction(function (tx) { 
				var sql = 'SELECT * FROM fulltext WHERE doc_id = "'+doc_id+'" AND page = "'+page+'"';
				tx.executeSql(sql, [], function (tx, results) {
					var len = results.rows.length;
					if(len > 0){
					}else{
						var sql = 'INSERT INTO fulltext (doc_id, page, content, summary, adddate) VALUES ("'+doc_id+'","'+page+'", "'+tag+'", "", "'+timestamp+'")';
						tx.executeSql(sql); 
					}
				});
			});
		}
	},

	searchText4 : function(){
		var _this = this;
		_this.pdfDocument[_this.currentFile].then(function (info) {
			$("#lSideView .lSearchViewWrap .searchLoading").addClass("on").removeClass("off");
			$("#lSideView .lSearchViewWrap .lSearchViewWrapSCroll").html("");
			console.log(info);
					

			//var text = _this.getPdfTotext(info);
			//console.log(text);



		});
	},

	searchPosition : function(info,page){

		var _this = this;
		if(page == 1){
			_this.searchfull = [];
		}

		var keyword = $(".searchbar").find("input.searchtext").val();
		if($.trim(keyword).length  > 0){
			if(typeof(info) !== "undefined"){
				var maxPages = info._pdfInfo.numPages;
				var countPromises = []; // collecting all page promises
				if(page > maxPages){
					return;
				}else{

					info.getPage(page).then(function(pageInfo) { // add page promise
						var search = 0;
						pageInfo.getTextContent().then(function(text){ // return content promise

							var viewport = pageInfo.getViewport(_this.ratio);
							var pageSize = _this.getPageSize(viewport);
							var view = pageInfo.view;
							
							$.each(text.items,function(i,v){
								
								var s = v.str.indexOf(keyword);
								var rect = this.transform;
								if(s >0){
									_this.searchfull.push({
										"page" : pageInfo.pageIndex+1,
										"z" : pageSize.mobileZoom,
										"w" : v.width,
										"h" : (rect[3] - rect[1]),
										"t" : (v.transform[5] - view[0]),
										"l" : (v.transform[4] - view[1]),
										"text" : v.str
									});
								}
							});

							

							var total = _this.searchfull.length;
							var current = _this.searchCurrent + 1;
							if(total > 0){
								$(".searchbar .searchinfo").show().html(current+" / "+total);
							}												
							var next = page + 1;
							_this.searchPosition(info,next);
						});
					});
				}
			}
		}else{
			
		}

	},

	searchPositionPrev : function(){
		var _this = this;
		var prev = _this.searchCurrent-1;
		var item = _this.searchfull[prev];
		if(typeof(item) !== "undefined"){
			_this.searchCurrent = prev;
			var total = _this.searchfull.length;
			var current = _this.searchCurrent + 1;				
			if(typeof(item.page) !== "undefined"){	
				$(".searchbar .searchinfo").show().html(current+" / "+total);
				_this.slideTo(item.page,function(){
					$("#document_view div[slide='"+item.page+"'] .pageWrap").append('<div class="marker" style="bottom:'+(item.t*item.z)+'px;left:'+(item.l*item.z)+'px;width:'+(item.w)+'px;height:'+(item.h)+'px;"></div>');
				});
			}
		}else{
			//$(".searchbar a.btn[mode='presearch']").addClass("disable");
		}
	},

	searchPositionNext : function(){
		var _this = this;
		var next = _this.searchCurrent+1;
		var item = _this.searchfull[next];
		if(typeof(item) !== "undefined"){
			_this.searchCurrent = next;
			var total = _this.searchfull.length;
			var current = _this.searchCurrent + 1;
			
			if(typeof(item.page) !== "undefined"){	
				$(".searchbar .searchinfo").show().html(current+" / "+total);
				_this.slideTo(item.page,function(){
					$("#document_view div[slide='"+item.page+"'] .pageWrap").append('<div class="marker" style="bottom:'+(item.t*item.z)+'px;left:'+(item.l*item.z)+'px;width:'+(item.w)+'px;height:'+(item.h)+'px;"></div>');
				});
			}
		}else{
			//$(".searchbar a.btn[mode='nextsearch']").addClass("disable");
		}
		return false;
	},

};

module.exports = Search;