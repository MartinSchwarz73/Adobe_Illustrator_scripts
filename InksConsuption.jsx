if (app.documents.length > 0 ) {
	doc = app.activeDocument;
	app.paste();
	x = doc.selection;
	xLines = x[0].textRange.lines;
	text = "";
	for(i=0; i < xLines.length; i++) {
		xSplitted = xLines[i].contents.split('\t');
		text += xSplitted[0] + " - " + Math.floor((parseInt(xSplitted[6])+90)/100) + " / " + parseFloat(xSplitted[7]).toFixed(1).replace(".", ",") + "%";
		text += "\n";
	}
	x[0].textRange.contents = text;

}
