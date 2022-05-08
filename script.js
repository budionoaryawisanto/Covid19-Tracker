console.log("ss")
let btn=document.getElementById('btn');
let span=document.getElementById("span");
span.style.display="none"
btn.addEventListener('click',()=>{
    span.style.display="block"
    let input=document.getElementById('text');
    let Container=document.getElementsByClassName('container')[0];

getdata();
    function getdata(){
        url='https://api.covid19api.com/summary';
        fetch(url).then((response)=>{
            return response.json()
        }).then((data)=>{
            let country=data.Countries;
            let html="";
            for(let i=0;i<country.length;i++){
                if(country[i].Slug==input.value.toLowerCase() ||country[i].Country.toUpperCase()==input.value.toUpperCase()){
                    console.log(country[i].Slug)
html=`<h3>${country[i].Country}</h3>
<div id="card-wrapper">
    <div class="card">
        <span>${country[i].NewConfirmed}</span>NEW CASES
    </div>
    <div class="card">
        <span>${country[i].TotalConfirmed}</span>TOTAL CASES
    </div>
    <div class="card">
        <span>${country[i].NewDeaths}</span>NEW DEATH
    </div>
    <div class="card">
        <span>${country[i].TotalDeaths}</span>TOTAL DEATH
    </div>
</div>`
span.style.display="none"
Container.innerHTML=html;
                }
            }
            console.log(country[0].Country)
        })
    }
})
