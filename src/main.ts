import { Scene } from './scene';

let scene = new Scene();

scene.loadImage('public/scarlet.png', function () {

    scene.mosaic();

    scene.getColors();
});

