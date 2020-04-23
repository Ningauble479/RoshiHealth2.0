import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import ShowUser from './showYourUser'




export default function GetUsers(props){
    const { loading, error, data } = useQuery(props.IS_LOGGED_IN);
    
    if (loading) return <p>Loading...</p>;
    if (error) {
      console.log(error)
    return <p>Error :(</p>};
    if(data === null || undefined || !data) {
    console.log(data)
      return <p>Please Log in</p>
    }
    console.log(data)
    
    return (<React.Fragment>
    <h1>Hello {data.currentUser.email}</h1>
    <ShowUser SHOW_USER={props.SHOW_USER}/>
    </React.Fragment>
    )
    
}
