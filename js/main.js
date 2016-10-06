var money = 100000;

function dollarClick(number){
    money = money + number;
    document.getElementById("money").innerHTML = money;
}

var interns = 0;
var geeks = 0;
var manishes = 0;

var coffeetime = 0;
var redbulltime = 0;

var coffeemodifier = 1;
var redbullmodifier = 1;
var globalmodifier;

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
    }
}

window.setInterval(function(){

	if(coffeetime>0){
		coffeetime = coffeetime - 1;
	}else{
        document.getElementById("coffee").innerHTML = "Disabled"
        document.getElementById("coffee").className="badge progress-bar-danger"
		coffeemodifier = 1;
	}
	if(redbulltime>0){
		redbulltime = redbulltime - 1;
	}else{
		document.getElementById("redbull").innerHTML = "Empty"
        document.getElementById("redbull").className="badge progress-bar-danger"
		redbullmodifier = 1;
	}
	
	globalmodifier = Math.max(coffeemodifier*redbullmodifier, 1);
	dollarClick(globalmodifier*interns + globalmodifier*10*geeks + globalmodifier*100*manishes);	

}, 1000);