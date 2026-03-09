
function getBounds ( arr ) {

    var x = [], y = [], w = [], h = [];

    for ( var i = 0; i < arr.length; i++ ) {
        x.push( arr[i].visibleBounds[0] );
        y.push( arr[i].visibleBounds[1] );
        w.push( arr[i].visibleBounds[2] );
        h.push( arr[i].visibleBounds[3] );
    }

    x = Math.min.apply( null, x );
    y = Math.max.apply( null, y );
    w = Math.max.apply( null, w );
    h = Math.min.apply( null, h );
    return rect = [x, y, w, h ];
};

var saveCoordSys = app.coordinateSystem;
app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;
var selBounds = getBounds(app.activeDocument.selection);
// alert([new UnitValue(selBounds[1], 'pt').as('mm'), new UnitValue(selBounds[0], 'pt').as('mm'), new UnitValue(selBounds[2] - selBounds[0], 'pt').as('mm'), new UnitValue(selBounds[1] - selBounds[3], 'pt').as('mm')]); 
// alert([-selBounds[1], selBounds[0], selBounds[2] - selBounds[0], selBounds[1] - selBounds[3]]);
var myRect = app.activeDocument.activeLayer.pathItems.roundedRectangle(
    selBounds[1] + new UnitValue(10, 'mm').as('pt'),
    selBounds[0] - new UnitValue(10, 'mm').as('pt'),
    selBounds[2] - selBounds[0] + new UnitValue(20, 'mm').as('pt'),
    selBounds[1] - selBounds[3] + new UnitValue(20, 'mm').as('pt'),
    new UnitValue(2, 'mm').as('pt'),
    new UnitValue(2, 'mm').as('pt'),
    false);
myRect.filled = false;
myRect.stroked = true;
myRect.strokeOverprint = true;
myRect.strokeWidth = new UnitValue(0.15, 'mm').as('pt');
app.coordinateSystem = saveCoordSys;
