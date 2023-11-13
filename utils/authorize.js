const withAuth = async (req, res, next) => {
  try {

    if (!req.session.logged_in) {
      return res.redirect('/login');
      
    } else {
      next();
      
    }
  } catch (err) {
    next(err);
  }

};

module.exports = withAuth;
