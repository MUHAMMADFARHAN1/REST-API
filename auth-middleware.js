export const auth = (request, response, next) => {
  let token = request.headers.authorization;
  if (!token)
    return response
      .status(401)
      .send("You dont have right authoriyation for the task");
  next();
};
