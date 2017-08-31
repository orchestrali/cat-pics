
const base = require('./db.js');
const request = require('request');
const EventEmitter = require('events');
const setKittenCount = require('./setKittenCount');
const refreshAirtable = require('./refreshAirtable');

module.exports = function app(cb) {
  let allthetiles = [];
  let license_list = [];
  const controller = new EventEmitter();
  
  controller.on('request', () => {
    // Steps 1-4:
    getLicenseInfo((licenses) => {
      license_list = licenses;
      //console.log('license list!', license_list);
      controller.emit('setupStep', 1);
    });
    refreshAirtable.submissions(allthetiles, () => {
      controller.emit('setupStep', 2);
    });
    /*
    refreshAirtable.acceptances(allthetiles, () => {
      controller.emit('setupStep', 3);
    });
    refreshAirtable.works(allthetiles, () => {
      controller.emit('setupStep', 4);
    });
    */
  });
  let steps = 0;
  controller.on('setupStep', (stepNo) => {
    steps++;
    console.log('step', stepNo, 'done');
    if (steps >= 2) {
      controller.emit('setupDone');
    }
  });
  controller.on('setupDone', () => {
    sortTiles(allthetiles);
    //console.log('omg all the tiles sorted:', allthetiles);
    //console.log('setupDone, checking cats');
    setKittenCount(allthetiles, license_list, cb);
  });
  
  controller.emit('request');
};

function getLicenseInfo(cb) {
  var license_url = "https://bow-elbow.glitch.me/flickr/licenses/";
  var custom_shorts = {"No known copyright restrictions": "Flickr Commons"};
  request(license_url, function(err, status, data) {
    if (err) { console.log('error:', err); }// Print the error if one occurred
    cb(JSON.parse(data));
  });
}

// Sort tiles in allthetiles in reverse chronological order:
function sortTiles(allthetiles) {
  allthetiles.sort(function(a, b) {
    if (a.sortDate > b.sortDate) {
      return -1;
    } if (a.sortDate < b.sortDate) {
      return 1;
    }
    return 0;
  });
}


var subTileMock = {};

subTileMock.workSub = 'sub';
subTileMock.workTitle = 'Collapsing Test';
subTileMock.subDate = '4/21/17';
subTileMock.respDate = '';
subTileMock.sortDate = '2017-03-21';

var workTileMock = {};

workTileMock.workSub = 'work';
workTileMock.workTitle = 'Test Words';
workTileMock.finDate = '4/27/17';
workTileMock.workType = 'Story';
workTileMock.wordCount = '1000';
workTileMock.sortDate = '2017-03-21';



//console.log(buildTile(subTileMock));