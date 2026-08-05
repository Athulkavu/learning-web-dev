import react from 'react'
import { useDispatch } from 'react-redux';
import { increment } from './actions/countAction';
const Btn=(props)=>{
    const dispatch=useDispatch();
    return <button onClick={()=>{
        dispatch(increment());
    }}>+1 from btn component</button>
}

export default Btn;