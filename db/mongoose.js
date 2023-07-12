const mongoose = require('mongoose');
// require('dotenv/config')

mongoose.set('strictQuery', true);
// const dbUrl = process.env.PORT ? process.env.ONLINE_MONGODB_URL : process.env.MONGODB_URL;

const dbUrl = process.env.ONLINE_MONGODB_URL || process.env.MONGODB_URL
// phasionistarDB

mongoose.connect(dbUrl, {
// mongoose.connect('mongodb+srv://phasionistar:phasionistar@phasionistar.yjaev15.mongodb.net/API-PHASIONISTARDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
})
.then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
  