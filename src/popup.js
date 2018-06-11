'use strict';

let buttonRandomActions = document.getElementById('randomizeActions');

let verbs = ['EATS', 'DRINKS', 'JUGGLES', 'ROASTS', 'FROLICKS through'];
let objects = ['mummified cats', 'pretzels', 'herring', 'the fjords'];
var commands = ['MOVE', 'SUPPORT', 'CONVOY', 'HOLD'];

let verbs_string =  "['" + verbs.join("','") + "']";
let objects_string = "['" + objects.join("','") + "']";
let commands_string = "['" + commands.join("','") + "']";

let script_random_actions = "\
    var commands = " + commands_string + ";\
    var verbs = " + verbs_string + ";\
    var objects = " + objects_string + ";\
    var link = '<a href=\"#\">(X)</a>';\
    \
    var elements = document.querySelectorAll('#orders_list_overlay_div_text>span');\
    elements.forEach( function(element) {\
        content = element.innerHTML;\
        var index = -1;\
        commands.forEach( function(command) {\
            if(index===-1) {\
                index = content.indexOf(command);\
            }\
        });\
        \
        if(index > 1) {\
            verb = 'VERB';\
            var verb = verbs[Math.floor(Math.random()*verbs.length)];\
            object = objects[Math.floor(Math.random()*objects.length)];\
            content = content.substring(0,index) + verb + ' ' + object + ' ' + link;\
            console.log( content );\
            element.innerHTML = content;\
        }\
    });\
";

buttonRandomActions.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: script_random_actions});
    });
};
