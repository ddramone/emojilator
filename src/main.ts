import { Scene } from './scene';




// let scene = new Scene({ mosaicSize: 64 }); scene.loadImage('public/img/sprite.png', function () { scene.mosaic(); scene.findColors(); var json = scene.getColorsJSON(); console.log(JSON.stringify(json)); }); /**


let scene = new Scene({ mosaicSize: 16 });

scene.loadImage(
    'https://scontent-fra3-1.xx.fbcdn.net/v/t31.0-8/15000220_1444436535584079_6723146236336182812_o.jpg?oh=217bc63f8222c2cd76c513fdcf005585&oe=58EEAECD',
    function () {

        scene.mosaic();
        scene.findColors();

        scene.matchPixels();
        scene.drawEmojis();
    });

/** */