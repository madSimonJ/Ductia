var mongodb = require('../config/mongodb');

exports.getExam = function(req, res) {

  var board = req.params.board;
  var instrument = req.params.instrument;
  var grade = req.params.grade;

  var query = {examBoard: board, instrument: instrument, grade: parseInt(grade)};

  mongodb.FindOne("exam", query).then(function(record) {
    res.status(200).send(record);
  }).catch(function(error) {
    console.log(error);
    res.status(500).send({error: error});
  });
}

exports.getAllExams = function(req, res) {
  var query = {};

  mongodb.Find("exam", query).then(function(records) {
    console.log("records found");
    console.log("sending: " + JSON.stringify(records));
    res.status(200).send(records);
    console.log("done sending");
  }).catch(function(error){
    console.log("500 error: " + error);
    res.status(500).send({error: "500 Error: " + error});
  });
}
