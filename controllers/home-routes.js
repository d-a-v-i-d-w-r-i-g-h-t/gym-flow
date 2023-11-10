const router = require('express').Router();
const { User, Routine, Exercise } = require('../models');

//getting the homepage
router.get('/', async (req,res) => {
    try{
        const homePage = true;
        const loggedIn = req.session.logged_in;
        res.render('homepage',{
            homePage,
            loggedIn
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
        const loggedIn = req.session.logged_in;
        res.render('discover', { routines, loggedIn });
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
        const loggedIn = req.session.logged_in;
        res.render('discover-newest', { routines, loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/discover/oldest', async (req, res) => {
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
            order: [['date_created', 'ASC']]
        });

        const routines = routinesdb.map((routine) => routine.get({ plain: true }));
        const loggedIn = req.session.logged_in;
        res.render('discover-oldest', { routines, loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', async (req,res) => {
    try{
        const profile = true;
        const loggedIn = req.session.logged_in;
        res.render('profile',{
            profile,
            loggedIn
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

// GET request for rendering the login page
router.get('/login', (req, res) => {
    res.render('login');
});

// GET request for rendering the signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});


module.exports = router;