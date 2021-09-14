import ACTIONS from "../actions";

const initialState = {
    tutor :[],
    isLogged : false,
    isAdmin : false
}

const authReducer = (state = initialState , action) =>{
    switch(action.type){
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged : true
            }
            case ACTIONS.GET_TUTOR_INFO:
            return {
                ...state,
                tutor : action.payload.tutor,
                isAdmin : action.payload.isAdmin
            }
        default : 
           return state
    }
}

export default authReducer