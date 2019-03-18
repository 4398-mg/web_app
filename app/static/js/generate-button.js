// Hook this function to Generate button element

var api_url = "http://localhost:1338"; //TODO: Extract in deployment vars file


$(document).ready( function() {

	$( "#song-history-list" ).append("<span>Scripts loaded successfully</span>");
	$( "#generate-button" ).on( "click", function() {
		console.log("jQuery Events responsive");
		callGenerate();
		} );
});

function callGenerate() {
	var callgenre = $("#genre-selector span:not(.hide-value)")[0].innerText;
	var calltempo = $("#tempo-selector span:not(.hide-value)")[0].innerText;
	var callduration = $("#duration-selector span:not(.hide-value)")[0].innerText;

	var lengths_seconds = { "Long": 240, "Medium": 180, "Short": 120 };
	console.log(lengths_seconds);
	var tempo_beats = { "Fast": 200, "Normal": 160, "Slow": 120 };

	var gen_params = [];
	gen_params.genre = callgenre;
	gen_params.length = lengths_seconds[callduration];
	gen_params.tempo = tempo_beats[calltempo];


	console.log("Parameters read from page...");
	console.log(gen_params);
	
	$.ajax({
		url: api_url + "/generate_song", 
		type: "POST",
		data: gen_params,
		/*{
			'genre': callgenre,
			'tempo': calltempo,
			'duration': callduration
		}, */
		success: report_response,
		failure: report_response,
		datatype: 'json'
	});
	
	//$.post( api_url, gen_params ).done(report_response(data));
}

function report_response(argument) {
	console.log(argument);
}
