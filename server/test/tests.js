'use strict';

var chai = require('chai');
var expect = chai.expect;

chai.should();

function isEven(num) {
  return num % 2 === 0;
}

describe('isEven', function() {

  it("should return true if the value is even", function() {
    isEven(4).should.be.true;
  });

});
