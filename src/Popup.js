import React from 'react'
import { useState } from 'react';
const Popup = (props) => {
   
    return (props.trigger) ? (
        <div className="popup">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous"></link>
            <div className="popup_inner">
                <button onClick={()=>props.setTrigger(false)} >Close</button>
                
                {props.children}
            </div>

        </div >

    ) : "";
}

export default Popup
