const moment = require('moment');


module.exports = function buildTile(tileObject, license_list) {
  var numCats = tileObject.cats.length;
  var aTile = `<div class="tile">
            <div class="kitten-container of` + tileObject.cats.length + `">` +
      function() {
        var kitContain = '';
        for (var i = 0; i < tileObject.cats.length; ++i) {
          var license = license_list[tileObject.cats[i].license];
          //console.log(license);
          var attrib = "(<a href=\"" + license.url + "\" target=\"_blank\">" + license.shortname + "</a>)";
          //console.log(attrib);
          var nof = 'n' + (i+1) + ' of' + numCats;
          kitContain += `
              <div class="trigger ` + nof + `">
                <div class="indicator">
                </div>
              </div>
              <div class="wrapper ` + nof + `">
                <img src="` + tileObject.cats[i].link + `" alt="` + tileObject.cats[i].credit + `" />
                <div class="kittencredit">
                  <p><a href="` + tileObject.cats[i].link2 + `" target="_blank">` + tileObject.cats[i].credit + `</a> ${attrib}</p>
                </div>
              </div>`
        }
        return kitContain;
      }() + 
            `
            </div>
            <div class="info">
              <p>This card is a reward for ` + 
      function() {
        if (tileObject.workSub === 'work') {
          return 'finishing';
        } else if (tileObject.workSub === 'sub') {
          return 'submitting';
        } else if (tileObject.workSub === 'accept'){
          return 'acceptance of';
        }
      }() +
              `</p>
              <h3 class="name">`
                + tileObject.workTitle +
              `</h3>
              <p class="date">`
                + moment(tileObject.sortDate).format('MMM D, YYYY') +
              `</p>
            </div>
          </div>
          `;
  return aTile;
}