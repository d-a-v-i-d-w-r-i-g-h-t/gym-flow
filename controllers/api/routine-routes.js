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
router.get('/check-routine-name/', async (req, res) => {
// get URL format: /check-routine-name?routineName=yourRoutineName&userId=yourUserId

    try {
        const routineName = req.query.routineName;
        const userName = req.query.userId;
  
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
  
  

router.get('/:routine_name', async (req,res)=>{
    try{
        const findRoutine = await Routine.findOne({
            where:{
                routine_name: req.params.routine_name
            }
        });
        res.status(200).json(findRoutine);
    }catch(err){
        res.status(500).json(err)
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