import passport from "passport"
import GoogleStrategy from "passport-google-oauth20"
GoogleStrategy.Strategy
import User from "../models/User.js"

passport.serializeUser((user, done) => {
	done(null, user.id)
})
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user)
	})
})
passport.use(
	new GoogleStrategy(
		{
			// options for google strategy
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/redirect",
		},
		(accessToken, refreshToken, profile, done) => {
			// check if user already exists in our own db
			User.findOne({ googleId: profile.id }).then((currentUser) => {
				if (currentUser) {
					// already have this user
					console.log("user is: ", currentUser)
					done(null, currentUser)
				} else {
					// if not, create user in our db
					new User({
						googleId: profile.id,
						name: profile.displayName,
						email: profile._json.email,
					})
						.save()
						.then((newUser) => {
							console.log("created new user: ", newUser)
							done(null, newUser)
						})
				}
			})
		}
	)
)
