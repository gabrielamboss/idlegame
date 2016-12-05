var name = "";
var money = 0;
var interns = 0;
var geeks = 0;
var manishes = 0;
var yanos = 0;
var bills = 0;
var coffeetime = 0;
var redbulltime = 0;
var pizzatime = 0;
var coffeemodifier = 1;
var redbullmodifier = 1;
var pizzamodifier = 1;
var globalmodifier;
var keyboards = 0;

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
	
    var json = {"name": email, "money":money, "interns": interns, "geeks": geeks, "manishes": manishes, "yanos": yanos, "bills": bills, "keyboards": keyboards};
    var value = JSON.stringify(json);
    console.log(value); 
    http.send(value);

    document.getElementById('loadLabel').innerHTML = "Saved";
    eraseLabelAfterSeconds(3);
}

function getState(){
	var v = localStorage.getItem('state');
    console.log(v);
    if(v == null){
        document.getElementById('loadLabel').innerHTML = "No save file found";
        eraseLabelAfterSeconds(3);
        return;
    }

	var json = JSON.parse(v);
    name = json.name;
	money = json.money;
	interns = json.interns;
	geeks = json.geeks;
	manishes = json.manishes;
    yanos = json.yanos;
    bills = json.bills;
    keyboards = json.keyboards;

    updateWorkersFromSave();

    document.getElementById('loadLabel').innerHTML = "Successfully loaded";
    eraseLabelAfterSeconds(3);
}


function sendPostRequest(){
    var email = document.getElementById('email').value;
    var url = 'http://localhost:5000/player';
    // var url = 'http://idlegame.herokuapp.com/player';
 	var http = new XMLHttpRequest();
	var params = email;
	http.open("POST", url, true);
	
	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	
	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
	        alert(http.responseText);
            console.log(http.responseText);
            localStorage.setItem('state', http.responseText);
            getState();
	    }
	}
    var json = {"name": email, "money":money, "interns": interns, "geeks": geeks, "manishes": manishes, "yanos": yanos, "bills": bills, "keyboards": keyboards};
    var value = JSON.stringify(json);
    console.log(value); 
	http.send(value);
}

function updateWorkersFromSave(){
    document.getElementById('interns').innerHTML = interns;
    document.getElementById('geeks').innerHTML = geeks;
    document.getElementById('manishes').innerHTML = manishes;
    document.getElementById('yanos').innerHTML = yanos;
    document.getElementById('bills').innerHTML = bills;
    document.getElementById('keyboards').innerHTML = keyboards;

    var nextCost = Math.floor(10 * Math.pow(1.1,interns));
    document.getElementById('internCost').innerHTML = nextCost;

    nextCost = Math.floor(100 * Math.pow(1.1,geeks));
    document.getElementById('geekCost').innerHTML = nextCost;

    nextCost = Math.floor(1000 * Math.pow(1.1,manishes));
    document.getElementById('manishCost').innerHTML = nextCost;

    nextCost = Math.floor(100000 * Math.pow(1.1,yanos));
    document.getElementById('yanoCost').innerHTML = nextCost;

    nextCost = Math.floor(10000000 * Math.pow(1.1,bills));
    document.getElementById('billCost').innerHTML = nextCost;

}

function eraseLabelAfterSeconds(seconds){
    window.setTimeout(function(){
    document.getElementById('loadLabel').innerHTML = "";
}, seconds*1000);
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

function buyYano(){
    var yanoCost = Math.floor(100000 * Math.pow(1.1,yanos));
    if(money >= yanoCost){
        yanos = yanos + 1;
        money = money - yanoCost;
        document.getElementById('yanos').innerHTML = yanos;
        document.getElementById('money').innerHTML = money;
    }
    var nextCost = Math.floor(100000 * Math.pow(1.1,yanos));
    document.getElementById('yanoCost').innerHTML = nextCost;
}

function buyBill(){
    var billCost = Math.floor(10000000 * Math.pow(1.1,bills));
    if(money >= billCost){
        bills = bills + 1;
        money = money - billCost;
        document.getElementById('bills').innerHTML = bills;
        document.getElementById('money').innerHTML = money;
    }
    var nextCost = Math.floor(10000000 * Math.pow(1.1,bills));
    document.getElementById('billCost').innerHTML = nextCost;
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

function buyPizza(){
    if(money >= 10000){                                   
        money = money - 10000;
        pizzatime = 100;
        pizzamodifier = 8;
        document.getElementById('money').innerHTML = money;
        document.getElementById("pizza").innerHTML = "Pizza Party \\o/"
        document.getElementById("pizza").className="badge progress-bar-success"
        document.getElementById("pizzabutton").disabled = true;
        document.getElementById("pizzatimelabel").innerHTML = 100;
    }
}

function buyKeyboard(){
    if(money >= 500){
        money = money - 500;
        keyboards = keyboards + 1;
        document.getElementById('money').innerHTML = money;
        document.getElementById("keyboards").innerHTML = keyboards;
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

    var yanoCost = Math.floor(100000 * Math.pow(1.1,yanos));
    if(money < yanoCost){
        document.getElementById('yanobutton').disabled = true;
    }else{
        document.getElementById('yanobutton').disabled = false;
    }

    var billCost = Math.floor(10000000 * Math.pow(1.1,bills));
    if(money < billCost){
        document.getElementById('billbutton').disabled = true;
    }else{
        document.getElementById('billbutton').disabled = false;
    }

    if(!(money >= 100 && coffeetime<=0)){
         document.getElementById("coffeebutton").disabled = true;
    }

    if(!(money >= 1000 && redbulltime<=0)){
        document.getElementById("redbullbutton").disabled = true;
    }

    if(!(money >= 10000 && pizzatime<=0)){
        document.getElementById("pizzabutton").disabled = true;
    }

    if(money < 500 || keyboards >= manishes){
        document.getElementById("keyboardbutton").disabled = true;
    }else{
        document.getElementById("keyboardbutton").disabled = false;
    }

    if(keyboards >= manishes){
        document.getElementById("keyboards").className="badge progress-bar-success";
    }else{
        document.getElementById("keyboards").className="badge progress-bar-danger";
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
	
    if(pizzatime>0){
        pizzatime = pizzatime - 1;
        document.getElementById("pizzatimelabel").innerHTML = pizzatime;
    }else{
        document.getElementById("pizza").innerHTML = "No pizza :("
        document.getElementById("pizza").className="badge progress-bar-danger"
        pizzamodifier = 1;
        document.getElementById("pizzabutton").disabled = false;
    }

	globalmodifier = Math.max(coffeemodifier*redbullmodifier*pizzamodifier, 1);
    dollarClick(globalmodifier*interns + globalmodifier*10*geeks + globalmodifier*100*manishes + globalmodifier*10000*yanos + globalmodifier*1000000*bills + globalmodifier*100*keyboards); 

}, 1000);

window.setInterval(function(){
    updateDisabledButtons();
}, 50);