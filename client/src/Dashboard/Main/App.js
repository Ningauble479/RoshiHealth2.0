import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import GetUsers from './ShowUsers'
import AddUser from './testMutation'
import UpdateUser from './updateUser'
import { gql } from 'apollo-boost';

const SHOW_USERS = gql`
  {
    getUsers {
        id
        userName
        email
      }
  }
`;



class App extends Component{

  render(){
  return (
    <div className="App">
      <GetUsers SHOW_USERS={SHOW_USERS}/>
      <AddUser SHOW_USERS={SHOW_USERS}/>
      <UpdateUser/>
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
