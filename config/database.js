const mongoose = require("mongoose")

const dbConnection = () => {
  // connect with database
  mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`db connected: ${conn.connection.host}`);
    conn.get()
   })

}
module.exports = dbConnection;


