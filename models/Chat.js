import mongoose from "mongoose"

const MessageSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			refPath: "messages.userType",
			required: true,
		},
		userType: {
			type: String,
			enum: ["Mentor", "Mentee"],
			required: true,
		},
		image: Object,
		text: String,
		replyTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
			default: null,
		},
	},
	{ timestamps: true }
)

const ChatSchema = new mongoose.Schema(
	{
		mentee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		messages: [MessageSchema],
		closing_date: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	}
)

const Chat = mongoose.model("Chat", ChatSchema)
mongoose.model("Message", MessageSchema)

export default Chat
