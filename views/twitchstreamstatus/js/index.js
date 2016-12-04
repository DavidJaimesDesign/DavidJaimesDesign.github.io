
$(document).ready(function(){
	var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","esl_csgo","syndicate", "comster404"];
	var channels_data_arr = [];
	
	//helper functions
	function addOnline(stream){
		var link = stream.stream._links.self;
		var name = link.split('/');
		name = name[name.length - 1];
		var game = stream.stream.channel.game;
		var status = stream.stream.channel.status;
		var stream_div = '<a href='+ link +'> <div class="container"> <div class = "col-md stream_div_body"> <div class="row stream bottom-buffer"> <div class="col-md-6"> <h3 class = "streamName top-buffer">'+name+'</h3> <p class = "resultText top-buffer">'+game+'</p> </div> <div class = "col-md-6"> <p class = "resultText top-buffer">'+status+'</p> </div> </div> </div> </div> </div> </a>'
		$('#all').append(stream_div);
		$('#online').append(stream_div);
	}
	
	function addOffline(stream){
		var link = stream._links.self;
		var name = link.split('/');
		name = name[name.length - 1];
		var stream_div ='<a href='+ link +'> <div class="container"> <div class = "col-md stream_div_body"> <div class="row stream bottom-buffer"> <div class="col-md-6"> <h3 class = "streamName top-buffer">'+name+'</h3> </div> <div class = "col-md-6"> <h4 class = "offline-buffer-top">Offline</h4> </div> </div> </div> </div> </div> </a>'
		$('#all').append(stream_div);
		$('#offline').append(stream_div);
	}
	//api call and updating divs
	for(i = 0; i < channels.length; i++){
		$.ajax({
 			type: 'GET',
 			url: 'https://api.twitch.tv/kraken/streams/'+channels[i],
 			headers: {
   				'Client-ID': '5oecddlyq2ysl65jdfe96mowfr5evu0'
 			},
			async: false,
 			success: function(data) {
				channels_data_arr.push(data);
   				//console.log(data);
 			},
			error: function(errorMessage){
				console.log("channel is ded")
			}
		});	
	}	
	for(i = 0; i < channels_data_arr.length; i++){
		if(channels_data_arr[i].stream == null){
		   addOffline(channels_data_arr[i])
		   }else{
		   addOnline(channels_data_arr[i]);
		   }
	}
})