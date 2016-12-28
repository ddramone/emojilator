interface IEmoji {
    picture: string;
    canvas: any;
    context: any;
}

class Emoji implements IEmoji {

    public picture: string;
    public canvas;
    public context;
    public image;

    public emojiSize = 30;

    constructor(picture: string) {
        this.picture = picture;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        if (this.picture) this.setImage(this.picture);
    }

    /**
    * Draws a pixelated version of an image in a given canvas
    * @param {number} scale - the scale factor: between 0 and 100
    */
    eightBit(scale: number) {


        scale *= 0.01;



        let scaledW = Math.floor(this.canvas.width / this.emojiSize);
        let scaledH = Math.floor(this.canvas.height / this.emojiSize);

        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

        this.context.drawImage(this.image, 0, 0, scaledW, scaledH);
        this.context.drawImage(this.canvas, 0, 0, scaledW, scaledH, 0, 0, this.image.width, this.image.height);

    }

    /**
     * Set Image
     * @return {String} image
    */
    setImage(picture) {

        this.image = new Image();

        document.body.appendChild(this.canvas);


        let emoji = this;

        this.image.setAttribute("crossOrigin", "Anonymous");
        this.image.onload = function () {
            emoji.canvas.width = this.width;
            emoji.canvas.height = this.height;
            emoji.context.drawImage(this, 0, 0, this.width, this.height);

            if (typeof this.onImageLoad === "function") {
                this.onImageLoad();
            }
        };

        this.image.src = picture;

    }

    /**
     * Get Picture all pixel`s colors
     * @return {Array} Objects with colors , x and y positions
     */
    getCanvasColors() {
        let canvas = this.canvas,
            context = this.context;


        var rectW = this.emojiSize;

        this.eightBit(1);


        let pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;

        let pixelColors: any[] = [];


        let step = 4;
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
                xPos = 1;
            }

            if (yPos >= canvas.height) {
                break;
            }



        } while (true);

        return pixelColors;
    }

    changeCanvasPixel() {
        let canvas = this.canvas,
            context = this.context;
        let testObj: any = {};

        let test: number = 1;
        console.log('start');
        for (let i = 0; i < this.getCanvasColors().length; i += 50) {
            console.log(test++);
        }
        console.log('end');
        console.log(testObj);

    }

}


function run() {
    var url = '/scarlet.png';
    var emoji = new Emoji(url);

    setTimeout(function () { emoji.getCanvasColors(); }, 1000)
}