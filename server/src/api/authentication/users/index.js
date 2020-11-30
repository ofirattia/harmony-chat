const {Router} = require('express');

const controller = require('./user.controller');

var router = new Router();

/**
 * @api {post} /authentication/users/broadcastAction Broadcast Action
 * @apiName BroadcastAction
 * @apiGroup User

 * @apiParam {Object} action with type and payload.

 * @apiSuccess {Object} - broadcast the action to all.
 */
router.post('/broadcastAction', controller.broadcastAction);



module.exports = router;