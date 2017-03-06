/** 
 * Copyright © 2017 Sophia Xu,Junyi Wu, Kay Lin, Qin Lin, Junning Quan
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the MIT License. See the LICENSE file for more details.
*/

function showWeather(){
	var location =document.getElementById("location").value
	var key="&appid=8eefe0f1bea8271fbe52facfda36ee3a";
	current(location,key);
	daily(location,key);
}
function current(location,key){
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?units=metric&q="+location+key, function(data){
		var name=data.name;
		var coordsLat=data.coord.lat
		var coordsLon=data.coord.lon;
		var icon=data.weather[0].icon;//http://openweathermap.org/img/w/10d.png
		var descr=data.weather[0].description;
		var temp=data.main.temp;
		var humidity=data.main.humidity;
		var windSpeed=data.wind.speed;

		var build = "";
    build += "<div class='mdui-card-primary'>";
		build += "<div class='mdui-card-primary-title'>"+name+ " ( " +coordsLat+ " , " +coordsLon+ " )</div></div>";
		build += "<div class='mdui-card-content' style='height: 100%;'><img src='http://openweathermap.org/img/w/"+icon+".png' style='height:100px'><br>";
		build += "<p>";
		build += "Description:"+descr+"<br>";	
		build += "Tempture:"+temp+" deg C<br>";
		build += "Humidity:"+humidity+" %</br>";
		build += "Wind speed:"+windSpeed+" mph</br>";
		build +="</p>"
		build += "</div>";

		document.getElementById("current").innerHTML = build;
		myMap(coordsLat,coordsLon)
	});
}
function daily(location,key){ 
	var cnt = parseInt(document.getElementById("cnt").value);
	$.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt="+cnt+"&q="+location+key, function(data){
		console.log(data);
		var build = "";
		for(var i=0; i<data.list.length; i++){
			var icon=data.list[i].weather[0].icon;//http://openweathermap.org/img/w/10d.png
			var descr=data.list[i].weather[0].description;
			var temp=data.list[i].temp.day;
			var d=new Date(data.list[i].dt*1000);
			var weekday = new Array(7);
			weekday[0] = "Sunday";
			weekday[1] = "Monday";
			weekday[2] = "Tuesday";
			weekday[3] = "Wednesday";
			weekday[4] = "Thursday";
			weekday[5] = "Friday";
			weekday[6] = "Saturday";
      build += "<div class='mdui-col-xs-6 mdui-col-sm-4 mdui-m-x-0 mdui-m-y-1'>"
			build += "<div class='mdui-card'>";
      build += "<div class='mdui-card-primary'>";
			build += "<div class='mdui-card-primary-title'>Day: "+(i+1)+"</div>";
			build += "<div class='mdui-card-primary-subtitle'>Date: "+(d.getMonth()+1)+" / "+ d.getDate()+ " / "+d.getFullYear()+" "+weekday[d.getDay()]+"</div></div>";
			build += "<div class='mdui-card-content'><img src='http://openweathermap.org/img/w/"+icon+".png' style='height:100px'><br>";
			build += "<p>";
			build += "Description:"+descr+"<br>";	
			build += "Tempture:"+temp+" deg C<br>";
			build +="</p></div>"
			build += "</div></div>";
		}
		document.getElementById("daily").innerHTML = build;
	});
}
function myMap(coordsLat,coordsLon) {
var mapProp= {
    center:new google.maps.LatLng(coordsLat,coordsLon),
    zoom:12,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
document.getElementById("googleMap").style.height="300px";
}