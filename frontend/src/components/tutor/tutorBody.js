import React  , {useEffect}from 'react'
import {Switch , Route} from 'react-router-dom'

import TutorLogin from './tutorLogin'
import TutorHeader from './tutorHeader';
import TutorRegister from './tutorRegister';
import TutorProfile from './tutorprofile';
import Footer from '../Footer';

import {useDispatch , useSelector} from 'react-redux'
import axios from 'axios';
import {tutordispatchLogin , fetchTutor , dispatchGetTutor} from './redux/actions/authAction'
import AddTutorial from './uploadTutes';
import TutorLanding from './tutorLanding';

function TutorBody() {

    const dispatch = useDispatch()
    const tutortoken = useSelector(state => state.tutortoken)
    const auth = useSelector(state => state.auth)
  
     useEffect(()=>{
        const tutorToken = localStorage.getItem('tutorToken')
        if(tutorToken){
          const getToken = async ()=>{
            const res = await axios.post('/tutor/tutor_refresh_token' , null)
            // console.log(res)
            dispatch({type : 'GET_TUTOR_TOKEN' , payload : res.data.access_token})
          }
          getToken()
        }
     },[auth.isLogged , dispatch])

     useEffect(()=>{
       if(tutortoken){
         const getTutor = () =>{
           dispatch(tutordispatchLogin())
           return fetchTutor(tutortoken).then(res=>{
             dispatch(dispatchGetTutor(res))
           })
         }
         getTutor()
       }

     }, [tutortoken , dispatch])
 
    return (
        <section>
            <TutorHeader />
            <Switch>
                <Route path = "/tutor" component ={TutorLanding} exact />
                <Route path = "/tutorlogin" component = {TutorLogin} exact/>
                <Route path = "/tutorregister" component = {TutorRegister} exact/>
                <Route path = "/tutorprofile" component = {TutorProfile} exact/>
                <Route path = "/uploadtute" component = {AddTutorial} exact />
                < Footer />
            </Switch>
            
        </section>
    )
}

export default TutorBody
