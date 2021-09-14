import axios from "axios";
import ACTIONS  from "./index";

export const tutordispatchLogin = () => {
    return {
        type : ACTIONS.LOGIN
    }
}

export const fetchTutor = async (tutortoken) => {
    const res = await axios.get('/tutor/tutorinfo' , {
        headers : {Authorization : tutortoken}
    })
    return res
}

export const dispatchGetTutor = (res) => {
    return{
        type : ACTIONS.GET_TUTOR_INFO,
        payload :{
            tutor : res.data,
            isAdmin : res.data.tutorRole === 1 ? true : false
        }
    }
}
