function booksController(Book) {
    function post(req, res) {
        console.log(req.body);
        const book = new Book(req.body);
        book.save();
        console.log(book);
        return res.status(201).json(book);
    }
    return { post }
}

module.exports = booksController;