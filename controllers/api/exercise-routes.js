const router = require('express').Router();
const { Exercise } = require('../../models');
const withAuth = require('../../utils/authorize');

//get all exercises
router.get('/', async (req,res) => {
  try{
    const exercisedb = await Exercise.findAll();
    res.status(200).json(exercisedb);
  }catch(err){
    res.status(500).json(err)
  }
})

// POST route to create an exercise
router.post('/', withAuth, async (req, res) => {
  try {
    const newExercise = await Exercise.create({
      name: req.body.name,
      weight: req.body.weight,
      reps: req.body.reps,
      routine_id: req.body.routine_id
    });

    res.status(201).json({ success: true, data: newExercise });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST route to bulkCreate multiple exercises at once
router.post('/bulk-create', withAuth, async (req, res) => {
  const exercisesToAdd = req.body;
  
  try {

    const createdExercises = await Exercise.bulkCreate(exercisesToAdd);
    res.status(201).json({ success: true, createdExercises });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
});

// PUT route to update an exercise
router.put('/:id', withAuth, async (req, res) => {
  try {
    const exerciseData = await Exercise.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!exerciseData[0]) {
      res.status(404).json({ success: false, message: 'No exercise found with this id!' });
      return;
    }

    res.status(200).json({ success: true, message: 'Exercise updated successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE route to delete an exercise
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const exerciseData = await Exercise.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!exerciseData) {
      res.status(404).json({ success: false, message: 'No exercise found with this id!' });
      return;
    }

    res.status(200).json({ success: true, message: 'Exercise deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
