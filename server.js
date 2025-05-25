import express from "express";
import { auth } from "./auth-middleware.js";
import { Products, Order } from "./Database.js";

///////////////////////Server Basic Info/////////////////////////////
const PORT = 5001;
const app = express();

app.listen(PORT, () => {
  console.log("server is running...");
});

// Add this to be able to read body
app.use(express.json());

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
  let Product_found = Products.find((item) => item.id == id);
  if (!Product_found) {
    response.send("Product not found");
  } else {
    //Exports are contant and cannot be removed
    // try {
    //   let Product_filter = Products.filter((article) => article.id != id);
    //   Products = Product_filter;
    //   response.send(Products);
    // } catch (err) {
    //   console.log(err);
    // }

    //splice did not work
    // let index = Products.findIndex((product) => product.id === id);
    // if (index !== -1) {
    //   Products.splice(index, 1);
    //   Products.delete(index);
    // }

    // https://stackoverflow.com/questions/62378228/how-to-change-es6-imported-array

    let Product_filter = Products.filter((article) => article.id != id);

    Products.length = 0;

    for (let i = 0; i < Product_filter.length; i++) {
      Products.push(Product_filter[i]);
    }

    // Products.push(Product_filter);
    // console.log(Product_filter);
    response.send(Products);
  }
});

//Post operation to be implemneted here as well
app.post("/products", auth, validateBody, (request, response) => {
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

//Put operation to update an existing record if it exists
app.put("/products/:id", auth, validateBody, (request, response) => {
  // Update article
  let id = request.params.id;
  let body = request.body;
  // Simulation of database
  let Product = Products.find((item) => item.id == id);
  if (!Product) {
    response.send("Product not found");
  } else {
    // Products = Products.map((Product) => {
    //   if (Product.id == id)
    //     return {
    //       id,
    //       ...Product,
    //       ...body,
    //     };
    //   return Product;
    // });
    console.log(body.name);
    const index = Products.findIndex(
      (product) => product.id.toString() === id.toString()
    );
    console.log(index);
    if (index !== -1) {
      Products[index].name = body.name;
      Products[index].description = body.description;
      Products[index].price = body.price;
      Products[index].quantity = body.quantity;
      Products[index].createdAt = body.createdAt;
      // console.log(body.name);
    }
    response.send(Products);
  }
});

//////////////////////// Error Handling Middleware for the whole app//////////////
app.use((err, request, response, next) => {
  if (err) return response.status(500).send("Server Error");
  next();
});
