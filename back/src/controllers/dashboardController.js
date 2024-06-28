// src/controllers/dashboardController
const dashboardService = require('../services/dashboardService');


exports.getDashboard = (req, res) => {
    const db = req.app.locals.db;
    dashboardService.getDashboardData(db, (err, data) => {
        if (err) {
            res.status(500).send('Erro no servidor');
        } else {
            res.json(data);
        }
    });
};