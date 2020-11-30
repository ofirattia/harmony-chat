/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /users/broadcastAction   ->  broadcastAction
 */

const _ = require('lodash');

exports.broadcastAction = function(req, res) {

    // broadcast to websocket
    console.log("RECEIVE API REQUEST - broadcastAction");
    req.app.get('wss').broadcastAction(req.body);
    res.status(200).send();


};