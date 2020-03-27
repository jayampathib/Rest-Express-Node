// here we don't need to import mocha, because we run inside mocha
const should = require('should');
const sinon = require('sinon');
const bookController = require('../../src/controllers/booksController');

describe('Book Control test', () => {
    describe('Post', () => {
        it('should not allow an  empty title on post', () => {

            // -----------START : SET UP MOCK OBJECTS [ARRANGE] -----------------
            // Save function is implmented inside mongoose. but here we don't need to check mongoose library save function
            // we create a dummy "Book" object and dummy function for save, and assume save happen prpoerly
            const Book = function (book) { this.save = () => { } };

            // setup mock Request object
            const req={
                body:{
                    author :'Jon'
                }
            };

            const res={
                status : sinon.spy(),
                send :sinon.spy(),
                json :sinon.spy()
            };
            // -----------END : SET UP MOCK OBJECTS  [ARRANGE] ----------------

            // -----------ACT ----------------------------------------------
            const controller =bookController(Book); // since javascript dont have type for objects, we can easily create "Book" object
            controller.post(req,res);

            // -----------ASSERT ----------------------------------------------
            res.status.calledWith(400).should.equal(true,`Bad Status ${res.status.args[0][0]}`);
            Response.send.calledWith('Title is required').should.equal(true);
        });
    });
});