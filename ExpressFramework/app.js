import express from "express";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Middleware: Response Time Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} - ${Date.now() - start}ms`);
  });
  next();
});

//Users (Query Params)
const users = [
  { id: 1, name: "Amit" },
  { id: 2, name: "Siddhi" },
  { id: 3, name: "Rahul" }
];

app.get("/users", (req, res) => {
  const { name } = req.query;
  let filtered = users;

  if (name) {
    filtered = users.filter(u =>
      u.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.render("users", { users: filtered });
});

//Contact Form
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  res.send("Contact form submitted!");
});

//Gallery
app.get("/gallery", (req, res) => {
  const photos = ["pic1.jpg", "pic2.jpg", "pic3.jpg"];
  res.render("gallery", { photos });
});

//Blog
let posts = [
  { id: 1, title: "First Post", content: "Hello World!" }
];

app.get("/blog", (req, res) => {
  res.render("blog/blog", { posts });
});

app.get("/blog/new", (req, res) => {
  res.render("blog/new-post");
});

app.post("/blog", (req, res) => {
  const { title, content } = req.body;
  posts.push({
    id: posts.length + 1,
    title,
    content
  });
  res.redirect("/blog");
});

app.get("/blog/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("blog/post", { post });
});

//404 Page
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
