'use strict';

let buttonRandomActions = document.getElementById('randomizeActions');

buttonRandomActions.onclick = function(element) {
	let color = element.target.value;
	let script = "\
		var verbs = ['EATS', 'DRINKS', 'JUGGLES', 'ROASTS', 'FROLICKS through'];\
		var objects = ['mummified cats', 'pretzels', 'herring', 'the fjords'];\
		var elements = document.querySelectorAll('#orders_list_overlay_div_text>span');\
		var link = '<a href=\"#\">(X)</a>';\
		for (var i = 0; i < elements.length; i += 1) {\
			content = elements[i].innerHTML;\
			var index = -1;\
			index = content.indexOf('MOVE');\
			if(index===-1) {index = content.indexOf('SUPPORT')}\
			if(index===-1) {index = content.indexOf('HOLD')}\
			if(index > 1) {\
				verb = 'VERB';\
				var verb = verbs[Math.floor(Math.random()*verbs.length)];\
				object = objects[Math.floor(Math.random()*objects.length)];\;\
    			content = content.substring(0,index) + verb + ' ' + object + ' ' + link;\
			}\
    		console.log( content );\
    		elements[i].innerHTML = content;\
    	}\
	";
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: script});
	});
};
