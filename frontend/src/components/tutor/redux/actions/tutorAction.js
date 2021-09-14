import axios from "axios";
import ACTIONS  from "./index";


export const fetchAllTutors = async (tutortoken) => {
    const res = await axios.get('/tutor/tutorallinfo' , {
        headers : {Authorization : tutortoken}
    })
    return res
}

export const dispatchGetAllTutors = (res) => {
    return{
        type : ACTIONS.GET_TUTORS,
        payload : res.data,
           
    }
}
