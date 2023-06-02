import nodemailer from "nodemailer"

const sendMail = async (options) => {
	try {
		let transporter = nodemailer.createTransport({
			host: "smtp.hostinger.com",
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: process.env.MAIL_AUTH_USER,
				pass: process.env.MAIL_AUTH_PASS,
			},
		})

		let mailOptions = {
			from: process.env.MAIL_AUTH_USER,
			to: options.email,
			subject: options.subject,
			html: options.html,
		}

		return await transporter.sendMail(mailOptions)
	} catch (e) {
		console.error(e)
	}
}

export default sendMail
