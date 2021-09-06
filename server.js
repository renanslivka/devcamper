const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const connectDB = require('./config/db')

//Load env vars
dotenv.config({path: './config/config.env'})

connectDB();

//Routes files
const bootcamps = require('./routes/bootcamps')

const app = express();

//Body parser
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running in ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1))
})
