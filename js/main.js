var money = 0;
var interns = 0;
var geeks = 0;
var manishes = 0;
var coffeetime = 0;
var redbulltime = 0;
var coffeemodifier = 1;
var redbullmodifier = 1;
var globalmodifier;

getState();


function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function dollarClick(number){
    money = money + number;
    document.getElementById("money").innerHTML = money;
}

function saveState(){
	var name = "state";
	var json = {"money":money, "interns": interns, "geeks": geeks, "manishes": manishes};
	var days = 3;
	var value = JSON.stringify(json);
	localStorage.setItem('state', value);
	// createCookie(name, value, days)
}

function getState(){
	var v = localStorage.getItem('state');
	// console.log(value)
	var json = JSON.parse(v);
	console.log(json)
	money = json.money;
	interns = json.interns;
	geeks = json.geeks;
	manishes = json.manishes;
}

function buyIntern(){
    var internCost = Math.floor(10 * Math.pow(1.1,interns));
    if(money >= internCost){
        interns = interns + 1;
    	money = money - internCost;
        document.getElementById('interns').innerHTML = interns;
        document.getElementById('money').innerHTML = money;
    }
    var nextCost = Math.floor(10 * Math.pow(1.1,interns));
    document.getElementById('internCost').innerHTML = nextCost;
}

function buyGeek(){
    var geekCost = Math.floor(100 * Math.pow(1.1,geeks));
    if(money >= geekCost){
        geeks = geeks + 1;
    	money = money - geekCost;
        document.getElementById('geeks').innerHTML = geeks;
        document.getElementById('money').innerHTML = money;
    }
    var nextCost = Math.floor(100 * Math.pow(1.1,geeks));
    document.getElementById('geekCost').innerHTML = nextCost;
}

function buyManish(){
    var manishCost = Math.floor(1000 * Math.pow(1.1,manishes));
    if(money >= manishCost){
        manishes = manishes + 1;
    	money = money - manishCost;
        document.getElementById('manishes').innerHTML = manishes;
        document.getElementById('money').innerHTML = money;
    }
    var nextCost = Math.floor(1000 * Math.pow(1.1,manishes));
    document.getElementById('manishCost').innerHTML = nextCost;
}

function buyCoffeeMachine(){
    if(money >= 100){                                   
    	money = money - 100;
    	coffeetime = 10;
    	coffeemodifier = 2;
        document.getElementById('money').innerHTML = money;
        document.getElementById("coffee").innerHTML = "Enabled"
        document.getElementById("coffee").className="badge progress-bar-success"
        document.getElementById("coffeebutton").disabled = true;
        document.getElementById("coffeetimelabel").innerHTML = 10;
    }
}

function buyRedBull(){
    if(money >= 1000){                                   
    	money = money - 1000;
    	redbulltime = 10;
    	redbullmodifier = 4;
        document.getElementById('money').innerHTML = money;
        document.getElementById("redbull").innerHTML = "Full"
        document.getElementById("redbull").className="badge progress-bar-success"
        document.getElementById("redbullbutton").disabled = true;
        document.getElementById("redbulltimelabel").innerHTML = 10;
    }
}

function updateDisabledButtons(){

    var internCost = Math.floor(10 * Math.pow(1.1,interns));
    if(money < internCost){
        document.getElementById('internbutton').disabled = true;
    }else{
        document.getElementById('internbutton').disabled = false;
    }

    var geekCost = Math.floor(100 * Math.pow(1.1,geeks));
    if(money < geekCost){
        document.getElementById('geekbutton').disabled = true;
    }else{
        document.getElementById('geekbutton').disabled = false;
    }

    var manishCost = Math.floor(1000 * Math.pow(1.1,manishes));
    if(money < manishCost){
        document.getElementById('manishbutton').disabled = true;
    }else{
        document.getElementById('manishbutton').disabled = false;
    }

    if(!(money >= 100 && coffeetime<=0)){
         document.getElementById("coffeebutton").disabled = true;
    }

    if(!(money >= 1000 && redbulltime<=0)){
        document.getElementById("redbullbutton").disabled = true;
    }
}

window.setInterval(function(){

	if(coffeetime>0){
		coffeetime = coffeetime - 1;
        document.getElementById("coffeetimelabel").innerHTML = coffeetime;
	}else{
        document.getElementById("coffee").innerHTML = "Disabled"
        document.getElementById("coffee").className="badge progress-bar-danger"
		coffeemodifier = 1;
        document.getElementById("coffeebutton").disabled = false;
	}
    
	if(redbulltime>0){
		redbulltime = redbulltime - 1;
        document.getElementById("redbulltimelabel").innerHTML = redbulltime;
	}else{
		document.getElementById("redbull").innerHTML = "Empty"
        document.getElementById("redbull").className="badge progress-bar-danger"
		redbullmodifier = 1;
        document.getElementById("redbullbutton").disabled = false;
	}
	
	globalmodifier = Math.max(coffeemodifier*redbullmodifier, 1);
	dollarClick(globalmodifier*interns + globalmodifier*10*geeks + globalmodifier*100*manishes);	

}, 1000);

window.setInterval(function(){
    updateDisabledButtons();
}, 50);