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
    const response = await axios.get(
        `http://data.fixer.io/api/latest?access_key=${process.env.CURRENCY_KEY}&format=1`
    );

    const rate = response.data.rates;
    const from = 1 / rate[fromCurrency];
    const exchangeRate = from * rate[toCurrency];

    if (isNaN(exchangeRate)) {
        throw new Error(
            `Unable to get currency ${fromCurrency} and ${toCurrency}`
        );
    }

    return exchangeRate;
};

const getCountries = async (toCurrency) => {
    try{
        const response = await axios.get(
            `http://restcountries.eu/rest/v2/currency/${toCurrency}`
        );
    
        return response.data.map((country) => console.log(country.name));
    }catch(error) {
        throw new Error(`Unable to get countries that use ${toCurrency}`)
    }
    
};

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const countries = await getCountries(toCurrency);
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
};

convertCurrency("USD", "HAR", 30)
    .then((message) => console.log(message))
    .catch((err) => console.log(err));
