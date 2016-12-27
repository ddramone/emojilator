class Emoji {

    public picture : string;
    private canvas;
    private context;
    public image;

    constructor(picture: string) {
        this.picture = picture;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        if (this.picture) this.setImage(this.picture);
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
    }



}
