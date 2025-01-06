const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'

async function fetchCurrencies() {
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        const currencies = Object.keys(data.rates)

        const fromCurrency = document.getElementById('fromCurrency')
        const toCurrency = document.getElementById('toCurrency')

        currencies.forEach(currency => {
            const option1 = document.createElement('option')
            const option2 = document.createElement('option')
            option1.value = option2.value = currency
            option1.textContent = option2.textContent = currency
            fromCurrency.appendChild(option1)
            toCurrency.appendChild(option2)
        })
    } catch (error) {
        alert('Failed to fetch currency data.')
    }
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value
    const fromCurrency = document.getElementById('fromCurrency').value
    const toCurrency = document.getElementById('toCurrency').value

    if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount.')
        return
    }

    try {
        const response = await fetch(apiUrl)
        const data = await response.json()

        const rateFromUSD = data.rates[fromCurrency]
        const rateToUSD = data.rates[toCurrency]
        const convertCurrency = (amount / rateFromUSD) * rateToUSD

        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
    } catch (error) {
        alert('Failed to convert currency.')
    }
}

document.getElementById('convertBtn').addEventListener('click', convertCurrency)

fetchCurrencies()