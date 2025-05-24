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
    name: "First",
    description: "Product 1",
    price: "10",
    quantity: "5",
    createdAt: "01/12/2022",
  },
  {
    name: "Second",
    description: "Product 2",
    price: "20",
    quantity: "10",
    createdAt: "11/12/2022",
  },
  {
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
