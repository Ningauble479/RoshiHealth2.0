import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import GetUsers from './ShowUsers'
import AddUser from './testMutation'
import UpdateUser from './updateUser'
import Login from './login'
import { gql } from 'apollo-boost';
import { useQuery } from "@apollo/react-hooks";
import ShowLoggedIn from './showLoggedIn'
import GetUser from './showYourUser'
import ShowUserButton from './getUserButton'

const SHOW_USERS = gql`
  {
    getUsers {
        _id
        userName
        email
      }
  }
`;

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
    currentUser {
      _id
      userName
      email
    }
  }
`;

const SHOW_USER = gql`
 query showUser {
   user @client
 }
`




class App extends Component{

  render(){
  return (
    <div className="App">
      <GetUsers SHOW_USERS={SHOW_USERS}/>
      <ShowLoggedIn IS_LOGGED_IN={IS_LOGGED_IN} SHOW_USER={SHOW_USER}/>
      <AddUser/>
      <Login SHOW_USERS={SHOW_USERS}/>
      <UpdateUser/>
      <GetUser SHOW_USER={SHOW_USER}/>
      <ShowUserButton SHOW_USER={SHOW_USER}/>
      {/* <Header/>
      <Sidebar/> /*}
      {/* Routes will go here */}
      {/* <div>
        <Route exact path='/main/tasks'
        render={<Tasks {...props} state={this.state}/>}/>
      </div>
      <Footer/> */}
    </div>
  );}
}

export default App;
