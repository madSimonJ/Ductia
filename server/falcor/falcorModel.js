var falcor = require('falcor');
var examRepository = require('../repositories/examRepository')

exports.GetModel = function() {

  var model = new falcor.Model({
    cache: {
      examBoards:{
        "abrsm": {
            instruments:{
              "flute": {
                grades: {
                  "1": {
                    books:{
                      "1" : {coverage: 5, title:{$type: "ref", value:["books", "9780193376854"]}},
                      "2" : {coverage: 1, title:{$type: "ref", value:["books", "9781844179053"]}},
                    }
                  },
                  "3": {
                    books:{
                      "1" : {coverage: 7, title:{$type: "ref", value:["books", "9780193376854"]}},
                    }
                  }
                }
              },
              "cello": {
                grades: {
                  "5": {
                    books:{
                      "1" : {coverage: 8, title:{$type: "ref", value:["books", "9781844179053"]}},
                    }
                  }
                }
              }
            }
          }
      },



      bookCoverageByExamDesc:{
        examBoards:{
          "abrsm": {
            instruments:{
              "flute":{
                books:{
                  "1": {
                    title: {$type: "ref", value:["books", "9780193376854"]},
                    total: 11,
                    grades: {
                      "1" : 0,
                      "2" : 9,
                      "3" : 1,
                      "4" : 1
                    }
                  },
                  "2": {
                    title: {$type: "ref", value:["books", "9781844179053"]},
                    total: 9,
                    grades: {
                      "1" : 1,
                      "2" : 1,
                      "3" : 5,
                      "4" : 2
                    }

                  }
                }
              }
            }
          }
        }
      },






      exams: {
        "exam-flute-2014-grade1": {
          instrument: 'flute',
          grade: 1,
          dateValidFrom: 2014,
          dateValidTo: 2017,
          examBoard: 'abrsm',
          lists: {
            "A": {
              "1" : {$type: "ref", value:["pieces", "piece1"]},
              "2" : {$type: "ref", value:["pieces", "piece2"]},
              "3" : {$type: "ref", value:["pieces", "piece3"]},
              "9" : {$type: "ref", value:["pieces", "piece15"]},
            }
          }
        }
      },
      pieces: {
        "piece1": {
          composer: "Hook",
          title: "Minuetto: 2nd movt from Sonata in Eb, Op. 99 No. 3, arr. Wastall"
        },
        "piece2": {
          composer: "Purcell",
          title: "Rigaudon, Z. 653, arr. Stuart"
        },
        "piece3": {
          composer: "Trad. Irish",
          title: "The Rakes o’ Mallow, arr. Denley"
        },
        "piece4": {
          composer: "Keith Amos",
          title: "Lupin, the Pot-Bellied Pig: No. 9"
        },
        "piece5": {
          composer: "Ros Stephen",
          title: "Guanabara Bay"
        },
        "piece15": {
          composer: 'Trad. Welsh',
          title: 'The Ash Grove'
        },
        "piece16": {
          composer: 'Heather Hammond',
          title: 'Funk Factory'
        }
      },
      books: {
        "9780193376854": {
          title: "Flute Globetrotters",
          isbn10: "0193376857",
          isbn13: "9780193376854",
          publisher: "OUP Oxford",
          publicationDate: 2011,
          piecesInBook: {
            "1" : {$type: "ref", value:["pieces", "piece5"]}
          }
        },
        "9781844179053": {
          title: 'Funky Flute Repertoire, Book 2',
          isbn10: '1844179052',
          isbn13: '9781844179053',
          publisher: 'Kevin Mayhew Ltd',
          publicationDate: 2005,
          piecesInBook: {
            "1" : {$type: "ref", value:["pieces", "piece15"]},
            "2" : {$type: "ref", value:["pieces", "piece16"]}
          }
        }
      }


    }
  });

  return model;
};
