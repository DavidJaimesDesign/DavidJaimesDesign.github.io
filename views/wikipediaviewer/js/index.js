//wiki search api: https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=potato+canon
$(document).ready(function(){
	$.ajaxSetup({ cache: false });	
	$("#random").on('click',function(){window.location.href='https://en.wikipedia.org/wiki/Special:Random';})
	$("#searchWiki").submit(function(q){
		q.preventDefault();
		var queryRaw = $("#searchWiki").serializeArray();
		var query = (queryRaw[0].value).replace(/ /g,"+");
		$.ajax({
			type: 'GET',
			url: ' https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1',
			contentType: "application/json; charset=utf-8",
			async: false,
			dataType: 'jsonp',
			data: {
				srsearch: query
				},
			success:function(data){
				var dataArray = data.query.search;
				console.log(data)
				for(i = 0; i < dataArray.length; i++){
					var entryTitle   = dataArray[i].title;
					var entrySnippet = dataArray[i].snippet;
					var link         = "https://en.wikipedia.org/wiki/" + entryTitle;
					var divAdd = ' <a href='+ link +'><div class="container"> <div class="row result top-buffer"> <div class="col-md"> <h4 class = "resultText col-md-3 top-buffer">' + entryTitle + '</h4> <p class = "resultText top-buffer">'+ entrySnippet +'</p></div> </div> </div> </div></a>'
					$(divAdd).appendTo(".intro-body");
				}
    			},
			error: function(errorMessage){}
  		})
	})
})
