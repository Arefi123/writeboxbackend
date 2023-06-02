import cloudinary from "cloudinary"
import asyncHandler from "express-async-handler"

const deleteCloudData = asyncHandler(async (req, res) => {
    const public_ids = req.body.imagesId

    try {
        await cloudinary.v2.api.delete_resources(public_ids)
        res.status(200).json({ message: "image deleted" })

    } catch (err) {
        console.error(err);
        throw new Error(err)
    }

})

export { deleteCloudData }