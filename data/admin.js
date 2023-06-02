import bcrypt from "bcryptjs"

const admins = [
	{
		fullName: "Sayeed Mahid",
		email: "sayeedmahdimousavi@gmail.com",
		username: "Mahdi",
		password: bcrypt.hashSync("12345678", 10),
		image: "no-image.png",
		gender: "male",
		isSuperAdmin: true,
		role: "superAdmin",
		verifiedAt: new Date()
	},
]

export default admins
