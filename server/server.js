// Imports. These are our import packages //
const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./Routes')

// dotEnv config.
dotenv.config()

//Setting express info
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Express Routes


// app.use('/api', routes);

// Defining Port. Process.env for pre defined ports. ex. Azure
const port = process.env.PORT || 8080;

//Defining our database connection. Which should be in a .env file or as a server variable
const dbRoute = process.env.DB_ROUTE

//Database connection
mongoose.connect(dbRoute, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

//defining db connection
let DB = mongoose.connection;

//Starting the db server
DB.once('open', () => console.log('connected to the database'));
DB.on('error', console.error.bind(console, 'MongoDB connection error:'));

    //Starting the actual server
    app.listen(port, function() {
      console.log("App listening on PORT " + port);
    });

//Serving the actual react
var path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", function (req, res) {
   res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

