export default class EmailVerificationTemplate {
	supportEmail = "support@writeinbox.com"
	constructor(token) {
		this.token = token
	}

	render() {
		return `
    <!DOCTYPE html>
    <html lang="en">
    
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          /* Box sizing rules */
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
    
          /* Remove default margin */
          body,
          h1,
          h2,
          h3,
          h4,
          p,
          figure,
          blockquote,
          dl,
          dd {
            margin: 0;
          }
    
          /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
          ul[role='list'],
          ol[role='list'] {
            list-style: none;
          }
    
          /* Set core root defaults */
          html:focus-within {
            scroll-behavior: smooth;
          }
    
          /* Set core body defaults */
          body {
            min-height: 100vh;
            text-rendering: optimizeSpeed;
            line-height: 1.5;
            font-family: "Inter";
          }
    
          /* A elements that don't have a class get default styles */
          a:not([class]) {
            text-decoration-skip-ink: auto;
          }
    
          /* Make images easier to work with */
          img,
          picture {
            max-width: 100%;
            display: block;
          }
    
          /* Inherit fonts for inputs and buttons */
          input,
          button,
          textarea,
          select {
            font: inherit;
          }
    
          /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
          @media (prefers-reduced-motion: reduce) {
            html:focus-within {
              scroll-behavior: auto;
            }
    
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
    
          .relative {
            position: relative;
          }
    
          .flex {
            display: flex;
          }
    
          .flex-col {
            flex-direction: column;
          }
    
          .justify-center {
            justify-content: center;
          }
    
          .items-center {
            align-items: center;
          }
    
          .min-h-screen {
            min-height: 100vh;
          }
    
          .overflow-hidden {
            overflow: hidden;
          }
    
          .bg-gray-200 {
            background: rgb(229, 231, 235);
          }
    
          .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
    
          .px-8 {
            padding-left: 2rem
              /* 32px */
            ;
            padding-right: 2rem
              /* 32px */
            ;
          }
    
          .py-8 {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
    
          .py-4 {
            padding-top: 1rem
              /* 16px */
            ;
            padding-bottom: 1rem
              /* 16px */
            ;
          }
    
          .bg-white {
            background-color: #fff;
          }
    
    
          .h-6 {
            height: 1.5rem
              /* 24px */
            ;
          }
    
          .text-base {
            font-size: 1rem
              /* 16px */
            ;
            line-height: 1.5rem
              /* 24px */
            ;
          }
    
          .text-center {
            text-align: center;
          }
    
          .leading-7 {
            line-height: 1.75rem
              /* 28px */
            ;
          }
    
          .text-gray-600 {
            color: rgb(75, 85, 99);
          }
    
          .text-gray-700 {
            color: rgb(55, 65, 81);
          }
    
          .text-3xl {
            font-size: 1.875rem
              /* 30px */
            ;
            line-height: 2.25rem
              /* 36px */
            ;
          }
    
          .text-xl {
            font-size: 1.25rem
              /* 20px */
            ;
            line-height: 1.75rem
              /* 28px */
            ;
          }
    
          .font-bold {
            font-weight: 700;
          }
    
          .font-semibold {
            font-weight: 600;
          }
    
          .text-white {
            --tw-text-opacity: 1;
            color: rgb(255 255 255 / var(--tw-text-opacity));
          }
    
          .text-lg {
            font-size: 1.125rem
              /* 18px */
            ;
            line-height: 1.75rem
              /* 28px */
            ;
          }
    
          .text-sm {
            font-size: 0.875rem
              /* 14px */
            ;
            line-height: 1.25rem
              /* 20px */
            ;
          }
    
          .text-gray-500 {
            --tw-text-opacity: 1;
            color: rgb(107 114 128 / var(--tw-text-opacity));
          }
    
          .rounded-lg {
            border-radius: 0.5rem
              /* 8px */
            ;
          }
    
          .shadow-md {
            --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
          }
    
          .gap-y-8 {
            row-gap: 2rem;
          }
    
          .ring-1 {
            --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
            --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
            box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
          }
    
          .space-y-2> :not([hidden])~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
          }
    
    
          .space-y-10> :not([hidden])~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(2.5rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(2.5rem * var(--tw-space-y-reverse));
          }
    
          .space-y-4> :not([hidden])~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(1rem * var(--tw-space-y-reverse));
          }
    
          .bg-purple-700 {
            --tw-bg-opacity: 1;
            background-color: rgb(108 43 217 / var(--tw-bg-opacity));
          }
    
          @media (min-width: 640px) {
            .sm\:px-20 {
              padding-left: 5rem
                /* 80px */
              ;
              padding-right: 5rem
                /* 80px */
              ;
            }
          }
    
          @media (min-width: 640px) {
            .sm\:rounded-lg {
              border-radius: 0.5rem
                /* 8px */
              ;
            }
          }
    
          @media (min-width: 640px) {
            .sm\:mx-auto {
              margin-left: auto;
              margin-right: auto;
            }
          }
    
          @media (min-width: 640px) {
            .sm\:max-w-2xl {
              max-width: 42rem
                /* 672px */
              ;
            }
          }
        </style>
      </head>
    
      <body>
        <div class="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-200">
          <div
            class="relative flex flex-col items-center px-6 py-8 bg-white shadow-md gap-y-8 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-20">
            <header class="flex flex-col items-center space-y-2">
              <img src="https://i.ibb.co/993mWyp/logo.png" class="h-6" alt="Tailwind Play" />
              <img src="https://i.ibb.co/YPDNKnR/email-varification-image.png" />
            </header>
            <div class="space-y-10 text-base leading-7 text-gray-600 ">
              <div class="space-y-10 text-center">
                <div class="space-y-4">
                  <h1 class="text-3xl font-bold">Thanks for joining us, Raghav!</h1>
                  <p class="text-xl font-semibold text-gray-700">Your mentoring journey is about to begin. Confirm your
                    Verification code to make it official</p>
                </div>
                <p class="px-8 py-4 text-lg font-semibold text-white bg-purple-700 rounded-lg">Here’s your verification
                  code:
                  ${this.token}</p>
              </div>
              <div class="text-sm font-semibold leading-7 text-center text-gray-500 ">
                By confirming, you’ll be subscribed to our suggested notifications. You can
                <a href="#" class="text-purple-600"> customize your settings </a> or unsubscribe anytime.
              </div>
            </div>
          </div>
        </div>
      </body>
    
    </html>
    `
	}
}
