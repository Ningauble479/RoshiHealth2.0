// Imports. These are our import packages //
const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./models/TypeDefsGQL.js')
const resolvers = require('./models/ResolversGQL.js')
const routes = require('./Routes')
const { User } = require('./models/mongooseModels');

import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';


const WS_PORT = 5000;

//Defining the Apollo Server Instance
const server = new ApolloServer({ typeDefs, resolvers });

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

function findUser(email){
  User.find(
    {'email': email},
    (err, data)=>{
      if(err){console.log(err)}
      else{console.log(data)}
    })
}


//Login Logic
app.post('/get-token', async (req, res) => {
  const { email, password } = req.body
  const user = findUser(email)
  if (user === true) {
  //we use bcrypt to compare the hash in the database (mock.js) to the password the user provides
      const match = await bcrypt.compare(password, user.password)
      if (match) {
          //we create the JWT for the user with our secret
          //inside the token we encrypt some user data
          //then we send the token to the user
          const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY)
          res.send({
              success: true,
              token: token,
          })
      } else {
          //return error to user to let them know the password is incorrect
          res.status(401).send({
              success: false,
              message: 'Incorrect credentials',
          })
      }
  } else {
      //return error to user to let them know the account there are using does not exists
      res.status(404).send({
          success: false,
          message: `Could not find account: ${email}`,
      })
  }
})