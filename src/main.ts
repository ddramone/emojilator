import { Scene } from './scene';




// let scene = new Scene({ mosaicSize: 64 }); scene.loadImage('public/img/sprite.png', function () { scene.mosaic(); scene.findColors(); var json = scene.getColorsJSON(); console.log(JSON.stringify(json)); }); /**


let scene = new Scene({ mosaicSize: 32 });

scene.loadImage(
<<<<<<< HEAD
    'https://scontent-fra3-1.xx.fbcdn.net/v/t31.0-8/15000220_1444436535584079_6723146236336182812_o.jpg?oh=217bc63f8222c2cd76c513fdcf005585&oe=58EEAECD',
=======
    'https://scontent-frt3-1.xx.fbcdn.net/v/t31.0-8/221005_608140322542477_969414990_o.jpg?oh=d9e1b041f1d4247e6160fd78175b2f47&oe=5921D78A',
>>>>>>> f3e10afea786aefcbd3a9562937208019f07ff13
    function () {

        scene.mosaic();
        scene.findColors();

        scene.matchPixels();
        scene.drawEmojis();
    });

/** */