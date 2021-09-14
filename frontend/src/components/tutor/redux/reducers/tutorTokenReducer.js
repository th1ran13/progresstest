import ACTIONS from "../actions";

const tutortoken = ''

const tutorTokenReducer = (state = tutortoken , action ) =>{
    switch(action.type){
        case ACTIONS.GET_TUTOR_TOKEN:
            return action.payload
        default :
            return state
    }
}

export default tutorTokenReducer