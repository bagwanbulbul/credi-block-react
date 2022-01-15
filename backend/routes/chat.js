const express = require("express")
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")

const {
    fetchchat,accessChat2
}= require("../controller/chat")

//router.post("/accesschat",protect,accessChat);
router.post("/accesschat2",protect,accessChat2);
router.get("/fetchchat",protect, fetchchat);

module.exports = router;