const express = require('express');
const router = require('./routes');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const mongoose = require('mongoose');
const { DB_URL } = require('./config');
const path = require('path');
const FRONT_URL = require('./config');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Database connection`
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: falses
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

app.use(cookieParser());
const corsOption = {
    credentials: true,  //==> to  to send or recieve cookie
    origin: [FRONT_URL],
};
app.use(cors(corsOption));
global.appRoot = path.resolve(__dirname);
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', router)

app.use(errorHandler);
app.listen(5000, () => {
    console.log("listening on port 5000");
})