const base = require('./db');
const EventEmitter = require('events');
const buildPage = require('./buildPage');

module.exports = function assignCats(allthetiles, license_list, cb) {
  console.log(allthetiles.length)
  const assignController = new EventEmitter();
  let tilesProcessed = 0;
  assignController.on('tileProcessed', () => {
    tilesProcessed++;
    if (tilesProcessed >= allthetiles.length) {
      //console.log('all the processed tiles:', allthetiles);
      buildPage(allthetiles, license_list, cb);
    }
  });
  
  for (var i = 0; i < allthetiles.length; ++i) {
    let tile = allthetiles[i];
    //console.log('assigning cats to ' + tile.workSub + ' ' + tile.workTitle)
    tile.cats = [];
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
        fields: ['Link', 'Link2', 'Credit', 'License']
      }).firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function(record) {
        tile.cats.push({
          link: record.get('Link'),
          link2: record.get('Link2'),
          credit: record.get('Credit'),
          license: record.get('License'),
        });
        //console.log('Retrieved', record.get('Credit'));
        });
      assignController.emit('tileProcessed');
      }); 
    } 
}