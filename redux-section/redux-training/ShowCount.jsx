import react from "react";
import { useSelector } from "react-redux";
const ShowCount=(props)=>{
    const count=useSelector((state)=>{
        return state.count;
    })
    return(
        <>
        <h2>count-{count}</h2>
        </>
    )
}

export default ShowCount;