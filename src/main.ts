// require.d.ts
declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

import { Scene } from './scene';

// let Dropzone: any = require('dropzone');

// Dropzone.options.myAwesomeDropzone = {
//     // paramName: "file", // The name that will be used to transfer the file

//     maxFilesize: 2, // MB
//     accept: function (file, done) {

//         scene.loadImage(
//             file,
//             function () {

//                 scene.mosaic();
//                 scene.findColors();

//                 scene.matchPixels();
//                 scene.drawEmojis();
//             });

//     }
// };


// let scene = new Scene({ mosaicSize: 64 }); scene.loadImage('public/tst.png', function () { scene.mosaic(); scene.findColors(); var json = scene.getColorsJSON(); console.log(JSON.stringify(json)); }); /**


let scene = new Scene({ mosaicSize: 12 });
/*
scene.loadImage(
    './public/test/1.jpg',
    // './public/test/2.jpg',
    // './public/test/3.jpg',
    // './public/test/4.jpg',
    // 'https://scontent-fra3-1.xx.fbcdn.net/v/t31.0-8/13767260_1433496213333986_8000392645788360920_o.jpg?oh=1f6d4460477b38c496ae192151675c18&oe=58EA00FA',
    function () {

        scene.mosaic();
        scene.findColors();

        scene.matchPixels();
        scene.drawEmojis();
    });

/** */


(function () {

    var processFiles = function (event) {

        event.stopPropagation();
        event.preventDefault();
        removeDropZoneClass();

        // FileList object of File objects
        var file = event.dataTransfer.files[0];
        var output = [];

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
        let res = fileLoader.readAsDataURL(file);



    };

    var highlightDropZone = function (e) {
        e.stopPropagation();
        e.preventDefault();
        document.getElementById('drop_zone').setAttribute('class', 'highlight');
    }

    var removeDropZoneClass = function () {
        document.getElementById('drop_zone').removeAttribute('class');
    }

    // add event listeners if File API is supported
    var dropZone = document.getElementById('drop_zone');


    dropZone.addEventListener('drop', processFiles, false);
    dropZone.addEventListener('dragover', highlightDropZone, false);
    dropZone.addEventListener('dragenter', highlightDropZone, false);
    dropZone.addEventListener('dragleave', removeDropZoneClass, false);
    dropZone.innerHTML = 'Drop files here';

})();