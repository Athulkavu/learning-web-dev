function scheduleMeering(empName, custName, time,didMeet) {//factory fn -creating and returning an object
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let met = didMeet;
            if (met) {
                resolve(`${empName} visits ${custName}`)
            }
            else {
                reject(`${empName} did not visit ${custName}`)
            }
        }, time)
    })
}
Promise.all([scheduleMeering("s1", "c1", 5000,true),scheduleMeering("s2", "c2", 500,0),scheduleMeering("s3", "c3", 3000,true)])
   .then((values) => {
        console.log(values);
    })
    .catch((errMsg) => {
        console.log(errMsg);
    })
Promise.allSettled([scheduleMeering("s1", "c1", 5000,true),scheduleMeering("s2", "c2", 500,0),scheduleMeering("s3", "c3", 3000,true)])
   .then((values) => {
        console.log(values);
    })
    .catch((errMsg) => {
        console.log(errMsg);
    })

//example using axios
// Promise.all([ 
//                     axios.get('https://jsonplaceholder.typicode.com/users'), 
//                     axios.get('https://jsonplaceholder.typicode.com/posts'), 
//                     axios.get('https://jsonplaceholder.typicode.com/todos') 
//                 ])
//                 .then((values) => {
//                     // var usersResponse = values[0]; 
//                     // var postsResponse = value[1]; 
//                     // var todosResponse = values[2]; 
//                     const [usersResponse, postsResponse, todosResponse] = values; // es6
//                     console.log('users', usersResponse.data); 
//                     console.log('posts', postsResponse.data); 
//                     console.log('todos', todosResponse.data); 
//                 })
//                 .catch((err) => {
//                     console.log(err); 
//                 })





// scheduleMeering("s1", "c1", 5000)
//     .then((msg) => {
//         console.log(msg);
//     })
//     .catch((errMsg) => {
//         console.log(errMsg);
//     })

//     // This line declares a function named 'scheduleMeeting' that takes three parameters: empName (employee name), custName (customer name), and time (delay in milliseconds). The function is designed to simulate scheduling a meeting with asynchronous behavior. This approach is used because it encapsulates the meeting scheduling logic into a reusable, parameterized unit that can be called multiple times with different values, promoting code modularity and separation of concerns. Technically, this creates a function object in JavaScript's execution context that can be invoked later, with the parameters serving as local variables within the function's scope.
function scheduleMeeting(empName, custName, time) { 
// // This line returns a new Promise object, which is JavaScript's built-in mechanism for handling asynchronous operations. The Promise constructor takes an executor function with two parameters: resolve (to fulfill the promise) and reject (to reject it). This approach is used because it provides a standardized way to handle operations that complete at an unknown future time, allowing for cleaner asynchronous code compared to callback-based patterns. Technically, this creates a Promise instance that will eventually settle (either fulfilled or rejected), enabling the use of .then() and .catch() methods for handling the eventual outcome.
    return new Promise((resolve, reject) => {
// // This line uses setTimeout() to schedule a callback function to execute after a specified delay. The arrow function syntax (() => {}) creates an anonymous callback that will run when the timer expires. This approach is used to simulate real-world asynchronous operations like network requests or database queries that take time to complete, allowing the rest of the program to continue executing without blocking. Technically, setTimeout() is a Web API (or Node.js timer) that adds the callback to the event loop's timer queue, which will be executed after the call stack is clear and the specified delay has passed.
        setTimeout(() => {
// // This line declares a variable 'met' using the 'let' keyword and initializes it to true. This variable simulates whether a meeting actually occurred. The approach uses a hardcoded value for demonstration purposes, but in a real application, this would typically be determined by some business logic or external condition. Technically, 'let' creates a block-scoped variable that exists only within the setTimeout callback's execution context, preventing variable hoisting issues that could occur with 'var'. This demonstrates proper variable scoping in modern JavaScript.
            let met = true; 
// // This line begins a conditional statement that checks if the 'met' variable is truthy. This control flow structure determines whether the promise should be resolved or rejected based on the meeting outcome. The approach is used to demonstrate how promises can represent both successful and failed asynchronous operations, which is essential for robust error handling in asynchronous code. Technically, JavaScript evaluates the condition and executes the appropriate code block, with the if statement providing the branching logic that leads to either resolve() or reject() being called.
            if(met) {
// // This line calls the resolve() function with a template literal string that includes the employee and customer names. The resolve() function fulfills the promise with the provided value, marking the asynchronous operation as successful. This approach is used because it provides a clean way to pass result data from the asynchronous operation to the promise consumer. Technically, resolve() changes the promise's state from 'pending' to 'fulfilled' and stores the result value, which will be passed to any attached .then() handlers. The template literal syntax (backticks with ${}) allows for clean string interpolation of variables.
resolve(`${empName} visits ${custName}`); 
// // This line begins the else block that executes when the 'met' condition is falsy. This provides the alternative execution path for when the meeting doesn't occur, demonstrating comprehensive error handling in asynchronous operations. The approach ensures that both success and failure scenarios are accounted for, which is crucial for building reliable applications that handle edge cases properly. Technically, this creates a separate code path that will execute only when the if condition evaluates to false, leading to the reject() call in the next line.
            } else {
// // This line calls the reject() function with an error message string, marking the promise as rejected. The reject() function is used to indicate that the asynchronous operation failed, allowing for proper error handling downstream. This approach is essential for propagating errors through promise chains and ensuring that failures don't go unnoticed. Technically, reject() changes the promise's state from 'pending' to 'rejected' and stores the rejection reason, which will be passed to any attached .catch() handlers or the second argument of .then().
                reject(`${empName} did not visit ${custName}`)
            }
// // This line closes the setTimeout() function call, passing the 'time' parameter as the delay in milliseconds. The 'time' parameter determines how long the event loop will wait before executing the callback. This approach allows the function caller to control the delay duration, making the function more flexible and reusable for different timing scenarios. Technically, setTimeout() accepts the callback function as its first argument and the delay (in milliseconds) as its second argument, with the delay determining when the callback is added to the task queue for execution.
        }, time); 
    }); 
}

// // This line invokes the scheduleMeeting() function with specific arguments: "S1" (employee name), "C1" (customer name), and 5000 (5-second delay). This demonstrates how to use the previously defined function with concrete values. The approach shows practical application of the asynchronous function, with the 5000ms delay simulating a real-world waiting period. Technically, this function call returns a Promise object immediately (synchronously), but the actual meeting simulation occurs asynchronously after the specified delay.
scheduleMeeting("S1", "C1", 5000)
// // This line attaches a .then() handler to the promise returned by scheduleMeeting(). The .then() method registers a callback that will execute if/when the promise is fulfilled. This approach is used to handle successful asynchronous operations without blocking the main thread, following the promise pattern for clean async code. Technically, .then() returns a new promise and takes up to two arguments: a fulfillment handler (this one) and optionally a rejection handler. The arrow function syntax creates a concise callback that receives the resolved value.
    .then((msg) => {
// // This line logs the resolved message to the console. The 'msg' parameter contains the string returned by the resolve() call in the promise executor. This approach demonstrates how to consume the result of a successful asynchronous operation, which is a fundamental pattern in async programming. Technically, console.log() outputs the message to the standard output, and this execution occurs in a microtask (after the current synchronous code completes and the promise settles), demonstrating JavaScript's concurrency model.
        console.log(msg); 
    })
// // This line attaches a .catch() handler to the promise chain to handle any rejections that occur. The .catch() method is specifically designed for error handling in promise chains, providing a cleaner alternative to the second parameter of .then(). This approach centralizes error handling for the entire promise chain, making code more readable and maintainable compared to scattered error callbacks.
// Technically, .catch() is syntactic sugar for .then(null, rejectionHandler) and catches rejections from any preceding promises in the chain.
    .catch((errMsg) => {
// // This line logs the error message to the console when the promise is rejected. The 'errMsg' parameter contains the string passed to the reject() function in the promise executor. This approach ensures that errors are properly surfaced and not silently ignored, which is critical for debugging and monitoring asynchronous operations. Technically, this executes in the same microtask context as the .then() handler but only when the promise is rejected, demonstrating how promises cleanly separate success and error handling paths.
        console.log(errMsg); 
    })