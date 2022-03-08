
const ctx = document.getElementById('canva');
var time = new Date();
var jour = time.getDay();
var demain = jour + 1;

switch(demain){
case 1:
    lab = ['lundi-AM', 'lundi-PM', 'mardi-AM', 'mardi-PM', 'mercredi-AM', 'mercredi-PM'];
    break;
case 2:
    lab = ['mardi-AM', 'mardi-PM', 'mercredi-AM', 'mercredi-PM', 'jeudi-AM', 'jeudi-PM'];
    break;
case 3:
    lab = ['mercredi-AM', 'mercredi-PM', 'jeudi-AM', 'jeudi-PM', 'vendredi-AM', 'vendredi-PM'];
    break;
case 4:
    lab = ['jeudi-AM', 'jeudi-PM', 'vendredi-AM', 'vendredi-PM', 'samedi-AM','samedi-PM'];
    break;
case 5:
    lab = ['vendredi-AM', 'vendredi-PM', 'samedi-AM', 'samedi-PM', 'dimanche-AM', 'dimanche-PM'];
    break;
case 6:
    lab = ['samedi-AM','samedi-PM','dimanche-AM', 'dimanche-PM', 'lundi-AM','lundi-PM'];
    break;
case 7:
    lab = ['dimanche-AM', 'dimanche-PM', 'lundi-AM', 'lundi-PM', 'mardi-AM', 'mardi-PM'];
    break;
}

function getPrev() {
    
    choixVille = document.getElementById("input").value;
  
    var url = "http://api.openweathermap.org/data/2.5/forecast?q="+choixVille+"&units=metric&lang=fr&appid=af1b712e6037198e930996c2e710984c";
  
    $.get(url, function(data) {
  
        var para = document.getElementById("reponse");
        para.innerHTML = data.city.name;
        
        console.log(data);
        var time = new Date();
        var timeZone = data.city.timezone / 3600 - 1;
    
        time = 24 - (time.getHours()) - (timeZone);
        time = Math.trunc((time/3) + 1);
        console.log(time);   

        var ref = [2,4,10,12,18,20];
        var newRef = [];
        ref.forEach(element =>
            newRef.push(time + element)
        );

        var recupData = [];
        newRef.forEach(element =>
            recupData.push(data.list[element].main.temp)
        );
        
            if(canva instanceof Chart)
                    {
                        canva.destroy();
                    }
            Chart.defaults.font.size = 20;
            canva = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: lab,
                    datasets:[{
                    label: '°C',
                    data: recupData,
                    borderWidth: 1,
                    borderColor: 'rgb(255, 132, 0)',
                    fill: false,
                    tension: 0.4
                    }]  
                },
                options: {
                    timeponsive: true,
                    plugins: {
                    title: {
                        display: true,
                        text: 'Prévisions'
                    },
                    },
                    interaction: {
                    intersect: false,
                    },
                    scales: {
                    x: {
                        display: true,
                        title: {
                        display: true
                        }
                    },
                    y: {
                        display: true,
                        title: {
                        display: true,
                        },
                    }
                    },
                    maintainAspectRatio: false  
                }
                });
                   
        
        var prevTemp = [];
        newRef.forEach(element => 
            prevTemp.push(Math.round(data.list[element].main.temp)));

        var description = [];
        newRef.forEach(element => 
            description.push(data.list[element].weather[0].description));

        var prevVent = [];
        newRef.forEach(element => 
            prevVent.push(Math.round(data.list[element].wind.speed / 10 * 36)));
        

        for (let i=0; i<6; i++) {
            document.getElementById("day"+i).innerHTML = lab[i]
            + "<br>" + "<br>" + prevTemp[i] + " degrés"
            + "<br>" + description[i]
            + "<br>" + "vent: " + prevVent[i] + " km/h";        
        };    
        
    })
};

