const router = require('express').Router();
const { User, Routine, Exercise } = require('../models');

//getting the homepage
router.get('/', async (req,res) => {
    try{
        const homePage = true;
        res.render('homepage',{
            homePage
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/discover', async (req, res) => {
    try {
        const routinesdb = await Routine.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
                {
                    model: Exercise,
                    attributes: ['id', 'name', 'weight', 'reps']
                }
            ]
        });
        console.log(routinesdb);
        const routines = await routinesdb.map((routine) => routine.get({ plain: true }));
        console.log(routines);
        res.render('discover', { routines });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/discover/newest', async (req, res) => {
    try {
        const routinesdb = await Routine.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
                {
                    model: Exercise,
                    attributes: ['id', 'name', 'weight', 'reps']
                }
            ],
            order: [['date_created', 'DESC']]
        });

        const routines = routinesdb.map((routine) => routine.get({ plain: true }));

        res.render('discover-newest', { routines }); // Assuming 'discover' is your view template
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', async (req,res) => {
    try{
        const profile = true;
        res.render('profile',{
            profile
        });
    } catch(err) {
        res.status(500).json(err);
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