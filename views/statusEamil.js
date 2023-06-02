export default class EmailVerificationTemplate {
  supportEmail = "support@writeinbox.com";
  constructor(status, message, process) {
    (this.status = status), (this.message = message), (this.process = process);
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
      <body  style=" text-align: right; margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #eceff1;">
      <div class="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-200"
      style="box-sizing: border-box; position: relative; display: flex; flex-direction: column; justify-content: center; min-height: 100vh; overflow: hidden; background-color: rgb(229, 231, 235);">
      <div
        class="relative flex flex-col items-center px-6 py-8 bg-white shadow-md gap-y-8 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-20"
        style="box-sizing: border-box; position: relative; display: flex; flex-direction: column; align-items: center; background-color: #fff; --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); row-gap: 2rem; --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color); padding: 2rem 1.5rem;">
        <header class="flex flex-col items-center space-y-2"
          style="box-sizing: border-box; display: flex; flex-direction: column; align-items: center;">
          <img src="https://i.ibb.co/993mWyp/logo.png" class="h-6" alt="Tailwind Play"
            style="box-sizing: border-box; max-width: 100%; display: block; height: 1.5rem;">
          <img src="https://i.ibb.co/YPDNKnR/email-varification-image.png"
            style="box-sizing: border-box; max-width: 100%; display: block; --tw-space-y-reverse: 0; margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));">
        </header>
        <div class="space-y-10 text-base leading-7 text-gray-600 "
          style="box-sizing: border-box; font-size: 1rem; line-height: 1.75rem; color: rgb(75, 85, 99);">
          <div class="space-y-10 text-center" style="box-sizing: border-box;" align="center">
            <div class="space-y-4" style="box-sizing: border-box;">
              <h1 class="text-3xl font-bold"
                style="box-sizing: border-box; font-size: 1.875rem; line-height: 2.25rem; font-weight: 700; margin: 0;">
                Thanks for joining us, Raghav!</h1>
              <p class="text-xl font-semibold text-gray-700"
                style="box-sizing: border-box; color: rgb(55, 65, 81); font-size: 1.25rem; line-height: 1.75rem; font-weight: 600; --tw-space-y-reverse: 0; margin: calc(1rem * calc(1 - var(--tw-space-y-reverse))) 0 calc(1rem * var(--tw-space-y-reverse));">
                Your mentoring journey is about to begin. Confirm your
                Verification code to make it official</p>
            </div>
            <p class="px-8 py-4 text-lg font-semibold text-white bg-purple-700 rounded-lg"
              style="box-sizing: border-box; font-weight: 600; --tw-text-opacity: 1; color: rgb(255 255 255 / var(--tw-text-opacity)); font-size: 1.125rem; line-height: 1.75rem; border-radius: 0.5rem; --tw-space-y-reverse: 0; --tw-bg-opacity: 1; background-color: rgb(108 43 217 / var(--tw-bg-opacity)); margin: calc(2.5rem * calc(1 - var(--tw-space-y-reverse))) 0 calc(2.5rem * var(--tw-space-y-reverse)); padding: 1rem 2rem;">
              Here’s your verification
              code:
              your are ${this.status} , and please complete the ${this.process}, and with the status ${this.message}</p>
          </div>
          <div class="text-sm font-semibold leading-7 text-center text-gray-500 "
            style="box-sizing: border-box; line-height: 1.25rem; font-weight: 600; font-size: 0.875rem; --tw-text-opacity: 1; color: rgb(107 114 128 / var(--tw-text-opacity)); --tw-space-y-reverse: 0; margin-top: calc(2.5rem * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(2.5rem * var(--tw-space-y-reverse));"
            align="center">
            By confirming, you’ll be subscribed to our suggested notifications. You can
            <a href="#" class="text-purple-600" style="box-sizing: border-box;"> customize your settings </a> or
            unsubscribe anytime.
          </div>
        </div>
      </div>
    </div>
    
      </body>
      </html>
    `;
  }
}
