import React, { useState } from 'react'
import axios from 'axios'


export default (props)=>{
    
    let [username, changeUsername] = useState(null)
    let [email, changeEmail] = useState(null)
    let [password, changePassword] = useState(null)

    function createUser(){
      axios.post('http://localhost:3000/createAccount',{
        userName: username,
        password: password,
        email: email
      })
      .then((res)=>console.log(res))
    }

    return (
        <div>
          <h1>Add a user</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              createUser()
              changeUsername('');
              changeEmail('');
              changePassword('');
            }}
          >
            <input placeholder='User Name' value={username} onChange={(e)=>changeUsername(e.target.value)}/>
            <input placeholder='email' value={email} onChange={(e)=>changeEmail(e.target.value)}/>
            <input placeholder='password' value={password} onChange={(e)=>changePassword(e.target.value)}/>
            <button type="submit">Add Todo</button>
          </form>
        </div>
      );

}