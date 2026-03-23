// GET /books?author=John&year=2020
app.get('/books', (req, res) => {
    const { author, year } = req.query;
    let filteredBooks = books;

    if (author) {
        filteredBooks = filteredBooks.filter(book => book.author === author);
    }
    if (year) {
        filteredBooks = filteredBooks.filter(book => book.year === Number(year));
    }

    res.json(filteredBooks);
});