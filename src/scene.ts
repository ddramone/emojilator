// require.d.ts
declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

var EmojiColors = require('../public/emoji.json');

export class Scene {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    image: HTMLImageElement;

    maxImageWidth: number = 1000;
    defaultMosaicSize: number = 10;
    defaultCanvasWidth: number = 600;
    mosaicSize: number;

    private pixelColors: any;

    constructor(config?) {

        this.canvas = <HTMLCanvasElement>document.getElementById('emojiCanvas');
        this.context = this.canvas.getContext('2d');


        this.image = new Image();

    }


    /**
     * Load image to scene
     */
    loadImage(url, callback) {

        var me = this;

        me.image.onload = () => {

            let img = <HTMLImageElement>me.image;

            let ratio = img.width / img.height;

            let scaledW = img.width > this.maxImageWidth ? this.maxImageWidth : img.width;
            let scaledH = scaledW / ratio;

            if (scaledH > this.maxImageWidth) {
                scaledH = this.maxImageWidth
                scaledW = scaledH * ratio;
            }

            // Set Canvas Dimensions
            me.canvas.width = scaledW;
            me.canvas.height = scaledH;


            let width = this.defaultCanvasWidth;

            let height = width / ratio;


            this.mosaicSize = Math.round(this.defaultMosaicSize * scaledW / width);


            console.log(scaledW, scaledH, width, height, this.mosaicSize);

            document.getElementById('emojiCanvas').style.width = width + "px";
            me.canvas.style.height = height + "px";

            me.context.drawImage(img, 0, 0, scaledW, scaledH);

            callback();
        };

        me.image.src = url;



    }


    /**
    * Draws a pixelated version of an image in a given canvas
    * @param {number} scale - the scale factor: between 0 and 100
    */
    mosaic() {

        let scaledW = this.canvas.width / this.mosaicSize;
        let scaledH = this.canvas.height / this.mosaicSize;

        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.oImageSmoothingEnabled = false;
        this.context['imageSmoothingEnabled'] = false;

        this.context.drawImage(this.image, 0, 0, scaledW, scaledH);
        this.context.drawImage(this.canvas, 0, 0, scaledW, scaledH, 0, 0, this.canvas.width, this.canvas.height);

    }

    findColors() {

        let canvas = this.canvas,
            context = this.context;


        var rectW = this.mosaicSize;

        let pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;

        let pixelColors: any[] = [];

        let xPos = 0;
        let yPos = 0;

        do {

            let index = (xPos + yPos * canvas.width) * 4;

            pixelColors.push({
                point: { x: xPos, y: yPos },
                color: { r: pixels[index + 0], g: pixels[index + 1], b: pixels[index + 2] }
            })

            xPos += rectW;

            if (xPos >= canvas.width) {
                yPos += rectW;
                xPos = 0;
            }

            if (yPos >= canvas.height) {
                break;
            }

        } while (true);

        this.pixelColors = pixelColors;
    }

    getColorsJSON() {

        let data = this.pixelColors;

        let ret = {};
        for (let i in data) {
            let point = data[i].point;
            let color = data[i].color;

            let colorS = color.r + ',' + color.g + ',' + color.b;
            ret[colorS] = ret[colorS] || [];

            ret[colorS].push(point);

        }

        return ret;
    }

    matchPixels() {

        //Convert to RGB, then R, G, B
        var baseColors = Object.keys(EmojiColors);

        for (var i in this.pixelColors) {

            let point = this.pixelColors[i].point;
            let color = this.pixelColors[i].color;

            //Create an emtyp array for the difference betwwen the colors
            var differenceArray = [];

            //Function to find the smallest value in an array
            let min = function (array) {
                return Math.min.apply(Math, array);
            };

            //Convert the HEX color in the array to RGB colors, split them up to R-G-B, then find out the difference between the "color" and the colors in the array
            for (let index in baseColors) {

                let base_color = baseColors[index];
                let [base_colors_r, base_colors_g, base_colors_b] = base_color.split(',');

                //Add the difference to the differenceArray
                differenceArray.push((color.r - +base_colors_r) * (color.r - +base_colors_r) + (color.g - +base_colors_g) * (color.g - +base_colors_g) + (color.b - +base_colors_b) * (color.b - +base_colors_b));
            };

            //Get the lowest number from the differenceArray
            var lowest = min(differenceArray);

            //Get the index for that lowest number
            var index = differenceArray.indexOf(lowest);

            this.pixelColors[i].emojis = EmojiColors[baseColors[index]];
            // var match = base_colors[index];
            //Return the HEX code
        }

    }

    addSingature() {

        let me = this;
        let img = new Image();

        // img.onload = function () {

        // me.context.drawImage(img, 0, 0, img.width, img.height);

        // };

        // img.src = './public/singature.png';

    }

    drawEmojis(callback?: any) {


        let me = this;
        let img = new Image();

        let emojiSize = 64;

        let scaleTo = me.mosaicSize;

        // this.context.drawImage(this.image, 0, 0, me.canvas.width, me.canvas.height);
        // me.context.clearRect(0, 0, me.canvas.width, me.canvas.height);

        img.onload = function () {

            console.log("Starging Emojilator");


            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;
            }

            // me.pixelColors = shuffle(me.pixelColors);
            for (var i in me.pixelColors) {

                let scaleRand = scaleTo + Math.floor(Math.random() * emojiSize / 4);

                let target = me.pixelColors[i].point;
                let emojis = me.pixelColors[i].emojis;
                let lucky = Math.floor(Math.random() * emojis.length);

                let emoji = emojis[lucky];

                let angleInRadians = Math.random() * 90;

                // setTimeout(function () {
                me.context.drawImage(img, emoji.x, emoji.y, emojiSize, emojiSize, target.x, target.y, scaleRand, scaleRand);

                callback();
                // }, +i / 5)

            }

        };

        img.src = './public/img/sprite.png';

    };

    downloadCanvas(link, filename) {

        let dt = (<HTMLCanvasElement>document.getElementById("emojiCanvas")).toDataURL();

        /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
        dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

        /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
        dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

        link.href = dt;
        link.download = filename;

        // link.download = filename;
    }



}
