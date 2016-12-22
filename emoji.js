var Emoji = (function () {
    function Emoji(picture) {
        this.picture = picture;
    }
    Emoji.prototype.imageToCanvas = function () {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext('2d');
        var image = new Image();
        image.onload = function () {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        image.src = this.picture;
    };
    ;
    Emoji.prototype.getCanvasColors = function () {
    };
    return Emoji;
}());
var test = new Emoji("http://www.lunapic.com/editor/premade/transparent.gif");
window.onload = function () {
    test.imageToCanvas();
};
