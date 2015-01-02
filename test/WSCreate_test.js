var assert = require("should");
var WSCreate = require("../lib/WSCreate");

describe('Calling Create Activity Web Service', function(){
  describe('Create a CusActivity object to populate', function(){
      var result = {};
      before( function() {
          WSCreate(0,'CusActivity', function(newData) {
          result = newData;
              console.log('New Entity = ', newData);
          });
          console.log('blah - ', result);
      });
      it('should return an object', function(done){
          result.should.be.an.Object;
          done();
      });
      it('should have property CusActivity', function(done) {
          console.log(JSON.stringify(result));
        JSON.stringify(result).should.have.property('CustomerActivityId');
          done();
      });
  });
})
