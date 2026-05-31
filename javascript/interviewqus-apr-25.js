const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

app.post('/sum', (req, res) => {
    // Extract the "values" string from the request body
    const { values } = req.body;

    // Failsafe: if values is missing or not a string, return 0
    if (!values || typeof values !== 'string') {
        return res.json({ sum: 0 });
    }

    // Split the comma-separated string into an array of strings
    const stringArray = values.split(',');
    let totalSum = 0;

    for (let i = 0; i < stringArray.length; i++) {
        // Type conversion: string to number (trim removes accidental whitespace)
        const num = Number(stringArray[i].trim());

        // Type check: If the input is something like "ABC", it becomes NaN.
        // The lecture specifies returning 0 in this case.
        if (isNaN(num)) {
            return res.json({ sum: 0 });
        }

        // Add to the total sum
        totalSum += num;
    }

    // Return the response object matching the lecture's diagram
    res.json({ sum: totalSum });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});