import React from 'react'
import { useQuery } from '@apollo/react-hooks';

import { useApolloClient } from "@apollo/react-hooks";




export default function GetUsers(props){
    const { loading, error, data } = useQuery(props.SHOW_USERS);
    
    const client = useApolloClient()
    
    if (loading) return <p>Loading...</p>;
    if (error) {
      console.log(error)
    return <p>Error :(</p>};
    if(data.getUsers === null) {
      return <p>Please Log in</p>
    }
    client.writeData({ data: { User: data.currentUser, isLoggedIn: true } });
    return data.getUsers.map((row) => (
      <div>
        <p>
          {row.userName} : {row.email}
        </p>
      </div>
    ));
}
