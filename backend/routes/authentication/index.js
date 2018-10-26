import express from 'express';
import jwt from 'express-jwt';

const auth = jwt({
  secret: 'secret',
  userProperty: 'payload'
});

import ctrlAuth from '../../controllers/authentication';
const router = express.Router();

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
