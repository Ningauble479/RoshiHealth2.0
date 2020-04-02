import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'


const ADD_USER = gql`
mutation addUser($userName: String!, $email: String!) {
    addUser(userName: $userName, email: $email) {
      id
      userName
      email
    }
  }
`;

export default (props)=>{
    let input;
    const [addUser] = useMutation(
      ADD_USER,
      {
        update(cache, { data: {addUser}}) {
          const { User } = cache.readQuery({query: props.SHOW_USERS})
          cache.writeQuery({
            query: props.SHOW_USERS,
            data: { User: User.concat([addUser])},
          })
        }
      }
      );
    let [username, changeUsername] = useState(null)
    let [email, changeEmail] = useState(null)


    return (
        <div>
          <h1>Add a user</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              addUser({ variables: { userName: username, email: email } });
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