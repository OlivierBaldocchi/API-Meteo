/*var test = "http://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=af1b712e6037198e930996c2e710984c";
$.get(test, function(data) {
      console.log(data.list[6]);  
});
*/

function getValue() {
  var choixVille = document.getElementById("input").value;
  
  var url = "http://api.openweathermap.org/data/2.5/weather?q="+choixVille+"&units=metric&lang=fr&APPID=af1b712e6037198e930996c2e710984c";
  
  $.get(url, function(data){  
    var para = document.getElementById("reponse");
    tempmin = Math.round(data.main.temp_min); 
    tempmax = Math.round(data.main.temp_max);
    speed = Math.round(data.wind.speed / 10 * 36);
    
    var direc = data.wind.deg;
    var dir = '';

    if (direc > 330 || direc < 31) {
      dir = 'du Nord';
    } else if (direc > 30 && direc < 61) {
      dir = 'du Nord-Est';
    } else if (direc > 60 && direc < 121) {
      dir = "d'Est";
    } else if (direc > 121 && direc < 151) {
      dir = "de Sud-Est";
    } else if (direc > 150 && direc < 211) {
      dir = "du Sud";
    } else if (direc > 210 && direc < 241) {
      dir = "du Sud-Ouest";
    } else if (direc > 240 && direc < 301) {
      dir = "d'Ouest";
    } else if (direc > 300 && direc < 331) {
      dir = "de Nord-Ouest";
    }
           
    para.innerHTML = data.name + "<br>" + "<br>"
    + "Température mini: " + tempmin + " degrés" + "<br>" 
    + "Température maxi: " + tempmax + " degrés" + "<br>" 
    + "Conditions: " + data.weather[0].description + "<br>" 
    + "Humidité: " + data.main.humidity + "%" + "<br>"
    + "Vent " + dir + ", " + speed + "km/h"  ;
  });
}
