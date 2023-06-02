import express from "express"
import authController from "../../controllers/client/auth.js"
import authValidator from "../../middleware/validators/auth.js"
import passport from "passport"

const router = express.Router()

router.post("/login", authValidator.login, authController.login)

router.post(
	"/login-thirdParty",
	authValidator.login_thirdParty,
	authController.loginThirdParty
)

router.post(
	"/thirdParty-signup",
	authValidator.thirdParty,
	authController.signThirdParty
)

// router.get(
// 	"/google",
// 	passport.authenticate("google", {
// 		scope: ["profile", "email"],
// 	})
// )

///Callback route for google to redirect
// router.get(
// 	"/google/redirect",
// 	passport.authenticate("google"),
// 	(req, res, next) => {
// 		user = req.user
// 		res.send(user)
// 	}
// )

router.post("/verify", authValidator.verifyEmail, authController.verifyEmail)

router.post(
	"/resend-token",
	authValidator.resendToken,
	authController.resendToken
)

router.get("/refresh", authController.refresh)

// router.route("/logout").post(authController.logout);

router.post(
	"/forgot-password",
	authValidator.forgotPassword,
	authController.forgotPassword
)
router.put(
	"/reset-password",
	authValidator.resetPassword,
	authController.resetPassword
)

export default router
