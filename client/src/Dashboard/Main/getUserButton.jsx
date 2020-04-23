import React from 'react'
import { useQuery, refetch } from '@apollo/react-hooks';




export default function GetUsers(props){
    const {loading, error, data, refetch } = useQuery(props.SHOW_USER);
    if(data){console.log(data)}
    return(
    <div>
        
        <h1>{
        !data ? 'hello'
        :
        data
        }</h1>
        
        <button onClick={()=>refetch()}>test</button>
        
    </div>
    )
    
}
