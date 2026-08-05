const countInitialState=0;
const countreducer=(state=countInitialState,action)=>{
    // if(action.type==="INCREMENT"){
    //     return state+1;
    // }
    // else{
    // return state;
    // }
    switch(action.type){
        case 'INCREMENT':{
            return state+1
        }
        case 'DECREMENT':{
            return state-1
        }
        case 'INCREMENT_BY':{
            return state+action.payload
        }
        case 'RESET':{
            return countInitialState;
        }
        default:{
            return state
        }
    }
}
export default countreducer;