const moment = require('moment');
const options = require('../options.json');
const addRecords = require('./addRecords');
const assignCats = require('./assignCats');
const deleteRecords = require('./deleteRecords');
const EventEmitter = require('events');

module.exports = function setKittenCount(allthetiles, license_list, cb) {
  const checkCatsController = new EventEmitter();
  let tilesProcessed = 0;
  checkCatsController.on('tileProcessed', () => {
    tilesProcessed++;
    if (tilesProcessed >= allthetiles.length) {
      assignCats(allthetiles, license_list, cb);
    }
  });
  
  for (var i = 0; i < allthetiles.length; ++i) {
    let tile = allthetiles[i];
    let kittencount = 1;
    if (tile.wordCount >= options["wordcount required for bonus animal"]) {
      kittencount++;
    }
    if (tile.workSub === 'sub') {
        let subcount = 1;
        let allworksubs = [];
        let subdate = tile.subDate;
        // Find all the submissions with the same work title and add them to allworksubs:
        for (let j = i + 1; j < allthetiles.length; ++j) {
          let tilej = allthetiles[j];
          if (tilej.workSub === 'sub' && tilej.workTitle === tile.workTitle) {
            subcount++;
            allworksubs.push(tilej);
          }
        }
        // If there are previous subs of the same work, calculate the difference between this one's submission date and the previous one's response date.
        if (allworksubs.length > 0) {
          let lastrespdate = allworksubs[0].respDate;
          if (moment(subdate).diff(moment(lastrespdate), 'days') <= options["resubmit within this many days for bonus animal"]) {
            kittencount++;
          }
        } else if (allworksubs.length === 0) {
          let findate;
          for (let j = i + 1; j < allthetiles.length; ++j) {
            let tilej = allthetiles[j];
            if (tilej.workSub === 'work' && tilej.workTitle === tile.workTitle) {
              findate = tilej.finDate;
            }
          }
          if (moment(subdate).diff(moment(findate), 'days') <= 7) {
            kittencount++;
          }
        }

        if (subcount >= 8) {
          kittencount++;
        }
      } else if (tile.workSub === 'accept') {
        kittencount += 2;
      } //finished setting kittencount
    console.log(tile.workSub + ' ' + tile.workTitle + ' ' + tile.sortDate + ' kittencount is:' + kittencount);
    if (tile.hascats === undefined) {
      addRecords(tile, kittencount, () => {
        checkCatsController.emit('tileProcessed');
      });
    } else if (tile.hascats.length === kittencount) {
      checkCatsController.emit('tileProcessed');
    } else if (tile.hascats.length < kittencount) {
      let count = kittencount - tile.hascats.length;
      addRecords(tile, count, () => {
        checkCatsController.emit('tileProcessed');
      })
    } else if (tile.hascats.length > kittencount) {
      let extra = tile.hascats.length - kittencount;
      console.log(tile.workSub + ' ' + tile.workTitle + ' ' + tile.sortDate + ' extra is:' + extra);
      deleteRecords(tile, extra, () => {
        checkCatsController.emit('tileProcessed');
      })
    }
  } 
  
      
  
}