function booksController(Book) {
    function post(req, res) {
      console.log(req.body);
      const book = new Book(req.body);
      if (!req.body.title) {
        res.status(400);
        return res.send('Title is required');
      }
      book.save();
      console.log(book);

      // execute in 2 lines. beacause test will not be run with this way
      // test has seperate implementation for each method
      res.status(201);
      return res.json(book);
    }
    return { post };
  }
  
  module.exports = booksController;