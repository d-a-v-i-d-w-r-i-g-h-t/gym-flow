const router = require('express').Router();
const { Like } = require('../../models');
const withAuth = require('../../utils/authorize');

// POST route to add a like
router.post('/:routineId', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const routineId = req.params.routineId;

    const newLike = await Like.create({
      user_id: userId,
      routine_id: routineId,
    });

    res.status(201).json({ success: true, data: newLike });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



module.exports = router;
