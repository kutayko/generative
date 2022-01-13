class CanvasOverlay {
    constructor({ p, width, height, lineCount=30000, lineSizeInterval=[30, 40] }) {
        this.p = p;
        this.width = width || this.p.width;
        this.height = height || this.p.height;
        this.lineCount = lineCount;
        this.lineSizeInterval = lineSizeInterval;

    }

    getOverlay() {
        let overlay = this.p.createGraphics(this.width, this.height);
        overlay.colorMode(this.p.HSL);

        for (let i = 0; i < this.lineCount; i++) {
            overlay.stroke(0, 0, 0, this.p.random(0.3, 1));

            let x = this.p.random(this.width);
            let y = this.p.random(this.height);

            let size = this.p.random(
                this.lineSizeInterval[0],
                this.lineSizeInterval[1]
            );

            overlay.line(x, y, x, y + size);
        }

        return overlay;
    }
}