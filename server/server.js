// Imports. These are our import packages //
const express = require("express");
var session = require("express-session");
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const typeDefs = require('./models/TypeDefsGQL.js')
const resolvers = require('./models/ResolversGQL.js')
const bcrypt = require('bcrypt')
const passport = require('./passport')
const { User } = require('./models/mongooseModels');
const cors = require('cors')

import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

const SECRET_KEY = 'Keyboard_Cat'

const WS_PORT = 5000;

const context = ({ req }) => {
  // get the user token from the headers
  console.log(req.user)
  try{
  if(req.user === true){

  }} catch{
    throw new AuthenticationError(

      `Authentication token ${token} is invalid, please log in`,
  )}
    
}

//Defining the Apollo Server Instance
const server = new ApolloServer({ typeDefs, resolvers, context });





const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});


// dotEnv config.
dotenv.config()

//Setting express info
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
  });
  app.use(session({ secret: SECRET_KEY, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Applying express to Apollo
server.applyMiddleware({ app });

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

// Bind it to port and start listening
websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));


    //Starting the actual server
    app.listen(port, function() {
      console.log(`App listening on PORT ${port} and Apollo on http://localhost:3000${server.graphqlPath} `);
    });


const subscriptionServer = SubscriptionServer.create(
  {
    typeDefs,
    execute,
    subscribe,
  },
  {
    server: websocketServer,
    path: '/graphqlWS',
  },
);

//Serving the actual react
var path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", function (req, res) {
   res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}



//Creating Account Logic
app.post('/createAccount', (req,res)=>{
  console.log('were creatin an account')

    let data = new User();
    let password = req.body.password
    console.log(password)
    data.password = password
    data.email = req.body.email
    data.userName = req.body.userName
    data.save((err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    })
})


//Login Logic
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user)
})