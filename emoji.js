var Emoji = (function () {
    function Emoji(picture) {
        this.picture = picture;
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext('2d');
        if (this.picture)
            this.setImage(this.picture);
    }
    Emoji.prototype.setImage = function (picture) {
        this.image = new Image();
        var emoji = this;
        // canvas aრ მისცემს საიტს უფლებას რომ getImageData გამოიყენო ფოტოზე რომელიც
        // სხვა საიტიდან წამოიღე, ამიტომ ეს ატრიბუტი უნდა
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
        var canvas = this.canvas, context = this.context;
        var pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        var pixelColors = [];
        for (var g = 0; g < pixels.length; g += 4) {
            pixelColors.push(pixels[g] + ',' + pixels[g + 1] + ',' + pixels[g + 2]);
        }
        console.log(pixelColors);
    };
    return Emoji;
}());
var test = new Emoji("https://scontent-vie1-1.xx.fbcdn.net/v/t31.0-8/15591476_1383178805056939_3259992289809107891_o.jpg?oh=f4031aef100ff4a282ab32d8fab6d821&oe=58F79006");
window.onload = function () {
    test.getCanvasColors();
};
