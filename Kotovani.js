var pt2mm = 25.4 / 72;
var doc = app.activeDocument;
var art = doc.artboards.getActiveArtboardIndex();
var x = doc.artboards[art].artboardRect[0];
var y = doc.artboards[art].artboardRect[1];
var w = Math.abs(doc.artboards[art].artboardRect[2] - doc.artboards[art].artboardRect[0]);
var h = Math.abs(doc.artboards[art].artboardRect[3] - doc.artboards[art].artboardRect[1]);
var points = [];
var sorted = [];
var dims = [];

var sel = doc.selection;
// alert("Sirka = " + w * mm2pt);

if (sel.length > 0) {
	for (var j = 0; j < sel.length; j++) {
		for (var i = 0; i < sel[j].selectedPathPoints.length; i++) {
			if (sel[j].selectedPathPoints[i].selected == PathPointSelection.ANCHORPOINT) {
				points.push(Math.floor((sel[j].selectedPathPoints[i].anchor[0] - x) * pt2mm * 10 + 0.5) / 10);
			}
		}
	}
}

if (points.length > 1) {
	sorted = points.sort(function (a, b) { return a - b; });
	for (i = 1; i < sorted.length; i++) {
		dims.push(sorted[i] - sorted[i - 1]);
	}
}


var vstup = prompt("Zadej kóty (zleva). První údaj 0=bez vynášecích čar, 1=vč. vynášecích čar. Druhý údaj je velikost šipky.", "1 " + Math.floor((0.8 * Math.max(h, w) * pt2mm + 0.5) / 100) + " " + dims.join(' '));

if (vstup != null) {    //  || vstup != ''
	vstup = vstup.replace(/^\s+|\s+$/gm,'');
  	var doc = app.activeDocument;
  	var i;
	var text = "";
	var dimCol =doc.swatches.getByName('Dim').color;
	vstup = vstup.replace(/,/g, '.');
	var koty = vstup.split(' ');
	var kota = 0;
	var x0 = doc.artboards[0].artboardRect[0] + sorted[0] / pt2mm;
	var y0 = doc.artboards[0].artboardRect[1];
	var cnt = 0;
	var line;
	var group;
	var kotaText;
	var vynaseciCary = parseFloat(koty[0]);
	var velikostSipky = parseFloat(koty[1]) / pt2mm;
	var yKota = 0;
	doc.defaultStrokeWidth = Math.min(1.5 / pt2mm, velikostSipky / 10);
	group = doc.activeLayer.groupItems.add();
	for (i = 2; i < koty.length; i++) {
		kota = parseFloat(koty[i])/pt2mm;
  		if (!isNaN(kota)) 
			yKota = y0+velikostSipky*3;
			line = doc.activeLayer.pathItems.add();
			line.stroked = true;
			line.strokeColor = dimCol;
			line.strokeOverprint = true;
			line.filled = false;
			line.setEntirePath(Array(Array(x0 + cnt, yKota), Array(x0 + cnt + kota, yKota)));
			line.move(group, ElementPlacement.PLACEATEND);

			line = doc.activeLayer.pathItems.add();
			line.stroked = true;
			line.strokeColor = dimCol;
			line.strokeOverprint = true;
			line.filled = false;
			line.setEntirePath(Array(Array(x0 + cnt + velikostSipky, yKota-velikostSipky/2), 
						Array(x0 + cnt , yKota), 
						Array(x0 + cnt + velikostSipky, yKota+velikostSipky/2)));
			line.move(group, ElementPlacement.PLACEATEND);

			line = doc.activeLayer.pathItems.add();
			line.stroked = true;
			line.strokeColor = dimCol;
			line.strokeOverprint = true;
			line.filled = false;
			line.setEntirePath(Array(Array(x0 + cnt + kota-velikostSipky, yKota-velikostSipky/2), 
						Array(x0 + cnt + kota, yKota), 
						Array(x0 + cnt + kota-velikostSipky, yKota+velikostSipky/2)));
			line.move(group, ElementPlacement.PLACEATEND);

			if (vynaseciCary == 1) {
				line = doc.activeLayer.pathItems.add();
				line.stroked = true;
				line.strokeColor = dimCol;
				line.strokeOverprint = true;
				line.filled = false;
				if (i == 2) {
					line.setEntirePath(Array(Array(x0 + cnt, yKota + velikostSipky), Array(x0 + cnt , yKota - velikostSipky*2)));
					line.move(group, ElementPlacement.PLACEATEND);
					line = doc.activeLayer.pathItems.add();
					line.stroked = true;
					line.strokeColor = dimCol;
					line.strokeOverprint = true;
					line.filled = false;
				}	
				line.setEntirePath(Array(Array(x0 + cnt + kota, yKota + velikostSipky), Array(x0 + cnt +kota, yKota - velikostSipky*2)));
				line.move(group, ElementPlacement.PLACEATEND);
		}
			kotaText = doc.activeLayer.textFrames.pointText(Array((x0 + cnt + x0 + cnt + kota) / 2, yKota + 0.5 * velikostSipky));
			kotaText.textRange.characterAttributes.textFont = app.textFonts.getByName("MyriadPro-Cond");
			kotaText.textRange.characterAttributes.size = Math.floor(velikostSipky*2.5);
			kotaText.contents = parseFloat(koty[i]).toString();
			kotaText.textRange.characterAttributes.filled = true;
			kotaText.textRange.characterAttributes.stroked = false;
			kotaText.textRange.characterAttributes.fillColor = dimCol;
			kotaText.textRange.characterAttributes.overprintFill = true;
			kotaText.textRange.paragraphAttributes.justification = Justification.CENTER;
			kotaText.move(group, ElementPlacement.PLACEATEND);

			cnt += kota;
	}  
	
  	redraw();
}