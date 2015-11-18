var exams = [{
  _id: "exam-flute-2014-grade1",
  instrument: "Flute",
  grade: 1,
  dateValidFrom: 2014,
  dateValidTo: 2017,
  examBoard: "abrsm",
  lists: {
    A: ["piece1", "piece2", "piece3", "piece10", "piece11", "piece12", "piece13", "piece14", "piece15"],
    B: ["piece1", "piece2", "piece3", "piece16", "piece17", "piece18", "piece19", "piece20", "piece21"],
    C: ["piece4", "piece5", "piece6", "piece22", "piece23", "piece24", "piece25", "piece26", "piece27", "piece28", "piece29", "piece30"]
  }
}, {
  _id: "exam-descantrecorder-2014-grade1",
  instrument: "Descant-Recorder",
  grade: 1,
  dateValidFrom: 2014,
  dateValidTo: 2017,
  examBoard: "abrsm",
  lists: {
    A: ["piece31", "piece32", "piece33", "piece34", "piece35", "piece36", "piece37", "piece38", "piece39", "piece40"],
    B: ["piece41", "piece42", "piece43", "piece44", "piece45", "piece46", "piece47", "piece48", "piece49", "piece50", "piece51", "piece52", "piece53"],
    C: ["piece54", "piece55", "piece56", "piece57", "piece58", "piece59", "piece60", "piece61"]
  }
}];

var books = [{
  _id: "9781848494923",
  title: "Flute Exam Pieces, Grade 1 (2014-2017)",
  isbn10: "1848494920",
  isbn13: "9781848494923",
  publisher: "Associated Board of the Royal Schools of Music, United Kingdom",
  publicationDate: 2013,
  piecesInBook: [{
    number: 1,
    piece_id: "piece1"
  }, {
    number: 2,
    piece_id: "piece2"
  }, {
    number: 3,
    piece_id: "piece3"
  }, {
    number: 4,
    piece_id: "piece4"
  }, {
    number: 5,
    piece_id: "piece5"
  }, {
    number: 6,
    piece_id: "piece6"
  }, {
    number: 7,
    piece_id: "piece7"
  }, {
    number: 8,
    piece_id: "piece8"
  }, {
    number: 9,
    piece_id: "piece9"
  }]
}, {
  _id: "9780193571815",
  title: "Music Through Time for Flute, Book 1",
  isbn10: "0193571811",
  isbn13: "9780193571815",
  publisher: "OUP - Oxford University Press",
  publicationDate: 1992,
  piecesInBook: [{
    number: 1,
    piece_id: "piece10"
  }, {
    number: 2,
    piece_id: "piece21"
  }]
}, {
  _id: "9790220906466",
  title: "Harlequin, Book 1",
  isbn13: "9790220906466",
  publisher: "Cramer Music",
  publicationDate: 2004,
  piecesInBook: [{
    number: 1,
    piece_id: "piece11"
  }, {
    number: 2,
    piece_id: "piece18"
  }]
}, {
  _id: "9781848492783",
  title: "Time Pieces for Flute, Volume 1",
  isbn10: "1848492782",
  isbn13: "9781848492783",
  publisher: "OUP Oxford",
  publicationDate: 1992,
  piecesInBook: [{
    number: 1,
    piece_id: "piece12"
  }]
}, {
  _id: "9790570278480",
  title: "Winner Scores All for Flute",
  isbn13: "9790570278480",
  publisher: "Brasswind Publications",
  publicationDate: 2012,
  piecesInBook: [{
    number: 1,
    piece_id: "piece13"
  }, {
    number: 2,
    piece_id: "piece20"
  }]
}, {
  _id: "9781848671560",
  title: "One More Time! for Flute",
  isbn10: "1848671563",
  isbn13: "9781848671560",
  publisher: "Kevin Mayhew Ltd",
  publicationDate: 2009,
  piecesInBook: [{
    number: 1,
    piece_id: "piece14"
  }]
}, {
  _id: "9781844179053",
  title: "Funky Flute Repertoire, Book 2",
  isbn10: "1844179052",
  isbn13: "9781844179053",
  publisher: "Kevin Mayhew Ltd",
  publicationDate: 2005,
  piecesInBook: [{
    number: 1,
    piece_id: "piece15"
  }, {
    number: 2,
    piece_id: "piece16"
  }]
}, {
  _id: "9780193376854",
  title: "Flute Globetrotters",
  isbn10: "0193376857",
  isbn13: "9780193376854",
  publisher: "OUP Oxford",
  publicationDate: 2011,
  piecesInBook: [{
    number: 1,
    piece_id: "piece5"
  }]
}, {
  _id: "9790570242719",
  title: "Fun Club for Flute, Grade 1–2",
  isbn13: "9790570242719",
  publisher: "Kevin Mayhew",
  publicationDate: 2003,
  piecesInBook: [{
    number: 1,
    piece_id: "piece17"
  }]
}, {
  _id: "9790041331720",
  title: "18 composizioni facili e progressive",
  isbn13: "9790041331720",
  publisher: "G. Ricordi & C. Editori ",
  publicationDate: 1900,
  piecesInBook: [{
    number: 1,
    piece_id: "piece19"
  }]
}, {
  _id: "9781854728661",
  title: "Fifty for Flute, Book 1",
  isbn10: "1854728660",
  isbn13: "9781854728661",
  publisher: "OUP Oxford",
  publicationDate: 1996,
  piecesInBook: [{
    number: 4,
    piece_id: "piece22"
  }, {
    number: 7,
    piece_id: "piece23"
  }]
}, {
  _id: "9780571514304",
  title: "76 Graded Studies for Flute",
  isbn10: "0571514308",
  isbn13: "9780571514304",
  publisher: "Faber Music Lt",
  publicationDate: 1994,
  piecesInBook: [{
    number: 4,
    piece_id: "piece24"
  }, {
    number: 5,
    piece_id: "piece25"
  }, {
    number: 7,
    piece_id: "piece26"
  }]
}, {
  _id: "9790708010548",
  title: "The Modern Flute Player",
  isbn13: "9790708010548",
  publisher: "Itchy Fingers Publications",
  piecesInBook: [{
    number: 1,
    piece_id: "piece27"
  }, {
    number: 2,
    piece_id: "piece28"
  }]
}, {
  _id: "B009VUGCGG",
  title: "Skilful Studies for Flute",
  isbn13: "B009VUGCGG",
  publisher: "Anglo Music Press",
  publicationDate: 2004,
  piecesInBook: [{
    number: 3,
    piece_id: "piece29"
  },{
    number: 14,
    piece_id: "piece30"
  }]
}, {
  _id: "9790200620764",
  title: "Spielbuch for Descant Recorder",
  isbn13: "9790200620764",
  publisher: "Edition Moeck",
  publicationDate: 1975,
  piecesInBook: [{
    number: 1,
    piece_id: "piece31"
  }, {
    number: 2,
    piece_id: "piece32"
  }, {
    number: 3,
    piece_id: "piece33"
  }]
}, {
  _id: "9781847610805",
  title: "Baroque Recorder Anthology, Vol. 1 (Soprano)",
  isbn10: "1847610803",
  isbn13: "9781847610805",
  publisher: "Schott; Pap/Com Mu edition",
  publicationDate: 2010,
  piecesInBook: [{
    number: 1,
    piece_id: "piece34"
  }, {
    number: 2,
    piece_id: "piece35"
  }]
}, {
  _id: "9780571523283",
  title: "First Repertoire for Descant Recorder, arr. Adams",
  isbn10: "0571523285",
  isbn13: "9780571523283",
  publisher: "Alfred Music",
  publicationDate: 1988,
  piecesInBook: [{
    number: 1,
    piece_id: "piece40"
  }, {
    number: 2,
    piece_id: "piece45"
  }]
}, {
  _id: "9781860962929",
  title: "Time Pieces for Descant/Soprano Recorder, Vol. 1",
  isbn10: "1860962920",
  isbn13: "9781860962929",
  publisher: "Associated Board of the Royal Schools of Music",
  publicationDate: 2007,
  piecesInBook: [{
    number: 1,
    piece_id: "piece36"
  }, {
    number: 2,
    piece_id: "piece37"
  }, {
    number: 3,
    piece_id: "piece50"
  }, {
    number: 4,
    piece_id: "piece54"
  }]
}, {
  _id: "9790570248261",
  title: "Don't You Just Love These Tunes for Descant Recorder",
  isbn13: "9790570248261",
  publisher: "Kevin Mayhew",
  publicationDate: 2013,
  piecesInBook: [{
    number: 1,
    piece_id: "piece38"
  }, {
    number: 2,
    piece_id: "piece39"
  }, {
    number: 3,
    piece_id: "piece43"
  }]
}, {
  _id: "9780571510375",
  title: "The Really Easy Recorder Book",
  isbn10: "057151037X",
  isbn13: "9780571510375",
  publisher: "Faber Music Ltd",
  publicationDate: 1985,
  piecesInBook: [{
    number: 1,
    piece_id: "piece41"
  }, {
    number: 1,
    piece_id: "piece42"
  }]
}, {
  _id: "9790570276240",
  title: "Winner Scores All for Descant Recorder",
  isbn10: "0570276241",
  isbn13: "9790570276240",
  publisher: "Brass Wind Publications",
  publicationDate: 2013,
  piecesInBook: [{
    number: 1,
    piece_id: "piece44"
  }, {
    number: 2,
    piece_id: "piece46"
  }, {
    number: 3,
    piece_id: "piece61"
  }]
}, {
  _id: "9781848670594",
  title: "Fun Club for Descant Recorder, Grade 0–1",
  isbn13: "9781848670594",
  publisher: "Brass Wind Publications",
  publicationDate: 2013,
  piecesInBook: [{
    number: 1,
    piece_id: "piece46"
  }, {
    number: 2,
    piece_id: "piece47"
  }]
}, {
  _id: "9781854725417",
  title: "A Day in the Country for Descant Recorder",
  isbn13: "9781854725417",
  publisher: "ABRSM Publishing",
  publicationDate: 1990,
  piecesInBook: [{
    number: 1,
    piece_id: "piece48"
  }, {
    number: 2,
    piece_id: "piece49"
  }]
}, {
  _id: "9790570244669",
  title: "Fresh Air for Descant Recorder",
  isbn13: "9790570244669",
  publisher: "KM Publishing",
  publicationDate: 1900,
  piecesInBook: [{
    number: 1,
    piece_id: "piece51"
  }, {
    number: 2,
    piece_id: "piece62"
  }]
}, {
  _id: "9780571524082",
  title: "Really Easy Jazzin’ About for Descant Recorder",
  isbn13: "9780571524082",
  publisher: "Faber Music",
  publicationDate: 2005,
  piecesInBook: [{
    number: 1,
    piece_id: "piece52"
  },{
    number: 2,
    piece_id: "piece53"
  }]
}, {
  _id: "9990050797153",
  title: "van Eyck Der Fluyten Lust-hof: The Beginners’ Collection",
  isbn13: "9990050797153",
  publisher: "XYZ",
  publicationDate: 1900,
  piecesInBook: [{
    number: 3,
    piece_id: "piece55"
  }, {
    number: 9,
    piece_id: "piece56"
  }]
}, {
  _id: "9780571523184",
  title: "50 Graded Studies for Recorder",
  isbn10: "0571523188",
  isbn13: "9780571523184",
  publisher: "Faber Music Ltd.",
  publicationDate: 1988,
  piecesInBook: [{
    number: 4,
    piece_id: "piece58"
  }, {
    number: 1,
    piece_id: "piece59"
  }]
}, {
  _id: "9790220114588",
  title: "50 for Fun, arr. Bonsor",
  isbn13: "9790220114588",
  publisher: "Scott Ed",
  publicationDate: 1988,
  piecesInBook: [{
    number: 31,
    piece_id: "piece60"
  }]
}];

var pieces = [{
  _id: "piece1",
  composer: "Hook",
  title: "Minuetto: 2nd movt from Sonata in Eb, Op. 99 No. 3, arr. Wastall",
}, {
  _id: "piece2",
  composer: "Purcell",
  title: "Rigaudon, Z. 653, arr. Stuart"
}, {
  _id: "piece3",
  composer: "Trad. Irish",
  title: "The Rakes o’ Mallow, arr. Denley"
}, {
  _id: "piece4",
  composer: "Keith Amos",
  title: "Lupin, the Pot-Bellied Pig: No. 9"
}, {
  _id: "piece5",
  composer: "Ros Stephen",
  title: "Guanabara Bay"
}, {
  _id: "piece6",
  composer: "Rogers & Hammerstein",
  title: "Edelweiss"
}, {
  _id: "piece7",
  composer: "Nikki Iles",
  title: "Jazz Waltz"
}, {
  _id: "piece8",
  composer: "E. Köhler",
  title: "Exercise in G"
}, {
  _id: "piece9",
  composer: "Oliver Ledbury",
  title: "Itchy Feet (arpeggio in final bar optional)"
}, {
  _id: "piece10",
  composer: "A. M. Bononcini",
  title: "Bella Vittoria"
}, {
  _id: "piece11",
  composer: "Daquin ",
  title: "Noël"
}, {
  _id: "piece12",
  composer: "Schubert",
  title: "Waltz No. 16"
}, {
  _id: "piece13",
  composer: "Sholom Secunda",
  title: "Donna Donna (observing repeat)"
}, {
  _id: "piece14",
  composer: "Trad. English",
  title: "Blow the Wind Southerly"
}, {
  _id: "piece15",
  composer: "Trad. Welsh",
  title: "The Ash Grove"
}, {
  _id: "piece16",
  composer: "Heather Hammond",
  title: "Funk Factory"
}, {
  _id: "piece17",
  composer: "Alan Haughton",
  title: "Partying"
}, {
  _id: "piece18",
  composer: "Cecilia McDowall",
  title: "Moulin Rose"
}, {
  _id: "piece19",
  composer: "Aldo Rossi",
  title: "Un dolce sogno (A Sweet Dream)"
}, {
  _id: "piece20",
  composer: "R. & R. Sherman  ",
  title: "Truly Scrumptious (from Chitty Chitty Bang Bang)"
}, {
  _id: "piece21",
  composer: "Sullivan",
  title: "Prithee, Pretty Maiden (from Patience)"
}, {
  _id: "piece22",
  composer: "Alan Bullard",
  title: "Hungarian Flute"
}, {
  _id: "piece23",
  composer: "Alan Bullard",
  title: "Marching Flute"
}, {
  _id: "piece24",
  composer: "Paul Harris",
  title: "Study in C"
}, {
  _id: "piece25",
  composer: "Paul Harris",
  title: "Study in G"
}, {
  _id: "piece26",
  composer: "Paul Harris",
  title: "Study in F"
}, {
  _id: "piece27",
  composer: "Mike Mower",
  title: "Straight to the Point"
}, {
  _id: "piece28",
  composer: "Mike Mower",
  title: " Knock Knock"
}, {
  _id: "piece29",
  composer: "Philip Sparke",
  title: "Modal Melody"
}, {
  _id: "piece30",
  composer: "Philip Sparke",
  title: "Shalom!"
}, {
  _id: "piece31",
  composer: "Anon",
  title: "Menuet"
}, {
  _id: "piece32",
  composer: "Phalèse",
  title: "Branle"
}, {
  _id: "piece33",
  composer: "Phalèse",
  title: "Gaillarde mon plaisir"
}, {
  _id: "piece34",
  composer: "Daquin",
  title: "Rigaudon"
}, {
  _id: "piece35",
  composer: "Handel",
  title: "Menuett"
}, {
  _id: "piece36",
  composer: "T. Morley",
  title: "Now is the month of Maying"
}, {
  _id: "piece37",
  composer: "Purcell",
  title: "Fairest Isle"
}, {
  _id: "piece38",
  composer: "Trad. American",
  title: "Amazing Grace"
}, {
  _id: "piece39",
  composer: "Trad. Irish",
  title: "Cockles and Mussels"
}, {
  _id: "piece40",
  composer: "Handel",
  title: "Gavotte"
}, {
  _id: "piece41",
  composer: "Brian Bonsor",
  title: "Scherzino"
}, {
  _id: "piece42",
  composer: "Brian Bonsor",
  title: "Legend"
}, {
  _id: "piece43",
  composer: "Curtin",
  title: "Theme from ‘The Flintstones’"
}, {
  _id: "piece44",
  composer: "Terry Gilkyson",
    title: "  The Bare Necessities (from The Jungle Book)"
}, {
  _id: "piece45",
  composer: "Paul Harris",
  title: "Sunny Spells"
}, {
  _id: "piece46",
  composer: "Alan Haughton",
  title: " One Step at a Time"
}, {
  _id: "piece47",
  composer: "Alan Haughton",
  title: "Calm Seas"
}, {
  _id: "piece48",
  composer: "Ridout",
  title: "Lingering by the Wayside"
}, {
  _id: "piece49",
  composer: "Ridout",
  title: "Stepping Out Along a Road"
}, {
  _id: "piece50",
  composer: "Schumann",
  title: "  Soldiers’ March (from Album for the Young, Op. 68)"
}, {
  _id: "piece51",
  composer: "Sarah Watts",
  title: "Humdinger Hoedown"
}, {
  _id: "piece52",
  composer: "Pam Wedgwood",
  title: " Periwinkle Waltz"
}, {
  _id: "piece53",
  composer: "Pam Wedgwood",
  title: "Dreaming"
}, {
  _id: "piece54",
  composer: "Kathryn Bennetts",
  title: "Spring Song"
}, {
  _id: "piece55",
  composer: "van Eyck",
  title: "  Silvester inde Morgenstont (Theme only)"
}, {
  _id: "piece56",
  composer: "van Eyck",
  title: " Onder de Linde groene (Theme only)"
}, {
  _id: "piece57",
  composer: "xxx",
  title: "xxx"
}, {
  _id: "piece58",
  composer: "Fetzen",
  title: " Moderato in G"
}, {
  _id: "piece59",
  composer: "Paul Harris",
  title: "King Richard, his Delight"
}, {
  _id: "piece60",
  composer: "Trad. Jamaican",
  title: "Linstead Market"
}, {
  _id: "piece61",
  composer: "Trad. Welsh",
  title: "Men of Harlech"
}, {
  _id: "piece62",
  composer: "Sarah Watts",
  title: "Study in Green"
}];



exports.reseedDatabase = function(databaseConnection) {
  console.log("reseeding database");

  databaseConnection.collection('book').remove();
  databaseConnection.collection('exam').remove();
  databaseConnection.collection('piece').remove();

  databaseConnection.collection('book').insertMany(books, function(err, booksInserted) {
    if (!!err) {
      console.log("error inserting books: " + err);
    } else {
      console.log("books inserted");
    }
  });

  databaseConnection.collection('piece').insertMany(pieces, function(err, piecesInserted) {
    if (!!err) {
      console.log("error inserting pieces: " + err);
    } else {
      console.log("pieces inserted");
    }
  });

  databaseConnection.collection('exam').insertMany(exams, function(err, examsInserted) {
    if (!!err) {
      console.log("error inserting exams: " + err);
    } else {
      console.log("exam inserted");
    }
  });


}
