const express = require('express');
const app = express();
const cors = require('cors'); 
const { StatusCodes } = require('http-status-codes'); // Import HTTP status codes for better readability

// Import utility functions for number classifications and fun facts
const { isPrime, isPerfect, isArmstrong, getFunFact, isDigitSum } = require('./utils/numberFunctions');

// Enable CORS to allow requests from different origins
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json()); 

const PORT = process.env.PORT || 3000;

// Route to classify a number and return its properties
app.get('/api/classify-number', async (req, res) => {
    const number = req.query.number; // Retrieve the 'number' query parameter from the request

    // Check if a number is provided in the request
    if (!number) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            number: null,
            error: true
        });
    }

    // Convert the string input to a number
    const num = Number(number);

    // Validate that the input is a number
    if (isNaN(num)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            number: number,
            error: true
        });
    }

    const properties = []; // Initialize an array to store number properties

    // Check if the number is an Armstrong number
    if (isArmstrong(number)) {
        properties.push("armstrong");
    }

    // Check if the number is even or odd
    properties.push(number % 2 === 0 ? "even" : "odd");

    try {
        // Fetch a fun fact about the number
        const funFact = await getFunFact(num);

        // Construct the response object with various properties
        const result = {
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties,
            digit_sum: isDigitSum(num),
            fun_fact: funFact // Retrieve a fun fact about the number
        };

        res.status(StatusCodes.OK).json(result); // Send a successful response with number details
    } catch (error) {
        // Handle errors and send a bad request response
        res.status(StatusCodes.BAD_REQUEST).json({
            number: num,
            error: true
        });
    }
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
