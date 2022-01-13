class CanvasOverlay {
    constructor(p, width, height) {
        this.p = p;
        this.width = width;
        this.height = height;

    }

    getOverlay() {
        let overlay = this.p.createGraphics(this.width, this.height);
        overlay.noStroke();
        overlay.colorMode(this.p.HSL);
        for (let i = 0; i < 10000; i++) {
        overlay.stroke(0, 0, this.p.random([10, 90]), this.p.randomGaussian(0.05, 0.025));
        let x = this.p.random(this.p.width);
        let y = this.p.random(this.p.height);
        let size = this.p.random(15, 25);
        overlay.line(x, y, x, y + size);
        }
        return overlay;
    }
}