require('chai').should()
const sinon = require("sinon");
const sinonTest = require("sinon-test");
const test = sinonTest(sinon);
const functions = require('./functions')

describe('GetLatestNumber', function(){
  describe('array', () => {
    it('Should succeed with value 2', test(
      function () {
        //mock
        this.stub(functions, 'a').returns(2);
        const num = [3,2,5,3,57,8,2];
        // execute
        const res = getLatestNumber(num)
        //compare results
        res.should.be.equals(2)
      })
    );
  })
})

function getLatestNumber(numbers) {
  const b  = functions.a()
  return numbers[numbers.length -1];

}
