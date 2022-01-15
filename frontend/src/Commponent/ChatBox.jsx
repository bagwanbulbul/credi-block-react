import React from 'react'
import SingleChat from './SingleChat';

export default function ChatBox({ fetchAgain, setFetchAgain }) {
    
    return (
        <>
           
            

                <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                  


          
                 
               
        </>
    )
}
