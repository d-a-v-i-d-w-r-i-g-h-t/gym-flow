const router = require('express').Router();
const { Routine, Exercise, User, Like } = require('../../models');
const withAuth = require('../../utils/authorize');


router.get('/', async (req, res) => {
    try {
        const routinesData = await Routine.findAll({
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
        res.status(200).json(routinesData)
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to check if a routine name already exists in the database for specified user
router.get('/check-routine-name/:encodedRoutineName', async (req, res) => {

    try {
        const encodedRoutineName = req.params.encodedRoutineName;
        const routineName = decodeURIComponent(encodedRoutineName);
        const userId = req.session.user_id;

        // find one routine by routine name and user id
        const existingRoutine = await Routine.findOne({
            where: {
                routine_name: routineName,
                user_id: userId,
            },
        });

        // provide response if username is unique or not
        res.json({ isUnique: !existingRoutine });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
});
  
  
// GET route for single routine by routine name
router.get('/:routine_name', async (req,res)=>{
    try{
        const findRoutine = await Routine.findOne({
            where:{
                routine_name: req.params.routine_name,
                user_id: req.session.user_id,
            }
        });
        res.status(200).json(findRoutine);
    }catch(err){
        res.status(500).json(err)
    }
});

// GET route for routine ID by routine name
router.get('/routine-id/:encodedRoutineName', async (req,res)=>{
    try{
        const encodedRoutineName = req.params.encodedRoutineName;
        const routineName = decodeURIComponent(encodedRoutineName);

        const findRoutine = await Routine.findOne({
            attributes: ['id'],
            where:{
                routine_name: routineName,
                user_id: req.session.user_id,
            }
        });
        if (findRoutine) {
            const routineId = findRoutine.id;
            res.status(200).json({ id: routineId });
        } else {
            // routine not found
            res.status(404).json({ message: 'Routine not found' });
        }
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const postRoutine = await Routine.create({
            routine_name: req.body.routine_name,
            share: req.body.share,
            description: req.body.description,
            user_id: req.session.user_id,
        });
        res.status(200).json(postRoutine);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/search/:id', async (req, res) => {
    try {
        const findRoutine = await Routine.findOne({
            where: {
                id: req.params.id
            }
    })
        res.status(200).json(findRoutine);
    } catch (err) {
        res.status(500).json({ message: "no routine at this id" })
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const findRoutine = await Routine.findByPk(req.params.id);
        const updateRoutine = await findRoutine.update({
            routine_name: req.body.routine_name,
            share: req.body.share,
            description: req.body.description,
            user_id: req.body.user_id
        });
        res.status(200).json(updateRoutine)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const findRoutine = await Routine.findByPk(req.params.id);
        await findRoutine.destroy();
        res.status(200).json({ message: "Routine Deleted!" })
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT route to share a routine
router.put('/share/:routineId', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const routineId = req.params.routineId;

        const routine = await Routine.findOne({
            where: {
                id: routineId,
                user_id: userId,
            },
        });

        if (!routine) {
            // routine not found or doesn't belong to current user
            return res.status(404).json({ success: false, message: 'Routine not found or unauthorized.'})
        }

        // update share to true
        await routine.update({ share: true });

        return res.status(200).json({ success: true, message: 'Routine shared successfully.'});
    } catch (err) {
        console.error('Error sharing routine:', err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

// PUT route to unshare a routine
router.put('/unshare/:routineId', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const routineId = req.params.routineId;

        const routine = await Routine.findOne({
            where: {
                id: routineId,
                user_id: userId,
            },
        });

        if (!routine) {
            // routine not found or doesn't belong to current user
            return res.status(404).json({ success: false, message: 'Routine not found or unauthorized.'})
        }

        // update share to false
        await routine.update({ share: false });

        return res.status(200).json({ success: true, message: 'Routine unshared successfully.'});
    } catch (err) {
        console.error('Error unsharing routine:', err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});


// POST route to add a like
router.post('/like/:routineId', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const routineId = req.params.routineId;
    
        const existingLike = await Like.findOne({
            where: {
                user_id: userId,
                routine_id: routineId,
            },
        });

        if (existingLike) {
            // user already liked this routine
            return res.status(200).json({ success: false, message: 'User already liked this routine!' });
        }

        const newLike = await Like.create({
            user_id: userId,
            routine_id: routineId,
        });

        res.status(201).json({ success: true, data: newLike });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE route to delete a like
router.delete('/unlike/:routineId', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const routineId = req.params.routineId;

        const existingLike = await Like.findOne({
            where: {
                user_id: userId,
                routine_id: routineId,
            },
        });

        if (!existingLike) {
            return res.status(404).json({ success: false, message: 'Like not found!' });
        }

        await existingLike.destroy();
        res.status(200).json({ success: true, message: 'Routine unliked successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;