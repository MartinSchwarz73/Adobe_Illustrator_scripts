if (app.documents.length > 0 ) {
	var docRef = app.activeDocument;
	var c1p = 0;
	var c2p = 0;
	var m1p = 0;
	var m2p = 0;
	var y1p = 0;
	var y2p = 0;
	var k1p = 0;
	var k2p = 0;
	
	// Check there is a selection in the document
	if (docRef.selection.length > 0 ) {
		var paths = docRef.selection;
		IterateSelection(paths);
	alert ("C="+c1p+"/"+c2p+", M="+m1p+"/"+m2p+", Y="+y1p+"/"+y2p+", K="+k1p+"/"+k2p);
	}
	else
		alert("Select some path art with colors applied before running this script");
}
else
	alert("Open a document containing some colored path art before running this script");


function IterateSelection(selectedItems)
{
	// Get the fill color of each selected item
	for (i = 0; i < selectedItems.length; i++) {
		var pathRef = selectedItems[i];
	
		// Iterate path items within group items
		if (pathRef.typename == "GroupItem") {
			var groupPaths = pathRef.pathItems;
			IterateSelection(groupPaths);
		}
		else if (pathRef.typename == "PathItem") {
			// Check if fill color is CMYK
			if (pathRef.fillColor.typename == "CMYKColor") {
				if (pathRef.fillColor.cyan < 1.0) { pathRef.fillColor.cyan = 0.0; c1p +=1; }
				else if (pathRef.fillColor.cyan < 2.0) { pathRef.fillColor.cyan = 2.0; c2p +=1; }

				if (pathRef.fillColor.magenta < 1.0) { pathRef.fillColor.magenta = 0.0; m1p +=1; }
				else if (pathRef.fillColor.magenta < 2.0) { pathRef.fillColor.magenta = 2.0; m2p +=1; }

				if (pathRef.fillColor.yellow < 1.0) { pathRef.fillColor.yellow = 0.0; y1p +=1; }
				else if (pathRef.fillColor.yellow < 2.0) { pathRef.fillColor.yellow = 2.0; y2p +=1; }

				if (pathRef.fillColor.black < 1.0) { pathRef.fillColor.black = 0.0; k1p +=1; }
				else if (pathRef.fillColor.black < 2.0) { pathRef.fillColor.black = 2.0; k2p +=1; }
			}
		}
	}
}
