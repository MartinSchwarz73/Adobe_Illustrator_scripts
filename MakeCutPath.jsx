var mm2pt = 25.4/72;
var doc = app.activeDocument;
var i = doc.artboards.getActiveArtboardIndex();
var x = doc.artboards[i].artboardRect[0];
var y = doc.artboards[i].artboardRect[1];
var w = Math.abs(doc.artboards[i].artboardRect[2] - doc.artboards[i].artboardRect[0]);
var h = Math.abs(doc.artboards[i].artboardRect[3] - doc.artboards[i].artboardRect[1]);
var artLayer;

try {
	artLayer = doc.layers['CutPath'];
} catch(e) {
	artLayer = doc.layers.add();
	artLayer.name = "CutPath";
}
doc.activeLayer = artLayer;
var rect = artLayer.pathItems.roundedRectangle(y - 0.1/mm2pt, x + 0.1/mm2pt, w - 0.2/mm2pt, h - 0.2/mm2pt, 2/mm2pt, 2/mm2pt, false);
rect.stroked = true;
rect.strokeWidth = 0.15 / mm2pt;
rect.strokeOverprint = true;
rect.filled = false;
var cutPathSpotColor;
try {
	cutPathSpotColor = doc.swatches['CutPath'];
} catch (e) {
	alert("Musím vytvořit barvu CutPath");
	cutPathSpotColor = doc.spots.add();
	cutPathSpotColor.name = "CutPath";
	cutPathSpotColor.tint = 100;
	cutPathSpotColor.colorType = ColorModel.SPOT;
	cutPathSpotColor.color = new CMYKColor();
	cutPathSpotColor.color.cyan = 100.0;
	cutPathSpotColor.color.magenta = 100.0;
	cutPathSpotColor.color.yellow = 100.0;
	cutPathSpotColor.color.black = 100.0;
}
rect.strokeColor = doc.swatches['CutPath'].color;