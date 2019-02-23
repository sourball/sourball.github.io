setInterval(function(){update();}, 100);
function update(){
	if(game.compFinished){
		countTry()
	}
	updateValues()
}

function updateValues(){
	var expElement = document.getElementById("exp");
	var composedElement = document.getElementById("counter");
	expElement.innerHTML = "Composing level: " + game.currentLvl.toString() + " (" + 
	game.experience.toFixed(1) + "/" + game.expBrackets[game.currentLvl].toString() + " exp to next level)";
	composedElement.innerHTML = "Songs composed: " + game.compositions.toString();
	
	if(game.debug == false){
		document.getElementById("countdown").innerHTML = "Click the button to compose a song! (10 second cooldown)";
	}else{
		document.getElementById("countdown").innerHTML = "Click the button to compose a song! (1 second cooldown [DEBUG])";
	}
	
	if(game.compositions >= 10){element("create","rm_a","disabled"); element("create","innerHTML","Create album");}
}

function timeTo(nextFinish){
	return ((nextFinish - new Date().getTime())/1000).toFixed(1)
}