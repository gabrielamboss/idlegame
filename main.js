var money = 100000000000;

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
    var internCost = Math.floor(10 * Math.pow(1.1,interns));     //works out the cost of this cursor
    if(money >= internCost){                                   //checks that the player can afford the cursor
        interns = interns + 1;                                   //increases number of interns
    	money = money - internCost;                          //removes the money spent
        document.getElementById('interns').innerHTML = interns;  //updates the number of interns for the user
        document.getElementById('money').innerHTML = money;  //updates the number of money for the user
    }
    var nextCost = Math.floor(10 * Math.pow(1.1,interns));       //works out the cost of the next cursor
    document.getElementById('internCost').innerHTML = nextCost;  //updates the cursor cost for the user
}

function buyGeek(){
    var geekCost = Math.floor(100 * Math.pow(1.1,geeks));     //works out the cost of this cursor
    if(money >= geekCost){                                   //checks that the player can afford the cursor
        geeks = geeks + 1;                                   //increases number of geeks
    	money = money - geekCost;                          //removes the money spent
        document.getElementById('geeks').innerHTML = geeks;  //updates the number of geeks for the user
        document.getElementById('money').innerHTML = money;  //updates the number of money for the user
    }
    var nextCost = Math.floor(100 * Math.pow(1.1,geeks));       //works out the cost of the next cursor
    document.getElementById('geekCost').innerHTML = nextCost;  //updates the cursor cost for the user
}

function buyManish(){
    var manishCost = Math.floor(1000 * Math.pow(1.1,manishes));     //works out the cost of this cursor
    if(money >= manishCost){                                   //checks that the player can afford the cursor
        manishes = manishes + 1;                                   //increases number of manishes
    	money = money - manishCost;                          //removes the money spent
        document.getElementById('manishes').innerHTML = manishes;  //updates the number of manishes for the user
        document.getElementById('money').innerHTML = money;  //updates the number of money for the user
    }
    var nextCost = Math.floor(1000 * Math.pow(1.1,manishes));       //works out the cost of the next cursor
    document.getElementById('manishCost').innerHTML = nextCost;  //updates the cursor cost for the user
}

function buyCoffeeMachine(){
    if(money >= 100){                                   
    	money = money - 100;
    	coffeetime = 10;
    	coffeemodifier = 2;
        document.getElementById('money').innerHTML = money;  //updates the number of money for the user
    	document.getElementById('coffee').innerHTML = "Activated";
    }
}

function buyRedBull(){
    if(money >= 1000){                                   
    	money = money - 1000;
    	redbulltime = 10;
    	redbullmodifier = 4;
        document.getElementById('money').innerHTML = money;  //updates the number of money for the user
    	document.getElementById('redbull').innerHTML = "Full";
    }
}

window.setInterval(function(){

	if(coffeetime>0){
		coffeetime = coffeetime - 1;
	}else{
		document.getElementById('coffee').innerHTML = "Deactivated";
		coffeemodifier = 1;
	}
	if(redbulltime>0){
		redbulltime = redbulltime - 1;
	}else{
		document.getElementById('redbull').innerHTML = "Empty";
		redbullmodifier = 1;
	}
	
	globalmodifier = Math.max(coffeemodifier*redbullmodifier, 1);
	dollarClick(globalmodifier*interns + globalmodifier*10*geeks + globalmodifier*100*manishes);	

}, 1000);