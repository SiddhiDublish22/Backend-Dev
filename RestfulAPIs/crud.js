let authors = [];

// CREATE
app.post('/authors', (req, res) => {
    const author = { id: Date.now(), ...req.body };
    authors.push(author);
    res.status(201).json(author);
});

// READ ALL
app.get('/authors', (req, res) => res.json(authors));

// READ ONE
app.get('/authors/:id', (req, res) => {
    const author = authors.find(a => a.id == req.params.id);
    if (!author) return res.status(404).json({ error: "Not found" });
    res.json(author);
});

// UPDATE
app.put('/authors/:id', (req, res) => {
    const author = authors.find(a => a.id == req.params.id);
    if (!author) return res.status(404).json({ error: "Not found" });
    Object.assign(author, req.body);
    res.json(author);
});

// DELETE
app.delete('/authors/:id', (req, res) => {
    authors = authors.filter(a => a.id != req.params.id);
    res.status(204).send();
});