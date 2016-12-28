import { Pixelator } from './pix';

export class Scene {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    image: HTMLImageElement;

    mosaicSize: number = 32;

    constructor() {

        this.canvas = document.getElementsByTagName('canvas')[0] || document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        this.image = new Image();

    }


    /**
     * Load image to scene
     */
    loadImage(url, callback) {

        var me = this;

        me.image.onload = () => {

            let img = <HTMLImageElement>me.image;

            // Set Canvas Dimensions
            me.canvas.width = img.width;
            me.canvas.height = img.height;

            me.context.drawImage(img, 0, 0, img.width, img.height);

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
        this.context.drawImage(this.canvas, 0, 0, scaledW, scaledH, 0, 0, this.image.width, this.image.height);

    }

    getColors() {

        let canvas = this.canvas,
            context = this.context;


        var rectW = this.mosaicSize;

        let pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;

        let pixelColors: any[] = [];

        let xPos = 0;
        let yPos = 0;

        do {

            let index = (xPos + yPos * canvas.width) * 4;

            console.log('%c ' + xPos + ' ' + yPos, 'background: rgb(' + pixels[index + 0] + ',' + pixels[index + 1] + ',' + pixels[index + 2] + ')')

            pixelColors.push({
                point: {
                    x: xPos,
                    y: yPos
                },
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

        return pixelColors;
    }

}