import React from "react";
import './notification.css'

export const showErrMsg = (msg)=>{
    return(
        <div className = "errmsg">{msg}</div>
    )
}

export const showSuccessMsg = (msg)=>{
    return(
        <div className = "successmsg">{msg}</div>
    )
}