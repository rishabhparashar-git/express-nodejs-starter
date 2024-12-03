const mongoose = require('mongoose');
const { DB_URI } = process.env;

module.exports = async () => {
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log(`💽 Database is Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
