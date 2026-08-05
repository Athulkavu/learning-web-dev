import {createStore,combineReducers} from "redux";
import countreducer from "../reducers/countReducer";
const configureStore=()=>{
    const store=createStore(combineReducers({
        count:countreducer
    }))
    return store;
}
export default configureStore;