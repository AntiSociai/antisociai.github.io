/*
Click on buttons to start / pause / stop the strobe effect.
Key mapping:
    R = red hue
    G = green hue
    B = blue hue
    S = greyscale
    other = multicolor
*/
 
function strobe(){
    var color = this.strobeColor;
    $('.strobe').each(function(){
        var r, g, b;
        if(color=='r'){
            r = Math.floor(Math.random() * 256);
            g = Math.floor(Math.random() * 0);
            b = Math.floor(Math.random() * 0);
        }
        else if(color=='g'){
            r = Math.floor(Math.random() * 0);
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 0);
        }
        else if(color=='b'){
            r = Math.floor(Math.random() * 0);
            g = Math.floor(Math.random() * 0);
            b = Math.floor(Math.random() * 256);
        }
        else if(color=='s'){
            r = Math.floor(Math.random() * 256);
            g = r;
            b = r;
        }
        else if(color=='rgb'){
            r = Math.floor(Math.random() * 256);
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 256);
        }
        $(this).css('background-color', 'rgb('+r+','+g+','+b+')');
    });
}
function build(size){
    var w = $('#content').width();
    var h = $('#content').height();
    var nbW = Math.floor(w/size);
    var nbH = Math.floor(h/size);
    for(i=0;i<(nbW*nbH);i++){
        $('#content').append('<div class="strobe"></div>');
    }
}
function start(){
    if(!this.strobeColor) this.strobeColor = 'rgb';
    workerActive = true;
}
function pause(){
    workerActive = false;
}
function stop(){
    workerActive = false;
    $('.strobe').css('background-color', 'black');
}
 
// BUILD //
 
build(50);
 
// WORKER //
 
var worker;
var workerActive = false;
if(worker) clearInterval(worker);
worker = self.setInterval(function(){
    if(workerActive) strobe();
}, 1000);
 
// BUTTONS //
 
$('#start').click(function(){
    start();
});
$('#pause').click(function(){
    pause();
});
$('#stop').click(function(){
    stop();
});
 
// COLOR KEYS //
 
$(window).keyup(function(e){
    if(e.which==82) this.strobeColor = 'r';
    else if(e.which==71) this.strobeColor = 'g';
    else if(e.which==66) this.strobeColor = 'b';
    else if(e.which==83) this.strobeColor = 's';
    else this.strobeColor = 'rgb';
});
 
// RESIZE //
 
var resizeTimer;
$(window).resize(function(){
    if(resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
        resizeTimer = null;
        $('.strobe').remove();
        build(50);
    }, 1000);
});