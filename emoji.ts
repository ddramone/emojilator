interface IEmoji {
    picture: string;
    canvas: any;
    context: any;
}

class Emoji implements IEmoji{

    public picture : string;
    public canvas;
    public context;
    public image;

    constructor(picture: string) {
        this.picture = picture;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        if (this.picture) this.setImage(this.picture);
    }

    eightBit(scale : number) {
        /**
         * Draws a pixelated version of an image in a given canvas
         * @param {number} scale - the scale factor: between 0 and 100
         */

        scale *= 0.01;

        let scaledW = this.canvas.width * scale;
        let scaledH = this.canvas.height * scale;

        let context = this.canvas.getContext('2d');

        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        context.drawImage(this.image, 0, 0, scaledW, scaledH);
        context.drawImage(this.canvas, 0, 0, scaledW, scaledH, 0, 0, this.image.width, this.image.height);

    }

    setImage(picture) {
        /**
         * Set Image
         * @return {String} image
         */
        this.image = new Image();

        document.body.appendChild(this.canvas);


        let emoji = this;

        this.image.setAttribute("crossOrigin", "Anonymous");
        this.image.onload = function(){
            emoji.canvas.width = this.width;
            emoji.canvas.height = this.height;
            emoji.context.drawImage(this, 0, 0, this.width, this.height);

            if (typeof this.onImageLoad === "function") {
                this.onImageLoad();
            }
        };

        this.image.src = picture;


    }

    getCanvasColors() {
        /**
         * Get Picture all pixel`s colors
         * @return {Array} Objects with colors , x and y positions
         */
        let canvas = this.canvas,
            context = this.context;

        this.eightBit(2);


        let pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;

        let pixelColors: any[] = [];

        for(let g = 0 , y = 0 , x = 0; g < pixels.length ; g += 4) {
            if(g % this.canvas.width == 0) {
                y++;
                x = 1;
            } else x++;
            let color: string = pixels[g] + ',' + pixels[g + 1] + ',' + pixels[g + 2];
            let posX : number = x ;
            let posY : number = y ;
            let pixelInfo : any = {
              color: color,
              xPosition : posX,
              yPosition: posY
            };
            pixelColors.push(pixelInfo);
        }

        return pixelColors;
    }

    changeCanvasPixel() {
        let canvas = this.canvas,
            context = this.context;
        let testObj : any = {};

        console.log('start');
        for(let i = 0 , x = 0 , y = 0 ; i < 500; i++) {
            console.log(i);
            let testArray : any[] = [];
            if(x % this.canvas.width == 0) {
                x = 0;
                y = y + 2;
            } else {
                x = x + 2;
            }

            testObj = {
                firstColor : context.getImageData( x , y , canvas.width , canvas.height).data,
                secondColor: context.getImageData( x + 1 , y , canvas.width , canvas.height).data,
                thirdColor : context.getImageData( x , y + 1 , canvas.width , canvas.height).data,
                fourthColor: context.getImageData(x + 1 , y + 1 , canvas.width , canvas.height).data,
            }

        }
        console.log('end');
        console.log(testObj);

    }

}
