var doc = app.activeDocument;
var sel = doc.selection;

var root = sel[0];
var stack = [];

var LIMITS = { C: 2.0, M: 2.0, Y: 2.0, K: 5.0 };
var OUTPUTS = { C: 0.0, M: 0.0, Y: 0.0, K: 0.0 };

function zeroCMYKunderLIMIT(item, prop, limits) {
    var color = item[prop];

    if (!color || color.typename !== 'CMYKColor') return;

    if (color.cyan < limits.C) color.cyan = OUTPUTS.C;
    if (color.magenta < limits.M) color.magenta = OUTPUTS.M;
    if (color.yellow < limits.Y) color.yellow = OUTPUTS.Y;
    if (color.black < limits.K) color.black = OUTPUTS.K;

    item[prop] = color;
}

function fixCMYK(item, limits) {

    // ===== FILL =====
    if (item.filled) {
        zeroCMYKunderLIMIT(item, 'fillColor', limits);
    }

    // ===== STROKE =====
    if (item.stroked) {
        zeroCMYKunderLIMIT(item, 'strokeColor', limits);
    }
}



if (!sel || sel.length !== 1 || sel[0].typename !== 'GroupItem') {
    throw new Error('Vyber prosím jednu skupinu.');
}

alert('Skupina obsahuje ' + root.pageItems.length + ' objektů.');

for (var i = root.pageItems.length - 1; i >= 0; i--) {
    stack.push(root.pageItems[i]);
}

var LIMIT = 2.0;

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
        fixCMYK(item.pathItems[0], LIMITS);
    } else {
        fixCMYK(item, LIMITS);
    }
}

alert('Hotovo.');


