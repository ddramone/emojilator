// require.d.ts
declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

import { Scene } from './scene';

let Dropzone: any = require('dropzone');

let scene: Scene;


Dropzone.options.myAwesomeDropzone = {
    // paramName: "file", // The name that will be used to transfer the file

    maxFilesize: 10, // MB
    accept: function (file, done) {

        scene = new Scene({ mosaicSize: 16 });

        let fileLoader = new FileReader();
        fileLoader.onload = function () {

            scene.loadImage(
                this.result,
                function () {

                    scene.mosaic();
                    scene.findColors();

                    scene.matchPixels();
                    scene.drawEmojis();
                });
        }

        fileLoader.readAsDataURL(file);

        this.removeFile(file);

    }
};


// scene = new Scene({ mosaicSize: 64 }); scene.loadImage('public/tst.png', function () { scene.mosaic(); scene.findColors(); var json = scene.getColorsJSON(); console.log(JSON.stringify(json)); }); /**

