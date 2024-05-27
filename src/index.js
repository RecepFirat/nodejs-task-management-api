const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbContext = require('./configurations/dbContext');
const authenticationRoutes = require("./routes/authentication");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user");
const exceptionHandler = require("./middlewares/exceptionHandler");
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();
app.use(cors({
   credentials:true,
}));

app.use(express.json({
   limit:'20mb',
   extended:true
}));
app.use(express.urlencoded({
   limit:'20mb',
   extended:true
}));


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);

app.use(helmet());
app.use(xss());

app.use('/api/auth', authenticationRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/user', userRoutes);



app.all('*',(req,res,next) => {
   const error = new Error(`Can't find ${req.originalUrl} on the server.`);
   error.status = "fail";
   error.statusCode = 404;
   next(error);
});
app.use(exceptionHandler);

dbContext();

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
});

module.exports = app;
