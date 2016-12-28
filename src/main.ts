import { Scene } from './scene';




// let scene = new Scene({ mosaicSize: 64 }); scene.loadImage('public/img/sprite.png', function () { scene.mosaic(); scene.findColors(); var json = scene.getColorsJSON(); console.log(JSON.stringify(json)); }); /**


let scene = new Scene({ mosaicSize: 16 });

scene.loadImage(
    './public/scarlet.png',
    function () {

        scene.mosaic();
        scene.findColors();

        scene.matchPixels();
        scene.drawEmojis();
    });

/** */