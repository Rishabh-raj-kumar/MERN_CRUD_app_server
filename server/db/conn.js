const mongoose = require("mongoose");

const url = "mongodb+srv://Rishabh_db:rishabh_db_678@rishabhcluster.eebt3nr.mongodb.net/";

mongoose.connect(url,{
   useNewUrlParser : true,
   useUnifiedTopology : true,
})
.then(() => console.log('connection start'))
.catch((error) => console.log(error.message));