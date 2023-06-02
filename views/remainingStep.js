export default class remainStepTemplate {
	supportEmail = "support@writeinbox.com"
	constructor(pages, message) {
		this.pages = pages
		this.message = message
	}

	render() {
		return `
      <!DOCTYPE html>
      <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
          <meta charset="utf-8">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
          <!--[if mso]>
          <xml>
              <o:officedocumentsettings>
                  <o:pixelsperinch>96</o:pixelsperinch>
              </o:officedocumentsettings>
          </xml>
          <![endif]-->
          <title>accept code</title>
          <link rel="stylesheet" media="screen" href="../public/fonts/kalameh/font.css">
          <style>
              .hover-underline:hover {text-decoration: underline !important;}
              @media (max-width: 600px) {
                  .sm-w-full {width: 100% !important;}
                  .sm-px-24 {padding-left: 24px !important;padding-right: 24px !important;}
                  .sm-py-32 {padding-top: 32px !important;padding-bottom: 32px !important;}
              }
              .main-table td {
                text-align: right;
              }
          </style>
      </head>
      <body dir="rtl" style="direction: rtl; text-align: right; margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #eceff1;">
    
      <div role="article" aria-roledescription="email" aria-label="Reset your Password" lang="en"
           style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly;">
          <table style="width: 100%; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0"
                 cellspacing="0" role="presentation">
              <tr>
                  <td align="center"
                      style="mso-line-height-rule: exactly; background-color: #eceff1; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif;">
                      <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                              <td class="sm-py-32 sm-px-24"
                                  style="mso-line-height-rule: exactly; padding: 48px; text-align: center; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif;">
                                log
                              </td>
                          </tr>
                          <tr>
                              <td align="center" class="sm-px-24"
                                  style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly;">
                                  <table style="width: 100%;" class="main-table" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                          <td class="sm-px-24"
                                              style="mso-line-height-rule: exactly; border-radius: 4px; background-color: #ffffff; padding: 48px; text-align: right; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif; font-size: 16px; line-height: 24px; color: #626262;">
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin-bottom: 0; font-size: 20px; font-weight: 600;">
                                                    Verification email account</p>
                                              <div style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly;">
                                              You recently tried to update the contents of your account, which requires verification.
      </div>
      <br/>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px;">
                                                  <span> Ip address: </span>

                                                  <br/>
                                                  <span>Date: </span> ${new Date()}
                                              </p>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px;">
                                              Use this code to verify your identity.</p>
                                              

                                              <p
                                                 style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin-bottom: 24px; display: block; font-size: 22px; line-height: 100%; color: #7367f0; text-decoration: none; text-align: center">${
																										this.token
																									}</p>

                                                                                                    <p
                                                 style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin-bottom: 24px; display: block; font-size: 22px; line-height: 100%; color: #7367f0; text-decoration: none; text-align: center">${
																										this.message
																									}</p>
                    
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-top: 24px; margin-bottom: 24px;">
                                                  <span style="font-weight: 600;">Attention:</span> This code is valid for 2 minutes from the time it is sent to you and can only be used once .
                                              </p>
                              
                                              <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                  <tr>
                                                      <td style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; padding-top: 32px; padding-bottom: 32px;">
                                                          <div style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; height: 1px; background-color: #eceff1; line-height: 1px;">
                                                              &zwnj;
                                                          </div>
                                                      </td>
                                                  </tr>
                                              </table>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px;">
                                              Not sure why you received this email?
                                              please 
                                                  <a href="mailto:${
																										this.supportEmail
																									}" class="hover-underline"
                                                     style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; color: #7367f0; text-decoration: none;">
                                                  keep update us</a>
                                                      
                                              </p>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px;">
                                                   Your Pleasure
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; height: 20px;"></td>
                                      </tr>
                                      <tr>
                                          <td style="mso-line-height-rule: exactly; padding-left: 48px; padding-right: 48px; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; color: #eceff1;">
                                              <p align="center"
                                                 style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin-bottom: 16px; cursor: default;">
                                                  <a id="facebook-url" href=""
                                                     style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; color: #263238; text-decoration: none;"><img
                                                          src="" width="17" alt="facebook"
                                                          style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0; margin-right: 12px;"></a>
                                                  &bull;
                                                  <a id="instagram-url" href=""
                                                     style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; color: #263238; text-decoration: none;"><img
                                                          src="" width="17" alt="instagram"
                                                          style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0; margin-right: 12px;"></a>
                                              </p>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; color: #263238;">
                                              Use of our Services and Website is subject to our Terms of Use and Privacy Policy.                                              </p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; height: 16px;"></td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </div>
      </body>
      </html>
    `
	}
}
