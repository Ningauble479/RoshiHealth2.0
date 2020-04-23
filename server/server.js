// Imports. These are our import packages //
const express = require("express");
const session = require("express-session");
const dotenv = require('dotenv')
const mongoose = require('mongoose')
import passport from 'passport';
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./models/TypeDefsGQL.js')
const resolvers = require('./models/ResolversGQL.js')
const bcrypt = require('bcrypt')
import initPassport from './passport'
import User from './models/mongooseModels'
import { buildContext } from 'graphql-passport';
import uuid from 'uuid/v4';
const cors = require('cors')

const SECRET_KEY = 'Keyboard_Cat'

const WS_PORT = 8888;

//Defining the Apollo Server Instance


initPassport({ User });







// const websocketServer = createServer((request, response) => {
//   response.writeHead(404);
//   response.end();
// });


// dotEnv config.
dotenv.config()

//Setting express info
const app = express();

app.use(session({
  genid: (req) => uuid(),
  secret: SECRET_KEY,
  resave: false, 
  saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session())

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};
app.use(cors(corsOptions));


//Express Routes


// app.use('/api', routes);

// Defining Port. Process.env for pre defined ports. ex. Azure
const port = process.env.PORT || 3333;

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
// websocketServer.listen(WS_PORT, () => console.log(
//   `Websocket Server is now running on http://localhost:${WS_PORT}`
// ));
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res, User }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});
//Applying express to Apollo
server.applyMiddleware({ app, cors: false });


    //Starting the actual server
    app.listen(port, () => {
      console.log(`App listening on PORT ${port} and Apollo on http://localhost:3000${server.graphqlPath} `);
    });


// const subscriptionServer = SubscriptionServer.create(
//   {
//     typeDefs,
//     execute,
//     subscribe,
//   },
//   {
//     server: websocketServer,
//     path: '/graphqlWS',
//   },
// );


//Serving the actual react
var path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", function (req, res) {
   res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}
