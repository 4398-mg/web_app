$(document).ready(function () {

    var songs = [{ "title": "Crowd Cheering", "href": "https://sample-videos.com/audio/mp3/crowd-cheering.mp3" }, { "title": "Wave", "href": "https://sample-videos.com/audio/mp3/wave.mp3" }]
    var history = '';

    var song_index;
    for (song_index = 0; song_index < songs.length; song_index++) {
        history += '<a href="';
        history += songs[song_index]['href'] + '" ';
        history += 'class="list-group-item">';
        history += songs[song_index]['title'];
        history += "</a>\n";
    }

    $('#song-history-list').append(history);

    // var datastring = $.getJSON(songs, function() {
    // 	var data = $.parseJSON(datastring)
    // 	var table = "";
    // 	var song;
    // 	for (song = 0; song < data.length; song++) { 
    // 	  history += '<a href="';
    // 	  history += data[song]['href'] + '" ';
    // 	  history += 'class="list-group-item">';
    // 	  history += data[song]['title'];
    // 	  history += "</a>\n";
    // 	}

    // 	$('#song-history-list').append(history);
    // });
});