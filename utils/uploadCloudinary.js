import path from "path"
import { unlink } from "fs/promises"
import cloudinary from "../config/cloudinary.js"

const uploadToCloud = async (req, res, next) => {
	const __dirname = path.resolve()

	const { files } = req
	req.body.images = []

	try {
		if (files && Object.values(files).length > 0) {
			await Promise.all(
				Object.values(files).map(async (file) => {
					for (const element of file) {
						const img = await cloudinary.cloudinary.uploader.upload(
							element.path,
							{
								upload_preset: "leaninbox",
							}
						)
						req.body.images.push({ ...img, name: element.fieldname })

						await unlink(`${__dirname}/uploads/${element?.filename}`)
					}
				})
			)
		}

		next()
	} catch (err) {
		next(err)
	}
}

export default uploadToCloud
