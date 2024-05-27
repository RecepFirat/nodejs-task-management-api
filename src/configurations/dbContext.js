const mongoose = require('mongoose');

const dbContext = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {

    })
    .catch((err) => {
        console.error(err);
    });
};



module.exports = dbContext;
