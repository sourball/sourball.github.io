var game = {
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
	debug: false,
	songNames: [],
	songLengths: []
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

//declare album release table
var tbl2 = document.createElement("TABLE");
tbl2.setAttribute("id", "albumForRelease");
tbl2.setAttribute("border", "1")
var tbl2Caption = tbl2.createCaption();
tbl2Caption.innerHTML = "Album up for release: ";
tbl2Caption.setAttribute("class", "leftalign");
var tbl2Row = tbl2.insertRow();
var cell1_2 = tbl2Row.insertCell(0);
cell1_2.innerHTML = "<b>#</b>";
cell1_2.setAttribute("class", "initrows");
var cell2_2 = tbl2Row.insertCell(1);
cell2_2.innerHTML = "<b>Song names</b>";
cell2_2.setAttribute("class", "initrows");
var cell3_2 = tbl2Row.insertCell(2);
cell3_2.innerHTML = "<b>Song lengths</b>";
cell3_2.setAttribute("class", "initrows");
tbl2Row.setAttribute("class", "init");

var upDating = setInterval(function(){updateValues();}, 4000);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
			game.songLengths.push(getRandomInt(90, 180));
			$.get('https://raw.githubusercontent.com/sourball/sourball.github.io/master/songnames.txt', function(txtFile){
				var nameFile = txtFile.split("\n");
				game.songNames.push(nameFile[game.compositions - 1]);
			});
			
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
		updateValues();
	}else{
		console.log("Error, not enuf songs!");
	}
}

//Prepare album for release, song names, lengths etc.
function albumPrepare(){
	var albumInput = document.getElementById("col2");
	
	for(i=0; i < 10; i++){
		game.albumData_lengths.push(game.songLengths[i]);
		game.albumData_names.push(game.songNames[i]);
	}
	
	
	for(i=0; i<10; i++){
		var albumRRow = tbl2.insertRow();
		var numberCell = albumRRow.insertCell(0);
		var nameCell = albumRRow.insertCell(1);
		var lengthCell = albumRRow.insertCell(2);
		numberCell.setAttribute("class", "datarows");
		nameCell.setAttribute("class", "datarows");
		lengthCell.setAttribute("class", "datarows");
		numberCell.innerHTML = i + 1;
		nameCell.innerHTML = game.albumData_names[i + ((game.currentAlbum - 1) * 10)];
		lengthCell.innerHTML = game.albumData_lengths[i + ((game.currentAlbum - 1) * 10)];
	}
	
	tbl2Caption.innerHTML = "Album up for release: " + game.albumsList[game.currentAlbum - 1];
	
	document.getElementById("col2").appendChild(tbl2);
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
	updateValues();
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
		debug: false,
		songNames: [],
		songLengths: []
	}
	updateValues();
	if(isTableShowing == true){document.getElementById("col1").removeChild(tbl);}
	game.tblBool = false;
}
