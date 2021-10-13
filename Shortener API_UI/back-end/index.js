const express = require('express');
const connectDB = require('./config/db');
const corsMiddleware = require('./cors');

const app = express();

//Connect to database
connectDB();

app.use(express.json({ extended: false }));
//Middleware to accept data from different ports
app.use(corsMiddleware);

//Define Routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} `))