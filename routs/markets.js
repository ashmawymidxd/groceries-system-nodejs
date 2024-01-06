const { Router } = require("express");
const router = Router();

const subermarketList = [
  { id: "1", title: "dell3600", price: "3000", taxes: "100", ads: "200" },

  { id: "2", title: "hp3600", price: "6000", taxes: "200", ads: "300" },

  { id: "3", title: "rolex", price: "7000", taxes: "1000", ads: "300" },

  { id: "4", title: "relmi", price: "400", taxes: "100", ads: "0" },

  { id: "5", title: "sumsung", price: "5000", taxes: "1000", ads: "200" },

  { id: "6", title: "hp3600", price: "5000", taxes: "400", ads: "200" },
];

// make routes to get all items with price less than or equal to the price in the query
router.get("/", (req, res) => {
  const { price } = req.query;
  const parsPrice = parseInt(price);
  if (!isNaN(parsPrice)) {
    const filterList = subermarketList.filter(
      (item) => item.price <= parsPrice
    );
    res.send(filterList);
  } else {
    res.send("bad request");
  }
});

// make routes to get all items
router.get("/", (req, res) => {
  res.send(subermarketList);
});
module.exports = router;
