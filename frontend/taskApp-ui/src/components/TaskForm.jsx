import { useState,useContext,useEffect } from "react";
import TasksContext from "../contexts/TasksContext";
import axios from "../config/axiosConfig";
const formInitialData={
    name: "",
    price: "",

  }
export default function TaskForm(){
    const {addProduct,assignEditId,editId,data,editProduct}=useContext(TasksContext)
    const [form, setForm] = useState(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError,setServerError]=useState({});

    useEffect(()=>{
      if(editId){
        const product=data.find(ele=>ele._id===editId);
        console.log("product:",product);
        setForm({
          name:product.name,
          price:product.price
        })
      }
    },[editId])//when u use an outer fn in useEffect sometimes in some system u need to pass that in dependency array[setForm,editId]
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setIsSubmitted(true);
    if(!editId){
      try {
        const response=await axios.post('/create-product/',form)
        console.log(response.data);
        addProduct(response.data);
        setForm(formInitialData);
        setServerError({});
       
    } catch (error) {
        console.log(error.response);//analyse the error object data structor
        // console.log(error.response.data);
        // if(error.response.status===400){
            // setServerError(error.response.data.errors);
        // }
        setServerError(error.response.data.errors);
    }
    }
    else{
      axios.put('/update-product/'+editId,form)
      .then((response)=>{
        console.log(response.data);
        const data=response.data;
        editProduct(data);
        setForm(formInitialData);
        assignEditId(null);
      })
      .catch((err)=>{
        console.log(err);
      })
    }

  }
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setForm({...form,[name]:value})
    console.log(form);
    setIsSubmitted(false);
  }
  return(
    <div>
        <h2>
          {!editId?'Add':'Edit'}Task</h2>
          {
            editId&& <button onClick={()=>{
              assignEditId(null); 
              setForm(formInitialData)
            }}>cancel edit</button>
          }
         <form onSubmit={handleSubmit}>
         <input
          type="text"
          value={form.name}
          name="name"
          onChange={handleChange}
          placeholder="name"
        />
        <br />

      
        <input
          type="price"
          value={form.price}
          name="price"
          onChange={handleChange}
          placeholder="price"
        />
        <br />

        <button type="submit">Submit</button>
      </form>
      {isSubmitted &&
       (
        <div>
          <h3>Product:</h3>
          <p>name: {form.name}</p>
          <p>price: {form.price}</p>
        
        </div>
      )}
      {Object.keys(serverError).length !=0 &&(
        <>
        <h3>These error prohibited the form from being saved:</h3>
        <ul>
            {Object.keys(serverError).map((key,i)=>{
                return <li key={i}>{key}:{serverError[key].message}</li>
            })
            }
        </ul>
        </>
      )}
      
    </div>
    
  )
}