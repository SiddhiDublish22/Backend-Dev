app.get('/books', (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    page = Number(page);
    limit = Number(limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    res.json(books.slice(startIndex, endIndex));
});