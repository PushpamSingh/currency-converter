const BASE_URL=
"https://v6.exchangerate-api.com/v6/4fed3c6a65ee19540612c397/latest/INR";

let dropdownSelect=document.querySelectorAll(".dropdown select");
let fromcurr=document.querySelector(".from-curr select");
let tocurr=document.querySelector(".to-curr select");

for(let select of dropdownSelect){
    for(currCode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currCode;
        newoption.value=currCode;
        select.append(newoption)

        if(select.name==="from" && currCode==="USD"){
            newoption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newoption.selected="selected";
        }

    }
    select.addEventListener("change",(evt)=>{
            updateflag(evt.target);
    })
}

const updateflag=(element)=>{
    let currCode=element.value;
    let countrycode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector(".flag-img");
    img.src=newsrc;
}

const ExchangeRate=async ()=>{
    let amounttext=document.querySelector(".amount input");
    let amount=amounttext.value;
    if(amount===""){
        amount=1;
        amounttext="1";
    }
    let URL=`https://v6.exchangerate-api.com/v6/4fed3c6a65ee19540612c397/latest/${fromcurr.value.toLowerCase()}`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data.conversion_rates[tocurr.value];
    let finalamount=amount*rate;
    // console.log(finalamount);
    let para=document.querySelector(".para p");
    para.innerText=`${amount} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
    
}

let btn=document.querySelector(".Exchange-btn");
btn.addEventListener("click",(event)=>{
    event.preventDefault();
    ExchangeRate();
});

window.addEventListener("load",()=>{
        ExchangeRate();
})