const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Heartbeat check successfull');
});

module.exports = router;