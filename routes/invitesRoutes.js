const express = require('express');
const router = express.Router();

const invitesController = require('../controllers/invitesController.js');

router.get('/', invitesController.invites);
router.post('/updateInviteStatus', invitesController.updateInviteStatus);
router.post('/updatePendingStatus', invitesController.updatePendingStatus);
router.post('/updateIgnoreStatus', invitesController.updateIgnoreStatus);

module.exports = router;
