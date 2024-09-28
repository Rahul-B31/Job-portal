import {thunk} from 'redux-thunk'
import {authReducer} from './Auth/reducer'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { companyReducer } from './Company/reducer'
import { jobReducer } from './Job/reducer'


const rootReducer = combineReducers({
    auth:authReducer,
    company:companyReducer,
    jobs:jobReducer
})
export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)