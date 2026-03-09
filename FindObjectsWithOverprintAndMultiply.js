#target illustrator

var doc = app.activeDocument; // Aktuální dokument
var foundObjects = [];

function checkOverprintAndBlending(item) {
    // Zkontrolujeme, zda má objekt nastavený přetisk
    if (item.stroked || item.filled) {
        var hasOverprint = item.fillOverprint || item.strokeOverprint;

        // Pokud má objekt výplň, zkontrolujeme přetisk na výplni
 //       if (item.fillColor.typename == 'SpotColor') {
 //           hasOverprint = item.fillColor.spot.overprint;
 //       } else if (item.fillColor.typename == 'RGBColor' || item.fillColor.typename == 'CMYKColor') {
 //           hasOverprint = item.fillColor.overprint;
 //       }

        // Zkontrolujeme, zda má nastavený režim míchání "Násobit"
        if (hasOverprint && (item.blendingMode == BlendModes.MULTIPLY || item.blendingMode == BlendModes.DARKEN)) {
	//	  if (hasOverprint) {
            foundObjects.push(item); // Přidáme objekt do seznamu
        }
    }
}

function processPageItems(items) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        // Pokud je objekt skupina, prohledáme její objekty
        if (item.typename === "GroupItem") {
            processPageItems(item.pageItems); // Rekurzivní prohledání vnitřních objektů skupiny
        } else {
            checkOverprintAndBlending(item); // Zkontrolujeme aktuální objekt
        }
    }
}

// Projdeme všechny vrstvy a hledáme pouze v odemčených
for (var i = 0; i < doc.layers.length; i++) {
    var layer = doc.layers[i];

    // Pokud je vrstva odemčená, prohledáme její objekty
    if (!layer.locked) {
        processPageItems(layer.pageItems); // Prohledáme všechny objekty na vrstvě
    }
}

// Pokud byly nalezeny objekty, zobrazíme je v panelu
if (foundObjects.length > 0) {
    var selectObjects = confirm("Nalezeno " + foundObjects.length + " objektů s přetiskem a mícháním Násobit. Vybrat objekty ?", "Dotaz");
	if (selectObjects) {
		for (var i = 0; i< foundObjects.length; i++) {
			foundObjects[i].selected = true;
		}
		app.redraw();
	}
} else {
    alert('Nebyl nalezen žádný objekt s přetiskem a mícháním Násobit.');
}
