import express from 'express';
import jwt from 'express-jwt';

const auth = jwt({
  secret: 'secret',
  userProperty: 'payload'
});

import controller from '../../controllers/profile';

const router = express.Router();

router.get('/', auth, controller.profileRead);

module.exports = router;
