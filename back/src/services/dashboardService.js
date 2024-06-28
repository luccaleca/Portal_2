// src/services/dashboardService
const tabelaVendasRepository = require('../repositories/tabelaVendasRepository');

const getDashboardData = (db, callback) => {
    tabelaVendasRepository.getSalesData(db, (err, SalesData) => {
        if (err) {
            callback(err);
        } else {
            callback(null, {SalesData});
        }
    });
};

module.exports = getDashboardData;
