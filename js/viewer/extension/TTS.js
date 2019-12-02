function TTS() {
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

TTS.prototype = {

};

module.exports = TTS;