'use strict';
const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

var cmd ='minify -o '+path.join(__dirname, '_dist/bundle/css/viewer_min.css')+' '+path.join(__dirname, 'www/css/viewer.css');
execSync(cmd);
console.log('viewer_min.css was copied to viewer_min.css');


exec('uglifyjs -mt -c -o '+path.join(__dirname, '_dist/bundle/js/kukuviewer.bundle.min.js')+' '+path.join(__dirname, 'www/js/viewer.bundle.js'), {timeout: 0},function(error, stdout, stderr) {
    if (error){ throw console.trace(error); }
    console.log(stdout);
    console.log('kukuviewer.bundle.min.js was copied to kukuviewer.bundle.min.js');
});