const router = require('express').Router();
const { Routine, Exercise, User } = require('../../models');
const withAuth = require('../../utils/authorize');


router.get('/', async (req, res) => {
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
        res.status(200).json(routinesdb)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const postRoutine = await Routine.create({
            name: req.body.name,
            share: req.body.share,
            description: req.body.description,
            user_id: req.body.user_id
        });
        res.status(200).json(postRoutine);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const findRoutine = await Routine.findByPk(req.params.id
        )
        res.status(200).json(findRoutine);
    } catch (err) {
        res.status(500).json({ message: "no routine at this id" })
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const findRoutine = await Routine.findByPk(req.params.id);
        const updateRoutine = await findRoutine.update({
            name: req.body.name,
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


module.exports = router;