const express = require("express")
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")

const {
    sendMessage,allMessages
}= require("../controller/message")

router.post("/sendMessage",protect,sendMessage);
router.get("/allMessages/:chatId",protect,allMessages)


module.exports = router;