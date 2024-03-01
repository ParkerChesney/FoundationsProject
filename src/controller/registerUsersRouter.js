// endpoint: /items
// CRUD
const express = require("express");
const router = express.Router();

const itemService = require("../service/userService");

// create
router.post("/", async (req, res) => {
  let data = await itemService.registerUser(req.body);
  if (data) {
    if(data == "Missing username or password")
    {
      res
      .status(400)
      .json({ message: "Missing username or password", receivedData: req.body });
    }
    else if(data == "User already exists")
    {
      res
      .status(400)
      .json({ message: "User already exists", receivedData: req.body });
    }
    else{
      res.status(201).json({ message: "Registered", data });
    }
  } else {
    res
      .status(400)
      .json({ message: "Was not registered", receivedData: req.body });
  }
});

module.exports = router;
