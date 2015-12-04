var falcor = require('falcor');

exports.GetModel = function() {

  var model = new falcor.Model({
    cache: {
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
        }
      }
    }
  });

  return model;


}
