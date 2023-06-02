import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			index: {
				unique: true,
			},
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		img: {
			type: JSON,
		},
		creatorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		updaterId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
)

const Category = mongoose.model("Category", CategorySchema)

export default Category
