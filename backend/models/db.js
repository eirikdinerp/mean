import mongoose from 'mongoose';
let gracefulShutdown;

let dbURI = 'mongodb://localhost:27017/mean';
// 'mongodb://localhost:27017/issues',
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(
  dbURI,
  { useNewUrlParser: true }
);

const connection = mongoose.connection;

// CONNECTION EVENTS
connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// BRING IN YOUR SCHEMAS & MODELS
import './Issue';
import './User';
