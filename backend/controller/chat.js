const Chat = require('../model/chat');
const User = require('../model/user');



exports.accessChat2 = async (req, res) => {
    const { userId } = req.body; //login user send us Id whicheven his want to chalt
    console.log("chatuser", userId)
    console.log("reee", req.user._id)

    if (!userId) {   //check old chat is avaliwable or not
        console.log("userId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({       //first chat exist 
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } }, //login user
            { users: { $elemMatch: { $eq: userId } } }        //                                   
        ]
    }).populate("users", "-password").populate("latestMessage"); //if chat found populate users array

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            users: [req.user._id, userId]
        }

        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");

            res.status(200).send(FullChat)
        } catch (error) {
            res.status(400);
            throw new Error(error.message);

        }

    }
   
}

exports.fetchchat = async (req, res) => {
  
    // res.json({
    //     msg:"fetchchat runing"
    // })
    try {

        Chat.find({
            users: { $elemMatch: { $eq: req.user._id } }
        })
            .populate("users", "-password")
            .populate("latestMessage")
            .sort({ updateAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                });
                res.status(200).send(results);
            })

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}
