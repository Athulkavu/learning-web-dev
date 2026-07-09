import TaskContext from "../contexts/TasksContext";
import TaskItem  from "./TaskItem"
import { useContext } from "react";
export default function TasksList() {
  // const { products } = useContext(TaskContext);
  const { data } = useContext(TaskContext);
  // console.log('product data',products);
  return ( 
    <div>
        <h1>Tasks List component-controls</h1>
        <ul>
          {
            // products.map((ele)=>{
              data.map((ele)=>{
              return <TaskItem key={ele._id} {...ele}/>
            })
          }
        </ul>
    </div>
  )
}