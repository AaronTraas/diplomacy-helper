'use strict';

let buttonRandomActions = document.getElementById('randomizeActions');

var commands_string = '';
var verbs_string = '';
var objects_string = '';

var xhr_commands = new XMLHttpRequest();
xhr_commands.onload = function() {
    var commands = JSON.parse(this.response);
    commands_string = "['" + commands.join("','") + "']";
    console.log(commands_string);
}
xhr_commands.open("GET", chrome.extension.getURL('/data/commands.json'), true);
xhr_commands.send();

var xhr_verbs = new XMLHttpRequest();
xhr_verbs.onload = function() {
    var verbs = JSON.parse(this.response);
    verbs_string = "['" + verbs.join("','") + "']";
    console.log(verbs_string);
}
xhr_verbs.open("GET", chrome.extension.getURL('/data/verbs.json'), true);
xhr_verbs.send();

var xhr_objects = new XMLHttpRequest();
xhr_objects.onload = function() {
    var objects = JSON.parse(this.response);
    objects_string = "['" + objects.join("','") + "']";
    console.log(objects_string);
}
xhr_objects.open("GET", chrome.extension.getURL('/data/objects.json'), true);
xhr_objects.send();

buttonRandomActions.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let script_random_actions = "\
            var commands = " + commands_string + ";\
            var verbs = " + verbs_string + ";\
            var objects = " + objects_string + ";\
            commands = commands.concat(verbs);\
            var link = '<a href=\"#\">(X)</a>';\
            \
            var elements = document.querySelectorAll('#orders_list_overlay_div_text>span');\
            console.log( 'Silly actions:' );\
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
                    content = content.substring(0,index) + verb + ' ' + object;\
                    console.log( '- ' + content );\
                    element.innerHTML = content + ' ' + link;\
                }\
            });\
        ";

        chrome.tabs.executeScript(
            tabs[0].id,
            {code: script_random_actions});
    });
};
