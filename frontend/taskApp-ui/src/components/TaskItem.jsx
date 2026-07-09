// import axios from "axios";
import axios from "../config/axiosConfig"
import TasksContext from "../contexts/TasksContext";
import { useContext } from "react";

export default function TaskItem({_id,name,price,createdAt,updatedAt}){
    const {removeTask,assignEditId}=useContext(TasksContext);
    const hanldeRemove=async ()=>{//here b/c only one product data is there so we can get it from lexical otherwise onclick ={()=>{hanldeRemove}}
        const confirm=window.confirm("Are you sure");
        if(confirm){
            try{
                // const response=await axios.delete(`http://localhost:3344/products/${_id}`);
                const response=await axios.delete(`/products/${_id}`);
                removeTask(response.data._id);//response.data._id=_id
            }
            catch(err){
                console.log(err);
            }
        }
    }
    return(
        // <li>{name}<button onClick={hanldeRemove}>remove</button></li>
        <li>{name} 
        <button style={{ color: 'blue' }} onClick={()=>{
            assignEditId(_id);
        }}>edit</button>
        <button style={{ color: 'red' }} onClick={hanldeRemove}>remove</button>
        </li>
    )
}