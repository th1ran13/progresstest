import React from 'react'
import './tutorbutton.css'
import {Link} from 'react-router-dom'

function TutorBtn() {
    return (
        <div>
            <button className="tutorbtn"><Link to = '/tutorlogin'>Start Here ...</Link></button>
        </div>
    )
}

export default TutorBtn
