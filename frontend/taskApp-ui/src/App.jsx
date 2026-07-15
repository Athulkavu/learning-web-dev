// import { useState, useEffect } from 'react'


// function App() {
//   const [products,setProducts] = useState([]);
//   const [serverError,setServerError] = useState('');
//   useEffect(()=>{
//     (async ()=>{
//       try {
//         const response = await fetch('http://localhost:3344/products');
//         console.log( response);
//         setProducts(response.data);
//       } catch (error) {
//         setServerError(err.message);
//       }
//     })
//   },[]);
//   useEffect(()=>{
//     document.title = `total-${products.length} products` ;
//   },[products])

//   return (
//     <div>
//       <h1>Taskify </h1>
//       <h2>Listing tasks-{products.length} </h2>
//       {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
//     </div>
//   )
// }

// export default App

import { useState, useEffect } from 'react';
// import axios from 'axios';
import axios from './config/axiosConfig.js';
import TasksContext from './contexts/TasksContext.jsx';
import TasksList from './components/TasksList.jsx';
import TaskForm from './components/TaskForm.jsx';
function App() {
  // const [products, setProducts] = useState([]);
  // const [serverError, setServerError] = useState('');
  const [products,setProducts]=useState({data:[],serverError:'',editId:null,isLoading:true})

  useEffect(() => {
    (async () => {
      try {
        // const response = await axios('http://localhost:3344/products');
             const response = await axios('/products');
      //  console.log(response.data);
        // const data = await response.json();
        // setProducts(response.data);
        setProducts({...products,data:response.data});
        // setProducts((prevState)=>{
          // return{}...prevState,data:response.data}
        // })
        // setProducts((prevState)=>({...prevState,data:response.data}))  grouping op

      } catch (error) {

        // setServerError(error.message);
        setProducts({...products,serverError:error.message})
      }
    })(); 
  }, []); 

  useEffect(() => {
    document.title = `total-${products.data.length} products`;
  }, [products]);

  const removeTask=(_id)=>{
    // const result=products.filter((ele)=>{
      const result=products.data.filter((ele)=>{
      return ele._id != _id
    });
    // setProducts(result);
    setProducts({...products,data:result});
  }

  const addProduct=(product)=>{
    // setProducts([...products,product]);
    setProducts({...products,data:[...products.data,product]});//reac &redux usde this type
    // products.data.push(product)//react toolkit uses this->mutable code->but internaaly converted to immutable using immerJs library
  }

  const editProduct=(product)=>{
    const result=products.data.map(ele=>{
      if(ele._id==product._id){
        return {...product}
      }
      else{
        return {...ele}
      }
     
    })
     setProducts({...products,data:result})
  }

  const assignEditId=(id)=>{
    // setProducts({...products,editId:id});b/c when assignEditId(null); in edit in taskfrom some error comes so use the callback fn and prevstate
    setProducts((prevState)=>{
      return {...prevState,editId:id}
    })
  }

  return (
    <div>
      <h1>Taskify</h1>
      {/* <h2>Listing tasks-{products.length}</h2> */}
      <h2>Listing tasks-{products.data.length}</h2>
      {/* {serverError && <p style={{ color: 'red' }}>{serverError}</p>} */}
       {products.serverError && <p style={{ color: 'red' }}>{products.serverError}</p>}
      {/* <TasksContext.Provider value={{ products,removeTask,addProduct}}> */}
      <TasksContext.Provider value={{ data:products.data,removeTask,addProduct,assignEditId,editId:products.editId,editProduct}}>
      <TasksList/>
      <TaskForm/>
      </TasksContext.Provider>
    </div>
  );
}

export default App;
