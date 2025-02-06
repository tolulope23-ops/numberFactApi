const express = require('express');
const app = express();
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');
const {isPrime, isPerfect, isArmstrong, getFunFact, isDigitSum} = require('./utils/numberFunctions')

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/api/classify-number', async(req, res) => {
    const number = (req.query.num);
    if(!number){
        return res.status(StatusCodes.BAD_REQUEST).json({
            number:null,
            error: true
        })
    }

    const num  = Number(number);  
    if(isNaN(num)){
        return res.status(StatusCodes.BAD_REQUEST).json({
            number:number,
            error: true
        })
    }
        const properties = [];
        if(isArmstrong(number))
            properties.push("armstrong");
        properties.push(number % 2 === 0 ? "even" : "odd");

    try {
        const funFact = await getFunFact(num)
        const result = {
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties,
            digit_sum: isDigitSum(num),
            fun_fact: funFact
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            number: num,
            error: true
        })
    } 
});

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
})