import path from "path";
import { unlink } from "fs/promises";
import cloudinary from "../config/cloudinary.js";

const videoToCloud = async (req, res, next) => {
    const __dirname = path.resolve();

    const { file } = req;
    req.body.video = null;

    try {
        if (file?.fieldname) {
            const response = await cloudinary.cloudinary.v2.uploader.upload(
                file?.path,
                {
                    "resource_type": "video",
                    folder: "video"
                },
            )
            req.body.video = response
            await unlink(`${__dirname}/uploads/${file?.filename}`);
        }

        next();
    } catch (err) {
        next(err);
    }
};

export default videoToCloud;
