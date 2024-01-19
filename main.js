const rates = {};
const elementsUSD = document.querySelector('[data-value="USD"]');
const elementsEUR = document.querySelector('[data-value="EUR"]');
const elementsGBP = document.querySelector('[data-value="GBP"]');

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

getCurrencies();

async function getCurrencies(){
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;

    console.log(rates);

    elementsUSD.textContent = rates.USD.Value.toFixed(2);
    elementsEUR.textContent = rates.EUR.Value.toFixed(2);
    elementsGBP.textContent = rates.GBP.Value.toFixed(2);


    /// color USD EUR GBP
    if (rates.USD.Value > rates.USD.Previous ) {
        elementsUSD.classList.add('top');
        
    } else {
        elementsUSD.classList.add('bottom');
    }

    if (rates.EUR.Value > rates.EUR.Previous ) {
        elementsEUR.classList.add('top');
        
    } else {
        elementsEUR.classList.add('bottom');
    }

    if (rates.GBP.Value > rates.GBP.Previous ) {
        elementsGBP.classList.add('top');
        
    } else {
        elementsGBP.classList.add('bottom');
    }


}

input.oninput = convertValue;
select.oninput = convertValue;

function convertValue(){
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2) ;
}
