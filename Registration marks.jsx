main();

function main() {
    var doc = app.activeDocument;

//	alert(doc.artboards[0].artboardRect[0]+" "+doc.artboards[0].artboardRect[1]+" "+doc.artboards[0].artboardRect[2]+" "+doc.artboards[0].artboardRect[3]);
//	alert(app.textFonts.getByName("MyriadPro-Cond"));
//	return;
    var selectedSwatches = doc.swatches.getSelected();
    var pointer = 0;
    var pt2mm = 0.35277777777778;


    if (selectedSwatches.length > 0) {
	doc.defaultFilled = true;
	doc.defaultStroked = false;
	var whiteColor = new CMYKColor();
	whiteColor.cyan = 0;
	whiteColor.magenta = 0;
	whiteColor.yellow = 0;
	whiteColor.black = 0;
	var myBlack = new CMYKColor();
	myBlack.cyan = 0;
	myBlack.magenta = 0;
	myBlack.yellow = 0;
	myBlack.black = 99;
	var registrCol =app.activeDocument.swatches[1].color;
//	doc.defaultFillColor = whiteColor;
        var text = '';
        var tFBarvy = doc.activeLayer.textFrames.add();
        var tFNazev = doc.activeLayer.textFrames.add();
	tFBarvy.textRange.characterAttributes.size = 8;
	tFBarvy.textRange.characterAttributes.textFont = app.textFonts.getByName("MyriadPro-Cond");
	tFNazev.textRange.characterAttributes.size = 8;
	tFNazev.textRange.characterAttributes.textFont = app.textFonts.getByName("MyriadPro-Cond");
	var nazev = app.activeDocument.name.split(' ').join('');
	nazev = nazev.substr(0,nazev.length-4)
	w = tFNazev.words.add(nazev);
	w.filled = true;
	w.stroked = false;
	w.fillColor = registrCol;
	w.justification = Justification.RIGHT;
	
        for (var i = 0; i < selectedSwatches.length; i++) {
		var swatch = selectedSwatches[i]
		var color = swatch.color;
		var barva = swatch.name;
		if (color.typename == "CMYKColor") {
			if (color.cyan == 100.0 & (color.magenta+color.yellow+color.black) == 0.0) barva = "C"
			if (color.magenta == 100.0 & (color.cyan+color.yellow+color.black) == 0.0) barva = "M"
			if (color.yellow == 100.0 & (color.magenta+color.cyan+color.black) == 0.0) barva = "Y"
			if (color.black == 100.0 & (color.magenta+color.yellow+color.cyan) == 0.0) barva = "K"
		}
		barva = barva.split(' ').join('');
		if (barva != 'C') barva = barva.replace(/PANTONE|C/g, "");
		tFBarvy.words.add(barva);
		tFBarvy.words[i].filled = true;
		tFBarvy.words[i].stroked = false;
		if (barva == "K") { tFBarvy.words[i].fillColor = myBlack; }
		else { tFBarvy.words[i].fillColor = color;	}
        }
	var vzdOdKraje = 8/pt2mm;
	tFBarvy.rotate(90);
	tFNazev.rotate(90);
	tFNazev.left = doc.artboards[0].artboardRect[2] - vzdOdKraje;
	tFNazev.top = (doc.artboards[0].artboardRect[1] + doc.artboards[0].artboardRect[3])/2 - 10/pt2mm;
	tFBarvy.left = doc.artboards[0].artboardRect[2] - vzdOdKraje;
	tFBarvy.top = (doc.artboards[0].artboardRect[1] + doc.artboards[0].artboardRect[3])/2 + tFBarvy.height + 10/pt2mm;

	var mikrobod = doc.activeLayer.compoundPathItems.add();
	var vnejsiPrumer = 0.38/pt2mm;
	var vnitrniPrumer = 0.22/pt2mm;
	doc.defaultStroked = false;
	var vnejsi = mikrobod.pathItems.ellipse((doc.artboards[0].artboardRect[1] + doc.artboards[0].artboardRect[3])/2 + vnejsiPrumer/2, doc.artboards[0].artboardRect[0] + vzdOdKraje - vnejsiPrumer/2, vnejsiPrumer, vnejsiPrumer, false);
	var vnitrni = mikrobod.pathItems.ellipse((doc.artboards[0].artboardRect[1] + doc.artboards[0].artboardRect[3])/2 + vnitrniPrumer/2, doc.artboards[0].artboardRect[0] + vzdOdKraje - vnitrniPrumer/2, vnitrniPrumer, vnitrniPrumer, true);
	vnejsi.filled = true;
	vnejsi.fillColor = registrCol;
	vnejsi.stroked = false;
	var mikrobodR = mikrobod.duplicate();
	mikrobodR.translate(doc.artboards[0].artboardRect[2]-doc.artboards[0].artboardRect[0]-2*vzdOdKraje);

	var group = doc.activeLayer.groupItems.add();
	mikrobodR.moveToBeginning(group);
	mikrobod.moveToBeginning(group);	
	redraw();
    } else {
        alert("No Swatches selected.");
    }
}
