var game = {
	compTime: 10,
	composing: false,
	date: new Date(),
	compositions: 0,
	experience: 0,
	expBrackets: [100, 150, 225, 450, 600],
	currentLvl: 0,
	albumsList: [],
	datesList: [],
	tblBool: false,
	albumData_lengths: [],
	albumData_names: [],
	debug: false
}

//declare albums table
var tbl = document.createElement("TABLE");
tbl.setAttribute("id", "albums");
tbl.setAttribute("border", "1")
var tblCaption = tbl.createCaption();
tblCaption.innerHTML = "Albums: ";
tblCaption.setAttribute("class", "leftalign");
var tblRow = tbl.insertRow();
var cell1 = tblRow.insertCell(0);
cell1.innerHTML = "<b>Title</b>";
cell1.setAttribute("class", "initrows");
var cell2 = tblRow.insertCell(1);
cell2.innerHTML = "<b>Release date</b>";
cell2.setAttribute("class", "initrows");
tblRow.setAttribute("class", "init");

var upDating = setInterval(function(){updateValues();}, 4000);

function element(id, action, data, subdata) {
	switch(action){
		case "innerHTML":
			document.getElementById(id).innerHTML = data;
			break;
		
		case "set_a":
			document.getElementById(id).setAttribute(data, subdata);
			break;
		
		case "rm_a":
			document.getElementById(id).removeAttribute(data);
			break;
	}
}
function poseFunction() {
	element("buttonson", "set_a", "disabled", "");
	var cDown;
	if (game.debug == true)	{
		cDown = new Date().getTime() + 1000;
	}else{
		cDown = new Date().getTime() + (game.compTime*1000);
	}
	element("buttonson", "innerHTML", ((cDown - new Date().getTime())/1000).toFixed(1));
	var id = setInterval(function(){countTry();}, 100);
	function countTry() {
		d = new Date()
		if (cDown - new Date().getTime() <= 0){
			element("buttonson", "innerHTML", "Click me");
			element("buttonson", "rm_a", "disabled");
			game.compositions += 1;
			game.experience += (9 + ((Math.floor(Math.random() * 50)-25)/10));
			
			if (game.experience > game.expBrackets[game.currentLvl]) {game.experience -= game.expBrackets[game.currentLvl]; game.currentLvl++;}
			
			updateValues();
			clearInterval(id);
			
			if (game.compositions >= 10) { element("create","rm_a","disabled"); }
		} 
		else{
			document.getElementById("buttonson").innerHTML = ((cDown - new Date().getTime())/1000).toFixed(1);
		}
	}
}
function createAlbum() {
	game.albumName = prompt("Album name: ");
	game.albumsList.push(game.albumName);
	game.datesList.push("not yet released");
	
	//if albums table doesn't show, display it
	if(!game.tblBool){
		document.getElementById("col1").appendChild(tbl);
		
		game.tblBool = true;
	}
	var albumRow = tbl.insertRow();
	var titleCell = albumRow.insertCell(0);
	var dateCell = albumRow.insertCell(1);
	titleCell.setAttribute("class", "datarows");
	dateCell.setAttribute("class", "datarows");
	titleCell.innerHTML = game.albumsList[0];
	dateCell.innerHTML = game.datesList[0];
}

function albumPrepare(){
	var albumInput = document.getElementById("col2");
	
	albumData_names.push();
	albumData_lengths.push();
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
}
function save() {
	localStorage.setItem("Save", JSON.stringify(game));
	var saveButton = document.getElementById("saveBtn");
	saveButton.innerHTML = "Saved!";
	saveButton.setAttribute("disabled","");
	setTimeout(function(){saveButton.innerHTML = "Save"; saveButton.removeAttribute("disabled");}, 1000);
}
function load() {
	game = JSON.parse(localStorage.getItem('Save'));
	updateValues();
	
	var loadButton = document.getElementById("loadBtn");
	loadButton.innerHTML = "Loaded!";
	loadButton.setAttribute("disabled","");
	setTimeout(function(){loadButton.innerHTML = "Load"; loadButton.removeAttribute("disabled");}, 1000);
}