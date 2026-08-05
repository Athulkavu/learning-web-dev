import React from "react";
import { useSelector } from "react-redux";
import NumbersList from "./NumbersList";
import NumbersControl from "./NumbersControl";
import AddNUmber from "./AddNumber";
const NumbersContainer=(props)=>{
    const numbers=useSelector((state)=>{
        return state.numbers
    })
    const findSum=()=>{
        let sum=0;
        numbers.forEach((ele)=>{
            sum+=ele.value
        })
        return sum;

    }
    return(
        <>
        <h2>listing-{numbers.length},sum-{findSum()}</h2>
        <NumbersList/>
        <NumbersControl/>
        <AddNUmber/>
        </>
    )
}
export default NumbersContainer