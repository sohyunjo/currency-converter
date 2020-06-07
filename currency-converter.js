const axios = require("axios");
require("dotenv").config();

// const getExchangeRate = (fromCurrency, toCurrency) => {
//     axios.get(
//         `http://data.fixer.io/api/latest?access_key=${process.env.CURRENCY_KEY}&format=1`
//     ).then(res => {
//         const rate = res.data.rates;
//         const euro = 1 / rate[fromCurrency];
//         const exchangeRate = euro * rate[toCurrency]
//         console.log(exchangeRate);
//     });
// };


const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.CURRENCY_KEY}&format=1`)
    
    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency]
    const exchangeRate = euro * rate[toCurrency]

    console.log(exchangeRate)
}

getExchangeRate('USD', 'EUR')