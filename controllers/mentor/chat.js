import asyncHandler from "express-async-handler";
import Chat from "../../models/Chat.js";
import mongoose from "mongoose";

// @desc    Get all chats
// @route   GET /api/v1/admin/chat
// @access  Private
const getChats = asyncHandler(async (req, res, next) => {
    const chats = await Chat.find({})

        .populate("mentee", "firstName lastName")
        .populate("messages.user", "firstName lastName")
        .slice("messages", -1);

    res.status(200).json(chats);
});

// @desc    Get all chats' messages
// @route   GET /api/v1/admin/chat/:id
// @access  Private
const getMessages = asyncHandler(async (req, res, next) => {
    const { params } = req;

    const chats = await Chat.findById(params.id).populate(
        "messages.user",
        "fullName image"
    );

    res.status(200).json(chats.messages);
});

// @desc    Create Message
// @route   Message POST /api/v1/admin/chat/:id
// @access  private
const createMessage = asyncHandler(async (req, res, next) => {
    const { user, body, params } = req;

    let chat = await Chat.findById(params.id);

    if (!chat) {
        res.status(404);
        throw new Error("chat was not found");
    }

    const newMessage = {
        user: user.id,
        userType: "Mentor",
        image: body?.images || null,
        text: body?.text || null,
        reply: null,
    };

    chat.messages.push(newMessage);
    const newChat = await chat.save();

    await newChat.populate("messages.user", "firstName lastName");
    await newChat.populate("mentee", "fullName image");

    res.status(201).json(newChat.messages.pop());
});

// @desc    Reply Message
// @route   Message POST /api/v1/admin/chat/:chatId/message/:msgId/reply
// @access  private
const replyMessage = asyncHandler(async (req, res, next) => {
    const { user, params, body } = req;
    let chat = await Chat.findById(params.chatId);

    if (!chat) {
        res.status(404);
        throw new Error("not found chat");
    }

    const message = chat.messages.some((message) => message.id === params.msgId);

    if (!message) {
        res.status(404);
        throw new Error("mesage not found");
    }

    const replyMessage = {
        user: user?.id,
        userType: "Mentor",
        text: body.text,
        replyTo: params.msgId,
    };

    chat.messages.push(replyMessage);

    const newReplyMessage = await chat.save();

    await newReplyMessage.populate("messages.user", "fullName image");

    res.status(201).json(newReplyMessage.messages.pop());
});

// @desc    Update message
// @route   Message: PUT /api/v1/admin/chat/:chatId/message/:messageId
// @access  Private
const updateMessage = asyncHandler(async (req, res, next) => {
    const { body, params } = req;

    if (!mongoose.Types.ObjectId.isValid(params.msgId)) return next();

    let chat = await Chat.findById(params.chatId);

    if (!chat) {
        res.status(404);
        throw new Error("chat was not found");
    }

    const message = chat.messages.some((message) => message.id === params.msgId);

    if (!message) {
        res.status(404);
        throw new Error("message was not found");
    }

    // Update specific message
    const chatUpdatedMessage = await Chat.findOneAndUpdate(
        { "messages._id": params.msgId },
        {
            $set: {
                "messages.$.text": body.text,
                "messages.$.image": body.cloudinary?.secure_url || null,
                "messages.$.updatedAt": new Date(),
            },
        },
        {
            new: true,
            upsert: true,
            select: {
                messages: {
                    $elemMatch: { _id: params.msgId },
                },
            },
        }
    ).populate("messages.user", "firstName lastName");

    res.status(200).json(chatUpdatedMessage.messages[0]);
});

// @desc    Delete Message
// @route   Message DELETE /api/v1/admin/chat/:chatId/message/:msgId/reply
// @access  private
const deleteMessage = asyncHandler(async (req, res, next) => {
    const { user, body, params } = req;

    let chat = await Chat.findById(params.chatId);

    if (!chat) {
        res.status(404);
        throw new Error("chat not found");
    }

    const message = chat.messages.some((message) => message.id === params.msgId);

    if (!message) {
        res.status(404);
        throw new Error("message not found");
    }

    const ChatUpdatedMessage = await Chat.findOneAndUpdate(
        { "messages._id": params.msgId },
        { $pull: { messages: { _id: params.msgId } } },
        {
            select: {
                messages: {
                    $elemMatch: { _id: params.msgId },
                },
            },
        }
    ).populate("messages.user", "firstName lastName");

    if (!ChatUpdatedMessage) {
        res.status(404);
        throw new Error("not found");
    }

    res.status(200).json({});
});

export default {
    getChats,
    getMessages,
    replyMessage,
    createMessage,
    updateMessage,
    deleteMessage,
};
