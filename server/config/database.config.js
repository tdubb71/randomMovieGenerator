const mongoose = require('mongoose'),
    db = process.env.DB_URI;

mongoose.connect(`mongodb://localhost/${db}`,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("You are now in the mainframe"))
    .catch(err => console.log(`Something went wrong when connecting to the database`, err))

