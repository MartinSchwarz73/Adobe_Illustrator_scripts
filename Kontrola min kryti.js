var doc = app.activeDocument;
var sel = doc.selection;
var root = sel[0];
var stack = [];
var LIMIT = 2.0;

var c1p = 0;
var c2p = 0;
var m1p = 0;
var m2p = 0;
var y1p = 0;
var y2p = 0;
var k1p = 0;
var k2p = 0;
var objCounter = 0;

function zeroCMYKunderLIMIT(item, prop, limit) {
    var color = item[prop];

    if (!color || color.typename !== 'CMYKColor') return;

    if (color.cyan > 0.0 && color.cyan < 1.2) c1p++;
    if (color.magenta > 0.0 && color.magenta < 1.2) m1p++;
    if (color.yellow > 0.0 && color.yellow < 1.2) y1p++;
    if (color.black > 0.0 && color.black < 1.2) k1p++;

    if (color.cyan > 0.0 && color.cyan < limit) c2p++;
    if (color.magenta > 0.0 && color.magenta < limit) m2p++;
    if (color.yellow > 0.0 && color.yellow < limit) y2p++;
    if (color.black > 0.0 && color.black < limit) k2p++;

    // item[prop] = color;
}

function fixCMYK(item, limit) {

    if (item.filled) {
        zeroCMYKunderLIMIT(item, 'fillColor', limit);
    }

    if (item.stroked) {
        zeroCMYKunderLIMIT(item, 'strokeColor', limit);
    }

    objCounter++;
}



if (!sel || sel.length !== 1 || sel[0].typename !== 'GroupItem') {
    throw new Error('Vyber prosím jednu skupinu.');
}


// alert('Skupina obsahuje ' + root.pageItems.length + ' objektù.');

for (var i = root.pageItems.length - 1; i >= 0; i--) {
    stack.push(root.pageItems[i]);
}


while (stack.length > 0) {
    var item = stack.pop();

    if (item.typename === 'GroupItem') {
        for (var j = item.pageItems.length - 1; j >= 0; j--) {
            stack.push(item.pageItems[j]);
        }
        continue;
    }

    //    if (item.typename === 'PathItem' || item.typename === 'CompoundPathItem') {
    if (item.typename === 'CompoundPathItem') {
        fixCMYK(item.pathItems[0], LIMIT);
    } else {
        fixCMYK(item, LIMIT);
    }
}


alert(objCounter + ": C=" + c1p + "/" + c2p + ", M=" + m1p + "/" + m2p + ", Y=" + y1p + "/" + y2p + ", K=" + k1p + "/" + k2p);

