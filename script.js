const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const formCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else{
            if(select.name === "to" && currCode === "INR"){
                newOption.selected = "selected";
            }
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });

}

const updateflag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".Amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1 ){
        amtVal = 1;
        amount.value = "1";
    }
    
    const from = formCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();
    try{
        const response = await fetch(`${BASE_URL}/${from}.json`);
        console.log(response);
        const data = await response.json();
        console.log(data);
        const rate = data[from][to];
        console.log(rate);
        const convertedAmt = (amtVal * rate).toFixed(2);
        
        msg.innerText = `${amtVal}  ${from.toUpperCase()}  =  ${convertedAmt} ${to.toUpperCase()}`;
    } catch(error){
        console.error("error fetching data: ",error);
        msg.innerText = "Error fetching exchange rates.Please try again .";
    }
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

document.addEventListener("load",()=>{
    updateExchangeRate();
})
