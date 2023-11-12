// middleware function that adds common data to the response locals
const commonDataMiddleware = (req, res, next) => {

  res.locals.loggedIn = req.session.logged_in || false;
  res.locals.profileID = req.session.user_id || false;
  res.locals.username = req.session.user_name || false;
  
  next();
};

module.exports = commonDataMiddleware;