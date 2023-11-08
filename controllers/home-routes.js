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

module.exports = router;