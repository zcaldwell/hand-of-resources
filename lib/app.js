const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/jojos', require('./controllers/jojos'));
app.use('/api/v1/fruits', require('./controllers/fruits'));
app.use('/api/v1/birthdays', require('./controllers/birthdays'));
app.use('/api/v1/berserk', require('./controllers/berserkcon'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
