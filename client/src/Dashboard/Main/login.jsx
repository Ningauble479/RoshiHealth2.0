import React, { useState } from 'react'
import axios from 'axios'
import {gql} from 'apollo-boost'
import {useMutation} from '@apollo/react-hooks'



const LOGIN = gql`
mutation Login($email: String!, $password: String!){
  login(email: $email, password: $password){
    user {
      _id
      userName
      email
    }
  }
}
`;

export default (props)=>{
    
    const [login] = useMutation(LOGIN)
    let [email, changeEmail] = useState(null)
    let [password, changePassword] = useState(null)



    return (
        <div>
          <h1>Login</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              login({ variables: { email: email, password: password } })
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