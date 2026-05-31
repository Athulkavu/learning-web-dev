//web worker.js
self.onmessage = function() {
    let sum = 0;
    // Massive loop to simulate a 3-5 second task
    for (let i = 0; i < 5000000000; i++) {
        sum += i;
    }
    self.postMessage("Task Finished! sum="+sum);
};