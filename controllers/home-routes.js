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

router.get('/discover', async (req,res) => {
    try{
        const discover = true;
        res.render('discover',{
            discover
        });
    } catch(err) {
        res.render('Error')
    }
});

router.get('/profile', async (req,res) => {
    try{
        const profile = true;
        res.render('profile',{
            profile
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

// GET request for rendering the signup page
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});


module.exports = router;