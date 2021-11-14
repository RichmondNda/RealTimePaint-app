// public/js/paint.js
socket = io.connect("http://localhost:3001/");


var socket, canvas, ctx,
    brush = {
        x: 0,
        y: 0,
        color: '#000000',
        size: 10,
        down: false,
    },
    strokes = [],
    currentStroke = null;

function paint() {
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    ctx.lineCap = 'round';
    for (var i = 0; i < strokes.length; i++) {
        var s = strokes[i];
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (var j = 0; j < s.points.length; j++) {
            var p = s.points[j];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }
}


function init() {

    canvas = $('#paint');
    canvas.attr({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    ctx = canvas[0].getContext('2d');

    canvas.mousedown(function (e) {
        brush.down = true;

        currentStroke = {
            color: brush.color,
            size: brush.size,
            points: [],
        };

        strokes.push(currentStroke);

        mouseEvent(e);
    }).mouseup(function (e) {
        brush.down = false;

        mouseEvent(e);

        currentStroke = null;
    }).mousemove(function (e) {
        if (brush.down)
            mouseEvent(e);
    });

    $('#undo-btn').click(function () {
        
        socket.emit('undo');
        
        // strokes.pop();
        // paint();
    });

    $('#clear-btn').click(function () {
        socket.emit('clear')
    });

    $('#color-picker').on('input', function () {
        brush.color = this.value;
    });

    $('#brush-size').on('input', function () {
        brush.size = this.value;
    });
}

$(init);




function mouseEvent(e) {

    brush.x = e.pageX;
    brush.y = e.pageY;

    currentStroke.points.push({
        x: brush.x,
        y: brush.y,
    });

    data = {
        x: brush.x,
        y: brush.y
    }

    socket.emit('mouse', currentStroke);

    paint();
}


    socket.on('painter', (currentStroke) => {

        strokes.push(currentStroke);
        paint();
     });




    socket.on('undo', () => {
        strokes.pop();
        paint();
    })


socket.on('clear', () => {
    strokes = [];
    paint();
})
