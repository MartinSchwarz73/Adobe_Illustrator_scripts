var vstup = prompt("Zadej kóty (zleva). První údaj 0=bez vynášecích čar, 1=vč. vynášecích čar. Druhý údaj je velikost šipky.", "1 2 52,4 56,3 95,2 85");

if (vstup != null || vstup != '') {
	vstup = vstup.replace(/^\s+|\s+$/gm,'');
  	var doc = app.activeDocument;
	var pt2mm = 0.35277777777778;
  	var i;
	var text = "";
	var dimCol =doc.swatches.getByName('Dim').color;
	vstup = vstup.replace(/,/g, '.');
	var koty = vstup.split(' ');
	var kota = 0;
	var x0 = doc.artboards[0].artboardRect[0];
	var y0 = doc.artboards[0].artboardRect[1];
	var cnt = 0;
	var line;
	var group;
	var kotaText;
	var vynaseciCary = parseFloat(koty[0]);
	var velikostSipky = parseFloat(koty[1])/pt2mm;
	var yKota = 0;
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
			kotaText = doc.activeLayer.textFrames.pointText(Array((x0 + cnt + x0 + cnt + kota)/2, yKota+5));
			kotaText.textRange.characterAttributes.textFont = app.textFonts.getByName("MyriadPro-Cond");
			kotaText.textRange.characterAttributes.size = velikostSipky*2.5;
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