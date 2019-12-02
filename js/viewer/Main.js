window.prefix = 'kukudocs';
require('jquery-ui');
var Loader = require("./Loader");
var SettingsDef = require("./SettingsDef");

function Main(Settings){
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var doc_id = getParameterByName('doc_id');
    var title = getParameterByName('title');
    var filepath = getParameterByName('filepath');
    var ver = getParameterByName('ver');
    var modifydate = getParameterByName('modifydate');
    var watermark = getParameterByName('watermark');
    var ratio_page  = getParameterByName('ratio_page');
    var category = getParameterByName('category');
    var pass = getParameterByName('pass');
    
    var mode = getParameterByName('mode');

    if(ratio_page !== ""){ Settings.fileinfo.ratio_page = ratio_page; }
    if(category !== ""){ Settings.fileinfo.category = category; }
    if(doc_id !== ""){ Settings.fileinfo.doc_id = doc_id; }
    if(filepath !== ""){ Settings.fileinfo.filepath = filepath; }
    if(title !== ""){ Settings.fileinfo.title = title; }
    if(ver !== ""){ Settings.fileinfo.ver = ver; }
    if(modifydate !== ""){ Settings.fileinfo.modifydate = modifydate; }
    if(watermark !== ""){ Settings.fileinfo.watermark = watermark; }
    if(mode !== ""){ Settings.mode = mode; }

    
    $(document).ready(function() {
        $.extend(true, SettingsDef, Settings);
        var loader = new Loader();
        loader.init(SettingsDef);
    });
}

module.exports = window.kukuViewer = Main;