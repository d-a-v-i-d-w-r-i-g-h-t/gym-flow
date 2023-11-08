const router = require('express').Router();
const { Users, Routines, Exercise } = require('../models');

//getting the homepage
router.get('/', async (req,res) => {
    try{
        const homePage = true;
        res.render('homepage',{
            homePage
        });
    } catch(err) {
        res.render('Error')
    }
});

// GET request for rendering the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;