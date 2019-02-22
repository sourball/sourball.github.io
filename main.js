var compTime = 10;
var composing = false;
var d = new Date();
var seconds = d.getSeconds();
var compositions = 0;
var experience = 0;
var expBrackets = [100, 150, 225, 450, 600];
var currentLvl = 0;
var albumsList = [];
var datesList = [];
var tblBool = false;
var albumData_lengths = [];
var albumData_names = [];

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
	var cDown = compTime;
	element("buttonson", "innerHTML", cDown);
	var id = setInterval(function(){countTry();}, 1000);
	function countTry() {					
		if (cDown == 0){
			element("buttonson", "innerHTML", "Click me");
			element("buttonson", "rm_a", "disabled");
			compositions += 1;
			experience += (9 + ((Math.floor(Math.random() * Math.floor(50))-25)/10));
			
			if (experience > expBrackets[currentLvl]) {experience -= expBrackets[currentLvl]; currentLvl++;}
			
			updateValues();
			clearInterval(id);
			
			if (compositions >= 10) { element("create","rm_a","disabled"); }
		} 
		else{
			cDown += -1;
			document.getElementById("buttonson").innerHTML = cDown; 
		}
	}
	
}
function createAlbum() {
	albumName = prompt("Album name: ");
	albumsList.push(albumName);
	datesList.push("not yet released");
	
	//if albums table doesn't show, display it
	if(!tblBool){
		document.getElementById("col1").appendChild(tbl);
		
		tblBool = true;
	}
	var albumRow = tbl.insertRow();
	var titleCell = albumRow.insertCell(0);
	var dateCell = albumRow.insertCell(1);
	titleCell.innerHTML = albumsList[0];
	dateCell.innerHTML = datesList[0];
}

function albumPrepare(){
	var albumInput = document.getElementById("col2");
	
	albumData_names.push();
	albumData_lengths.push();
}

function updateValues(){
	var expElement = document.getElementById("exp");
	var composedElement = document.getElementById("counter");
	expElement.innerHTML = "Composing level: " + currentLvl.toString() + " (" + 
	experience.toFixed(1) + "/" + expBrackets[currentLvl].toString() + " exp to next level)";
	composedElement.innerHTML = "Songs composed: " + compositions.toString();
}