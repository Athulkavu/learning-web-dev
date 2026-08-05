import React from "react";
import { addNumber, plusTwo, removeAll } from "../../actions/numbersAction";
import { useDispatch } from "react-redux";
const NumbersControl=(props)=>{
    const dispatch=useDispatch();
    const generateNumber=()=>{
        const randomNumber=Math.round(Math.random()*100);
        const num={
            id:Number(new Date()),
            value:randomNumber
        }
        dispatch(addNumber(num));
    }
    const handlePlusTwo=()=>{
        dispatch(plusTwo())
    }
    const handleRemoveAll=()=>{
        dispatch(removeAll());
    }
    return(
        <>
        <button onClick={generateNumber}>generate</button>
        <button onClick={handlePlusTwo}>+2</button>
        <button onClick={handleRemoveAll}>Remove All</button>
        </>
    )
}

export default NumbersControl