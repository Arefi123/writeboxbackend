import connectDB from "./config/database.js"
import User from "./models/User.js"
import admins from "./data/admin.js"
import dotenv from "dotenv"

dotenv.config()

connectDB()

const importData = async () => {
	try {
		await User.deleteMany()
		await User.insertMany(admins)

		console.log("Data Imported!")
		process.exit()
	} catch (error) {
		console.error(`${error}`)
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		await Package.deleteMany()

		console.log("Data Destroyed!".red.inverse)
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1)
	}
}

if (process.argv[2] === "-d") {
	destroyData()
} else {
	importData()
}
