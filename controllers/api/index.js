const router = require('express').Router();

const exerciseRoutes = require('./exercise-routes');
const routineRoutes = require('./routine-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./comments-routes');

const sessionRoutes = require('./session-routes');

router.use('/exercises', exerciseRoutes);
router.use('/routines', routineRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes)

router.use('/sessions', sessionRoutes);

module.exports = router;
