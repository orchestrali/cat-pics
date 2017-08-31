const base = require('./db');
const request = require('request');
const EventEmitter = require('events');

/*
function addRecords(aTile, count, cb) {
  let tileType;
  if (aTile.workSub === 'sub') {
    tileType = "Submission";
  } else if (aTile.workSub === 'accept') {
    tileType = "Acceptance";
  } else if (aTile.workSub === 'work') {
    tileType = "Work";
  }

  let flickr_search = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + process.env.FLICKR_KEY + '&tags=kitten%2Ccute&tag_mode=all&extras=owner_name,license&license=4%2C5%2C7&format=json&nojsoncallback=1';
  request(flickr_search, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    let flickr_result = JSON.parse(body);
    //console.log(flickr_result.photos.photo[10]);
  
    let catsCreated = 0;
    const catCreatorLoopController = new EventEmitter();
    catCreatorLoopController.on('created', () => {
      catsCreated++;
      if (catsCreated >= count) {
        catCreatorLoopController.removeAllListeners();
        aTile.hascats = 'yes';
        cb();
      }
    });
    
    for (var i = 0; i < count; ++i) {
      var j = Math.ceil(Math.random() * flickr_result.photos.photo.length);
      var photo = flickr_result.photos.photo[j];
      var title;
      if (photo.title.length > 24) {
        title = photo.title.slice(0,21) + '...';
      } else {
        title = photo.title;
      }
      let catRecord = {
        "Credit": title + ' by ' + photo.ownername,
        "License": photo.license,
        "Link": "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_z.jpg",
        "Link2": "https://www.flickr.com/photos/" + photo.owner + "/" + photo.id,
        //"Works": [ work ],
        //"Submissions": [ sub ],
        "Type": tileType
      };
      if (aTile.workSub === 'sub' || aTile.workSub === 'accept') {
        catRecord.Submissions = [aTile.recordId];
      } else if (aTile.workSub === 'work') {
        catRecord.Works = [aTile.recordId];
      }
      base('Cats').create(catRecord, function(err, record) {
        if (err) { console.error(err); return; }
        console.log(record.getId());
        catCreatorLoopController.emit('created');
      });
    }
    
  });
};
*/
module.exports = function newAddRecords(aTile, count, cb) {
  let tileType;
  if (aTile.workSub === 'sub') {
    tileType = "Submission";
  } else if (aTile.workSub === 'accept') {
    tileType = "Acceptance";
  } else if (aTile.workSub === 'work') {
    tileType = "Work";
  }
  
  let CPaaSRequest = 'https://bow-elbow.glitch.me/cat/picture/service/?nogivemea=' + encodeURIComponent(require('../options.json')["animal to search for"]) + '&numCats=' + count;
  request(CPaaSRequest, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    let pics_result = JSON.parse(body);
    //console.log(flickr_result.photos.photo[10]);
  
    let catsCreated = 0;
    const catCreatorLoopController = new EventEmitter();
    catCreatorLoopController.on('created', () => {
      catsCreated++;
      if (catsCreated >= count) {
        catCreatorLoopController.removeAllListeners();
        aTile.hascats = 'yes';
        cb();
      }
    });
    
    for (var i = 0; i < count; ++i) {
      let catRecord = pics_result[i];
      catRecord.Type = tileType;
      
      if (aTile.workSub === 'sub' || aTile.workSub === 'accept') {
        catRecord.Submissions = [aTile.recordId];
      } else if (aTile.workSub === 'work') {
        catRecord.Works = [aTile.recordId];
      }
      base('Cats').create(catRecord, function(err, record) {
        if (err) { console.error(err); return; }
        console.log(record.getId());
        catCreatorLoopController.emit('created');
      });
    }
    
  });
};