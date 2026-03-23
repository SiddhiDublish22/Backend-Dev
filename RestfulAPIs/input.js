function validateYear(req, res, next) {
    const { year } = req.body; // for POST/PUT requests
    const currentYear = new Date().getFullYear();

    if (year !== undefined) {
        if (isNaN(year) || year < 1500 || year > currentYear) {
            return res.status(400).json({ error: "Invalid year" });
        }
    }
    next();
}

// Use middleware in your routes
app.post('/books', validateYear, (req, res) => {
    // save book
});