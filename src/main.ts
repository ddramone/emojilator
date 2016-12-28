import { Scene } from './scene';




// let scene = new Scene({ mosaicSize: 64 }); scene.loadImage('public/img/sprite.png', function () { scene.mosaic(); scene.findColors(); var json = scene.getColorsJSON(); console.log(JSON.stringify(json)); }); /**


let scene = new Scene({ mosaicSize: 10 });

scene.loadImage(
    'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/1625580_10203135863225821_1927146089_n.jpg?oh=13a9d73b50eb8f493cd656f99ec36240&oe=58DF0F42',
    function () {

        scene.mosaic();
        scene.findColors();

        scene.matchPixels();
        scene.drawEmojis();
    });

/** */