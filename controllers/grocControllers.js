// import groc model
const { model } = require("mongoose");
const Groc = require("../databases/schemas/groc");

// make get route to get all grocries
async function index(request, response) {
  response.cookie("visited", true, { maxAge: 900000 });
  const groc = await Groc.find();
  response.send(groc);
}

//make post route to add groc
async function create(request, response) {
  const groc = await Groc.create(request.body);
  response.send({ status: "success", message: "the groceries add", groc });
}

module.exports = { index, create };
