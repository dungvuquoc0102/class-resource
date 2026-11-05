import express from "express";
const app = express();
const port = 3000;

let products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
];

app.use(express.json());

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.json(newProduct);
});

app.patch("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const productIndex = products.findIndex((p) => p.id === productId);

  products[productIndex] = { ...products[productIndex], ...updatedProduct };
  res.json(products[productIndex]);
});

app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter((p) => p.id !== Number(productId));

  res.json({ messege: "Product deleted successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// client -(request)-> web server (Nginx, Apache)
// HTML, CSS, JS
// JS (fetch API) -> api server (Node.js)
