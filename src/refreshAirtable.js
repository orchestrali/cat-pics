const base = require('./db');
const EventEmitter = require('events');

const templates = [
  {
    base: 'Submissions',
    formula: "NOT({Name*} = '')",
    fields: ['Title*', 'Wordcount*', 'Date submitted*', 'Date of response*', 'Sub cats*'],
    workSub: 'sub',
    setFields: {
      workTitle: 'Title*',
      wordCount: 'Wordcount*',
      subDate: 'Date submitted*',
      respDate: 'Date of response*',
      sortDate: 'Date submitted*',
      hascats: 'Sub cats*',
    },
  },
  {
    base: 'Submissions',
    formula: '{Accepted*} = 1',
    fields: ['Title*', 'Wordcount*', 'Date of response*', 'Accept cats*'],
    workSub: 'accept',
    setFields: {
      workTitle: 'Title*',
      wordCount: 'Wordcount*',
      sortDate: 'Date of response*',
      hascats: 'Accept cats*',
    },
  },
  {
    base: 'Works',
    formula: "NOT({Title*} = '')",
    fields: ['Title*', 'Date finished*', 'Wordcountnum*', 'Cats*'],
    workSub: 'work',
    setFields: {
      workTitle: 'Title*',
      finDate: 'Date finished*',
      wordCount: 'Wordcountnum*',
      sortDate: 'Date finished*',
      hascats: 'Cats*',
    },
  }
];

exports.submissions = function experiment(allthetiles, cb) {
  //console.log(templates);
  const retrieveController = new EventEmitter();
  let typesRetrieved = 0;
  retrieveController.on('typeRetrieved', () => {
    typesRetrieved++;
    if (typesRetrieved >= templates.length) {
      cb();
    }
  })
  
  for (var i = 0; i < templates.length; ++i) {
    let temp = templates[i];
    console.log(temp.workSub);
    base(temp.base).select({
      filterByFormula: temp.formula,
      fields: temp.fields
    }).eachPage(function page(records, fetchNextPage) {
      
      records.forEach(function(record) {
        var submission = {};
        
        for (var key in temp.setFields) {
          //console.log(key);
          //console.log(temp.setFields[key]);
          submission[key] = record.get(temp.setFields[key]);
          //console.log(submission);
        }
        submission.workSub = temp.workSub;
        submission.recordId = record.id;
        //console.log(submission);
        allthetiles.push(submission);
      });
      
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
      console.log('added ' + temp.workSub + ' to allthetiles');
      retrieveController.emit('typeRetrieved');
    });
  };
}

/*  
exports.submissions = function(allthetiles, cb) {
  //selecting submissions
  base('Submissions').select({
      // Selecting all non-empty records:
      filterByFormula: "NOT({Name} = '')",
      fields: ['Title', 'Wordcount', 'Date submitted', 'Date of response', 'Cats']
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function(record) {
          var submission = {
            workSub: 'sub',
            workTitle: record.get('Title'),
            wordCount: record.get('Wordcount'),
            subDate: record.get('Date submitted'),
            respDate: record.get('Date of response'),
            sortDate: record.get('Date submitted'),
            hascats: record.get('Cats'),
            recordId: record.id,
          }

          allthetiles.push(submission);
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      //console.log(allthetiles);
      cb();
  });
}

exports.acceptances = function(allthetiles, cb) {
  //selecting acceptances
  base('Submissions').select({
      // Selecting records where "accepted" is checked:
      filterByFormula: "{Accepted} = 1",
      fields: ['Title', 'Wordcount', 'Date of response', 'Cats']
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function(record) {
        //console.log(record.fields);
          var acceptance = {
            workSub: 'accept',
            workTitle: record.get('Title'),
            wordCount: record.get('Wordcount'),
            sortDate: record.get('Date of response'),
            hascats: record.get('Cats'),
            recordId: record.id,
          }
          allthetiles.push(acceptance);
      });

      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      //console.log(allthetiles);
      cb();
  });  
};

exports.works = function(allthetiles, cb) {
  //selecting works
  base('Works').select({
      // Selecting all non-empty records:
      filterByFormula: "NOT({Title} = '')",
      fields: ['Title', 'Date finished', 'Type', 'Wordcountnum', 'Cats']
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function(record) {
          var work = {
            workSub: 'work',
            workTitle: record.get('Title'),
            finDate: record.get('Date finished'),
            workType: record.get('Type'),
            wordCount: record.get('Wordcountnum'),
            sortDate: record.get('Date finished'),
            hascats: record.get('Cats'),
            recordId: record.id,
          }

          allthetiles.push(work);

      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      //console.log(allthetiles);
      cb();
  });
};
*/