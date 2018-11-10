import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';

// database and configs
import './models/db';
import './config/passport';

// routes
import authRoutes from './routes/authentication';
import profileRoutes from './routes/profile';
import issuesRoute from './routes/issues';

const isProduction = process.env.NODE_ENV === 'production';

// initialize app
const app = express();

// Configuration
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/', authRoutes);
app.use('/profile', profileRoutes);
app.use('/issues', issuesRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch unauthorised errors
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: err.name + ': ' + err.message });
  }
});

app.listen(4000, () => console.log(`Express server running on port 4000`));
