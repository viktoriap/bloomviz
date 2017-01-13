/**
 * Created by viktoria on 11.01.17.
 */

window.onload = function () {
    var canvas = document.getElementById('hashtable');
    var p = 10;
    var t1 = [];
    var t1_t = [];
    var t2_t = [];
    var t2 = [];
    paper.setup(canvas);

    function drawTables() {
        for (var x = 0, i = 0; i < 20; x += 40, i++) {
            var rect = new paper.Path.Rectangle(0.5 + x + p, 0.5 + p, 40, 40);
            rect.strokeColor = "black";
            rect.strokeWidth = 1;
            var text = new paper.PointText({
                point: [rect.bounds.x + 20.5, rect.bounds.y + 22],
                fillColor: 'black',
                justification: 'center'
            });
            t1.push(rect);
            t1_t.push(text);
        }

        for (var y = 0, j = 0; j < 20; y += 40, j++) {
            var rect2 = new paper.Path.Rectangle(0.5 + y + p, 55.5 + p, 40, 40);
            rect2.strokeColor = "black";
            rect2.strokeWidth = 1;
            var text2 = new paper.PointText({
                point: [rect2.bounds.x + 20.5, rect2.bounds.y + 22],
                fillColor: 'black',
                justification: 'center'
            });
            t2.push(rect2);
            t2_t.push(text2)
        }
    }

    function fillNewSlots(positions) {
        console.log(positions[0]);
        console.log(positions[1]);
        for (var i = 0; i < positions[0].length; i++) {
            var rect = t1[i];
            if (positions[0][i] != 0) {
                t1_t[i].content = positions[0][i].toString();
                rect.fillColor = "#dd7a94";
            } else {
                rect.fillColor = null;
            }
        }

        for (var j = 0; j < positions[1].length; j++) {
            var rect2 = t2[j];
            if (positions[1][j] != 0) {
                t2_t[j].content = positions[1][j].toString();
                rect2.fillColor = "#dd7a94";
            } else
                rect2.fillColor = null;
        }
    }

    function fillFindSlot(positions) {
        if (positions[0] == 1) {
            var rect = t1[positions[1]];
            rect.fillColor = "#7ac5dd";
        }
    }

    function undoFindSlots() {
        for (var i = 0; i < t1.length; i++) {
            if (t1[i].fillColor != null) {
                t1[i].fillColor = "#dd7a94";
            }

            if (t2[i].fillColor != null) {
                t2[i].fillColor = "#dd7a94";
            }
        }
    }

    drawTables();

    $('button#add').bind('click', function () {
        $.getJSON($SCRIPT_ROOT + '/cuckoo/add', {
            value: $('input[name="value"]').val()
        }, function (data) {
            undoFindSlots();
            fillNewSlots(data.response_add);
            $("#feedback").text("Your value was added to the array!");
        });
        return false;
    });

    $('button#find').bind('click', function () {
        $.getJSON($SCRIPT_ROOT + '/cuckoo/find', {
            find: $('input[name="find"]').val()
        }, function (data) {
            console.log(data.response_find);
            if (data.response_find) {
                undoFindSlots();
                fillFindSlot(data.response_find);
                $("#feedback").text("It's there.")
            } else {
                $("#feedback").text("Definitely not there.")
            }
        });
        return false;
    });

};