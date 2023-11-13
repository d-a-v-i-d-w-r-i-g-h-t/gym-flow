const router = require('express').Router();
const { Comment } = require('../../models');

// Get request for all comments by blog id
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
  })