var game = {
	compTime: 10,
	composing: false,
	date: new Date(),
	compositions: 0,
	compFinished: null,
	experience: 0,
	expBrackets: [100, 150, 225, 450, 600],
	currentLvl: 0,
	currentAlbum: 0,
	albumsList: [],
	datesList: [],
	tblBool: false,
	albumData_lengths: [],
	albumData_names: [],
	debug: false
}

var isTableShowing = false;

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
	
	if(!game.compFinished){
		if (game.debug == true)	{
			game.compFinished = new Date().getTime() + 1000;
		}else{
			game.compFinished = new Date().getTime() + (game.compTime*1000);
		}
	}
	//element("buttonson", "innerHTML", ((game.compFinished - new Date().getTime())/1000).toFixed(1));
}
function countTry() {
	if (timeTo(game.compFinished) <= 0){
		game.compFinished = null;
		element("buttonson", "innerHTML", "Click me");
		element("buttonson", "rm_a", "disabled");
		game.compositions += 1;
		game.experience += (9 + ((Math.floor(Math.random() * 50)-25)/10));
		
		if (game.experience > game.expBrackets[game.currentLvl]) {game.experience -= game.expBrackets[game.currentLvl]; game.currentLvl++;}
		
		if (game.compositions >= 10) { element("create","rm_a","disabled"); }
	} 
	else{
		element("buttonson", "set_a", "disabled", "");
		document.getElementById("buttonson").innerHTML = timeTo(game.compFinished);
	}
}

function createAlbum() {
	if(game.compositions >= 10){
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
		titleCell.innerHTML = game.albumsList[game.currentAlbum];
		dateCell.innerHTML = game.datesList[game.currentAlbum];
		game.currentAlbum += 1;
		game.compositions -= 10;
		if(game.compositions < 10){element("create","set_a","disabled",""); element("create","innerHTML","Once you've got 10 songs, you may create an album");}
	}else{
		console.log("Error, not enough songs!");
	}
}

function albumPrepare(){
	var albumInput = document.getElementById("col2");
	
	albumData_names.push();
	albumData_lengths.push();
}

function rebuildTable(){
	var albumRow = tbl.insertRow();
	var titleCell = albumRow.insertCell(0);
	var dateCell = albumRow.insertCell(1);
	titleCell.setAttribute("class", "datarows");
	dateCell.setAttribute("class", "datarows");
	titleCell.innerHTML = game.albumsList[game.currentAlbum];
	dateCell.innerHTML = game.datesList[game.currentAlbum];
	game.currentAlbum += 1;
	isTableShowing = true;
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
	if(game.compFinished){
		poseFunction();
	}
	game.currentAlbum = 0;
	if(isTableShowing == false){game.albumsList.forEach(rebuildTable);}
	if(game.tblBool){document.getElementById("col1").appendChild(tbl);};
	
	var loadButton = document.getElementById("loadBtn");
	loadButton.innerHTML = "Loaded!";
	loadButton.setAttribute("disabled","");
	setTimeout(function(){loadButton.innerHTML = "Load"; loadButton.removeAttribute("disabled");}, 1000);
}

function reset(){
	game = {
		compTime: 10,
		composing: false,
		date: new Date(),
		compositions: 0,
		experience: 0,
		expBrackets: [100, 150, 225, 450, 600],
		currentLvl: 0,
		currentAlbum: 0,
		albumsList: [],
		datesList: [],
		tblBool: false,
		albumData_lengths: [],
		albumData_names: [],
		debug: false
	}
	if(isTableShowing == true){document.getElementById("col1").removeChild(tbl);}
	game.tblBool = false;
}