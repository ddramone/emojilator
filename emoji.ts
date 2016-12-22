class Emoji {

    public picture : string;

    constructor(picture: string) {
        this.picture = picture;
    }

    imageToCanvas():void{
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext('2d');
        let image = new Image();

        image.onload = function() {
            context.drawImage(image,0,0,canvas.width,canvas.height);
        }

        image.src = this.picture;

    };


    getCanvasColors() {

    }

}

var test:Emoji = new Emoji("http://www.lunapic.com/editor/premade/transparent.gif");

window.onload = function() {
    test.imageToCanvas();
}
