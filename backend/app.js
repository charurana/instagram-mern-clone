const express = require('express');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error');
const path = require('path');

const app = express();

if (process.env.NODE_ENV !== "production") {
 require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const rootDir = path.resolve(__dirname, '..');

// uploads/public
app.use('/public', express.static(path.join(rootDir, 'public')));
app.use('/uploads', express.static(path.join(rootDir, 'public', 'uploads')));

// routes
const post = require('./routes/postRoute');
const user = require('./routes/userRoute');
const chat = require('./routes/chatRoute');
const message = require('./routes/messageRoute');
const notificationRoute = require('./routes/notificationRoute');

app.use('/api/v1', post);
app.use('/api/v1', user);
app.use('/api/v1', chat);
app.use('/api/v1', message);
app.use('/api/v1', notificationRoute);

// frontend build
if (process.env.NODE_ENV === 'production') {
 app.use(express.static(path.join(rootDir, 'frontend', 'build')));

 app.get('*', (req, res) => {
   res.sendFile(path.join(rootDir, 'frontend', 'build', 'index.html'));
 });
} else {
 app.get('/', (req, res) => {
   res.send('Server is Running! 🚀');
 });
}

app.use(errorMiddleware);

module.exports = app;
