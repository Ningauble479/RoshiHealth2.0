import React from 'react'
import { useQuery } from '@apollo/react-hooks';




export default function GetUsers(props){
    const { loading, error, data } = useQuery(props.SHOW_USER);
    
    if (loading) return <p>Loading...</p>;
    if (error) {
      console.log(error)
    return <p>Error :(</p>};
    if(data === null || undefined || !data) {
    console.log(data)
      return null
    }
    console.log(data)
    
return (<h1>What would you like to do </h1>)
    
}
