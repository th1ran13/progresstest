import React , {useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { showErrMsg , showSuccessMsg} from "./notification";
//import TutorHeader from "./tutorHeader";
//import { login } from "./tutorFunction";
import Footer from '../Footer';


const initialState = {
    tutorFirstName : '',
    tutorLastName : '',
    tutorEmail : '',
    tutorFaculty : '',
    tutorSpecialization : '',
    tutorSubject : '',
    tutorExperiene : '',   
    tutorPassword1 : '',
    err : '',
    success : ''
}

function TutorRegister(){

    const [tutor , setTutor] = useState(initialState)
    
    const {tutorFirstName , tutorLastName, tutorEmail, tutorFaculty,tutorSpecialization , tutorSubject, 
        tutorExperiene , tutorPassword1 , err , success} = tutor

    const handleChangeInput  = e =>{
        const {name , value} = e.target
        setTutor({...tutor , [name]:value , err:'' , success:''})
    }
    const onSubmit = async  e=>{
        e.preventDefault()
        try{
            const res = await axios.post('http://localhost:8050/tutor/tutorregister' , {
                tutorFirstName ,tutorLastName ,tutorEmail , tutorFaculty ,
                tutorSpecialization ,tutorSubject ,tutorExperiene , tutorPassword1 ,
            })  
            setTutor({...tutor , err:'' , success:res.data.msg})       

        }catch(err){
            err.response.data.msg && 
            setTutor({...tutor , err:err.response.data.msg , success:''})
        }
    } 
    return(
        <>
        <div className = "tutorLogin">
            <h2>Want to Become a Tutor ?</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)} 
            <form onSubmit = {onSubmit}>
                <div>
                    <label htmlFor = "tutorFirstName">First Name</label>
                    <input type = "text" placeholder = "Enter your First Name" id = "tutorFirstName" 
                    value = {tutorFirstName} name = "tutorFirstName"
                    onChange = {handleChangeInput}/>
                </div>

                <div>
                    <label htmlFor = "tutorLastName">Last Name</label>
                    <input type = "text" placeholder = "Enter Last Name" id = "tutorLastName" 
                    value = {tutorLastName} name = "tutorLastName"
                    onChange = {handleChangeInput}/>
                </div>

                <div>
                    <label htmlFor = "tutorEmail">Email Address</label>
                    <input type = "text" placeholder = "Enter your Email" id = "tutorEmail" 
                    value = {tutorEmail} name = "tutorEmail"
                    onChange = {handleChangeInput}/>
                </div>

                <div>
                    <label htmlFor = "tutorFaculty">Faculty</label>
                    <input type = "text" placeholder = "EX : Faculty of Computing" id = "tutorFaculty" 
                    value = {tutorFaculty} name = "tutorFaculty"
                    onChange = {handleChangeInput}/>
                </div>

                <div>
                    <label htmlFor = "tutorSpecialization">Specialization</label>
                    <input type = "text" placeholder = "EX : Data Science" id = "tutorSpecialization" 
                    value = {tutorSpecialization} name = "tutorSpecialization"
                    onChange = {handleChangeInput}/>
                </div>

                <div>
                    <label htmlFor = "tutorSubject">From Which Sector You want to become a Tutor</label>
                    <input type = "text" placeholder = "EX : R programming " id = "tutorSubject" 
                    value = {tutorSubject} name = "tutorSubject"
                    onChange = {handleChangeInput}/>
                </div>

                <div>
                    <label htmlFor = "tutorExperiene">Tell other's about you</label>
                    <input type = "text" placeholder = "Description" id = "tutorExperiene" 
                    value = {tutorExperiene} name = "tutorExperiene"
                    onChange = {handleChangeInput}/>
                </div>

                <div>
                    <label htmlFor = "tutorPassword1">Password</label>
                    <input type = "password" placeholder = "Enter your Password" id = "tutorPassword1" 
                    value = {tutorPassword1} name = "tutorPassword1"
                    onChange = {handleChangeInput}/>
                </div>

                <div className = "buttons">
                    <button type = "submit">Register</button>
                    <Link to = "/tutorlogin">Sign In</Link>
                </div>
              
            </form>
           
        </div>
        <Footer />
        </>
    )


}

export default TutorRegister