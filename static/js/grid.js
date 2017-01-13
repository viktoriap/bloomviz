/**
 * Created by viktoria on 11.01.17.
 */

window.onload = function () {
    var canvas = document.getElementById('bitarray');
    var p = 10;
    var buckets = [];
    paper.setup(canvas);

    function drawArray() {
        for (var x = 0, i = 0; i < 20; x += 40, i++) {
            var rect = new paper.Path.Rectangle(0.5 + x + p, 0.5 + p, 40, 40);
            rect.strokeColor = "black";
            rect.strokeWidth = 1;
            buckets.push(rect)
        }
    }

    function fillNewSlot(positions) {
        for (var i = 0; i < positions.length; i++) {
            var rect = buckets[positions[i]];
            rect.fillColor = "#dd7a94";
        }
    }

    function fillFindSlot(positions) {
        for (var i = 0; i < positions.length; i++) {
            var rect = buckets[positions[i]];
            rect.fillColor = "#7ac5dd";
        }
    }

    function undoFindSlots() {
        for (var i = 0; i < buckets.length; i++) {
            if (buckets[i].fillColor != null) {
                buckets[i].fillColor = "#dd7a94";
            }
        }
    }


    drawArray();

    $('button#add').bind('click', function () {
        $.getJSON($SCRIPT_ROOT + '/add', {
            value: $('input[name="value"]').val()
        }, function (data) {
            fillNewSlot(data.response_add);
            $("#feedback").text("Your value was added to the array!");
        });
        return false;
    });

    $('button#find').bind('click', function () {
        $.getJSON($SCRIPT_ROOT + '/find', {
            find: $('input[name="find"]').val()
        }, function (data) {
            if (data.response_find) {
                undoFindSlots();
                fillFindSlot(data.response_find);
                $("#feedback").text("It's probably there.")
            } else {
                $("#feedback").text("Definitely not there.")
            }
        });
        return false;
    });

};