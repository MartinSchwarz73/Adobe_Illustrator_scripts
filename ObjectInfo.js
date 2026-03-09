#target illustrator

function showSelectedObjectInfo() {
    var doc = app.activeDocument;
    
    if (doc.selection.length == 0) {
        alert("Není vybrán žádný objekt.");
        return;
    }
    
    var selectedItem = doc.selection[0];
    
    // Zkontrolujeme přetisk na výplni a obrysu
    var hasOverprint = false;
    var fillOverprint = false;
    var strokeOverprint = false;
    
    if (selectedItem.filled) {
		fillOverprint = selectedItem.fillOverprint;
    }
    
    if (selectedItem.stroked) {
		strokeOverprint = selectedItem.strokeColor.strokeOverprint;
    }
    
    // Kontrola Blend Mode
    var blendMode = selectedItem.blendingMode;
    
    // Vytvoření zprávy pro dialog
    var message = "Informace o vybraném objektu:\n\n";
    
    // Přetisk
    if (fillOverprint || strokeOverprint) {
        message += "Objekt má přetisk:\n";
        if (fillOverprint) {
            message += "- Výplň má přetisk.\n";
        }
        if (strokeOverprint) {
            message += "- Obrys má přetisk.\n";
        }
    } else {
        message += "Objekt nemá přetisk.\n";
    }
    
    // Režim míchání
    message += "Režim míchání: " + blendMode.toString();
    
    // Zobrazíme dialog s informacemi
    alert(message);
}

showSelectedObjectInfo();
