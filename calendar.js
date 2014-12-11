/* global document, $, jQuery, alert */


var W;
var MAX = 600;

var eventHtml = '<div class="event"><div class="border-blue"></div><p class="title">Sampe Item</p><p class="location">Sample Location</p><div class="clearfix"></div></div>';

var eventHtmlHalf ='<div class="event"><div class="border-blue"></div><span class="title">Sampe Item</span><span class="location">Sample Location</span><div class="clearfix"></div></div>';

var events = [
    {start: 30, end: 150},
    {start: 540, end: 600},
    {start: 560, end: 620},
    {start: 610, end: 670}
];

var layOutDay = function() {
    alert('can be invoke');
};

var setHeight = function(event){
    var height = event.end - event.start;
    return height;
};

var setTopPosition = function(node, event){
    var top = event.start;
    node.css('top', top);
    return node;
};

var completeHtml = function(nodes){
    var html;
    for(var i = 0; i < nodes.length; i++) {
        html += nodes[i];
    }
    return html;
};

var layOutDay = function(events){
    var nodes = [];
    for( var i = 0; i < events.length; i++) {
        var height = setHeight(events[i]);
        if (height === 30) {
            nodes[i] = eventHtmlHalf;  
            nodes[i] = setTopPosition($(nodes[i]), events[i]);
            $(".calendar-container").append($(nodes[i]));
        }
        else {
            nodes[i] = eventHtml;
            nodes[i] = setTopPosition($(nodes[i]), events[i]);
            $(".calendar-container").append($(nodes[i]));
        }
    }
    console.log(nodes);
};

var init = function(){
    layOutDay(events);
};

$(document).ready(function(){
    init();
});

