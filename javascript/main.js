var note_json = [];

// http://papermashup.com/read-url-get-variables-withjavascript/
function getUrlVars() {
    var vars  = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, 
    function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// Makes a number between min and max, inclusive
function rand_int(min, max) {
    var diff = max - min;
    if(diff < 0) return -1;

    return Math.floor(Math.random()*(diff+1)) + min;
}

function create_note(note_text, already_in_json) {
    var color_array = ['ffc', 'cfc', 'ccf'];

    var note_id     = "note_id_" + rand_int(1, 1000);
    var rotate_val  = rand_int(-20, 20);
    var top_pos     = rand_int(1, 90);
    var left_pos    = rand_int(1, 90);
    var bg_color    = color_array[rand_int(0, color_array.length-1)];
    var rotate_text = 'rotate('+rotate_val+'deg)';

    $('body').append("<div id=\""+note_id+"\" class=\"note\">"+note_text+"</div>");

    var css_array = { 'top' : top_pos+'%', 'left' : left_pos+'%', 
                      '-webkit-transform' : rotate_text, '-o-transform' : rotate_text,
                      '-moz-transform' : rotate_text, 'background-color' : bg_color};

    for(key in css_array)
        $('#'+note_id).css(key, css_array[key]);

    $('#'+note_id).draggable();

    note_json.push({ text: encodeURIComponent(note_text)});        
}

function save_notes() {
    var base_url = window.location.href.split('?')[0]+'?json=';
    var data     = note_json; 

    var data_array = [];
    for(var i=0; i<note_json.length; i++)
        data_array.push(JSON.stringify(note_json[i]));
    data = data_array.join(',');

    window.location.assign(base_url+data);
}

$(document).ready(function() {
    var data = getUrlVars()['json'];
    data     = data.split(',');

    for(var i=0;i<=data.length-1;i++) {
        data[i] = decodeURIComponent(data[i]);
        data[i] = jQuery.parseJSON(data[i]);

        create_note(data[i]['text'], true);
    }
});
