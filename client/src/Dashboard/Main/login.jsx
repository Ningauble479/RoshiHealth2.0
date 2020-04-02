import React, { useState } from 'react'
import axios from 'axios'


export default (props)=>{
    

    let [email, changeEmail] = useState(null)
    let [password, changePassword] = useState(null)

    function Login(){
      axios.post('http://localhost:3000/login',{
        password: password,
        email: email
      })
    }

    return (
        <div>
          <h1>Login</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              Login()
              changeEmail('');
              changePassword('');
            }}
          >
            <input placeholder='email' value={email} onChange={(e)=>changeEmail(e.target.value)}/>
            <input placeholder='password' value={password} onChange={(e)=>changePassword(e.target.value)}/>
            <button type="submit">Login</button>
          </form>
        </div>
      );

}