var Emoji = (function () {
    function Emoji(picture) {
        this.picture = picture;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        if (this.picture)
            this.setImage(this.picture);
    }
    Emoji.prototype.eightBit = function (scale) {
        /**
         * Draws a pixelated version of an image in a given canvas
         * @param {number} scale - the scale factor: between 0 and 100
         */
        scale *= 0.01;
        var scaledW = this.canvas.width * scale;
        var scaledH = this.canvas.height * scale;
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
        this.context.drawImage(this.image, 0, 0, scaledW, scaledH);
        this.context.drawImage(this.canvas, 0, 0, scaledW, scaledH, 0, 0, this.image.width, this.image.height);
    };
    Emoji.prototype.setImage = function (picture) {
        /**
         * Set Image
         * @return {String} image
         */
        this.image = new Image();
        document.body.appendChild(this.canvas);
        var emoji = this;
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
    };
    Emoji.prototype.getCanvasColors = function () {
        /**
         * Get Picture all pixel`s colors
         * @return {Array} Objects with colors , x and y positions
         */
        var canvas = this.canvas, context = this.context;
        this.eightBit(1);
        var pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        var pixelColors = [];
        for (var g = 0, y = 0, x = 0; g < pixels.length; g += 50) {
            if (g % this.canvas.width == 0) {
                y += 50;
                x = 1;
            }
            else
                x++;
            var color = pixels[g] + ',' + pixels[g + 1] + ',' + pixels[g + 2];
            var posX = x;
            var posY = y;
            var pixelInfo = {
                color: color,
                xPosition: posX,
                yPosition: posY
            };
            pixelColors.push(pixelInfo);
        }
        return pixelColors;
    };
    Emoji.prototype.changeCanvasPixel = function () {
        var canvas = this.canvas, context = this.context;
        var testObj = {};
        var test = 1;
        console.log('start');
        for (var i = 0; i < this.getCanvasColors().length; i += 50) {
            console.log(test++);
        }
        console.log('end');
        console.log(testObj);
    };
    return Emoji;
}());
