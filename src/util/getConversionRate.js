const getConversionRate = () => {
    return fetch('https://api.coinbase.com/v2/exchange-rates')
        .then(response => response)
        .then(response => response.json())
        .then(response => Number(response.data.rates.ETH))
        .catch(error => Promise.reject(error))
}

export default getConversionRate
