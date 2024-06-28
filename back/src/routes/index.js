
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');


router.get('/', (req, res) => {
    res.send('Bem-vindo ao Dashboard');
});

router.get('/dashboard', dashboardController.getDashboard)

module.exports = router;