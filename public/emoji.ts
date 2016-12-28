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
    public emojis;

    public emojiSize = 64;

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

        let me = this;
        me.image = new Image();
        me.emojis = new Image();

        document.body.appendChild(this.canvas);

        me.image.setAttribute("crossOrigin", "Anonymous");


        me.image.onload = function () {

            me.canvas.width = this.width;
            me.canvas.height = this.height;
            me.context.drawImage(this, 0, 0, this.width, this.height);

            var points = me.getCanvasColors();

            var pnts = '';
            var clrs = '';

            for (var i in points) {

                var point = points[i].point;
                var color = points[i].color;
                pnts += `{ x: ${point.x}, y:${point.y} },`;
                clrs += `{ r: ${color.r}, g: ${color.g}, b: ${color.b} },`;

            }
            // console.log(pnts)
            // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            // console.log(clrs)

            // return;

            setTimeout(function () {
                console.log('drawing');

                me.context.clearRect(0, 0, me.canvas.width, me.canvas.height);

                for (var i = 0; i < points.length; i += 1) {

                    var indx = me.getSimilarColors(points[i].color);

                    me.drawEmoji(indx, points[i].point);

                }
            }, 1000)

        };

        this.image.src = picture;
        this.emojis.src = '/emojis.png';

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
            // console.log('%c ' + xPos + ' ' + yPos, 'background: rgb(' + pixels[index + 0] + ',' + pixels[index + 1] + ',' + pixels[index + 2] + ')')

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

    getSimilarColors(color) {

        var base_colors = [
            { r: 239, g: 222, b: 194 }, { r: 79, g: 209, b: 217 }, { r: 91, g: 90, b: 141 }, { r: 220, g: 179, b: 92 }, { r: 249, g: 249, b: 249 }, { r: 242, g: 132, b: 143 }, { r: 66, g: 173, b: 226 }, { r: 91, g: 90, b: 141 }, { r: 62, g: 67, b: 71 }, { r: 42, g: 95, b: 158 }, { r: 149, g: 71, b: 81 }, { r: 255, g: 255, b: 255 }, { r: 166, g: 90, b: 11 }, { r: 185, g: 187, b: 188 }, { r: 255, g: 255, b: 255 }, { r: 91, g: 90, b: 141 }, { r: 66, g: 173, b: 226 }, { r: 237, g: 76, b: 92 }, { r: 237, g: 76, b: 92 }, { r: 255, g: 255, b: 255 }, { r: 162, g: 157, b: 97 }, { r: 62, g: 67, b: 71 }, { r: 237, g: 76, b: 92 }, { r: 79, g: 209, b: 217 }, { r: 255, g: 230, b: 46 }, { r: 255, g: 206, b: 49 }, { r: 131, g: 191, b: 79 }, { r: 249, g: 249, b: 249 }, { r: 255, g: 255, b: 255 }, { r: 246, g: 141, b: 70 }, { r: 251, g: 215, b: 219 }, { r: 237, g: 76, b: 92 }, { r: 227, g: 87, b: 101 }, { r: 120, g: 135, b: 50 }, { r: 246, g: 165, b: 173 }, { r: 66, g: 139, b: 193 }, { r: 194, g: 179, b: 54 }, { r: 255, g: 255, b: 255 }, { r: 42, g: 95, b: 158 }, { r: 62, g: 67, b: 71 }, { r: 201, g: 71, b: 71 }, { r: 231, g: 212, b: 134 }, { r: 79, g: 209, b: 217 }, { r: 237, g: 76, b: 92 }, { r: 105, g: 150, b: 53 }, { r: 201, g: 71, b: 71 }, { r: 244, g: 47, b: 76 }, { r: 46, g: 50, b: 54 }, { r: 255, g: 230, b: 46 }, { r: 255, g: 255, b: 255 }, { r: 249, g: 249, b: 249 }, { r: 91, g: 90, b: 141 }, { r: 191, g: 124, b: 148 }, { r: 255, g: 206, b: 49 }, { r: 237, g: 76, b: 92 }, { r: 148, g: 162, b: 102 }, { r: 249, g: 249, b: 249 }, { r: 201, g: 71, b: 71 }, { r: 119, g: 119, b: 161 }, { r: 148, g: 175, b: 206 }, { r: 42, g: 95, b: 158 }, { r: 105, g: 150, b: 53 }, { r: 255, g: 135, b: 54 }, { r: 188, g: 155, b: 177 }, { r: 79, g: 209, b: 217 }, { r: 237, g: 76, b: 92 }, { r: 250, g: 210, b: 214 }, { r: 183, g: 219, b: 207 }, { r: 255, g: 255, b: 255 }, { r: 163, g: 145, b: 175 }, { r: 198, g: 198, b: 198 }, { r: 46, g: 50, b: 53 }, { r: 177, g: 199, b: 151 }, { r: 255, g: 255, b: 255 }, { r: 253, g: 238, b: 239 }, { r: 96, g: 170, b: 82 }, { r: 62, g: 67, b: 71 }, { r: 239, g: 228, b: 191 }, { r: 245, g: 195, b: 200 }, { r: 237, g: 76, b: 92 }, { r: 253, g: 238, b: 239 }, { r: 66, g: 139, b: 193 }, { r: 42, g: 95, b: 158 }, { r: 255, g: 255, b: 255 }, { r: 66, g: 139, b: 193 }, { r: 109, g: 149, b: 192 }, { r: 78, g: 91, b: 146 }, { r: 66, g: 139, b: 193 }, { r: 237, g: 76, b: 92 }, { r: 255, g: 255, b: 255 }, { r: 79, g: 209, b: 217 }, { r: 255, g: 230, b: 46 }, { r: 237, g: 76, b: 92 }, { r: 255, g: 206, b: 49 }, { r: 237, g: 76, b: 92 }, { r: 148, g: 152, b: 155 }, { r: 218, g: 18, b: 26 }, { r: 255, g: 206, b: 49 }, { r: 62, g: 67, b: 71 }, { r: 62, g: 67, b: 71 }, { r: 225, g: 160, b: 160 }, { r: 42, g: 95, b: 158 }, { r: 255, g: 206, b: 49 }, { r: 255, g: 206, b: 49 }, { r: 255, g: 255, b: 255 }, { r: 157, g: 194, b: 221 }, { r: 91, g: 90, b: 141 }, { r: 255, g: 221, b: 125 }, { r: 125, g: 142, b: 153 }, { r: 180, g: 178, b: 51 }, { r: 62, g: 67, b: 71 }, { r: 255, g: 255, b: 255 }, { r: 249, g: 193, b: 199 }, { r: 91, g: 90, b: 141 }, { r: 71, g: 175, b: 226 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 231, b: 56 }, { r: 249, g: 249, b: 249 }, { r: 255, g: 255, b: 255 }, { r: 62, g: 67, b: 71 }, { r: 104, g: 153, b: 208 }, { r: 243, g: 162, b: 170 }, { r: 255, g: 255, b: 255 }, { r: 249, g: 249, b: 249 }, { r: 251, g: 231, b: 97 }, { r: 66, g: 139, b: 193 }, { r: 250, g: 210, b: 214 }, { r: 208, g: 221, b: 194 }, { r: 237, g: 76, b: 92 }, { r: 237, g: 76, b: 92 }, { r: 255, g: 255, b: 255 }, { r: 79, g: 209, b: 217 }, { r: 237, g: 76, b: 92 }, { r: 255, g: 230, b: 46 }, { r: 235, g: 196, b: 196 }, { r: 237, g: 76, b: 92 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 }, { r: 248, g: 121, b: 64 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 206, b: 49 }, { r: 174, g: 167, b: 114 }, { r: 62, g: 67, b: 71 }, { r: 211, g: 151, b: 110 }, { r: 237, g: 76, b: 92 }, { r: 130, g: 115, b: 155 }, { r: 249, g: 249, b: 249 }, { r: 91, g: 90, b: 141 }, { r: 84, g: 193, b: 151 }, { r: 79, g: 209, b: 217 }, { r: 255, g: 255, b: 255 }, { r: 227, g: 238, b: 217 }, { r: 62, g: 67, b: 71 }, { r: 139, g: 85, b: 125 }, { r: 201, g: 71, b: 71 }, { r: 194, g: 167, b: 187 }, { r: 62, g: 67, b: 71 }, { r: 105, g: 150, b: 53 }, { r: 249, g: 249, b: 249 }, { r: 255, g: 255, b: 255 }, { r: 62, g: 67, b: 71 }, { r: 79, g: 209, b: 217 }, { r: 244, g: 47, b: 76 }, { r: 225, g: 160, b: 160 }, { r: 255, g: 230, b: 46 }, { r: 95, g: 149, b: 170 }, { r: 249, g: 249, b: 249 }, { r: 216, g: 224, b: 223 }, { r: 171, g: 113, b: 72 }, { r: 255, g: 204, b: 170 }, { r: 255, g: 206, b: 49 }, { r: 255, g: 206, b: 49 }, { r: 255, g: 255, b: 255 }, { r: 40, g: 114, b: 160 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 }, { r: 105, g: 150, b: 53 }, { r: 91, g: 90, b: 141 }, { r: 243, g: 162, b: 170 }, { r: 148, g: 150, b: 103 }, { r: 105, g: 150, b: 53 }, { r: 237, g: 76, b: 92 }, { r: 139, g: 104, b: 79 }, { r: 194, g: 167, b: 187 }, { r: 116, g: 70, b: 77 }, { r: 255, g: 255, b: 255 }, { r: 237, g: 76, b: 92 }, { r: 255, g: 230, b: 46 }, { r: 242, g: 122, b: 82 }, { r: 107, g: 152, b: 56 }, { r: 0, g: 0, b: 0 }, { r: 249, g: 249, b: 249 }, { r: 145, g: 106, b: 112 }, { r: 255, g: 255, b: 255 }, { r: 66, g: 139, b: 193 }, { r: 66, g: 139, b: 193 }, { r: 255, g: 230, b: 46 }, { r: 243, g: 132, b: 143 }, { r: 91, g: 90, b: 141 }, { r: 79, g: 209, b: 217 }, { r: 237, g: 76, b: 92 }, { r: 255, g: 255, b: 255 }, { r: 194, g: 167, b: 187 }, { r: 249, g: 249, b: 249 }, { r: 241, g: 138, b: 148 }, { r: 149, g: 69, b: 71 }, { r: 231, g: 222, b: 229 }, { r: 105, g: 150, b: 53 }, { r: 243, g: 162, b: 170 }, { r: 119, g: 174, b: 129 }, { r: 91, g: 90, b: 141 }, { r: 183, g: 95, b: 123 }, { r: 234, g: 193, b: 193 }, { r: 237, g: 76, b: 92 }, { r: 0, g: 0, b: 0 }, { r: 255, g: 230, b: 46 }, { r: 249, g: 204, b: 53 }, { r: 79, g: 209, b: 217 }, { r: 184, g: 74, b: 121 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 206, b: 49 }, { r: 255, g: 255, b: 255 }, { r: 66, g: 139, b: 193 }, { r: 160, g: 201, b: 136 }, { r: 255, g: 255, b: 255 }, { r: 185, g: 206, b: 160 }, { r: 255, g: 230, b: 46 }, { r: 252, g: 216, b: 86 }, { r: 204, g: 218, b: 188 }, { r: 255, g: 230, b: 46 }, { r: 243, g: 162, b: 170 }, { r: 91, g: 90, b: 141 }, { r: 66, g: 139, b: 193 }, { r: 42, g: 95, b: 158 }, { r: 243, g: 162, b: 170 }, { r: 249, g: 249, b: 249 }, { r: 255, g: 255, b: 255 }, { r: 62, g: 67, b: 71 }, { r: 105, g: 150, b: 53 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 206, b: 49 }, { r: 176, g: 82, b: 112 }, { r: 249, g: 182, b: 60 }, { r: 201, g: 71, b: 71 }, { r: 182, g: 152, b: 176 }, { r: 249, g: 249, b: 249 }, { r: 62, g: 67, b: 71 }, { r: 255, g: 255, b: 255 }, { r: 83, g: 105, b: 157 }, { r: 255, g: 255, b: 255 }, { r: 105, g: 150, b: 53 }, { r: 148, g: 161, b: 77 }, { r: 62, g: 67, b: 71 }, { r: 255, g: 232, b: 166 }, { r: 255, g: 232, b: 166 }, { r: 255, g: 232, b: 166 }, { r: 255, g: 202, b: 40 }, { r: 255, g: 206, b: 49 }, { r: 196, g: 213, b: 212 }, { r: 151, g: 151, b: 151 }, { r: 228, g: 238, b: 247 }, { r: 62, g: 67, b: 71 }, { r: 241, g: 172, b: 54 }, { r: 251, g: 191, b: 103 }, { r: 240, g: 234, b: 221 }, { r: 133, g: 189, b: 79 }, { r: 62, g: 67, b: 71 }, { r: 242, g: 154, b: 46 }, { r: 217, g: 189, b: 33 }, { r: 255, g: 203, b: 103 }, { r: 118, g: 170, b: 67 }, { r: 242, g: 154, b: 46 }, { r: 255, g: 230, b: 46 }, { r: 0, g: 0, b: 0 }, { r: 231, g: 167, b: 79 }, { r: 239, g: 77, b: 60 }, { r: 140, g: 198, b: 62 }, { r: 230, g: 237, b: 237 }, { r: 186, g: 83, b: 39 }, { r: 254, g: 224, b: 146 }, { r: 252, g: 210, b: 140 }, { r: 247, g: 235, b: 219 }, { r: 255, g: 230, b: 46 }, { r: 242, g: 203, b: 125 }, { r: 226, g: 183, b: 38 }, { r: 178, g: 193, b: 192 }, { r: 254, g: 220, b: 224 }, { r: 169, g: 63, b: 235 }, { r: 255, g: 209, b: 112 }, { r: 143, g: 100, b: 83 }, { r: 254, g: 224, b: 175 }, { r: 255, g: 238, b: 210 }, { r: 180, g: 215, b: 238 }, { r: 218, g: 227, b: 234 }, { r: 255, g: 231, b: 145 }, { r: 237, g: 76, b: 92 }, { r: 133, g: 191, b: 80 }, { r: 118, g: 154, b: 75 }, { r: 0, g: 0, b: 0 }, { r: 118, g: 170, b: 66 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 152, g: 157, b: 162 }, { r: 0, g: 0, b: 0 }, { r: 235, g: 178, b: 99 }, { r: 163, g: 92, b: 255 }, { r: 129, g: 128, b: 132 }, { r: 123, g: 172, b: 78 }, { r: 216, g: 223, b: 235 }, { r: 0, g: 0, b: 0 }, { r: 70, g: 76, b: 80 }, { r: 62, g: 67, b: 71 }, { r: 183, g: 236, b: 239 }, { r: 0, g: 0, b: 0 }, { r: 246, g: 199, b: 153 }, { r: 62, g: 67, b: 71 }, { r: 237, g: 76, b: 92 }, { r: 194, g: 146, b: 89 }, { r: 51, g: 51, b: 51 }, { r: 131, g: 84, b: 91 }, { r: 51, g: 51, b: 51 }, { r: 170, g: 128, b: 97 }, { r: 193, g: 193, b: 193 }, { r: 245, g: 245, b: 245 }, { r: 208, g: 208, b: 208 }, { r: 51, g: 49, b: 50 }, { r: 183, g: 0, b: 0 }, { r: 76, g: 82, b: 86 }, { r: 77, g: 82, b: 88 }, { r: 177, g: 144, b: 46 }, { r: 62, g: 67, b: 71 }, { r: 234, g: 231, b: 228 }, { r: 148, g: 152, b: 155 }, { r: 246, g: 187, b: 16 }, { r: 51, g: 51, b: 51 }, { r: 51, g: 51, b: 51 }, { r: 255, g: 206, b: 49 }, { r: 208, g: 208, b: 208 }, { r: 121, g: 198, b: 0 }, { r: 59, g: 42, b: 34 }, { r: 51, g: 51, b: 51 }, { r: 117, g: 180, b: 178 }, { r: 71, g: 184, b: 146 }, { r: 71, g: 184, b: 146 }, { r: 71, g: 184, b: 146 }, { r: 71, g: 184, b: 146 }, { r: 71, g: 184, b: 146 }, { r: 71, g: 184, b: 146 }, { r: 255, g: 221, b: 103 }, { r: 255, g: 225, b: 189 }, { r: 254, g: 208, b: 172 }, { r: 214, g: 165, b: 124 }, { r: 180, g: 125, b: 86 }, { r: 138, g: 104, b: 89 }, { r: 236, g: 158, b: 0 }, { r: 255, g: 206, b: 49 }, { r: 174, g: 126, b: 93 }, { r: 137, g: 102, b: 76 }, { r: 137, g: 102, b: 76 }, { r: 137, g: 102, b: 76 }, { r: 137, g: 102, b: 76 }, { r: 137, g: 102, b: 76 }, { r: 137, g: 102, b: 76 }, { r: 255, g: 255, b: 255 }, { r: 232, g: 232, b: 232 }, { r: 255, g: 221, b: 103 }, { r: 255, g: 225, b: 189 }, { r: 254, g: 208, b: 172 }, { r: 214, g: 166, b: 124 }, { r: 180, g: 125, b: 86 }, { r: 138, g: 104, b: 88 }, { r: 255, g: 221, b: 103 }, { r: 255, g: 225, b: 189 }, { r: 254, g: 208, b: 172 }, { r: 214, g: 165, b: 124 }, { r: 180, g: 125, b: 86 }, { r: 138, g: 104, b: 89 }, { r: 239, g: 223, b: 194 }, { r: 189, g: 175, b: 154 }, { r: 66, g: 173, b: 226 }, { r: 255, g: 206, b: 49 }, { r: 217, g: 187, b: 134 }, { r: 178, g: 193, b: 192 }, { r: 173, g: 216, b: 83 }, { r: 0, g: 0, b: 0 }, { r: 237, g: 76, b: 92 }, { r: 255, g: 255, b: 255 }, { r: 178, g: 193, b: 192 }, { r: 217, g: 92, b: 75 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 211, g: 151, b: 110 }, { r: 135, g: 137, b: 139 }, { r: 215, g: 227, b: 231 }, { r: 255, g: 221, b: 125 }, { r: 168, g: 166, b: 149 }, { r: 214, g: 238, b: 240 }, { r: 232, g: 232, b: 232 }, { r: 249, g: 243, b: 217 }, { r: 180, g: 178, b: 168 }, { r: 121, g: 141, b: 154 }, { r: 241, g: 87, b: 68 }, { r: 176, g: 184, b: 188 }, { r: 206, g: 223, b: 235 }, { r: 144, g: 148, b: 151 }, { r: 112, g: 114, b: 116 }, { r: 68, g: 97, b: 139 }, { r: 66, g: 173, b: 226 }, { r: 214, g: 238, b: 240 }, { r: 255, g: 113, b: 127 }, { r: 219, g: 180, b: 113 }, { r: 62, g: 67, b: 71 }, { r: 0, g: 0, b: 0 }, { r: 255, g: 126, b: 39 }, { r: 245, g: 165, b: 142 }, { r: 140, g: 147, b: 152 }, { r: 208, g: 208, b: 208 }, { r: 39, g: 95, b: 217 }, { r: 62, g: 67, b: 71 }, { r: 255, g: 206, b: 49 }, { r: 242, g: 178, b: 0 }, { r: 178, g: 193, b: 192 }, { r: 211, g: 151, b: 110 }, { r: 202, g: 135, b: 71 }, { r: 239, g: 222, b: 194 }, { r: 13, g: 204, b: 209 }, { r: 224, g: 136, b: 40 }, { r: 239, g: 222, b: 194 }, { r: 208, g: 208, b: 208 }, { r: 140, g: 198, b: 62 }, { r: 141, g: 155, b: 163 }, { r: 157, g: 112, b: 78 }, { r: 62, g: 66, b: 72 }, { r: 85, g: 92, b: 96 }, { r: 134, g: 119, b: 63 }, { r: 193, g: 74, b: 87 }, { r: 120, g: 136, b: 143 }, { r: 255, g: 226, b: 179 }, { r: 224, g: 172, b: 126 }, { r: 54, g: 167, b: 193 }, { r: 196, g: 197, b: 198 }, { r: 218, g: 229, b: 239 }, { r: 242, g: 154, b: 46 }, { r: 114, g: 131, b: 137 }, { r: 62, g: 67, b: 71 }, { r: 209, g: 219, b: 227 }, { r: 252, g: 151, b: 178 }, { r: 239, g: 222, b: 194 }, { r: 148, g: 113, b: 81 }, { r: 245, g: 193, b: 93 }, { r: 243, g: 205, b: 170 }, { r: 239, g: 186, b: 144 }, { r: 66, g: 173, b: 226 }, { r: 198, g: 148, b: 110 }, { r: 164, g: 110, b: 74 }, { r: 125, g: 92, b: 77 }, { r: 255, g: 255, b: 255 }, { r: 237, g: 187, b: 46 }, { r: 0, g: 0, b: 0 }, { r: 62, g: 67, b: 71 }, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, { r: 115, g: 214, b: 255 }, { r: 117, g: 214, b: 255 }, { r: 140, g: 178, b: 199 }, { r: 156, g: 122, b: 99 }, { r: 255, g: 221, b: 103 }, { r: 255, g: 225, b: 189 }, { r: 254, g: 208, b: 172 }, { r: 214, g: 165, b: 124 }, { r: 180, g: 125, b: 86 }, { r: 138, g: 104, b: 89 }, { r: 239, g: 222, b: 194 }, { r: 79, g: 209, b: 217 }, { r: 79, g: 209, b: 217 }, { r: 239, g: 222, b: 194 }, { r: 240, g: 244, b: 245 }, { r: 255, g: 91, b: 120 }, { r: 198, g: 160, b: 104 }, { r: 0, g: 0, b: 0 }, { r: 77, g: 83, b: 87 }, { r: 175, g: 205, b: 219 }, { r: 208, g: 208, b: 208 }, { r: 208, g: 208, b: 208 }, { r: 208, g: 208, b: 208 }, { r: 208, g: 208, b: 208 }, { r: 255, g: 221, b: 125 }, { r: 255, g: 255, b: 255 }, { r: 180, g: 215, b: 238 }, { r: 62, g: 67, b: 71 }, { r: 95, g: 98, b: 98 }, { r: 158, g: 161, b: 163 }, { r: 158, g: 161, b: 163 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 135, b: 54 }, { r: 255, g: 135, b: 54 }, { r: 217, g: 227, b: 232 }, { r: 217, g: 227, b: 232 }, { r: 217, g: 227, b: 232 }, { r: 250, g: 210, b: 214 }, { r: 207, g: 216, b: 221 }, { r: 217, g: 227, b: 232 }, { r: 92, g: 117, b: 10 }, { r: 255, g: 255, b: 255 }, { r: 237, g: 76, b: 92 }, { r: 208, g: 206, b: 206 }, { r: 148, g: 152, b: 155 }, { r: 243, g: 213, b: 123 }, { r: 255, g: 206, b: 49 }, { r: 217, g: 227, b: 232 }, { r: 211, g: 151, b: 110 }, { r: 66, g: 173, b: 226 }, { r: 194, g: 143, b: 239 }, { r: 237, g: 76, b: 92 }, { r: 220, g: 230, b: 234 }, { r: 131, g: 191, b: 79 }, { r: 66, g: 173, b: 226 }, { r: 255, g: 206, b: 49 }, { r: 221, g: 74, b: 83 }, { r: 255, g: 172, b: 188 }, { r: 255, g: 246, b: 215 }, { r: 143, g: 139, b: 125 }, { r: 239, g: 222, b: 194 }, { r: 225, g: 194, b: 204 }, { r: 199, g: 231, b: 85 }, { r: 204, g: 212, b: 211 }, { r: 218, g: 91, b: 82 }, { r: 237, g: 76, b: 92 }, { r: 240, g: 104, b: 117 }, { r: 237, g: 76, b: 92 }, { r: 131, g: 191, b: 79 }, { r: 211, g: 151, b: 110 }, { r: 66, g: 139, b: 193 }, { r: 223, g: 233, b: 239 }, { r: 223, g: 233, b: 239 }, { r: 105, g: 114, b: 119 }, { r: 105, g: 114, b: 119 }, { r: 202, g: 213, b: 221 }, { r: 148, g: 152, b: 155 }, { r: 237, g: 76, b: 92 }, { r: 239, g: 222, b: 194 }, { r: 182, g: 183, b: 185 }, { r: 62, g: 67, b: 71 }, { r: 242, g: 178, b: 0 }, { r: 237, g: 164, b: 84 }, { r: 237, g: 164, b: 84 }, { r: 255, g: 90, b: 121 }, { r: 210, g: 195, b: 172 }, { r: 62, g: 67, b: 71 }, { r: 62, g: 67, b: 71 }, { r: 93, g: 109, b: 116 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 239, g: 223, b: 194 }, { r: 239, g: 222, b: 195 }, { r: 239, g: 222, b: 194 }, { r: 239, g: 222, b: 194 }, { r: 239, g: 222, b: 194 }, { r: 239, g: 222, b: 194 }, { r: 239, g: 222, b: 194 }, { r: 239, g: 222, b: 194 }, { r: 239, g: 222, b: 194 }, { r: 239, g: 222, b: 194 }, { r: 239, g: 222, b: 194 }, { r: 239, g: 222, b: 194 }, { r: 239, g: 222, b: 194 }, { r: 239, g: 222, b: 194 }
        ]

        //Convert to RGB, then R, G, B

        var color_r = color.r;
        var color_g = color.g;
        var color_b = color.b;

        //Create an emtyp array for the difference betwwen the colors
        var differenceArray = [];

        //Function to find the smallest value in an array
        let min = function (array) {
            return Math.min.apply(Math, array);
        };

        //Convert the HEX color in the array to RGB colors, split them up to R-G-B, then find out the difference between the "color" and the colors in the array
        for (let index in base_colors) {

            let value = base_colors[index];

            let base_colors_r = +value.r
            let base_colors_g = +value.g
            let base_colors_b = +value.b

            //Add the difference to the differenceArray
            differenceArray.push(Math.sqrt((color_r - base_colors_r) * (color_r - base_colors_r) + (color_g - base_colors_g) * (color_g - base_colors_g) + (color_b - base_colors_b) * (color_b - base_colors_b)));
        };

        //Get the lowest number from the differenceArray
        var lowest = min(differenceArray);

        //Get the index for that lowest number
        var index = differenceArray.indexOf(lowest);

        var match = base_colors[index];
        //Return the HEX code
        return index;
    }



    drawEmoji(index, target) {
        let sprite = [
            { x: 0, y: 0 }, { x: 64, y: 0 }, { x: 128, y: 0 }, { x: 192, y: 0 }, { x: 256, y: 0 }, { x: 320, y: 0 }, { x: 384, y: 0 }, { x: 448, y: 0 }, { x: 512, y: 0 }, { x: 576, y: 0 }, { x: 640, y: 0 }, { x: 704, y: 0 }, { x: 768, y: 0 }, { x: 832, y: 0 }, { x: 896, y: 0 }, { x: 960, y: 0 }, { x: 1024, y: 0 }, { x: 1088, y: 0 }, { x: 1152, y: 0 }, { x: 1216, y: 0 }, { x: 1280, y: 0 }, { x: 1344, y: 0 }, { x: 1408, y: 0 }, { x: 1472, y: 0 }, { x: 0, y: 64 }, { x: 64, y: 64 }, { x: 128, y: 64 }, { x: 192, y: 64 }, { x: 256, y: 64 }, { x: 320, y: 64 }, { x: 384, y: 64 }, { x: 448, y: 64 }, { x: 512, y: 64 }, { x: 576, y: 64 }, { x: 640, y: 64 }, { x: 704, y: 64 }, { x: 768, y: 64 }, { x: 832, y: 64 }, { x: 896, y: 64 }, { x: 960, y: 64 }, { x: 1024, y: 64 }, { x: 1088, y: 64 }, { x: 1152, y: 64 }, { x: 1216, y: 64 }, { x: 1280, y: 64 }, { x: 1344, y: 64 }, { x: 1408, y: 64 }, { x: 1472, y: 64 }, { x: 0, y: 128 }, { x: 64, y: 128 }, { x: 128, y: 128 }, { x: 192, y: 128 }, { x: 256, y: 128 }, { x: 320, y: 128 }, { x: 384, y: 128 }, { x: 448, y: 128 }, { x: 512, y: 128 }, { x: 576, y: 128 }, { x: 640, y: 128 }, { x: 704, y: 128 }, { x: 768, y: 128 }, { x: 832, y: 128 }, { x: 896, y: 128 }, { x: 960, y: 128 }, { x: 1024, y: 128 }, { x: 1088, y: 128 }, { x: 1152, y: 128 }, { x: 1216, y: 128 }, { x: 1280, y: 128 }, { x: 1344, y: 128 }, { x: 1408, y: 128 }, { x: 1472, y: 128 }, { x: 0, y: 192 }, { x: 64, y: 192 }, { x: 128, y: 192 }, { x: 192, y: 192 }, { x: 256, y: 192 }, { x: 320, y: 192 }, { x: 384, y: 192 }, { x: 448, y: 192 }, { x: 512, y: 192 }, { x: 576, y: 192 }, { x: 640, y: 192 }, { x: 704, y: 192 }, { x: 768, y: 192 }, { x: 832, y: 192 }, { x: 896, y: 192 }, { x: 960, y: 192 }, { x: 1024, y: 192 }, { x: 1088, y: 192 }, { x: 1152, y: 192 }, { x: 1216, y: 192 }, { x: 1280, y: 192 }, { x: 1344, y: 192 }, { x: 1408, y: 192 }, { x: 1472, y: 192 }, { x: 0, y: 256 }, { x: 64, y: 256 }, { x: 128, y: 256 }, { x: 192, y: 256 }, { x: 256, y: 256 }, { x: 320, y: 256 }, { x: 384, y: 256 }, { x: 448, y: 256 }, { x: 512, y: 256 }, { x: 576, y: 256 }, { x: 640, y: 256 }, { x: 704, y: 256 }, { x: 768, y: 256 }, { x: 832, y: 256 }, { x: 896, y: 256 }, { x: 960, y: 256 }, { x: 1024, y: 256 }, { x: 1088, y: 256 }, { x: 1152, y: 256 }, { x: 1216, y: 256 }, { x: 1280, y: 256 }, { x: 1344, y: 256 }, { x: 1408, y: 256 }, { x: 1472, y: 256 }, { x: 0, y: 320 }, { x: 64, y: 320 }, { x: 128, y: 320 }, { x: 192, y: 320 }, { x: 256, y: 320 }, { x: 320, y: 320 }, { x: 384, y: 320 }, { x: 448, y: 320 }, { x: 512, y: 320 }, { x: 576, y: 320 }, { x: 640, y: 320 }, { x: 704, y: 320 }, { x: 768, y: 320 }, { x: 832, y: 320 }, { x: 896, y: 320 }, { x: 960, y: 320 }, { x: 1024, y: 320 }, { x: 1088, y: 320 }, { x: 1152, y: 320 }, { x: 1216, y: 320 }, { x: 1280, y: 320 }, { x: 1344, y: 320 }, { x: 1408, y: 320 }, { x: 1472, y: 320 }, { x: 0, y: 384 }, { x: 64, y: 384 }, { x: 128, y: 384 }, { x: 192, y: 384 }, { x: 256, y: 384 }, { x: 320, y: 384 }, { x: 384, y: 384 }, { x: 448, y: 384 }, { x: 512, y: 384 }, { x: 576, y: 384 }, { x: 640, y: 384 }, { x: 704, y: 384 }, { x: 768, y: 384 }, { x: 832, y: 384 }, { x: 896, y: 384 }, { x: 960, y: 384 }, { x: 1024, y: 384 }, { x: 1088, y: 384 }, { x: 1152, y: 384 }, { x: 1216, y: 384 }, { x: 1280, y: 384 }, { x: 1344, y: 384 }, { x: 1408, y: 384 }, { x: 1472, y: 384 }, { x: 0, y: 448 }, { x: 64, y: 448 }, { x: 128, y: 448 }, { x: 192, y: 448 }, { x: 256, y: 448 }, { x: 320, y: 448 }, { x: 384, y: 448 }, { x: 448, y: 448 }, { x: 512, y: 448 }, { x: 576, y: 448 }, { x: 640, y: 448 }, { x: 704, y: 448 }, { x: 768, y: 448 }, { x: 832, y: 448 }, { x: 896, y: 448 }, { x: 960, y: 448 }, { x: 1024, y: 448 }, { x: 1088, y: 448 }, { x: 1152, y: 448 }, { x: 1216, y: 448 }, { x: 1280, y: 448 }, { x: 1344, y: 448 }, { x: 1408, y: 448 }, { x: 1472, y: 448 }, { x: 0, y: 512 }, { x: 64, y: 512 }, { x: 128, y: 512 }, { x: 192, y: 512 }, { x: 256, y: 512 }, { x: 320, y: 512 }, { x: 384, y: 512 }, { x: 448, y: 512 }, { x: 512, y: 512 }, { x: 576, y: 512 }, { x: 640, y: 512 }, { x: 704, y: 512 }, { x: 768, y: 512 }, { x: 832, y: 512 }, { x: 896, y: 512 }, { x: 960, y: 512 }, { x: 1024, y: 512 }, { x: 1088, y: 512 }, { x: 1152, y: 512 }, { x: 1216, y: 512 }, { x: 1280, y: 512 }, { x: 1344, y: 512 }, { x: 1408, y: 512 }, { x: 1472, y: 512 }, { x: 0, y: 576 }, { x: 64, y: 576 }, { x: 128, y: 576 }, { x: 192, y: 576 }, { x: 256, y: 576 }, { x: 320, y: 576 }, { x: 384, y: 576 }, { x: 448, y: 576 }, { x: 512, y: 576 }, { x: 576, y: 576 }, { x: 640, y: 576 }, { x: 704, y: 576 }, { x: 768, y: 576 }, { x: 832, y: 576 }, { x: 896, y: 576 }, { x: 960, y: 576 }, { x: 1024, y: 576 }, { x: 1088, y: 576 }, { x: 1152, y: 576 }, { x: 1216, y: 576 }, { x: 1280, y: 576 }, { x: 1344, y: 576 }, { x: 1408, y: 576 }, { x: 1472, y: 576 }, { x: 0, y: 640 }, { x: 64, y: 640 }, { x: 128, y: 640 }, { x: 192, y: 640 }, { x: 256, y: 640 }, { x: 320, y: 640 }, { x: 384, y: 640 }, { x: 448, y: 640 }, { x: 512, y: 640 }, { x: 576, y: 640 }, { x: 640, y: 640 }, { x: 704, y: 640 }, { x: 768, y: 640 }, { x: 832, y: 640 }, { x: 896, y: 640 }, { x: 960, y: 640 }, { x: 1024, y: 640 }, { x: 1088, y: 640 }, { x: 1152, y: 640 }, { x: 1216, y: 640 }, { x: 1280, y: 640 }, { x: 1344, y: 640 }, { x: 1408, y: 640 }, { x: 1472, y: 640 }, { x: 0, y: 704 }, { x: 64, y: 704 }, { x: 128, y: 704 }, { x: 192, y: 704 }, { x: 256, y: 704 }, { x: 320, y: 704 }, { x: 384, y: 704 }, { x: 448, y: 704 }, { x: 512, y: 704 }, { x: 576, y: 704 }, { x: 640, y: 704 }, { x: 704, y: 704 }, { x: 768, y: 704 }, { x: 832, y: 704 }, { x: 896, y: 704 }, { x: 960, y: 704 }, { x: 1024, y: 704 }, { x: 1088, y: 704 }, { x: 1152, y: 704 }, { x: 1216, y: 704 }, { x: 1280, y: 704 }, { x: 1344, y: 704 }, { x: 1408, y: 704 }, { x: 1472, y: 704 }, { x: 0, y: 768 }, { x: 64, y: 768 }, { x: 128, y: 768 }, { x: 192, y: 768 }, { x: 256, y: 768 }, { x: 320, y: 768 }, { x: 384, y: 768 }, { x: 448, y: 768 }, { x: 512, y: 768 }, { x: 576, y: 768 }, { x: 640, y: 768 }, { x: 704, y: 768 }, { x: 768, y: 768 }, { x: 832, y: 768 }, { x: 896, y: 768 }, { x: 960, y: 768 }, { x: 1024, y: 768 }, { x: 1088, y: 768 }, { x: 1152, y: 768 }, { x: 1216, y: 768 }, { x: 1280, y: 768 }, { x: 1344, y: 768 }, { x: 1408, y: 768 }, { x: 1472, y: 768 }, { x: 0, y: 832 }, { x: 64, y: 832 }, { x: 128, y: 832 }, { x: 192, y: 832 }, { x: 256, y: 832 }, { x: 320, y: 832 }, { x: 384, y: 832 }, { x: 448, y: 832 }, { x: 512, y: 832 }, { x: 576, y: 832 }, { x: 640, y: 832 }, { x: 704, y: 832 }, { x: 768, y: 832 }, { x: 832, y: 832 }, { x: 896, y: 832 }, { x: 960, y: 832 }, { x: 1024, y: 832 }, { x: 1088, y: 832 }, { x: 1152, y: 832 }, { x: 1216, y: 832 }, { x: 1280, y: 832 }, { x: 1344, y: 832 }, { x: 1408, y: 832 }, { x: 1472, y: 832 }, { x: 0, y: 896 }, { x: 64, y: 896 }, { x: 128, y: 896 }, { x: 192, y: 896 }, { x: 256, y: 896 }, { x: 320, y: 896 }, { x: 384, y: 896 }, { x: 448, y: 896 }, { x: 512, y: 896 }, { x: 576, y: 896 }, { x: 640, y: 896 }, { x: 704, y: 896 }, { x: 768, y: 896 }, { x: 832, y: 896 }, { x: 896, y: 896 }, { x: 960, y: 896 }, { x: 1024, y: 896 }, { x: 1088, y: 896 }, { x: 1152, y: 896 }, { x: 1216, y: 896 }, { x: 1280, y: 896 }, { x: 1344, y: 896 }, { x: 1408, y: 896 }, { x: 1472, y: 896 }, { x: 0, y: 960 }, { x: 64, y: 960 }, { x: 128, y: 960 }, { x: 192, y: 960 }, { x: 256, y: 960 }, { x: 320, y: 960 }, { x: 384, y: 960 }, { x: 448, y: 960 }, { x: 512, y: 960 }, { x: 576, y: 960 }, { x: 640, y: 960 }, { x: 704, y: 960 }, { x: 768, y: 960 }, { x: 832, y: 960 }, { x: 896, y: 960 }, { x: 960, y: 960 }, { x: 1024, y: 960 }, { x: 1088, y: 960 }, { x: 1152, y: 960 }, { x: 1216, y: 960 }, { x: 1280, y: 960 }, { x: 1344, y: 960 }, { x: 1408, y: 960 }, { x: 1472, y: 960 }, { x: 0, y: 1024 }, { x: 64, y: 1024 }, { x: 128, y: 1024 }, { x: 192, y: 1024 }, { x: 256, y: 1024 }, { x: 320, y: 1024 }, { x: 384, y: 1024 }, { x: 448, y: 1024 }, { x: 512, y: 1024 }, { x: 576, y: 1024 }, { x: 640, y: 1024 }, { x: 704, y: 1024 }, { x: 768, y: 1024 }, { x: 832, y: 1024 }, { x: 896, y: 1024 }, { x: 960, y: 1024 }, { x: 1024, y: 1024 }, { x: 1088, y: 1024 }, { x: 1152, y: 1024 }, { x: 1216, y: 1024 }, { x: 1280, y: 1024 }, { x: 1344, y: 1024 }, { x: 1408, y: 1024 }, { x: 1472, y: 1024 }, { x: 0, y: 1088 }, { x: 64, y: 1088 }, { x: 128, y: 1088 }, { x: 192, y: 1088 }, { x: 256, y: 1088 }, { x: 320, y: 1088 }, { x: 384, y: 1088 }, { x: 448, y: 1088 }, { x: 512, y: 1088 }, { x: 576, y: 1088 }, { x: 640, y: 1088 }, { x: 704, y: 1088 }, { x: 768, y: 1088 }, { x: 832, y: 1088 }, { x: 896, y: 1088 }, { x: 960, y: 1088 }, { x: 1024, y: 1088 }, { x: 1088, y: 1088 }, { x: 1152, y: 1088 }, { x: 1216, y: 1088 }, { x: 1280, y: 1088 }, { x: 1344, y: 1088 }, { x: 1408, y: 1088 }, { x: 1472, y: 1088 }, { x: 0, y: 1152 }, { x: 64, y: 1152 }, { x: 128, y: 1152 }, { x: 192, y: 1152 }, { x: 256, y: 1152 }, { x: 320, y: 1152 }, { x: 384, y: 1152 }, { x: 448, y: 1152 }, { x: 512, y: 1152 }, { x: 576, y: 1152 }, { x: 640, y: 1152 }, { x: 704, y: 1152 }, { x: 768, y: 1152 }, { x: 832, y: 1152 }, { x: 896, y: 1152 }, { x: 960, y: 1152 }, { x: 1024, y: 1152 }, { x: 1088, y: 1152 }, { x: 1152, y: 1152 }, { x: 1216, y: 1152 }, { x: 1280, y: 1152 }, { x: 1344, y: 1152 }, { x: 1408, y: 1152 }, { x: 1472, y: 1152 }, { x: 0, y: 1216 }, { x: 64, y: 1216 }, { x: 128, y: 1216 }, { x: 192, y: 1216 }, { x: 256, y: 1216 }, { x: 320, y: 1216 }, { x: 384, y: 1216 }, { x: 448, y: 1216 }, { x: 512, y: 1216 }, { x: 576, y: 1216 }, { x: 640, y: 1216 }, { x: 704, y: 1216 }, { x: 768, y: 1216 }, { x: 832, y: 1216 }, { x: 896, y: 1216 }, { x: 960, y: 1216 }, { x: 1024, y: 1216 }, { x: 1088, y: 1216 }, { x: 1152, y: 1216 }, { x: 1216, y: 1216 }, { x: 1280, y: 1216 }, { x: 1344, y: 1216 }, { x: 1408, y: 1216 }, { x: 1472, y: 1216 }, { x: 0, y: 1280 }, { x: 64, y: 1280 }, { x: 128, y: 1280 }, { x: 192, y: 1280 }, { x: 256, y: 1280 }, { x: 320, y: 1280 }, { x: 384, y: 1280 }, { x: 448, y: 1280 }, { x: 512, y: 1280 }, { x: 576, y: 1280 }, { x: 640, y: 1280 }, { x: 704, y: 1280 }, { x: 768, y: 1280 }, { x: 832, y: 1280 }, { x: 896, y: 1280 }, { x: 960, y: 1280 }, { x: 1024, y: 1280 }, { x: 1088, y: 1280 }, { x: 1152, y: 1280 }, { x: 1216, y: 1280 }, { x: 1280, y: 1280 }, { x: 1344, y: 1280 }, { x: 1408, y: 1280 }, { x: 1472, y: 1280 }, { x: 0, y: 1344 }, { x: 64, y: 1344 }, { x: 128, y: 1344 }, { x: 192, y: 1344 }, { x: 256, y: 1344 }, { x: 320, y: 1344 }, { x: 384, y: 1344 }, { x: 448, y: 1344 }, { x: 512, y: 1344 }, { x: 576, y: 1344 }, { x: 640, y: 1344 }, { x: 704, y: 1344 }, { x: 768, y: 1344 }, { x: 832, y: 1344 }, { x: 896, y: 1344 }, { x: 960, y: 1344 }, { x: 1024, y: 1344 }, { x: 1088, y: 1344 }, { x: 1152, y: 1344 }, { x: 1216, y: 1344 }, { x: 1280, y: 1344 }, { x: 1344, y: 1344 }, { x: 1408, y: 1344 }, { x: 1472, y: 1344 }, { x: 0, y: 1408 }, { x: 64, y: 1408 }, { x: 128, y: 1408 }, { x: 192, y: 1408 }, { x: 256, y: 1408 }, { x: 320, y: 1408 }, { x: 384, y: 1408 }, { x: 448, y: 1408 }, { x: 512, y: 1408 }, { x: 576, y: 1408 }, { x: 640, y: 1408 }, { x: 704, y: 1408 }, { x: 768, y: 1408 }, { x: 832, y: 1408 }, { x: 896, y: 1408 }, { x: 960, y: 1408 }, { x: 1024, y: 1408 }, { x: 1088, y: 1408 }, { x: 1152, y: 1408 }, { x: 1216, y: 1408 }, { x: 1280, y: 1408 }, { x: 1344, y: 1408 }, { x: 1408, y: 1408 }, { x: 1472, y: 1408 }, { x: 0, y: 1472 }, { x: 64, y: 1472 }, { x: 128, y: 1472 }, { x: 192, y: 1472 }, { x: 256, y: 1472 }, { x: 320, y: 1472 }, { x: 384, y: 1472 }, { x: 448, y: 1472 }, { x: 512, y: 1472 }, { x: 576, y: 1472 }, { x: 640, y: 1472 }, { x: 704, y: 1472 }, { x: 768, y: 1472 }, { x: 832, y: 1472 }, { x: 896, y: 1472 }, { x: 960, y: 1472 }, { x: 1024, y: 1472 }, { x: 1088, y: 1472 }, { x: 1152, y: 1472 }, { x: 1216, y: 1472 }, { x: 1280, y: 1472 }, { x: 1344, y: 1472 }, { x: 1408, y: 1472 }, { x: 1472, y: 1472 }
        ];


        let me = this;
        let img = me.emojis;

        //emoji position from emojis_bg.png
        var point = sprite[index];
        point.x, point.y;

        //emoji size
        var size = 64;

        //emoji scale to
        var scaleTo = this.emojiSize;

        //where to render
        target.x, target.y

        // me.context.clearRect(0, 0, me.canvas.width, me.canvas.height);
        // console.log(img, point, size, target, scaleTo);

        // console.log(size, scaleTo, target.x, target.y);

        me.context.drawImage(img, point.x, point.y, size, size, target.x, target.y, scaleTo, scaleTo);


    }
}


function run() {
    // var url = '/scarlet.png';
    var url = 'https://scontent-fra3-1.xx.fbcdn.net/v/t1.0-9/1625580_10203135863225821_1927146089_n.jpg?oh=13a9d73b50eb8f493cd656f99ec36240&oe=58DF0F42';
    // var url = '/emojis.png';

    var emoji = new Emoji(url);
}