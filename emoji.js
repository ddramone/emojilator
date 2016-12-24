var Emoji = (function () {
    function Emoji(picture) {
        this.picture = picture;
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext('2d');
        this.image = new Image();
    }
    Emoji.prototype.imageToCanvas = function () {
        var canvas = this.canvas, context = this.context, image = this.image;
        image.onload = function () {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        image.src = this.picture;
    };
    ;
    Emoji.prototype.rgbToHex = function (r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    };
    ;
    Emoji.prototype.getCanvasColors = function () {
        var canvas = this.canvas, context = this.context, image = this.image;
        this.imageToCanvas();
        var pixel = context.getImageData(0, 0, canvas.width, canvas.height).data;
        var hex = "#" + ("000000" + this.rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);
        var pixelArr = [];
        for (var i = 0; i < pixel.length; i++) {
            pixelArr.push(pixel[i]);
        }
        console.log(pixelArr);
    };
    return Emoji;
}());
var test = new Emoji("https://scontent-vie1-1.xx.fbcdn.net/v/t31.0-8/15591476_1383178805056939_3259992289809107891_o.jpg?oh=f4031aef100ff4a282ab32d8fab6d821&oe=58F79006");
window.onload = function () {
    test.getCanvasColors();
};
