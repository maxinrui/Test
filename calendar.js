/* global document, $, jQuery, alert ,console*/
var events = [
    {start: 30, end: 150},
    {start: 540, end: 600},
    {start: 560, end: 620},
    {start: 610, end: 670}
];

var W;
var MAX = 580;

var eventHtml = '<div class="event"><div class="border-blue"></div><p class="title">Sampe Item</p><p class="location">Sample Location</p><div class="clearfix"></div></div>';

var eventHtmlHalf ='<div class="event"><div class="border-blue"></div><span class="title">Sampe Item</span><span class="location">Sample Location</span><div class="clearfix"></div></div>';


var collideItemCount = function(min, max, array){
    var count = 0;
    
    for(var i = min; i <= max; i++){

        for(var j = 0; j< array.length; j++) {
            if(array[j].start<= i && array[j].end >= i) {
                
            }
        }   
    }
};

var infoEvents = function(events){
    var sets=[], max, arr=[];

    events.sort(function(a,b){return a.start-b.start;}); // sort by start time

    if(events.length){
        max=events[0].end;
        arr.push(events[0]);
    }

    for(var i=1;i<events.length;i++){
        var event = events[i];
        if(event.start <= max){ // overlap (we already know that event.start >= the one before )
            arr.push(event); // push event
            max=Math.max(max, event.end); // update max
        }else{
            sets.push(arr.slice(0)); // push what we have till now
            arr=[]; // clear array
            max=event.end;  // update max
            arr.push(event); // push event
        } 
    }
    sets.push(arr.slice(0)); // push remaining
    
    for(var k = 0 ; k < sets.length; k++){
        var array = sets[k];
        var minTime, maxTime;
        var collide = 0, maxCollide = 0;
        for( var j = 0; j < array.length; j++) {
             minTime = array[0].start;
             maxTime = array[j].end;
            if( array[j].start < minTime) {
                minTime = array[j].start;
            }
            if (array[j].end > maxTime) {
                maxTime = array[j].end;
            }
        }
        collideItemCount(minTime, maxTime, array);
    }
};




var isOverLapping =  function(event){

    // "calendar" on line below should ref the element on which fc has been called 
    for(var i = 0 ; i < events.length; i++) {
        if (event.end >= events[i].start && event.start <= events[i].end) {
            return true;
        }
    }
    return false;
};


var setHeight = function(event){
    var height = event.end - event.start;
    return height;
};


var setNode = function(node, event){
    var top = event.start;
    node.css('top', top);
    var height = setHeight(event);
    node.css('height', height);
    
    
    return node;
};


var layOutDay = function(events){
    var nodes = [];
    for( var i = 0; i < events.length; i++) {
        var height = setHeight(events[i]);
        if (height === 30) {
            nodes[i] = eventHtmlHalf;  
            nodes[i] = setNode($(nodes[i]), events[i]);
            
            $(".calendar-container").append($(nodes[i]));
        }
        else {
            nodes[i] = eventHtml;
            nodes[i] = setNode($(nodes[i]), events[i]);
            
            $(".calendar-container").append($(nodes[i]));
        }
    }
};

var init = function(){
    layOutDay(events);
    infoEvents(events);
};

$(document).ready(function(){
    init();
});

