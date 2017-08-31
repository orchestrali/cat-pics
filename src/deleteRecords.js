const base = require('./db');
const request = require('request');
const EventEmitter = require('events');

module.exports = function removeCats(tile, extra, cb) {
  let catIDs = [];
  const catRetriever = new EventEmitter();
  let catsGotten = 0;
  catRetriever.on('catRetrieved', () => {
    catsGotten++;
    if (catsGotten >= extra) {
      catRetriever.emit('retrieveDone');
    }
  });
  catRetriever.on('retrieveDone', () => {
    destroy();
  })
  
  const catDeleteController = new EventEmitter();
  let catsDeleted = 0;
  catDeleteController.on('catDeleted', () => {
    catsDeleted++;
    if (catsDeleted >= extra) {
      cb();
    }
  })
  
  for (var i = 0; i < extra; ++i) {
    let formula;
    if (tile.workSub === 'sub') {
      formula = "AND(SubIDs = '" + tile.recordId + "', Type = 'Submission')";
    } else if (tile.workSub === 'accept') {
      formula = "AND(SubIDs = '" + tile.recordId + "', Type = 'Acceptance')";
    } else if (tile.workSub === 'work') {
      formula = "WorkIDs = '" + tile.recordId + "'";
    }
    base('Cats').select({
        filterByFormula: formula,
        fields: ['Num' ],
        maxRecords: extra,
        sort: [{field: "Num", direction: "desc"}]
      }).firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function(record) {
        catIDs.push({
          catNum: record.get('Num'),
          catID: record.id
        });
        //console.log('Retrieved', record.get('Credit'));
        });
      catRetriever.emit('catRetrieved');
      }); 
    }
  function destroy() {
    for (var i = 0; i < catIDs.length; ++i) {
      base('Cats').destroy(catIDs[i].catID, function(err, deletedRecord) {
        if (err) { console.error(err); return; }
        console.log('Deleted record', deletedRecord.id);
        console.log('cat for ' + tile.workSub + ' ' + tile.workTitle + ' ' + tile.sortDate + ' deleted');

        catDeleteController.emit('catDeleted');
      });
    }
  }
  
}