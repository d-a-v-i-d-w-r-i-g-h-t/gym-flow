const router = require('express').Router();

//to view session data
router.get('/', (req, res) => {
    const sessionData = req.session;
    res.json(sessionData);
});

module.exports = router;