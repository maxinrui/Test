/* global document, $, jQuery, alert ,console*/
var events = [
    {start: 30, end: 150},
    {start: 540, end: 600},
    {start: 560, end: 620},
    {start: 610, end: 670}
];

var W;
var MAX = 600 - 10 - 10;

var eventHtml = '<div class="event"><div class="border-blue"></div><p class="title">Sampe Item</p><p class="location">Sample Location</p><div class="clearfix"></div></div>';

var eventHtmlHalf ='<div class="event"><div class="border-blue"></div><span class="title">Sampe Item</span><span class="location">Sample Location</span><div class="clearfix"></div></div>';


var collideItemCount = function(min, max, array){
    var maxNumber = 1;
    for(var i = min; i <= max; i++){
        var count = 0;
        for(var j = 0; j< array.length; j++) {
            if(array[j].start<= i && array[j].end >= i) {
                count++;
            }
        }
        if(count >= maxNumber) {
            maxNumber = count;
        }
    }
    return maxNumber;
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
        maxCollide = collideItemCount(minTime, maxTime, array);
        sets[k].push(maxCollide);
    }
    return sets;
};



var layOutDay = function(events){
    var testEvents = events;
    var nodes = infoEvents(testEvents);
    for(var i = 0; i < nodes.length; i++) {
        var array = nodes[i];
        W = MAX / array[array.length -1] + 'px';
        for(var j = 0; j < array.length-1; j++){
            var node;
            var height = array[j].end - array[j].start;
            var offset = j % array[array.length -1];
            if(height === 30) {
                 node = eventHtmlHalf;
                 node = $(node).css({
                    'top' : array[j].start,
                    'height' : height,
                    'width' : W,
                     'left' : offset * (MAX / array[array.length -1]) + 10 + 'px' 
                });
                $(".calendar-container").append(node);
            }
            else {
                node = eventHtml;
                node = $(node).css({
                    'top' : array[j].start,
                    'height' : height,
                    'width' : W,
                    'left' : offset * (MAX / array[array.length -1]) + 10 +'px'
                                   });
                $(".calendar-container").append(node);
            }
        }
    }
};

var init = function(){
    console.log("please input layOutDay(events);");
    console.log("You can also input like this:");
    console.log("layOutDay([{start:90, end: 150}]);");
};

$(document).ready(function(){
    init();
});

