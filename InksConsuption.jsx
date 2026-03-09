if (app.documents.length > 0 ) {
	doc = app.activeDocument;
	app.paste();
	x = doc.selection;
	xLines = x[0].textRange.lines;
	text = "";
	for (i = 0; i < (xLines.length - 1); i++) {
		(i == 0) ? shift = 1 : shift = 0;
		xSplitted = xLines[i].contents.split('\t');
		text += xSplitted[0 + shift] + " - " +
			Math.floor((parseInt(xSplitted[6 + shift]) + 90) / 100) + " / " +
			parseFloat(xSplitted[7 + shift]).toFixed(1).replace(".", ",") + "%";
		text += "\n";
	}
	x[0].textRange.contents = text;
	x[0].textRange.characterAttributes.filled = true;
	x[0].textRange.characterAttributes.stroked = false;
	var color = new GrayColor();
	color.gray = 100;
	x[0].textRange.characterAttributes.fillColor = color;

}
