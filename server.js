import express from "express";

///////////////////////Server Basic Info/////////////////////////////
const PORT = 5001;
const app = express();

app.listen(PORT, () => {
  console.log("server is running...");
});

// Add this to be able to read body
app.use(express.json());

//////////////////////Database Simulation////////////////////////////
// Simulation of database
let Products = [
  {
    id: 1,
    name: "First",
    description: "Product 1",
    price: "10",
    quantity: "5",
    createdAt: "01/12/2022",
  },
  {
    id: 2,
    name: "Second",
    description: "Product 2",
    price: "20",
    quantity: "10",
    createdAt: "11/12/2022",
  },
  {
    id: 3,
    name: "Third",
    description: "Product 3",
    price: "30",
    quantity: "15",
    createdAt: "21/12/2022",
  },
];

// Order will be empty initially as thez will be dispatched later on
let Order = [];

//////////////////////////////////Products Endpoint////////////////////////////////////////
// products, GET, no body, no headers
app.get("/products", (request, response) => {
  // fetch products from database
  response.send(Products);
});

//Get Product by Id
app.get("/products/:id", (request, response) => {
  // fetch Products from database
  let id = request.params.id;
  // Simulation of database
  let Product = Products.find((item) => item.id == id);
  if (!Product) {
    response.send("Product not found");
  } else response.send(Product);
});

//Delete product by Id
app.delete("/products/:id", (request, response) => {
  // Delete article
  let id = request.params.id;
  // Simulation of database
  let Product = Products.find((item) => item.id == id);
  if (!Product) {
    response.send("Product not found");
  } else {
    let Product = Products.filter((article) => article.id != id);
    Products = Product;
    response.send(Product);
  }
});

app.post("/products", (request, response) => {
  // Create new article
  let headers = request.headers;
  let body = request.body;
  //   console.log(headers);
  //   console.log(body);
  if (headers.authorization == "Farhan123") {
    // Simulation of database
    Products.push({ id: Products.length + 1, ...body });
    // response.send("Article created succesfully");
    response.send(Products);
  } else response.send("You cannot create an article");
});
