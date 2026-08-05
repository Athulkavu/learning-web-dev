import React,{useState} from "react";
// we are reusing the addNumber action and reducer here b/c same thing is doing
import { addNumber } from "../../actions/numbersAction";
import { useDispatch } from "react-redux";
const AddNUmber=(props)=>{
    const dispatch=useDispatch();
    const [number,setNumber]=useState('');
    const handleChange=(e)=>{
        setNumber(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const num={
            id:Number(new Date()),
            value:Number(number)
        }
        // console.log(num);
        dispatch(addNumber(num));
        setNumber('');//reseting form after number stored
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={number} onChange={handleChange}/>
        </form>
        </>
    )
}

export default AddNUmber