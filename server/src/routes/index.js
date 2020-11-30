/**
 * Main application routes
**/
const config = require('../config');
const baseAPI = '/api';
exports.default = function(app) {

app.use(baseAPI+'/users', require('../api/authentication/users'));

// LASTLINE

}