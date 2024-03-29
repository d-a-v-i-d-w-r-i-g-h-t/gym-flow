const router = require('express').Router();
const { User, Routine, Exercise, Comment, Like } = require('../models');
const withAuth = require('../utils/authorize');
const commonDataMiddleware = require('../utils/commonDataMiddleware');
const Sequelize = require('sequelize');
// use middleware to add common data to the response locals
router.use(commonDataMiddleware);

//getting the homepage
router.get('/', async (req, res) => {
    try {
        const homePage = true;
        res.render('homepage', {
            homePage,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route for all routines on the discover page
router.get('/discover', async (req, res) => {
    try {

        const discoverPage = true;

        // get all routines
        const routinesData = await Routine.findAll({
            where: {

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
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'date_created'],
                    include: [
                        {
                            model: User,
                            attributes: ['user_name'],
                        },
                    ],
                    order: [['date_created', 'DESC']] // sort by date_created in descending order
                },
            ],
        });

        const routines = await Promise.all(routinesData.map(async (routine) => {
            const plainRoutine = routine.get({ plain: true });

            // get like count for each routine
            const likeCount = await routine.countUsers();

            // check if current user has liked this routine
            const userLiked = req.session.logged_in ?
                await routine.hasUser(req.session.user_id, { through: 'Like' }) : false;

            // get comment count for each routine
            const commentCount = await routine.countComments();

            // check if current user has commented on this routine
            const userCommented = req.session.logged_in ?
                await routine.hasUser(req.session.user_id, { through: 'Comment' }) : false;

            // check if current user has saved this same routine name
            let userSaved = false;
            if (req.session.user_id) {
                const existingRoutine = await Routine.findOne({
                    where: {
                        routine_name: plainRoutine.routine_name,
                        user_id: req.session.user_id,
                        },
                });
                
                userSaved = existingRoutine ? true : false;
            }
            
            return {
                ...plainRoutine,
                likeCount,
                userLiked,
                commentCount,
                userCommented,
                userSaved,
            };
        }));

        res.render('discover', {
            routines,
            discoverPage,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


// GET route for all routines on the discover page, sorted by newest

router.get('/discover/newest', async (req, res) => {
    try {

        const discoverPage = true;

        // get all routines
        const routinesData = await Routine.findAll({
            where: {

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
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'date_created'],
                    include: [
                        {
                            model: User,
                            attributes: ['user_name'],
                        },
                    ],
                },
            ],
            order: [['date_created', 'DESC']]
        });

        const routines = await Promise.all(routinesData.map(async (routine) => {
            const plainRoutine = routine.get({ plain: true });

            // get like count for each routine
            const likeCount = await routine.countUsers();

            // check if current user has liked this routine
            const userLiked = req.session.logged_in ?
                await routine.hasUser(req.session.user_id, { through: 'Like' }) : false;

            // get comment count for each routine
            const commentCount = await routine.countComments();

            // check if current user has commented on this routine
            const userCommented = req.session.logged_in ?
                await routine.hasUser(req.session.user_id, { through: 'Comment' }) : false;

            // check if current user has saved this same routine name
            let userSaved = false;
            if (req.session.user_id) {
                const existingRoutine = await Routine.findOne({
                    where: {
                        routine_name: plainRoutine.routine_name,
                        user_id: req.session.user_id,
                        },
                });
                
                userSaved = existingRoutine ? true : false;
            }
            
            return {
                ...plainRoutine,
                likeCount,
                userLiked,
                commentCount,
                userCommented,
                userSaved,
            };
        }));

        res.render('discover', {
            routines,
            discoverPage,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


// GET route for all routines on the discover page, sorted by oldest

router.get('/discover/oldest', async (req, res) => {
    try {

        const discoverPage = true;

        // get all routines
        const routinesData = await Routine.findAll({
            where: {

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
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'date_created'],
                    include: [
                        {
                            model: User,
                            attributes: ['user_name'],
                        },
                    ],
                },
            ],
            order: [['date_created', 'ASC']]
        });

        const routines = await Promise.all(routinesData.map(async (routine) => {
            const plainRoutine = routine.get({ plain: true });

            // get like count for each routine
            const likeCount = await routine.countUsers();

            // check if current user has liked this routine
            const userLiked = req.session.logged_in ?
                await routine.hasUser(req.session.user_id, { through: 'Like' }) : false;

            // get comment count for each routine
            const commentCount = await routine.countComments();

            // check if current user has commented on this routine
            const userCommented = req.session.logged_in ?
                await routine.hasUser(req.session.user_id, { through: 'Comment' }) : false;

            // check if current user has saved this same routine name
            let userSaved = false;
            if (req.session.user_id) {
                const existingRoutine = await Routine.findOne({
                    where: {
                        routine_name: plainRoutine.routine_name,
                        user_id: req.session.user_id,
                        },
                });
                
                userSaved = existingRoutine ? true : false;
            }
            
            return {
                ...plainRoutine,
                likeCount,
                userLiked,
                commentCount,
                userCommented,
                userSaved,
            };
        }));

        res.render('discover', {
            routines,
            discoverPage,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET route to get all shared routines for a specific user id
router.get('/shared/:id', withAuth, async (req, res) => {
    try {
        const profile = true;

        // get all routines
        const routinesData = await Routine.findAll({
            where: {
                share: true,
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'user_name'],
                },
                {
                    model: Exercise,
                    attributes: ['id', 'name', 'weight', 'reps']
                },
            ],
        });

        const routines =
            await Promise.all(routinesData.map((routine) =>
                routine.get({ plain: true })));

        res.render('profile', {
            routines,
            profile,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET route to get all private routines for a specific user id
router.get('/private/:id', withAuth, async (req, res) => {
    try {
        const profile = true;

        // get all routines
        const routinesData = await Routine.findAll({
            where: {
                share: false,
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'user_name'],
                },
                {
                    model: Exercise,
                    attributes: ['id', 'name', 'weight', 'reps']
                },
            ],
        });

        const routines =
            await Promise.all(routinesData.map((routine) =>
                routine.get({ plain: true })));

        res.render('profile', {
            routines,
            profile,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


// GET route for discover page sorted by most comments

router.get('/discover/most-comments', async (req, res) => {
    try {
        const discoverPage = true;

        // get all routines with their comment counts
        const routinesData = await Routine.findAll({
            where: {
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
                },
                {
                    model: Comment,
                    attributes: [],
                },
            ],
            order: [
                [Sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.routine_id = routine.id)'), 'DESC']
            ],
        });
        

        const routines = await Promise.all(routinesData.map(async (routine) => {
            const plainRoutine = routine.get({ plain: true });

            // get like count for each routine
            const likeCount = await routine.countUsers();

            // check if current user has liked this routine
            const userLiked = req.session.logged_in ?
                await routine.hasUser(req.session.user_id, { through: 'Like' }) : false;

            // get comment count for each routine
            const commentCount = await routine.countComments();

            // check if current user has commented on this routine
            const userCommented = req.session.logged_in ?
                await routine.hasUser(req.session.user_id, { through: 'Comment' }) : false;

            // check if current user has saved this same routine name
            let userSaved = false;
            if (req.session.user_id) {
                const existingRoutine = await Routine.findOne({
                    where: {
                        routine_name: plainRoutine.routine_name,
                        user_id: req.session.user_id,
                        },
                });
                
                userSaved = existingRoutine ? true : false;
            }
            
            return {
                ...plainRoutine,
                likeCount,
                userLiked,
                commentCount,
                userCommented,
                userSaved,
            };
        }));

        res.render('discover', {
            routines,
            discoverPage,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


// GET route for discover page sorted by least comments

router.get('/discover/least-comments', async (req, res) => {
    try {
        const discoverPage = true;

        // get all routines with their comment counts
        const routinesData = await Routine.findAll({
            where: {
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
                },
                {
                    model: Comment,
                    attributes: [],
                },
            ],
            order: [
                [Sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.routine_id = routine.id)'), 'ASC']
            ],
        });
        

        const routines = await Promise.all(routinesData.map(async (routine) => {
            const plainRoutine = routine.get({ plain: true });

            // get like count for each routine
            const likeCount = await routine.countUsers();

            // check if current user has liked this routine
            const userLiked = req.session.logged_in ?
                await routine.hasUser(req.session.user_id, { through: 'Like' }) : false;

            // get comment count for each routine
            const commentCount = await routine.countComments();

            // check if current user has commented on this routine
            const userCommented = req.session.logged_in ?
                await routine.hasUser(req.session.user_id, { through: 'Comment' }) : false;

            // check if current user has saved this same routine name
            let userSaved = false;
            if (req.session.user_id) {
                const existingRoutine = await Routine.findOne({
                    where: {
                        routine_name: plainRoutine.routine_name,
                        user_id: req.session.user_id,
                        },
                });
                
                userSaved = existingRoutine ? true : false;
            }
            
            return {
                ...plainRoutine,
                likeCount,
                userLiked,
                commentCount,
                userCommented,
                userSaved,
            };
        }));

        res.render('discover', {
            routines,
            discoverPage,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});



// GET route to get all routines by the specified user_id
// req.params.username is not used, doesn't matter what param is passed
/// because it's grabbing the user_id from req.session.user_id

router.get('/profile/:username', withAuth, async (req, res) => {
    try {
        const profile = true;

        const routinesData = await Routine.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'user_name']
                },
                {
                    model: Exercise,
                    attributes: ['id', 'name', 'weight', 'reps']
                },
            ],
        });

        const routines = routinesData.map((routine) => routine.get({ plain: true }));
        res.render('profile', {
            routines,
            profile,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET request for rendering the create page
router.get('/create', withAuth, (req, res) => {
    try{
    const createPage = true;
    res.render('create', { createPage });
    }catch(err){
        res.status(500).json(err)
      }
});


// GET routine to get a single routine by routine ID, with associated exercises
router.get('/routine-edit/:id', withAuth, async (req, res) => {

    try {
        const routinesdb = await Routine.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Exercise,
                    attributes: ['id', 'name', 'weight', 'reps']
                }
            ]
        });
        const routines = routinesdb.get({ plain: true });
        const editPage = true;
        res.render('edit-routine', { routines, editPage });

    } catch (err) {
        res.status(500).json(err);
    }
});


// GET route to get a single exercise by Eercise id (primary key)

router.get('/routine-edit/edit-exercise/:id', async (req, res) => {
    try {
        const exercisedb = await Exercise.findOne({
            where: {
                id: req.params.id,
            },
            include: {
                model: Routine,
                attributes: ['id']
            }
        });
        const editExercise = true;
        const exercise = exercisedb.get({ plain: true });

        res.render('update-Exercise',{
            exercise,
            editExercise
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route for rendering a user profile page designated by user id
router.get('/profiles/:id', async (req, res) => {
    try {

        const discoverPage = true;

        // get all routines
        const routinesData = await Routine.findAll({
            where: {

                user_id: req.params.id,
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

        const routines = await Promise.all(routinesData.map(async (routine) => {
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



        res.render('other-profiles', {
            routines,
            discoverPage,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET request to render add-exercises page for a routine designated by routine id
router.get('/add-exercises/:id', async (req, res) => {
    try {
        const routinedb = await Routine.findOne({
            where: {
                id: req.params.id
            }
        });
        const addMoreExercises = true;
        const routines = routinedb.get({ plain: true });
        res.render('add-exercises', { routines, addMoreExercises });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET request for rendering the login page
router.get('/login', (req, res) => {
    try{
    res.render('login');
    }catch(err){
        res.status(500).json(err)
      }
});

// GET request for rendering the signup page
router.get('/signup', (req, res) => {
    try{
    res.render('signup');
    }catch(err){
        res.status(500).json(err)
      }
});



module.exports = router;