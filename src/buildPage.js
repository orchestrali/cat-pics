const buildTile = require('./buildTile');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

function getFile(path, cb) {
  fs.readFile(path, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
      cb(data);
    } else {
        console.log(err);
    }
  });
}

module.exports = function buildPage(allthetiles, license_list, cb) {
  let body = '', header, footer;
  const buildController = new EventEmitter();
  let filesGotten = 0;
  buildController.on('gottenFile', () => {
    filesGotten++;
    if (filesGotten >= 2) {
      cb(header + body + footer);
    }
  });
  for (var i = 0; i < allthetiles.length; ++i) {
    body += buildTile(allthetiles[i], license_list);
  }
  let headPath = path.join(__dirname, '/../views/header.html');
  let footPath = path.join(__dirname, '/../views/footer.html');

  getFile(headPath, (data) => {
    header = data;
    buildController.emit('gottenFile');
  });
  getFile(footPath, (data) => {
    footer = data;
    buildController.emit('gottenFile');
  });
};