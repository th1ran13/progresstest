import React, {useState, useEffect} from "react";
import axios from 'axios'
import {useSelector , useDispatch} from 'react-redux'
import {Link , useHistory} from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from "./notification";
// import {fetchAllTutors , dispatchGetAllTutors} from '../redux/actions/tutorActions'
// import {fetchAllTutors , dispatchGetAllTutors} from '../../redux/actions/tutorActions'
import {fetchAllTutors , dispatchGetAllTutors} from './redux/actions/tutorAction'
import './tutorprofile.css'
// import Tutorials from "./tutorials";
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

function TutorProfile(){
    const tutortoken = useSelector(state => state.tutortoken)
    const tutorauth = useSelector(state => state.auth)
    const tutors = useSelector(state => state.tutors)
    // const history = useHistory()

    const {tutor , isAdmin} = tutorauth
    const [data , setData] = useState(initialState)
    const {tutorFirstName , tutorLastName , err , success} = data 
    // /*  tutorEmail , tutorFaculty , tutorSpecialization ,tutorSubject , tutorExperiene*/
    const [loading , setLoading] = useState(false)
    const [callback , setCallback] = useState(false)

    const tutordispatch = useDispatch()
    useEffect(()=>{
        if(isAdmin){
            return fetchAllTutors(tutortoken).then(res=>{
                tutordispatch(dispatchGetAllTutors(res))
            })
        }
    },[tutortoken , isAdmin , tutordispatch , callback])


    const handleChange = e =>{
        const {name, value} = e.target
        setData ({...data , [name] : value , err:'' , success:''})
        
    }

    const handleUpdate =() =>{
        if (tutorFirstName || tutorLastName)updateInfo()
    }

    const handleDelete = async (id)=>{
        try{
            if(tutor._id !== id){
                if(window.confirm("Are you want to delete this account ?")){
                    setLoading(true)
                    await axios.delete(`/tutor/tutordelete/${id}`,{
                        headers : {Authorization : tutortoken}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
           
        }catch{
            setData({...data , err : err.response.data.msg , success : ''})
        }
    }

    const updateInfo = () =>{
        try{
            axios.patch('/tutor/tutorupdate' , {
                tutorFirstName : tutorFirstName ? tutorFirstName : tutor.tutorFirstName,
                tutorLastName : tutorLastName ? tutorLastName : tutor.tutorLastName
            } , {
                headers : {Authorization : tutortoken}
            })
            setData({...data , err: '', success: "Update Success"})
        }catch(err){
            setData({...data , err: err.response.data.msg , success: ''})
        }
    }

    return (
        <>
        <div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success) }
        </div>
        <div className = "tutor_profile">
            <div className = "col-left">
                <h2>{isAdmin ? "Admin Dashboard" : "Tutor Profile"}</h2>

                <div className = "form-group">
                    <label htmlFor = "tutorFirstName">First Name</label>
                     <input type = "text" name = "tutorFirstName" id = "tutorFirstName"   
                         defaultValue = {tutor.tutorFirstName}
                         placeholder = "Your First Name" onChange={handleChange}                    
                    />
                </div>

                <div className = "form-group">
                    <label htmlFor = "tutorLastName">Last Name</label>
                     <input type = "text" name = "tutorLastName" id = "tutorLastName"   
                         defaultValue = {tutor.tutorLastName}
                         placeholder = "Your Last Name" onChange={handleChange}                    
                    />
                </div>

                <div className = "form-group">
                    <label htmlFor = "tutorEmail">Email</label>
                     <input type = "text" name = "tutorEmail" id = "tutorEmail"   
                         defaultValue = {tutor.tutorEmail}
                        //  placeholder = "Your Last Name"                     
                    />
                </div>

                <div className = "form-group">
                    <label htmlFor = "tutorFaculty">Faculty</label>
                     <input type = "text" name = "tutorFaculty" id = "tutorFaculty"   
                         defaultValue = {tutor.tutorFaculty}
                        //  placeholder = "Your Last Name"                     
                    />
                </div>

                <div className = "form-group">
                    <label htmlFor = "tutorSpecialization">Specialization</label>
                     <input type = "text" name = "tutorSpecialization" id = "tutorSpecialization"   
                         defaultValue = {tutor.tutorSpecialization}
                        //  placeholder = "Your Last Name"                     
                    />
                </div>

                <div className = "form-group">
                    <label htmlFor = "tutorSubject">Subject</label>
                     <input type = "text" name = "tutorSubject" id = "tutorSubject"   
                         defaultValue = {tutor.tutorSubject}
                        //  placeholder = "Your Last Name"                     
                    />
                </div>

                <div className = "form-group">
                    <label htmlFor = "tutorExperiene">Experience</label>
                     <input type = "text" name = "tutorExperiene" id = "tutorExperiene"   
                         defaultValue = {tutor.tutorExperiene}
                        //  placeholder = "Your Last Name"                     
                    />
                </div>

                <button disabled = {loading} onClick={handleUpdate}>UPDATE</button>

            </div>
            <div className = "col-right">
                <h2>{isAdmin ? "Tutors": "Tutorials"}</h2>
                <div style = {{overflowX : "auto"}}>
                    <table className = "tutors">
                        <thead>                        
                            <tbody>
                
                              {                                 
                                    tutors.map(tutor =>(
                                        
                                       <tr key = {tutor._id}>
                                         <td>{tutor._id}</td>
                                         <td>{tutor.tutorFirstName}</td>
                                         <td>{tutor.tutorLastName}</td>
                                         <td>{tutor.tutorEmail}</td>
                                         <td>
                                            <i className="fas fa-trash-alt" title="delete"
                                            onClick={() => handleDelete(tutor._id)} ></i>
                                             
                                        </td>
                                       </tr>
                                    ))
                              }
                           </tbody>
                        </thead>
                    </table>
                </div>
            </div>

            <div className = "tutorials">
                <section>
                    <Link to = '/uploadtute'>
                    <button>{isAdmin ? "": "Upload Your Tutorials"}</button>
                    </Link>
                
                </section>
                  
            </div>
            
        </div> 
        < Footer />
        </>
    )
}

export default TutorProfile