const router = require('express').Router();
const unprotectedRouter = require('./unprotectedRoutes');
const auth = require('../middlewares/auth');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const undefinedRouter = require('./addressUndefined');

router.use('/', unprotectedRouter);

router.use(auth);

router.use('/', usersRouter);
router.use('/', moviesRouter);
router.use('/', undefinedRouter);

module.exports = router;
