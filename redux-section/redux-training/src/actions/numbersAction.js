
export const addNumber=(randomNum)=>{
    return{
        type:'ADD_NUMBER',
        payload:randomNum
    }
}

export const plusTwo=()=>{
    return{
        type:'PLUS_TWO'
    }
}

export const removeAll=()=>{
    return{
        type:'REMOVE_ALL'
    }
}

export const decrementnumber=(id)=>{
    return{
        type:'DECREMENT_NUMBER',
        payload:id
    }
}

export const incrementnumber=(id)=>{
    return{
        type:'INCREMENT_NUMBER',
        payload:id
    }
}

export const removenumber=(id)=>{
    return{
        type:'REMOVE_NUMBER',
        payload:id
    }
}