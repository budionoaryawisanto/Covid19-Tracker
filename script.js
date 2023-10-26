let btn=document.getElementById('btn');
let span=document.getElementById("span");
span.style.display = "none"
btn.addEventListener('click',()=>{
    span.style.display = "block"
    let input=document.getElementById('text');
    let Container = document.getElementsByClassName('container')[0];
    Container.innerHTML = ""
    function convert(angka){
	var rupiah = '';		
	var angkarev = angka.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
	return rupiah.split('',rupiah.length-1).reverse().join('');
    }
    getdata();
    async function getdata(){
        const url = 'https://covid-193.p.rapidapi.com/statistics';
        const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'eadc9bd239mshe53f4719d2f610fp14d7bfjsn4b911acdc4d6',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
            }
        };
        await fetch(url, options).then((response)=>{
            return response.json()
        }).then((data) => {
            let datas = data.response;
            let html = ""
            for (let i = 0; i < datas.length; i++){
                if (input.value.toLowerCase() == datas[i].country.toLowerCase()){
                    let html =`<h3>${datas[i].country}</h3>
                    <div id="card-wrapper">
                        <div class="card">
                            <span>${convert(datas[i].cases.active)}</span>
                            <div>ACTIVE CASES</div>
                        </div>
                        <div class="card">
                            <span>${datas[i].cases.new}</span>
                            <div>NEW CASES</div>
                        </div>
                        <div class="card">
                            <span>${convert(datas[i].cases.recovered)}</span>
                            <div>RECOVERED CASE</div>
                        </div>
                        <div class="card">
                            <span>${convert(datas[i].cases.total)}</span>
                            <div>TOTAL CASE</div>
                        </div>
                        <div class="card">
                            <span>${convert(datas[i].deaths.total)}</span>
                            <div>TOTAL DEATH</div>
                        </div>
                        <div class="card">
                            <span>${convert(datas[i].tests.total)}</span>
                            <div>TOTAL TEST</div>
                        </div>
                    </div>`
                    span.style.display = "none"
                    Container.innerHTML = html;
                }
            } if (Container.innerHTML == "") {
                span.style.display = "none"
                alert("Not Found Your Data !")
            }
        })
    }
})
