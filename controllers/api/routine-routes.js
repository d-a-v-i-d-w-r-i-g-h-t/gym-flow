const router = require('express').Router();
const { Routines, Exercise, Users } = require('../../models');


router.get('/', async (req, res) => {
    try {
        const routinesdb = await Routines.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['user_name'],
                },
                {
                    model: Exercise,
                    attributes: ['id','name','weight', 'reps']
                }
            ]
        });
        res.status(200).json(routinesdb)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req,res) => {
    try{
        const postRoutine = await Routines.create({
            name: req.body.name,
            share: req.body.share,
            description: req.body.description,
            user_id: req.body.user_id
        });
        res.status(200).json(postRoutine);
    } catch(err){
        res.status(500).json(err)
    }
})

router.get('/:id', async (req,res) => {
    try{
        const findRoutine = await Routines.findByPk(req.params.id
        )
        res.status(200).json(findRoutine);
    } catch (err){
        res.status(500).json({message: "no routine at this id"})
    }
});

router.put('/:id', async (req,res)=> {
    try {
        const findRoutine = await Routines.findByPk(req.params.id);
        const updateRoutine = await findRoutine.update({
            name: req.body.name,
            share: req.body.share,
            description: req.body.description,
            user_id: req.body.user_id
        });
        res.status(200).json(updateRoutine)
    } catch(err){
        res.status(500).json(err)
    }
});

router.delete('/:id', async (req,res) => {
    try{
        const findRoutine = await Routines.findByPk(req.params.id);
        await findRoutine.destroy();
        res.status(200).json({message: "Routine Deleted!"})
    } catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;