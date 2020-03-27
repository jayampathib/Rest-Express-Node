// this variable is used to identify test enviorenment and use when initiating the database
process.env.ENV = 'test';

require('should');

const request = require('supertest');
const mongoose = require('mongoose');

// app is export only for using here
const app = require('../../src/app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book CRUD Test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    
    const bookPost = { title: 'My Book', author: 'jon', genre: 'Fiction' ,read:false};
        
    // agent.post is a black box
    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        //console.log(results);
        results.body.read.should.not.equal(true);
        results.body.should.have.property('_id');
        done();
      });
  });
   // this section is used to delete above insert data from mongoose
    // since we delete the data, we need to set up seperate databse to integration test
  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

});