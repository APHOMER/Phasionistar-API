const mongoose = require('mongoose');
// require('dotenv/config')

mongoose.set('strictQuery', true);
const dbUrl = process.env.ONLINE_MONGODB_URL
// phasionistarDB

// mongoose.connect(dbUrl, {
// mongoose.connect('mongodb+srv://phasionistar:phasionistar@phasionistar.yjaev15.mongodb.net/API-PHASIONISTARDB?retryWrites=true&w=majority', {
mongoose.connect('mongodb://0.0.0.0:27017/API-PHASIONISTARDB', { // 127.0.0.1:27017
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
  