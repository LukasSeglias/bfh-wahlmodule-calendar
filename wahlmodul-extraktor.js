
// Dieser JavaScript code kann auf der Wahlmodul-Website der BFH 
// in der Browserconsole eingefügt werden, um ein JSON der Wahlmodule herunterzuladen.

function downloadObjectAsJson(exportObj, exportName){
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
	var downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute("href",     dataStr);
	downloadAnchorNode.setAttribute("download", exportName + ".json");
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
}

var weekdayNameToNumber = {
	"Mo": 1,
	"Di": 2,
	"Mi": 3,
	"Do": 4,
	"Fr": 5,
	"Sa": 6,
	"So": 0
};

var modules = [];

var rows = document.querySelectorAll(".qg-QGTable tr.break-all");
for(var i = 0; i < rows.length; i++) {
	var row = rows[i];
	
	var execution = row.cells[0];
	
	var none = execution.classList.contains("none");
	var ok = execution.classList.contains("ok");
	var no = execution.classList.contains("no");
	takesPlace = none ? null : ok;
	
	var standort = row.cells[1].childNodes[0].getAttribute("title");
	standort = standort == "-" ? null : standort;
	// TODO: evtl. übersetzung machen
	
	var semester = row.cells[2].textContent;
	semester = semester == "-" ? null : semester;
	// TODO: handle values like HS1, HS2
	
	var weekday = row.cells[3].textContent;
	weekday = weekday.trim().length == 0 ? null : weekday;
	var weekdayNumber = weekday != null && weekdayNameToNumber[weekday] !== undefined ? weekdayNameToNumber[weekday] : null;
	var daysOfWeek = weekdayNumber != null ? [ weekdayNumber ] : [];
	
	var timeslot = row.cells[4].textContent;
	var timeParts = timeslot.split("-");
	var startTime = timeParts.length == 2 ? timeParts[0] : null;
	startTime = startTime == null || startTime.length == 0 ? null : startTime;
	var endTime = timeParts.length == 2 ? timeParts[1] : null;
	endTime = endTime == null || endTime.length == 0 ? null : endTime;
	
	var key = row.cells[5].childNodes[0].textContent;
	var url = 'https://content.bfh.ch/fileadmin/ti/modules/' + key + '-de.xml';
	
	// nothing special at column 7
	
	var name = row.cells[7].childNodes[0].getAttribute("title");
	
	// nothing special at column 9
	
	var etcs = parseInt(row.cells[9].textContent);
	
	var language = row.cells[10].textContent;
	language = language == "-" ? null : language;
	
	var lecturer = row.cells[11].childNodes[0].getAttribute("title");
	lecturer = lecturer == "- (-)" ? null : lecturer;
	
	//console.log(startTime + " - " + endTime);
	
	var description = ''+ name + '\n' + standort + ' - ' + lecturer + '\n';
	
	modules.push({
		id: name + "::" + lecturer,
		takesPlace: takesPlace,
		standort: standort,
		semester: semester,
		daysOfWeek: daysOfWeek,
		startTime: startTime,
		endTime: endTime,
		name: name,
		etcs: etcs,
		language: language,
		lecturer: lecturer,
		url: url,
		title: description,
		editable: false
	});
}

var moduleNamesHS = modules
	.filter((module) => { return module.semester === 'HS'; })
	.map((module) => { return module.name; });
var moduleNamesFS = modules
	.filter((module) => { return module.semester === 'FS'; })
	.map((module) => { return module.name; });
var moduleNamesOther = modules
	.filter((module) => { return module.semester !== 'HS' && module.semester !== 'FS'; })
	.map((module) => { return module.name; });
	
var modulesExclusiveToHS = [];
var modulesExclusiveToFS = [];
var modulesInBothSemesters = [];
var modulesInOther = [];

for(var i = 0; i < modules.length; i++) {
	var module = modules[i];
	
	var isInHS = moduleNamesHS.includes(module.name);
	var isInFS = moduleNamesFS.includes(module.name);
	var isInOther = moduleNamesOther.includes(module.name);
	
	if(isInOther) {
		
		modulesInOther.push(module);
		
	} else {
		if(isInHS && isInFS) {
		
			modulesInBothSemesters.push(module);
			
		} else if(isInHS) {
			
			modulesExclusiveToHS.push(module);
			
		} else {
			
			modulesExclusiveToFS.push(module);
			
		}
	}
}

downloadObjectAsJson({
	modules: modules,
	modulesExclusiveToHS: modulesExclusiveToHS,
	modulesExclusiveToFS: modulesExclusiveToFS,
	modulesInBothSemesters: modulesInBothSemesters,
	modulesInOther: modulesInOther
}, "Wahlmodule");
