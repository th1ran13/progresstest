import ACTIONS from "../actions";

const tutors = []

const tutorReducer = (state = tutors , action) =>{
    switch(action.type){
            case ACTIONS.GET_TUTORS:
            return action.payload
        default : 
           return state
    }
}

export default tutorReducer