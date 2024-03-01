const express = require("express");
const router = express.Router();

const itemService = require("../service/userService");

// create
router.post("/", async (req, res) => {
  const data = await itemService.loginUser(req.body);
  if (data) {
    if(data == "Missing username or password")
    {
      res
      .status(400)
      .json({ message: "Missing username or password", receivedData: req.body });
    }
    else
    {
      res.status(201).json({ message: "Login Successful", data });
    }
  } else {
    res
      .status(400)
      .json({ message: "Login Failed", receivedData: req.body });
  }
});

module.exports = router;
