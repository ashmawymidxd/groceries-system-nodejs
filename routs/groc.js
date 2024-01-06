const { Router } = require("express");
const router = Router();

// import grocControllers

const { index, create } = require("../controllers/grocControllers");

let list = [{ item: "tee" }, { item: "suger" }];
// make routes

// make get route
router.get("/", index);

// make get route with params
router.get("/:item", (request, response) => {
  const { item } = request.params;
  const itemIndex = list.find((g) => g.item === item);
  response.send(itemIndex);
});

//make post route
router.post("/", create);

// make delete route
router.delete("/", (request, response) => {
  list.pop();
  response.send(204);
});

// make put route
router.put("/", (request, response) => {
  list[0].item = "suger";
  response.send(200);
});

// rout to get items from cart
router.get("/shop/cart", (request, response) => {
  const { cart } = request.session;
  if (!cart) {
    response.send("your cart is empty");
  } else {
    response.send(cart);
  }
});

//route to post items to cart
router.post("/shop/cart/item", (request, response) => {
  const { item, quantity } = request.body;
  const cartitem = { item, quantity };
  const { cart } = request.session;
  if (cart) {
    const { items } = cart;
    request.session.cart.items.push(cart);
  } else {
    request.session.cart = { items: [cartitem] };
  }
  response.send(201);
});

module.exports = router;
