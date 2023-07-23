

const { createSecureHeaders } = require("next-secure-headers");

module.exports = {
    async headers() {
      return [{
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: "'self'",
              styleSrc: ["'self'"],
            },
          },
          forceHTTPSRedirect: [true, { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true }],
          referrerPolicy: "same-origin",
        })
      }];
    },
  };