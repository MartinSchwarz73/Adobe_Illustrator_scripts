if (app.documents.length > 0 ) {
	var docRef = app.activeDocument;

	//	alert(docRef.selection);

	var actLayer = docRef.activeLayer;
	// var allArt = docRef.pageItems;
	//alert("PageItems=" + docRef.pageItems.length);
	//var cntLayer = docRef.layers.add();
	//var myCounter = cntLayer.textFrames.add();
	//myCounter.contents = actLayer.pageItems.length;
	var cnt = 0;

	redraw();
	alert("Start");
	alert(actLayer.pageItems.length);
	IterateSelection(actLayer.pageItems);
	redraw();
	alert("Konec");
}
else {
	alert("Open a document containing some colored path art before running this script");
}

function IterateSelection(selectedItems)
{
	// Get the fill color of each selected item
	// alert("IterateSelection" + selectedItems.length);
	for (var i = 0; i < selectedItems.length; i++) {
		var pathRef = selectedItems[i];
		alert(i + ": " + pathRef.typename);
	
		// Iterate path items within group items
		if (pathRef.typename == "GroupItem") {
			// alert(pathRef.compoundPathItems.length);
			let groupPaths = pathRef.pathItems;
			alert("Vnoření: " + groupPaths + "/" + groupPaths.length);
			IterateSelection(groupPaths);
		}
		else if (pathRef.typename == "PathItem" || pathRef.typename == "CompoundPathItem") {
			// Check if fill color is CMYK
			// alert(i + "-" + pathRef + "-" + pathRef.name);
			if (pathRef.typename == "CompoundPathItem") {
				pathRef = pathRef.pathItems[0];
			}
			if (pathRef.fillColor.typename == "CMYKColor" || pathRef.strokeColor.typename == "CMYKColor") {
				pathRef.selected = true;
				myCounter.contents = ++cnt;
				if ((cnt % 50) == 0) {
					alert("Selected: "+cnt);
				}
			}
		}
	}
}
