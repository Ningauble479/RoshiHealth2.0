import React from 'react'
import { useQuery } from '@apollo/react-hooks';




export default function GetUsers(props){
    const { loading, error, data } = useQuery(props.SHOW_USERS);
    
    if (loading) return <p>Loading...</p>;
    if (error) {
      console.log(error)
      return <p>Error :(</p>};
    console.log(data)
    return data.getUsers.map((row) => (
      <div>
        <p>
          {row.userName} : {row.email}
        </p>
      </div>
    ));
}
