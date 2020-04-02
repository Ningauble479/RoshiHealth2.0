import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Dashboard/Main/App';
import LandingPage from './LandingPage/Main/index'
import StoreMain from './Store/Main/index'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { resolvers, typeDefs } from "./Apollo/resolvers";
const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache,
  typeDefs,
  resolvers

});
cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
    bigChungus: true
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <Router>
          <Route path='/main' component={App}/>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/store' component={StoreMain}/>
        </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
