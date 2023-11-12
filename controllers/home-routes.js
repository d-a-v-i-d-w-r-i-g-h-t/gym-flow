const router = require('express').Router();
const { User, Routine, Exercise } = require('../models');
const withAuth = require('../utils/authorize');
const commonDataMiddleware = require('../utils/commonDataMiddleware');

// use middleware to add common data to the response locals
router.use(commonDataMiddleware);

// getting the homepage
router.get('/', async (req, res) => {
    try{
        const homePage = true;
        // const loggedIn = req.session.logged_in;
        // const profileId = req.session.user_id;
        res.render('homepage',{
            homePage,
            // loggedIn,
            // profileId
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/discover', async (req, res) => {
    try {
        const discoverPage = true;

        // get all routines
        const routinesData = await Routine.findAll({
            where:{
                share: true,
            },
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

        const routines = await Promise.all(routinesData.map( async (routine) => {
            const plainRoutine = routine.get({ plain: true });
            
            // get like count for each routine
            const likeCount = await routine.countUsers();

            // check if current user has liked this routine
            const userLiked = req.session.logged_in ? await routine.hasUser(req.session.user_id) : false;
        
            return {
                ...plainRoutine,
                likeCount,
                userLiked,
            };
        }));
        console.log(routines);
        // const profileId = req.session.user_id;
        // const loggedIn = req.session.logged_in;
        res.render('discover', {
            routines,
            discoverPage,
            // loggedIn,
            // profileId
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
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
        // const loggedIn = req.session.logged_in;
        res.render('discover-newest', {
            routines,
            // loggedIn
        });
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
        // const loggedIn = req.session.logged_in;
        res.render('discover-oldest', {
            routines,
            // loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile/:id', withAuth, async (req, res) => {
    try{
        const profile = true;

        const loggedIn = req.session.logged_in;
        const routinesdb = await Routine.findAll({

            where: {
                user_id: req.session.user_id
            },
            include: [

            {
                model: User,
                attributes: ['id','user_name']
            },
            {
                model: Exercise,
                attributes: ['id', 'name', 'weight', 'reps']
            }
        ]

        });
        const routines = routinesdb.map((routine) => routine.get({ plain: true }));
        res.render('profile',{
            profile,
            // loggedIn,
            routines,
        });
        console.log(routines)
    } catch(err) {
        res.status(500).json(err);
    }
});

// GET request for rendering the create page
router.get('/create', withAuth, (req, res) =>{
    const createPage = true;
    res.render('create', {createPage});
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