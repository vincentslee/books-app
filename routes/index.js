const axios = require("axios");
const router = require("express").Router();
const Controller = require("../controllers/Controller");

router.get("/books", (req, res) => {
  axios
    .get("https://www.googleapis.com/books/v1/volumes", { params: req.query })
    .then(({ data: { items } }) => res.json(items))
    .catch(err => res.status(422).json(err));
});

router.route("/savedBooks")
  .get(Controller.findAll)
  .post(Controller.create)

router.route("/savedBooks/:googleId")
  .delete(Controller.remove);

module.exports = router;