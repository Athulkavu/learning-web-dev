  export const increment=()=>{
            return{
            type:'INCREMENT'
        }}
        // decrement action creator
  export const decrement=()=>{
            return{
            type:'DECREMENT'
        }}
         // reset action creator
  export const reset=()=>{
            return{
            type:'RESET'
        }}
        // incrementBy action creator
  export const incrementBy=(n)=>{
            return{
            type:'INCREMENT_BY',
            payload:n
        }}