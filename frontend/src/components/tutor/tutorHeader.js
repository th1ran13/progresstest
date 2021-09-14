import React  , {useEffect}from 'react'
import {Link} from 'react-router-dom'
import './tutorHeader.css'

import {useDispatch , useSelector} from 'react-redux'
import axios from 'axios';
// import {tutordispatchLogin , fetchTutor , dispatchGetTutor} from './redux/actions/authAction'


function TutorHeader() {

    // const dispatch = useDispatch()
    // const tutortoken = useSelector(state => state.tutortoken)
    // const auth = useSelector(state => state.auth)
  
    //  useEffect(()=>{
    //     const tutorToken = localStorage.getItem('tutorToken')
    //     if(tutorToken){
    //       const getToken = async ()=>{
    //         const res = await axios.post('/tutor/tutor_refresh_token' , null)
    //         // console.log(res)
    //         dispatch({type : 'GET_TUTOR_TOKEN' , payload : res.data.access_token})
    //       }
    //       getToken()
    //     }
    //  },[auth.isLogged , dispatch])

    //  useEffect(()=>{
    //    if(tutortoken){
    //      const getTutor = () =>{
    //        dispatch(tutordispatchLogin())
    //        return fetchTutor(tutortoken).then(res=>{
    //          dispatch(dispatchGetTutor(res))
    //        })
    //      }
    //      getTutor()
    //    }

    //  }, [tutortoken , dispatch])
    const auth = useSelector(state => state.auth)
    const {tutor , isLogged} = auth

    const handleLogOut = async () =>{
      try{
        await axios.get('/tutor/tutorlogout')
        localStorage.removeItem('tutortoken')
        window.location.href = "/"
      }catch(err){
        window.location.href ="/"
      }
    }
    const tutorLink = () => {
        return <li className = "dropdown-nav">
              <Link to = "/">
                  {tutor.tutorFirstName}{" "}{tutor.tutorLastName}
                  {/* <i class="fas fa-caret-down"></i> */}
             </Link>
             <li><Link to = '/tutorprofile'>Profile</Link></li>
             <li><Link to = '/' onClick = {handleLogOut}>Log out</Link></li>

            </li>                   
    }
    return (
       <div className ="name">

              <ul>
                  {
                       isLogged ? tutorLink() 
                         : <li>
                           <Link to= '/tutorlogin'></Link>
                          </li>

                  }

              </ul>
              <Link to= '/tutor'>Become a Tutor</Link>

       </div>
    )
}

export default TutorHeader
