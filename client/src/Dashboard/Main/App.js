import React, {Component} from 'react';
import './App.css';
import {Route} from 'react-router-dom'

class App extends Component{
  constructor(props) {
    super(props);
    this.state={
      email: null,
      userPic: null
    }
  }
  


  render(){
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      {/* Routes will go here */}
      <div>
        <Route exact path='/main/tasks'
        render={<Tasks {...props} state={this.state}/>}/>
      </div>
      <Footer/>
    </div>
  );}
}

export default App;
