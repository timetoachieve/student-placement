const mongoose = require("mongoose");

const DB =
  "mongodb+srv://mongodb123:mongo@123@clusterpro.tclrl.mongodb.net/project?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("no connection"));
