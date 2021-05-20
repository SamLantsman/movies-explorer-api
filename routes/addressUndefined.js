const router = require('express').Router();
const displayUndefinedAddress = require('../controllers/addressUndefined');

router.use('/*', displayUndefinedAddress);

module.exports = router;
