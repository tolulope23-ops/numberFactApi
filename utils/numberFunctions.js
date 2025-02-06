//  Helper function for priime numbers
const isPrime = (number) => {
    if(number < 2) return false;
    for(let i = 2; i <= Math.sqrt(number); i++){
        if(number % i === 0){
            return false;
        }
    }
    return true;
}

//Helper function for perfect numbers
const isPerfect = (number) => {
    if(number < 2) return false;
    let sum = 1;
    let numSqrt = Math.sqrt(number);

    for(let i = 2; i <= numSqrt; i++){
        if(number % i === 0){
            sum += i;
            if(i !== number / i) sum += number / i
        }
    }
    return sum == number;
}

//Helper function for armstrong numbers
const isArmstrong = (number) => {
    num = Math.abs(number); 
    let sum = 0;
    let digits = num.toString().split('').map(Number);
    let power = digits.length;

    for (let digit of digits){
        sum += Math.pow(digit, power);
    }

    return sum === num;
}

//Helper function for DigitSum numbers
const isDigitSum = (number) => {
    num = Math.abs(number)
    let digitArray = num.toString().split('').map(num => parseInt(num)).reduce((acc, num) => acc + num, 0)

    return number < 0 ? -digitArray : digitArray;
}

//Helper function for funFact numbers
const getFunFact = async(number) => {
    try {
        const response = await fetch(`http://numbersapi.com/${number}/math?json`);
        const data = await response.json();
        return data.text;
    } catch (error) {
        return `Interesting fact about ${number} could not be fetched`;
    }
}


module.exports = {isPrime, isPerfect, isDigitSum, isArmstrong, getFunFact}