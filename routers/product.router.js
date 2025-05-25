import express from "express";

import { auth } from "./auth-middleware.js";
import { Products, Order } from "./Database.js";

///////////////////////////////////Validation Middleware////////////////////////
function validateFilters(request, response, next) {
  let { category } = request.params;
  if (!category) return response.status(400).send("Category is missing");
  next();
}

////Body Validation
function validateBody(request, response, next) {
  if (!request.body) return response.status(400).send("Empty Request");
  // let { body } = request.body;
  // let { id } = request.params;
  if (!request.body.name) return response.status(400).send("Name Missing");
  if (!request.body.description)
    return response.status(400).send("Description Missing");
  if (!request.body.price) return response.status(400).send("Price Missing");
  if (!request.body.quantity)
    return response.status(400).send("Quantity Missing");
  if (!request.body.createdAt) return response.status(400).send("Date Missing");
  next();
}
