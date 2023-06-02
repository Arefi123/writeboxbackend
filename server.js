import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import xss from "xss-clean"
import express from "express"
import cookieParser from "cookie-parser"
import mongoSanitize from "express-mongo-sanitize"
import connectDB from "./config/database.js"
import { corsOptions } from "./config/corsOptions.js"
import { cornJobs } from "./scheduler/emailService.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"

import adminRoutes from "./routes/admin/index.js"
import clientRoutes from "./routes/client/index.js"
import mentorRoutes from "./routes/mentor/index.js"
import menteeRoutes from "./routes/mentee/index.js"
// import passport from "passport"
// import passportConfig from "./config/passport-setup.js"

// app.use(passport.initialize())
// app.use(passport.session())

// Load env vars
dotenv.config()
cornJobs()

// Connect to database
connectDB()

// Initialize Express
const app = express()

// Prevent XSS attacks
app.use(xss())

// Security protocol implemented
app.use(cors(corsOptions))

// Set security headers
app.use(helmet())

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Parse-Cookie
app.use(cookieParser())

// Sanitize data
app.use(mongoSanitize())

// Rate limiting: IP
app.set("trust proxy", 1)

// Corn Jobs
cornJobs()

// API routes
app.use("/api/v1/", clientRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/mentor", mentorRoutes)
app.use("/api/v1/mentee", menteeRoutes)

// Error Handling Middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || process.env.APP_PORT || 5000

app.listen(PORT, () =>
	console.log(
		`Server is running on ${process.env.NODE_ENV} mode, on port: ${PORT}`
	)
)
