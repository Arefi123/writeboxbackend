import mongoose from "mongoose"
import Chat from "../../models/Chat.js"
import asyncHandler from "express-async-handler"

// @desc    Create a Chat
// @route   POST /api/v1/mentee/chat
// @access  private
const createChat = asyncHandler(async (req, res, next) => {
    const { body, user } = req;

    body.mentee = user.id

    let chat = await Chat.findOne({ mentee: user.id })

    if (chat) {
        return res.status(200).json({ success: true })
    }

    chat = await Chat.create(body)

    await chat.populate("mentee", "fullName")

    if (!chat) {
        res.status(500)
        return next(new Error(t("messages:failed")))
    }

    res.status(201).json(chat)
})

// @desc    Get all Messages
// @route   GET /api/v1/mentee/chat/:id
// @access  Private
const getMessages = asyncHandler(async (req, res, next) => {
    const { params } = req

    const chats = await Chat.findById(params.id)
        .populate("messages.user", "fullName image")

    if (!chats) {
        res.status(400)
        throw new Error("no chat found")
    }

    res.status(200).json(chats.messages)
})

// @desc    Create Message
// @route   POST /api/v1/mentee/chat/:id
// @access  private
const createMessage = asyncHandler(async (req, res, next) => {
    const { user, body, params } = req

    let chat = await Chat.findOne({ _id: params.id })

    if (!chat) {
        res.status(404)
        throw new Error("No chats found")
    }

    const newMessage = {
        user: user.id,
        userType: "Mentee",
        image: body.images || null,
        text: body?.text || null,
        reply: null,
    }

    chat.messages.push(newMessage)

    const newChat = await chat.save()
    await newChat.populate("messages.user", "fullName")

    res.status(201).json(newChat.messages.pop())
}
)

// @desc    Reply Message
// @route   POST /api/v1/mentee/chat/:chatId/message/:msgId/reply
// @access  private
const replyMessage = asyncHandler(async (req, res, next) => {
    const { user, body, params } = req;

    let chat = await Chat.findById(params.id)

    if (!chat) {
        res.status(404)
        throw new Error("No chat found")
    }

    const message = chat.messages.some(
        (message) => message.id === params.msgId
    )

    if (!message) {
        res.status(404)
        throw new Error("no message found")
    }

    const replyMessage = {
        user: user.id,
        userType: "Mentee",
        text: body.text,
        replyTo: params.msgId,
    }

    chat.messages.push(replyMessage)

    const newChatMessage = await chat.save()

    await newChatMessage.populate("messages.user", "fullName image")

    res.status(201).json(newChatMessage.messages.pop())
})

// @desc    Update message
// @route   Message: PUT /api/v1/mentee/chat/:chatId/message/:messageId
// @access  Private
const updateMessage = asyncHandler(async (req, res, next) => {
    const { user, body, params } = req;

    if (!mongoose.Types.ObjectId.isValid(params.msgId)) return next()

    let chat = await Chat.findById(params.id)

    if (!chat) {
        res.status(404)
        throw new Error("No chat found")
    }

    const message = chat.messages.some(
        (message) => message.id === params.msgId
    )

    if (!message) {
        res.status(404)
        throw new Error("message not found")
    }

    // Update specific message
    const chatUpdatedMessage = await Chat.findOneAndUpdate(
        { "messages._id": params.msgId },
        {
            $set: {
                "messages.$.text": body.text,
                "messages.$.image": body.images,
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
    ).populate("messages.user", "fullName image")

    res.status(200).json(chatUpdatedMessage.messages[0])
})

// @desc    Delete Message
// @route   Delete /api/v1/chat/:chatId/message/messageId
// @access  private
const deleteMessage = asyncHandler(async (req, res, next) => {
    const { user, body, params } = req;

    if (!mongoose.Types.ObjectId.isValid(params.msgId)) return next()

    let chat = await Chat.findById(params.id)

    if (!chat) {
        res.status(404)
        throw new Error("chat was not found")
    }

    const message = chat.messages.some(
        (message) => message.id === params.msgId
    )

    if (!message) {
        res.status(404)
        throw new Error("message was not found")
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
    ).populate("messages.user", "fullName image publicId")

    if (!ChatUpdatedMessage) {
        res.status(404)
        throw new Error("chat was not found")
    }

    res.status(200).json({})
})

export default {
    createChat,
    getMessages,
    replyMessage,
    createMessage,
    updateMessage,
    deleteMessage,
}