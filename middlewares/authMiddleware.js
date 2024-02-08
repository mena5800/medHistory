const jsonwebtoken = require("jsonwebtoken");

// const authMiddleware = (req, res, next)=>{
//   if ((req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT')) {
//     jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
//       if (err) req.user = undefined;
//       req.user = decode;
//       next();
//     });
//   } else {
//     req.user = undefined;
//     next();
//   }
// }
function getCookie(cookie, cookieName) {
  // Split the cookie string into an array of individual cookies
  if (cookie){
  var cookies = cookie.split(';');

  // Iterate through each cookie to find the one with the specified name
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();

      // Check if the cookie starts with the specified name
      if (cookie.startsWith(cookieName + '=')) {
          // Extract and return the cookie value
          return cookie.substring(cookieName.length + 1);
      }
  }
  return "";
  }
  // Return null if the cookie with the specified name is not found
  return "";
}



exports.authMiddleware = (req, res, next)=>{
  let cookie = getCookie(req.headers.cookie, "Authorization");
  if (cookie) {
    jsonwebtoken.verify(cookie, 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
}

exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

// function isAuthenticated(req, res, next) {
//   // Check if user is authenticated (you may implement your own logic here)
//   if (req.isAuthenticated()) { // Example: using passport.js for authentication
//       return next(); // User is authenticated, continue to the next middleware or route handler
//   }
//   // User is not authenticated, redirect to login page or send unauthorized response
//   res.redirect('/login'); // Redirect to the login page
// }









