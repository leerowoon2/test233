



    var BookmarkDialog = function(){

        this.wrap = $("#kk_dialog");
        this.wrapHtml =
            '<div id="bookmarkDialog" autocomplete="off">' +
                '<textarea name="bookmarktitle"></textarea>' + 
            '</div>';
        this.close = function(options){
            this.wrap.dialog('close');
        };

        this.open = function(db,doc_id){
            var _this = this;

			_this.wrap.dialog({
                title: "Bookmark",
                width:300,
                height:"auto",
                autoOpen:false,
                
                position: { my: "center top", at: "center top", of: window },
                draggable:true,
                modal: true,
                resizable:true,
                open: function(event, ui) {
                    _this.wrap.html(_this.wrapHtml);
                    _this.wrap.find("textarea").focus();
                },
                close : function(event, ui) {

                },
                buttons: {
                    "추가": function() {
                        var page = Number($(".swiper-slide-active").attr("index")) + 1;
                        var date = new Date();
                        var timestamp = date.getTime();
                        var title = _this.wrap.find("textarea").val();
                        db.transaction(function (tx) { 
                            var sql = 'INSERT INTO bookmark (mode, doc_id, page, position, title, summary, adddate) VALUES ("bookmark","'+doc_id+'","'+page+'", "", "'+title+'", "", "'+timestamp+'")';
                            tx.executeSql(sql); 
                        });


                        /*
                        var bmk = localStorage.getItem("bmk_"+doc_id+"-"+page);
                        if(bmk != null){
                            $(".swiper-slide-active .pageWrap .bmk").remove();	
                            localStorage.removeItem("bmk_"+doc_id+"-"+page);
                        }else{
                            localStorage.setItem("bmk_"+doc_id+"-"+page,{
                                "doc_id" : doc_id,
                                "page" : page,
                                "title" : "page "+page
                            });
                            $(".swiper-slide-active .pageWrap").append('<div class="bmk"><i class="kk-icon-turned_in"></i></div>');
                        }
                        */
                        $( this ).dialog( "close" );
                    },

                    "닫기": function() {
                        $( this ).dialog( "close" );
                    }
                }
            });


            _this.wrap.dialog('open');

        };

        this.insert = function(){
            var doc_id;
            var title;
            var page;


        };


    };

    module.exports = BookmarkDialog;