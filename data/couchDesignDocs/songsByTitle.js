function(doc) {
	if (doc.type == "song") {
		var artistStr = doc.artist.toLowerCase();
		var titleStr = doc.title.toLowerCase();
		var str = artistStr + " " + titleStr + " " + artistStr;
		str = str.replace(/^\s+|\s+$/g,'');
		var words = str.split(" ");
		var count = words.length;
		for(var i = 0; i < count; i++){
			var ngramWords = words.slice(i);
			var ngramStr = ngramWords.join(" ");
			emit(ngramStr, doc);
		}
	}
}