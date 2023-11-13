const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/authorize');

// GET request for all comments by routine id
router.get('/:routine_id', async (req, res) => {
    try{
      const commentdb = await Comment.findAll({
        where: {
            routine_id: req.params.routine_id,
          }
      });
      res.status(200).json(commentdb);
    }catch(err){
      res.status(500).json(err)
    }
});

// POST request for creating a new comment
router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        name: req.body.text,
        weight: req.body.date_created,
        reps: req.body.user_id,
        routine_id: req.body.routine_id
      });
  
      res.status(201).json({ success: true, data: newComment });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
});

// DELETE route to delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ success: false, message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json({ success: true, message: 'Comment deleted successfully!' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;