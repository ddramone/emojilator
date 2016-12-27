var Emoji = (function () {
    function Emoji(picture) {
        this.picture = picture;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        if (this.picture)
            this.setImage(this.picture);
    }
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
        var pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        var pixelColors = [];
        for (var g = 0, y = 0, x = 0; g < pixels.length; g += 4) {
            if (g % this.canvas.width == 0) {
                y++;
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
    };
    return Emoji;
}());
