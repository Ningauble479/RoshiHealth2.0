import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'


const UPDATE_USER = gql`
mutation updateUser($id: ID!, $userName: String!, $email: String!) {
    updateUser(id: $id, userName: $userName, email: $email) {
      id
      userName
      email
    }
  }
`;

export default ()=>{
    let input;
    const [updateUser] = useMutation(UPDATE_USER);
    let [username, changeUsername] = useState(null)
    let [email, changeEmail] = useState(null)


    return (
        <div>
          <h1>Update a user</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              updateUser({ variables: { id:'5e8380b531f2ea3b48919824', userName: username, email: email } });
              changeUsername('');
              changeEmail('');
              alert('User Submitted')
            }}
          >
            <input placeholder='User Name' value={username} onChange={(e)=>changeUsername(e.target.value)}/>
            <input placeholder='email' value={email} onChange={(e)=>changeEmail(e.target.value)}/>
            <button type="submit">Add Todo</button>
          </form>
        </div>
      );

}