import React , {useState} from 'react'
import { Link , useHistory } from "react-router-dom";
import axios from 'axios'
import './tutorLogin.css'
import { showErrMsg , showSuccessMsg} from "./notification";
import {tutordispatchLogin} from './redux/actions/authAction'
import {useDispatch} from 'react-redux'
import Footer from '../Footer';

const initialState = {
    tutorEmail : '',
    tutorPassword1 : '',
    err : '',
    success : ''
}
function TutorLogin() {
    
    const [tutor , setTutor] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()
    const {tutorEmail , tutorPassword1 , err , success} = tutor

    const handleChangeInput  = e =>{
        const {name , value} = e.target
        setTutor({...tutor , [name]:value , err:'' , success:''})
    }
    const onSubmit = async  e=>{
        e.preventDefault()
        try{

            const res = await axios.post('/tutor/tutorlogin' , {tutorEmail , tutorPassword1})
            setTutor({...tutor , err:'', success:res.data.msg})
            localStorage.setItem('tutorToken' , true)
            dispatch(tutordispatchLogin())
            history.push("/tutorprofile")
        }catch(err){
            err.response.data.msg && 
            setTutor({...tutor , err:err.response.data.msg , success:''})
        }
    } 
    
    return (
        <>
        <div className = "tutorLogin">
            <h2>Login</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)} 
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor = "tutorEmail">Email Address</label>
                    <input type = "text" placeholder = "Enter your Email" id = "tutorEmail" 
                     value = {tutorEmail} name = "tutorEmail"
                     onChange = {handleChangeInput}
                     />
                </div>

                <div>
                    <label htmlFor = "tutorPassword1">Password</label>
                    <input type = "password" placeholder = "Enter your Password" id = "tutorPassword1" 
                    value = {tutorPassword1} name = "tutorPassword1"
                    onChange = {handleChangeInput}
                    />
                </div>

                <div className = "buttons">
                    <button type = "submit">Login</button>
                    <Link to = "/tutorregister">Sign Up</Link>
                </div>
              
            </form>
            
        </div>
        < Footer />
        </>
    )
}

export default TutorLogin
