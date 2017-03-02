// require.d.ts
declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

import { Scene } from './scene';

let Dropzone: any = require('dropzone');
let scene: Scene;

scene = new Scene();

document.getElementById('download').addEventListener('click', function () {
    scene.downloadCanvas(this, 'Emoji.png');
}, false);

Dropzone.options.myAwesomeDropzone = {

    maxFilesize: 6, // MB

    error: function (file) {

        alert("Choose smaller image. Maximum 6MB");
        this.removeFile(file);

        return false;
    },
    accept: function (file, done) {

        document.getElementsByTagName('body')[0].classList.add('is-loading');



        let fileLoader = new FileReader();
        fileLoader.onload = function () {


            scene.loadImage(
                this.result,
                function () {


                    scene.mosaic();
                    scene.findColors();

                    scene.matchPixels();
                    scene.drawEmojis(function () {

                        scene.addSingature();
                        document.getElementsByTagName('body')[0].classList.remove('is-loading');
                        document.getElementsByTagName('body')[0].classList.add('is-done');
                    });
                });
        }



        fileLoader.readAsDataURL(file);

        this.removeFile(file);

    }
};


// scene = new Scene({ mosaicSize: 64 }); scene.loadImage('public/tst.png', function () { scene.findColors(); var json = scene.getColorsJSON(); console.log(JSON.stringify(json)); document.getElementsByTagName('body')[0].classList.add('is-done'); });

