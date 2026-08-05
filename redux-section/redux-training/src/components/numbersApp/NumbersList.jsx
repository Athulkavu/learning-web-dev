import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { decrementnumber,incrementnumber, removenumber } from "../../actions/numbersAction";
const NumbersList=(props)=>{
    const dispatch=useDispatch()
    const numbers=useSelector((state)=>{
        return state.numbers
    })
    const handleDecrement=(id)=>{
        dispatch(decrementnumber(id));
    }
    const handleIncrement=(id)=>{
        dispatch(incrementnumber(id));
    }
    const handleRemove=(id)=>{
        dispatch(removenumber(id));
    }
    return(
        <>
        <h2>NumbersList comp</h2>
        <ul>
            {numbers.map((num)=>{
                return <li key={num.id}>{num.value}
                <button onClick={()=>{handleIncrement(num.id)}}>+</button>
                <button onClick={()=>{handleDecrement(num.id)}}>-</button>
                <button onClick={()=>{handleRemove(num.id)}}>x</button></li>
            })}
        </ul>
        </>
    )
}

export default NumbersList