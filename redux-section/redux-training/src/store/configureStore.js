import {createStore,combineReducers} from "redux";
import countreducer from "../reducers/countReducer";
import numbersReducer from "../reducers/numbersReducer";
const configureStore=()=>{
    const store=createStore(combineReducers({
        count:countreducer,
        numbers:numbersReducer
    }))
    return store;
}
export default configureStore;