import {combineReducers} from 'redux'
import auth from './authReducer'
import tutortoken from './tutorTokenReducer'
import tutors from './tutorsReducer'

export default combineReducers({
    auth,
    tutortoken,
    tutors
})