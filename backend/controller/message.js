const Chat = require("../model/chat");
const Message = require("../model/message");
const User = require('../model/user');


exports.allMessages = async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name pic email")
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }


exports.sendMessage = async (req, res) => {
    const { content, chatId } = req.body;

    //console.log(req.body.content)
    if (!content || !chatId) {
        console.log("Invaild data passed into request")
        return res.sendStatus(400);
    }
    // console.log("reciver",req.body.chatId)
    // console.log("sender",req.user._id)
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    }

    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

         await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
       console.log("message",message)
       return res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);

    }
}

